import { Button, Typography } from '@material-ui/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

export default function Profile() {
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        const getUserAddress = async () => {
            if ((window as any).ethereum !== undefined) {
                try {
                    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
                    const signer = provider.getSigner();
                    setUserAddress(await signer.getAddress());
                } catch (error) {
                    // not loggedin yet
                }
            }
        };
        getUserAddress();
    }, []);

    const getUser = () => {
        if (userAddress.length === 0) {
            return (
                <Typography variant="body2" gutterBottom>
                    Your are not loggedin!
                </Typography>
            );
        }
        return (
            <Typography variant="body2" gutterBottom>
                You address is {userAddress}
            </Typography>
        );
    };
    return (
        <>
            <Button
                onClick={() => {
                    console.log((window as any).ethereum, window as any);
                    (window as any).ethereum.enable();
                }}
                color="primary"
            >
                Login
            </Button>
            {getUser()}
        </>
    );
}
