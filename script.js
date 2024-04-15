document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const calculateButton = document.getElementById("calculate");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");

    calculateButton.addEventListener("click", function() {
        const grossIncome = parseFloat(form.elements["grossIncome"].value);
        const extraIncome = parseFloat(form.elements["extraIncome"].value) || 0;
        const deductions = parseFloat(form.elements["deductions"].value) || 0;
        const age = form.elements["age"].value;

        let error = false;

        if (isNaN(grossIncome) || grossIncome <= 0) {
            showError("grossIncome", "Gross Annual Income must be a positive number.");
            error = true;
        } else {
            hideError("grossIncome");
        }

        // Validate other fields similarly

        if (!error) {
            const tax = calculateTax(grossIncome, extraIncome, deductions, age);
            const overallIncome = grossIncome + extraIncome - deductions - tax;
            const taxResult = `\nYour Overall income after tax deduction is: ${overallIncome.toFixed(2)} `;
            modalContent.innerHTML = `<h2>Your Overall income will be</h2><p>${taxResult}</p>`;
            modalContent.innerHTML += '<button class="closeButton">Close</button>';
            modal.style.display = "block";

            // Reset the form
            form.reset();
        }
    });

    modal.addEventListener("click", function(event) {
        if (event.target.classList.contains("closeButton")) {
            modal.style.display = "none";
            modalContent.innerHTML = ""; // Clear modal content
        }
    });

    function calculateTax(grossIncome, extraIncome, deductions, age) {
        const totalIncome = grossIncome + extraIncome - deductions;
        let tax = 0;

        if (totalIncome > 8000000) {
            if (age === "<40") {
                tax = 0.3 * (totalIncome - 8000000);
            } else if (age === "≥40 & <60") {
                tax = 0.4 * (totalIncome - 8000000);
            } else if (age === "≥60") {
                tax = 0.1 * (totalIncome - 8000000);
            }
        }

        return tax;
    }

    function showError(inputName, errorMessage) {
        document.getElementById(inputName + "Error").setAttribute("data-tooltip", errorMessage);
        document.getElementById(inputName + "Error").style.display = "inline-block";
    }

    function hideError(inputName) {
        document.getElementById(inputName + "Error").style.display = "none";
    }
});
