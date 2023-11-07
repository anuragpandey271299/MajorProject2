import React, { useState, useEffect } from 'react';
import './CreateNotes.css';

function CreateNotes(props) {
    const [groupName, setGroupName] = useState('');
    const [buttonClicked, setButtonClicked] = useState('');
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage]=useState('')
    const [colorError, setColorError] = useState('');
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
        validateGroupName();
        validateColor();
        if (validateGroupName() && validateColor()) {
            const updatedNotes = [...notes, newNote];
            localStorage.setItem('notesData', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            props.setShowCreateNotes(false);
        }
        console.log(newNote.id)
     };
     

    const validateGroupName=()=>{
        if(groupName===''){
            setErrorMessage('Enter group name')
            return false;
        }
        setGroupName(groupName);
        setErrorMessage('')
        return true;  
    }

    const validateColor = () => {
        if (buttonClicked === '') {
          setColorError('Select a color');
          return false;
        }
        return true;
      };
      const handleOverlayClick = () => {
        props.setShowCreateNotes(false);
      };

  return (
    <>
    <div className='overlay' onClick={handleOverlayClick}>
      <form className='CreateNotesForm' onSubmit={handleCreateNote} onClick={(e) => e.stopPropagation()}>
        <h1>Create New Notes Group</h1>
        <div className='groupName'>
        <label>Group Name</label>
        <input
          placeholder='Enter group name'
          value={groupName}
          onChange={handleGroupNameChange}
        />
        </div>
        <p className='error1'>{errorMessage}</p>
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
          <p>{colorError}</p><br/>
        <button >Create</button>
      </form>
      </div>
    </>
  );
}

export default CreateNotes;
