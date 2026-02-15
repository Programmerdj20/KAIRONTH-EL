// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            const isActive = navMenu.classList.contains("active");
            navMenu.classList.toggle("active");
            
            // Update ARIA attributes
            navToggle.setAttribute("aria-expanded", !isActive);

            // Animate hamburger menu
            const bars = navToggle.querySelectorAll(".bar");
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains("active")) {
                    if (index === 0)
                        bar.style.transform =
                            "rotate(45deg) translate(5px, 5px)";
                    if (index === 1) bar.style.opacity = "0";
                    if (index === 2)
                        bar.style.transform =
                            "rotate(-45deg) translate(7px, -6px)";
                } else {
                    bar.style.transform = "none";
                    bar.style.opacity = "1";
                }
            });
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
                const bars = navToggle.querySelectorAll(".bar");
                bars.forEach((bar) => {
                    bar.style.transform = "none";
                    bar.style.opacity = "1";
                });
            }
        });
    });

    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + "%";
        }
    }

    // Back to Top Button
    function updateBackToTop() {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    }

    // Back to Top Button Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Navbar background on scroll
    window.addEventListener("scroll", () => {
        // Update scroll progress
        updateScrollProgress();
        
        // Update back to top button
        updateBackToTop();
        
        // Update navbar background
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(10, 22, 40, 0.98)";
            } else {
                navbar.style.background = "rgba(10, 22, 40, 0.95)";
            }
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener("scroll", () => {
        let current = "";
        const sections = document.querySelectorAll("section");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Early access form handling
    const earlyAccessForm = document.getElementById("early-access-form");
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const emailInput = this.querySelector('input[type="email"]');
            const nameInput = this.querySelector('input[type="text"]');
            
            // Remove any existing feedback
            const existingFeedback = this.querySelector('.form-success, .form-error');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Validate inputs
            if (!emailInput.value || !nameInput.value) {
                showFormFeedback(this, "Please fill in all fields.", "error");
                return;
            }

            if (!isValidEmail(emailInput.value)) {
                showFormFeedback(this, "Please enter a valid email address.", "error");
                return;
            }

            // Show loading state
            submitButton.classList.add("loading");
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Remove loading state
                submitButton.classList.remove("loading");
                submitButton.disabled = false;

                // Show success message
                showFormFeedback(
                    this,
                    "✨ Welcome to the Solar Code! You'll receive exclusive updates about the teachings.",
                    "success"
                );

                // Reset form after success
                this.reset();
                
                // Also show notification
                showNotification(
                    "Thank you! You've been added to our early access list.",
                    "success"
                );
            }, 2000);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe all content cards and temple cards
    const animatedElements = document.querySelectorAll(
        ".content-card, .temple-card, .code-card, .access-card"
    );
    animatedElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe mission-section elements
    const missionElements = document.querySelectorAll(".mission-section .container > *");
    missionElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe events-section elements
    const eventsElements = document.querySelectorAll(".events-section .container > *");
    eventsElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe welcome-section elements
    const welcomeElements = document.querySelectorAll(".welcome-section .container > *");
    welcomeElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe activation-section elements
    const activationElements = document.querySelectorAll(".activation-section .container > *");
    activationElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe welcome-section directly
    const welcomeSection = document.querySelector(".welcome-section");
    if (welcomeSection) {
        welcomeSection.style.opacity = "0";
        welcomeSection.style.transform = "translateY(30px)";
        welcomeSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(welcomeSection);
    }

    // Observe activation-section directly
    const activationSection = document.querySelector(".activation-section");
    if (activationSection) {
        activationSection.style.opacity = "0";
        activationSection.style.transform = "translateY(30px)";
        activationSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(activationSection);
    }

    // Observe book-download-section elements
    const bookDownloadElements = document.querySelectorAll(".book-download-section .container > *");
    bookDownloadElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe book-download-section directly
    const bookDownloadSection = document.querySelector(".book-download-section");
    if (bookDownloadSection) {
        bookDownloadSection.style.opacity = "0";
        bookDownloadSection.style.transform = "translateY(30px)";
        bookDownloadSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(bookDownloadSection);
    }

    // Observe premium-access-options within books section
    const premiumAccessOptions = document.querySelector(".premium-access-options");
    if (premiumAccessOptions) {
        premiumAccessOptions.style.opacity = "0";
        premiumAccessOptions.style.transform = "translateY(30px)";
        premiumAccessOptions.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(premiumAccessOptions);
    }

    // Observe donation-section elements
    const donationElements = document.querySelectorAll(".donation-section .donation-header, .donation-section .donation-methods");
    donationElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Observe donation options
    const donationOptions = document.querySelectorAll(".donation-option");
    donationOptions.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });

    // Cosmic particles animation enhancement
    createCosmicParticles();

    // Golden mandala pulse effect
    const goldenMandala = document.querySelector(".golden-mandala");
    if (goldenMandala) {
        setInterval(() => {
            goldenMandala.style.boxShadow = `0 0 ${
                Math.random() * 50 + 30
            }px rgba(244, 208, 63, ${Math.random() * 0.5 + 0.3})`;
        }, 2000);
    }

    // Enhanced portrait hover effect
    const portraitFrame = document.querySelector(".portrait-frame");
    if (portraitFrame) {
        portraitFrame.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow =
                "0 0 50px rgba(244, 208, 63, 0.7), inset 0 0 35px rgba(244, 208, 63, 0.2)";
        });

        portraitFrame.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow =
                "0 0 40px rgba(244, 208, 63, 0.5), inset 0 0 25px rgba(244, 208, 63, 0.1)";
        });
    }

    // Hero narrative animation is pure CSS (animation-delay on .hero-narrative > *)
});

