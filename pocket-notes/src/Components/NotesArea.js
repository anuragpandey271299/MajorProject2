import React, { useState } from 'react'
import './NotesArea.css'
import arrow from './images/arrow.png'

function NotesArea({ groupName, buttonClicked }) {

    const [message, setMessage] = useState('');
    const [displayedMessage, setDisplayedMessage] = useState('');

    const currDate = new Date();
    const date = currDate.getDate();
    const year = currDate.getFullYear();
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = monthName[currDate.getMonth()];

    const hrs = currDate.getHours();
    const minutes = currDate.getMinutes();

    const handleArrowClick=()=>{
        setDisplayedMessage(message);
        
    }
    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          setDisplayedMessage(message);
          setMessage('')
        }
      };
    
    return (
    <>
    <div className='NotesArea'>
        <div className='profile'>
            <div className='logo' style={{backgroundColor:buttonClicked}}>
            {groupName.length >= 2 ? (
                <span>{groupName[0]}{groupName.slice(-1)}</span>
              ) : (
                <span>{groupName}</span>
              )}
            </div>
            <div className='head'><h1>{groupName}</h1></div>
            <p>{displayedMessage}</p>
        </div>
        <textarea 
            value={message}
            placeholder='Enter your text here'
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={handleEnterPress}
        />
        <img src={arrow} alt='arrow' id='arrow' onClick={handleArrowClick}/>
    </div>
    </>
  )
}

export default NotesArea