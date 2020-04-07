import React from 'react';
import { List, ListItemText, ListItem } from '@material-ui/core';

export default function Practice() {
    const online = [
        {
            title: 'cryptozombies',
            url: 'https://cryptozombies.io',
        },
        {
            title: 'gitcoin quests',
            url: 'https://gitcoin.co/quests',
        },
        {
            title: 'ethernaut',
            url: 'https://ethernaut.openzeppelin.com/',
        },
    ];
    const challenges = [
        {
            description: 'Guardar um numero, bytes e uma string num contrato. Depois, obtem esses valores do contrato.',
            title: 'Guarda conteudo',
        },
    ];

    return (
        <>
            <h1>Online</h1>
            <List>
                {online.map((item, index) =>
                    <ListItem key={index} component="a" href={item.url}>
                        <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                )}
            </List>
            <h1>Nossos desafios</h1>
            <List>
                {challenges.map((item, index) =>
                    <ListItem key={index}>
                        {item.title}
                    </ListItem>,
                )}
            </List>
        </>
    );
}
