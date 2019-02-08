var credentials = require('./login.json');
var geckodriver = require('geckodriver');
const fs = require("fs");
const testFolder = myDownloadFolder;

//credentials in app-env
// var eid = process.env.EID;
// var password = process.env.PASSWORD;
var eid = credentials.eid;
var password = credentials.password;
var url = "https://salesnet.marriott.com/oys/ym/oy/OysController/signIn";
var gpourl = "https://salesnet.marriott.com/oystotalyield/pricingclient/tyPricingClientContainerContent/displayTYPricingClientContainer";

var moment = require('moment');
var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var loginId = path.join(userName);


//require array
// var marsha = require("./data").marsha;
var marsha = require("./data.json");

//Webdriver setup
var assert = require("assert");
var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;
var test = require("selenium-webdriver/testing");
const timeOut = 35000;
var extract;
var firefox = require("selenium-webdriver/firefox");
var path = require("path");
var myDownloadFolder = path.normalize('C:/Users/' + loginId + '/Desktop/GPO ' + moment().format('MM-DD-YYYY') + '\\');

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

test.before(function () {

  var dir = 'C:/Users/' + loginId + '/Desktop/GPO ' + moment().format('MM-DD-YYYY') + '\\';

  !fs.existsSync(dir) && fs.mkdirSync(dir);
});


