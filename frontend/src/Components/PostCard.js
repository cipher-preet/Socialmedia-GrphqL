import React from 'react';
import { Button, Card, Image,Icon,Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';



const PostCard = ({post: {body,createdAt,id,username,likeCount,commentCount,likes}}) => {

    const likePost = () =>{
        console.log("like the post")
    }
    const commentPost = () =>{
        console.log("comment the post")
    }
  return (
    <Card.Group>
    <Card>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentPost}>
      <Button color='teal' basic>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
    </Card.Group>
  )
}

export default PostCard
