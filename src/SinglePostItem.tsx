import format from 'date-format';
import React from 'react';
import styled from 'styled-components';

import 'rsuite/dist/styles/rsuite-default.css';

import {
    Avatar,
    Button,
    FlexboxGrid,
    Icon,
    Panel,
} from 'rsuite';
import { IMeetupInfo } from './interfaces';


interface ISinglePostItemProps {
    info: IMeetupInfo;
    onClick: (value: number) => void;
}
export default function SinglePostItem(props: ISinglePostItemProps) {
    const mainPanelStyle = {
        display: 'inline-block',
        margin: '50px auto',
        maxWidth: '700px',
        width: '100%',
    };
    const ImagePost = styled.div`
        max-height: 240px,
        object-fit: cover,
        overflow: hidden,
        width: 100%,
    `;
    const PostContainer = styled.div`
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        cursor: pointer;
    `;

    const sendToMeetupId = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onClick(props.info.id);
        event.preventDefault();
    };

    const coverImage = props.info.coverImage && <ImagePost>
        <img src={props.info.coverImage} alt="presenting" style={{ width: '100%' }} />
    </ImagePost>;

    const userAvatarSrc = ''; // 'https://ipfs.io/ipfs/' + props.info.author.image[0].contentUrl['/'];

    return (
        <PostContainer onClick={sendToMeetupId}>
            <Panel shaded={true} bordered={true} bodyFill={true} style={mainPanelStyle}>
                {coverImage}
                <Panel header={props.info.title} >
                    <div className="show-grid">

                        <FlexboxGrid align="middle">
                            <FlexboxGrid.Item colspan={3}>
                                <div style={{ lineHeight: 0 }}>
                                    <Avatar circle={true} src={userAvatarSrc} />
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={18}>
                                <div style={{ lineHeight: 1.5 }}>
                                    <p><b>{props.info.author.name}</b></p>
                                    <p>
                                        <Icon icon="calendar-check-o" />
                                        &nbsp;{format('dd/MM/yyyy hh:mm', new Date(props.info.date * 1000))}
                                    </p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                    {props.info.description.split('\n').map((i, index) => <p key={index}>{i}</p>)}
                    <Button>Continuar a ler</Button>
                </Panel>
            </Panel>
        </PostContainer>
    );
}
