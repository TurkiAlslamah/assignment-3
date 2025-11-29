/* ============================================
   ASSIGNMENT 3 - ADVANCED PORTFOLIO JS
   Features: Reveal on Scroll, Parallax, Timeline,
   3D Tilt, Magnetic Cursor, Text Scramble,
   Performance Optimizations
   ============================================ */

// ============================================
// UTILITY FUNCTIONS & PERFORMANCE HELPERS
// ============================================

// Debounce function for performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit = 16) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Request Animation Frame helper
function rafCallback(callback) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback(...args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Lerp (Linear Interpolation) for smooth animations
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Clamp value between min and max
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Map value from one range to another
function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    isLoaded: false,
    isMobile: window.innerWidth < 768,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    visitCount: parseInt(localStorage.getItem('visitCount') || '0') + 1,
    startTime: Date.now(),
    currentFilter: 'all',
    currentSort: 'newest',
    currentView: localStorage.getItem('projectView') || 'grid'
};

// Save visit count
localStorage.setItem('visitCount', state.visitCount.toString());

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    loader: document.getElementById('loader'),
    loaderFill: document.getElementById('loader-fill'),
    cursor: document.getElementById('cursor'),
    cursorFollower: document.getElementById('cursor-follower'),
    scrollProgress: document.getElementById('scroll-progress'),
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('nav-menu'),
    hamburger: document.getElementById('hamburger'),
    themeToggle: document.getElementById('theme-toggle'),
    greeting: document.getElementById('greeting'),
    tagline: document.getElementById('tagline'),
    timelineProgress: document.getElementById('timeline-progress'),
    projectsGrid: document.getElementById('projects-grid'),
    githubProjects: document.getElementById('github-projects'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    visitCount: document.getElementById('visit-count'),
    timeOnSite: document.getElementById('time-on-site'),
    emptyState: document.getElementById('empty-state')
};

// ============================================
// LOADER
// ============================================
class Loader {
    constructor() {
        this.progress = 0;
        this.targetProgress = 0;
        this.init();
    }

    init() {
        document.body.classList.add('loading');
        this.simulateLoading();
    }

    simulateLoading() {
        const interval = setInterval(() => {
            this.targetProgress += Math.random() * 30;
            if (this.targetProgress >= 100) {
                this.targetProgress = 100;
                clearInterval(interval);
                setTimeout(() => this.complete(), 300);
            }
            this.updateProgress();
        }, 200);
    }

    updateProgress() {
        this.progress = lerp(this.progress, this.targetProgress, 0.3);
        if (elements.loaderFill) {
            elements.loaderFill.style.width = `${this.progress}%`;
        }
    }

    complete() {
        state.isLoaded = true;
        document.body.classList.remove('loading');
        if (elements.loader) {
            elements.loader.classList.add('hidden');
        }
        // Trigger initial reveal animations
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal-up, .hero .reveal-left, .hero .reveal-right').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = elements.cursor;
        this.follower = elements.cursorFollower;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.isHovering = false;
        
        if (state.isMobile || state.prefersReducedMotion) return;
        
        this.init();
    }

    init() {
        document.body.classList.add('cursor-ready');
        
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        });

        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card, .tilt-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
                this.isHovering = true;
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
                this.isHovering = false;
            });
        });

        this.animate();
    }

    animate() {
        // Smooth follow for cursor
        this.followerX = lerp(this.followerX, this.cursorX, 0.15);
        this.followerY = lerp(this.followerY, this.cursorY, 0.15);

        if (this.cursor) {
            this.cursor.style.left = `${this.cursorX}px`;
            this.cursor.style.top = `${this.cursorY}px`;
        }

        if (this.follower) {
            this.follower.style.left = `${this.followerX}px`;
            this.follower.style.top = `${this.followerY}px`;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// MAGNETIC ELEMENTS
// ============================================
class MagneticElements {
    constructor() {
        if (state.isMobile || state.prefersReducedMotion) return;
        this.init();
    }

    init() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            const strength = parseInt(el.dataset.strength) || 20;
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / rect.width * strength;
                const deltaY = (e.clientY - centerY) / rect.height * strength;
                
                el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                
                if (elements.cursorFollower) {
                    elements.cursorFollower.classList.add('magnetic');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                
                if (elements.cursorFollower) {
                    elements.cursorFollower.classList.remove('magnetic');
                }
            });
        });
    }
}

