import React, {useState} from 'react';
import '../App.css';

const Message = () => {
    const [userId, setUserId] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [roomName, setRoomName] = useState(null);
    const [messages, setMessages]= useState([]);
    const [newMessage, setNewMessage] = useState('');


    return(
        <div className="App">
        <aside className="sidebar left-sidebar"></aside>
        <section className="chat-screen">
          <header className="chat-header"></header>
          <ul className="chat-messages"></ul>
          <footer className="chat-footer">
            <form className="message-form">
              <input
                type="text"
                name="newMessage"
                className="message-input"
                placeholder="Type your message and hit ENTER to send"
              />
            </form>
          </footer>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </div>
    )
}

export default Message;