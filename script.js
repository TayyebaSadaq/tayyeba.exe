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
        const response = await fetch('portfolio-files/projects.json');
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        // Initialize auto-scrolling after projects are loaded
        setTimeout(() => initAutoProjectsScrolling(), 500);
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
            title: "Goodreads Book Scraper",
            description: "Advanced web scraping tool for extracting book data from Goodreads. Features automated data collection, book metadata extraction, ratings analysis, and CSV export functionality.",
            technologies: ["Python", "Web Scraping", "BeautifulSoup", "Pandas", "Data Analysis"],
            github: "https://github.com/TayyebaSadaq/goodreads-scraper"
        },
        {
            title: "Custom Programming Language",
            description: "Complete implementation of a custom programming language including lexical analysis, parsing, and interpretation. Features custom syntax design and execution engine.",
            technologies: ["Python", "Compiler Design", "Language Theory", "Parser", "Interpreter"],
            github: "https://github.com/TayyebaSadaq/Language-design-and-implementation"
        },
        {
            title: "AI-Powered Patient Experience",
            description: "Machine learning solution to improve patient experience in healthcare settings. Implements predictive analytics, patient sentiment analysis, and recommendation systems.",
            technologies: ["Python", "Machine Learning", "AI", "Healthcare Analytics", "Predictive Modeling"],
            github: "https://github.com/TayyebaSadaq/Improving-Patient-experience-using-AI"
        },
        {
            title: "Diabetes Prediction with XAI",
            description: "Comprehensive diabetes prediction system using machine learning with explainable AI techniques. Features multiple ML algorithms, model interpretability, and SHAP analysis.",
            technologies: ["Python", "Machine Learning", "XAI", "SHAP", "Scikit-learn", "Healthcare"],
            github: "https://github.com/TayyebaSadaq/Diabetes-Prediction-using-Machine-Learning-and-Explainable-AI-Techniques"
        }
    ];
    
    const projectsContainer = document.getElementById('projects-container');
    sampleProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    // Initialize automatic scrolling after projects are loaded
    initAutoProjectsScrolling();
}

// Add automatic horizontal scrolling functionality for projects
function initAutoProjectsScrolling() {
    const projectsContainer = document.getElementById('projects-container');
    const projectsSection = document.getElementById('projects');
    
    // Check if scroll indicator already exists to prevent duplication
    if (projectsSection.querySelector('.scroll-indicator')) {
        return;
    }
    
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    const totalProjects = projectsContainer.children.length;
    let dotsHTML = '';
    for (let i = 0; i < totalProjects; i++) {
        dotsHTML += `<span class="dot ${i === 0 ? 'active' : ''}"></span>`;
    }
    
    scrollIndicator.innerHTML = `
        <div class="scroll-text">
            <span class="scroll-icon">←→</span> PROJECTS
        </div>
        <div class="scroll-dots">
            ${dotsHTML}
        </div>
    `;
    
    // Insert indicator before projects container
    projectsSection.insertBefore(scrollIndicator, projectsContainer);
    
    const dots = scrollIndicator.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoScrollInterval;
    let isPaused = false;
    
    // Calculate proper scroll parameters
    function getScrollParams() {
        const containerWidth = projectsSection.offsetWidth;
        const cardWidth = 350; // CSS card width
        const gap = 30; // CSS gap
        const totalWidth = cardWidth + gap;
        const visibleCards = Math.floor(containerWidth / totalWidth);
        const maxScrollIndex = Math.max(0, totalProjects - visibleCards);
        
        return {
            totalWidth,
            visibleCards,
            maxScrollIndex
        };
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function scrollToProject(index) {
        const { totalWidth, maxScrollIndex } = getScrollParams();
        const clampedIndex = Math.min(index, maxScrollIndex);
        const scrollDistance = clampedIndex * totalWidth;
        
        projectsContainer.style.transform = `translateX(-${scrollDistance}px)`;
        currentIndex = clampedIndex;
        updateDots();
    }
    
    function autoScroll() {
        if (!isPaused) {
            const { maxScrollIndex } = getScrollParams();
            // Only scroll if there are cards to scroll to
            if (maxScrollIndex > 0) {
                currentIndex = (currentIndex + 1) % (maxScrollIndex + 1);
            } else {
                currentIndex = (currentIndex + 1) % totalProjects;
            }
            scrollToProject(currentIndex);
        }
    }
    
    // Start automatic scrolling
    function startAutoScroll() {
        autoScrollInterval = setInterval(autoScroll, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Pause on hover
    projectsContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    projectsContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Click dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoScroll();
            scrollToProject(index);
            setTimeout(startAutoScroll, 2000);
        });
    });
    
    // Start the auto-scroll
    startAutoScroll();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(() => scrollToProject(currentIndex), 100);
    });
}

