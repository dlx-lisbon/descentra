import DateFnsUtils from '@date-io/date-fns';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import 'date-fns';
import React, { useState } from 'react';

import PostModel from '../../helpers/orbitdb/PostModel';
import {IPostInfo} from '../../interfaces';


interface INewContent {
    author: string;
    date: Date;
    description: string;
    title: string;
}
interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    postModel: PostModel;
}
export default function NewContent(props: INewContentProps) {
    const [newContentForm, setNewContentForm] = useState<INewContent>({
        author: '',
        date: new Date(),
        description: '',
        title: '',
    });

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        const newPost: IPostInfo = {
            author: newContentForm.author,
            content: newContentForm.description,
            date: newContentForm.date.getTime(),
            title: newContentForm.title
        }
        props.postModel.add(newPost).then(() => props.setShow(false));
        event.preventDefault();
    };

    const handleInputContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case 'description':
                setNewContentForm({
                    ...newContentForm,
                    description: event.target.value,
                });
                break;
            case 'title':
                setNewContentForm({
                    ...newContentForm,
                    title: event.target.value,
                });
                break;
            case 'author':
                setNewContentForm({
                    ...newContentForm,
                    author: event.target.value,
                });
                break;
        }
        event.preventDefault();
    };

    const handleInputDateContentChange = (date: MaterialUiPickersDate) => {
        if (date !== null) {
            setNewContentForm({
                ...newContentForm,
                date: new Date(date.getTime()),
            });
        }
    };

    return (
        <Dialog
            open={props.show}
            onClose={() => props.setShow(false)}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Novo Conteudo</DialogTitle>
            <DialogContent>
                <TextField
                    value={newContentForm.title}
                    onChange={handleInputContentChange}
                    name="title"
                    label="Titulo"
                    variant="outlined"
                /><br /><br />
                <TextField
                    value={newContentForm.description}
                    onChange={handleInputContentChange}
                    name="description"
                    label="Descricao"
                    variant="outlined"
                    multiline={true}
                    rows="4"
                    rowsMax="8"
                /><br /><br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Data"
                        name="date"
                        inputVariant="outlined"
                        value={newContentForm.date}
                        onChange={handleInputDateContentChange}
                    />
                </MuiPickersUtilsProvider>
                <br /><br />
                <TextField
                    value={newContentForm.author}
                    onChange={handleInputContentChange}
                    name="author"
                    label="Autor"
                    variant="outlined"
                /><br />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setShow(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={postNewContent} color="primary">
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
}
