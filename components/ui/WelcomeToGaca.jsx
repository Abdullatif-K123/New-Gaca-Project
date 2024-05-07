
import React, { useState } from 'react';
import { Dialog, DialogContent, Button,Slide  } from '@mui/material';

const WelcomeDialog = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    
     <Dialog   TransitionComponent={Slide}
     transitionDuration={500} open={true} onClose={handleClose} PaperProps={{ style: { background: 'transparent', minWidth: "800px", minHeight: "600px" } }}>
      <DialogContent  >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/qaTB_u1THVs"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </DialogContent>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default WelcomeDialog;