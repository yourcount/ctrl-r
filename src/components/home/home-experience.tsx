"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import type {
  ContactInfo,
  CtaConfig,
  HomePageContent,
  ProjectCase,
} from "@/lib/content/types";

gsap.registerPlugin(ScrollTrigger);

type HomeExperienceProps = {
  home: HomePageContent;
  projects: ProjectCase[];
  contact: ContactInfo;
};

function CtaButton({ cta }: { cta: CtaConfig }) {
  const className = `cta-button ${cta.variant === "primary" ? "primary" : "secondary"}`;
  const isInternalRoute = cta.href.startsWith("/");

  if (isInternalRoute) {
    return (
      <Link
        href={cta.href}
        data-cursor-hover
        data-tracking-id={cta.trackingId}
        className={className}
      >
        {cta.label}
      </Link>
    );
  }

  return (
    <a
      href={cta.href}
      data-cursor-hover
      data-tracking-id={cta.trackingId}
      className={className}
    >
      {cta.label}
    </a>
  );
}

export function HomeExperience({ home, projects, contact }: HomeExperienceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const marqueeItems = useMemo(
    () => ["Webdesign", "User Experience", "Cultuur & Kunst"],
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    document.body.classList.add("home-enhanced");

    const cleanupFns: Array<() => void> = [];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = media.matches;

    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
      const hour = new Date().getHours();
      if (hour < 12) greetingEl.textContent = "Goedemorgen";
      else if (hour < 18) greetingEl.textContent = "Goedemiddag";
      else greetingEl.textContent = "Goedenavond";
    }

    const editorPanel = document.getElementById("title-editor-panel");
    const editorToggle = document.getElementById("editor-mode-toggle");

    if (editorToggle && editorPanel) {
      const onToggle = () => {
        const isActive = document.body.classList.toggle("editor-mode-active");
        editorToggle.textContent = isActive ? "Sluiten" : "Editor Mode";
        editorPanel.classList.toggle("is-open", isActive);
      };
      editorToggle.addEventListener("click", onToggle);
      cleanupFns.push(() => editorToggle.removeEventListener("click", onToggle));
    }

    const emailButton = document.getElementById("email-button");
    const feedbackElement = document.getElementById("copy-feedback");
    if (emailButton && feedbackElement) {
      const onClick = async () => {
        const email = emailButton.getAttribute("data-email");
        if (!email) return;

        try {
          await navigator.clipboard.writeText(email);
          feedbackElement.classList.add("visible");
          window.setTimeout(() => feedbackElement.classList.remove("visible"), 1800);
        } catch {
          feedbackElement.textContent = "Kopieren niet gelukt.";
          feedbackElement.classList.add("visible");
          window.setTimeout(() => {
            feedbackElement.textContent = "E-mailadres gekopieerd!";
            feedbackElement.classList.remove("visible");
          }, 1800);
        }
      };

      emailButton.addEventListener("click", onClick);
      cleanupFns.push(() => emailButton.removeEventListener("click", onClick));
    }

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        const lenis = new Lenis();
        const tick = (time: number) => {
          lenis.raf(time * 1000);
        };

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        cleanupFns.push(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        });

        gsap.from("[data-hero-element]", {
          opacity: 0,
          y: 24,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        });

        const interactiveTitle = document.getElementById("interactive-title");
        if (interactiveTitle) {
          const titleChars = new SplitType(interactiveTitle, { types: "chars" });
          const distortionSlider = document.getElementById(
            "distortion-slider",
          ) as HTMLInputElement | null;
          const stretchSlider = document.getElementById("stretch-slider") as HTMLInputElement | null;
          const chaosSlider = document.getElementById("chaos-slider") as HTMLInputElement | null;
          const resetButton = document.getElementById("reset-title-style");
          const displacementMap = document.querySelector(
            "#liquid-filter feDisplacementMap",
          ) as SVGFEDisplacementMapElement | null;

          let chaosTick: gsap.TickerCallback | null = null;

          const updateTitle = () => {
            if (!distortionSlider || !stretchSlider || !chaosSlider || !displacementMap) {
              return;
            }

            const distortionValue = Number(distortionSlider.value);
            displacementMap.setAttribute("scale", String(distortionValue));
            (interactiveTitle as HTMLElement).style.filter =
              distortionValue > 0 ? "url(#liquid-filter)" : "none";

            gsap.set(interactiveTitle, { scaleX: Number(stretchSlider.value) });

            const chaosValue = Number(chaosSlider.value);
            if (chaosValue > 0 && !chaosTick) {
              chaosTick = () => {
                gsap.set(titleChars.chars, {
                  x: () => gsap.utils.random(-chaosValue, chaosValue),
                  y: () => gsap.utils.random(-chaosValue, chaosValue),
                });
              };
              gsap.ticker.add(chaosTick);
            }

            if (chaosValue <= 0 && chaosTick) {
              gsap.ticker.remove(chaosTick);
              chaosTick = null;
              gsap.to(titleChars.chars, {
                x: 0,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              });
            }
          };

          const onSliderClick = (event: Event) => {
            const slider = event.currentTarget as HTMLInputElement | null;
            const mouseEvent = event as MouseEvent;
            if (!slider) return;

            const rect = slider.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const min = Number(slider.min);
            const max = Number(slider.max);
            slider.value = String(min + (max - min) * (x / rect.width));
            updateTitle();
          };

          distortionSlider?.addEventListener("input", updateTitle);
          stretchSlider?.addEventListener("input", updateTitle);
          chaosSlider?.addEventListener("input", updateTitle);
          distortionSlider?.addEventListener("click", onSliderClick);
          stretchSlider?.addEventListener("click", onSliderClick);
          chaosSlider?.addEventListener("click", onSliderClick);
          resetButton?.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!distortionSlider || !stretchSlider || !chaosSlider) {
              return;
            }
            distortionSlider.value = "0";
            stretchSlider.value = "1";
            chaosSlider.value = "0";
            updateTitle();
          });

          cleanupFns.push(() => {
            distortionSlider?.removeEventListener("input", updateTitle);
            stretchSlider?.removeEventListener("input", updateTitle);
            chaosSlider?.removeEventListener("input", updateTitle);
            distortionSlider?.removeEventListener("click", onSliderClick);
            stretchSlider?.removeEventListener("click", onSliderClick);
            chaosSlider?.removeEventListener("click", onSliderClick);
            if (chaosTick) {
              gsap.ticker.remove(chaosTick);
            }
            titleChars.revert();
          });
        }

        const magneticLink = document.getElementById("magnetic-link");
        if (magneticLink) {
          const onMove = (event: MouseEvent) => {
            const rect = magneticLink.getBoundingClientRect();
            const x = (event.clientX - (rect.left + rect.width / 2)) * 0.5;
            const y = (event.clientY - (rect.top + rect.height / 2)) * 0.5;
            gsap.to(magneticLink, { x, y, duration: 0.3, ease: "power2.out" });
          };
          const onLeave = () => {
            gsap.to(magneticLink, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          };

          magneticLink.addEventListener("mousemove", onMove);
          magneticLink.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            magneticLink.removeEventListener("mousemove", onMove);
            magneticLink.removeEventListener("mouseleave", onLeave);
          });
        }

        const lightEffect = document.getElementById("light-effect");
        if (lightEffect) {
          const onMouseMove = (event: MouseEvent) => {
            gsap.to(lightEffect, {
              background: `radial-gradient(circle at ${event.clientX}px ${event.clientY}px, rgba(180, 83, 9, 0.08), transparent 40vw)`,
              duration: 0.8,
            });
          };

          window.addEventListener("mousemove", onMouseMove);
          cleanupFns.push(() => window.removeEventListener("mousemove", onMouseMove));
        }

        const linesContainer = document.getElementById("background-lines");
        if (linesContainer) {
          for (let i = 0; i < 5; i += 1) {
            const line = document.createElement("div");
            line.className = "floating-line";
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

        const cursor = document.getElementById("custom-cursor");
        const follower = document.getElementById("cursor-follower");
        const hoverElements = document.querySelectorAll("[data-cursor-hover]");

        const onPointerMove = (event: MouseEvent) => {
          if (!cursor || !follower) return;
          gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.1 });
          gsap.to(follower, { x: event.clientX, y: event.clientY, duration: 0.5 });
        };

        window.addEventListener("mousemove", onPointerMove);
        cleanupFns.push(() => window.removeEventListener("mousemove", onPointerMove));

        hoverElements.forEach((el) => {
          const onEnter = () => {
            if (!follower) return;
            gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
          };
          const onLeave = () => {
            if (!follower) return;
            gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
          };

          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });

        gsap.to("#scroll-path-svg", {
          rotation: 360,
          duration: 10,
          ease: "none",
          repeat: -1,
        });

        const projectsContainer = document.querySelector(".projects-container") as HTMLElement | null;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          if (!projectsContainer) {
            return;
          }

          gsap.to(projectsContainer, {
            xPercent: -100,
            x: () => window.innerWidth,
            ease: "none",
            scrollTrigger: {
              trigger: ".horizontal-scroll-section",
              start: "center center",
              end: () => `+=${projectsContainer.scrollWidth - window.innerWidth}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          const cards = document.querySelectorAll(".project-card");
          cards.forEach((card) => {
            const img = card.querySelector("img");
            const onMove = (event: Event) => {
              const mouseEvent = event as MouseEvent;
              if (!img) return;
              const rect = card.getBoundingClientRect();
              const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
              const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

              gsap.to(img, {
                duration: 0.8,
                x: -x * 30,
                y: -y * 20,
                rotation: -x * 5,
                ease: "power2.out",
              });
            };

            const onLeave = () => {
              if (!img) return;
              gsap.to(img, {
                duration: 1,
                x: 0,
                y: 0,
                rotation: 0,
                ease: "elastic.out(1, 0.3)",
              });
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            cleanupFns.push(() => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            });
          });
        });

        cleanupFns.push(() => mm.revert());

        const serviceItems = document.querySelectorAll(".service-item");
        serviceItems.forEach((item) => {
          const paragraph = item.querySelector("p");
          if (!paragraph) return;
          const text = new SplitType(paragraph, { types: "words" });

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

          cleanupFns.push(() => text.revert());
        });

        const marqueeInner = document.querySelector(".marquee-inner") as HTMLElement | null;
        const marqueeSection = document.querySelector(".marquee-section") as HTMLElement | null;

        if (marqueeInner && marqueeSection) {
          marqueeInner.innerHTML += marqueeInner.innerHTML;

          const marqueeTween = gsap.to(marqueeInner, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1,
          });

          const onEnter = () => gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.5 });
          const onLeave = () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 });

          marqueeSection.addEventListener("mouseenter", onEnter);
          marqueeSection.addEventListener("mouseleave", onLeave);

          cleanupFns.push(() => {
            marqueeSection.removeEventListener("mouseenter", onEnter);
            marqueeSection.removeEventListener("mouseleave", onLeave);
          });
        }
      }
    }, root);

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.body.classList.remove("home-enhanced", "editor-mode-active");
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div id="background-lines" className="home-layer" aria-hidden />
      <div id="custom-cursor" className="home-cursor" aria-hidden />
      <div id="cursor-follower" className="home-cursor-follower" aria-hidden />

      <div id="title-editor-panel" className="title-editor-panel" aria-hidden>
        <div className="space-y-1">
          <label htmlFor="distortion-slider" className="font-semibold">
            Vloeibaarheid
          </label>
          <input type="range" id="distortion-slider" min={0} max={40} defaultValue={0} className="range-slider" />
        </div>
        <div className="space-y-1">
          <label htmlFor="stretch-slider" className="font-semibold">
            Zwaartekracht
          </label>
          <input
            type="range"
            id="stretch-slider"
            min={0.5}
            max={2}
            defaultValue={1}
            step={0.01}
            className="range-slider"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="chaos-slider" className="font-semibold">
            Chaos
          </label>
          <input type="range" id="chaos-slider" min={0} max={10} defaultValue={0} className="range-slider" />
        </div>
        <button id="reset-title-style" className="editor-reset-button">
          Reset
        </button>
      </div>

      <header className="legacy-hero">
        <div id="light-effect" className="light-effect" aria-hidden />

        <div className="legacy-hero-top" data-hero-element="header">
          <p>
            <span id="greeting" />, ik ben ctrl+r
          </p>
          <button id="editor-mode-toggle" className="editor-toggle" data-cursor-hover>
            Editor Mode
          </button>
        </div>

        <div className="legacy-hero-center" data-hero-element="title-wrapper">
          <h1 id="interactive-title">
            {home.title}
          </h1>
          <p className="legacy-hero-intro">{home.intro}</p>
          <div className="legacy-cta-row">
            <CtaButton cta={home.primaryCta} />
            <CtaButton cta={home.secondaryCta} />
          </div>
        </div>

        <div className="legacy-hero-bottom" data-hero-element="footer">
          <p>Webdesign en digitale strategie voor de creatieve sector.</p>
          <a href="#projecten" id="magnetic-link" className="magnetic-link" data-cursor-hover>
            <svg id="scroll-path-svg" viewBox="0 0 100 100" aria-hidden>
              <path id="scroll-path" fill="none" d="M 10,50 A 40,40 0 1 1 90,50 A 40,40 0 1 1 10,50" />
              <text className="text-xs tracking-wider uppercase fill-current">
                <textPath href="#scroll-path" startOffset="0">
                  Scroll om te ontdekken • Scroll om te ontdekken •
                </textPath>
              </text>
            </svg>
          </a>
        </div>
      </header>

      <svg className="hidden-svg" aria-hidden>
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves={1} result="warp" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale={20} in="SourceGraphic" in2="warp" />
        </filter>
      </svg>

      <main>
        <section id="over" className="content-section legacy-copy">
          <h2>Focus op creatie.</h2>
          <p>
            Als kunstenaar wil je je tijd besteden aan creëren. Ik neem de technische en strategische kant
            van je online aanwezigheid uit handen, zodat jij je kunt richten op wat essentieel is: je werk.
          </p>
          <p>
            Ik geloof in de waarde van duurzame samenwerkingen. Daarom werk ik flexibel en niet met vaste
            tarieven. Voor projecten sta ik open voor een kunstruil als vergoeding, altijd in goed overleg.
          </p>
        </section>

        <section id="projecten" className="horizontal-scroll-section">
          <div className="pin-element">
            <div className="projects-container">
              {projects.slice(0, 3).map((project) => (
                <article key={project.slug} className="project-card" data-cursor-hover>
                  <a
                    href={project.liveUrl ?? `/work/${project.slug}`}
                    target={project.liveUrl ? "_blank" : undefined}
                    rel={project.liveUrl ? "noopener noreferrer" : undefined}
                    className="project-image-link"
                  >
                    <Image
                      src={project.imageUrl ?? "https://placehold.co/1200x900?text=Project"}
                      alt={`Screenshot van ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 80vw, 40vw"
                    />
                  </a>
                  <div className="project-meta">
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <Link href={`/work/${project.slug}`} className="project-case-link">
                      Lees de case
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="diensten" className="content-section services-layout">
          <h2>Mijn Expertise</h2>
          <div className="services-grid">
            {home.services.map((service, index) => (
              <article key={service.title} className="service-item">
                <h3>
                  {String(index + 1).padStart(2, "0")} / {service.title}
                </h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marquee-section" aria-label="Expertise marque">
          <div className="marquee-inner">
            {marqueeItems.map((item) => (
              <span key={item} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        </section>

        <footer id="contact" className="legacy-contact">
          <h2>Laten we een gesprek starten.</h2>
          <p>
            Geïnteresseerd in een samenwerking? Ik hoor graag meer over jou en je werk.
            Stuur me een bericht om de mogelijkheden te bespreken.
          </p>
          <button
            id="email-button"
            data-cursor-hover
            className="contact-email-button"
            data-email={contact.email}
          >
            {contact.email}
          </button>
          <div id="copy-feedback" className="copy-feedback">
            E-mailadres gekopieerd!
          </div>
        </footer>
      </main>
    </div>
  );
}
