import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddContact = () => {
    const newContact = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };

    setContacts([...contacts, newContact]);

    // Clear input fields
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddContact}>
            Add Contact
          </Button>
        </CardContent>
      </Card>
      
      <List>
        {contacts.map((contact, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={contact.name}
              secondary={`Email: ${contact.email}, Phone: ${contact.phoneNumber}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default App;
