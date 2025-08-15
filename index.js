const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/gestion-taches', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connecté !'))
.catch(err => console.log('Erreur de connexion MongoDB :', err));

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
