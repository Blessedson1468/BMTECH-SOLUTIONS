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
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        if (currentPath.includes(href) && href !== "index.html") {
            link.classList.add("active-link");
        } else if ((currentPath.endsWith("/") || currentPath.includes("index.html")) && href === "index.html") {
            link.classList.add("active-link");
        }
    });

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