class ListNode {
    constructor(val = 0, next = null) {
        this.val = val
        this.next = next
    }
}

/**
 * traverses a linked list copying the value at each node and putting it into a new linked list
 * @param {ListNode} head - the head of a linked list
 * @returns {ListNode} a new linked list skipping the dummy head
 */
let traverseAndCopy = (head) => {
    console.log(`===== Traverse and Copy Linked List =====`)
    
    // ceate a new linked list
    let newLinkedListHead = new ListNode()
    // pointer to track where we are in new list (currently at the head)
    let currentNode = newLinkedListHead
    // pointer to traverse given list
    let current = head

    // loop until end of list which will be null
    while (current !== null) {
        // copy current node val of given list
        currentNode.next = new ListNode(current.val)

        // move to the next node in the newly created list
        currentNode = currentNode.next
        //console.log(currentNode.val)

        // move to next node in the original list
        current = current.next
    }

    // return the new list (skipping the head)
    return newLinkedListHead.next
}



/**
 * traverses the given list deleting any duplicates
 * @param {ListNode} head - the head of a linked list
 * @returns {ListNode} the same input and now modified linked list
 */
let deleteDuplicates = (head) => {
    console.log(`\n===== Delete duplicates from a linked list =====`)

    // arr to store seen nums
    let seenNums = []
    // pointer to traverse given list
    let current = head
    // pointer to keep track of previous node
    let previous;

    // loop until end of list which will be null
    while (current !== null) {

        console.log("current val", current.val)

        if (seenNums.includes(current.val)) {
            // remove node
            previous.next = current.next
            console.log("removed")
        } 
        else {
            // add num to seen nums
            seenNums.push(current.val)
            // move previous forward only if no removal
            previous = current;
            console.log("added num", seenNums)
        }

        // move to next node in the list
        current = current.next
    }

    // return list
    return head
}




/**
 * Takes 2 sorted linked lists and sorts them into 1 sorted linked list
 * @param {ListNode} list1 - the head of a sorted linked list
 * @param {ListNode} list2 - the head of a sorted linked list
 * @returns {ListNode} a new sorted linked list with all nodes from list1 and list2
 */
let mergeTwoSortedLists = (list1, list2) => {
    console.log(`\n===== Merge 2 sorted Linked Lists =====`)

    // ceate a new linked list
    let newLinkedListHead = new ListNode()
    // pointer to track where we are in new list (currently at the head)
    let currentNode = newLinkedListHead

    // loop until both lists have been traversed
    while (list1 !== null && list2 !== null) {
        console.log(`compare list1 val (${list1.val}) and list2 val (${list2.val})`)

        if (list1.val <= list2.val) {
            // // add current node value of list1 to new linked list
            // currentNode.next = new ListNode(list1.val)

            // link the current node in list1 to the new list
            currentNode.next = list1
            // move to next node in list1
            list1 = list1.next

        } else {
            // // add current node value of list2 to new linked list
            // currentNode.next = new ListNode(list2.val)

            // link the current node in list1 to the new list
            currentNode.next = list2
            // move to next node in list2
            list2 = list2.next
        }

        // move to the next node in the newly created list
        currentNode = currentNode.next
        console.log(`added val <${currentNode.val}> to new list`)
    }

    // if there are remaining nodes in list1 add them to the new list
    if (list1 !== null) {
        console.log(`adding remaining list1 nodes: ${list1.val}`)
        currentNode.next = list1
    }
    // If there are remaining nodes in list2 adf them to the new list
    else if (list2 !== null) {
        console.log(`adding remaining list2 nodes: ${list2.val}`)
        currentNode.next = list2
    }

    // return the new list (skipping the head)
    return newLinkedListHead.next
}



// ============================================= //
// ================== TESTING ================== //
// ============================================= //

// test cases
const testCases = {
    "Traverse and Copy Linked List": {
        func: traverseAndCopy,
        args: [new ListNode(1, new ListNode(2, new ListNode(3)))],
        expected: {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: null,
                },
            },
        },
    },
    "Merge 2 sorted Linked Lists": {
        func: mergeTwoSortedLists,
        args: [
            new ListNode(1, new ListNode(2, new ListNode(5))),
            new ListNode(2, new ListNode(3, new ListNode(4))),
        ],
        expected: {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 2,
                    next: {
                        val: 3,
                        next: {
                            val: 4,
                            next: {
                                val: 5,
                                next: null,
                            },
                        },
                    },
                },
            },
        },
    },
    "Delete duplicates from a linked list": {
        func: deleteDuplicates,
        args: [
            new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(1, new ListNode(2)))))
        ],
        expected: {
            val: 1,
            next: {
                val: 2,
                next: null
            },
        },
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
