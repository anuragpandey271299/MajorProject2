import React, { useState, useEffect, useRef } from 'react';
import CreateNotes from './CreateNotes';
import './LeftSide.css';

function LeftSide() {

    
  const [showCreateNotes, setShowCreateNotes] = useState(false);
  const containerRef = useRef(null);
  const createNotesRef = useRef(null);

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

  const storedNotes = JSON.parse(localStorage.getItem('notesData'));


  return (
      <div ref={containerRef} className='wrapperLeftSide' >
        <h1>Pocket Notes</h1>
      <button onClick={handleCreateNotes}>Create Note Group</button>
      {showCreateNotes && <CreateNotes setShowCreateNotes={setShowCreateNotes} />}
      <div className='NoteGroups'>
          {storedNotes && storedNotes.map((note) => (
            <div className='profile'>
            <div className='logo' style={{backgroundColor:note.buttonClicked}}>
            {note.groupName.length >= 2 ? (
                <span>{note.groupName[0]}{note.groupName.slice(-1)}</span>
              ) : (
                <span>{note.groupName}</span>
              )}
            </div>
            <div className='head'><h1>{note.groupName}</h1></div>
              
              </div>
          ))}
      </div>
    </div>
  );
}

export default LeftSide;