
const inputValue = document.getElementById('user-input');
const number = document.querySelectorAll('.number');
const calculate = document.querySelectorAll('.key-other-operations');
const otherButtons = document.querySelectorAll('.key-other');

let resetDisplay = false;

// Number buttons
number.forEach((item) => {
    item.addEventListener('click', (e) => {
        const value = e.currentTarget.innerText.trim();

        if (resetDisplay || ['NaN', 'Error'].includes(inputValue.innerText)) {
            inputValue.innerText = '0';
            resetDisplay = false;
        }

        if (value === '.') {
            const parts = inputValue.innerText.split(/[+\-*/]/);
            if (parts[parts.length - 1].includes('.')) return;
        }

        if (inputValue.innerText === '0' && value !== '.') {
            inputValue.innerText = value;
        } else {
            inputValue.innerText += value;
        }
    });
});

// Operators and equals
calculate.forEach((item) => {
    item.addEventListener('click', (e) => {
        const value = e.currentTarget.innerText.trim();
        let current = inputValue.innerText;

        if (value === '=') {
            try {
                if (!/^[0-9+\-*/.()\s]+$/.test(current)) {
                    throw new Error('Invalid expression');
                }

                const result = Function(
                    '"use strict"; return (' + current + ')'
                )();

                inputValue.innerText =
                    Number.isFinite(result) ? String(result) : 'Error';

                resetDisplay = true;
            } catch {
                inputValue.innerText = 'Error';
                resetDisplay = true;
            }
            return;
        }

        if (current === 'Error' || current === 'NaN') {
            current = '0';
        }

        const lastChar = current.slice(-1);

        // Replace the previous operator if another is clicked
        if (/[+\-*/]/.test(lastChar)) {
            inputValue.innerText = current.slice(0, -1) + value;
        } else {
            inputValue.innerText = current + value;
        }

        resetDisplay = false;
    });
});

// AC, DEL and percentage buttons
otherButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
        const value = e.currentTarget.innerText.trim();

        if (value === 'AC') {
            inputValue.innerText = '0';
            resetDisplay = false;
        } else if (value === 'DEL') {
            inputValue.innerText =
                inputValue.innerText.slice(0, -1) || '0';
            resetDisplay = false;
        } else if (value === '%') {
            const current = inputValue.innerText;
            const result = Number(current) / 100;

            inputValue.innerText = String(result);
        }
    });
});