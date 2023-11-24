// components/CollaboratorCard.jsx
import React from 'react';

const CollaboratorCard = ({ collaborator }) => {
  return (
    <div className="collaborator-card">
      <h3>{collaborator.firstname} {collaborator.lastname}</h3>
      <p>Email: {collaborator.email}</p>
    </div>
  );
};

export default CollaboratorCard;
