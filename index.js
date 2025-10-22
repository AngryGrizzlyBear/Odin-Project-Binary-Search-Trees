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
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

tree.insert(10);
tree.insert(2);
tree.insert(5000);
prettyPrint(tree.root);