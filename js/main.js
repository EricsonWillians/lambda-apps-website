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
    let scrollIndicatorTimer = null;
    
    // Auto-hide scroll indicator after 5 seconds
    function startScrollIndicatorTimer() {
        if (scrollIndicatorTimer) clearTimeout(scrollIndicatorTimer);
        scrollIndicatorTimer = setTimeout(() => {
            if (!scrollIndicatorHidden && scrollIndicator) {
                scrollIndicator.classList.add('hidden');
                scrollIndicatorHidden = true;
            }
        }, 5000);
    }
    
    // Start timer when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startScrollIndicatorTimer);
    } else {
        startScrollIndicatorTimer();
    }
    
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
            if (scrollIndicatorTimer) clearTimeout(scrollIndicatorTimer);
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
    // GitHub Repositories - Fetch, Sort & Pagination
    // ========================================================================
    const GITHUB_USERNAME = 'ericsonwillians';
    const REPOS_PER_PAGE = 6;
    
    let allRepos = [];
    let currentPage = 1;
    let currentSort = 'stars';
    
    const githubGrid = document.getElementById('githubGrid');
    const githubStats = document.getElementById('githubStats');
    const sortSelect = document.getElementById('sortSelect');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    
    // Language color mapping
    const langColors = {
        'JavaScript': 'github-lang-javascript',
        'TypeScript': 'github-lang-typescript',
        'Python': 'github-lang-python',
        'HTML': 'github-lang-html',
        'CSS': 'github-lang-css',
        'Shell': 'github-lang-shell',
        'Java': 'github-lang-java',
        'Go': 'github-lang-go',
        'Rust': 'github-lang-rust',
        'C++': 'github-lang-cpp',
        'C': 'github-lang-c',
        'Ruby': 'github-lang-ruby',
        'PHP': 'github-lang-php',
        'Swift': 'github-lang-swift',
        'Kotlin': 'github-lang-kotlin'
    };
    
    async function fetchGitHubRepos() {
        if (!githubGrid) return;
        
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            
            allRepos = await response.json();
            
            // Filter out forks and update stats
            allRepos = allRepos.filter(repo => !repo.fork);
            updateStats();
            
            // Initial sort and render
            sortAndRenderRepos();
            
        } catch (error) {
            console.error('GitHub fetch error:', error);
            const t = typeof I18N !== 'undefined' ? I18N.t : (key) => key;
            githubGrid.innerHTML = `
                <div class="github-error">
                    <p>${t('github.error') || 'Unable to load repositories.'}</p>
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">${t('github.viewOnGithub') || 'View on GitHub →'}</a>
                </div>
            `;
        }
    }
    
    function updateStats() {
        const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        const totalReposEl = document.getElementById('totalRepos');
        const totalStarsEl = document.getElementById('totalStars');
        
        if (totalReposEl) totalReposEl.textContent = allRepos.length;
        if (totalStarsEl) totalStarsEl.textContent = totalStars.toLocaleString();
    }
    
    function sortRepos() {
        switch (currentSort) {
            case 'stars':
                allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
                break;
            case 'updated':
                allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                break;
            case 'name':
                allRepos.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Use I18N if available, otherwise fallback to English
        const t = typeof I18N !== 'undefined' ? I18N.t : (key) => key;
        
        if (diffDays === 1) return t('github.timeAgo.yesterday') || 'yesterday';
        if (diffDays < 30) return `${diffDays} ${t('github.timeAgo.days') || 'days ago'}`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} ${t('github.timeAgo.months') || 'months ago'}`;
        return `${Math.floor(diffDays / 365)} ${t('github.timeAgo.years') || 'years ago'}`;
    }
    
    function renderRepos() {
        if (!githubGrid) return;
        
        const startIndex = (currentPage - 1) * REPOS_PER_PAGE;
        const endIndex = startIndex + REPOS_PER_PAGE;
        const reposToShow = allRepos.slice(startIndex, endIndex);
        
        // Get translation function
        const t = typeof I18N !== 'undefined' ? I18N.t : (key) => key;
        
        if (reposToShow.length === 0) {
            githubGrid.innerHTML = `<div class="github-error">${t('github.noRepos') || 'No repositories found.'}</div>`;
            return;
        }
        
        githubGrid.innerHTML = reposToShow.map(repo => {
            const langClass = langColors[repo.language] || 'github-lang-default';
            const description = repo.description || t('github.noDescription') || 'No description available.';
            const updatedText = t('github.updated') || 'Updated';
            
            return `
                <article class="github-card" data-hover>
                    <div class="github-card-header">
                        <h3 class="github-card-title">
                            <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
                        </h3>
                        <span class="github-card-stars">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            ${repo.stargazers_count.toLocaleString()}
                        </span>
                    </div>
                    <p class="github-card-desc">${description}</p>
                    <div class="github-card-meta">
                        ${repo.language ? `
                            <span class="github-card-lang">
                                <span class="github-lang-color ${langClass}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        <span class="github-card-updated">${updatedText} ${formatDate(repo.updated_at)}</span>
                    </div>
                </article>
            `;
        }).join('');
        
        updatePagination();
        
        // Re-apply translations to catch any new dynamic content
        if (typeof I18N !== 'undefined') {
            I18N.applyLanguage();
        }
    }
    
    function updatePagination() {
        const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
        
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }
        
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
    }
    
    function sortAndRenderRepos() {
        sortRepos();
        currentPage = 1;
        renderRepos();
    }
    
    // Event listeners
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            sortAndRenderRepos();
        });
    }
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderRepos();
                githubGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);
            if (currentPage < totalPages) {
                currentPage++;
                renderRepos();
                githubGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Initial fetch
    fetchGitHubRepos();
    
    // Re-render on language change
    window.addEventListener('languagechange', () => {
        if (allRepos.length > 0) {
            renderRepos();
        }
    });

    // ========================================================================
    // Lambda Rain - Matrix Style Animation (Military Grade)
    // ========================================================================
    (function initLambdaRain() {
        const DEBUG = false;
        const log = (...args) => DEBUG && console.log('[λ]', ...args);
        
        const canvas = document.getElementById('lambdaRain');
        if (!canvas) { log('Canvas not found'); return; }
        
        // Feature detection
        const ctx = canvas.getContext('2d');
        if (!ctx) { log('Canvas 2D context not supported'); return; }
        
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
            log('Reduced motion preferred, hiding canvas');
            return;
        }
        
        // Configuration
        const config = {
            fontSize: 14,
            chars: ['Λ', 'λ'],
            color: '#00e5c0',
            trailAlpha: 0.05,
            baseAlpha: 0.4,
            fallSpeed: 0.5,
            skipChance: 0.9,
            resetChance: 0.975,
            targetFPS: 60
        };
        
        // Mobile adjustments
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            config.fontSize = 12;
            config.fallSpeed = 0.3;
            config.targetFPS = 30;
        }
        
        // State
        let width = 0, height = 0, columns = 0;
        let drops = [];
        let isRunning = false;
        let rafId = null;
        let lastFrame = 0;
        const frameInterval = 1000 / config.targetFPS;
        
        // Resize handler - simple and reliable
        function resize() {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            
            // Use CSS pixel size (no scaling issues)
            width = hero.offsetWidth;
            height = hero.offsetHeight;
            
            // Set canvas size to match display size
            canvas.width = width;
            canvas.height = height;
            
            // Recalculate columns
            columns = Math.floor(width / config.fontSize);
            
            // Initialize or grow drops array
            const oldLen = drops.length;
            drops.length = columns;
            for (let i = oldLen; i < columns; i++) {
                drops[i] = Math.random() * -100; // Start above canvas
            }
            
            log(`Resized: ${width}x${height}, columns: ${columns}`);
        }
        
        // Draw frame
        function draw(timestamp) {
            if (!isRunning) return;
            rafId = requestAnimationFrame(draw);
            
            // FPS throttling
            if (timestamp - lastFrame < frameInterval) return;
            lastFrame = timestamp;
            
            // Clear with trail effect
            ctx.fillStyle = `rgba(5, 5, 5, ${config.trailAlpha})`;
            ctx.fillRect(0, 0, width, height);
            
            // Draw drops
            ctx.font = `${config.fontSize}px monospace`;
            
            for (let i = 0; i < columns; i++) {
                if (Math.random() > config.skipChance) continue;
                
                const char = config.chars[Math.floor(Math.random() * config.chars.length)];
                const x = i * config.fontSize;
                const y = drops[i] * config.fontSize;
                
                if (y > 0 && y < height) {
                    // Fade out as it falls
                    const alpha = Math.max(0.05, config.baseAlpha - (y / height) * 0.3);
                    ctx.fillStyle = config.color;
                    ctx.globalAlpha = alpha;
                    ctx.fillText(char, x, y);
                    ctx.globalAlpha = 1;
                }
                
                // Reset or advance
                if (y > height && Math.random() > config.resetChance) {
                    drops[i] = 0;
                } else {
                    drops[i] += config.fallSpeed;
                }
            }
        }
        
        // Start/stop control
        function start() {
            if (isRunning) return;
            isRunning = true;
            lastFrame = performance.now();
            rafId = requestAnimationFrame(draw);
            log('Started');
        }
        
        function stop() {
            isRunning = false;
            if (rafId) cancelAnimationFrame(rafId);
            log('Stopped');
        }
        
        // Initialize
        resize();
        
        // Event handlers
        window.addEventListener('resize', resize, { passive: true });
        
        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start();
        });
        
        // Intersection observer for hero section
        const hero = document.querySelector('.hero');
        if (hero && 'IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? start() : stop();
            }, { threshold: 0 }).observe(hero);
        } else {
            start(); // Fallback if no IntersectionObserver
        }
        
        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(resize, 100);
        });
        
        log('Initialized');
    })();

    // ========================================================================
    // Console Message
    // ========================================================================
    console.log('%c Λ Lambda Apps ', 'background: linear-gradient(135deg, #00d4aa, #00a8e8); color: #000; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Mobile-Optimized Experience ', 'color: #00d4aa; font-size: 12px;');
    console.log('%c GitHub: @ericsonwillians ', 'color: #888; font-size: 11px;');

})();