// ============================================
// TEXT SCRAMBLE EFFECT
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.textContent;
        this.isAnimating = false;
    }

    animate() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const text = this.originalText;
        const length = text.length;
        let iteration = 0;
        const maxIterations = length * 3;
        
        const interval = setInterval(() => {
            this.el.textContent = text
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration / 3) return text[index];
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            iteration++;
            
            if (iteration >= maxIterations) {
                clearInterval(interval);
                this.el.textContent = text;
                this.isAnimating = false;
            }
        }, 30);
    }
}

// ============================================
// REVEAL ON SCROLL
// ============================================
class RevealOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
        this.scrambleElements = [];
        
        // Collect scramble elements
        document.querySelectorAll('[data-scramble]').forEach(el => {
            this.scrambleElements.push(new TextScramble(el));
        });
        
        this.init();
    }

    init() {
        // Use Intersection Observer for performance
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger scramble effect if element has it
                    if (entry.target.hasAttribute('data-scramble')) {
                        const scramble = this.scrambleElements.find(s => s.el === entry.target);
                        if (scramble) {
                            setTimeout(() => scramble.animate(), 200);
                        }
                    }
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skills-container')) {
                        this.animateSkillBars();
                    }
                    
                    // Animate counters
                    entry.target.querySelectorAll('[data-count]').forEach(counter => {
                        this.animateCounter(counter);
                    });
                }
            });
        }, observerOptions);

        this.elements.forEach(el => observer.observe(el));
        
        // Observe skill container
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) observer.observe(skillsContainer);
    }

    animateSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach((fill, index) => {
            setTimeout(() => {
                const level = fill.dataset.level;
                fill.style.setProperty('--level', `${level}%`);
                fill.classList.add('animated');
            }, index * 100);
        });
    }

    animateCounter(element) {
        if (element.classList.contains('counted')) return;
        element.classList.add('counted');
        
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// ============================================
// PARALLAX EFFECTS
// ============================================
class ParallaxEffects {
    constructor() {
        if (state.prefersReducedMotion) return;
        
        this.layers = document.querySelectorAll('.parallax-layer');
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => this.update(), 16));
        this.update();
    }

    update() {
        const scrollY = window.scrollY;
        
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const yOffset = scrollY * speed;
            layer.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
    }
}

// ============================================
// TIMELINE ANIMATION
// ============================================
class TimelineAnimation {
    constructor() {
        this.timeline = document.querySelector('.timeline');
        this.progress = elements.timelineProgress;
        this.items = document.querySelectorAll('.timeline-item');
        
        if (!this.timeline) return;
        
        this.init();
    }

    init() {
        // Intersection Observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        this.items.forEach(item => observer.observe(item));
        
        // Progress bar update on scroll
        window.addEventListener('scroll', throttle(() => this.updateProgress(), 16));
    }

    updateProgress() {
        if (!this.progress || !this.timeline) return;
        
        const timelineRect = this.timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top + window.scrollY;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        // Calculate progress
        const start = timelineTop - windowHeight + 100;
        const end = timelineTop + timelineHeight - windowHeight / 2;
        const progress = clamp((scrollY - start) / (end - start), 0, 1);
        
        this.progress.style.height = `${progress * 100}%`;
    }
}

// ============================================
// 3D TILT EFFECT
// ============================================
class TiltEffect {
    constructor() {
        if (state.isMobile || state.prefersReducedMotion) return;
        
        this.cards = document.querySelectorAll('.tilt-card[data-tilt]');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const scale = parseFloat(card.dataset.tiltScale) || 1.05;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// ============================================
// SCROLL PROGRESS & NAVBAR
// ============================================
class ScrollHandler {
    constructor() {
        this.lastScrollY = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            this.updateScrollProgress();
            this.updateNavbar();
            this.updateActiveNav();
        }, 16));
    }

    updateScrollProgress() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        
        if (elements.scrollProgress) {
            elements.scrollProgress.style.width = `${progress}%`;
        }
    }

    updateNavbar() {
        const scrollY = window.scrollY;
        
        if (elements.navbar) {
            if (scrollY > 50) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }
        }
        
        this.lastScrollY = scrollY;
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================
// THEME TOGGLE
// ============================================
class ThemeToggle {
    constructor() {
        this.toggle = elements.themeToggle;
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcon();
        
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateIcon();
    }

    updateIcon() {
        const icon = this.toggle?.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// ============================================
// MOBILE MENU
// ============================================
class MobileMenu {
    constructor() {
        this.hamburger = elements.hamburger;
        this.menu = elements.navMenu;
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggle());
        }
        
        // Close on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.hamburger.contains(e.target) && !this.menu.contains(e.target)) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active');
        this.menu.classList.toggle('active');
    }

