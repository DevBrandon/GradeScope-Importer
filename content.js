chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var firstHref = $("a[href^='http']").eq(0).attr("href");
  
        //console.log("Hi" + firstHref);
        // for(i in)
        // var rows = document.getElementsByTagName("table")[0].rows;
        // var last = rows[rows.length - 1];
        // var cell = last.cells[0];
        // var value = cell.innerHTML;

        //var value = $('table tr:last td').text();
        var values = new Array(); 
        $("table > tbody > tr").each(function () {
            //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
            values.push([$(this).find('th').eq(0).text()
            ,$(this).find('td').eq(0).text()])
        });

        alert(values);
      }
    }
  );

// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert("Hello from your Chrome extension! " + firstHref)