(function($) {
    'use strict';
    var credites = [];
    $('h3').each(function() {
        let moduleName = $(this).text();
        /*    let sibling = $(this).next("ul").html();
            let link = $(sibling).find("a").attr('href');
            let task = $(sibling).find("a").text();
            let date = $(sibling).find("span.views-field-changed").text();
            credites.push(['', moduleName, task, link, date]);*/
        $(this).next("ul a").each(function() {
            ;
            let link = $(this).attr('href');
            let task = $(this).text();
            let date = $(this).find("span.views-field-changed").text();
            credites.push(['', moduleName, task, link, date]);
        });
    });
    localStorage.setItem("credits", credites);
    console.log(JSON.stringify(credites, null, 4));
    $('<fieldset><h2>Step #1 : Please click on all 4 pages to update creadit history</h2><h2> Step #2: Click Download</h2><button id="download" value="Download CSV">Download CSV</button></fieldset>').insertAfter('.view-header')
    var csvContent = credites.join("\n");
    var link = window.document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
    link.setAttribute("download", "upload_data.csv");
    link.click();
})(jQuery);
