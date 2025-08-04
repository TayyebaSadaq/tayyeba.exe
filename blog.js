// Blog posts database with enhanced metadata
const blogPosts = [
    { 
        file: 'blog-files/welcome.md', 
        title: 'init: welcome.exe', 
        date: '2024-01-15',
        category: 'hot-takes',
        excerpt: 'Welcome to my corner of the digital matrix! This isn\'t your typical blog - it\'s a terminal into my journey through code, data pipelines, and the occasional existential crisis.',
        tags: ['web', 'nostalgia', 'retro', 'introduction']
    },
    { 
        file: 'blog-files/data-pipeline-project.md', 
        title: 'Building My First ETL Pipeline', 
        date: '2024-01-12',
        category: 'dev-diary',
        excerpt: 'Documenting the process of building an automated data pipeline using Python and Apache Airflow.',
        tags: ['python', 'etl', 'data-engineering', 'airflow', 'project']
    },
    { 
        file: 'blog-files/pandas-tips.md', 
        title: 'Essential Pandas Functions Every Data Analyst Should Know', 
        date: '2024-01-08',
        category: 'resources',
        excerpt: 'A curated list of pandas functions that will supercharge your data analysis workflow.',
        tags: ['pandas', 'python', 'data-analysis', 'tips', 'cheatsheet']
    },
    { 
        file: 'blog-files/ai-hype-reality.md', 
        title: 'AI Hype vs Reality: A Junior Developer\'s Take', 
        date: '2024-01-05',
        category: 'hot-takes',
        excerpt: 'Cutting through the AI buzz to understand what\'s actually useful for everyday development work.',
        tags: ['ai', 'machine-learning', 'opinion', 'development', 'reality-check']
    }
];

// Global state
let currentPosts = [...blogPosts];
let currentCategory = 'all';

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
        <div class="post-card" onclick="loadBlogPost('${post.file}', '${post.title}')">
            <div class="post-header">
                <div class="post-title">${post.title}</div>
                <div class="post-category ${post.category}">${post.category}</div>
            </div>
            <div class="post-meta">${formatDate(post.date)} • ${getReadTime(post)} min read</div>
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
    renderBlogGrid();
    
    // Search functionality
    document.getElementById('search').addEventListener('input', filterPosts);
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveFilter(tab.dataset.category);
        });
    });
});
