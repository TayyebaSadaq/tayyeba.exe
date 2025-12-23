/*
 * ═══════════════════════════════════════════════════════════
 *  READING.JS - Loads and displays reading data
 *  Fetches currently reading book and favorite books from data/reading.json
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Function to load and display reading data
 */
async function loadReadingData() {
  try {
    // Fetch reading data from JSON file
    const response = await fetch('data/reading.json');
    
    if (!response.ok) {
      throw new Error('Failed to load reading data');
    }
    
    const readingData = await response.json();
    
    // Update reading goal
    const goalElement = document.getElementById('reading-goal');
    if (goalElement) {
      goalElement.textContent = readingData.readingGoal;
    }
    
    // Display currently reading
    const currentlyReadingContainer = document.getElementById('currently-reading');
    if (currentlyReadingContainer && readingData.currentlyReading) {
      currentlyReadingContainer.innerHTML = `
        <div class="card">
          <h3>Currently Reading</h3>
          <p><strong>Title:</strong> ${readingData.currentlyReading.title}</p>
          <p><strong>Author:</strong> ${readingData.currentlyReading.author}</p>
          <p><strong>Thoughts:</strong> ${readingData.currentlyReading.thoughts}</p>
        </div>
      `;
    }
    
    // Display recent favorites
    const favoritesContainer = document.getElementById('recent-favorites');
    if (favoritesContainer && readingData.recentFavorites) {
      let favoritesHTML = '';
      readingData.recentFavorites.forEach(book => {
        favoritesHTML += `
          <div class="card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(book.rating)}</p>
            <p>${book.review}</p>
          </div>
        `;
      });
      favoritesContainer.innerHTML = favoritesHTML;
    }
    
  } catch (error) {
    console.error('Error loading reading data:', error);
  }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadReadingData);
