import React from 'react';
import styled from 'styled-components';

import {
    Avatar,
    Button,
    Col,
    Divider,
    FlexboxGrid,
    Grid,
    Row,
    TagGroup,
    Tag,
    Icon,
} from 'rsuite';


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


export default function Meetup() {
    return (
        <PostContainer>
            <ImagePost>
                <img src="/img/posts/p2.jpg" alt="presenting" style={{ width: '100%' }} />
            </ImagePost>
            <h2>Lorem ipsum dolor sit amet</h2>
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
                        <Avatar circle={true} src="/img/blog/c1.jpg" />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={18}>
                    <div style={{ lineHeight: 1.5 }}>
                        <p><b>ORGANIZED BY</b></p>
                        <p>publishers name</p>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <p style={{ margin: '20px 0px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; In hac habitasse platea dictumst. Mauris scelerisque
                pharetra orci, eu tempus purus malesuada nec. Integer elit
                nulla, convallis sit amet sapien non, convallis faucibus erat.
                Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in
                velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.
            </p>
            <Grid>
                <Row className="show-grid">
                    <Col xs={8}>
                    <p><Icon icon="calendar" />&nbsp;13 Jan, 2037</p>
                    <p><Icon icon="clock-o" />&nbsp;18h30</p>
                    <p><Icon icon="map-marker" />&nbsp;Tropical Insland</p>
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
            <Button>Join</Button>
            <Divider>Participants</Divider>
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
