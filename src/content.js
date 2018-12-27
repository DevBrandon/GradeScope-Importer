
// main method for this file
// Will read data from the html website and write it to the workbook
// @param wb : the input workbook to be edited that is preset with the categories
// @param list : the list of the different categories in order
function create_wb(wb, list) {
  var values = new Array(); 
  $("table > tbody > tr").each(function () {
      //alert($(this).find('th').eq(0).text() + " " + $(this).find('td').eq(0).text() + " " + $(this).find('td').eq(1).text() );
      values.push([$(this).find('th').eq(0).text()
      ,$(this).find('td').eq(0).text()]);
  });
  // get the first worksheet
  var ws_name = wb.SheetNames[0];
  var ws = wb.Sheets[ws_name];

  //Creating the categories to have their assignements added next
  createCategories(ws, list);

  // assign the values in the wb to the 
  // respective classes and grades
  values.forEach(function(pair, counter) {
    var assignment = pair[0];
    var grade_pair = pair[1].split("/");
    var grade = grade_pair.length === 1 ? "" : 100*(parseInt(grade_pair[0], 10)/parseInt(grade_pair[1], 10));
    ws["B" + (8 + counter)] = {
      t: 's', // t: 's' indicates the cell is a text cell
      v: assignment // v: holds the desired value
    };
    
    // TODO: add a switch statement or control method
    // that decides which column the grade should go in
    var column = findMatchIncludesCategories(assignment, list);
    console.log(assignment + " " + column);
    ws[column + (8 + counter)] = {
      t: 'n',
      v: grade
    };
  });
}

// compares the ele to each elements in the list and sees if
// the element is included within an element of the list
// if it is, return true, otherwise false
// all inputs are lowercased before the comparison
// @param ele: the element to check if it has the list elements in it
// @param list: the elements to check if they are in ele. 
//  These have to be extracted from the pair list
// @return the letter of the column to put the ele in.
//  If no element in list is in ele then the column is the last column
function findMatchIncludesCategories(ele, list){
  ele = ele.toLowerCase();
  var column = -1;
  list.some(function(pair, counterPair) {
    return pair[0].some(function(name) {
      name = name.toLowerCase();
      if (ele.includes(name) || name === "unknown"){
        column = String.fromCharCode('C'.charCodeAt() + counterPair);
        return true;
      };
      return false;
    });
  });

  return column;
}

// This function creates the categories that are in the wb
// This assigns the category names to the wb as well as the weights
function createCategories(ws, list){
  list.forEach(function(pair, counter){
    var name = pair[0][0];
    var weight = pair[1];
    //weight = (weight === 0.0 ? "" : weight);
    var column = String.fromCharCode('C'.charCodeAt() + counter);
    console.log(name + " " + column);
    ws[column + "6"] = {
      t: 's',
      v: name
    };
    ws[column + "7"] = {
      t: 'n',
      v: weight
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
            var categories = [
              [["Homework", "HW"], 0.01],
              [["Essay"], 0.1],
              [["Quiz","NP"], 0.005],
              [["Project"], 0.01],
              [["Mid-Term", "Midterm", "Mid-Term Exam", "Midterm Exam"], 0.235],
              [["Final", "Final Exam"], 0.395],
              [["Unknown", "Other"], 0.05]
            ];
            test(wb, categories);
          }


          function test(wb, list){
            //console.log(wb);
            //var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            create_wb(wb, list);
            XLSX.writeFile(wb, "GradeScope-Importer.xlsx");
            //saveAs(new Blob([s2ab(wb)],{type:"application/octet-stream"}), 'test.xlsx');
          }
          req.send();
      }
    }
  );