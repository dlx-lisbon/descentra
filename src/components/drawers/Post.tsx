import moment from 'moment';
import React from 'react';
import { IPostInfo } from '../../interfaces';
import { Card, Typography, CardContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ethers } from 'ethers';
import showdown from 'showdown';

interface IPostProps {
    content: IPostInfo;
    close: () => void;
}
export default function Post(props: IPostProps) {
    const authorAddress = ethers.utils.verifyMessage(props.content.slug, props.content.author);
    const converter = new showdown.Converter();
    return (
        <Card style={{ overflow: 'scroll' }}>
            <CardContent>
                {props.content.coverImage !== undefined && <div style={{
                    background: `url("${props.content.coverImage}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `$300px auto`,
                    backgroundPosition: 'center',
                    height: '200px'
                }} />}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h2" component="h2" gutterBottom>
                        {props.content.title}
                    </Typography>
                    <IconButton aria-label="close" onClick={props.close}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="overline" display="block" gutterBottom style={{ color: 'grey' }}>
                    by {authorAddress.substr(0, 7)}...{authorAddress.substr(35, 42)}, {moment(props.content.date).fromNow()}
                </Typography>
                {/** As we want to render string html into a component */}
                {/** we are using *dangerouslySetInnerHTML* and using the */}
                {/** same classes so we can have the same style */}
                <div
                    className="MuiTypography-root MuiTypography-gutterBottom MuiTypography-body2"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.content.content) }}
                />
            </CardContent>
        </Card>
    );
}
