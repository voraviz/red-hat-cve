function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Input"); // Replace "Sheet1" with the actual sheet name
  var editedRange = e.range;
  if(editedRange.getColumn() === 1){
    var row = editedRange.getRow();
    var cve = editedRange.getValue();
    Logger.log("CVE: "+cve);
    getData(sheet,row,cve);
  }  
}
