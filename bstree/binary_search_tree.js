// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

// Binary Search tree class
class BinarySearchTree {
    constructor()
    {
        // root of a binary search tree
        this.root = null;

        this.insert_count = 0;
        this.insert_time = 0;

        this.remove_count = 0;
        this.remove_time = 0;

        this.search_count = 0;
        this.search_time = 0;
    }

    getInsertTime() {
        return this.insert_time / this.insert_count;
    }

    getRemoveTime() {
        return this.remove_time / this.remove_count;
    }

    getSearchTime() {
        return this.search_time / this.search_count;
    }

    // helper method which creates a new node to 
    // be inserted and calls insertNode
    insert(data) {
        let insert_start = performance.now();

        const node = new Node(data);

        if (this.root === null) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }

        let insert_end = performance.now();

        this.insert_time += insert_end - insert_start;

        this.insert_count += 1;
    };

    // Recursive method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // helper method that calls the 
    // removeNode with a given data
    remove(data) {
        let remove_start = performance.now();

        this.root = this.removeNode(this.root, data);

        let remove_end = performance.now();

        this.remove_time += remove_end - remove_start;

        this.remove_count += 1;
    }

    // Recursive method to remove node with a given data
    // it recur over the tree to find the data and removes it
    removeNode(node, data) {
        // if the root is null then tree is empty
        if (node === null) {
            return null;
        // if data to be delete is less than 
        // roots data then move to left subtree
        } else if (data > node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        // if data to be delete is greater than 
        // roots data then move to right subtree
        } else if (data < node.data) {
            node.right = this.removeNode(node.right, data);
            return node;
        // if data is similar to the root's data 
        // then delete this node
        } else {
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // deleting node with one right children
            if (node.left === null) {
                node = node.right;
                return node;
            }

            // deleting node with one left children
            if (node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting node with two children
            // minimum node of the right subtree
            // is stored in aux
            const minNode = this.findMinNode(node.right);
            node.data = minNode.data;

            node.right = this.removeNode(node.right, minNode.data);
            return node;
        }
    }

    findMinNode(node) {
        // if left of a node is null
        // then it must be minimum node
        if(node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }
 
    // Performs inorder traversal of a tree
    inorder(node) {
        if(node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    // Performs preorder traversal of a tree    
    preorder(node) {
        if(node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    
    // Performs postorder traversal of a tree
    postorder(node) {
        if(node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

    // returns root of the tree
    getRootNode() {
        return this.root;
    }

    search(data) {
        let search_start = performance.now();

        const result = this.searchNode(this.root, data);

        let search_end = performance.now();

        this.search_time += search_end - search_start;

        this.search_count += 1;

        return result;
    }

    searchNode(node, data) {
        if (node === null) {
            return null;
        } else if (data < node.data) {
            return this.searchNode(node.left, data);
        } else if (data > node.data) {
            return this.searchNode(node.right, data);
        } else {
            return node;
        }
    }
};

module.exports = BinarySearchTree;