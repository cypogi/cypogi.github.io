/* =========================================
   MELCHOR PORTFOLIO V5
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       TYPING EFFECT
    ============================== */

    const typingElement = document.getElementById("typing");

    const jobTitles = [
        "Administrative Support",
        "Document Controller",
        "CAD Documentation",
        "AI MQA Practice"
    ];

    let titleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function runTypingEffect() {
        if (!typingElement) return;

        const currentTitle = jobTitles[titleIndex];

        characterIndex += isDeleting ? -1 : 1;

        typingElement.textContent =
            currentTitle.substring(0, characterIndex);

        let typingSpeed = isDeleting ? 45 : 85;

        if (!isDeleting && characterIndex === currentTitle.length) {
            typingSpeed = 1400;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % jobTitles.length;
            typingSpeed = 350;
        }

        setTimeout(runTypingEffect, typingSpeed);
    }

    runTypingEffect();


    /* ==============================
       SCROLL REVEAL
    ============================== */

    const revealItems = document.querySelectorAll(
        ".card, .skill, .stats-grid > div"
    );

    revealItems.forEach(item => {
        item.classList.add("hidden");
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });


    /* ==============================
       NAVIGATION ACTIVE LINK
    ============================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveNavigation() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);


    /* ==============================
       ANIMATED STAT COUNTERS
    ============================== */

    const statNumbers =
        document.querySelectorAll(".stats-grid h2");

    const statValues = [
        { value: 7, suffix: "+" },
        { value: 100, suffix: "%" },
        { value: 95, suffix: "%" },
        { value: 24, suffix: "/7" }
    ];

    let statsStarted = false;

    function animateStatistics() {
        const statsSection = document.querySelector(".stats");

        if (!statsSection || statsStarted) return;

        const sectionPosition =
            statsSection.getBoundingClientRect().top;

        if (sectionPosition < window.innerHeight - 100) {
            statsStarted = true;

            statNumbers.forEach((element, index) => {
                const stat = statValues[index];

                if (!stat) return;

                let currentValue = 0;

                const increment = Math.max(
                    1,
                    Math.ceil(stat.value / 55)
                );

                const counter = setInterval(() => {
                    currentValue += increment;

                    if (currentValue >= stat.value) {
                        currentValue = stat.value;
                        clearInterval(counter);
                    }

                    element.textContent =
                        `${currentValue}${stat.suffix}`;
                }, 25);
            });
        }
    }

    window.addEventListener("scroll", animateStatistics);
    animateStatistics();


    /* ==============================
       SKILL BAR ANIMATION
    ============================== */

    const skillBars = document.querySelectorAll(".fill");

    skillBars.forEach(bar => {
        const finalWidth = bar.style.width;

        bar.dataset.finalWidth = finalWidth;
        bar.style.width = "0";
    });

    const skillObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    setTimeout(() => {
                        bar.style.width =
                            bar.dataset.finalWidth;
                    }, 200);

                    skillObserver.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.4
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    /* ==============================
       SMOOTH INTERNAL LINKS
    ============================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ==============================
       DESKTOP MOUSE GLOW
    ============================== */

    const supportsHover =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (supportsHover) {
        const mouseGlow = document.createElement("div");

        mouseGlow.className = "mouse-glow";

        document.body.appendChild(mouseGlow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener("mousemove", event => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            mouseGlow.classList.add("mouse-glow-visible");
        });

        document.addEventListener("mouseleave", () => {
            mouseGlow.classList.remove("mouse-glow-visible");
        });

        function animateMouseGlow() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            mouseGlow.style.transform =
                `translate3d(${glowX}px, ${glowY}px, 0)
                 translate(-50%, -50%)`;

            requestAnimationFrame(animateMouseGlow);
        }

        animateMouseGlow();
    }

    console.log("Melchor Portfolio V5 loaded successfully.");
});
