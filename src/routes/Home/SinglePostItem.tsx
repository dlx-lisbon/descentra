import React from 'react';
import styled from 'styled-components';


import {
    Avatar,
    Button,
    FlexboxGrid,
    Icon,
    Panel,
} from 'rsuite';

const mainPanelStyle = {
    display: 'inline-block',
    margin: '50px auto',
    width: '700px',
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
`;


export default function SinglePostItem() {
    return (
        <PostContainer>
            <Panel shaded={true} bordered={true} bodyFill={true} style={mainPanelStyle}>
                <ImagePost>
                    <img src="/img/posts/p2.jpg" alt="presenting" style={{ width: '100%' }} />
                </ImagePost>
                <Panel header="Lorem ipsum dolor sit amet" >
                    <div className="show-grid">

                        <FlexboxGrid align="middle">
                            <FlexboxGrid.Item colspan={3}>
                                <div style={{ lineHeight: 0 }}>
                                    <Avatar circle={true} src="/img/blog/c1.jpg" />
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={18}>
                                <div style={{ lineHeight: 1.5 }}>
                                    <p><b>THE PUBLISHER NAME</b></p>
                                    <p><Icon icon="calendar-check-o" /> 13TH OCT, 2019</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
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
                    <Button>Continue reading</Button>
                </Panel>
            </Panel>
        </PostContainer>
    );
}
