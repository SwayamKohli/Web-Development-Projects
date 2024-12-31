const suggestions = [
    'Apple',
    'Orange',
    'Banana',
    'Grape',
    'Strawberry',
    'Blueberry',
    'Raspberry',
    'Blackberry'
];

const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');
let currentIndex = -1;

searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    currentIndex = -1; // Reset current index

    if (searchTerm) {
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(searchTerm)
        );

        filteredSuggestions.forEach((suggestion, index) => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.addEventListener('click', function () {
                searchInput.value = suggestion; // Set input value to clicked suggestion
                suggestionsList.innerHTML = ''; // Clear suggestions
                suggestionsList.style.display = 'none'; // Hide suggestions
            });
            suggestionItem.addEventListener('mouseover', () => {
                currentIndex = index; // Update current index on hover
                highlightSuggestion();
            });
            suggestionsList.appendChild(suggestionItem);
        });

        if (filteredSuggestions.length > 0) {
            suggestionsList.style.display = 'block'; // Show suggestions
        } else {
            suggestionsList.style.display = 'none'; // Hide suggestions if no match
        }
    } else {
        suggestionsList.style.display = 'none'; // Hide suggestions if input is empty
    }
});

// Keyboard navigation
searchInput.addEventListener('keydown', function (e) {
    const items = document.querySelectorAll('.suggestion-item');
    if (e.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % items.length;
        highlightSuggestion();
    } else if (e.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        highlightSuggestion();
    } else if (e.key === 'Enter') {
        if (currentIndex > -1) {
            searchInput.value = items[currentIndex].textContent; // Set input value to selected suggestion
            suggestionsList.innerHTML = ''; // Clear suggestions
            suggestionsList.style.display = 'none'; // Hide suggestions
        }
    }
});

function highlightSuggestion() {
    const items = document.querySelectorAll('.suggestion-item');
    items.forEach((item, index) => {
        item.style.backgroundColor = index === currentIndex ? '#f0f0f0' : 'white'; // Highlight selected item
    });
}