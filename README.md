# 🌟 Glassy Animated Portfolio

A stunning, modern, and highly animated one-page portfolio featuring advanced glass morphism effects, 3D elements, and multiple animation libraries.

![Portfolio Preview](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Design
- **Advanced Glass Morphism** - Beautiful glassmorphic cards with blur effects
- **Black & White Theme** - Elegant monochrome color scheme
- **Responsive Design** - Perfect on all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, intuitive, and user-friendly interface

### 🎬 Animations
- **ThreeJS** - 3D geometric shapes with parallax effects
- **ParticlesJS** - Interactive particle background
- **AnimeJS** - Smooth scroll-triggered animations
- **VelocityJS** - Advanced micro-interactions
- **Mo.js** - Burst and ripple effects on interactions
- **Custom CSS Animations** - Glitch effects, gradients, and transitions

### 📑 Sections
1. **Hero** - Eye-catching introduction with animated elements
2. **About** - Profile information with animated statistics
3. **Work** - Project showcase with hover effects
4. **Blogs** - Latest articles and posts
5. **Testimonials** - Client reviews with star ratings
6. **Contact** - Interactive form with animated inputs

### 🚀 Special Features
- Custom cursor follower (desktop only)
- Smooth scroll navigation
- Scroll-to-top button
- Loading screen with glass effect
- Parallax scrolling effects
- Intersection Observer for performance
- Form validation and animations
- Notification system
- Responsive navigation with mobile menu

## 🛠️ Technologies Used

### Core
- HTML5
- CSS3 (with advanced features)
- JavaScript (ES6+)
- jQuery 3.7.1

### Frameworks & Libraries
- **Bootstrap 5.3.2** - Responsive grid and components
- **ThreeJS r128** - 3D graphics and animations
- **ParticlesJS 2.0.0** - Particle effects
- **AnimeJS 3.2.1** - Timeline-based animations
- **VelocityJS 2.0.6** - High-performance animations
- **Mo.js** - Motion graphics library

### Fonts & Icons
- **Google Fonts**
  - Poppins (main font)
  - Playfair Display (headings)
  - Space Grotesk (accent)
- **Google Material Icons** - Icon set

## 📂 File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── style.css          # Comprehensive styles with glass morphism
├── script.js          # All animations and interactions
└── README.md          # Documentation
```

## 🚀 Getting Started

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. That's it! No build process required.

### Customization

#### Change Content

Edit `index.html` to update:
- Your name and title
- About section information
- Projects and work samples
- Blog posts
- Testimonials
- Contact information

#### Modify Colors

In `style.css`, update the CSS variables:

```css
:root {
    --primary-black: #000000;
    --secondary-black: #0a0a0a;
    --glass-white: rgba(255, 255, 255, 0.1);
    --text-white: #ffffff;
    --text-gray: #b0b0b0;
}
```

#### Adjust Animations

In `script.js`, you can modify:
- ThreeJS shapes and rotations
- Particle configuration
- Animation durations and easing
- Scroll effects

## 🎯 Key Components

### Glass Morphism Cards

```css
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
}
```

### Animation Libraries Usage

**AnimeJS Example:**
```javascript
anime({
    targets: '.element',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
});
```

**VelocityJS Example:**
```javascript
Velocity(element, 
    { opacity: 1, translateY: 0 }, 
    { duration: 800, easing: 'easeOutQuart' }
);
```

**Mo.js Example:**
```javascript
const burst = new mojs.Burst({
    radius: { 0: 100 },
    count: 8,
    children: {
        shape: 'circle',
        fill: '#ffffff'
    }
});
```

## 🎨 CSS Features

- **Backdrop Filter** - Glass blur effects
- **CSS Grid & Flexbox** - Modern layouts
- **CSS Animations** - Keyframe animations
- **Custom Properties** - CSS variables
- **Media Queries** - Responsive breakpoints
- **Pseudo-elements** - Decorative effects
- **Gradients** - Color transitions
- **Transitions** - Smooth state changes

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: Below 768px

## ⚡ Performance Optimizations

- Intersection Observer for lazy animations
- Throttled scroll events
- RequestAnimationFrame for smooth animations
- Optimized particle count for mobile
- Efficient CSS selectors
- Minimal DOM manipulation

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Note:** Some advanced features require modern browser support for:
- backdrop-filter
- CSS Grid
- IntersectionObserver
- ES6+ JavaScript

## 📝 Customization Tips

### Adding New Projects

1. Copy an existing `.work-card` div in `index.html`
2. Update the icon, title, description, and tags
3. Add your project link to the `work-link` href

### Changing Animation Speed

Adjust duration values in `script.js`:

```javascript
// Slower animation
duration: 2000  // 2 seconds

// Faster animation
duration: 500   // 0.5 seconds
```

### Modifying Glass Effect Intensity

In `style.css`, adjust the blur and opacity:

```css
.glass-card {
    background: rgba(255, 255, 255, 0.05); /* Lower = more transparent */
    backdrop-filter: blur(20px); /* Higher = more blur */
}
```

## 🎓 Learning Resources

- [ThreeJS Documentation](https://threejs.org/docs/)
- [AnimeJS Documentation](https://animejs.com/documentation/)
- [ParticlesJS Demo](https://vincentgarreau.com/particles.js/)
- [VelocityJS Docs](http://velocityjs.org/)
- [Mo.js Documentation](https://mojs.github.io/)

## 🐛 Troubleshooting

### Animations not working?
- Check browser console for errors
- Ensure all CDN links are accessible
- Verify JavaScript is enabled

### Glass effect not visible?
- Update to a modern browser
- Check if backdrop-filter is supported
- Try increasing blur values

### Mobile performance issues?
- Reduce particle count in `script.js`
- Disable ThreeJS on mobile
- Simplify animations for smaller screens

## 📄 License

This project is open source and available for personal and commercial use. Feel free to customize and adapt it to your needs!

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your customizations

## 💡 Tips for Best Results

1. **Use high-quality images** for profile and projects
2. **Write compelling copy** for your sections
3. **Test on multiple devices** before publishing
4. **Optimize images** for faster loading
5. **Add real project links** and case studies
6. **Update testimonials** with actual client feedback
7. **Connect social media** links in the contact section

## 🎉 Credits

Created with ❤️ using:
- Bootstrap for responsive layout
- Google Fonts for beautiful typography
- Multiple animation libraries for stunning effects
- Modern CSS techniques for glass morphism

---

**Enjoy your new portfolio! 🚀**

For questions or support, feel free to reach out!