    close() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.menu.classList.remove('active');
    }
}

// ============================================
// DYNAMIC GREETING
// ============================================
class DynamicGreeting {
    constructor() {
        this.element = elements.greeting;
        this.init();
    }

    init() {
        if (!this.element) return;
        
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        // Check for returning visitor
        const visitorName = localStorage.getItem('visitorName');
        if (visitorName) {
            greeting += `, ${visitorName}`;
        }
        
        this.element.textContent = greeting;
    }
}

// ============================================
// TYPING EFFECT
// ============================================
class TypingEffect {
    constructor() {
        this.element = elements.tagline;
        this.texts = [
            'Software Engineer',
            'Full-Stack Developer',
            'Problem Solver',
            'Database Enthusiast',
            'KFUPM Student'
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        if (this.element) this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isPaused) {
            setTimeout(() => {
                this.isPaused = false;
                this.type();
            }, 1500);
            return;
        }
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let speed = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            this.isPaused = true;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// ============================================
// PROJECT FILTERING & SORTING
// ============================================
class ProjectManager {
    constructor() {
        this.grid = elements.projectsGrid;
        this.cards = document.querySelectorAll('.project-card');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sort-select');
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.emptyState = elements.emptyState;
        
        this.init();
    }

    init() {
        // Apply saved view
        this.setView(state.currentView);
        
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentFilter = btn.dataset.filter;
                this.filterAndSort();
            });
        });
        
        // Sort select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => {
                state.currentSort = this.sortSelect.value;
                this.filterAndSort();
            });
        }
        
        // View toggle
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setView(btn.dataset.view);
            });
        });
    }

    filterAndSort() {
        const cards = Array.from(this.cards);
        
        // Filter
        let filtered = cards.filter(card => {
            if (state.currentFilter === 'all') return true;
            return card.dataset.category === state.currentFilter;
        });
        
        // Sort
        filtered.sort((a, b) => {
            switch (state.currentSort) {
                case 'newest':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'oldest':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                case 'name':
                    return a.dataset.name.localeCompare(b.dataset.name);
                default:
                    return 0;
            }
        });
        
        // Hide all cards first
        cards.forEach(card => {
            card.classList.add('hiding');
            card.style.order = '999';
        });
        
        // Show and reorder filtered cards
        setTimeout(() => {
            cards.forEach(card => card.style.display = 'none');
            
            filtered.forEach((card, index) => {
                card.style.display = '';
                card.style.order = index;
                setTimeout(() => card.classList.remove('hiding'), 50 * index);
            });
            
            // Show/hide empty state
            if (this.emptyState) {
                this.emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
            }
        }, 300);
    }

    setView(view) {
        state.currentView = view;
        localStorage.setItem('projectView', view);
        
        if (this.grid) {
            this.grid.classList.remove('grid-view', 'list-view');
            this.grid.classList.add(`${view}-view`);
        }
    }
}

// Global function for reset button
function resetFilters() {
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
}

// ============================================
// GITHUB API INTEGRATION
// ============================================
class GitHubIntegration {
    constructor() {
        this.container = elements.githubProjects;
        this.username = 'TurkiAlslamah';
        this.init();
    }

    async init() {
        if (!this.container) return;
        await this.fetchRepos();
    }

