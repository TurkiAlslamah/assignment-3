# Technical Documentation

## Technical Features

### Dark/Light Theme Toggle
- Uses CSS custom properties (variables) for colors
- JavaScript toggles `data-theme` attribute on html element
- Theme preference saved in localStorage
- Button icon changes (🌙/☀️) based on current theme

### Responsive Design
- Mobile-first approach with CSS media queries
- Breakpoints: 768px (tablet), 480px (mobile)
- CSS Grid for projects layout
- Flexbox for navigation and buttons

### Navigation System
- Fixed navigation bar at top
- Smooth scrolling to sections using JavaScript
- Mobile hamburger menu that slides in from left
- Active section highlighting while scrolling

### Form Validation
- Real-time validation on input blur
- Email format checking with regex
- Error messages displayed below fields
- Form submission simulation with loading state
- **NEW:** Character count for message field
- **NEW:** Success checkmark indicators on valid fields
- **NEW:** Visitor name saved to localStorage for personalized greeting

### Animations
- Typing effect for tagline text using setTimeout
- CSS keyframe animations for page load
- Hover effects on cards and buttons
- Smooth transitions (0.3s ease) throughout site
- **NEW:** Loading spinner animation for API data fetching
- **NEW:** Card hover transform with translateY(-5px)
- **NEW:** Smooth fade-in for dynamically loaded content
- **NEW:** Reveal on scroll animations (fade up, left, right, scale)
- **NEW:** Parallax background with floating shapes
- **NEW:** Timeline progress animation on scroll
- **NEW:** 3D card tilt effect on mouse move
- **NEW:** Text scramble decryption effect on headings
- **NEW:** Counter animation for statistics
- **NEW:** Skill bar fill animations
- **NEW:** Pulsing markers on timeline

### **NEW:** Custom Cursor System
- Custom dot cursor replaces default cursor
- Follower circle with smooth lerp animation
- Hover states change cursor appearance
- Magnetic effect pulls cursor toward buttons
- Disabled on mobile and touch devices
- Uses requestAnimationFrame for 60fps performance

### **NEW:** Parallax Effects
- Multi-layer background with floating shapes
- Each layer moves at different speed on scroll
- Uses translate3d for GPU acceleration
- Throttled scroll handler for performance
- Blur filter creates depth effect

### **NEW:** Reveal on Scroll
- Intersection Observer API detects element visibility
- Multiple animation types (reveal-up, reveal-left, reveal-right, reveal-scale)
- Staggered delays using CSS custom properties
- Threshold and rootMargin for trigger control
- Animations play once when element enters viewport

### **NEW:** Timeline Animation
- Vertical timeline with progress bar
- Progress fills based on scroll position
- Individual items animate in when visible
- Pulsing dot markers for visual feedback
- 3D tilt effect on timeline cards

### **NEW:** 3D Card Tilt
- Mouse position tracked relative to card center
- Rotation calculated based on cursor distance
- CSS perspective creates 3D space
- Scale increase on hover
- Smooth reset transition on mouse leave

### **NEW:** Text Scramble Effect
- Characters scramble through random symbols
- Gradual reveal from left to right
- Triggered by Intersection Observer
- Applied to headings and name
- Prevents re-triggering on scroll back

### **NEW:** Performance Optimizations
- Debounce function for resize events (250ms)
- Throttle function for scroll events (16ms/60fps)
- will-change CSS for GPU acceleration hints
- prefers-reduced-motion media query support
- Intersection Observer instead of scroll listeners
- Lazy loading for images

## File Structure

### HTML (index.html)
- Semantic HTML5 elements (nav, section, footer)
- Proper heading hierarchy (h1, h2, h3)
- Form with required attributes
- Alt text for images
- **NEW:** Custom cursor div elements
- **NEW:** Scroll progress bar element
- **NEW:** Parallax layer containers with data-speed attributes
- **NEW:** Timeline structure with progress indicator
- **NEW:** data-tilt attributes for 3D effect cards
- **NEW:** data-scramble attributes for text effect
- **NEW:** data-count attributes for counter animation
- **NEW:** data-strength attributes for magnetic effect
- **NEW:** Filter and sort controls for projects
- **NEW:** View toggle buttons (grid/list)
- **NEW:** Visitor stats in footer

### CSS (css/styles.css)
- CSS custom properties for theming
- CSS Grid for project cards layout
- Flexbox for navigation and form layout
- Media queries for responsive design
- **NEW:** Reveal animation classes (.reveal-up, .reveal-left, .reveal-right, .reveal-scale)
- **NEW:** Custom cursor styling with hover states
- **NEW:** Parallax layer positioning and floating shapes
- **NEW:** Timeline styles with progress bar
- **NEW:** 3D transform properties (perspective, transform-style)
- **NEW:** Skill bar animations with gradient fill
- **NEW:** Loading spinner keyframe animation
- **NEW:** will-change properties for performance
- **NEW:** prefers-reduced-motion media query
- **NEW:** Filter button active states
- **NEW:** Grid and list view layouts
- **NEW:** Magnetic element transitions

### JavaScript (js/script.js)
- DOM element selection and manipulation
- Event listeners for user interactions
- Form validation functions
- Theme toggle functionality
- **NEW:** Async/await for API requests
- **NEW:** Try-catch error handling
- **NEW:** Dynamic content rendering with template literals
- **NEW:** Retry mechanism for failed API calls
- **NEW:** Loading state management
- **NEW:** Class-based architecture for each feature
- **NEW:** Intersection Observer for scroll animations
- **NEW:** requestAnimationFrame animation loops
- **NEW:** Lerp function for smooth cursor following
- **NEW:** Debounce and throttle utility functions
- **NEW:** Parallax scroll handler with data-speed
- **NEW:** Timeline progress calculation
- **NEW:** 3D tilt mouse position tracking
- **NEW:** Text scramble algorithm with setInterval
- **NEW:** Counter animation with easing
- **NEW:** Project filter and sort functions
- **NEW:** View preference localStorage
- **NEW:** Visitor stats tracking
- **NEW:** Mobile/touch device detection

### GitHub API Integration
- Fetches live repository data from GitHub API
- Displays 6 most recently updated repositories
- Asynchronous data loading with async/await
- Dynamic HTML generation using template literals
- **NEW:** Language color indicators for each repo
- **NEW:** XSS protection with escapeHtml function

#### Error Handling Implementation
- **Loading State:** Shows spinner with "Loading..." message during fetch
- **Try-Catch Block:** Captures network errors, API failures, and rate limits
- **Response Validation:** Checks HTTP status code before parsing JSON
- **Empty State:** Displays "No projects found" when API returns empty array
- **Error Display:** User-friendly error messages explaining what went wrong
- **Retry Mechanism:** Button allows users to retry failed requests without page refresh
- **Console Logging:** Errors logged to console for developer debugging

#### API Error Scenarios Handled
1. Network failure (no internet connection)
2. GitHub API rate limit exceeded (60 requests/hour)
3. Invalid username or API endpoint
4. Server errors (5xx responses)
5. Empty repository list
6. Malformed JSON responses

## API Integration Details

### Endpoint Used