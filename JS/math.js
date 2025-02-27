
/**
 * creates an array of arrays representing pascals triangle up to the given number of rows
 * @param {int} numRows - the number of rows to generate    
 * @returns {Array} an array of arrays representing pascals triangle
 */
let generatePascalsTriangle = (numRows) => {
    console.log(`\n===== Generating Pascals Triangle =====`)

    // init result
    let result = [[1]]

    // set starting row to be used [1]
    for (let topRowIndex = 0; topRowIndex < numRows - 1; topRowIndex++) {
        // init new row with the left 1
        let newArr = [1]

        // loop through top (row - 1), since only have (topRow.length - 1) spaces to fill
        for (let i = 0; i < result[topRowIndex].length - 1; i++) {
            // get the new num from apropriately added top nums
            let addedNum = result[topRowIndex][i] + result[topRowIndex][i+1]
            // add new num to array
            newArr.push(addedNum)
        }

        // close row with right 1
        newArr.push(1)
        // add row to result
        result.push(newArr)
    }

    //console.log(result)
    return result
}



/**
 * gets the row of pascals triangle at the given index
 * @param {int} rowIndex - the index of the row to get
 * @returns {Array} an array representing the row of pascals triangle
 */
let getPascalsTriangleRow = (rowIndex) => {
    console.log(`\n===== Getting Pascals Triangle Row ${rowIndex} =====`)
    
    // first elem always 1
    let row = [1]

    for (let i = 1; i <= rowIndex; i++) {
        /*  weirdass formula I found
        *
        *      row[i − 1] * (rowIndex − i + 1)
        *     ---------------------------------
        *                   i
        */
        row.push(row[i - 1] * (rowIndex - i + 1) / i)
    }

    return row
}





// ============================================= //
// ================== TESTING ================== //
// ============================================= //

// test cases
const testCases = {
    "Pascals Triangle": {
        func: generatePascalsTriangle,
        args: [5],
        expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
    },
    "Get Pascals Triangle Row": {
        func: getPascalsTriangleRow,
        args: [7],
        expected: [1,7,21,35,35,21,7,1]
    },
}


/**
 * Runs a set of test cases for different functions and logs the results.
 * @param {Object} testCases - An object where each key is a test name, and the value is an object containing:
 * @param {Function} testCases[].func - The function to be tested.
 * @param {Array} testCases[].args - The arguments to pass into the function.
 * @param {*} testCases[].expected - The expected output of the function.
 *
 * @example
 * const testCases = {
 *   "Addition Test": { func: add, args: [2, 3], expected: 5 },
 *   "Multiplication Test": { func: multiply, args: [4, 5], expected: 20 },
 * }
 * runTests(testCases)
 */
let runTests = (testCases) => {
    Object.entries(testCases).forEach(([name, { func, args, expected }]) => {
        const result = func(...args)
        const passed = JSON.stringify(result) === JSON.stringify(expected)
        console.log(`${passed ? "✅ Passed" : "❌ Failed"}`)
        console.log(`Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}\n`)
    })
}

// run all test cases
runTests(testCases)
