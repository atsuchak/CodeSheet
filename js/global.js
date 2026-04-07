document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
        });
    }

    // 3. Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow loop for cursor
    function animateCursor() {
        // interpolate
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for links
    const interactiveElements = document.querySelectorAll('a, button, input, .hover-trigger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    // 4. Global Copy Button Injection via Event Delegation
    // Instead of querying on load, we will intercept clicks globally.
    // However, we need to inject the buttons on load. Wait, since content is dynamically injected,
    // let's export a function to inject buttons so renderer can call it, OR we just let renderer inject the button HTML!
    // But since renderer is already written, let's just listen globally for clicks on the pre tag itself or code wrapper.
    document.addEventListener('click', async (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            const wrapper = copyBtn.closest('.code-wrapper');
            if (wrapper) {
                const codeElement = wrapper.querySelector('code');
                if (codeElement) {
                    const codeText = codeElement.innerText.trim();
                    try {
                        await navigator.clipboard.writeText(codeText);
                        copyBtn.classList.add('copied', 'text-[#38bdf8]');
                        copyBtn.innerHTML = `
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                            </svg>
                        `;
                        setTimeout(() => {
                            copyBtn.classList.remove('copied', 'text-[#38bdf8]');
                            copyBtn.innerHTML = `
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            `;
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy code: ', err);
                    }
                }
            }
        }
    });

    // 5. TOC Sidebar Drawer Logic
    const tocToggleBtn = document.getElementById('toc-toggle-btn');
    const tocCloseBtn = document.getElementById('toc-close-btn');
    const tocSidebar = document.getElementById('toc-sidebar');
    const tocOverlay = document.getElementById('toc-overlay');
    
    // 6. Navigation Mobile Menu Logic
    const navMobileToggle = document.getElementById('nav-mobile-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    let isNavOpen = false;

    if (navMobileToggle && mobileNavMenu) {
        navMobileToggle.addEventListener('click', () => {
            isNavOpen = !isNavOpen;
            if (isNavOpen) {
                mobileNavMenu.classList.remove('pointer-events-none');
                mobileNavMenu.classList.add('opacity-100');
                // Cross Icon
                navMobileToggle.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            } else {
                mobileNavMenu.classList.add('pointer-events-none');
                mobileNavMenu.classList.remove('opacity-100');
                // Hamburger icon
                navMobileToggle.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
            }
        });
    }

    // Existing TOC logic
    const toggleSidebar = () => {
        if (!tocSidebar) return;
        const isOpen = !tocSidebar.classList.contains('-translate-x-full');
        
        if (isOpen) {
            tocSidebar.classList.add('-translate-x-full');
            tocOverlay.classList.remove('opacity-100');
            setTimeout(() => {
                if(tocSidebar.classList.contains('-translate-x-full')) {
                    tocOverlay.classList.add('hidden');
                }
            }, 300);
        } else {
            tocOverlay.classList.remove('hidden');
            setTimeout(() => {
                tocOverlay.classList.add('opacity-100');
                tocSidebar.classList.remove('-translate-x-full');
            }, 10);
        }
    };
    
    if (tocToggleBtn) tocToggleBtn.addEventListener('click', toggleSidebar);
    if (tocCloseBtn) tocCloseBtn.addEventListener('click', toggleSidebar);
    if (tocOverlay) tocOverlay.addEventListener('click', toggleSidebar);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && tocSidebar && !tocSidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    });

    // Handle TOC Link Clicks - intercept to close sidebar and smooth scroll using Lenis
    document.addEventListener('click', (e) => {
        const link = e.target.closest('#toc-list a');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, { offset: -100 });
                toggleSidebar();
            }
        }
    });

    // 6. Visual Benchmark / Scroll Progress
    const progressBar = document.getElementById('scroll-progress-bar');
    const percentText = document.getElementById('scroll-percentage');
    
    lenis.on('scroll', (e) => {
        if (!progressBar || !percentText) return;
        
        const scrollPercent = e.progress * 100;
        const clampedPercent = isNaN(scrollPercent) ? 0 : Math.min(100, Math.max(0, scrollPercent));
        
        progressBar.style.height = `${clampedPercent}%`;
        percentText.innerText = `${Math.round(clampedPercent)}%`;
    });
});
