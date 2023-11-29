const express = require('express');
const app = express();
const PORT = 8080;

// Simulated database of pets
const petsDB = [
    { id: 1, name: 'Fluffy', owner: 'Alice' },
    { id: 2, name: 'Buddy', owner: 'Bob' },
    // Add more pets here
];

// Endpoint to get all pets
app.get('/api/v1/pets', (req, res) => {
    // Respond with the entire pets database as JSON
    res.json(petsDB);
});

// Endpoint to get a pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // Extract the pet name from the URL parameter
    const petName = req.params.name;
    
    // Search for the pet in the database based on the name
    const pet = petsDB.find(pet => pet.name === petName);
    
    // If pet not found, respond with a 404 error message
    if (!pet) {
        res.status(404).send('Pet not found');
    } else {
        // If pet found, respond with the pet details as JSON
        res.json(pet);
    }
});

// Endpoint to get a pet by owner's name using a query string
app.get('/api/v1/pets/owner', (req, res) => {
    // Extract the owner's name from the query parameter (?owner=name)
    const ownerName = req.query.owner;
    
    // Search for the pet in the database based on the owner's name
    const pet = petsDB.find(pet => pet.owner === ownerName);
    
    // If pet not found for the owner, respond with a 404 error message
    if (!pet) {
        res.status(404).send('Pet not found for this owner');
    } else {
        // If pet found, respond with the pet details as JSON
        res.json(pet);
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
