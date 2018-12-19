
// main method for this file
// Will read data from the html website and write it to the workbook
function change_workbook(wb) {
  var values = new Array(); 
  $("table > tbody > tr").each(function () {
      //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
      values.push([$(this).find('th').eq(0).text()
      ,$(this).find('td').eq(0).text()]);
  });
  // get the first worksheet
  var ws_name = wb.SheetNames[0];
  var ws = wb.Sheets[ws_name];

  // assign the values in the wb to the 
  // respective classes and grades
  values.forEach(function(pair, counter) {
    var assignment = pair[0];
    var grade_pair = pair[1].split("/");
    var grade = grade_pair.length === 1 ? "" : parseInt(grade_pair[0], 10)/parseInt(grade_pair[1], 10);
    ws["B" + (8 + counter)] = {
      t: 's', // t: 's' indicates the cell is a text cell
      v: assignment // v: holds the desired value
    };
    
    // TODO: add a switch statement or control method
    // that decides which column the grade should go in
    var column = "F";
          if (assignment.includes("NP"))      { column = "E" }
    else  if (assignment.includes("HW"))      { column = "C" }
    else  if (assignment.includes("Midterm")) { column = "G" }
    console.log(column);
    ws[column + (8 + counter)] = {
      t: 's',
      v: grade
    };
  });
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