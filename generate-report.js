// generate-report.js
const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './allure-results',
    reportPath: './reports',
    metadata: {
        browser: {
            name: 'chrome',
            version: 'xx',
        },
        device: 'Local test machine',
        platform: {
            name: 'windos',
            version: '20.04',
        },
    },
});
