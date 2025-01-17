const express = require('express');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());

// Routes
app.use('/cart', cartRoutes);

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
