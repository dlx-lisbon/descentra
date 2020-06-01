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
import slug from 'slug';
import { ethers } from 'ethers';

import PostModel from '../../../helpers/orbitdb/PostModel';
import { IPostInfo } from '../../../interfaces';

interface INewPost {
    slug: string;
    author: string;
    date: Date;
    description: string;
    title: string;
    coverImage: string;
}

interface INewPostProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    postModel?: PostModel;
}

export default function NewPost(props: INewPostProps) {
    const emptyForm = {
        slug: '',
        author: '',
        date: new Date(),
        description: '',
        title: '',
        coverImage: '',
    }
    const [newContentForm, setNewPostForm] = useState<INewPost>(emptyForm);

    const postNewPost = (event: React.SyntheticEvent<Element, Event>) => {
        console.log(props.postModel);
        if (props.postModel === undefined) {
            console.log('1');
            // TODO: show error!
        } else {
            // TODO: gerar slug utilizando timestamp e o titulo e assinar com web3 wallet
            // guardar também assinatura. Ao guardar assinatura, o autor passa a ser o endereço
            // de sem assinou o post.
            const postSlug = `${(new Date()).getTime().toString()}-${slug(newContentForm.title, { lower: true })}`
            console.log(postSlug);
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const signer = provider.getSigner();
            console.log(postSlug);
            signer.signMessage(postSlug)
                .then((signature) => {
                    const newPost: IPostInfo = {
                        author: signature,
                        content: newContentForm.description,
                        date: newContentForm.date.getTime(),
                        title: newContentForm.title,
                        slug: postSlug,
                    }
                    if (newContentForm.coverImage.length > 0) {
                        newPost.coverImage = newContentForm.coverImage;
                    }
                    props.postModel!.add(newPost).then(() => {
                        props.setShow(false)
                        setNewPostForm(emptyForm)
                    });
                });

        }
        event.preventDefault();
    };

    const handleInputContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case 'description':
                setNewPostForm({
                    ...newContentForm,
                    description: event.target.value,
                });
                break;
            case 'title':
                setNewPostForm({
                    ...newContentForm,
                    title: event.target.value,
                });
                break;
            case 'coverImage':
                setNewPostForm({
                    ...newContentForm,
                    coverImage: event.target.value,
                });
                break;
        }
        event.preventDefault();
    };

    const handleInputDateContentChange = (date: MaterialUiPickersDate) => {
        if (date !== null) {
            setNewPostForm({
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
            maxWidth="lg"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Nova Publicação</DialogTitle>
            <DialogContent>
                <TextField
                    value={newContentForm.title}
                    onChange={handleInputContentChange}
                    style={{ width: '100%' }}
                    name="title"
                    label="Titulo"
                    variant="outlined"
                    required={true}
                /><br /><br />
                <TextField
                    value={newContentForm.description}
                    onChange={handleInputContentChange}
                    style={{ width: '100%' }}
                    name="description"
                    label="Descricao"
                    variant="outlined"
                    required={true}
                    multiline={true}
                    rows="15"

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
                    value={newContentForm.coverImage}
                    onChange={handleInputContentChange}
                    style={{ width: '100%' }}
                    name="coverImage"
                    label="Imagem de apresentação"
                    variant="outlined"
                /><br />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setShow(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={postNewPost} color="primary">
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
}
