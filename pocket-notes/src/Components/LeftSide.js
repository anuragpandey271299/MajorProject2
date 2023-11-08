import React, { useState, useEffect, useRef } from 'react';
import CreateNotes from './CreateNotes';
import './LeftSide.css';

function LeftSide({ onProfileClick }) {
  const [showCreateNotes, setShowCreateNotes] = useState(false);
  const containerRef = useRef(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isWrapperLeftSideClicked, setIsWrapperLeftSideClicked] = useState(false);

  const storedNotes = JSON.parse(localStorage.getItem('notesData'));
  console.log(storedNotes);

  const handleProfileClick = (id) => {
    setSelectedProfile(id);
  }

  const handleCreateNotes = () => {
    setShowCreateNotes(true);
  }

  const handleWrapperLeftSideClick = (event) => {
      if (event.target.id !== 'create-notes-button') {
          setIsWrapperLeftSideClicked(false)
          console.log('wrapperLeftSide clicked');
        }
            setIsWrapperLeftSideClicked(true);
        
  };
  

  useEffect(() => {
    const handleContainerClick = (event) => {
      if (showCreateNotes && containerRef.current && !containerRef.current.contains(event.target)) {
        setShowCreateNotes(false);
      }
    };

    if (showCreateNotes) {
      document.addEventListener('click', handleContainerClick);
    } else {
      document.removeEventListener('click', handleContainerClick);
    }

    containerRef.current.addEventListener('click', handleWrapperLeftSideClick);

    return () => {
      document.removeEventListener('click', handleContainerClick);
      containerRef.current.removeEventListener('click', handleWrapperLeftSideClick);
    };
  }, [showCreateNotes]);

  return (
    <>
    <div ref={containerRef} className={`wrapperLeftSide ${isWrapperLeftSideClicked ? 'clicked' : ''}`} >
      <h1>Pocket Notes</h1>
      <button onClick={handleCreateNotes}>Create Note Group</button>
      {showCreateNotes && <CreateNotes setShowCreateNotes={setShowCreateNotes} />}
      <div className='NoteGroups'>
        {storedNotes && storedNotes.slice().reverse().map((note) => (
          <div
            className={`profile ${selectedProfile === note.id ? 'selected' : ''}`}
            onClick={() => {
              onProfileClick(note.groupName, note.buttonClicked, note.id);
              handleProfileClick(note.id);
            }}
          >
            <div className='logo' style={{ backgroundColor: note.buttonClicked }}>
              {note.groupName.length >= 2 ? (
                <span>{note.groupName[0]}{note.groupName.slice(-1)}</span>
              ) : (
                <span>{note.groupName}</span>
              )}
            </div>
            <div className='head'><h1>{note.groupName.slice(0, 15)}</h1></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default LeftSide;
