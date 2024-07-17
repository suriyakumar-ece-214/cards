function loadCards() {
    fetch('http://localhost:3000/api/cards')
        .then(response => response.json())
        .then(data => {
            renderCards(data.cards);
        })
        .catch(error => console.error('Error loading card data:', error));
}

function renderCards(cards) {
    const cardList = document.getElementById('existingCards');
    cardList.innerHTML = ''; // Clear existing cards
    cards.forEach(card => {
        const li = document.createElement('li');
        li.className = 'card-item';
        li.innerHTML = `
            <span>${card.title} by ${card.author}</span>
            <button class="delete-btn" data-id="${card.id}">Delete</button>
        `;
        cardList.appendChild(li);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteCard);
    });
}

function deleteCard(e) {
    const cardId = e.target.getAttribute('data-id');
    fetch(`http://localhost:3000/api/cards/${cardId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        loadCards(); // Reload the card list
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error deleting card. Please try again.');
    });
}

document.getElementById('newCardForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newCard = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        color: document.getElementById('color').value,
        date: document.getElementById('date').value,
        category: document.getElementById('category').value.toUpperCase()
    };
    
    fetch('http://localhost:3000/api/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Card added successfully!');
        this.reset(); // Reset the form
        loadCards(); // Reload the card list
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error adding card. Please try again.');
    });
});

// Load cards when the page loads
loadCards();