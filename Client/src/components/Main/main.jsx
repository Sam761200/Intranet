// Accueil.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function Accueil() {
  const [randomCollaborator, setRandomCollaborator] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer un collaborateur au hasard depuis l'API
    async function fetchRandomCollaborator() {
      try {
        const response = await axios.get('http://localhost:5000/api/user/random');
        setRandomCollaborator(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du collaborateur au hasard :', error);
      }
    }

    // Appeler la fonction de récupération au chargement de la page
    fetchRandomCollaborator();
  }, []);

  // Fonction pour obtenir un autre collaborateur aléatoire
  const getRandomCollaborator = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/user/random');
      setRandomCollaborator(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération du collaborateur au hasard :', error);
    }
  };

  return (

    
    <div className='Random'>
      <Navbar />
      <h1>Page principale</h1>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className='ContenuMain'>
          <h2>Collaborateur au hasard :</h2>
          <p>Nom : {randomCollaborator.firstname} {randomCollaborator.lastname}</p>
          <p className='email'>Email : {randomCollaborator.email}</p>
          <p className='email'>Category : {randomCollaborator.category}</p>
          <p className='email'>Numéro de téléphone : {randomCollaborator.phone}</p>
          <button onClick={getRandomCollaborator}>Rechercher quelqu'un d'autre</button>
        </div>
      )}
    </div>
  );
}

export default Accueil;
