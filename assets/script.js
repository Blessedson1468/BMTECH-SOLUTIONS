

 // =========================
    // 1. Navbar Scroll Effect
    // =========================
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // =========================
    // 2. WhatsApp Direct Integration
    // =========================
    const contactForm = document.getElementById("whatsappForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            // Capture data
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

            const whatsappUrl = `https://wa.me/${myNumber}?text=${text}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // =========================
    // 3. Fade-in Animation (Intersection Observer)
    // =========================
    const animElements = document.querySelectorAll(".section, .card, .stat-card, .pricing-card");
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before element hits viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        observer.observe(el);
    });

    // =========================
    // 4. Active Link Highlight
    // =========================
    const links = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        // Checks if the link href is included in the current URL path
        if (currentPath.includes(link.getAttribute("href")) && link.getAttribute("href") !== "index.html") {
            link.classList.add("active-link");
        } else if (currentPath.endsWith("/") || currentPath.includes("index.html")) {
            if(link.getAttribute("href") === "index.html") link.classList.add("active-link");
        }
    });
// BMTECH SOLUTIONS - Optimized Interactive Script
document.addEventListener("DOMContentLoaded", function () {

    console.log("BMTECH SOLUTIONS JS fully activated 🚀");

    // =========================
    // 1. Navbar Scroll Effect
    // =========================
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // =========================
    // 2. WhatsApp Direct Integration
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

            const text =
                `*New Inquiry: BMTECH SOLUTIONS*%0A` +
                `------------------------------%0A` +
                `*Client Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Interested In:* ${service}%0A%0A` +
                `*Project Details:*%0A${message}`;

            const whatsappUrl = `https://wa.me/${myNumber}?text=${text}`;
            window.open(whatsappUrl, "_blank");
        });
    }

    // =========================
    // function toggleChat(){
    // =========================

});
function toggleChat(){
    const chat = document.getElementById("chatOptions");

    if(chat.style.display === "flex"){
        chat.style.display = "none";
    } else {
        chat.style.display = "flex";
    }
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));