const inquirer = require("inquirer");
const axios = require("axios")
const fs = require("fs");
let licenseSection;

const questions = [
    {
        type: "input",
        message: "What is your full name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your GitHub Username?",
        name: "username"
    },
    {
        type: "input",
        message: "README Title",
        name: "title"
    },
    {
        type: "input",
        message: "What year was this project created?",
        name: "year"
    },
    {
        type: "input",
        message: "Project Description",
        name: "description"
    },
    {
        type: "input",
        message: "Project Authors",
        name: "authors"
    },
    {
        type: "checkbox",
        message: "What Languages are you using?",
        name: "languages",
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
            "CC",
            "No license",
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
    * [Description](#description)
    * [Authors](#author(s))
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [FAQ](#faq)
    * [Contributions](#contributions)
    
## Badges
    // ${questionsData.badges}
    ![Badge]("https://img.shields.io/badge/license-${questionsData.license}-<green>")  

## Installation
${questionsData.installation}
    
## Usage
${questionsData.usage}

## License
${questionsData.licenseSection}

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
    try {
    var gitHubInfo = await axios(queryUrl);
} catch (error) {
    console.log("error", error);
}
    const data = {
        gitData: gitHubInfo.data,
        questionsData: response
    };
    // console.log(data);
    console.log(data.questionsData.license);
    // console.log(data.questionsData.response);

    licenseInfo();

    function licenseInfo() {
            if (data.questionsData.license === "MIT") {
                licenseSection = `MIT License 
    
            Copyright(c) ${data.questionsData.year} ${data.questionsData.name}
    
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files(the "Software"), to deal
                in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
    
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
    
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.`;
    
            } else if (data.questionsData.license === "CC") {
                licenseSection = `This project is licensed under the Creative Commons Attribution 4.0 license.
    For more information about the license [Click Here](https://creativecommons.org/licenses/by/4.0/legalcode)
    Copyright (c) ${data.questionsData.year} ${data.questionsData.name}`
            } else {
                licenseSection = `This project is copyrighted and cannot be used or altered without express permission from the copyright holder.
    
    Copyright (c) ${data.questionsData.year} ${data.questionsData.name}`
            };
    }

    var markDown = await getGitData(data);
    writeMarkdown(data.questionsData.title, markDown);
    
});

function writeMarkdown(fileName, data) {
    fs.writeFile(`${fileName}.md`, data, function (error) {
        if (error) {
            return console.log(error);
        }
        console.log("Success!");
    });
};

module.exports = { getGitData };