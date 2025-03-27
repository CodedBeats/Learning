
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



/**
 * gets the max profit from a list of prices where prices[i] is the price of a given stock on the i'th day
 * @param {number[]} prices - an array of prices
 * @returns {number} the max profit
 */
let getMaxProfit = (prices) => {
    console.log(`\n===== Finding Max Profit =====`)
    let maxProfit = 0
    // init min price
    let minPrice = prices[0]

    for (let i = 1; i < prices.length; i++) {
        // update min price if current price is lower
        if (prices[i] < minPrice) {
            minPrice = prices[i]
            continue
        }

        // check if current profit will be more than maxProfit
        const profit = prices[i] - minPrice
        if (profit > maxProfit) maxProfit = profit
    }

    return maxProfit
}



/**
 * generates the name of an excel column based on the given number
 * @param {number} columnNumber - the number of the column
 * @returns {string} the name of the column
 */
let convertToExcelColumnName = (columnNumber) => {
    console.log(`\n===== Finding Name of Column for Number ${columnNumber} =====`)
    const letters = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M",
        "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
    ]
    
    let result = ""

    while (columnNumber > 0) {
        // change  columnNumber to match indexing with 0 
        columnNumber-- 

        // get letter from remainder
        const letter = letters[columnNumber % 26]

        // add to result (right to left lol)
        result = letter + result

        // next letter position
        columnNumber = Math.floor(columnNumber / 26)
    }

    return result
}



/**
 * finds the number that appears most often in an array of numbers
 * @param {number[]} nums - an array of numbers
 * @returns {number} the majority element
 */
let majorityElement = (nums) => {
    console.log(`\n===== Finding the Majority Element in [${nums}] =====`)
    let numCounters = {}

    // get all possible nums and count their appearence
    nums.forEach((num) => {
        if (numCounters[num]) {
            // num has been seen so increment
            numCounters[num]++
        } else {
            // num hasn't been seen so init 
            numCounters[num] = 1
        }
    })

    let majorityElem = null
    let majorityCount = 0

    // find majority num
    for (let num in numCounters) {
        if (numCounters[num] > majorityCount) {
            // key is string for some reason lol
            majorityElem = parseInt(num)
            majorityCount = numCounters[num]
        }
    }

    return majorityElem;
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
    "Get Max Profit": {
        func: getMaxProfit,
        args: [[2,9,1,4,2,3]],
        expected: 7
    },
    "Convert to Excel Column Name": {
        func: convertToExcelColumnName,
        args: [701],
        expected: "ZY"
    },
    "Majority Element": {
        func: majorityElement,
        args: [[2,2,1,1,1,2,2,1,1,2,2,1,2,2]],
        expected: 2
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
