var inquirer = require("inquirer");
var fs = require('fs');
var { Observable } = require('rxjs');
var hotelsarray = [];
var arrayID = [];
// var credentials = fs.readFileSync('./login.json');
var credentials = require('./login.json');

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
      // buildArray();
      askID();
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
        process.exit();
        break;
      }
    });
}

function buildArray() {
  observe();
  for(var exKey in credentials) {
    console.log("key:"+exKey+", value:"+credentials[exKey]);
}
};


var questions = [
  {
    type: 'input',
    name: 'hotels',
    message: "Which hotel would you like to add?"
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another hotel (just hit enter for YES)?',
    default: true
  }
];

//User inputs list for array and then saves that array to data.json (extract.js and GPO.js use data.json info)
function askHotels() {
  inquirer.prompt(questions).then(answers => {
    hotelsarray.push(answers.hotels);
    if (answers.askAgain) {
      ask();
    } else {
      let data = JSON.stringify(hotelsarray)
      console.log('Current hotels:', hotelsarray.join(', '));
    fs.writeFileSync('./data.json', data);       
    }
  });
}

//User inputs credentials
var observe = Observable.create(function(obs) {
  obs.next({
    type: 'input',
    name: 'eid',
    message: "What's your EID"
  });

  obs.next({
    type: 'input',
    name: 'password',
    message: "What's your paassword",
  });

obs.complete();
});

function askID() {
  
inquirer.prompt(observe).then(answers => {
  fs.writeFileSync('./login.json', JSON.stringify(answers, null, '  '))
  
  
});
}
