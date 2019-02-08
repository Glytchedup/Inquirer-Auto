// Wrong
var los = driver.findElement(
  By.xpath(
    "//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"
  )
);
driver
  .wait(
    until.elementLocated(
      By.xpath(
        "//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"
      )
    ),
    10000
  )
  .then(_ => los.click());
los.clear(); // los doesn't exist here because it is not found yet (js is async)
los.sendKeys("2"); // los doesn't exist here because it is not found yet (js is async)


// Correct
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
    // only here element we was searching by xpath exsists
    elementWhichWasFound.click();
    elementWhichWasFound.clear();
    elementWhichWasFound.sendKeys("2");
  });