import { ContractTransaction, ethers } from 'ethers';
import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Input,
    InputGroup,
    Modal,
} from 'rsuite';

import { MeetupCoreInstance } from 'dlx-contracts/types/truffle-contracts/index';
import PlaceholderParagraph from 'rsuite/lib/Placeholder/PlaceholderParagraph';


interface INewContent {
    date: string;
    description: string;
    location: string;
    seats: string;
    title: string;
}
interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    meetupCore: ethers.Contract & MeetupCoreInstance;
    userSigner: ethers.providers.JsonRpcSigner;
    ipfs: any;
}
export default function NewContent(props: INewContentProps) {
    // new content variables
    const [newContentForm, setNewContentForm] = useState<INewContent>({
        date: '',
        description: '',
        location: '',
        seats: '',
        title: '',
    });

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        const ipfsContent = {
            description: newContentForm.description,
            location: newContentForm.location,
            title: newContentForm.title,
        };
        props.ipfs.add(Buffer.from(JSON.stringify(ipfsContent), 'utf8'))
            .then((ipfsContentHash: [{ path: string, hash: string, size: number }]) => {
                // Create a new instance of the Contract with a Signer, allowing to send transactions
                const meetupCoreWithSigner = props.meetupCore.connect(props.userSigner);

                meetupCoreWithSigner.newMeetup(
                    newContentForm.date,
                    newContentForm.seats,
                    ipfsContentHash[0].hash,
                ).then(async (tx: ContractTransaction) => {
                    // this.setState({ miningTransaction: true });
                    await tx.wait();
                    props.setShow(false);
                });
            });

        event.preventDefault();
    };

    const handleInputNewContentChange = (
        value: string | string[] | Date,
        name: string,
        event: React.SyntheticEvent<HTMLElement, Event>,
    ) => {
        switch (name) {
            case 'date':
                setNewContentForm({
                    ...newContentForm,
                    date: Math.floor(new Date(value as any).getTime() / 1000).toString(),
                } as any);
                break;
            case 'description':
                setNewContentForm({
                    ...newContentForm,
                    description: value,
                } as any);
                break;
            case 'title':
                setNewContentForm({
                    ...newContentForm,
                    title: value,
                } as any);
                break;
            case 'location':
                setNewContentForm({
                    ...newContentForm,
                    location: value,
                } as any);
                break;
            case 'seats':
                setNewContentForm({
                    ...newContentForm,
                    seats: value,
                } as any);
                break;
        }
        event.preventDefault();
    };

    return (
        <Modal full={true} show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Modal.Title>Novo Conteudo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    style={{ width: 450 }}
                    placeholder="Title"
                    onChange={(v, e) => handleInputNewContentChange(v, 'title', e)}
                /><br />
                <Input
                    componentClass="textarea"
                    rows={3}
                    style={{ width: 450 }}
                    placeholder="Description"
                    onChange={(v, e) => handleInputNewContentChange(v, 'description', e)}
                /><br />
                <InputGroup
                    style={{ width: 450 }}
                >
                    <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        onChange={(v, e) => handleInputNewContentChange(v, 'date', e)}
                        ranges={[
                            {
                                label: 'Now',
                                value: new Date(),
                            },
                        ]}
                    />
                    <InputGroup.Addon>to</InputGroup.Addon>
                    <DatePicker format="HH:mm" ranges={[]} />
                </InputGroup><br /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Location"
                    onChange={(v, e) => handleInputNewContentChange(v, 'location', e)}
                /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Seats"
                    onChange={(v, e) => handleInputNewContentChange(v, 'seats', e)}
                /><br />
                <PlaceholderParagraph rows={8} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={postNewContent} appearance="primary">
                    Post
                    </Button>
                <Button onClick={() => props.setShow(false)} appearance="subtle">
                    Cancel
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}
