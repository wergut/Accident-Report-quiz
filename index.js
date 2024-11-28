document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quiz-form");
    const steps = document.querySelectorAll(".quiz-step");
    const btnPrev = document.getElementById("quiz-btn-prev");
    const btnNext = document.getElementById("quiz-btn-next");
    let currentStep = 1;

    const updateStep = () => {
        steps.forEach((step) => {
            step.classList.toggle("active", step.dataset.step == currentStep);
        });

        btnPrev.style.display = currentStep === 1 ? "none" : "flex";
        btnNext.textContent = currentStep === steps.length ? "Сontact me" : "Next";
    };

    const showError = (input, message) => {
        let errorText = input.nextElementSibling;
        if (!errorText || !errorText.classList.contains("error-text")) {
            errorText = document.createElement("div");
            errorText.classList.add("error-text");
            input.after(errorText);
        }
        errorText.textContent = message;
        input.classList.add("input-error");
        input.addEventListener("input", () => {
            input.classList.remove("input-error");
            if (errorText) errorText.remove();
        });
    };

    const validateStep = () => {
        const activeStep = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        const inputs = activeStep.querySelectorAll("input");
        let isValid = true;

        inputs.forEach((input) => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, "This field is required.");
            } else if (!input.checkValidity()) {
                isValid = false;
                showError(input, "Invalid input.");
            }
        });

        return isValid;
    };

    btnPrev.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });

    btnNext.addEventListener("click", () => {
        if (currentStep < steps.length) {
            if (validateStep()) {
                currentStep++;
                updateStep();
            }
        } else {
            if (validateStep()) {
                form.submit();
            }
        }
    });

    updateStep();
});