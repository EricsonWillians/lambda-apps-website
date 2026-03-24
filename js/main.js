/**
 * Lambda Apps - Mobile-Optimized JavaScript
 * Features: Touch-friendly interactions, performance optimized
 */

(function() {
    'use strict';

    // ========================================================================
    // Feature Detection
    // ========================================================================
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // ========================================================================
    // Loader
    // ========================================================================
    const loader = document.getElementById('loader');
    
    function hideLoader() {
        if (loader) {
            // Shorter loader time on mobile
            const loadTime = isTouchDevice ? 400 : 800;
            setTimeout(() => {
                loader.classList.add('hidden');
                // Remove overflow hidden from body - critical for scrolling
                document.body.style.overflow = '';
                document.body.style.height = '';
                document.documentElement.style.overflow = '';
                // Trigger scroll animations after loader
                initScrollAnimations();
                
                // Force scroll indicator to show
                const scrollIndicator = document.getElementById('scrollIndicator');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.visibility = 'visible';
                }
            }, loadTime);
        }
    }

    // Only hide overflow during load
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Safety fallback - always enable scroll after 3 seconds max
    setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 3000);
    
    // Use DOMContentLoaded for faster startup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
    } else {
        hideLoader();
    }

    // ========================================================================
    // Custom Cursor - Desktop Only
    // ========================================================================
    if (!isTouchDevice) {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            let followerX = 0, followerY = 0;
            let isActive = true;
            let rafId = null;
            let lastMoveTime = Date.now();
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                lastMoveTime = Date.now();
                
                if (!isActive) {
                    isActive = true;
                    animate();
                }
            });
            
            function animate() {
                if (!isActive) return;
                
                // Pause animation if mouse inactive for 100ms (performance)
                if (Date.now() - lastMoveTime > 100) {
                    isActive = false;
                    return;
                }
                
                cursorX = mouseX;
                cursorY = mouseY;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                
                followerX += (mouseX - followerX) * 0.12;
                followerY += (mouseY - followerY) * 0.12;
                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';
                
                rafId = requestAnimationFrame(animate);
            }
            
            animate();
            
            // Hover effects
            const hoverElements = document.querySelectorAll('[data-hover], a, button');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    cursorFollower.classList.add('hover');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    cursorFollower.classList.remove('hover');
                });
            });
            
            // Pause when tab hidden
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    isActive = false;
                    cancelAnimationFrame(rafId);
                }
            });
        }
    }

    // ========================================================================
    // Mobile Menu - Touch Optimized
    // ========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuToggle && mobileMenu) {
        let isMenuOpen = false;
        
        function toggleMenu(e) {
            if (e) e.preventDefault();
            isMenuOpen = !isMenuOpen;
            
            menuToggle.classList.toggle('active', isMenuOpen);
            mobileMenu.classList.toggle('active', isMenuOpen);
            
            // Only toggle overflow if loader is hidden
            if (!loader || loader.classList.contains('hidden')) {
                document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            }
            
            // Accessibility
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
        }
        
        // Use touchstart for faster response on mobile
        menuToggle.addEventListener('click', toggleMenu);
        
        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });
        
        // Close on backdrop click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu && isMenuOpen) {
                toggleMenu();
            }
        });
    }

    // ========================================================================
    // Header Scroll Effect & Scroll Indicator - Throttled
    // ========================================================================
    const header = document.getElementById('header');
    const scrollIndicator = document.getElementById('scrollIndicator');
    let lastScroll = 0;
    let ticking = false;
    let scrollIndicatorHidden = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Hide scroll indicator after user scrolls (smaller threshold for mobile)
        const hideThreshold = isTouchDevice ? 50 : 100;
        if (!scrollIndicatorHidden && scrollIndicator && currentScroll > hideThreshold) {
            scrollIndicator.classList.add('hidden');
            scrollIndicatorHidden = true;
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // ========================================================================
    // Smooth Scroll for Anchor Links
    // ========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // ========================================================================
    // Scroll Animations - Intersection Observer
    // ========================================================================
    let scrollObserver;
    
    function initScrollAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-animate]').forEach(el => {
                el.classList.add('animated');
            });
            return;
        }
        
        const animateElements = document.querySelectorAll('[data-animate]');
        
        if (animateElements.length === 0) return;
        
        if (!('IntersectionObserver' in window)) {
            // Fallback for old browsers
            animateElements.forEach(el => el.classList.add('animated'));
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                    
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(el => scrollObserver.observe(el));
    }

    // ========================================================================
    // Counter Animation - Mobile Optimized
    // ========================================================================
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length > 0 && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    
                    // Simpler animation on mobile
                    if (isTouchDevice) {
                        counter.textContent = target;
                    } else {
                        animateCounter(counter, target);
                    }
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    function animateCounter(counter, target) {
        const duration = 1500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ========================================================================
    // Active Section Highlight in Nav
    // ========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-70px 0px -50% 0px'
        });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    // ========================================================================
    // Touch Feedback for Cards (Mobile)
    // ========================================================================
    if (isTouchDevice) {
        const touchElements = document.querySelectorAll('.service-card, .work-card, .about-stat, .contact-method');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            el.addEventListener('touchend', () => {
                el.style.transform = '';
            }, { passive: true });
            
            el.addEventListener('touchcancel', () => {
                el.style.transform = '';
            }, { passive: true });
        });
    }

    // ========================================================================
    // Prevent Zoom on Input Focus (iOS)
    // ========================================================================
    if (isIOS) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                document.body.style.touchAction = 'pan-y';
            });
            input.addEventListener('blur', () => {
                document.body.style.touchAction = '';
            });
        });
    }

    // ========================================================================
    // Double-tap to Zoom Prevention
    // ========================================================================
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // ========================================================================
    // Cleanup on Page Hide
    // ========================================================================
    window.addEventListener('pagehide', () => {
        if (scrollObserver) {
            scrollObserver.disconnect();
        }
        document.body.style.overflow = '';
    });

    // ========================================================================
    // Console Message
    // ========================================================================
    console.log('%c Λ Lambda Apps ', 'background: linear-gradient(135deg, #00d4aa, #00a8e8); color: #000; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Mobile-Optimized Experience ', 'color: #00d4aa; font-size: 12px;');

})();
