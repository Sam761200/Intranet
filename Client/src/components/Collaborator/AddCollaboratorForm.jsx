// components/AddCollaboratorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddCollaboratorForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    birthdate: '',
    city: '',
    country: '',
    photo: '',
    category: '',
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/user/create`, formData, {
        withCredentials: true 
      });
      console.log('Collaborateur ajouté :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du collaborateur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="Prénom"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCollaboratorForm;
