const fs = require('fs');

/*
  Greedy Strategy:
  0. Go through items and filter out any items whose size > knapsack's capacity
  1. Score each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, 'utf8');
const lines = filedata.trim().split(/[\r\n]+/g); // split on carriage returns/new lines

// console.log(lines);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));
  
  if (size <= capacity) {
    items.push({
      index,
      size,
      value,
      score: value/size
    });
  }
}

// Sort by score w/ best score at beginning (top) of array
items.sort((a, b) => {
  return b.score - a.score;
});

// console.log(items);
// console.log();


const knapsack = {
  selected: [],
  space: 0,
  value: 0
};
const leftOvers = []; // used to hold items not chosen
let availSpace = capacity;

for (let i = 0; i < items.length; i++) {
  if ( availSpace > 0) {
    if ( availSpace - items[i].size >= 0 ) {
      // let tmp1 = availSpace;
      // let tmp2 = items[i].size;
      knapsack.selected.push(items[i].index);
      knapsack.space += items[i].size;
      knapsack.value += items[i].value;
      availSpace -= items[i].size;
      // console.log(`Before: ${tmp1}, ${tmp2}    After: ${knapsack.space}, ${items[i].size}`);
    } else {
      leftOvers.push(items[i]);
    }
  }
}

/* Algo:
    1. Check score of each item in knapsack against scores of available items
    2. If score in available items is greater than score of item in knapsack,
       AND there's enough space for new item once old item is removed, SWAP!
    3. Set changes to true to try another iteration.
*/
let i = 0;
let changes = false;
do {
  let item = leftOvers[i];
  if ( knapsack.space > 0) {
    
  }

  
} while (changes);

// console.log();
// console.log(knapsack);

// let selected = "", space = 0, value = 0;
// for (let i = 0; i < knapsack.length; i++) {
//   selected += knapsack[i].index + " ";
//   space += knapsack[i].size;
//   value += knapsack[i].value;
// }

console.log();
console.log(`Total value:     ${knapsack.value}` );
console.log(`Total size:      ${knapsack.space}` );
console.log(`Items selected: ${knapsack.selected}` );
console.log();