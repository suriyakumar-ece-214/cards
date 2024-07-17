const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/display', express.static('display'));
app.use('/admin', express.static('admin'));

// Read cards
app.get('/api/cards', (req, res) => {
  fs.readFile('cards.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Add new card
app.post('/api/cards', (req, res) => {
  fs.readFile('cards.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const cards = JSON.parse(data);
    const newCard = { ...req.body, id: Date.now().toString() }; // Add unique id
    cards.cards.unshift(newCard);
    fs.writeFile('cards.json', JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.json({ message: 'Card added successfully', card: newCard });
    });
  });
});

// Delete card
app.delete('/api/cards/:id', (req, res) => {
  fs.readFile('cards.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    let cards = JSON.parse(data);
    cards.cards = cards.cards.filter(card => card.id !== req.params.id);
    fs.writeFile('cards.json', JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.json({ message: 'Card deleted successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});