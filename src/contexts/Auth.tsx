import React, { createContext, useReducer, useState, useEffect } from 'react';

import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

type SessionStateType = {
    connected: boolean;
    chainId: number | null;
    accounts: string[];
    address: string | null;
};

const initialState = {
    connected: false,
    chainId: null,
    accounts: [],
    address: null,
};

export const AuthContext = createContext<{
    address: string | null;
    handleLogin: () => void;
    handleLogout: () => void;
}>({
    address: null,
    handleLogin: () => null,
    handleLogout: () => null,
});

type Action =
    | { type: 'CONNECT'; accounts: string[]; chainId: number; address: string }
    | { type: 'UPDATE'; accounts: string[]; chainId: number; address: string }
    | { type: 'DISCONNECT' };

const reducer = (state: SessionStateType, action: Action) => {
    switch (action.type) {
        case 'CONNECT': {
            const { accounts, chainId, address } = action;
            return { ...state, connected: true, accounts, chainId, address };
        }
        case 'UPDATE': {
            const { accounts, chainId } = action;
            return { ...state, accounts, chainId };
        }
        case 'DISCONNECT': {
            return { ...initialState };
        }
        default:
            return state;
    }
};

const walletConnector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    qrcodeModal: QRCodeModal,
});

export const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [connector, setConnector] = useState<WalletConnect>(walletConnector);

    useEffect(() => {
        if (connector.connected) {
            const { chainId, accounts } = connector;
            const [address] = accounts;
            dispatch({ type: 'CONNECT', accounts, chainId, address });
        }
    }, [connector.connected]);

    const handleLogin = () => {
        if (!connector.connected) {
            connector.createSession();
        }

        connector.on('session_update', async (error, payload) => {
            if (error) {
                throw error;
            }

            const [{ chainId, accounts }] = payload.params;
            const [address] = accounts;
            dispatch({ type: 'UPDATE', accounts, chainId, address });
        });

        connector.on('connect', (error, payload) => {
            console.log('onConnect');
            if (error) {
                throw error;
            }

            const [{ chainId, accounts }] = payload.params;
            const [address] = accounts;
            dispatch({ type: 'CONNECT', accounts, chainId, address });
        });

        connector.on('disconnect', (error) => {
            console.log('onDisconnect');
            if (error) {
                throw error;
            }

            dispatch({ type: 'DISCONNECT' });
        });

        setConnector(connector);
    };

    const handleLogout = () => {
        connector.killSession();
        dispatch({ type: 'DISCONNECT' });
    };

    return (
        <AuthContext.Provider value={{ address: state.address, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
