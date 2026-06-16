// ================================================
// BMTECH SOLUTIONS — Main Script
// ================================================

// =========================
// GLOBAL: Chat Widget Toggle
// (must be global so onclick="toggleChat()" in HTML works)
// =========================
document.addEventListener("DOMContentLoaded", function () {
    // 1. DYNAMICALLY INJECT CHAT WIDGET
    const chatWidgetHTML = `
        <div class="chat-options" id="chatOptions">
            <a href="https://wa.me/+254769593342" target="_blank" class="chat-btn whatsapp">WhatsApp</a>
            <a href="mailto:brayanchimba275@gmail.com" class="chat-btn email">Email</a>
            <a href="tel:+254769593342" class="chat-btn call">Call</a>
        </div>
        <button class="chat-toggle">💬</button>
    `;

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "chat-widget";
    widgetContainer.innerHTML = chatWidgetHTML;
    document.body.appendChild(widgetContainer);

    // 2. CHAT TOGGLE LOGIC (Cleaned up from inline onclick)
    const toggleBtn = widgetContainer.querySelector(".chat-toggle");
    const optionsMenu = widgetContainer.querySelector("#chatOptions");

    if (toggleBtn && optionsMenu) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevents instant closing
            const isOpen = optionsMenu.classList.toggle("active");
            toggleBtn.textContent = isOpen ? "✕" : "💬";
        });
    }

    // 3. CLOSE ON OUTSIDE CLICK
    document.addEventListener("click", function (e) {
        if (!widgetContainer.contains(e.target) && optionsMenu.classList.contains("active")) {
            optionsMenu.classList.remove("active");
            toggleBtn.textContent = "💬";
        }
    });

    // ... your existing music player, video player, and navbar code below ...
});

<<<<<<< HEAD

