const mongoose = require('mongoose');
const User = require('./models/user.model'); // Assurez-vous d'importer correctement votre modèle d'utilisateur

// Les données des utilisateurs à insérer
const usersData = require('./users.json');

mongoose.connect('mongodb://127.0.0.1:27017/Intranet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Fonction pour insérer les données des utilisateurs dans la base de données
async function seedDatabase() {
  try {
    // Supprimer tous les utilisateurs existants dans la base de données
    await User.deleteMany();

    // Insérer les nouveaux utilisateurs à partir du fichier users.json
    const users = await User.create(usersData);

    console.log('Données des utilisateurs insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données des utilisateurs :', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
  }
}

// Appeler la fonction pour insérer les données
seedDatabase();
