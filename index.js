var inquirer = require("inquirer");
var fs = require('fs');
var {
  Observable
} = require('rxjs');
var hotelsarray = [];

runSearch();

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Welcome to Auto. What would you like to do?",
      choices: [
        "GPO Shops",
        "Pull OYV2 Extracts",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "GPO Shops":
          askID();
          break;

        case "Pull OYV2 Extracts":
          askIDExtract();
          break;

        case "Exit":
          // songAndAlbumSearch();
          console.log("Goodbye")
          process.exit();
          break;
      }
    });
}

var questions = [{
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

//User inputs hotels for GPO Shops
function askHotels() {
  inquirer.prompt(questions).then(answers => {
    hotelsarray.push(answers.hotels);
    if (answers.askAgain) {
      askHotels();
    } else {
      let data = JSON.stringify(hotelsarray).toUpperCase();
      console.log("===============================================================");
      console.log("");
      console.log('Current hotels:', hotelsarray.join(', '));
      console.log("");
      console.log("===============================================================");
      fs.writeFileSync('./data.json', data)
      return mochaGPO();
    }
  });
}

//User inputs credentials for GPO Shop
var observe = Observable.create(function (obs) {
  obs.next({
    type: 'input',
    name: 'eid',
    message: "What's your EID"
  });

  obs.next({
    type: 'password',
    name: 'password',
    message: "What's your password",
    mask: '*',
  });

  obs.complete();
});

function askID() {

  inquirer.prompt(observe).then(answers1 => {
    fs.writeFileSync('./login.json', JSON.stringify(answers1, null, '  '));
    if (answers1 != null) {
      askHotels();
    } else {
      console.log('username or password imcomplete')
      askID();
    }
  });
}

function mochaGPO() {
  var Mocha = require('mocha');

  var mocha = new Mocha({});

  mocha.addFile('./GPO.js')

  mocha.run()
    .on('test', function (test) {
      // console.log('Test started: ' + test.title);
      console.log('.');
    })
    .on('test end', function (test) {
      // console.log('Test done: ' + test.title);
      console.log('.');
    })
    .on('pass', function (test) {
      console.log('Shop Suceeded');
      // console.log(test);
    })
    .on('fail', function (test, err) {
      console.log('Shop may have failed - check for file');
      // console.log(test);
      console.log(err);
    })
    .on('end', function () {
      console.log('All done');
    });
}


var questionsExtract = [{
    type: 'input',
    name: 'hotels',
    message: "Which hotel would you like to add?"
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another hotel? (just hit enter for YES)',
    default: true
  }
];

//User inputs hotels for GPO Shops
function askHotelsExtract() {
  inquirer.prompt(questionsExtract).then(answers => {
    hotelsarray.push(answers.hotels);
    if (answers.askAgain) {
      askHotelsExtract();
    } else {
      let data = JSON.stringify(hotelsarray).toUpperCase();
      console.log("===============================================================");
      console.log("");
      console.log('Current hotels:', hotelsarray.join(', '));
      console.log("");
      console.log("===============================================================");
      fs.writeFileSync('./data.json', data)
      return mochaExtract();
    }
  });
}

//User inputs credentials for GPO Shop
var observeExtract = Observable.create(function (obs) {
  obs.next({
    type: 'input',
    name: 'eid',
    message: "What's your EID"
  });

  obs.next({
    type: 'password',
    name: 'password',
    message: "What's your password",
    mask: '*',
  });

  obs.complete();
});

function askIDExtract() {

  inquirer.prompt(observeExtract).then(answers1 => {
    fs.writeFileSync('./login.json', JSON.stringify(answers1, null, '  '));
    if (answers1 != null) {
      askHotelsExtract();
    } else {
      console.log('username or password imcomplete')
      askIDExtract();
    }
  });
}

function mochaExtract() {
  var Mocha = require('mocha');

  var mocha = new Mocha({});

  mocha.addFile('./extract.js')

  mocha.run()
    .on('test', function (test) {
      // console.log('Test started: ' + test.title);
    })
    .on('test end', function (test) {
      // console.log('Test done: ' + test.title);
    })
    .on('pass', function (test) {
      console.log('Test passed');
      // console.log(test);
    })
    .on('fail', function (test, err) {
      console.log('Test fail');
      console.log(test);
      console.log(err);
    })
    .on('end', function () {
      
      console.log('All done');
    });
}