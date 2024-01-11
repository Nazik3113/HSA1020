const countingSort = require('./algorithm.js');
const shuffle = require('./shuffle.js');

const MAX_ELEMENTS = 10000;

const ELEMENTS_INCREMENT = 100;

let measurements = new Map();

for (let elements = 0; elements < MAX_ELEMENTS; elements += ELEMENTS_INCREMENT) {
    const randomArray = shuffle(Array.from(Array(elements).keys()));

    const sort_start = performance.now();

    countingSort(randomArray);

    const sort_end = performance.now();

    measurements.set(elements, (randomArray.length + elements) / (sort_end - sort_start));
};

console.log(measurements);