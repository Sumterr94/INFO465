const readline = require('readline-sync');

// Create an empty array to store numbers
let numbers = [];

console.log("Integer Statistics Calculator");
console.log("Enter integers one by one. Type 'done' when finished.");

// Keep asking for numbers until user types 'done'
let userInput = "";
while (userInput !== "done") {
    userInput = readline.question("Enter a number (or type 'done'): ");
    
    // If user didn't type 'done', try to add their number
    if (userInput !== "done") {
        let num = Number(userInput);
        
        // Check if it's a real number
        if (num !== num) { // This checks for NaN (Not a Number)
            console.log("That's not a number! Try again.");
        } else {
            numbers.push(num);
            console.log("Added " + num + ". You have " + numbers.length + " numbers so far.");
        }
    }
}

// Show results if they entered any numbers
if (numbers.length === 0) {
    console.log("You didn't enter any numbers!");
} else {
    // Calculate the average (mean)
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    let average = total / numbers.length;
    
    // Find the median (middle number)
    // First, put numbers in order from smallest to biggest
    numbers.sort(function(a, b) {
        return a - b;
    });
    
    let median;
    let middle = numbers.length / 2;
    
    if (numbers.length % 2 === 0) {
        // Even number of items - average the two middle ones
        median = (numbers[middle - 1] + numbers[middle]) / 2;
    } else {
        // Odd number of items - take the middle one
        median = numbers[Math.floor(middle)];
    }
    
    // Show the results
    console.log("");
    console.log("=== RESULTS ===");
    console.log("Your numbers: " + numbers);
    console.log("How many numbers: " + numbers.length);
    console.log("Average: " + average.toFixed(2));
    console.log("Median: " + median.toFixed(2));
}