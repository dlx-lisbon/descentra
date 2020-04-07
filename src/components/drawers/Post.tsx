import format from 'date-format';
import React from 'react';
import { IPostInfo } from '../../interfaces';
import {Card, CardHeader, Avatar, Typography, CardContent, makeStyles} from '@material-ui/core';

interface IPostProps {
    content: IPostInfo;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Post(props: IPostProps) {
    const classes = useStyles()

    return (
        <Card>
            <CardHeader
                avatar={ <Avatar alt="username" src="img/blog/c1.jpg" /> }
                title={props.content.title}
                subheader={format('dd/MM/yyyy', new Date(props.content.date))}
            />
            <CardContent>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {props.content.author}
                </Typography>
                {props.content.content}
            </CardContent>
        </Card>
    );

        /*<PostContainer>
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
            </PostContainer>*/
}
