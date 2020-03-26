import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import {
    Col,
    Grid,
    Row,
} from 'rsuite';

import { KudosInstance } from '../../helpers/contracts/types/index';


interface IKudosProps {
    kudosCore: ethers.Contract & KudosInstance;
    userSigner: ethers.providers.JsonRpcSigner;
    ipfs: any;
}
interface IKudosMetadata {
    name: string;
    description: string;
    image: string;
}
export default function Kudos(props: IKudosProps) {
    const [kudos, setKudos] = useState<IKudosMetadata[][]>([]);
    useEffect(() => {
        const fetchData = async () => {
            // // We connect to the Contract using a Provider, so we will only
            // const owner = await props.userSigner.getAddress();
            // const totalUserKudos = (await props.kudosCore.balanceOf(owner)).toNumber();
            // const kudosArray: IKudosMetadata[][] = [];
            // for (let l = 0; l < totalUserKudos; l += 6) {
            //     const kudosArrayLine: IKudosMetadata[] = [];
            //     for (let k = 0; k < Math.min(Math.abs(6 * l - totalUserKudos), 6); k += 1) {
            //         const index = k + l;
            //         const tokenId = await props.kudosCore.tokenOfOwnerByIndex(owner, index);
            //         const tokenUri = (await props.kudosCore.tokenURI(tokenId));
            //         const data = JSON.parse((await props.ipfs.cat(tokenUri)).toString()) as IKudosMetadata;
            //         kudosArrayLine.push(data);
            //     }
            //     kudosArray.push(kudosArrayLine);
            // }
            // setKudos(kudosArray);
        };
        fetchData();
    }, []);

    const kudosSpace = (kudo: IKudosMetadata) => {
        return (
            <Col key={kudo.image} xs={4}>
                <img height="100" width="100" src={kudo.image} alt={kudo.name} />
                <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>{kudo.name}</div>
            </Col>
        );
    };

    const renderKudos = () => {
        return (
            <Grid fluid={true} style={{ padding: '50px' }}>
                {kudos.map((k, i) => <Row key={i} className="show-grid">{k.map((k1) => kudosSpace(k1))}</Row>)}
            </Grid>
        );
    };

    return renderKudos();
}
