 "use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Hero animaties
    gsap.from("[data-hero-element]", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    // Dynamische begroeting
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
      const hour = new Date().getHours();
      if (hour < 12) greetingEl.textContent = "Goedemorgen";
      else if (hour < 18) greetingEl.textContent = "Goedemiddag";
      else greetingEl.textContent = "Goedenavond";
    }

    // Interactieve titel-editor
    const interactiveTitle = document.getElementById("interactive-title");
    const editorPanel = document.getElementById("title-editor-panel");

    if (interactiveTitle && editorPanel) {
      const titleChars = new SplitType(interactiveTitle, { types: "chars" });
      const distortionSlider = document.getElementById(
        "distortion-slider",
      ) as HTMLInputElement | null;
      const stretchSlider = document.getElementById(
        "stretch-slider",
      ) as HTMLInputElement | null;
      const chaosSlider = document.getElementById(
        "chaos-slider",
      ) as HTMLInputElement | null;
      const resetButton = document.getElementById("reset-title-style");
      const displacementMap = document.querySelector(
        "#liquid-filter feDisplacementMap",
      ) as SVGFEDisplacementMapElement | null;

      let chaosTicker: number | null = null;

      const updateTitle = () => {
        if (!distortionSlider || !stretchSlider || !chaosSlider) return;
        if (!displacementMap) return;

        const distortionValue = Number(distortionSlider.value);
        displacementMap.setAttribute("scale", String(distortionValue));
        (interactiveTitle as HTMLElement).style.filter =
          distortionValue > 0 ? "url(#liquid-filter)" : "none";

        gsap.set(interactiveTitle, { scaleX: Number(stretchSlider.value) });

        const chaosValue = Number(chaosSlider.value);
        if (chaosValue > 0) {
          if (chaosTicker == null) {
            chaosTicker = gsap.ticker.add(() => {
              gsap.set(titleChars.chars, {
                x: () => gsap.utils.random(-chaosValue, chaosValue),
                y: () => gsap.utils.random(-chaosValue, chaosValue),
              });
            }) as unknown as number;
          }
        } else {
          if (chaosTicker != null) {
            gsap.ticker.remove(chaosTicker as unknown as gsap.TickerCallback);
            chaosTicker = null;
            gsap.to(titleChars.chars, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          }
        }
      };

      const resetAll = () => {
        if (!distortionSlider || !stretchSlider || !chaosSlider) return;
        distortionSlider.value = "0";
        stretchSlider.value = "1";
        chaosSlider.value = "0";
        updateTitle();
      };

      distortionSlider?.addEventListener("input", updateTitle);
      stretchSlider?.addEventListener("input", updateTitle);
      chaosSlider?.addEventListener("input", updateTitle);
      resetButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        resetAll();
      });

      [distortionSlider, stretchSlider, chaosSlider].forEach((slider) => {
        slider?.addEventListener("click", function (this: HTMLInputElement, e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;
          const min = parseFloat(this.min);
          const max = parseFloat(this.max);
          this.value = String(min + (max - min) * (x / width));
          updateTitle();
        });
      });
    }

    // Editor mode toggle
    const editorToggle = document.getElementById("editor-mode-toggle");
    if (editorToggle && editorPanel) {
      editorToggle.addEventListener("click", () => {
        const isActive = document.body.classList.toggle("editor-mode-active");
        editorToggle.textContent = isActive ? "Sluiten" : "Editor Mode";
        if (isActive) {
          editorPanel.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "translate-y-12",
          );
        } else {
          editorPanel.classList.add(
            "opacity-0",
            "pointer-events-none",
            "translate-y-12",
          );
        }
      });
    }

    // Magnetische scroll-knop
    const magneticLink = document.getElementById("magnetic-link");
    if (magneticLink) {
      magneticLink.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const rect = magneticLink.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) * 0.5;
        const y = (clientY - (rect.top + rect.height / 2)) * 0.5;
        gsap.to(magneticLink, { x, y, duration: 0.3, ease: "power2.out" });
      });
      magneticLink.addEventListener("mouseleave", () => {
        gsap.to(magneticLink, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      });
    }

    // Subtiele lichtinval
    const lightEffect = document.getElementById("light-effect");
    if (lightEffect) {
      window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        gsap.to(lightEffect, {
          background: `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(180, 83, 9, 0.05), transparent 40vw)`,
          duration: 1,
        });
      });
    }

    const heroScrollTrigger = {
      trigger: "header",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    } as gsap.plugins.ScrollTrigger.Vars;

    gsap.to('[data-hero-element="header"]', {
      y: -50,
      scrollTrigger: heroScrollTrigger,
    });
    gsap.to('[data-hero-element="title-wrapper"]', {
      y: -150,
      scrollTrigger: heroScrollTrigger,
    });
    gsap.to('[data-hero-element="footer"]', {
      y: -100,
      scrollTrigger: heroScrollTrigger,
    });

    gsap.to("#scroll-path-svg", {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    // Achtergrondlijnen
    const linesContainer = document.getElementById("background-lines");
    if (linesContainer) {
      for (let i = 0; i < 5; i++) {
        const line = document.createElement("div");
        line.className = "absolute bg-white/10";
        line.style.width = "1px";
        line.style.height = `${Math.random() * 40 + 20}vh`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        linesContainer.appendChild(line);

        gsap.to(line, {
          x: () => (Math.random() - 0.5) * window.innerWidth * 0.1,
          y: () => (Math.random() - 0.5) * window.innerHeight * 0.1,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1 + Math.random() * 2,
          },
        });
      }
    }

    // Custom cursor
    const cursor = document.getElementById("custom-cursor");
    const follower = document.getElementById("cursor-follower");
    const hoverElements = document.querySelectorAll("[data-cursor-hover]");

    window.addEventListener("mousemove", (e) => {
      if (!cursor || !follower) return;
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.5 });
    });

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (!follower) return;
        gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        if (!follower) return;
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });

    // Horizontale scroll projecten
    const projectsContainer = document.querySelector(
      ".projects-container",
    ) as HTMLElement | null;

    if (projectsContainer) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        gsap.to(projectsContainer, {
          xPercent: -100,
          x: () => window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-scroll-section",
            start: "center center",
            end: () =>
              "+=" + (projectsContainer.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach((card) => {
          const img = card.querySelector("img");
          if (!img) return;
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const relX = x / rect.width - 0.5;
            const relY = y / rect.height - 0.5;

            gsap.to(img, {
              duration: 0.8,
              x: -relX * 30,
              y: -relY * 20,
              rotation: -relX * 5,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(img, {
              duration: 1,
              x: 0,
              y: 0,
              rotation: 0,
              ease: "elastic.out(1, 0.3)",
            });
          });
        });
      });
    }

    // Staggered text reveal services
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach((item) => {
      const p = item.querySelector("p");
      if (!p) return;
      const text = new SplitType(p, { types: "words" });
      gsap.from(text.words, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      });
    });

    // Marquee
    const marqueeInner = document.querySelector(
      ".marquee-inner",
    ) as HTMLElement | null;
    if (marqueeInner) {
      marqueeInner.innerHTML += marqueeInner.innerHTML;
      const marqueeTween = gsap.to(marqueeInner, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      const marqueeSection = document.querySelector(".marquee-section");
      marqueeSection?.addEventListener("mouseenter", () => {
        gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.5 });
      });
      marqueeSection?.addEventListener("mouseleave", () => {
        gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 });
      });
    }

    // Email kopieerfunctie
    const emailButton = document.getElementById(
      "email-button",
    ) as HTMLButtonElement | null;
    const feedbackElement = document.getElementById("copy-feedback");

    if (emailButton && feedbackElement) {
      emailButton.addEventListener("click", () => {
        const email = emailButton.dataset.email;
        if (!email) return;
        navigator.clipboard
          .writeText(email)
          .then(() => {
            feedbackElement.classList.add("opacity-100");
            setTimeout(() => {
              feedbackElement.classList.remove("opacity-100");
            }, 2000);
          })
          .catch((err) => {
            console.error("Kon e-mail niet kopiëren: ", err);
          });
      });
    }
  }, []);

  return (
    <>
      <header className="relative flex min-h-[600px] h-screen flex-col justify-between overflow-hidden p-8 md:p-12">
        <div id="light-effect" className="absolute inset-0 -z-10" />

        <div className="flex w-full items-start justify-between" data-hero-element="header">
          <div className="text-lg font-semibold">
            <p>
              <span id="greeting" /> , ik ben ctrl+r
            </p>
          </div>
          <button
            id="editor-mode-toggle"
            className="z-20 text-sm font-semibold uppercase tracking-widest text-(--color-text) transition-colors hover:text-(--color-accent)"
            data-cursor-hover
          >
            Editor Mode
          </button>
        </div>

        <div
          className="relative mx-auto w-full max-w-5xl py-12 text-center"
          data-hero-element="title-wrapper"
        >
          <h1
            id="interactive-title"
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight!"
          >
            Digitale vernieuwing
            <br />
            voor de culturele <span className="whitespace-nowrap">sector.</span>
          </h1>
        </div>

        <div
          className="flex w-full items-center justify-between"
          data-hero-element="footer"
        >
          <p className="max-w-xs text-sm">
            Webdesign en digitale strategie voor de creatieve sector.
          </p>
          <a
            href="#projecten"
            id="magnetic-link"
            className="relative h-32 w-32"
            data-cursor-hover
          >
            <svg
              id="scroll-path-svg"
              className="absolute inset-0 h-full w-full text-(--color-text)"
              viewBox="0 0 100 100"
            >
              <path
                id="scroll-path"
                fill="none"
                d="M 10,50 A 40,40 0 1 1 90,50 A 40,40 0 1 1 10,50"
              />
              <text className="text-xs font-medium tracking-[0.2em] uppercase">
                <textPath href="#scroll-path" startOffset="0">
                  Scroll om te ontdekken • Scroll om te ontdekken •
                </textPath>
              </text>
            </svg>
          </a>
        </div>
      </header>

      <main>
        <section id="over" className="content-section">
          <h2>Focus op creatie.</h2>
          <p>
            Als kunstenaar wil je je tijd besteden aan creëren. Ik neem de
            technische en strategische kant van je online aanwezigheid uit
            handen, zodat jij je kunt richten op wat essentieel is: je werk.
          </p>
          <p>
            Ik geloof in de waarde van duurzame samenwerkingen. Daarom werk ik
            flexibel en niet met vaste tarieven. Voor projecten sta ik open
            voor een kunstruil als vergoeding, altijd in goed overleg.
          </p>
        </section>

        <section
          id="projecten"
          className="horizontal-scroll-section bg-white text-black"
        >
          <div className="pin-element">
            <div className="projects-container pl-8 md:pl-16">
              <div className="project-card featured" data-cursor-hover>
                <a
                  href="https://florescencism.lida.gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full overflow-hidden"
                >
                  <img
                    src="https://i.imgur.com/uQJqY9c.png"
                    alt="Screenshot van Florescencism project"
                    className="h-full w-full object-cover"
                  />
                </a>
                <div className="card-content mt-4">
                  <h3>Florescencism</h3>
                  <p>Interactieve 3D-galerij</p>
                </div>
              </div>

              <div className="project-card" data-cursor-hover>
                <a
                  href="https://www.yohotreasurefest.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full overflow-hidden"
                >
                  <img
                    src="https://i.imgur.com/i9a5n9s.png"
                    alt="Screenshot van Yo! Treasure Fest project"
                    className="h-full w-full object-cover"
                  />
                </a>
                <div className="card-content mt-4">
                  <h3>Yo! Treasure Fest</h3>
                  <p>Festival website</p>
                </div>
              </div>

              <div className="project-card" data-cursor-hover>
                <a
                  href="https://ninalynn.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full overflow-hidden"
                >
                  <img
                    src="https://i.imgur.com/y8v8F1t.png"
                    alt="Screenshot van Nina Lynn project"
                    className="h-full w-full object-cover"
                  />
                </a>
                <div className="card-content mt-4">
                  <h3>Nina Lynn</h3>
                  <p>Artiestenportfolio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="diensten" className="content-section">
          <h2>Mijn Expertise</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>01 / Webdesign</h3>
              <p>
                Ik ontwerp en realiseer websites die functioneren als een
                verlengstuk van je atelier – van een minimalistisch portfolio
                tot een volledige interactieve expositie.
              </p>
            </div>
            <div className="service-item">
              <h3>02 / Gebruikerservaring</h3>
              <p>
                Een doordachte gebruikerservaring zorgt ervoor dat bezoekers je
                werk op een intuïtieve manier ontdekken. De focus ligt volledig
                op de beleving van de kunst.
              </p>
            </div>
            <div className="service-item">
              <h3>03 / Strategie &amp; Beheer</h3>
              <p>
                Als je digitale partner denk ik strategisch met je mee. Ik neem
                het technisch beheer uit handen, zodat je website altijd veilig
                en actueel blijft.
              </p>
            </div>
          </div>
        </section>

        <section className="marquee-section bg-(--color-background) py-12">
          <div className="marquee-inner flex whitespace-nowrap">
            <span className="px-8 font-serif text-4xl md:text-5xl">
              Webdesign
            </span>
            <span className="px-8 font-serif text-4xl text-(--color-accent) md:text-5xl">
              &bull;
            </span>
            <span className="px-8 font-serif text-4xl md:text-5xl">
              User Experience
            </span>
            <span className="px-8 font-serif text-4xl text-(--color-accent) md:text-5xl">
              &bull;
            </span>
            <span className="px-8 font-serif text-4xl md:text-5xl">
              Cultuur &amp; Kunst
            </span>
          </div>
        </section>

        <footer
          id="contact"
          className="contact-section bg-black text-(--color-heading)"
        >
          <h2>Laten we een gesprek starten.</h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl">
            Geïnteresseerd in een samenwerking? Ik hoor graag meer over jou en
            je werk. Stuur me een bericht om de mogelijkheden te bespreken.
          </p>
          <button
            id="email-button"
            data-cursor-hover
            className="cta-button large"
            data-email="t.degraaf13@gmail.com"
          >
            t.degraaf13@gmail.com
          </button>
          <div
            id="copy-feedback"
            className="mt-4 text-(--color-accent) opacity-0 transition-opacity"
          >
            E-mailadres gekopieerd!
          </div>
        </footer>
      </main>
    </>
  );
}
