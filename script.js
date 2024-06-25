'use strict';

const countHours = (...args) => {
	const sum = args.reduce((sum, num) => sum + num);
	const result = (sum / 60).toFixed(2);
	return result;
}