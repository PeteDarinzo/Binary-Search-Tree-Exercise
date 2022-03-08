class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let currentNode = this.root;
    const newNode = new Node(val);
    if (!currentNode) {
      this.root = newNode;
      return this;
    }
    while (currentNode) {
      if (currentNode.val > val) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = newNode;
          return this;
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = newNode;
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    const newNode = new Node(val);
    if (!node) {
      this.root = newNode;
      return this;
    }
    if (node.val > val) {
      if (!node.left) {
        node.left = newNode;
        return this;
      } else this.insertRecursively(val, node.left);
    } else {
      if (!node.right) {
        node.right = newNode;
        return this;
      } else this.insertRecursively(val, node.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val === val) {
        return currentNode;
      } else if (currentNode.val > val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (node.val === val) {
      return node;
    } else if (node.val > val) {
      if (node.left) {
        return this.findRecursively(val, node.left);
      } else {
        return undefined;
      }
    } else {
      if (node.right) {
        return this.findRecursively(val, node.right);
      }
      else {
        return undefined;
      }
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];
    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    if (this.root === null) return visited; // handle empty tree
    let toVisitQueue = [this.root];
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current.left) toVisitQueue.push(current.left);
      if (current.right) toVisitQueue.push(current.right);
      visited.push(current.val);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

    function isLeaf(node) {
      return (node.left === null) && (node.right === null);
    }

    function hasChild(node) {
      return ((node.left || node.right) && !(node.left && node.right));
    }

    function hasChildren(node) {
      return (node.left && node.right);
    }

    let current = this.root;
    while (current) {
      if (current.left && (current.left.val === val)) {
        let node = current.left;
        if (isLeaf(node)) current.left = null;
        if (hasChild(node)) { // node has single child
          if (node.left) {
            current.left = node.left;
          } else {
            current.left = node.right;
          }
        }
        return node;
      } else if (current.right && (current.right.val === val)) {
        let node = current.right;
        if (isLeaf(node)) current.right = null;
        if (hasChild(node)) { // node has single child
          if (node.left) {
            current.right = node.left;
          } else {
            current.right = node.right;
          }
        }
        return node;
      } else if (current.val > val) {
        current = current.left;
      } else if (current.val < val) {
        current = current.right;
      }
    }
    return undefined;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const rootVal = this.root.val;
    const nodes = this.dfsInOrder();
    const rootIdx = nodes.indexOf(rootVal);
    const leftNodes = nodes.slice(0, rootIdx);
    const rightNodes = nodes.slice(rootIdx + 1, nodes.length);
    return (Math.abs(leftNodes.length - rightNodes.length) <= 1);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null) return undefined;
    let current = this.root;
    while (current.right.right) {
      current = current.right;
    }
    return current.val;
  }
}

module.exports = BinarySearchTree;