    async fetchRepos() {
        try {
            const response = await fetch(
                `https://api.github.com/users/${this.username}/repos?sort=updated&per_page=6`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const repos = await response.json();
            
            if (repos.length === 0) {
                this.showEmptyState();
                return;
            }
            
            this.renderRepos(repos);
            
        } catch (error) {
            console.error('GitHub API Error:', error);
            this.showError();
        }
    }

    renderRepos(repos) {
        const languageColors = {
            JavaScript: '#f1e05a',
            TypeScript: '#2b7489',
            Python: '#3572A5',
            Java: '#b07219',
            HTML: '#e34c26',
            CSS: '#563d7c',
            SQL: '#e38c00',
            'C++': '#f34b7d',
            C: '#555555'
        };
        
        this.container.innerHTML = repos.map(repo => `
            <div class="github-card">
                <h4>${this.escapeHtml(repo.name)}</h4>
                <p>${repo.description ? this.escapeHtml(repo.description) : 'No description available'}</p>
                <div class="github-card-footer">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repo →</a>
                    ${repo.language ? `
                        <span class="github-lang">
                            <span class="lang-dot" style="background: ${languageColors[repo.language] || '#ccc'}"></span>
                            ${repo.language}
                        </span>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    showEmptyState() {
        this.container.innerHTML = `
            <div class="loading-state">
                <p>📭 No repositories found</p>
            </div>
        `;
    }

    showError() {
        this.container.innerHTML = `
            <div class="error-state">
                <p>❌ Failed to load GitHub repositories</p>
                <button class="btn btn-secondary" onclick="new GitHubIntegration()">
                    🔄 Try Again
                </button>
            </div>
        `;
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// ============================================
// CONTACT FORM
// ============================================
class ContactForm {
    constructor() {
        this.form = elements.contactForm;
        this.status = elements.formStatus;
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Character count for message
        const message = this.form.querySelector('#message');
        const charCount = this.form.querySelector('#char-current');
        if (message && charCount) {
            message.addEventListener('input', () => {
                charCount.textContent = message.value.length;
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const name = this.form.querySelector('#name');
        const email = this.form.querySelector('#email');
        const message = this.form.querySelector('#message');
        
        // Validate all fields
        let isValid = true;
        isValid = this.validateField(name) && isValid;
        isValid = this.validateField(email) && isValid;
        isValid = this.validateField(message) && isValid;
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = this.form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Save visitor name
        localStorage.setItem('visitorName', name.value.split(' ')[0]);
        
        // Show success
        this.showStatus('success', `Thank you, ${name.value}! Your message has been sent.`);
        this.form.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Clear char count
        const charCount = this.form.querySelector('#char-current');
        if (charCount) charCount.textContent = '0';
    }

    validateField(input) {
        const value = input.value.trim();
        let error = '';
        
        if (!value) {
            error = `${this.capitalize(input.name)} is required`;
        } else if (input.type === 'email' && !this.isValidEmail(value)) {
            error = 'Please enter a valid email address';
        } else if (input.name === 'message' && value.length < 10) {
            error = 'Message must be at least 10 characters';
        } else if (input.name === 'name' && value.length < 2) {
            error = 'Name must be at least 2 characters';
        }
        
        if (error) {
            this.showFieldError(input, error);
            return false;
        } else {
            this.showFieldSuccess(input);
            return true;
        }
    }

    showFieldError(input, message) {
        const error = document.getElementById(`${input.name}-error`);
        const success = document.getElementById(`${input.name}-success`);
        
        input.classList.add('error');
        input.classList.remove('success');
        
        if (error) {
            error.textContent = message;
            error.classList.add('show');
        }
        if (success) {
            success.classList.remove('show');
        }
    }

    showFieldSuccess(input) {
        const error = document.getElementById(`${input.name}-error`);
        const success = document.getElementById(`${input.name}-success`);
        
        input.classList.remove('error');
        input.classList.add('success');
        
        if (error) {
            error.classList.remove('show');
        }
        if (success) {
            success.textContent = '✓';
            success.classList.add('show');
        }
    }

    clearFieldError(input) {
        const error = document.getElementById(`${input.name}-error`);
        input.classList.remove('error');
        if (error) {
            error.classList.remove('show');
        }
    }

    showStatus(type, message) {
        if (!this.status) return;
        
        this.status.className = `form-status ${type}`;
        this.status.textContent = message;
        
        setTimeout(() => {
            this.status.className = 'form-status';
        }, 5000);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// ============================================
// VISITOR STATS
// ============================================
class VisitorStats {
    constructor() {
        this.visitCountEl = elements.visitCount;
        this.timeOnSiteEl = elements.timeOnSite;
        this.init();
    }

    init() {
        // Show visit count
        if (this.visitCountEl) {
            this.visitCountEl.textContent = state.visitCount;
        }
        
        // Update time on site every second
        setInterval(() => this.updateTimeOnSite(), 1000);
    }

    updateTimeOnSite() {
        if (!this.timeOnSiteEl) return;
        
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        this.timeOnSiteEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    new Loader();
    new ThemeToggle();
    new MobileMenu();
    new DynamicGreeting();
    new SmoothScroll();
    
    // Animations & Effects
    new CustomCursor();
    new MagneticElements();
    new RevealOnScroll();
    new ParallaxEffects();
    new TimelineAnimation();
    new TiltEffect();
    new ScrollHandler();
    new TypingEffect();
    
    // Functionality
    new ProjectManager();
    new GitHubIntegration();
    new ContactForm();
    new VisitorStats();
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log(`👁️ Visit #${state.visitCount}`);
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    state.isMobile = window.innerWidth < 768;
}, 250));