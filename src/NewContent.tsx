import React, { useState } from 'react';
import {
    Button,
    Input,
    Modal,
} from 'rsuite';
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
        //
        props.setShow(false);
        event.preventDefault();
    };

    const handleInputNewContentChange = (
        value: string | string[],
        name: string,
        event: React.SyntheticEvent<HTMLElement, Event>,
    ) => {
        if (name === 'date') {
            setNewContentForm({
                ...newContentForm,
                date: value,
            } as any);
        }
        event.preventDefault();
    };

    return (
        <Modal full={true} show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Modal.Title>New Content</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    style={{ width: 300 }}
                    placeholder="Title"
                    onChange={(v, e) => handleInputNewContentChange(v, 'title', e)}
                /><br />
                <Input
                    style={{ width: 300 }}
                    placeholder="Description"
                    onChange={(v, e) => handleInputNewContentChange(v, 'description', e)}
                /><br />
                <Input
                    style={{ width: 300 }}
                    placeholder="Date"
                    onChange={(v, e) => handleInputNewContentChange(v, 'date', e)}
                /><br />
                <Input style={{ width: 300 }} placeholder="Location" /><br />
                <Input style={{ width: 300 }} placeholder="Seats" /><br />
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
