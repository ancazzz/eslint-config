'use strict';
const stringifyRule = require('../rules/readable-stringify');
const codeRule = require('../rules/no-code-from-string');
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('readable-stringify', stringifyRule, {
    valid: [
        {
            code: 'JSON.stringify(item, null, 2);',
            options: [{ spacing: 2 }]
        }
    ],
    invalid: [
        {
            code: 'JSON.stringify({});',
            errors: [{ message: 'Calls to JSON.stringify must take 3 arguments. ' +
                    'Please consider calling JSON.stringify(item, null, 2);' }]
        },
        {
            code: 'JSON.stringify({}, null, 3);',
            errors: [{ message: 'Calls to JSON.stringify must use an spacing of 2. ' +
                    'Please consider calling JSON.stringify(item, null, 2);' }]
        }
    ]
});


ruleTester.run('no-code-from-string', codeRule, {
    valid: [
        {
            code: 'foo(10)'
        },
        {
            code: 'function foo() { doSomething() }'
        }
    ],
    invalid: [
        {
            code: 'eval("")',
            errors: [{ message: 'Calls to eval() are not allowed.' }]
        },
        {
            code: 'new Function({})',
            errors: [{ message: 'Calling the Function constructor is not allowed.' }]
        }
    ]
});

