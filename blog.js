// Global state
let blogPosts = [];
let currentPosts = [];
let currentCategory = 'all';

// Load blog posts from JSON file
async function loadBlogPosts() {
    try {
        const response = await fetch('blog-files/blog-posts.json');
        if (!response.ok) {
            throw new Error('Failed to load blog posts');
        }
        blogPosts = await response.json();
        currentPosts = [...blogPosts];
        renderBlogGrid();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blog-grid').innerHTML = `
            <div class="error-message">
                <h3>// error: could not load blog posts</h3>
                <p>make sure blog-posts.json exists and is properly formatted</p>
            </div>
        `;
        document.getElementById('post-count').textContent = 'error loading posts';
    }
}

// Matrix background animation
function initializeMatrix() {
    const matrix = document.getElementById('matrix');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.style.position = 'absolute';
        span.style.color = '#00ff41';
        span.style.fontSize = '14px';
        span.style.fontFamily = 'monospace';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = (Math.random() * 3 + 2) + 's';
        span.style.animationName = 'fall';
        span.style.animationIterationCount = 'infinite';
        span.style.animationTimingFunction = 'linear';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        matrix.appendChild(span);
    }
}

// Navigation functions
function showBlogList() {
    document.getElementById('blog-list-container').style.display = 'block';
    document.getElementById('blog-content').style.display = 'none';
    updatePostCount();
}

// Post counting and display
function updatePostCount() {
    const count = currentPosts.length;
    const category = currentCategory === 'all' ? 'posts' : currentCategory;
    document.getElementById('post-count').textContent = `showing ${count} ${category} ${count === 1 ? 'post' : 'posts'}`;
}

function renderBlogGrid() {
    const grid = document.getElementById('blog-grid');
    
    if (currentPosts.length === 0) {
        grid.innerHTML = '<div class="no-posts">no posts found matching your criteria :/</div>';
        return;
    }
    
    const html = currentPosts.map(post => `
        <div class="blog-post" onclick="loadBlogPost('${post.file}', '${post.title}')">
            <div class="post-title">${post.title}</div>
            <div class="post-date">${formatDate(post.date)} • ${getReadTime(post)} min read</div>
            <div class="post-excerpt">${post.excerpt}</div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    grid.innerHTML = html;
    updatePostCount();
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getReadTime(post) {
    return Math.ceil(post.excerpt.split(' ').length / 200) || 3;
}

// Filtering functions
function filterPosts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    
    currentPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = !searchTerm || 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return matchesCategory && matchesSearch;
    });
    
    renderBlogGrid();
}

function setActiveFilter(category) {
    currentCategory = category;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    filterPosts();
}

// Blog post loading
async function loadBlogPost(filename, title) {
    const contentElement = document.getElementById('post-content');
    contentElement.innerHTML = '<div class="loading">loading post...</div>';
    
    document.getElementById('blog-list-container').style.display = 'none';
    document.getElementById('blog-content').style.display = 'block';
    
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Could not load ${filename}`);
        }
        
        const markdown = await response.text();
        const html = marked.parse(markdown);
        contentElement.innerHTML = html;
    } catch (error) {
        contentElement.innerHTML = `
            <div style="color: #ff5555; border: 1px solid #ff5555; padding: 20px; border-radius: 6px;">
                <h3>// error: file not found</h3>
                <p>could not load "${filename}"</p>
                <p>make sure the file exists in the blog-files directory</p>
            </div>
        `;
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    showBlogList();
    loadBlogPosts();
    
    // Search functionality
    document.getElementById('search').addEventListener('input', filterPosts);
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveFilter(tab.dataset.category);
        });
    });
});