// Integer Product Checker - Beginner Friendly Version
// This program asks the user for integers and checks if any two integers multiply to make a third integer

// We need this to get input from the user
const readline = require('readline');

// This sets up how we'll talk to the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This array will hold all the integers the user enters
let integers = [];

// This function asks the user for an integer
function askForInteger() {
    rl.question('Enter an integer (or type "q" to quit): ', function(answer) {
        // Convert the answer to lowercase so "Q" and "q" both work
        if (answer.toLowerCase() === 'q') {
            // User wants to quit, so let's check their integers
            checkIntegers();
            return;
        }
        
        // Try to convert the input to an integer
        let num = parseInt(answer);
        
        // Check if it's actually a valid integer
        if (isNaN(num)) {
            console.log('Error: That\'s not a valid integer! Please try again.');
            askForInteger(); // Ask again
            return;
        }
        
        // The integer is good! Add it to our list
        integers.push(num);
        console.log('You entered: ' + num);
        
        // Ask for another integer
        askForInteger();
    });
}

// This function checks if any two integers multiply to make a third integer
function checkIntegers() {
    console.log('\n=== RESULTS ===');
    
    // Show all the integers they entered
    if (integers.length === 0) {
        console.log('You didn\'t enter any integers.');
    } else {
        console.log('Integers you entered: ' + integers.join(', '));
    }
    
    // We need at least 3 integers to check if two multiply to make a third
    if (integers.length < 3) {
        console.log('You need at least 3 integers to check the condition.');
        console.log('Condition was not met');
        rl.close();
        return;
    }
    
    // Now let's check if any two integers multiply to make a third
    let foundMatch = false;
    let matchMessage = '';
    
    // Look at each integer in our list
    for (let i = 0; i < integers.length; i++) {
        // Look at each other integer
        for (let j = 0; j < integers.length; j++) {
            // Don't multiply an integer by itself
            if (i === j) continue;
            
            // Calculate what these two integers multiply to
            let product = integers[i] * integers[j];
            
            // Check if this product matches any of our other integers
            for (let k = 0; k < integers.length; k++) {
                // Don't check against the same integers we just multiplied
                if (k === i || k === j) continue;
                
                // Did we find a match?
                if (product === integers[k]) {
                    foundMatch = true;
                    matchMessage = integers[i] + ' x ' + integers[j] + ' = ' + integers[k];
                    break;
                }
            }
            
            // If we found a match, we can stop looking
            if (foundMatch) break;
        }
        
        // If we found a match, we can stop looking
        if (foundMatch) break;
    }
    
    // Tell the user what we found
    if (foundMatch) {
        console.log('Condition is met: ' + matchMessage);
    } else {
        console.log('Condition was not met');
    }
    
    // We're done! Close the program
    rl.close();
}

// Start the program
console.log('=== Integer Product Checker ===');
console.log('I will ask you for integers one at a time.');
console.log('Then I\'ll check if any two integers multiply to equal a third integer.');
console.log('Type "q" when you\'re done entering integers.');
console.log('');

// Begin asking for integers
askForInteger();