import React from "react";
import moment from "moment";
import { Comment, Image  } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};

const timeFromNow = timestamp => moment(timestamp).fromNow();


const Message = ({ message, user , photoURL, fullName}) => (
  <Comment>
    <Comment.Avatar src={photoURL}>   </Comment.Avatar>
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{fullName}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      
    </Comment.Content>
 

  </Comment>

);

export default Message;