// Selecting necessary elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const scientificSwitch = document.getElementById('scientificSwitch');
const scientificButtons = document.getElementById('scientificButtons');
const calculator = document.querySelector('.calculator');
let currentInput = '';
let resultDisplayed = false;

// Dark Mode Toggle
darkModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    calculator.classList.toggle('dark-mode');
    display.classList.toggle('dark-mode');
    buttons.forEach(button => button.classList.toggle('dark-mode'));
});

// Scientific Mode Toggle
scientificSwitch.addEventListener('change', () => {
    scientificButtons.classList.toggle('hidden');
});

// Function to handle basic and scientific calculations
const calculate = (value) => {
    if (resultDisplayed) {
        currentInput = ''; // Clear input if the result was displayed
        resultDisplayed = false;
    }
    if (value === 'C') {
        currentInput = ''; // Clear display
    } else if (value === '=') {
        try {
            currentInput = eval(currentInput).toString(); // Evaluate and display the result
        } catch (e) {
            currentInput = 'Error'; // Handle invalid expressions
        }
        resultDisplayed = true;
    } else if (['sin', 'cos', 'tan', 'sqrt'].includes(value)) {
        // Handle scientific operations
        const radians = (angle) => angle * (Math.PI / 180);
        switch (value) {
            case 'sin':
                currentInput = Math.sin(radians(eval(currentInput))).toString();
                break;
            case 'cos':
                currentInput = Math.cos(radians(eval(currentInput))).toString();
                break;
            case 'tan':
                currentInput = Math.tan(radians(eval(currentInput))).toString();
                break;
            case 'sqrt':
                currentInput = Math.sqrt(eval(currentInput)).toString();
                break;
        }
        resultDisplayed = true;
    } else {
        currentInput += value; // Append input to display
    }
    display.value = currentInput; // Update the display
};

// Event listener for buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        calculate(value);
    });
});
