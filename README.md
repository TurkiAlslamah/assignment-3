# Turki Alslamnah - Portfolio Website

A responsive personal portfolio website showcasing my Software Engineering projects and skills.



## Features

- ✅ Responsive design for all devices
- ✅ Dark/Light theme toggle with localStorage
- ✅ Smooth scrolling navigation
- ✅ Typing animation effect
- ✅ Contact form with real-time validation
- ✅ Mobile hamburger menu
- ✅ GitHub API integration with live repository display
- ✅ Error handling with loading states and retry mechanism
- ✅ Dynamic content loading from external API
- ✅ **NEW:** Reveal on scroll animations (fade up, left, right, scale)
- ✅ **NEW:** Parallax background with multi-layer floating shapes
- ✅ **NEW:** Animated timeline with scroll progress indicator
- ✅ **NEW:** 3D card tilt effect on mouse hover
- ✅ **NEW:** Custom magnetic cursor system
- ✅ **NEW:** Text scramble decryption effect on headings
- ✅ **NEW:** Counter animation for statistics
- ✅ **NEW:** Skill bar fill animations
- ✅ **NEW:** Project filter and sort system (combined)
- ✅ **NEW:** Grid/List view toggle with localStorage
- ✅ **NEW:** Visitor tracking (visit count, time on site)
- ✅ **NEW:** Personalized greeting for returning visitors
- ✅ **NEW:** Performance optimizations (debounce, throttle, Intersection Observer)
- ✅ **NEW:** Accessibility support (prefers-reduced-motion)
## Technologies

- HTML5
- CSS3 (Grid, Flexbox, Variables, 3D Transforms, Animations)
- Vanilla JavaScript (ES6+)
- GitHub REST API
- LocalStorage API
- Intersection Observer API
- requestAnimationFrame API
- No external frameworks or libraries

## Project Structure

```
assignment-1/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── project1.jpg
│       └── project2.jpg
└── docs/
    ├── ai-usage-report.md
    └── technical-docs.md
```

## Local Setup

1. Clone repository
```bash
git clone https://github.com/turkialslamah/assignment-2
```

2. Navigate to folder
```bash
cd assignment-1
```

3. Open in browser
```bash
# Option 1: Double-click index.html

## Sections

## API Integration (NEW)

### GitHub Repository Display
- Fetches 6 most recent repositories from GitHub API
- Real-time data loading with async/await
- Comprehensive error handling:
  - Loading states during fetch
  - Network error detection
  - API rate limit handling
  - Empty state display
  - Retry mechanism for failed requests

**Endpoint:** `https://api.github.com/users/TurkiAlslamah/repos`

**Features:**
- Automatic repository sorting by last update
- Dynamic HTML generation
- Graceful error recovery
- User-friendly error messages
### About
- Personal introduction
- KFUPM student information
- Technical skills showcase

### Projects
- **Facility Reservation System** - Java-based booking system
- **University Tournament System** - SQL database application

### Contact
- Contact information
- Working contact form
- Form validation

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## AI Tools Used

- **Claude AI**: Project structure, problem-solving, coding, helping with understanding
- **ChatGPT**:  Create the prompt


See `docs/ai-usage-report.md` for detailed usage.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Assignment Context

- **Course**: Web Development Fundamentals
- **Assignment**: Assignment 3 - Advanced Functionality
- **Weight**: 2% of final grade
- **Institution**: KFUPM
- **Due**: Week 13

## Author

**Turki Alslamah**  
Software Engineering Student  
King Fahd University of Petroleum & Minerals

- Email: turki.busnow@gmail.com
- GitHub: [turkialslamnah](https://github.com/turkialslamah)
- Location: Dammam, Saudi Arabia

## License

Educational project for KFUPM coursework.