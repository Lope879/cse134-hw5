document.addEventListener("DOMContentLoaded", () => {
    setupPortfolioButtons();
    setupThemeToggle();

    const toggleButton = document.getElementById("theme-toggle");
    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggleButton.textContent = "☀️ Light Mode";
    }

    // Toggle theme on button click
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            toggleButton.textContent = "☀️ Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            toggleButton.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });

    function setupThemeToggle() {
        const toggleButton = document.getElementById("theme-toggle");
        if (!toggleButton) return; // Button may not exist yet

        // Remove existing click listeners by cloning
        const newButton = toggleButton.cloneNode(true);
        toggleButton.replaceWith(newButton);

        // Load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            newButton.textContent = "☀️ Light Mode";
        }

        // Attach click listener
        newButton.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                newButton.textContent = "☀️ Light Mode";
                localStorage.setItem("theme", "dark");
            } else {
                newButton.textContent = "🌙 Dark Mode";
                localStorage.setItem("theme", "light");
            }
        });
    }

    function setupPortfolioButtons() {
        const portfolioButtons = [
            { id: "projects-button", url: "/html/projects.html" },
            { id: "education-button", url: "/html/education.html" }
        ];

        portfolioButtons.forEach(btn => {
            const element = document.getElementById(btn.id);
            if (!element) return;

            // Remove existing listener first to prevent duplicates
            element.replaceWith(element.cloneNode(true));
            const newElement = document.getElementById(btn.id);

            newElement.addEventListener("click", (e) => {
                e.preventDefault();
                transitionTo(btn.url);
            });
        });
    }

    async function transitionTo(url) {
        if (!document.startViewTransition) {
            window.location.href = url;
            return;
        }

        const res = await fetch(url);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newMain = doc.querySelector("main");
        const newFooter = doc.querySelector("footer");
        const oldMain = document.querySelector("main");
        const oldFooter = document.querySelector("footer");

        document.documentElement.dataset.transition = "right";

        document.startViewTransition(() => {
            oldMain.replaceWith(newMain);
            oldFooter.replaceWith(newFooter);
            history.pushState({}, "", url);

            // Reattach any buttons in new main/footer
            setupPortfolioButtons();
            setupThemeToggle();
        });
    }

    // -------------------------------
    // Attach transition to all buttons
    const navButtons = [
        { id: 'home-button', url: 'index.html' },
        { id: 'projects-button', url: 'projects.html' },
        { id: 'education-button', url: 'education.html' },
        { id: 'portfolio-button', url: 'portfolio.html' },
        { id: 'aboutMe-Button', url: 'about.html' },
        { id: 'contact-button', url: 'contact.html' }
    ];

    navButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (!element) return;
        element.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            transitionTo(btn.url);
        });
    });

    const portfolioButtons = [
        { id: "projects-button", url: "projects.html" },
        { id: "education-button", url: "education.html" }
    ];

    portfolioButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (!element) return;

        element.addEventListener("click", (e) => {
            e.preventDefault();
            transitionTo(btn.url);
        });
    });
});