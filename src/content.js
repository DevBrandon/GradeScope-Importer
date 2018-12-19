
// main method for this file
// Will read data from the html website and write it to the workbook
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

// listener to call background.js
// TODO: remove the test method and replace with a dynamic template
// during wb creation
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
    
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

          function test(wb){
            //console.log(wb);
            //var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            change_workbook(wb);
            XLSX.writeFile(wb, "GradeScope-Importer.xlsx");
            //saveAs(new Blob([s2ab(wb)],{type:"application/octet-stream"}), 'test.xlsx');
          }
          req.send();
      }
    }
  );