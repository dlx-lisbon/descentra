import React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';

import Box from '3box';
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    List,
} from 'rsuite';


interface IChatProps {
    threeBox: any;
}
export default function Chat(props: IChatProps) {
    const [loadingAccount, setLoadingAccount] = React.useState(false);
    const [connectedToChat, setConnectedToChat] = React.useState(false);
    const [profile, setProfile] = React.useState(undefined as any);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [messageToSend, setMessageToSend] = React.useState('');
    const [ghostThreadChat, setGhostThreadChat] = React.useState(undefined as any);

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

    const connectToChat = (event: React.SyntheticEvent<Element, Event>) => {
        const fetchData = async () => {
            setLoadingAccount(true);
            setProfile(await props.threeBox.public.all());
            const space = await loadSpace(props.threeBox);
            await loadChat(space);
            setLoadingAccount(false);
            setConnectedToChat(true);
        };
        fetchData();
        event.preventDefault();
    };

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

    const renderChat = () => {
        if (loadingAccount) {
            return 'Loading...';
        }
        if (connectedToChat) {
            return (
                <div>
                    {welcomeMessage()}
                    <br />
                    <br />
                    <List>{renderChatMessage()}</List>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Message</ControlLabel>
                            <FormControl
                                name="messageToSend"
                                value={messageToSend}
                                onChange={handleInputMessageToSend}
                            />
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
        } else {
            return (
                <Button onClick={connectToChat}>Open Chat</Button>
            );
        }
    };

    return (
        <div style={{ margin: '5%' }}>
            {renderChat()}
        </div>
    );
}
