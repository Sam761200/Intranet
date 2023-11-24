// pages/AddCollaboratorPage.jsx
import React from 'react';
import AddCollaboratorForm from '../components/Collaborator/AddCollaboratorForm'
import { AuthContext } from '../context/AuthContext';

const AddCollaboratorPage = () => {
  return (
    <div>
      <h1>Ajouter un Collaborateur</h1>
      <AddCollaboratorForm />
    </div>
  );
};

export default AddCollaboratorPage;
