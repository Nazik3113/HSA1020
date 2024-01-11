const BTree = require("./binary_search_tree.js");

const MAX_ELEMENT = 10000;
const ELEMENTS = 1000;
const DATASETS = 100; 

let searchTime = 0;
let removeTime = 0;
let insertTime = 0;

// Generating random numbers

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Generating datasets

function basicDataset(elements, max_element) {
    const dataset = new BTree();

    for (let element = 0; element < elements; element++) {
        dataset.insert(getRandomInt(max_element));
    }

    dataset.insert_count = 0;

    return dataset;
}

// Measuring time

for (let iteration = 0; iteration < DATASETS; iteration++) {
    const dataset = basicDataset(ELEMENTS, MAX_ELEMENT);
    
    for (let element = 0; element < ELEMENTS; element++) {
        dataset.remove(getRandomInt(MAX_ELEMENT));
        dataset.insert(getRandomInt(MAX_ELEMENT));
        dataset.search(getRandomInt(MAX_ELEMENT));
    }

    searchTime += dataset.getSearchTime();
    removeTime += dataset.getRemoveTime();
    insertTime += dataset.getInsertTime();
}

// Measurements output

console.log(`Search time: ${searchTime/DATASETS}ms`);
console.log(`Delete time: ${removeTime/DATASETS}ms`);
console.log(`Insert time: ${insertTime/DATASETS}ms`);