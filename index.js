class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        const sortedArray = [...new Set(array.sort((a, b) => a - b))];

        const build = (arr) => {
            if (arr.length === 0) return null;

            const mid = Math.floor(arr.length / 2);
            const node = new Node(arr[mid]);

            node.left = build(arr.slice(0, mid));
            node.right = build(arr.slice(mid + 1));

            return node;
        };

        return build(sortedArray);
    }
    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        }

        if (value === node.data) return node;
        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }
        return node;
    }
    deleteItem(value, node = this.root) {
        if (node === null) return null;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let successor = this.findMinNode(node.right);
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }
        return node;
    }
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    find(value, node = this.root) {
        if (node === null) return null;

        if (value === node.data) return node;
        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }
    levelOrderForEach(callback) {
        if (this.root === null) return;
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }
    inOrderForEach(callback, node = this.root) {
        if (node === null) return;

        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }
    preOrderForEach(callback, node = this.root) {
        if (node === null) return;

        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }
    postOrderForEach(callback, node = this.root) {
        if (node === null) return;

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }
    height(value) {
        const node = this.find(value);
        if (!node) return null;

        const calcHeight = (n) => {
            if (n === null) return -1;
            return 1 + Math.max(calcHeight(n.left), calcHeight(n.right));
        };
        return calcHeight(node);
    }
    toArrayLevelOrder() {
        const result = [];
        this.levelOrderForEach(node => result.push(node.data));
        return result;
    }
    isBalanced(node = this.root) {
        const check = (n) => {
            if (!n) return 0;

            const left = check(n.left);
            if (left === -1) return -1;

            const right = check(n.right);
            if (right === -1) return -1;

            if (Math.abs(left - right) > 1) return -1;

            return Math.max(left, right) + 1;
        };

        return check(node) !== -1;
    }
    rebalance() {
        const sorted = [...new Set(this.toArrayLevelOrder())].sort((a, b) => a - b);
        this.root = this.buildTree(sorted);
    }
    printTree(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.printTree(node.right, prefix + (isLeft ? "|. " : "  "), false);
        }

        console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);

        if (node.left !== null) {
            this.printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
        }
    }
}

function randomArray(size = 10, min = 1, max = 100) {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}


// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.right !== null) {
//         prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

//     if (node.left !== null) {
//         prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
// };
// const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(tree.root);

// tree.insert(10);
// tree.insert(2);
// tree.insert(5000);
// prettyPrint(tree.root);

// console.log("Initial tree:");
// prettyPrint(tree.root);

// console.log("\nDeleting 9 (has no children):");
// tree.deleteItem(9);
// prettyPrint(tree.root);

// console.log("\nDeleting 8 (has two children):");
// tree.deleteItem(8);
// prettyPrint(tree.root);

// console.log(tree.find(4));  // → Node with data 4
// console.log(tree.find(10)); // → null

// const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67]);
// // tree.postOrderForEach(node => console.log(node.data));

// console.log(tree.height(7)); // Example: root height
// console.log(tree.height(4)); // Check a subtree
// console.log(tree.height(1)); // Leaf node -> should be 0
// console.log(tree.height(999)); // Not found -> null
const nums = randomArray(15);
const tree = new Tree(nums);

console.log("Initial Tree:");
tree.printTree();
console.log("Is Balanced?", tree.isBalanced());

console.log("\nLevel Order:", tree.toArrayLevelOrder());
console.log("Pre Order:");
tree.preOrderForEach(n => console.log(n.data));
console.log("In Order:");
tree.inOrderForEach(n => console.log(n.data));
console.log("Post Order:");
tree.postOrderForEach(n => console.log(n.data));

// Unbalance the tree
tree.insert(101);
tree.insert(150);
tree.insert(200);

console.log("\nAfter Unbalancing:");
tree.printTree();
console.log("Is Balanced?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();

console.log("\nAfter Rebalancing:");
tree.printTree();
console.log("Is Balanced?", tree.isBalanced());




