'use strict';

const input = document.querySelector('.input');
const result = document.querySelector('.result');
const copy = document.querySelector('.copy__btn');
const alert = document.querySelector('.copy__alert');

let totalHours;

// Adds up the minutes and calculates the hours from them
input.addEventListener('input', () => {
	console.dir(input);
	const minutesArray = input.value.split(',');

	const totalMinutes = minutesArray.reduce(function(sum, num) {
		return sum + Number(num);
	}, 0);

	totalHours = (totalMinutes / 60).toFixed(2).toString().replace('.', ',');

	result.textContent = totalHours;

	return totalHours;
})

// Copy output to clipboard & show notification bubble:
copy.addEventListener('click', () => {
  navigator.clipboard.writeText(totalHours);
  
  alert.classList.add('show');

  setTimeout(() => {
    alert.classList.remove('show');
  }, 3000);
});