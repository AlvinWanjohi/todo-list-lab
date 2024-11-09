const express = require('express');
const app = express();
const PORT = 6001;

app.use(express.json());

// Sample plant data (you can replace this with a database later)
const plants = [
  { id: 1, name: 'Aloe', image: './images/aloe.jpg', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: './images/zz-plant.jpg', price: 25.98 },
];

// Get all plants
app.get('/plants', (req, res) => {
  res.json(plants);
});

// Start the backend server
app.listen(PORT, () => {
    
  console.log(`Server is running on http://localhost:${PORT}`);
});
