// module.exports = {
//   default: '--require features/**/*.js --format @cucumber/pretty-formatter --format json:reports/cucumber_report.json --format @cucumber/pretty-formatter --format @cucumber/allure-formatter',
// };


module.exports = {
  default: '--require features/**/*.js --format json:allure-results/results.json',
};


// module.exports = {
//   default: '--require features/**/*.js',

//   format: [
//     'node_modules/cucumber-pretty',    // Optional: Pretty formatter for the console
//     'allure-cucumberjs',
//     'json:./reports/cucumber_report.json', 'html:./reports/cucumber_report.html '              // Allure reporter
//   ],
//   publishQuiet: true,

//   format: ["json:./reports/cucumber_report.json", "html:./reports/cucumber_report.html"], // Suppress cucumber publish messages
// }

// cucumber.js
// module.exports = {

//   default: '--require features/**/*.js',
//     format: ["json:./reports/cucumber_report.json"], // Ensure JSON report is specified
//     publishQuiet: true, // To disable cucumber.io publication

// };

