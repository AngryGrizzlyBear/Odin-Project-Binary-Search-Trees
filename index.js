
const { Tree } = require('./Tree')

function randomArray(size = 10, min = 1, max = 100) {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

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


