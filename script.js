/* =========================================
   MELCHOR PORTFOLIO V3
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       TYPING EFFECT
    ============================== */

    const typingElement = document.getElementById("typing");

    const jobTitles = [
        "Administrative Support",
        "Document Controller",
        "AI Data Specialist",
        "Virtual Assistant"
    ];

    let titleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function runTypingEffect() {
        if (!typingElement) return;

        const currentTitle = jobTitles[titleIndex];

        if (isDeleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

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

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
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

    console.log("Melchor Portfolio V3 loaded successfully.");
});
