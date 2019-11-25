import React, { useEffect } from 'react';

import Box from '3box';
import { List, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'rsuite';


export default function Chat() {
    const [loadingAccount, setLoadingAccount] = React.useState(true);
    const [profile, setProfile] = React.useState(undefined as any);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [messageToSend, setMessageToSend] = React.useState('');
    const [ghostThreadChat, setGhostThreadChat] = React.useState(undefined as any);

    const loadUserBox = async () => {
        await (window as any).ethereum.enable();
        const userAddress = (window as any).ethereum.selectedAddress;
        const box = await Box.openBox(userAddress, (window as any).ethereum);
        await box.syncDone;
        return box;
    };

    const loadSpace = async (box: any) => {
        const space = await box.openSpace('dlx');
        await space.syncDone;
        return space;
    };

    const loadChat = async (space: any) => {
        const thread = await space.joinThread('dlxOpenChat', {
            ghost: true,
        });
        setChatMessages(await thread.getPosts(20));
        thread.onUpdate(async () => {
            const newMessages = await thread.getPosts();
            setChatMessages(newMessages);
        });
        thread.onNewCapabilities((event: any, did: any) => console.log(did, event, ' the chat'));
        const userList = await thread.listMembers();
        setGhostThreadChat(thread);
        setOnlineUsers(userList);
    };

    useEffect(() => {
        const fetchData = async () => {
            const box = await loadUserBox();
            setProfile(await box.public.all());
            const space = await loadSpace(box);
            await loadChat(space);
            setLoadingAccount(false);
        };
        fetchData();
    }, []);

    const welcomeMessage = () => {
        if (profile !== undefined) {
            return `Welcome, ${profile.name}`;
        }
    };

    const sendMessage = (event: React.SyntheticEvent<Element, Event>) => {
        ghostThreadChat.post(messageToSend);
        setMessageToSend('');
        event.preventDefault();
    };

    const handleInputMessageToSend = (value: any, event: React.SyntheticEvent<HTMLElement, Event>) => {
        setMessageToSend(value);
    };

    const renderChatMessage = () => (
        chatMessages.map((item: { author: string, message: string, timestamp: number }, index) =>
            <List.Item key={index} index={index}>
                From: {item.author} - {item.message}
            </List.Item>,
        )
    );

    const renderOnlineUsers = () => (
        onlineUsers.map((item: { author: string, message: string, timestamp: number }, index) =>
            <List.Item key={index} index={index}>
                From: {item.author} - {item.message}
            </List.Item>,
        )
    );


    return (
        <div>
            {loadingAccount ? 'Loading...' : welcomeMessage()}
            <br />
            <br />
            <List>{renderChatMessage()}</List>
            <Form>
                <FormGroup>
                    <ControlLabel>Message</ControlLabel>
                    <FormControl name="messageToSend" value={messageToSend} onChange={handleInputMessageToSend} />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={sendMessage}>Send</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
            Online Users
            <List>{renderOnlineUsers()}</List>
        </div>
    );
}
