'use strict';

const body = document.querySelector('body');
const input = document.querySelector('.input');
const clearBtn = document.querySelector('.input-clear-btn');
const result = document.querySelector('.result');
const copy = document.querySelector('.copy__btn');
const alert = document.querySelector('.copy__alert');
const modeSwitcherBtn = document.querySelector('.switch-mode-btn');

let totalHours;
let totalHoursOutput;

// Determines, which color mode user picked last time
localStorage.getItem("dark-mode") ?
	body.classList.add('dark-mode') :
	body.classList.remove('dark-mode');

// Paint the background color, depending on the value of the digit
const colorHours = (hours) => {
	if (body.classList.contains('dark-mode') && result.textContent === '0') {
		result.style.color = '#90ee90';
		result.style.backgroundColor = 'transparent';
	} else {
		result.style.color = '#000';
		result.style.backgroundColor = 'transparent';
	}

	switch (true) {
		case hours > 0 && hours < 0.5:
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

	input.value = input.value.replace(/[^\d+,\.]/g, '');
	input.value = input.value.replace(/\./g, ',');
	const minutesArray = input.value.split(',');

	const totalMinutes = minutesArray.reduce(function (sum, num) {
		return sum + Number(num);
	}, 0);

	totalHours = (totalMinutes / 60).toFixed(2);
	totalHoursOutput = totalHours.toString().replace('.', ',');

	totalHoursOutput === '0,00' ?
		result.textContent = 0 :
		result.textContent = totalHoursOutput;

	colorHours(totalHours);
})

input.addEventListener('focus', () => {
	if (input.value !== '') clearBtn.classList.add('visible');
});

clearBtn.addEventListener('click', () => {
	input.value = '';
	clearBtn.classList.remove('visible');
	input.focus();
	totalHours = 0;
	result.textContent = totalHours;
	colorHours(totalHours);
});

// Copy output to clipboard & show notification bubble:
copy.addEventListener('click', () => {
	if (+result.textContent !== 0) {
		navigator.clipboard.writeText(totalHoursOutput);

		alert.classList.add('show');

		setTimeout(() => {
			alert.classList.remove('show');
		}, 3000);
	}
});

// Switches light/dark mode:
modeSwitcherBtn.addEventListener('click', () => {
	body.classList.toggle('dark-mode');
	body.classList.contains('dark-mode') ?
		localStorage.setItem("dark-mode", "true") :
		localStorage.setItem("dark-mode", "false");
})