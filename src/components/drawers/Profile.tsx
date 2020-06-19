import { Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

export default function Profile() {
    const { address, handleLogin, handleLogout } = useContext(AuthContext);

    const getUser = () => {
        if (!address) {
            return (
                <Typography variant="body2" gutterBottom>
                    Your are not loggedin!
                </Typography>
            );
        }
        return (
            <Typography variant="body2" gutterBottom>
                You address is {address}
            </Typography>
        );
    };
    return (
        <>
            <Button onClick={!address ? handleLogin : handleLogout} color="primary">
                {!address ? 'Login' : 'Logout'}
            </Button>
            {getUser()}
        </>
    );
}
