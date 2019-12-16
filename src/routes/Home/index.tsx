import React from 'react';

import SinglePostItem, { IPostInfo } from './SinglePostItem';


export default function Main() {
    const someFakePostInfo: IPostInfo[] = [{
        id: 1,
        author: 'Jane',
        date: '13 Nov, 2020',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante\
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia\
        Curae; In hac habitasse platea dictumst. Mauris scelerisque\
        pharetra orci, eu tempus purus malesuada nec. Integer elit\
        nulla, convallis sit amet sapien non, convallis faucibus erat.\
        Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in\
        velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.',
        title: 'Lorem ipsum dolor sit amet',
    }, {
        id: 2,
        author: 'Jane',
        date: '13 Nov, 2020',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
        Morbi suscipit sollicitudin eros eu tempus. Vestibulum ante\
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia\
        Curae; In hac habitasse platea dictumst. Mauris scelerisque\
        pharetra orci, eu tempus purus malesuada nec. Integer elit\
        nulla, convallis sit amet sapien non, convallis faucibus erat.\
        Donec sit amet rhoncus eros, quis maximus libero. Cras at tellus in\
        velit efficitur dictum in a massa. In vel mauris et urna volutpat cursus.',
        title: 'Lorem ipsum dolor sit amet',
    }];
    return (
        <>
            <SinglePostItem info={someFakePostInfo[0]} />
            <SinglePostItem info={someFakePostInfo[1]} />
        </>
    );
}
