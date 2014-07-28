describe("zones", function () {
  beforeEach(function() {
    browser.get('/');
  });

  it("sydney 10:00 pm > london 01:00 pm", function() {
    var timeFrom = element(by.model('timeFrom'));
    var zoneFrom = element(by.model('zoneFrom'));

    timeFrom.sendKeys('1000pm');
    zoneFrom.sendKeys('Australia/Sydney');

    var timeTo = element(by.model('timeTo'));
    var zoneTo = element(by.model('zoneTo'));

    zoneTo.sendKeys('Europe/London');

    expect(timeTo.getAttribute('value')).toEqual('01:00 pm');
  });
});
