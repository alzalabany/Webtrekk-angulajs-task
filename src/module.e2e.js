// Useing Nightwatch.js
/* eslint-disable */

let editButton = '//tr[1]//a[contains(string(), "Edit")]';
let deleteButton = '//tr[1]//button[contains(string(), "Delete")]';
let naviButton = '//tr[1]//a[contains(string(), "Navi")]';
let first_name = '//tr[1]//td[1]';
let last_name = '//tr[1]//td[2]';

module.exports = {
  'beforeEach': function(browser) {
    console.log('Setting up...');
    browser.execute('window.localStorage.clear').url('http://localhost:8080');
  },
  'Main Page loaded with initial state ordered by last_name': function(browser) {
    let client = browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .useXpath()
      .assert.containsText('//h1', 'Customer Overview')
      .assert.elementPresent('//table//tr[5]', 'initial state was loaded correctly with 5 rows')
      .expect.element(first_name)
      .text.to.equal('Eric');
  },
  'Navigation Transitions between pages': function(browser) {
    browser
      .useXpath()
      .click('//a[contains(string(), "new customer")]')
      .assert.urlContains('data/0')
      .assert.containsText('//h1', 'Create New User')
      .click('//button[contains(string(), "cancel")]') // go back
      .pause(200)
      .assert.urlContains('/')
      .assert.containsText('//h1', 'Customer Overview')
      .getText(first_name, function(first) {
        browser.getText(last_name, function(last) {
          browser
            .useXpath()
            .click(editButton) // edit button
            .assert.containsText('//h1', first.value+' '+last.value+' Details')
            .click('//button[contains(string(), "cancel")]')
            .assert.containsText('//h1', 'Customer Overview') // we are back to homepage..
            .useXpath()
            .click(naviButton) // edit button
            .assert.containsText('//h1', first.value+' '+last.value+' Navigation history')
            .click('//a[contains(string(), "back")]')
            .assert.containsText('//h1', 'Customer Overview'); // we are back to homepage..
        });
      });
  },
  'Testing Sorting by age': function(browser) {
    browser
      .useXpath()
      .assert.containsText('//*[@id="main_overview_table"]/tbody/tr[1]/td[2]', 'Adam', 'initial order is ASC by last_name')
      .click('//*[@id="main_overview_table"]/thead/tr/th[3]/a') // age
      .assert.containsText('//*[@id="main_overview_table"]/tbody/tr[1]/td[3]', '47', 'Orderd by Age DESC')
      .click('//*[@id="main_overview_table"]/thead/tr/th[3]/a') // age
      .assert.containsText('//*[@id="main_overview_table"]/tbody/tr[1]/td[3]', '20', 'Orderd by Age ASC');
  },
  'can Delete rows in main page': function(browser) {
      browser
      .useXpath()
      .click(deleteButton)
      .assert.elementNotPresent('//tr[5]', 'Delete button removed row')
      .assert.elementPresent('//tr[4]', 'state has 4 rows now')
      .assert.containsText('//tr[1]//td[2]', 'Cox', ' And still ordered by lastname') // after deleting Cox is first row
      .end();
  },
};

/* eslint-enable */
