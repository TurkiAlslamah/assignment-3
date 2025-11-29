# AI Usage Report



## Tools Used & Use Cases

### Claude AI
- Generated HTML structure for portfolio layout
- Created CSS code for responsive design and dark/light theme
- Wrote JavaScript for form validation and smooth scrolling
- Helped debug code issues and explained concepts
- Created scroll animations and parallax effects
- Built timeline component with progress indicator
- Developed 3D card tilt interactions
- Implemented custom cursor system

### ChatGPT  
- Made better prompts to send to Claude AI
- Generated sample text content for portfolio sections

## Benefits & Challenges 
**AI Output:**
- Complete `loadGitHubProjects()` async function
- Try-catch block for error handling
- Loading spinner HTML
- Response validation (`if (!res.ok)`)
- Empty state check (`if (repos.length === 0)`)
- Error message with retry button
- Intersection Observer API setup with threshold options
- CSS classes for animations (reveal-up, reveal-left, reveal-right, reveal-scale)
- Callback function to add `.visible` class when element enters viewport
- rootMargin setting to trigger animation early
- Multi-layer div structure with `data-speed` attributes for parallax
- Transform translate3d for GPU-accelerated movement
- Throttled scroll event handler at 16ms
- Floating shape elements with keyframe animations
- Timeline HTML structure with vertical line and progress bar
- JavaScript to calculate scroll percentage through section
- CSS for pulsing dot markers
- Mouse position tracking relative to card center
- Rotation angle calculation based on cursor distance
- CSS perspective property for 3D space
- Transform with rotateX and rotateY values
- Two div elements for cursor dot and follower circle
- Lerp function for smooth following movement
- requestAnimationFrame loop for 60fps animation
- Magnetic pull calculation based on distance to element
- Array of random characters for text scrambling effect
- setInterval loop to update text content
- Debounce and throttle functions for performance
- will-change CSS property for GPU hints
- prefers-reduced-motion media query for accessibility

**My Edits:**
- Changed username to "TurkiAlslamah"
- Modified styling to use my CSS variables
- Adjusted repos per page to 6
- Customized error message wording
- Made retry button use my existing `.btn.primary` class
- Changed animation duration to 0.8s for smoother feel
- Added `--delay` CSS variable for staggered effects
- Applied animations only to section headers and cards
- Adjusted rootMargin to `-10%` to trigger earlier
- Set parallax speed values to 0.1, 0.3, and 0.5 for subtle depth
- Changed shape colors to use my CSS variables
- Added blur filter to shapes for softer look
- Positioned shapes away from text content
- Added my milestones (KFUPM 2022, Java 2023, Projects 2024-2025)
- Changed progress bar gradient to my theme colors
- Adjusted calculation to work with my section padding
- Added tilt effect to timeline content cards
- Reduced maximum rotation from 15 to 10 degrees
- Added `data-tilt-scale` attribute to control hover zoom
- Applied effect to project cards and timeline cards
- Added smooth transition when mouse leaves card
- Added check to disable cursor on mobile and touch devices
- Changed cursor colors to match my theme
- Added `data-strength` attribute for different magnetic power
- Integrated hover states with my button styles
- Connected text scramble to Intersection Observer so it plays when visible
- Slowed timing from 20ms to 30ms for better readability
- Added flag to prevent re-triggering when scrolling back
- Applied text scramble only to my name and section titles
- Set throttle to 16ms for scroll events (60fps)
- Set debounce to 250ms for resize events
- Applied will-change only to animated elements
- Added fallback when reduced motion is preferred

**What I Learned:**
- How async/await works with fetch API
- Importance of checking response status before parsing JSON
- Different types of errors (network, rate limit, empty data)
- User experience patterns for loading and error states
- Intersection Observer is faster than scroll event listeners
- Threshold option controls how much of element must be visible
- CSS custom properties can be set inline for individual timing
- GPU-accelerated transforms are smoother than other properties
- translate3d triggers GPU acceleration for smoother animation
- Throttling limits how often function runs during scroll
- Multiple layers at different speeds creates depth illusion
- will-change CSS property helps browser optimize animations
- Scroll progress needs both scroll and element position calculations
- CSS gradients can animate smoothly when changing height
- Combining reveal with progress indicator creates storytelling effect
- Marker pulse uses scale transform with opacity fade
- perspective() must be set for 3D transforms to work
- getBoundingClientRect() gives accurate element position
- Smaller rotation angles look more professional
- transform-style preserve-3d allows nested 3D effects
- Lerp creates smooth eased movement between two points
- requestAnimationFrame syncs animation with screen refresh
- Touch device detection prevents issues on phones
- Magnetic effect uses simple distance and direction math
- substring() method extracts part of string by index
- split('') converts string to array of characters
- setInterval runs code repeatedly at specified time gaps
- Random characters with gradual reveal creates decryption effect
- Debounce waits until events stop, throttle limits frequency
- will-change uses extra memory so should not be overused
- prefers-reduced-motion respects user accessibility settings
- Performance optimization makes animations smooth on slow devices

### General Benefits
- Created perfect code with helpful comments
- Followed modern design patterns
- Learned faster with instant explanations
- Got professional-looking results
- Complex animations made simple to implement
- Performance best practices included automatically
- Accessibility features suggested proactively

### General Challenges
- Some code was too complex for my skill level
- Had to ask AI to simplify solutions multiple times  
- Code paths didn't always match my file structure
- CSS classes sometimes didn't connect to HTML properly
- Needed to test each feature separately before combining
- Some animations conflicted and required debugging

## Learning Outcomes

- Learned new CSS patterns like Grid and Flexbox
- Understood modern JavaScript techniques
- Discovered responsive design principles
- Learned how to write effective AI prompts
- Mastered Intersection Observer API for scroll detection
- Understood requestAnimationFrame for smooth animations
- Learned 3D CSS transforms and perspective
- Discovered performance optimization techniques
- Understood state management in vanilla JavaScript
- Learned API error handling patterns

## How I Modified AI Suggestions Responsibly

- Always tested and understood code before using it
- Asked AI to explain complex parts I didn't understand
- Changed all content to match my personal projects
- Fixed file paths and class names to match my structure
- Used real-world examples instead of generic templates
- Never copied code without knowing what it does
- Adjusted animation values to match my design preferences
- Removed features that were too complex for my needs
- Combined multiple AI suggestions into cohesive code
- Added comments to help myself understand the logic