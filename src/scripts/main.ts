const result = document.querySelector<HTMLDivElement>('#result');
const calcButtons = document.querySelectorAll<HTMLButtonElement>('button');

let output: string = '';
const specialChars: string[] = ['%', '*', '/', '+', '-', '='];

const savedOutput = localStorage.getItem('calcOutput');
if (savedOutput) {
    output = savedOutput;
    if (result) result.innerHTML = output;
}

if (calcButtons) {
    calcButtons.forEach((button) => {
        button.addEventListener('click', () => {
            calculate(button.dataset.value);
        });
    });
}

function calculate(buttonVal: string | undefined) {
    if (buttonVal === undefined) return;

    if (buttonVal === 'clear') {
        output = '';
    } else if (buttonVal === 'delete') {
        output = output.slice(0, -1);
    } else if (buttonVal === '=') {
        try {
            const expression = output.replace(/%/g, '/100');
            output = eval(expression).toString();
        } catch (err) {
            output = 'Error';
        }
    } else {
        if (output === '' && specialChars.includes(buttonVal) && buttonVal !== '-') return;

        const lastChar = output.slice(-1);
        if (specialChars.includes(lastChar) && specialChars.includes(buttonVal)) return;

        output += buttonVal;
    }

    localStorage.setItem('calcOutput', output);

    if (result) {
        result.innerHTML = output || '0';
    }
}
