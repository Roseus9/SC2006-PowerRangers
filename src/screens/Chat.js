import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card} from "react-bootstrap";

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', messages: [] },
    { id: 2, name: 'Jane Smith', messages: [] },
    { id: 3, name: 'Bob Johnson', messages: [] },
  ]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    const newMessage = {
      sender: 'user',
      message: messageInput,
      timestamp: new Date(),
    };
    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        const updatedMessages = [...chat.messages, newMessage];
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });
    setChats(updatedChats);
    setSelectedChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, newMessage],
    }));
    setMessageInput('');
  };
  function LinkToProfile() {
    
  }
  function OfferPopup() {
    const inputValue = prompt('Enter a positive value up to 2 decimal places: ');
    const regex = /^\d+(\.\d{1,2})?$/; // regular expression to match positive value up to 2 decimal places
    if (regex.test(inputValue)) {
      const card = (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Price Offer</Card.Title>
            <Card.Text>
              ${inputValue}
            </Card.Text>
          </Card.Body>
        </Card>
      );
      // Code to send the card to the chat
      const newMessage = {
        sender: 'user',
        message: card,
        timestamp: new Date(),
      };
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          const updatedMessages = [...chat.messages, newMessage];
          return { ...chat, messages: updatedMessages };
        }
        return chat;
      });
      setChats(updatedChats);
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));
      setMessageInput('');

    } else {
      alert('Invalid input. Please enter a positive value up to 2 decimal places.');
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <ListGroup>
            {chats.map((chat) => (
              <ListGroup.Item
                key={chat.id}
                action
                active={selectedChat && selectedChat.id === chat.id}
                onClick={() => handleChatClick(chat)}
              >
                {chat.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <div style={{ height: '80vh', overflowY: 'scroll' }}>
          {selectedChat && (
            <div>
             <Button type="primary" onClick ={LinkToProfile}>
              Visit Profile
             </Button>
             <h2>{selectedChat.name}</h2>
              {selectedChat.messages.map((message, index) => (
                <div key={index}>
                   <p className={message.sender}>
                     {message.sender}: {message.message}
                  </p>
                  <small className="text-muted">
                    {new Date(message.timestamp).toLocaleString()}
                  </small>
               </div>
             ))}
          </div>
          )}
          </div>
          {selectedChat && (
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="messageInput">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit"onClick={handleSendMessage}>
                Send
              </Button>
              &nbsp;
              <Button variant="primary" onClick={OfferPopup}>
                Make Offer
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;