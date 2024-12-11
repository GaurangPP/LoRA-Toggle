import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { MessageType } from "./ChatWindow";
import axios from "axios";

interface SaveChatDialogProps {
    open: boolean;
    onClose: () => void; // Function that returns nothing
    messages: MessageType[];
  }

function SaveChatDialog({open, onClose, messages}: SaveChatDialogProps) {
  const [title, setTitle] = useState("");


  const handleSave = async () => {
    console.log("Saving chat:", title);
    const filteredMessages = messages.map(({ message, sender }) => ({
        message,
        sender,
      }));
      
    try {
      // Send the filtered messages to the Flask backend
      const response = await axios.post("http://127.0.0.1:5000/chat/save", {
        title,
        messages: filteredMessages,
      }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',  // Set Content-Type to JSON
          },
      });
  
      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Centered Title */}
      <DialogTitle>
        <Box display="flex" justifyContent="center">
          Save Chat
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <DialogContentText>
          <Box display="flex" justifyContent="center">
            Please provide a name for the chat.
          </Box>
        </DialogContentText>
        <Box display="flex" justifyContent="center">
          <TextField
            autoFocus
            margin="dense"
            label="Chat Name"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
      </DialogContent>

      {/* Centered Actions (Buttons) */}
      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default SaveChatDialog;