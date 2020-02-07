import { ethers } from 'ethers';
import React, { useState } from 'react';
import {
    Button,
    Input,
    Modal,
} from 'rsuite';

import { KudosCoreInstance } from 'dlx-contracts/types/truffle-contracts/index';
import PlaceholderParagraph from 'rsuite/lib/Placeholder/PlaceholderParagraph';


interface IMintKudo {
    address: string;
    name: string;
    description: string;
    image: string;
}
interface IMintKudoProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    kudosCore: ethers.Contract & KudosCoreInstance;
    userSigner: ethers.providers.JsonRpcSigner;
    ipfs: any;
}
export default function MintKudo(props: IMintKudoProps) {
    // new content variables
    const [mintKudoForm, setMintKudoForm] = useState<IMintKudo>({
        address: '',
        description: '',
        image: '',
        name: '',
    });

    const postMintKudo = async (event: React.SyntheticEvent<Element, Event>) => {
        // Create a new instance of the Contract with a Signer, allowing to send transactions
        const kudosCoreWithSigner = props.kudosCore.connect(props.userSigner) as ethers.Contract & KudosCoreInstance;

        const content = {
            description: mintKudoForm.description,
            image: mintKudoForm.image,
            name: mintKudoForm.name,
        };
        props.ipfs.add(Buffer.from(JSON.stringify(content), 'utf8')).then(async (result: any) => {
            const tokenId = (await kudosCoreWithSigner.totalSupply()).toNumber() + 1;
            await kudosCoreWithSigner.mintWithTokenURI(
                mintKudoForm.address,
                tokenId,
                result[0].hash,
            );
            props.setShow(false);
        });
    };

    const handleInputMintKudoChange = (
        value: string | string[] | Date,
        name: string,
        event: React.SyntheticEvent<HTMLElement, Event>,
    ) => {
        switch (name) {
            case 'address':
                setMintKudoForm({
                    ...mintKudoForm,
                    address: value,
                } as any);
                break;
            case 'name':
                setMintKudoForm({
                    ...mintKudoForm,
                    name: value,
                } as any);
                break;
            case 'description':
                setMintKudoForm({
                    ...mintKudoForm,
                    description: value,
                } as any);
                break;
            case 'image':
                setMintKudoForm({
                    ...mintKudoForm,
                    image: value,
                } as any);
                break;
        }
        event.preventDefault();
    };

    return (
        <Modal full={true} show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Modal.Title>Mint Kudo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    style={{ width: 450 }}
                    placeholder="Address"
                    onChange={(v, e) => handleInputMintKudoChange(v, 'address', e)}
                /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Name"
                    onChange={(v, e) => handleInputMintKudoChange(v, 'name', e)}
                /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Description"
                    onChange={(v, e) => handleInputMintKudoChange(v, 'description', e)}
                /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Image"
                    onChange={(v, e) => handleInputMintKudoChange(v, 'image', e)}
                /><br />
                <PlaceholderParagraph rows={8} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={postMintKudo} appearance="primary">
                    Post
                </Button>
                <Button onClick={() => props.setShow(false)} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