// Utility function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    }
}

// Form feedback system
function showFormFeedback(form, message, type) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `form-${type}`;
    feedbackDiv.textContent = message;
    form.appendChild(feedbackDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (feedbackDiv.parentElement) {
            feedbackDiv.style.animation = "slideOut 0.3s ease";
            setTimeout(() => feedbackDiv.remove(), 300);
        }
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
          <div class="notification-content">
              <span class="notification-message">${message}</span>
              <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
          </div>
      `;

    // Add notification styles
    notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: ${
              type === "success"
                  ? "rgba(46, 125, 50, 0.95)"
                  : "rgba(26, 35, 50, 0.95)"
          };
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          border: 1px solid var(--accent-gold);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          max-width: 400px;
          animation: slideIn 0.3s ease;
      `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = "slideOut 0.3s ease";
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Create additional cosmic particles
function createCosmicParticles() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement("div");
        particle.className = "cosmic-particle";
        particle.style.cssText = `
              position: absolute;
              width: ${Math.random() * 4 + 1}px;
              height: ${Math.random() * 4 + 1}px;
              background: var(--accent-gold);
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              animation: twinkle ${Math.random() * 3 + 2}s infinite;
              opacity: ${Math.random() * 0.8 + 0.2};
          `;

        hero.appendChild(particle);
    }
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
      @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
      }
      
      @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
      }
      
      .notification-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
      }
      
      .notification-close {
          background: none;
          border: none;
          color: var(--accent-gold);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .nav-link.active {
          color: var(--accent-gold);
      }
      
      .nav-link.active::after {
          width: 100%;
      }
  `;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".cosmic-particles");

    parallaxElements.forEach((element) => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector(".hero-portrait");
    if (heroImage) {
        const speed = 0.2;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Enhanced hover effects for temple cards
document.querySelectorAll(".temple-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        this.style.boxShadow = "0 25px 60px rgba(244, 208, 63, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 5px 20px rgba(244, 208, 63, 0.1)";
    });
});

// Enhanced hover effects for content cards
document.querySelectorAll(".content-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)";
        this.style.boxShadow = "0 20px 50px rgba(244, 208, 63, 0.15)";
        this.style.borderColor = "rgba(244, 208, 63, 0.6)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 5px 20px rgba(244, 208, 63, 0.05)";
        this.style.borderColor = "rgba(244, 208, 63, 0.2)";
    });
});

// Loading animation
window.addEventListener("load", () => {
    const loadingOverlay = document.getElementById("loading-overlay");
    
    // Hide loading overlay quickly for a snappy feel
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.classList.add("hidden");
            setTimeout(() => {
                loadingOverlay.style.display = "none";
            }, 400);
        }
    }, 600);
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll(".section");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);

// Initialize reveal on load
document.addEventListener("DOMContentLoaded", revealOnScroll);
