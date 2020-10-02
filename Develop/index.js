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

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();


// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions