import React from 'react';
import { Fab } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <Fab 
      color="primary" 
      aria-label="chat" 
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 70,
        right: 16,
        fontSize: '1.5rem',
      }}
    >
      <FontAwesomeIcon icon={faCommentDots}/>
    </Fab>
  );
};

export default FloatingActionButton;






