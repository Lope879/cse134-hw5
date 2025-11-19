document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const firstName = document.getElementById("fName");
    const lastName = document.getElementById("lName");
    const email = document.getElementById("sEmail");
    const comment = document.getElementById("sComment");
    const counter = document.querySelector("comment-counter");
    const errorDisplay = document.getElementById("error");
    const infoOutput = document.getElementById("info");

    const formErrorsInput = document.createElement("input");
    formErrorsInput.type = "hidden";
    formErrorsInput.name = "form-errors";
    form.appendChild(formErrorsInput);

    let form_errors = [];

    const allowedChars = /^[A-Za-z]*$/;

    function showError(input, message) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove("hidden");
        input.classList.add("flash");

        setTimeout(() => {
            errorDisplay.classList.add("hidden");
            input.classList.remove("flash");
        }, 2000);

        form_errors.push({
            field_id: input.id,
            field_name: input.name,
            value: input.value,
            message: message,
            timestamp: new Date().toISOString()
        });
    }

    // --- Enforce character rules on names ---
    function enforceCharacterRules(event) {
        if (!allowedChars.test(event.target.value)) {
            showError(event.target, "Invalid character entered.");
            event.target.value = event.target.value.replace(/[^A-Za-z]/g, "");
        }
    }

    firstName.addEventListener("input", enforceCharacterRules);
    lastName.addEventListener("input", enforceCharacterRules);

    // --- Custom validity for inputs ---
    firstName.addEventListener("input", () => {
        firstName.setCustomValidity("");
        if (!firstName.checkValidity()) {
            firstName.setCustomValidity("Only alphabetic letters!");
        }
    });

    lastName.addEventListener("input", () => {
        lastName.setCustomValidity("");
        if (!lastName.checkValidity()) {
            lastName.setCustomValidity("Only alphabetic letters!");
        }
    });

    firstName.addEventListener("focus", () => {
        infoOutput.textContent = "Name can only contain letters.";
        infoOutput.classList.remove("hidden");
        infoOutput.classList.add("flash");
        setTimeout(() => {
            infoOutput.classList.add("hidden");
            infoOutput.classList.remove("flash");
        }, 2000);
    });

    lastName.addEventListener("focus", () => {
        infoOutput.textContent = "Name can only contain letters.";
        infoOutput.classList.remove("hidden");
        infoOutput.classList.add("flash");
        setTimeout(() => {
            infoOutput.classList.add("hidden");
            infoOutput.classList.remove("flash");
        }, 2000);
    });

    email.addEventListener("focus", () => {
        infoOutput.textContent = "Email must include '@' and a domain.";
        infoOutput.classList.remove("hidden");
        infoOutput.classList.add("flash");
        setTimeout(() => {
            infoOutput.classList.add("hidden");
            infoOutput.classList.remove("flash");
        }, 2000);
    });

    email.addEventListener("focusout", () => {
        email.setCustomValidity("");
        if (!email.checkValidity()) {
            const message = "Please enter a valid email address!";
            email.setCustomValidity(message);
            showError(email, message);
            captureError(email, message);
        }
    });

    // --- Character countdown for comment ---
    const maxLength = comment.maxLength;
    counter.textContent = `${maxLength} characters remaining`;

    comment.addEventListener("input", () => {
        comment.setCustomValidity("");
        if (!comment.checkValidity()) {
            const message = "Comment cannot be empty!";
            comment.setCustomValidity(message);
            showError(comment, message);
            captureError(comment, message);
        }
        
        const remaining = maxLength - comment.value.length;
        counter.textContent = `${remaining} characters remaining`;

        // Color warnings
        if (remaining <= 10) counter.style.color = "red";
        else if (remaining <= 30) counter.style.color = "orange";
        else counter.style.color = "green";

        // Flash if at max length
        if (remaining === 0) {
            comment.classList.add("flash");
            setTimeout(() => comment.classList.remove("flash"), 300);
        }
    });

    comment.addEventListener("focus", () => {
        infoOutput.textContent = "Write your comments here (max 200 characters).";
        infoOutput.classList.remove("hidden");
        infoOutput.classList.add("flash");
        setTimeout(() => {
            infoOutput.classList.add("hidden");
            infoOutput.classList.remove("flash");
        }, 2000);
    });

    function captureError(input, message) {
        // Check if this field already has an error
        const exists = form_errors.find(e => e.field_id === input.id);
        if (!exists) {
            form_errors.push({
                field_id: input.id,
                field_name: input.name,
                value: input.value,
                message: message,
                timestamp: new Date().toISOString()
            });
        }
    }

    // On submit
    form.addEventListener("submit", (e) => {
        let hasErrors = false;

        [firstName, lastName, email, comment].forEach(input => {
            if (!input.checkValidity()) {
                hasErrors = true;
                captureError(input, input.validationMessage);
                showError(input, input.validationMessage);
                console.log("the input is:" + input);
            }
        });

        formErrorsInput.value = JSON.stringify(form_errors);

        if (hasErrors) e.preventDefault();
    });

    const toggleButton = document.getElementById("theme-toggle");

    // Next Part

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
});
