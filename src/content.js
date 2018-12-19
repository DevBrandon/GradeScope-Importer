//this is the method used to create the wb file and populate it
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        // var values = new Array(); 
        // $("table > tbody > tr").each(function () {
        //     //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
        //     values.push([$(this).find('th').eq(0).text()
        //     ,$(this).find('td').eq(0).text()])
        // });

        // alert(values);

        //new File([file], file.name)
        var wb = XLSX.utils.book_new();
        wb.Props = {
                Title: "SheetJS Tutorial",
                Subject: "Test",
                Author: "Red Stapler",
                CreatedDate: new Date(2017,12,19)
        };
        var values = new Array(); 
        $("table > tbody > tr").each(function () {
            //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
            values.push([$(this).find('th').eq(0).text()
            ,$(this).find('td').eq(0).text()])
        });

        wb.SheetNames.push("Test Sheet");
        var ws_data = values; //[['hello' , 'world']];
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["Test Sheet"] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        function s2ab(s) {
  
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
                
        }
        //alert(values);
        // $("#clickme").click(function(){
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
        // });
      }
    }
  );

// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert("Hello from your Chrome extension! " + firstHref)