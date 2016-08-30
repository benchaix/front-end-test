// spec.js
describe('Protractor Queue App', function() {
    var page;

    beforeEach(function () {
        browser.get('http://127.0.0.1:1337/index.html');
        page = require('./main.po');
    });

    it('should have a title', function() {
        browser.get('http://127.0.0.1:1337/index.html');
        expect(browser.getTitle()).toEqual('Queue App');
    });

    describe('add customer to queue', function () {
        it('should add a customer to queue', function (){
            page.customerQueuedList.count().then(function (startCount) {
                page.customerEl.sendKeys('Hillary C.');
                page.cryptographyAdviceProduct.click();
                page.addButtonEl.click();
                expect(page.customerQueuedList.count()).toBe(startCount + 1);
            });
        });
    });

    describe('remove customer from queue', function () {

        it('should have customer in queue', function () {
            expect(page.customerQueuedList.count()).not.toBe(0);
        });
        it('should remove a customer from queue', function (){
            page.customerQueuedList.count().then(function (startCount) {
                page.removeButtonEl.click();
                expect(page.customerQueuedList.count()).toBe(startCount - 1);
            });
        });

        it('should have customer in queue', function () {
            expect(page.customerQueuedList.count()).not.toBe(0);
        });
        it('should serves a customer', function (){
            page.customerQueuedList.count().then(function (queueCount) {
                page.customerServedList.count().then(function (servedCount) {
                    page.serveButtonEl.click();
                    expect(page.customerQueuedList.count()).toBe(queueCount - 1);
                    expect(page.customerServedList.count()).toBe(servedCount + 1);
                });
            });
        });
    });
});
