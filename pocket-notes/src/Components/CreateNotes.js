import React, { useState, useEffect } from 'react';
import './CreateNotes.css';

function CreateNotes(props) {
    const [groupName, setGroupName] = useState('');
    const [buttonClicked, setButtonClicked] = useState('');
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage]=useState('')
    useEffect(() => {
        const storedNotes = localStorage.getItem('notesData');
        if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
        }
    }, []);
    
    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

  const handleButtonClick = (color) => {
    setButtonClicked(color);
    };

    const handleCreateNote = (e) => {
        e.preventDefault();
        const newNote = { groupName, buttonClicked, id: Date.now() + Math.random() };
        if (validateGroupName()) {
            const updatedNotes = [...notes, newNote];
            localStorage.setItem('notesData', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            props.setShowCreateNotes(false);
        }
        console.log(newNote.id)
        setGroupName('');
        setButtonClicked('');
     };
     

    const validateGroupName=()=>{
        if(groupName===''){
            setErrorMessage('Enter group name')
            return false;
        }
        return true;
        
    }

  return (
    <>
      <form className='CreateNotesFrom' onSubmit={handleCreateNote}>
        <h1>Create New Notes Group</h1>
        <label>Group Name</label>
        <input
          placeholder='Enter group name'
          value={groupName}
          onChange={handleGroupNameChange}
        />
        <p>{errorMessage}</p>
        <div className='colors'>
          <h1>Choose colour</h1>
          <div className='divs'>
            <div
              style={{ backgroundColor: '#B38BFA' }}
              onClick={() => handleButtonClick('#B38BFA')}
            ></div>
            <div
              style={{ backgroundColor: '#FF79F2' }}
              onClick={() => handleButtonClick('#FF79F2')}
            ></div>
            <div
              style={{ backgroundColor: '#43E6FC' }}
              onClick={() => handleButtonClick('#43E6FC')}
            ></div>
            <div
              style={{ backgroundColor: '#F19576' }}
              onClick={() => handleButtonClick('#F19576')}
            ></div>
            <div
              style={{ backgroundColor: '#0047FF' }}
              onClick={() => handleButtonClick('#0047FF')}
            ></div>
            <div
              style={{ backgroundColor: '#6691FF' }}
              onClick={() => handleButtonClick('#6691FF')}
            ></div>
          </div>
        </div>
        <button >Create</button>
      </form>
    </>
  );
}

export default CreateNotes;
