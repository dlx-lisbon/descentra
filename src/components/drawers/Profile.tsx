import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { ethers } from 'ethers';


export default function Profile() {
    const [userAddress, setUserAddress] = useState('');


    useEffect(() => {
        const getUserAddress = async () => {
            if ((window as any).ethereum !== undefined) {
                const provider = new ethers.providers.Web3Provider((window as any).ethereum);
                const signer = provider.getSigner();
                setUserAddress(await signer.getAddress());
            }
        }
        getUserAddress();
    }, []);

    const getUser = () => {
        if (userAddress.length === 0) {
            return <Typography variant="body2" gutterBottom>Your are not loggedin!</Typography>;
        }
        return <Typography variant="body2" gutterBottom>You address is {userAddress}</Typography>;
    }
    return (
        <>
            <Button onClick={() => (window as any).ethereum.enable()} color="primary">
                Login
            </Button>
            {getUser()}
        </>
    );
}
