import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import {
    Col,
    Grid,
    Row,
} from 'rsuite';

import { KudosCoreInstance } from 'dlx-contracts/types/truffle-contracts/index';


interface IKudosProps {
    kudosCore: ethers.Contract & KudosCoreInstance;
    userSigner: ethers.providers.JsonRpcSigner;
}
export default function Kudos(props: IKudosProps) {
    useEffect(() => {
        const fetchData = async () => {
            // We connect to the Contract using a Provider, so we will only
            const owner = '0xd20f839e0424D97ecf49073f7F0725f47c8E27A6';
            const totalUserKudos = (await props.kudosCore.balanceOf(owner)).toNumber();
            for (let k = 0; k < totalUserKudos; k++) {
                const tokenId = await props.kudosCore.tokenOfOwnerByIndex(owner, k);
                const tokenUri = (await props.kudosCore.tokenURI(tokenId));
                // TODO: complete
            }
        };
        fetchData();
    }, []);

    return (
        <Grid fluid={true} style={{ padding: '50px' }}>
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
            <br />
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
        </Grid>
    );
}
