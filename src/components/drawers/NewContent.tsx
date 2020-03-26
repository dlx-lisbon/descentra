import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Input,
    Modal,
} from 'rsuite';

import PostModel from '../../helpers/orbitdb/PostModel';


interface INewContent {
    author: string;
    date: string;
    description: string;
    title: string;
}
interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    postModel: PostModel;
}
export default function NewContent(props: INewContentProps) {
    // new content variables
    const [newContentForm, setNewContentForm] = useState<INewContent>({
        author: '',
        date: '',
        description: '',
        title: '',
    });

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        props.postModel.add(
            newContentForm.author,
            newContentForm.description,
            parseInt(newContentForm.date, 10),
            newContentForm.title,
        ).then(() => props.setShow(false));
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
            case 'author':
                setNewContentForm({
                    ...newContentForm,
                    author: value,
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
                    placeholder="Titulo"
                    onChange={(v, e) => handleInputNewContentChange(v, 'title', e)}
                /><br />
                <Input
                    componentClass="textarea"
                    rows={3}
                    style={{ width: 450 }}
                    placeholder="Descrição"
                    onChange={(v, e) => handleInputNewContentChange(v, 'description', e)}
                /><br />
                <DatePicker
                    style={{ width: 450 }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={(v, e) => handleInputNewContentChange(v, 'date', e)}
                    ranges={[
                        {
                            label: 'Agora',
                            value: new Date(),
                        },
                    ]}
                /><br /><br />
                <Input
                    style={{ width: 450 }}
                    placeholder="Autor"
                    onChange={(v, e) => handleInputNewContentChange(v, 'author', e)}
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
