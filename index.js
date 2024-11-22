document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quiz-form");


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