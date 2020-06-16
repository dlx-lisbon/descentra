import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { ethers } from 'ethers';
import moment from 'moment';
import React from 'react';
import showdown from 'showdown';
import { IPostInfo } from '../../interfaces';

interface IPostProps {
    content: IPostInfo;
    close: () => void;
}
export default function Post(props: IPostProps) {
    const authorAddress = ethers.utils.verifyMessage(props.content.slug, props.content.author);
    const converter = new showdown.Converter();
    return (
        <Dialog
            open={true}
            onClose={props.close}
            scroll={'body'}
            fullWidth={true}
            maxWidth="lg"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{props.content.title}</DialogTitle>
            <DialogContent dividers={false}>
                {props.content.coverImage !== undefined && (
                    <div
                        style={{
                            background: `url("${props.content.coverImage}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `$300px auto`,
                            backgroundPosition: 'center',
                            height: '200px',
                        }}
                    />
                )}
                <Typography variant="overline" display="block" gutterBottom style={{ color: 'grey' }}>
                    by {authorAddress.substr(0, 7)}...{authorAddress.substr(35, 42)},{' '}
                    {moment(props.content.date).fromNow()}
                </Typography>
                {/** As we want to render string html into a component */}
                {/** we are using *dangerouslySetInnerHTML* and using the */}
                {/** same classes so we can have the same style */}
                <div
                    id="scroll-dialog-description"
                    className="MuiTypography-root MuiTypography-gutterBottom MuiTypography-body2"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.content.content) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
