import { ContractTransaction, ethers } from 'ethers';
import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Input,
    Modal,
} from 'rsuite';

import { DLXInstance } from 'dlx-contracts/types/truffle-contracts/index';
import { IOrbitMeetupInfo } from './interfaces';


interface INewContent {
    date: string;
    description: string;
    location: string;
    title: string;
}
interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    dlx: ethers.Contract & DLXInstance;
    userSigner: ethers.providers.JsonRpcSigner;
    dlxorbitdb: any;
}
export default function NewContent(props: INewContentProps) {
    // new content variables
    const [newContentForm, setNewContentForm] = useState<INewContent>({
        date: '',
        description: '',
        location: '',
        title: '',
    });

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        const dlxWithSigner = props.dlx.connect(props.userSigner);

        dlxWithSigner.newMeetup().then(async (tx: ContractTransaction) => {
            dlxWithSigner.on('NewMeetup', async (id, eventEmit) => {
                if (eventEmit.transactionHash === tx.hash) {
                    // tslint:disable-next-line: no-empty
                    dlxWithSigner.removeListener('NewMeetup', () => { });
                    const orbitdbContent: IOrbitMeetupInfo = {
                        date: parseInt(newContentForm.date, 10),
                        description: newContentForm.description,
                        location: newContentForm.location,
                        title: newContentForm.title,
                    };
                    const result = await props.dlxorbitdb.put(id.toString(), orbitdbContent);
                    console.log(orbitdbContent, result);
                }
            });
            await tx.wait();
            props.setShow(false);
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
                <DatePicker
                    style={{ width: 450 }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={(v, e) => handleInputNewContentChange(v, 'date', e)}
                    ranges={[
                        {
                            label: 'Now',
                            value: new Date(),
                        },
                    ]}
                /><br /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Location"
                    onChange={(v, e) => handleInputNewContentChange(v, 'location', e)}
                /><br />
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
