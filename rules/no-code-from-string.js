'use strict';

const isEvalCall = function (node) {
    return node.callee.name === 'eval';
}

const isFunctionConstructor = function (node) {
    return node.parent.type === 'NewExpression' &&
        node.parent.callee.name === 'Function';
}


module.exports = function (context) {
    return {
        CallExpression(node) {
            if (isEvalCall(node)) {
                return context.report({
                    node: node,
                    message: 'Calls to eval() are not allowed.'
                });
            }
        },
        ObjectExpression(node) {
            if (isFunctionConstructor(node)) {
                return context.report({
                    node: node,
                    message: 'Calling the Function constructor is not allowed.'
                });
            }
        }

    };
}


