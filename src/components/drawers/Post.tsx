import moment from 'moment';
import React from 'react';
import { IPostInfo } from '../../interfaces';
import { Card, Typography, CardContent } from '@material-ui/core';
import { ethers } from 'ethers';
import showdown from 'showdown';

interface IPostProps {
    content: IPostInfo;
}
export default function Post(props: IPostProps) {
    const authorAddress = ethers.utils.verifyMessage(props.content.slug, props.content.author);
    const converter = new showdown.Converter();
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
