function loadCards() {
    fetch('http://localhost:3000/api/cards')
        .then(response => response.json())
        .then(data => {
            renderCards(data.cards);
        })
        .catch(error => console.error('Error loading card data:', error));
}

function renderCards(cards) {
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = ''; // Clear existing cards
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.color}`;
        cardElement.innerHTML = `
            <div class="card-date">${formatDate(card.date)}</div>
            <div class="card-category">${card.category}</div>
            <h2>${card.title}</h2>
            <p>by ${card.author}</p>
        `;
        cardGrid.appendChild(cardElement);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

loadCards();