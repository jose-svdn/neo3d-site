/* ═══════════════════════════════════════════════
   NEO3D — JavaScript: Animations & Interactions
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Page fade-in ──
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });

    // ── Elements ──
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const header = document.getElementById('header');

    // ── Hamburger menu toggle ──
    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Page transition (fade-out before navigating) ──
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip external links, anchors, and javascript
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('javascript')) {
                return;
            }

            // Skip if current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (href === currentPage) {
                return;
            }

            e.preventDefault();
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    // ── Scroll Reveal (IntersectionObserver) ──
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation based on element index within viewport
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ── Header hide/show on scroll ──
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 400ms ease';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 400ms ease';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ── Grid/List toggle (Projects page) ──
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const projectsGrid = document.getElementById('projectsGrid');

    if (gridBtn && listBtn && projectsGrid) {
        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            projectsGrid.style.gridTemplateColumns = '';
            projectsGrid.querySelectorAll('.project-card__image-wrapper img').forEach(img => {
                img.style.aspectRatio = '4 / 3';
            });
        });

        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            projectsGrid.style.gridTemplateColumns = '1fr';
            projectsGrid.querySelectorAll('.project-card__image-wrapper img').forEach(img => {
                img.style.aspectRatio = '16 / 7';
            });
        });
    }

    // ── Contact form feedback ──
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'MENSAGEM ENVIADA ✓';
            submitBtn.style.background = 'rgba(255, 255, 255, 0.15)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ── Infinite hero carousel — JS-driven for perfect hover sync ──
    const heroTrack = document.getElementById('heroTrack');
    if (heroTrack) {
        let isDragging = false;
        let startX = 0;
        let preventClick = false;

        const items = heroTrack.querySelectorAll('.hero__item');
        
        // Add click listener to navigate to projects page
        function setupItemClick(el) {
            el.addEventListener('click', (e) => {
                if (preventClick) return;
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'projetos.html';
                }, 400);
            });
        }

        // Apply to original items
        items.forEach(item => {
            setupItemClick(item);
            
            // Duplicate all items to fill the second half of the track
            const clone = item.cloneNode(true);
            setupItemClick(clone);
            heroTrack.appendChild(clone);
        });

        // JS-driven carousel: moves via style.left so hitboxes stay in sync
        heroTrack.style.position = 'relative';
        let offset = 0;
        // Speed in pixels per second (adjust to taste)
        const isMobile = window.innerWidth <= 768;
        const speed = isMobile ? 80 : 60; // px/s
        let lastTime = null;

        function getHalfWidth() {
            // Half the track = the width of the original items (first half)
            const allItems = heroTrack.querySelectorAll('.hero__item');
            const half = allItems.length / 2;
            let w = 0;
            const gap = 24; // matches CSS gap
            for (let i = 0; i < half; i++) {
                w += allItems[i].offsetWidth + gap;
            }
            return w;
        }

        let halfWidth = getHalfWidth();

        // Recalculate on resize
        window.addEventListener('resize', () => {
            halfWidth = getHalfWidth();
        });

        function animateCarousel(timestamp) {
            if (lastTime === null) lastTime = timestamp;
            const delta = (timestamp - lastTime) / 1000; // seconds
            lastTime = timestamp;

            offset -= speed * delta;

            // When we've scrolled past the first half, reset seamlessly
            if (Math.abs(offset) >= halfWidth) {
                offset += halfWidth;
            }

            heroTrack.style.left = offset + 'px';
            requestAnimationFrame(animateCarousel);
        }

        requestAnimationFrame(animateCarousel);
    }

});
