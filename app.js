const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const db = require ('./gestion-hotel-backend/models/index.js');

db.sequelize.sync({alter:true})

const app = express();

app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});