// MainPage.js
import React, { useState } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import NotesArea from './NotesArea';
import './MainPage.css';

function MainPage() {
  const [rightSideContent, setRightSideContent] = useState(null);

  const handleProfileClick = (groupName, buttonClicked) => {
    setRightSideContent(
      <NotesArea groupName={groupName} buttonClicked={buttonClicked} />
    );
  }

  return (
    <div className='mainPage'>
      <LeftSide onProfileClick={handleProfileClick} />
      <RightSide rightSideContent={rightSideContent} />
    </div>
  );
}

export default MainPage;
