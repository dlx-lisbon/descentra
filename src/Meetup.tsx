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
import { IMeetupInfo } from './interfaces';


interface IMeetupProps {
    meetupData: IMeetupInfo;
}
export default function Meetup(props: IMeetupProps) {
    const ImagePost = styled.div`
        max-height: 240px,
        object-fit: cover,
        overflow: hidden,
        width: 100%,
    `;
    const PostContainer = styled.div`
        max-width: 900px;
        padding: 50px 80px;
    `;

    return (
        <PostContainer>
            <ImagePost>
                <img src="img/posts/p2.jpg" alt="presenting" style={{ width: '100%' }} />
            </ImagePost>
            <h2>{props.meetupData.title}</h2>
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
                        <p><b>ORGANIZADO POR</b></p>
                        <p>{props.meetupData.author}</p>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <p style={{ margin: '20px 0px' }}>{props.meetupData.description}</p>
            <Grid>
                <Row className="show-grid">
                    <Col xs={8}>
                        <p>
                            <Icon icon="calendar" />
                            &nbsp;{format('dd/MM/yyyy', new Date(props.meetupData.date * 1000))}
                        </p>
                        <p>
                            <Icon icon="clock-o" />
                            &nbsp;{format('hh:mm', new Date(props.meetupData.date * 1000))}
                        </p>
                        <p>
                            <Icon icon="map-marker" />
                            &nbsp;{props.meetupData.location}
                        </p>
                    </Col>
                    <Col xs={12}>
                        <img
                            src="https://www.edenbeing.com/wp-content/uploads/2019/09/runners-high-featured-image-500x500.jpg"
                            alt="random map"
                            height="200px"
                        />
                    </Col>
                </Row>
            </Grid>
            <Button>Participar</Button>
            <Divider>Participantes</Divider>
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                    <Col xs={2}><Avatar style={{ background: '#7B1FA2' }}>RS</Avatar></Col>
                </Row>
            </Grid>
        </PostContainer>
    );
}
