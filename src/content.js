function change_workbook(wb) {
  var values = new Array(); 
  $("table > tbody > tr").each(function () {
      //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
      values.push([$(this).find('th').eq(0).text()
      ,$(this).find('td').eq(0).text()])
  });
  // get the first worksheet
  var ws_name = wb.SheetNames[0];
  var ws = wb.Sheets[ws_name];

  // Change cell A1 to the text "HI"
  ws["C8"] = {
    t: 's', // <-- t: 's' indicates the cell is a text cell
    v: values[0]//"100" // <-- v holds the value
  };
}

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

        function s2ab(s) {
  
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
          
          }
    
          var url = chrome.runtime.getURL("templates/template.xlsx") //chrome.runtime.getURL("templates/GradeScope-Importer.xlsx")
          
          /* set up async GET request */
          var req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "arraybuffer";

          req.onload = function(e) {
            var data = new Uint8Array(req.response);
            var wb = XLSX.read(data, {type:"array"});
            test(wb);
          }
          function s2ab(s) {
            
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
            
          }

          function test(wb){
            //console.log(wb);
            //var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            change_workbook(wb);
            XLSX.writeFile(wb, "GradeScope-Importer.xlsx");
            //saveAs(new Blob([s2ab(wb)],{type:"application/octet-stream"}), 'test.xlsx');
          }
          req.send();
        // const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRElsU1CymovxcM9DEDIF5VJUtYFYik5RQhDkRuD1YuN7JuQnTVsld2STAvzUFv3XUAmbsOMvBN7Jm3/pub?output=xlsx";//"templates/GradeScope-Importer.xlsx";//chrome.runtime.getURL('templates/GradeScope-Importer.xlsx');
        // /* set up async GET request */
        // var req = new XMLHttpRequest();
        // req.open("GET", url, true);
        // req.responseType = "arraybuffer";
        // alert("Test");
        // req.onload = function(e) {
        //   alert("Test");
        //   var data = new Uint8Array(req.response);
        //   var wb = XLSX.read(data, {type:"array"});
        //   change_workbook(wb); // ***

        //   var wbout = XLSX.writeFile(wb, "new.xlsx");

        //   saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'new.xlsx');
        //   /* DO SOMETHING WITH workbook HERE */
        // }
        //var wb = XLSX.readFile('templates/GradeScope-Importer.xlsx');
        //var wb = XLSX.read('https://docs.google.com/spreadsheets/d/e/2PACX-1vRElsU1CymovxcM9DEDIF5VJUtYFYik5RQhDkRuD1YuN7JuQnTVsld2STAvzUFv3XUAmbsOMvBN7Jm3/pub?output=xlsx', {type: 'binary'});

        // change_workbook(wb); // ***

        // var wbout = XLSX.writeFile(wb, "new.xlsx");
        //var wb = XLSX.utils.book_new();
        
        
        // wb.Props = {
        //         Title: "SheetJS Tutorial",
        //         Subject: "Test",
        //         Author: "Red Stapler",
        //         CreatedDate: new Date(2017,12,19)
        // };
        // var values = new Array(); 
        // $("table > tbody > tr").each(function () {
        //     //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
        //     values.push([$(this).find('th').eq(0).text()
        //     ,$(this).find('td').eq(0).text()])
        // });

        // wb.SheetNames.push("Test Sheet");
        // var ws_data = values; //[['hello' , 'world']];
        // var ws = XLSX.utils.aoa_to_sheet(ws_data);
        // wb.Sheets["Test Sheet"] = ws;
        // var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        // function s2ab(s) {
  
        //         var buf = new ArrayBuffer(s.length);
        //         var view = new Uint8Array(buf);
        //         for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        //         return buf;
                
        // }

        // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
      
      }
    }
  );

// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert("Hello from your Chrome extension! " + firstHref)