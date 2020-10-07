const inquirer = require("inquirer");
const axios = require("axios")
const fs = require("fs");

// array of questions for user
const questions = [

    {
        type: "input",
        message: "GitHub Username",
        name: "username"
    },

    {
        type: "input",
        message: "README Title",
        name: "username"
    },

    {
        type: "input",
        message: "Project Description",
        name: "username"
    },

    {
        type: "input",
        message: "Project Authors",
        name: "username"
    },

    {
        type: "checkbox",
        message: "What do you want to include in your Table of Contents?",
        name: "contents",
        choices: [
            { name: "Badges", checked: true },
            { name: " Installation", checked: true },
            { name: " Usage", checked: true },
            { name: " License", checked: true },
            { name: " FAQ", checked: true },
            { name: " Contributing", checked: true },
        ]
    },

    {
        type: "checkbox",
        message: "What Languages are you using?",
        name: "badges",
        choices: [
            { name: "HTML", checked: true },
            { name: " CSS", checked: true },
            { name: " JavaScript", checked: true },
            { name: " jQuery", checked: true },
            { name: " Node.js", checked: false },
            { name: " React.js", checked: false },
            { name: " Angular.js", checked: false },
            { name: " Vue.js", checked: false },
            { name: " Python", checked: false },
            { name: " Django", checked: false },
            { name: " Ruby", checked: false },
            { name: " Rails", checked: false },
            { name: " Go", checked: false },
        ]
    },

    {
        type: "input",
        message: "Installation Information",
        name: "installation"
    },
    {
        type: "input",
        message: "Explain Application Use",
        name: "usage"
    },
    {
        type: "list",
        message: "Select a license",
        name: "license",
        choices: [
            "MIT",
            "APACHE",
            "GNU GPLv3",
            "ISC",
            "Rust"
        ]
    },
    {
        type: "input",
        message: "Add FAQ's",
        name: "faq"
    },
    {
        type: "input",
        message: "Please add any contributions to the README.",
        name: "contributions"
    }
];

function getGitData(data) {
    const { gitData } = data;
    const { questionsData } = data;
    return `

# ${questionsData.title}

## Description
${questionsData.description}
    
## Author(s)
${questionsData.authors}

## Table of Contents
${questionsData.contents}
    
## Badges
![badge](https://img.shields.io/badge/license-MIT-green)
${questionsData.badges}

## Installation
${questionsData.installation}
    
## Usage
${questionsData.usage}

## License
${questionsData.license}

## FAQ
${questionsData.faq}

## Contributions
${questionsData.contributions}

![GitHub Avatar](${gitData.avatar_url})
    
    `;
};

inquirer.prompt(questions).then(async function (response) {
    const queryUrl = `https://api.github.com/users/${response.username}`;
    axios.get(queryUrl);
    var gitHubInfo = await axios(queryUrl);
    const data = {
        gitData: gitHubInfo.data,
        questionsData: response
    };
    var markDown = await generateMarkdown(data);
    writeMarkdown(response.title, markDown);
});

function writeMarkdown(fileName, data) {
    fs.writeFile(`${fileName}.md`, data, function (error) {
        if (error) {
            return console.log(error);
        }
        console.log("Success!");
    });
};

module.exports = { generateMarkdown };




// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();


// // Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions