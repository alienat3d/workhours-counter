'use strict';

const input = document.querySelector('.input');
const clearBtn = document.querySelector('.input-clear-btn');
const result = document.querySelector('.result');
const copy = document.querySelector('.copy__btn');
const alert = document.querySelector('.copy__alert');

let totalHours;
let totalHoursOutput;

// Paint the background color, depending on the value of the digit
const colorHours = (hours) => {
	switch (true) {
		case hours < 0.5:
			result.style.backgroundColor = 'lightpink';
			break;
		case hours >= 0.5 && hours < 2:
			result.style.backgroundColor = 'paleturquoise';
			break;
		case hours >= 2 && hours < 4:
			result.style.backgroundColor = 'lightgreen';
			break;
		case hours >= 4 && hours < 6:
			result.style.backgroundColor = 'yellowgreen';
			break;
		case hours >= 6 && hours < 8:
			result.style.backgroundColor = 'olivedrab';
			break;
		case hours >= 8 && hours < 10:
			result.style.backgroundColor = 'blueviolet';
			break;
		case hours >= 10:
			result.style.backgroundColor = 'magenta';
			break;
	}
}

// Adds up the minutes and calculates the hours from them
input.addEventListener('input', () => {
	input.value !== '' ? 
		clearBtn.classList.add('visible') :
		clearBtn.classList.remove('visible');

	input.value = input.value.replace(/[^\d+,]/g, '');
	const minutesArray = input.value.split(',');

	const totalMinutes = minutesArray.reduce(function (sum, num) {
		return sum + Number(num);
	}, 0);

	totalHours = (totalMinutes / 60).toFixed(2);
	totalHoursOutput = totalHours.toString().replace('.', ',');

	result.textContent = totalHoursOutput;

	colorHours(totalHours);
})

input.addEventListener('focus', () => {
	if (input.value !== '') clearBtn.classList.add('visible');
});
// input.addEventListener('blur', () => clearBtn.classList.remove('visible'));

clearBtn.addEventListener('click', () => {
	input.value = '';
	clearBtn.classList.remove('visible');
	input.focus();
	result.textContent = '0';
	result.style.backgroundColor = 'transparent';
});

// Copy output to clipboard & show notification bubble:
copy.addEventListener('click', () => {
	navigator.clipboard.writeText(totalHoursOutput);

	alert.classList.add('show');

	setTimeout(() => {
		alert.classList.remove('show');
	}, 3000);
});