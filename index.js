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

        while(queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if(node.left !==null) queue.push(node.left);
            if(node.right !==null) queue.push(node.right);
        }
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};
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

const tree = new Tree([1,7,4,23,8,9,3,5,67]);
tree.levelOrderForEach(node => console.log(node.data));