// //Build Webdriver with Firefox profile setup
test.describe("gpoShop", function () {
  test.before(function () {
    this.timeout(timeOut);
    driver = new webdriver.Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();
  });


  //Quit after last case finishes
  after(async () => driver.quit());


  //Login
  test.it("login successful", function () {
    this.timeout(timeOut);
    driver.get(url);
    driver.findElement(webdriver.By.name("username")).sendKeys(eid);
    driver.findElement(webdriver.By.name("password")).sendKeys(password);
    driver.findElement(webdriver.By.css("button.btn.btn-block")).click();
  });

  //Shop Loop
  test.describe("GpoShop", async function () {
    test.before(function () {
      this.timeout(timeOut);
      driver
        .manage()
        .window()
        .setSize(1360, 768);
    });

    marsha.forEach(s => {
      test.it(s + " Shop", function (done, err) {
        this.timeout(timeOut);
        driver.get(gpourl).then(_ =>
          driver
          .manage()
          .timeouts()
          .pageLoadTimeout(10000)
        );

        function handleFailure(err) {
          console.log("Something went wrong", err.stack);
          after();
        }

        driver.sleep(2000);

        var above = By.css("#uniqName_1_0-mode-above-property");
        driver
          .wait(
            until.elementLocated(
              By.css(
                "#uniqName_1_0-mode-above-property")
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath("//a[contains(@data-dojo-attach-event, 'click:_onSubmit')]")
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "//a[contains(@data-dojo-attach-event, 'click:_onPricingClick')]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "//a[@data-child-id='testPrice']"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
            elementWhichWasFound.clear();
            elementWhichWasFound.sendKeys("2");
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "//button[contains(.,'New')]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          });

        driver
          .wait(
            until.elementLocated(
              By.id(
                "dijit__WidgetsInTemplateMixin_1_propertyCode"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
            elementWhichWasFound.sendKeys(s)
              .then(driver.sleep(1000));
          });

        driver
          .findElement(
            By.xpath("//div[@id='widget_uniqName_1_2_arrivalDateEnd']/div")
          )
          .click()
          .then(_ =>
            driver
            .findElement(
              By.xpath(
                "//table[@id='uniqName_1_2_arrivalDateEnd_popup']/thead/tr[2]/th[3]/span"
              )
            )
            .click()
          )
          .then(_ =>
            driver
            .findElement(
              By.xpath(
                "//table[@id='uniqName_1_2_arrivalDateEnd_popup']/tbody/tr[6]/td[7]/span"
              )
            )
            .click()
          )
          .then(_ =>
            driver
            .findElement(
              By.xpath("//button[@type='submit'][contains(.,'Update')]")
            )
            .click()
          );

        //Scroll to bottom
        driver.sleep(2000);
        driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        driver.sleep(2000);

        var rooms = driver.findElement(By.xpath("(//input[@name='rooms'])[1]"));

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "(//input[@name='rooms'])[1]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
            elementWhichWasFound.clear();
            elementWhichWasFound.sendKeys("20");
          });

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "(//input[@name='rooms'])[2]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
            elementWhichWasFound.clear();
            elementWhichWasFound.sendKeys("20");
          });


          // Group 1
        var tues =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[1]//td[3]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        var fri =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[1]//td[6]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        var sun =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[2]//td[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        var tues2 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[2]//td[3]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        var fri2 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[2]//td[6]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        var sun2 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[3]//td[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
        
          // Group 2
          var tues3 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[3]//td[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var fri3 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[3]//td[5]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var sun3 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[4]//td[2]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var tues4 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[4]//td[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var fri4 =
          'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[4]//td[5]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          
          // Group 3
            var tues4 =
            'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[5]//td[3]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var wed4 =
            'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[5]//td[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var sun4 =
            'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[5]//td[5]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var tues5 =
            'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[5]//td[6]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
          var fri5 =
            'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[5]//td[7]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);';
 
            // 1ST 5 DAYS
        driver.executeScript(tues).then(function (return_value) {})
          .then(_ => driver.executeScript(fri).then(function (return_value) {}))
          .then(_ => driver.executeScript(sun).then(function (return_value) {}))
          .then(_ => driver.executeScript(tues2).then(function (return_value) {}))
          .then(_ => driver.executeScript(fri2).then(function (return_value) {}))
          .then(_ => driver.executeScript(sun2).then(function (return_value) {}));

        //2ND 5 DAYS
        // driver.executeScript(tues3).then(function (return_value) {})
        //   .then(_ => driver.executeScript(fri3).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(sun3).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(tues4).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(fri4).then(function (return_value) {}));

        // //3rd 5 DAYS
        // driver.executeScript(tues4).then(function (return_value) {})
        //   .then(_ => driver.executeScript(fri4).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(sun4).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(tues5).then(function (return_value) {}))
        //   .then(_ => driver.executeScript(fri5).then(function (return_value) {}));
       


        driver.sleep(1000);

        driver
          .wait(
            until.elementLocated(
              By.xpath(
                "//button[@type='button'][contains(.,'Get Recommendation')]"
              )
            ),
            10000
          )
          .then(elementWhichWasFound => {
            elementWhichWasFound.click();
          })
          .then(_ =>
            driver.sleep(5000))
          .then(_ =>
            checkBoxes())
          // .then(_ =>
          // waitForCheckboxes())
          .then(_ =>
            clickcompare())
          .then(_ =>
            driver.sleep(5000))

          .then(function () {
            driver
              .wait(
                until.elementLocated(
                  By.xpath(
                    "//span[@id='dijit_form_Button_7_label']"
                  )
                ),
                10000
              )
              .then(elementWhichWasFound => {
                elementWhichWasFound.click()
                  .then(function () {
                    driver.sleep(4000).then(function () {
                      const testFolder = myDownloadFolder;
                      const fs = require("fs");
            
                      //Checking for file in app downloads folder
                      fs.readdir(testFolder, (err, files) => {
                        files.forEach(file => {
                          if (file.indexOf(s) > -1) {
                            driver.sleep(1000);
                            console.log(file + " was successfully shopped");
                            return done();
                          } else {
    // console.log("Double Check " + file);
    return done();
                          }
                        });
                      });
                    });
                });
                 
        
        
        // works until last s
                test = function () {
                  const testFolder = myDownloadFolder;
                  const fs = require("fs");
        
                  //Checking for file in app downloads folder
                  fs.readdir(testFolder, (err, files) => {
                    files.forEach(file => {
                      if (file.indexOf(s) > -1) {
                        driver.sleep(1000);
                        console.log(file + " was saved");
                        return done();
                      } else {
console.log("Double Check " + file);
return done();
                      }
                    });
                  });
                };




              })
          })





        var checkbox1 = driver.findElement(By.xpath("(//input[@type='checkbox'])[7]"));
        var checkbox2 = driver.findElement(By.xpath("(//input[@type='checkbox'])[8]"));
        var checkbox3 = driver.findElement(By.xpath("(//input[@type='checkbox'])[9]"));

        checkBoxes = function () {

          driver
            .wait(
              until.elementLocated(
                By.xpath(
                  "(//input[@type='checkbox'])[7]"
                )
              ),
              10000
            )
            .then(elementWhichWasFound => {
              elementWhichWasFound.click();
            });

          driver
            .wait(
              until.elementLocated(
                By.xpath(
                  "(//input[@type='checkbox'])[8]"
                )
              ),
              10000
            )
            .then(elementWhichWasFound => {
              elementWhichWasFound.click();
            });

          driver
            .wait(
              until.elementLocated(
                By.xpath(
                  "(//input[@type='checkbox'])[9]"
                )
              ),
              10000
            )
            .then(elementWhichWasFound => {
              elementWhichWasFound.click();
            });
        }

        clickcompare = function () {
          driver
            .wait(
              until.elementLocated(
                By.xpath(
                  "//span[@id='dijit_form_Button_5_label']"
                )
              ),
              10000
            )
            .then(elementWhichWasFound => {
              elementWhichWasFound.click();
            });
        };
        // clickExport = function () {
        //   driver
        //     .wait(
        //       until.elementLocated(
        //         By.xpath(
        //           "//span[@id='dijit_form_Button_7_label']"
        //         )
        //       ),
        //       10000
        //     )
        //     .then(elementWhichWasFound => {
        //       elementWhichWasFound.click();
        //     })
        //     .then(function () {
        //       fs.readdir(testFolder, (err, files) => {
        //         files.forEach(file => {
        //           if (file.indexOf(s) > -1) {
        //             console.log(file + " was successfully pulled");

        //             // use those file and return it as a REST API
        //           } else if (file.indexOf(s) >= 0) {
        //             console.log("Shop for " + s + " failed.");
        //           }
        //         });
        //       })
        //     })
        // };

      
      });
    });
  });
});