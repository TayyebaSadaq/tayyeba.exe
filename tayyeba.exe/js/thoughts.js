/*
 * ═══════════════════════════════════════════════════════════
 *  THOUGHTS.JS - Loads and displays blog posts
 *  Fetches thoughts/blog posts from data/thoughts.json
 *  Posts can be clicked to view full content
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Display a single post in a new page
 */
function showPostDetail(postId) {
  // Open post detail page in a new tab with post ID as parameter
  window.open(`post-detail.html?id=${postId}`, '_blank');
}

/**
 * Go back to thoughts list (for backward compatibility)
 */
function goBackToThoughts() {
  window.history.back();
}

/**
 * Load and display all thoughts/posts
 */
async function loadThoughts() {
  try {
    const response = await fetch('data/thoughts.json');
    
    if (!response.ok) {
      throw new Error('Failed to load thoughts');
    }
    
    const posts = await response.json();
    const container = document.getElementById('thoughts-list');
    
    if (!container) return;
    
    let thoughtsHTML = '';
    posts.forEach(post => {
      thoughtsHTML += `
        <div class="card" onclick="showPostDetail(${post.id})" style="cursor: pointer; transition: all 0.3s ease;">
          <p class="meta">${post.date}</p>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <p style="color: var(--primary-brown); font-weight: 500;">Read more →</p>
        </div>
      `;
    });
    
    container.innerHTML = thoughtsHTML;
    
  } catch (error) {
    console.error('Error loading thoughts:', error);
  }
}

// Load thoughts when page loads
document.addEventListener('DOMContentLoaded', loadThoughts);
