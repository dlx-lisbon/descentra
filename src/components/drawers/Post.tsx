import moment from 'moment';
import React from 'react';
import { IPostInfo } from '../../interfaces';
import { Card, Typography, CardContent } from '@material-ui/core';
import { ethers } from 'ethers';

interface IPostProps {
    content: IPostInfo;
}
export default function Post(props: IPostProps) {
    const authorAddress = ethers.utils.verifyMessage(props.content.slug, props.content.author);

    return (
        <Card>
            <CardContent>
                {props.content.coverImage !== undefined && <div style={{
                    background: `url("${props.content.coverImage}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `$300px auto`,
                    backgroundPosition: 'center',
                    height: '200px'
                }} />}
                <Typography variant="h2" component="h2" gutterBottom>
                    {props.content.title}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom style={{ color: 'grey' }}>
                    by {authorAddress.substr(0, 7)}...{authorAddress.substr(35, 42)}, {moment(props.content.date).fromNow()}
                </Typography>
                <Typography variant="body2" gutterBottom>{props.content.content}</Typography>
            </CardContent>
        </Card>
    );
}
