class Node {
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }

    getPathToNode(target) {
        if (this.value === target) {
            return [target];
        } else if (this.children.length === 0) {
            return [];
        }
        var path = [];
        for (child of this.children) {
            path = [...path, ...child.getPathToNode(target)];
        }
        if (path.length !== 0) {
            return [this.value, ...path];
        }
        return [];
    }
}

module.exports = Node;