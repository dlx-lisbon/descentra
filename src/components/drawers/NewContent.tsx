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
import { IPostInfo } from '../../interfaces';

interface INewContent {
    author: string;
    date: Date;
    description: string;
    title: string;
    coverImage: string;
}

interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    postModel?: PostModel;
}

export default function NewContent(props: INewContentProps) {
    const emptyForm = {
        author: '',
        date: new Date(),
        description: '',
        title: '',
        coverImage: '',
    }
    const [newContentForm, setNewContentForm] = useState<INewContent>(emptyForm);

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        if (props.postModel === undefined) {
            // TODO: show error!
        } else {
            // TODO: gerar slug utilizando timestamp e o titulo e assinar com web3 wallet
            // guardar também assinatura. Ao guardar assinatura, o autor passa a ser o endereço
            // de sem assinou o post.
            const newPost: IPostInfo = {
                author: newContentForm.author,
                content: newContentForm.description,
                date: newContentForm.date.getTime(),
                title: newContentForm.title
            }
            if (newContentForm.coverImage.length > 0) {
                newPost.coverImage = newContentForm.coverImage;
            }
            props.postModel.add(newPost).then(() => {
                props.setShow(false)
                setNewContentForm(emptyForm)
            });
        }
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
            case 'coverImage':
                setNewContentForm({
                    ...newContentForm,
                    coverImage: event.target.value,
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
                    required={true}
                    /><br /><br />
                <TextField
                    value={newContentForm.description}
                    onChange={handleInputContentChange}
                    name="description"
                    label="Descricao"
                    variant="outlined"
                    required={true}
                    multiline={true}
                    rows="4"
                    rowsMax="8"
                    /><br /><br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Data"
                        name="date"
                        inputVariant="outlined"
                        required={true}
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
                /><br /><br />
                <TextField
                    value={newContentForm.coverImage}
                    onChange={handleInputContentChange}
                    name="coverImage"
                    label="Imagem de apresentação"
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
