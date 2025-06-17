const readline = require('readline');

// Create interface for reading user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array to store the integers
let numbers = [];

console.log("Integer Statistics Calculator");
console.log("Enter integers one by one (enter 'q' to quit and calculate statistics):");

/**
 * Function to calculate the mean (average) of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - The mean value
 */
function calculateMean(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, num) => total + num, 0);
    return sum / arr.length;
}

/**
 * Function to calculate the median of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - The median value
 */
function calculateMedian(arr) {
    if (arr.length === 0) return 0;
    
    // Sort the array in ascending order
    const sortedArr = [...arr].sort((a, b) => a - b);
    const length = sortedArr.length;
    
    // If even number of elements, return average of middle two
    if (length % 2 === 0) {
        return (sortedArr[length / 2 - 1] + sortedArr[length / 2]) / 2;
    } else {
        // If odd number of elements, return middle element
        return sortedArr[Math.floor(length / 2)];
    }
}

/**
 * Function to validate if input is a valid integer
 * @param {string} input - User input string
 * @returns {boolean} - True if valid integer, false otherwise
 */
function isValidInteger(input) {
    // Check if input is a valid number and is an integer
    const num = Number(input);
    return !isNaN(num) && Number.isInteger(num);
}

/**
 * Function to display the final results
 */
function displayResults() {
    console.log("\n" + "=".repeat(40));
    console.log("STATISTICS RESULTS");
    console.log("=".repeat(40));
    
    if (numbers.length === 0) {
        console.log("No valid integers were entered.");
    } else {
        console.log(`Numbers entered: [${numbers.join(', ')}]`);
        console.log(`Count: ${numbers.length}`);
        console.log(`Mean (Average): ${calculateMean(numbers).toFixed(2)}`);
        console.log(`Median: ${calculateMedian(numbers).toFixed(2)}`);
    }
    
    console.log("=".repeat(40));
}

/**
 * Main function to handle user input recursively
 */
function getUserInput() {
    rl.question("Enter an integer (or 'q' to quit): ", (input) => {
        // Trim whitespace from input
        const trimmedInput = input.trim();
        
        // Check if user wants to quit
        if (trimmedInput.toLowerCase() === 'q') {
            displayResults();
            rl.close();
            return;
        }
        
        // Validate the input
        if (isValidInteger(trimmedInput)) {
            const number = parseInt(trimmedInput);
            numbers.push(number);
            console.log(`Added: ${number} (Total numbers: ${numbers.length})`);
        } else {
            // Error handling for invalid input
            console.log("Error: Please enter a valid integer or 'q' to quit.");
        }
        
        // Continue asking for input
        getUserInput();
    });
}

// Start the program
getUserInput();

// Handle program termination gracefully
process.on('SIGINT', () => {
    console.log("\n\nProgram interrupted by user.");
    displayResults();
    process.exit(0);
});