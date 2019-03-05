var credentials = require('./login.json');
require('geckodriver');
// require('./geckodriver.exe');

//credentials in app-env
var eid = credentials.eid;
var password = credentials.password;
var url = "https://salesnet.marriott.com/oys/ym/oy/OysController/signIn";

var landitID = 'grmrs.hq@marriott.com'
var landitP = 'marriott'

var fs = require('fs');
var moment = require('moment');
var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var loginId = path.join(userName);


//extracts array
// var marsha = require("./data").extract;
var marsha = require("./data.json");

//Webdriver setup
var assert = require("assert");
var webdriver = require("selenium-webdriver"),
By = webdriver.By,
until = webdriver.until;
var test = require("selenium-webdriver/testing");
const timeOut = 1000000;
var extract;
var firefox = require("selenium-webdriver/firefox");
var path = require("path");
// var myDownloadFolder = path.normalize(__dirname + 'Users/' + loginId + '/Desktop/GPO ' + moment().format('MM-DD-YYYY'));
var myDownloadFolder = path.normalize('C:/Users/' + loginId + '/Desktop/Extracts ' + moment().format('MM-DD-YYYY') + '\\');
console.log(myDownloadFolder);
// var myDownloadFolder = path.normalize(__dirname + "/../Downloads/");

// Create Firefox Profile
var profile = new firefox.Profile();
profile.setPreference("browser.download.folderList", 2);
profile.setPreference("browser.download.dir", myDownloadFolder);
profile.setPreference(
  "browser.helperApps.neverAsk.saveToDisk",
  "application/vnd.ms-excel"
  );
  
  // disable Firefox's built-in PDF viewer
  profile.setPreference("pdfjs.disabled", true);
  var options = new firefox.Options().setProfile(profile);
  var driver = new webdriver.Builder();
  
  //Build Webdriver with Firefox profile setup
  test.describe("Pull OYV2 Extracts", function() {
    test.before(function() {
      this.timeout(timeOut);
      driver = new webdriver.Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();
    });
    
    //Create folder for extracts
    test.before( function () {
  
      var dir = 'C:/Users/' + loginId + '/Desktop/Audit Files' + moment().format('MM-DD-YYYY') + '\\';
      
      !fs.existsSync(dir) && fs.mkdirSync(dir);
      });
    
    //Quit after last case finishes
    after(async () => driver.quit());
    
    //Login
    test.it("login successful", function() {
      this.timeout(timeOut);
      driver.get(url);
      driver.findElement(webdriver.By.name("username")).sendKeys(eid);
      driver.findElement(webdriver.By.name("password")).sendKeys(password);
      driver.findElement(webdriver.By.css("button.btn.btn-block")).click();
    });
    
    //Loop to pull all extracts
    marsha.forEach(s => {
    test.describe("Pull Audit files for " + s, function() {
      test.before(function() {
        this.timeout(timeOut);
        driver
          .manage()
          .window()
          .setSize(1280, 720);
      });

      test.it("Pull Extract", function(done, err) {
        console.log(s);
        this.timeout(timeOut);
        driver.get(url);
        driver.findElement(By.id("propertyCodeText")).sendKeys(s);
        driver.findElement(By.css("b > a")).click();
        driver.sleep(8000).then(function() {
          return driver.wait(
            until.elementLocated(By.id("dijit__TemplatedMixin_0")),
            20000
          );
        });
        driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
        driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
        driver.sleep(10000).then(function() {
          return driver.wait(
            until.elementLocated(By.css("span.icon.settings-button")),
            20000
          );
        });
        driver.findElement(By.css("span.icon.settings-button")).click();
        driver.findElement(By.css("#dijit_MenuItem_3_text")).click();

        driver.sleep(30000).then(function test() {
          const testFolder = myDownloadFolder;
          // const testFolder = dir;
          const fs = require("fs");

          //Checking for file in app downloads folder
          fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
              if (file.indexOf(s) > -1) {
                console.log(file + " was successfully pulled");
                return done();

                // use those file and return it as a REST API
              } else if (file.indexOf(s) >= 0) {
                console.log("Going into Overtime");
                driver.sleep(30000).then(function test() {
                  const testFolder = myDownloadFolder;
                  // const testFolder = dir;
                  const fs = require("fs");
                  fs.readdir(testFolder, (err, files) => {
                    files.forEach(file => {
                      if (file.indexOf(s) > -1) {
                        console.log(
                          file + " successfully pulled after a delay"
                        );
                        return done();
                        // use those file and return it as a REST API
                      } else if (file.indexOf(s) >= 0) {
                        console.log("Extract failed for " + s);
                        return done(err);
                      }
                    });
                  });
                });
              }
            });
          });
        });
      });

      test.it("Pull OY Screenshots", function(done, err) {
    // navigate to rate tab

    // click thresholds  /html/body/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td/div/div/div/div/div/div/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[3]/div[1]/div[1]/span[1]

// take screenshot
driver.takeScreenshot().then(
  function(image, err) {
      require('fs').writeFile('RPO-threshold.png', image, 'base64', function(err) {
          console.log(err);
      });
  }

//collapse top section > switch to comp setup tab > scroll down 5 lines
// screenshot - name comp setup and rate floor and ceiling
//select General Setup > zoom out > screenshot whole thing
//Non-ERS --> click Inventory > Gear > Settings > screenshot IO-Settings
//ERS --> Don't know yet
//go to room collections > https://salesnet.marriott.com/oys/ym/oy/OysController/settings/roomCollections
//scroll down and screenshot - Room Collections

);
      });

test.it("Supernova", function(done, err) {
  this.timeout(timeOut);
  driver.get('https://marriott.supernova.travel/login');
  driver.findElement(webdriver.By.name("email")).sendKeys(landitID);
  driver.findElement(webdriver.By.name("password")).sendKeys(landitP);
  driver.findElement(webdriver.By.css("button.btn.btn-block")).click();

  //figure out how to navigate to the hotel
//or
//download report and extract specific hotel
      
});

test.it("GPO-Settings", function(done, err) {
//go to https://salesnet.marriott.com/oys/ym/oy/OysController/pricing/grouppricing/setup
//seasons pull from extract
//click other business rules > zoom out > screenshot GPO business rules 
//screnshit seasons for hig low?  
});

test.it("Total-Hotel-Calendar", function(done, err) {
  //go to https://salesnet.marriott.com/oys/ym/oy/OysController/forecast/outlookPage
// click setup > Distressed Rooms Threshold --- can we get this somewher else???
//Do we need to pull shots of these graphs?
});

test.it("ICD-Dates", function(done, err) {
// go to https://extranet.marriott.com/hpp/rma/token-RUlEOmRya3ViMjk0O1BST1BFUlRZQ09ERTpNUllTSDtFUlM6ZmFsc2U7T0ZGRVJJRDo7/home.action?currentMarshaCode= + s
// go to https://extranet.marriott.com/hpp/rma/token-RUlEOmRya3ViMjk0O1BST1BFUlRZQ09ERTpQQUhDWTtFUlM6ZmFsc2U7T0ZGRVJJRDo7/preference/Preference_showDates
// zoom out 3x > screenshot
});

test.it("Land It", function(done, err) {
  
});

test.it("Land It", function(done, err) {
  
});

    });
  });
});
