const numberInputDivision = document.getElementById('number') as HTMLInputElement | null;
const clearButtonDivision = document.getElementById('clear') as HTMLButtonElement | null;
const allDivisibleNumbers = document.querySelectorAll<HTMLDivElement>('.numbers > div');

const divisibles: number[] = [2, 3, 6, 7, 10];

numberInputDivision?.addEventListener('input', showDivision);
clearButtonDivision?.addEventListener('click', clear);


function showDivision(): void {
    if (!numberInputDivision) return;

    const number = Number(numberInputDivision.value);
    let biggestDivisible = 0;

    for (let i = divisibles.length - 1; i >= 0; i--) {
        const divisible = divisibles[i];

        if (number !== 0 && number % divisible === 0) {
            if (biggestDivisible === 0) {
                biggestDivisible = divisible;
                allDivisibleNumbers[i].className = 'biggest-divisible';
            } else {
                allDivisibleNumbers[i].className = 'divisible';
            }
        } else {
            allDivisibleNumbers[i].className = '';
        }
    }
}

function clear(): void {
    if (numberInputDivision) numberInputDivision.value = '';
    allDivisibleNumbers.forEach(element => element.className = '');
}