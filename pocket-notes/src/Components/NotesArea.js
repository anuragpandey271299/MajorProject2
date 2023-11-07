import React, { useState } from 'react';
import './NotesArea.css';
import arrow from './images/arrow.png';

function NotesArea({ groupName, buttonClicked, id }) {
  const [displayedMessages, setDisplayedMessages] = useState({});
  const [message, setMessage] = useState('');

  const currDate = new Date();
  let date = currDate.getDate() < 10 ? `0${currDate.getDate()}` : currDate.getDate();
  const year = currDate.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthName[currDate.getMonth()];
    let hrs = currDate.getHours() >= 12 ? currDate.getHours() - 12 : (currDate.getHours() < 10 ? `0${currDate.getHours()}`: currDate.getHours());
    let period = currDate.getHours() >= 12 ? 'PM' : 'AM';
    let minutes = currDate.getMinutes() < 10 ? `0${currDate.getMinutes()}` : currDate.getMinutes();
  const handleArrowClick = () => {
    if (message.trim() !== '') {
      const newMessage = {
        content: message,
        date: date,
        month: month,
        year:year,
        time: `${hrs}:${minutes}`,
      };
  
      setDisplayedMessages((prevMessages) => ({...prevMessages,
        [id]: [...(prevMessages[id] || []), newMessage],
      }));
      setMessage('');
    }
  }
  
  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleArrowClick();
    }
  };
  
  return (
    <div className='NotesArea'>
      <div className='profile'>
        <div className='logo' style={{ backgroundColor: buttonClicked }}>
          {groupName.length >= 2 ? (
            <span>{groupName[0]}{groupName.slice(-1)}</span>
          ) : (
            <span>{groupName}</span>
          )}
        </div>
        <div className='head'><h1>{groupName}</h1></div>
      </div>
        <div className='messageList'>
          {displayedMessages[id] &&
            displayedMessages[id].map((message, index) => (
            <div className='messageArea'>
              <p key={index}>
              {message.time} {period} <br/> {message.date} {message.month} {message.year}  
              </p>
                <h4>{message.content}</h4>
            </div>
            ))}
        </div>
      <textarea
        value={message}
        placeholder='Enter your text here'
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <img src={arrow} alt='arrow' id='arrow' onClick={handleArrowClick} />
    </div>
  );
}

export default NotesArea;