// Section toggle functionality
function initSectionToggle() {
    const toggleableHeaders = document.querySelectorAll('.section-title.toggleable');
    
    toggleableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-toggle');
            const content = document.getElementById(targetId);
            const indicator = header.querySelector('.toggle-indicator');
            
            if (!content) return;
            
            // Toggle collapsed state
            const isCollapsed = header.classList.contains('collapsed');
            
            if (isCollapsed) {
                // Expand
                header.classList.remove('collapsed');
                content.classList.remove('collapsed');
                indicator.textContent = '[-]';
                
                // Smooth expand animation
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = 'none';
                }, 500);
            } else {
                // Collapse
                header.classList.add('collapsed');
                indicator.textContent = '[+]';
                
                // Set max-height for smooth animation
                content.style.maxHeight = content.scrollHeight + 'px';
                content.offsetHeight; // Force reflow
                content.style.maxHeight = '0';
                content.classList.add('collapsed');
            }
            
            // Add visual feedback
            header.style.transform = 'scale(0.98)';
            setTimeout(() => {
                header.style.transform = '';
            }, 150);
        });
    });
}

// Console command to toggle all sections
window.toggleAll = () => {
    const toggleableHeaders = document.querySelectorAll('.section-title.toggleable');
    const firstHeader = toggleableHeaders[0];
    const shouldExpand = firstHeader ? firstHeader.classList.contains('collapsed') : false;
    
    toggleableHeaders.forEach(header => {
        const targetId = header.getAttribute('data-toggle');
        const content = document.getElementById(targetId);
        const indicator = header.querySelector('.toggle-indicator');
        
        if (shouldExpand) {
            header.classList.remove('collapsed');
            content.classList.remove('collapsed');
            indicator.textContent = '[-]';
            content.style.maxHeight = 'none';
        } else {
            header.classList.add('collapsed');
            content.classList.add('collapsed');
            indicator.textContent = '[+]';
            content.style.maxHeight = '0';
        }
    });
    
    console.log(shouldExpand ? 'All sections expanded!' : 'All sections collapsed!');
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

// Load and display experience data
async function loadExperience() {
    try {
        const response = await fetch('portfolio-files/experience.json');
        const data = await response.json();
        displayExperience(data.experiences);
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

function displayExperience(experiences) {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';

    experiences.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        const descriptionItems = exp.description.map(item => `<li>${item}</li>`).join('');
        const skillTags = exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        
        experienceItem.innerHTML = `
            <div class="experience-date">${exp.date}</div>
            <div class="experience-content">
                <h3 class="experience-title">${exp.title}</h3>
                <h4 class="experience-company">${exp.company}</h4>
                <ul class="experience-description">
                    ${descriptionItems}
                </ul>
                <div class="experience-skills">
                    ${skillTags}
                </div>
            </div>
        `;
        
        container.appendChild(experienceItem);
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    loadProjects();
    initSmoothScrolling();
    createMatrixRain();
    initSectionToggle();
    loadExperience();
    
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
- toggleAll(): Expand/collapse all sections
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
