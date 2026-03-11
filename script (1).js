// script.js

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // --- 1. LENIS SMOOTH SCROLL ---
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- 2. HERO SECTIE ANIMATIES ---
    // Elegante fade-in voor de hero content
    gsap.from('[data-hero-element]', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Dynamische Begroeting
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        if (hour < 12) greetingEl.textContent = 'Goedemorgen';
        else if (hour < 18) greetingEl.textContent = 'Goedemiddag';
        else greetingEl.textContent = 'Goedenavond';
    }

    // 3. Interactieve Titel-Editor
    const interactiveTitle = document.getElementById('interactive-title');
    const editorPanel = document.getElementById('title-editor-panel');

    if (interactiveTitle && editorPanel) {
        const titleChars = new SplitType(interactiveTitle, { types: 'chars' });
        const distortionSlider = document.getElementById('distortion-slider');
        const stretchSlider = document.getElementById('stretch-slider');
        const chaosSlider = document.getElementById('chaos-slider');
        const resetButton = document.getElementById('reset-title-style');
        const displacementMap = document.querySelector('#liquid-filter feDisplacementMap');

        let chaosTicker;

        const updateTitle = () => {
            // Vervorming
            const distortionValue = distortionSlider.value;
            displacementMap.scale.baseVal = distortionValue;
            interactiveTitle.style.filter = distortionValue > 0 ? 'url(#liquid-filter)' : 'none';

            // Uitrekken
            // Gebruik .set voor directe feedback, .to() kan voor vertraging zorgen
            gsap.set(interactiveTitle, { scaleX: stretchSlider.value });

            // Chaos
            const chaosValue = chaosSlider.value;
            if (chaosValue > 0) {
                if (!chaosTicker) {
                    chaosTicker = gsap.ticker.add(() => {
                        gsap.set(titleChars.chars, {
                            x: () => gsap.utils.random(-chaosSlider.value, chaosSlider.value),
                            y: () => gsap.utils.random(-chaosSlider.value, chaosSlider.value),
                        });
                    });
                }
            } else {
                if (chaosTicker) {
                    // Dit is de cruciale fix: stop de ticker als de chaos 0 is.
                    gsap.ticker.remove(chaosTicker);
                    chaosTicker = null;
                    gsap.to(titleChars.chars, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
                }
            }
        };

        const resetAll = () => {
            distortionSlider.value = 0;
            stretchSlider.value = 1;
            chaosSlider.value = 0;
            updateTitle();
        };

        distortionSlider.addEventListener('input', updateTitle);
        stretchSlider.addEventListener('input', updateTitle);
        chaosSlider.addEventListener('input', updateTitle);
        resetButton.addEventListener('click', (e) => { e.stopPropagation(); resetAll(); });

        // Zorg ervoor dat klikken op de slider-track de waarde bijwerkt
        [distortionSlider, stretchSlider, chaosSlider].forEach(slider => {
            slider.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const width = rect.width;
                const min = parseFloat(this.min);
                const max = parseFloat(this.max);
                this.value = min + (max - min) * (x / width);
                updateTitle();
            });
        });
    }
    
    // Editor Mode Toggle
    const editorToggle = document.getElementById('editor-mode-toggle');
    if (editorToggle && editorPanel) {
        editorToggle.addEventListener('click', () => {
            const isActive = document.body.classList.toggle('editor-mode-active');
            editorToggle.textContent = isActive ? 'Sluiten' : 'Editor Mode';
            if (isActive) {
                editorPanel.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-12');
            } else {
                editorPanel.classList.add('opacity-0', 'pointer-events-none', 'translate-y-12');
            }
        });
    }

    // Magnetische 'Scroll'-knop
    const magneticLink = document.getElementById('magnetic-link');
    if (magneticLink) {
        magneticLink.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * 0.5;
            const y = (clientY - (top + height / 2)) * 0.5;
            gsap.to(this, { x: x, y: y, duration: 0.3, ease: 'power2.out' });
        });
        magneticLink.addEventListener('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    }

    // Subtiele Lichtinval (Gradient Shift)
    const lightEffect = document.getElementById('light-effect');
    if (lightEffect) {
        window.addEventListener('mousemove', e => {
            const { clientX, clientY } = e;
            gsap.to(lightEffect, {
                background: `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(180, 83, 9, 0.05), transparent 40vw)`,
                duration: 1
            });
        });
    }
    
    // 2. Verbeterd Parallax-effect
    const heroScrollTrigger = {
        trigger: 'header',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    };
    gsap.to('[data-hero-element="header"]', { y: -50, scrollTrigger: heroScrollTrigger });
    gsap.to('[data-hero-element="title-wrapper"]', { y: -150, scrollTrigger: heroScrollTrigger });
    gsap.to('[data-hero-element="footer"]', { y: -100, scrollTrigger: heroScrollTrigger });

    // Geanimeerde 'Scroll'-instructie
    gsap.to("#scroll-path-svg", {
        rotation: 360,
        duration: 10,
        ease: "none",
        repeat: -1
    });

    // 5. Interactieve Achtergrondlijnen
    const linesContainer = document.getElementById('background-lines');
    if (linesContainer) {
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'absolute bg-text/10';
            line.style.width = '1px';
            line.style.height = `${Math.random() * 40 + 20}vh`;
            line.style.left = `${Math.random() * 100}%`;
            line.style.top = `${Math.random() * 100}%`;
            linesContainer.appendChild(line);

            gsap.to(line, {
                x: () => (Math.random() - 0.5) * window.innerWidth * 0.1,
                y: () => (Math.random() - 0.5) * window.innerHeight * 0.1,
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1 + Math.random() * 2 // Variabele scrub voor diepte
                }
            });
        }
    }

    // --- CUSTOM CURSOR ---
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, 0.1, { x: e.clientX, y: e.clientY });
        gsap.to(follower, 0.5, { x: e.clientX, y: e.clientY });
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, 0.3, { scale: 1.5, opacity: 0.5 });
        });
        el.addEventListener('mouseleave', () => {
            // Alleen resetten als de contextuele tekst niet actief is
            gsap.to(follower, 0.3, { scale: 1, opacity: 1 });
        });
    });

    // --- HORIZONTALE SCROLL-ANIMATIE MET GSAP ---
    const projectsContainer = document.querySelector('.projects-container');
    
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
        let scrollTween = gsap.to(projectsContainer, {
            xPercent: -100,
            x: () => window.innerWidth,
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-section",
                start: "center center",
                end: () => "+=" + (projectsContainer.scrollWidth - window.innerWidth),
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            },
        });

        // --- PARALLAX HOVER OP PROJECTEN (binnen matchMedia) ---
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const img = card.querySelector('img');
            card.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;

                gsap.to(img, {
                    duration: 0.8,
                    x: -x * 30,
                    y: -y * 20,
                    rotation: -x * 5,
                    ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    });

    // --- STAGGERED TEXT REVEAL ---
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const text = new SplitType(item.querySelector('p'), { types: 'words' });
        gsap.from(text.words, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.05,
        });
    });

    // --- INTERACTIVE MARQUEE ---
    const marqueeInner = document.querySelector('.marquee-inner');
    if (marqueeInner) {
        // Dupliceer de content voor een naadloze loop
        marqueeInner.innerHTML += marqueeInner.innerHTML;

        let marqueeTween = gsap.to(marqueeInner, {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1,
        });

        document.querySelector('.marquee-section').addEventListener('mouseenter', () => gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.5 }));
        document.querySelector('.marquee-section').addEventListener('mouseleave', () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 }));
    }

    // --- E-MAIL KOPIEER FUNCTIE ---
    const emailButton = document.getElementById('email-button');
    const feedbackElement = document.getElementById('copy-feedback');

    if (emailButton && feedbackElement) {
        emailButton.addEventListener('click', () => {
            const email = emailButton.dataset.email;
            navigator.clipboard.writeText(email)
                .then(() => {
                    feedbackElement.classList.add('opacity-100');
                    setTimeout(() => {
                        feedbackElement.classList.remove('opacity-100');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Kon e-mail niet kopiëren: ', err);
                });
        });
    }
});
