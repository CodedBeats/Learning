// binary tree node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


/**
 * Recursively traverse the left side of a binary tree, processes the current node and then recursively traverse the right side (Left → Root → Right)
 * @param {TreeNode} root - the root node
 * @returns {int[]} the result array of all nodes values
 * 
 * @example
 *     5
      / \
     3   7
    / \   \
  2   4   9
 * Outputs: [2, 3, 4, 5, 7, 9]
 * // We visit 2 first (leftmost)
 * // Then 3 (root of the left subtree)
 * // Then 4 (right of 3)
 * // Then 5 (main root)
 * // Then 7 (right subtree)
 * // Finally, 9 (rightmost)
 */
let inorderTraversal = (root) => {
    let result = []

    let traverse = (node) => {
        // no node here, next node or finish recursive func
        if (!node) return

        // go to left subtree
        traverse(node.left)
        
        // add current node val to result
        result.push(node.val)
        
        // go to right subtree
        traverse(node.right)
    }

    traverse(root)
    return result
}



/**
 * Recursivly traverses the tree checking if val is less than the current node value and either traversing 
 * left or right until there isn't a node and the val can be inserted here
 * @param {TreeNode} root - the root/current node
 * @param {int} val - a number to insert into the tree
 * @returns {TreeNode} 
 */
let insertIntoBST = (root, val) => {
    // if no node here then insert the value here in a new node
    if (!root) return new TreeNode(val)

    // if value is less than current nodes' value, go to left subtree, 
    if (val < root.val) root.left = insertIntoBST(root.left, val)

    // go to right subtree
    else root.right = insertIntoBST(root.right, val)
    
    // return the root node (either updated or new node)
    return root
}





/**
 * Recursivle traverses the tree trying to find val moving left or right by comparing val and the current nodes' value
 * @param {TreeNode} root - the root/current node 
 * @param {int} val - a number to search for
 * @returns {TreeNode} the node where val has been found (null if not found)
 */
let searchBST = (root, val) => {
    // return current node when the current nodes' value is the same as val, if there is no node then val wasn't in the tree
    if (!root || root.val === val) return root

    // if value is less than current nodes' value, go to left subtree
    if (val < root.val) {
        return searchBST(root.left, val)
    }
    // go to right subtree and call searchBST recursively again on the appropriate subtree
    else {
        return searchBST(root.right, val)
    }
}



/**
 * Checks whether a Binary tree is symmetrical in structure and values
 * @param {TreeNode} root - the root/current node 
 * @returns {boolean} TRUE if it is symmetrical and FALSE if not
 * 
 * @example
 * //       1
   //      / \
   //     2   2
   //    / \ / \
   //   3  4 4  3
 * Outputs: TRUE
 */
let isTreeSymmetrical = (root) => {
    // no node here, next node or finish recursive func
    if (!root) return true

    let isSymmetricRecursion = (t1, t2) => {
        // both null, is symetric
        if (!t1 && !t2) return true

        // one null and not the other, not symmertric
        if (!t1 || !t2) return false

        // node values not the same, not symmertric
        if (t1.val !== t2.val) return false
        
        // recursion comparing left side and right side
        return isSymmetricRecursion(t1.left, t2.right) && isSymmetricRecursion(t1.right, t2.left);
    }

    // traverse left and right side at the same time comparing nodes
    return isSymmetricRecursion(root.left, root.right)
}





/**
 * Checks whether 2 Binary Trees are equal using recursion
 * @param {TreeNode} tree1 
 * @param {TreeNode} tree2 
 * @returns {boolean} TRUE if they are equal and FALSE if not
 */
let areTreesEqual = (tree1, tree2) => {
    // both null since all other nodes have been checked
    if (!tree1 && !tree2) return true

    // only 1 null or nodes don't have the same value
    if (!tree1 || !tree2 || tree1.val !== tree2.val) return false

    // Compare left and right subtrees recursively
    return areTreesEqual(tree1.left, tree2.left) && areTreesEqual(tree1.right, tree2.right)
}




/**
 * Recursively traverses the tree and returns the max depth
 * @param {TreeNode} root 
 * @returns {number} the max depth of the tree
 */
let maxDepthOfBinaryTree = (root) => {
    // traverse while tracking depth
    let traverse = (node, currentDepth) => {
        //console.log(currentDepth)

        // no node here, next node or finish recursive func, return depth
        if (!node) return currentDepth

        // go to left subtree and right subtree, get max depth (recursion fucks with my head -_-)
        let leftDepth = traverse(node.left, currentDepth + 1)
        let rightDepth = traverse(node.right, currentDepth + 1)

        // return the max depth found
        return Math.max(leftDepth, rightDepth)
    }

    return traverse(root, 0)
}





// ============================================= //
// ================== TESTING ================== //
// ============================================= //

// test cases
const testCases = {
    "Inorder Traversal": {
        func: inorderTraversal,
        args: [new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(7, null, new TreeNode(9)))],
        expected: [2, 3, 4, 5, 7, 9],
    },
    "Insert Into BST": {
        func: insertIntoBST,
        args: [new TreeNode(5, new TreeNode(3), new TreeNode(7)), 4],
        expected: new TreeNode(5, new TreeNode(3, null, new TreeNode(4)), new TreeNode(7)),
    },
    "Search BST (Found)": {
        func: searchBST,
        args: [new TreeNode(5, new TreeNode(3), new TreeNode(7)), 7],
        expected: new TreeNode(7),
    },
    "Search BST (Not Found)": {
        func: searchBST,
        args: [new TreeNode(5, new TreeNode(3), new TreeNode(7)), 10],
        expected: null,
    },
    "Is Tree Symmetrical": {
        func: isTreeSymmetrical,
        args: [
            new TreeNode(
                1,
                new TreeNode(
                    2,
                    new TreeNode(3),
                    new TreeNode(4)
                ),
                new TreeNode(
                    2,
                    new TreeNode(4),
                    new TreeNode(3)
                )
            )
        ],
        expected: true,
    },
    "Get Max Depth of Binary Tree": {
        func: maxDepthOfBinaryTree,
        args: [new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)))],
        expected: 3,
    },
}



/**
 * Runs a set of test cases for different functions and logs the results
 * @param {Object} testCases - An object where each key is a test name, and the value is an object containing:
 * @param {Function} testCases[].func - The function to be tested.
 * @param {Array} testCases[].args - The arguments to pass into the function.
 * @param {*} testCases[].expected - The expected output of the function.
 */
let runTests = (testCases) => {
    Object.entries(testCases).forEach(([name, { func, args, expected }]) => {
        const result = func(...args);
        const passed = Array.isArray(expected)
            ? JSON.stringify(result) === JSON.stringify(expected) // compare arrays for traversal
            : (typeof expected === "object" ? areTreesEqual(result, expected) : result === expected); // compare tree structure

        console.log(`${passed ? "✅ Passed" : "❌ Failed"} - ${name}`);
        console.log(`Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}\n`);
    });
}

// run tests
runTests(testCases);
