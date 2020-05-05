import moment from 'moment';
import React from 'react';
import { IMeetupInfo } from '../../interfaces';
import { Card, CardHeader, Avatar, Typography, CardContent, makeStyles } from '@material-ui/core';

interface IMeetupProps {
    content: IMeetupInfo;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Meetup(props: IMeetupProps) {
    const classes = useStyles()

    return (
        <Card>
            <CardHeader
                avatar={<Avatar alt="username" src="img/blog/c1.jpg" /> }
                title={props.content.title}
                subheader={moment(props.content.date).fromNow()}
            />
            <CardContent>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {props.content.author}
                </Typography>
                {props.content.description}
            </CardContent>
        </Card>
    );
}
