import React from 'react';
import { List } from 'rsuite';


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
                    <List.Item key={index} index={index}>
                        <a href={item.url}>{item.title}</a>
                    </List.Item>,
                )}
            </List>
            <h1>Nossos desafios</h1>
            <List>
                {challenges.map((item, index) =>
                    <List.Item key={index} index={index}>
                        {item.title}
                    </List.Item>,
                )}
            </List>
        </>
    );
}
