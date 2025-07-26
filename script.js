// Typing animation for hero section
const typingTexts = [
    "Python Developer & Data Scientist",
    "Machine Learning Engineer",
    "Data Analyst & Visualizer",
    "Gaming Enthusiast & Tech Reader"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
            return;
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// Start typing animation
setTimeout(typeText, 1000);

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.setProperty('--level', level + '%');
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(skill => observer.observe(skill));
}

// Load projects from JSON configuration
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: show sample projects if JSON fails to load
        loadSampleProjects();
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const links = [];
    if (project.github) {
        links.push(`<a href="${project.github}" class="project-link" target="_blank">GitHub</a>`);
    }
    if (project.demo) {
        links.push(`<a href="${project.demo}" class="project-link" target="_blank">Live Demo</a>`);
    }
    if (project.notebook) {
        links.push(`<a href="${project.notebook}" class="project-link" target="_blank">Notebook</a>`);
    }
    
    card.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">${techTags}</div>
        <div class="project-links">${links.join('')}</div>
    `;
    
    return card;
}

function loadSampleProjects() {
    const sampleProjects = [
        {
            title: "ML Stock Predictor",
            description: "A machine learning model that predicts stock prices using LSTM networks and technical indicators. Features real-time data processing and interactive visualizations.",
            technologies: ["Python", "TensorFlow", "Pandas", "Plotly"],
            github: "#",
            demo: "#"
        },
        {
            title: "Gaming Analytics Dashboard",
            description: "Interactive dashboard analyzing gaming trends and player behavior using web scraping and statistical analysis. Built with modern data visualization libraries.",
            technologies: ["Python", "Streamlit", "BeautifulSoup", "Matplotlib"],
            github: "#",
            notebook: "#"
        },
        {
            title: "Book Recommendation Engine",
            description: "Collaborative filtering system that recommends books based on reading history and preferences. Includes sentiment analysis of reviews.",
            technologies: ["Python", "Scikit-learn", "NLP", "Flask"],
            github: "#",
            demo: "#"
        }
    ];
    
    const projectsContainer = document.getElementById('projects-container');
    sampleProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add glitch effect to project cards on hover
function addGlitchEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });
}

// Matrix rain effect (optional enhancement)
function createMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 2 + 's';
        span.style.fontSize = '12px';
        span.style.color = 'rgba(0, 255, 65, 0.1)';
        span.style.animation = 'matrix-fall 3s linear infinite';
        matrixBg.appendChild(span);
    }
}

// Add matrix fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    loadProjects();
    initSmoothScrolling();
    createMatrixRain();
    
    // Add glitch effects after projects are loaded
    setTimeout(addGlitchEffects, 500);
});

// Console Easter Egg
console.log(`
██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗    ██╗      ██████╗  █████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝    ██║     ██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║       ██║     ██║   ██║███████║██║  ██║█████╗  ██║  ██║
██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║       ██║     ██║   ██║██╔══██║██║  ██║██╔══╝  ██║  ██║
██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║       ███████╗╚██████╔╝██║  ██║██████╔╝███████╗██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝       ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═════╝ 

Welcome to the Matrix! You found the console. 🎮
Type 'help' for secret commands!
`);

// Console commands
window.help = () => {
    console.log(`
Available commands:
- about(): Display personal info
- skills(): List technical skills  
- projects(): Show project count
- konami(): Activate secret mode
- matrix(): Toggle matrix effect
`);
};

window.about = () => {
    console.log("Tayyeba.exe - Python Developer & Data Scientist who loves gaming, tech, and books!");
};

window.skills = () => {
    console.log("Python | Data Science | Machine Learning | Gaming | Reading | Tech Innovation");
};

window.projects = () => {
    const projectCount = document.querySelectorAll('.project-card').length;
    console.log(`Currently showcasing ${projectCount} awesome projects!`);
};

window.konami = () => {
    document.body.style.filter = 'hue-rotate(180deg)';
    console.log("🎮 KONAMI CODE ACTIVATED! Colors inverted!");
    setTimeout(() => {
        document.body.style.filter = '';
        console.log("Normal mode restored.");
    }, 5000);
};

window.matrix = () => {
    const matrixBg = document.querySelector('.matrix-bg');
    matrixBg.style.display = matrixBg.style.display === 'none' ? 'block' : 'none';
    console.log("Matrix effect toggled!");
};
