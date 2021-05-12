const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const path = require('path');
require('dotenv').config();//Variable d'envirenement

const helmet = require('helmet');

//gérer la demande POST
app.use(bodyParser.json());

//Connectez  API au cluster MongoDB
mongoose.connect(process.env.BD,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Sécurise les headers
app.use(helmet());

// Log toutes les requêtes passées au serveur (sécurité)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


//Les routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;