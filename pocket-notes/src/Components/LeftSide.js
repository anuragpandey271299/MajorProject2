import React, { useState, useEffect, useRef } from 'react';
import CreateNotes from './CreateNotes';
import './LeftSide.css';

function LeftSide({ onProfileClick }) {
  const [showCreateNotes, setShowCreateNotes] = useState(false);
  const containerRef = useRef(null);

  const storedNotes = JSON.parse(localStorage.getItem('notesData'));
  console.log(storedNotes);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (id) => {
    setSelectedProfile(id);
  }
  const handleCreateNotes = () => {
    setShowCreateNotes(true);
  }

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

    return () => {
      document.removeEventListener('click', handleContainerClick);
    };
  }, [showCreateNotes]);


  return (
    <div ref={containerRef} className='wrapperLeftSide' >
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
  );
}

export default LeftSide;
