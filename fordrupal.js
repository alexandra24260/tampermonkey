// ==UserScript==
// @name Credits rating (D.Org)
// @namespace http://tampermonkey.net/
// @version 0.1
// @description Provides rating column on credets page at Drupal.Org.
// @author alexandra_vecher
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @match https://www.drupal.org/node/2114867/issue-credits*
// @grant none
// ==/UserScript==
(function($) {
    'use strict';
    let credits = [];
    const currentPage = $('.pager .pager-current').text();
    const endIndex = $(".pager li").last();
    const lastItemIndex = $( ".pager > .pager-item" ).last().index();
    const currentItemIndex = $( ".pager > .pager-current" ).index();
    const index = lastItemIndex > currentItemIndex ? lastItemIndex : currentItemIndex;
                const creditsHeader = ['Module name', 'Task', 'Link', 'Date'];
    const allCounts = $( ".pager > li" ).eq(index).text();
    credits[index] = [];
    $('.view-content h3').each(function() {
        let moduleName = $(this).text();
        $(this).next("ul").find('li').each(function() {
            let issue = $(this).find('a');
            let link = $(issue).attr('href');
            let task = $(issue).text();
            let date = $(this).find("span.views-field-changed").text();
            let strictDate = date.split('at')[0];
            let parseDate = Date.parse(strictDate);
            var formatDate = new Date(parseDate).toLocaleDateString("en-US")
            credits[index].push([ moduleName, task, 'drupal.org' + link, formatDate]);
        });
    });
    let pageCredits = JSON.parse(localStorage.getItem("credits"));
    if( pageCredits ){
       pageCredits.push(credits[index]);
       localStorage.setItem("credits", JSON.stringify(pageCredits));
   }
       else {
          localStorage.setItem("credits", JSON.stringify(credits));
       }
    const $button = $('<fieldset><h2>Step #1 : Please click on all 4 pages to update creadit history</h2><h2> Step #2: Click Download</h2><button>download</button></fieldset>').insertAfter('.view-header');
    $button.click(function() {
    let allCreditesPages = JSON.parse(localStorage.getItem("credits"));
    let allCreditesPagesClear = allCreditesPages.flat(1);
    let csvContentTest = allCreditesPagesClear.join("\n");
    var csvData = new Blob([csvContentTest], { type: 'text/csv' });
   var csvUrl = URL.createObjectURL(csvData);
    const link = window.document.createElement("a");
    link.setAttribute("href", csvUrl);
    link.setAttribute("download", "credites.csv");
   link.click();
    });
})(jQuery);
