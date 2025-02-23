import { displayAppInfo } from "../../shared/utils.js";

type PriceList = {
    regular: Record<string, number>;
    business: Record<string, number>;
    students: Record<string, number>
}

type Discount = {
    text: string;
    sum: number;
}

const vacationSelectSection = document.getElementById('selection-section') as HTMLElement;
const printedSinglePrice = document.getElementById('single') as HTMLElement;
const printedDiscountText = document.getElementById('discount-text') as HTMLElement;
const printedDiscountSum = document.getElementById('discount-sum') as HTMLElement;
const printedTotalPrice = document.getElementById('total') as HTMLElement;
const bookButton = document.getElementById('book') as HTMLButtonElement;


const priceLIst: PriceList = {
    regular: {
            friday: 15,
            saturday: 20,
            sunday: 22.5
    },
    business: {
            friday: 10.9,
            saturday: 15.6,
            sunday: 16
    },
    students: {
            friday: 8.45,
            saturday: 9.8,
            sunday: 10.46
    }
}

const discountText = {
    students: 'For groups over 30 people the price is reduced by 15%',
    business: 'For groups over 100 people 10 can stay for free',
    regular: 'For groups between 10 and 20 people the price is reduced by 5%'
}

if(vacationSelectSection) vacationSelectSection.addEventListener('input', prepareReservation);
if(bookButton) bookButton.addEventListener('click', booked);

displayAppInfo('vacation');

function prepareReservation(): void{

    const daySelect = document.getElementById('day-select') as HTMLInputElement;
    const typeSelect = document.getElementById('type-select') as HTMLInputElement;
    const groupSize = document.getElementById('group-size') as HTMLInputElement;

    let discount: Discount = {
        text: 'No discount',
        sum: 0
    }

    const groupSizeValue = parseFloat(groupSize.value) || 1;

    if(daySelect.value && typeSelect.value && groupSizeValue) {

        const singlePrice = priceLIst[typeSelect.value as keyof PriceList][daySelect.value];
        const fullPrice = singlePrice * groupSizeValue;

        if(typeSelect.value === 'regular' && groupSizeValue > 9 && groupSizeValue < 21){
            discount.text = discountText.regular;
            discount.sum = fullPrice * 0.05;
        } else if (typeSelect.value === 'business' && groupSizeValue > 99){
            discount.text = discountText.business;
            discount.sum = singlePrice * 10;
        } else if (typeSelect.value === 'students' && groupSizeValue > 29){
            discount.text = discountText.students;
            discount.sum = fullPrice * 0.15;
        }

        const totalPrice = fullPrice - discount.sum;

        printPrice(singlePrice, discount, totalPrice);

    } else {
        printPrice(0, discount, 0);
    }

}

function printPrice(singlePrice: number, discount: Discount, totalPrice: number): void {

    if(printedSinglePrice) printedSinglePrice.textContent = `${singlePrice.toFixed(2)}$`;
    if(printedDiscountText) printedDiscountText.textContent = discount.text;
    if(printedDiscountSum) printedDiscountSum.textContent = `(-${discount.sum.toFixed(2)}$)`;
    if(printedTotalPrice) printedTotalPrice.textContent = `${totalPrice.toFixed(2)}$`;

    if(bookButton) bookButton.disabled = !singlePrice && !discount.sum && !totalPrice;

}

function booked(){
    const isConfirmed = confirm('Are you sure you want to book this vacation?');

    if(isConfirmed){
        alert('Vacation booked')
        window.location.href = `/apps/vacation/`;
    }else{
        alert('Booking is canceled')
    }
}