const express = require('express')
const server = express();
const helmet = require('helmet')
const hobbitRoutes = require('./routes/hobbitsRoutes')
// Global Middleware
server.use(helmet())
server.use(express.json())


// Route Handlers
server.use('/api/hobbits', hobbitRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});


module.exports = server;