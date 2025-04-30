require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs/docs.json');
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`.......Server is running on http://localhost:${PORT}`);
});
