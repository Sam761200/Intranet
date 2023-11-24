import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CollaboratorCard from '../components/Collaborator/CollaboratorCard';
import { AuthContext } from "../context/AuthContext";
import Log from "../components/Log";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const CollaboratorsList = () => {

  const { authToken } = useContext(AuthContext); 
  console.log("Auth Token:", authToken);

  const navigate = useNavigate();

  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    country: '',
    category: '',
  });

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/user`);
        setCollaborators(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des collaborateurs :', error);
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  const filteredCollaborators = collaborators.filter((collaborator) => {
    const { name, country, category } = filters;
    return (
      (name === '' || collaborator.firstname?.toLowerCase().includes(name.toLowerCase())) &&
      (country === '' || collaborator.country?.toLowerCase().includes(country.toLowerCase())) &&
      (category === '' || collaborator.category?.toLowerCase().includes(category.toLowerCase()))
    );
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className='CollaboratorPage'>
      {authToken ? <>
      <Navbar />
      <h1>Liste des Collaborateurs</h1>
      <div className='input'>
        <input
          type="text"
          placeholder="Nom"
          name="name"
          value={filters.name}
          onChange={handleFilterChange} />
        <input
          type="text"
          placeholder="Pays"
          name="country"
          value={filters.country}
          onChange={handleFilterChange} />
        <input
          type="text"
          placeholder="Catégorie"
          name="category"
          value={filters.category}
          onChange={handleFilterChange} />
      </div> 
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="collaborators-list">
          {filteredCollaborators.map((collaborator, index) => (
            <CollaboratorCard key={index} collaborator={collaborator} />
          ))}
        </div>
      )}
      </> 
       : navigate('/')}
      
      
    </div>
  );
};

export default CollaboratorsList;
