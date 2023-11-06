import React from 'react'
import imagePreview from './images/imagePreview.png'
import lockImage from './images/lockImage.png'
import './RightSide.css'

function RightSide({ rightSideContent }) {
    return (
      <>
        {rightSideContent ? (
          <div>{rightSideContent}</div>
        ) : (
            <div className='wrapperRightSide'>
            <div className='images'>
            <img src={imagePreview} alt='imagePreview'/>
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <div className='footer'>
                <img src={lockImage} alt='lockImage'/>
                <p>end-to-end encrypted</p>
            </div>
            {rightSideContent}
        </div>
        )}
      </>
    );
  }

export default RightSide