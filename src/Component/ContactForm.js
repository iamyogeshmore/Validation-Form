import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ContactForm.css";


const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const addOrUpdateContact = () => {
    if (name.trim() === "" || password === "") {
      toast.error("Please fill all fields correctly.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number format", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (editingIndex === -1) {
      const newContact = { name, email, password, phoneNumber };
      setContacts([...contacts, newContact]);
    } else {
      const updatedContacts = contacts.map((contact, index) =>
        index === editingIndex
          ? { name, email, password, phoneNumber }
          : contact
      );
      setContacts(updatedContacts);
      setEditingIndex(-1); // Reset editing index after updating
    }

    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const deleteContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const editContact = (index) => {
    const contactToEdit = contacts[index];
    setName(contactToEdit.name);
    setEmail(contactToEdit.email);
    setPassword(contactToEdit.password);
    setPhoneNumber(contactToEdit.phoneNumber);
    setEditingIndex(index);
  };

  return (
    <Paper className="contact-form" elevation={3}>
    <Typography variant="h4" className="form-title">
      Contact Form
    </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addOrUpdateContact} className="form-button">
        {editingIndex === -1 ? "Add Contact" : "Update Contact"}
      </Button>
      <ToastContainer autoClose={3000} />

      {contacts.map((contact, index) => (
        <div key={index} className="contact-card">
          <Grid container alignItems="center" justifyContent="space-between" className="contact-row">
            <Typography className="contact-name">{contact.name}</Typography>
            <div className="button-group">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => editContact(index)}
                className="edit-button"
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => deleteContact(index)}
                className="delete-button"
              >
                Delete
              </Button>
            </div>
          </Grid>
        </div>
      ))}
    </Paper>
  );
};

export default ContactForm;
