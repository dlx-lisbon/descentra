import React, { createContext, useReducer, useState, useEffect } from 'react';

import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { convertUtf8ToHex } from '@walletconnect/utils';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

type SessionStateType = {
    connected: boolean;
    chainId: number | null;
    accounts: string[];
    address: string | null;
};

const sessionInitialState = {
    connected: false,
    chainId: null,
    accounts: [],
    address: null,
};

type SessionActionType =
    | { type: 'CONNECT'; accounts: string[]; chainId: number; address: string }
    | { type: 'UPDATE'; accounts: string[]; chainId: number; address: string }
    | { type: 'DISCONNECT' };

const sessionReducer = (state: SessionStateType, action: SessionActionType) => {
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
            return { ...sessionInitialState };
        }
        default:
            return state;
    }
};

export const AuthContext = createContext<{
    address: string | null;
    handleLogin: () => void;
    handleLogout: () => void;
    handleSignMessage: (message: string) => Promise<string | undefined>;
}>({
    address: null,
    handleLogin: () => null,
    handleLogout: () => null,
    handleSignMessage: () => Promise.resolve(undefined),
});

const createWalletConnector = () =>
    new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
    });

export const AuthProvider: React.FC = ({ children }) => {
    const [connector, setConnector] = useState<WalletConnect>(createWalletConnector());
    const [sessionState, sessionDispatch] = useReducer(sessionReducer, sessionInitialState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (connector.connected) {
            const { chainId, accounts } = connector;
            const [address] = accounts;
            sessionDispatch({ type: 'CONNECT', accounts, chainId, address });
        }
    }, [connector, connector.connected]);

    const handleLogin = () => {
        // create new connector
        const walletConnector = createWalletConnector();

        if (!walletConnector.connected) {
            walletConnector.createSession();
        }

        walletConnector.on('session_update', async (error, payload) => {
            if (error) {
                throw error;
            }

            const [{ chainId, accounts }] = payload.params;
            const [address] = accounts;
            sessionDispatch({ type: 'UPDATE', accounts, chainId, address });
        });

        walletConnector.on('connect', (error, payload) => {
            console.log('onConnect');
            if (error) {
                throw error;
            }

            const [{ chainId, accounts }] = payload.params;
            const [address] = accounts;
            sessionDispatch({ type: 'CONNECT', accounts, chainId, address });
        });

        walletConnector.on('disconnect', (error) => {
            console.log('onDisconnect');
            if (error) {
                throw error;
            }

            sessionDispatch({ type: 'DISCONNECT' });
        });

        setConnector(walletConnector);
    };

    const handleLogout = () => {
        connector.killSession();
        sessionDispatch({ type: 'DISCONNECT' });
    };

    const handleSignMessage = async (message: string) => {
        if (!connector) {
            return;
        }

        try {
            const { address } = sessionState;

            // encode message (hex)
            const hexMsg = convertUtf8ToHex(message);

            // personal_sign params
            const msgParams = [hexMsg, address];

            setIsModalOpen(true);

            // send message
            const signature = await connector.signPersonalMessage(msgParams);

            setIsModalOpen(false);

            return signature;
        } catch (error) {
            setIsModalOpen(false);
            throw error;
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthContext.Provider value={{ address: sessionState.address, handleLogin, handleLogout, handleSignMessage }}>
            <Dialog onClose={handleCloseModal} aria-labelledby="dialog-title" open={isModalOpen}>
                <DialogTitle id="simple-dialog-title">Pedido de assinatura pendente</DialogTitle>
                <DialogContent>Por favor aprove ou rejeite o pedido de assinatura em sua carteira</DialogContent>
            </Dialog>
            {children}
        </AuthContext.Provider>
    );
};
