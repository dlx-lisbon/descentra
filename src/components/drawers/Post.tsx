import format from 'date-format';
import React from 'react';
import styled from 'styled-components';

import 'rsuite/dist/styles/rsuite-default.css';

import {
    Avatar,
    Button,
    Col,
    Divider,
    FlexboxGrid,
    Grid,
    Icon,
    Row,
    Tag,
    TagGroup,
} from 'rsuite';
import { IPostInfo } from '../../interfaces';


interface IPostProps {
    content: IPostInfo;
}
export default function Post(props: IPostProps) {
    const ImagePost = styled.div`
        max-height: 240px,
        object-fit: cover,
        overflow: hidden,
        width: 100%,
    `;
    const PostContainer = styled.div`
        max-width: 900px;
    `;

    return (
        <PostContainer>
            <h2>{props.content.title}</h2>
            <TagGroup>
                <Tag color="red">Red</Tag>
                <Tag color="orange">Orange</Tag>
                <Tag color="yellow">Yellow</Tag>
                <Tag color="green">Green</Tag>
                <Tag color="cyan">Cyan</Tag>
                <Tag color="blue">Blue</Tag>
                <Tag color="violet">Violet</Tag>
            </TagGroup>
            <br />
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={3}>
                    <div style={{ lineHeight: 0 }}>
                        <Avatar circle={true} src="img/blog/c1.jpg" />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={18}>
                    <div style={{ lineHeight: 1.5 }}>
                        <p><b>PUBLICADO POR</b></p>
                        <p>{props.content.author}</p>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <p style={{ margin: '20px 0px' }}>{props.content.content}</p>
            <Grid>
                <Row className="show-grid">
                    <Col xs={8}>
                        <p>
                            <Icon icon="calendar" />
                            &nbsp;{format('dd/MM/yyyy', new Date(props.content.date * 1000))}
                        </p>
                        <p>
                            <Icon icon="clock-o" />
                            &nbsp;{format('hh:mm', new Date(props.content.date * 1000))}
                        </p>
                    </Col>
                </Row>
            </Grid>
        </PostContainer>
    );
}
