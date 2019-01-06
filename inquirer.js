var inquirer = require("inquirer");

runSearch();

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "GPO Shops",
        "Pull OYV2 Extracts",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "GPO Shops":
      buildArray();
        //then run GPO.js using the user array
        // console.log("GPO SHOP RUN")
        break;

      case "Pull OYV2 Extracts":
        buildArray();
        //run extract.js using the user array
        console.log("EXTRACTS RUN")
        break;

      case "Exit":
        // songAndAlbumSearch();
        console.log("Goodbye")
        break;
      }
    });
}

function buildArray() {
  inquirer.prompt([
    {
        name: 'ID',
        message: 'What is your ID?',
        response: 'string'
      }, {
        name: "pasword",
        message: "What is you password",
        response: "string",
      }, {
        name: "hotels",
        message: "Which hotels would you like to add?",
        response: "array",
      }
    ]).then (function(answers){
        console.log(answers);
    })
  };