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

import MeetupModel from '../../../helpers/orbitdb/MeetupModel';
import {IMeetupInfo} from '../../../interfaces';

interface INewContentProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    meetupModel?: MeetupModel;
}
export default function NewContent(props: INewContentProps) {
    const emptyForm = {
        slug: '',
        author: '',
        date: (new Date()).getTime(),
        description: '',
        title: '',
        location: '',
        status: false
    }
    const [newMeetupForm, setNewMeetupForm] = useState<IMeetupInfo>(emptyForm);

    const postNewContent = (event: React.SyntheticEvent<Element, Event>) => {
        if (props.meetupModel === undefined) {
            // TODO: sow error
        } else {
            props.meetupModel.add(newMeetupForm).then(() => {
                props.setShow(false)
                setNewMeetupForm(emptyForm)
            });
        }
        event.preventDefault();
    };

    const handleInputContentChange = (key: string, value: string | number) => {
        setNewMeetupForm({ ...newMeetupForm, [key]: value });
    };

    return (
        <Dialog
            open={props.show}
            onClose={() => props.setShow(false)}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Novo Meetup</DialogTitle>
            <DialogContent>
                <TextField
                    value={newMeetupForm.title}
                    onChange={e => handleInputContentChange('title', e.target.value)}
                    name="title"
                    label="Titulo"
                    variant="outlined"
                /><br /><br />
                <TextField
                    value={newMeetupForm.description}
                    onChange={e => handleInputContentChange('description', e.target.value)}
                    name="description"
                    label="Descrição"
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
                        value={new Date(newMeetupForm.date)}
                        onChange={
                            (date: MaterialUiPickersDate) => date !== null && handleInputContentChange('date', date.getTime())
                        }
                    />
                </MuiPickersUtilsProvider>
                <br /><br />
                <TextField
                    value={newMeetupForm.author}
                    onChange={e => handleInputContentChange('author', e.target.value)}
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
