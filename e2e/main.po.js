/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.customerEl = element(by.model('customer.name'));
    this.productEl = element(by.model('customer.product'));
    this.cryptographyAdviceProduct = element(by.cssContainingText('option', 'Cryptography advice'));
    this.addButtonEl =  element(by.buttonText('Add'));

    this.removeButtonEl =  element(by.buttonText('Remove'));
    this.serveButtonEl =  element(by.buttonText('Served'));

    this.customerQueuedList = element.all(by.css('.Queue-customer-list customer'));

    this.customerServedList = element.all(by.css('.Queue-customer-served-list customer'));
};

module.exports = new MainPage();

