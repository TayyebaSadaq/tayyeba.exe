/*
 * ═══════════════════════════════════════════════════════════
 *  MINECRAFT-BUILDS.JS - Loads and displays minecraft builds
 *  Fetches build gallery from data/minecraft-builds.json
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Load and display minecraft builds
 */
async function loadMinecraftBuilds() {
  try {
    const response = await fetch('data/minecraft-builds.json');
    
    if (!response.ok) {
      throw new Error('Failed to load minecraft builds');
    }
    
    const builds = await response.json();
    const container = document.getElementById('minecraft-builds-container');
    
    if (!container) return;
    
    let buildsHTML = '';
    builds.forEach(build => {
      buildsHTML += `
        <div class="hobby-item">
          <h3>${build.title}</h3>
          ${build.image ? `<img src="${build.image}" alt="${build.title}">` : ''}
          <p><strong>Status:</strong> ${build.buildStatus}</p>
          <p><strong>Style:</strong> ${build.style}</p>
          <p>${build.description}</p>
        </div>
      `;
    });
    
    container.innerHTML = buildsHTML;
    
  } catch (error) {
    console.error('Error loading minecraft builds:', error);
  }
}

// Load builds when page loads
document.addEventListener('DOMContentLoaded', loadMinecraftBuilds);