// ================================================================
// FIXED BACKGROUND IMAGE + TECH PARTICLE OVERLAY
// ================================================================
// Runs on every page (style.css references these classes/ids).
// Injects:
//   1. .bg-fixed    — the background image, position:fixed,
//                      background-repeat: repeat (seamless tile).
//                      Stays completely still — does NOT move,
//                      scale, or drift as the user scrolls.
//                      Content scrolls OVER it.
//   2. .bg-overlay  — dark gradient for text readability
//   3. .bg-glitter  — small twinkling CSS dots
//   4. #bgParticles — canvas with drifting "data network" dots
//
// Only the particles/glitter move — the photo itself is static
// and identical on every page.
// ================================================================
document.addEventListener("DOMContentLoaded", function () {

    // ---- 1. Inject the fixed background image (once per page) ----
    const bgFixed = document.createElement("div");
    bgFixed.className = "bg-fixed";

    const bgOverlay = document.createElement("div");
    bgOverlay.className = "bg-overlay";

    // CSS-only glitter layer — small twinkling dots scattered
    // across the viewport, each with a random position and a
    // randomized animation delay/duration so they sparkle
    // independently rather than all in sync.
    const bgGlitter = document.createElement("div");
    bgGlitter.className = "bg-glitter";
    const GLITTER_COUNT = window.innerWidth < 768 ? 18 : 35;
    for (let i = 0; i < GLITTER_COUNT; i++) {
        const dot = document.createElement("span");
        dot.style.left   = `${Math.random() * 100}%`;
        dot.style.top    = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${2.5 + Math.random() * 4}s`;
        dot.style.animationDelay    = `${Math.random() * 5}s`;
        bgGlitter.appendChild(dot);
    }

    // Insert as the very first elements in <body> so they sit behind everything
    document.body.prepend(bgGlitter);
    document.body.prepend(bgOverlay);
    document.body.prepend(bgFixed);

    // ---- 2. Inject particle canvas ----
    const canvas = document.createElement("canvas");
    canvas.id = "bgParticles";
    document.body.prepend(canvas);

    // ---- 4. Tech particle network + glitter sparkle animation ----
    const ctx = canvas.getContext("2d");
    let particles = [];
    let W, H;

    function resizeCanvas() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function makeParticle() {
        // ~20% of particles are "glitter" — bigger, brighter,
        // and pulse their opacity in a sine wave for a twinkle.
        const isGlitter = Math.random() < 0.2;
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: isGlitter ? 1.8 + Math.random() * 2.2 : 1 + Math.random() * 1.6,
            alpha: isGlitter ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.35,
            glitter: isGlitter,
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.04
        };
    }

    function initParticles() {
        const count = window.innerWidth < 768 ? 30 : 60;
        particles = Array.from({ length: count }, makeParticle);
    }

    function drawParticles(time) {
        ctx.clearRect(0, 0, W, H);

        // Connection lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.strokeStyle = `rgba(224,64,251,${0.08 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Dots — glitter particles twinkle via a sine-wave alpha
        // and get a soft glow (shadowBlur) for a sparkle look.
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;

            let alpha = p.alpha;

            if (p.glitter) {
                p.phase += p.speed;
                const twinkle = (Math.sin(p.phase) + 1) / 2; // 0 → 1
                alpha = 0.15 + twinkle * 0.85;

                ctx.shadowColor = `rgba(244,143,177,${alpha})`;
                ctx.shadowBlur  = 8;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.glitter
                ? `rgba(255,255,255,${alpha})`
                : `rgba(224,64,251,${alpha})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(drawParticles);
    }


    resizeCanvas();
    initParticles();
    requestAnimationFrame(drawParticles);

    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticles();
    });
});


=======
>>>>>>> 64ebacb06241a1deada608e6a2dc0dc0b0ea7f1e
document.addEventListener("DOMContentLoaded", function () {

    console.log("BMTECH SOLUTIONS activated 🚀");

    // =========================
    // 1. Navbar Scroll Effect
    // =========================
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // =========================
    // 2. Active Link Highlight
    // =========================
    const links = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname;
<<<<<<< HEAD

    // 2a. Multi-page highlight (for about.html, services.html, etc.)
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) return; // handled by 2b below
=======
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
>>>>>>> 64ebacb06241a1deada608e6a2dc0dc0b0ea7f1e
        if (currentPath.includes(href) && href !== "index.html") {
            link.classList.add("active-link");
        } else if ((currentPath.endsWith("/") || currentPath.includes("index.html")) && href === "index.html") {
            link.classList.add("active-link");
        }
    });

<<<<<<< HEAD
    // 2b. Single-page anchor highlight (for index.html sections)
    // As the user scrolls through #home, #about, #services, etc.,
    // highlight the matching nav link automatically.
    const anchorLinks = Array.from(links).filter(a => {
        const href = a.getAttribute("href") || "";
        return href.startsWith("#");
    });

    if (anchorLinks.length) {
        const sections = anchorLinks
            .map(a => document.querySelector(a.getAttribute("href")))
            .filter(Boolean);

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = "#" + entry.target.id;
                    anchorLinks.forEach(a => {
                        a.classList.toggle("active-link", a.getAttribute("href") === id);
                    });
                }
            });
        }, { threshold: 0.35, rootMargin: "-90px 0px -40% 0px" });

        sections.forEach(sec => sectionObserver.observe(sec));
    }

=======
>>>>>>> 64ebacb06241a1deada608e6a2dc0dc0b0ea7f1e
    // =========================
    // 3. Fade-in Animation
    // =========================
    const animElements = document.querySelectorAll(".section, .card, .stat-card, .pricing-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    animElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        observer.observe(el);
    });

    // =========================
    // 4. WhatsApp Form
    // =========================
    const contactForm = document.getElementById("whatsappForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = encodeURIComponent(this.querySelector('[name="name"]').value);
            const email = encodeURIComponent(this.querySelector('[name="email"]').value);
            const service = encodeURIComponent(this.querySelector('[name="service"]').value);
            const message = encodeURIComponent(this.querySelector('[name="message"]').value);
            const myNumber = "254769593342";
            const text = `*New Inquiry: BMTECH SOLUTIONS*%0A` +
                         `------------------------------%0A` +
                         `*Client Name:* ${name}%0A` +
                         `*Email:* ${email}%0A` +
                         `*Interested In:* ${service}%0A%0A` +
                         `*Project Details:*%0A${message}`;
            window.open(`https://wa.me/${myNumber}?text=${text}`, "_blank");
        });
    }

    // =========================
    // 5. Mobile Menu Toggle
    // =========================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
        document.querySelectorAll(".nav-links a").forEach(n => {
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // =========================
    // 6. PERSISTENT MUSIC PLAYER
    // =========================
    const beat = document.getElementById("myBeat");
    const toggleBtn = document.getElementById("musicToggle");

    if (!beat || !toggleBtn) return; 

    const getState = () => ({
        playing: localStorage.getItem("bmtech_music_playing") === "true",
        time: parseFloat(localStorage.getItem("bmtech_music_time") || "0")
    });

    const setState = (playing, time) => {
        localStorage.setItem("bmtech_music_playing", playing);
        localStorage.setItem("bmtech_music_time", time);
    };

    const updateBtn = (playing) => {
        const bars = toggleBtn.querySelectorAll(".eq-bar");
        if (playing) {
            toggleBtn.classList.add("playing");
            bars.forEach(b => b.classList.add("active"));
        } else {
            toggleBtn.classList.remove("playing");
            bars.forEach(b => b.classList.remove("active"));
        }
    };

    const { playing: wasPlaying, time: savedTime } = getState();
    if (savedTime > 0) beat.currentTime = savedTime;

    if (wasPlaying) {
        beat.play()
            .then(() => updateBtn(true))
            .catch(() => {
                const resumeOnInteract = () => {
                    beat.play().then(() => updateBtn(true)).catch(() => {});
                };
                document.addEventListener("click", resumeOnInteract, { once: true });
                document.addEventListener("keydown", resumeOnInteract, { once: true });
            });
    }

    toggleBtn.addEventListener("click", () => {
        if (beat.paused) {
            beat.play().then(() => {
                setState(true, beat.currentTime);
                updateBtn(true);
            }).catch(() => {});
        } else {
            beat.pause();
            setState(false, beat.currentTime);
            updateBtn(false);
        }
    });

    setInterval(() => {
        if (!beat.paused) {
            localStorage.setItem("bmtech_music_time", beat.currentTime);
        }
    }, 1000);

    window.addEventListener("beforeunload", () => {
        setState(!beat.paused, beat.currentTime);
    });

    // Tab visibility: pause when hidden, resume when back
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (!beat.paused) {
                beat.pause();
                localStorage.setItem("bmtech_music_time", beat.currentTime);
            }
        } else {
            if (getState().playing) {
                beat.play().then(() => updateBtn(true)).catch(() => {});
            }
        }
    });
});

//================================================
// BMTECH SOLUTIONS — Video Player Script
//================================================
document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("smartVideo");
    const playButton = document.getElementById("playButton");
    const wrapper = document.getElementById("videoWrapper");

    if (!video || !playButton || !wrapper) {
        console.warn("Video elements not found — skipping video player setup");
        return;
    }

    wrapper.addEventListener("click", function () {
        if (video.paused || video.ended) {
            video.play()
                .then(() => {
                    playButton.classList.add("hidden");
                })
                .catch((err) => {
                    console.warn("Video play failed:", err);
                });
        } else {
            video.pause();
            playButton.classList.remove("hidden");
        }
    });

    video.addEventListener("ended", function () {
        playButton.classList.remove("hidden");
    });

});