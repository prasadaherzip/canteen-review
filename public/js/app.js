document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
    setupAdminModal();

    // Mock user login check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
});

async function fetchItems() {
    try {
        const response = await fetch('/api/items');
        const result = await response.json();

        if (result.message === 'success') {
            renderItems(result.data);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function renderItems(items) {
    const categories = ['snacks', 'drinks', 'meals', 'refreshments'];

    categories.forEach(category => {
        const container = document.getElementById(`${category}-grid`);
        container.innerHTML = ''; // Clear existing

        const categoryItems = items.filter(item => item.category === category);

        // If no items, add some dummies for demo if it's drinks (as per request)
        if (category === 'drinks' && categoryItems.length === 0) {
            // Already added in server.js, but just in case
        }

        categoryItems.forEach(item => {
            const card = createItemCard(item);
            container.appendChild(card);
        });
    });
}

function createItemCard(item) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `;
    div.addEventListener('click', () => {
        // Open chatroom for this category/item
        window.location.href = `chat.html?category=${item.category}&item=${item.id}`;
    });
    return div;
}

function setupAdminModal() {
    const modal = document.getElementById('admin-modal');
    const btn = document.getElementById('admin-add-btn');
    const span = document.getElementsByClassName('close-modal')[0];
    const form = document.getElementById('add-item-form');

    btn.onclick = () => {
        const password = prompt("Enter Admin Password:");
        if (password === "1234") {
            modal.classList.add('visible');
            modal.classList.remove('hidden');
        } else {
            alert("Incorrect Password!");
        }
    }

    span.onclick = () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        // In a real app, send POST request to server
        alert('Item added! (Simulation)');
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}
