function batch_change() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("rhel8-nodejs-20-trivy");
  var lastRow = sheet.getLastRow(); // Get the last row with any content in the sheet
  var values = sheet.getRange("A3:A" + lastRow).getValues(); 
  Logger.log("Last row is "+lastRow);
  for (var row = 0; row < lastRow-2; row++){
      Logger.log("Process row no."+row+ " for " + values[row]); // Log the value
      if (values[row] !== undefined  ) { 
          getData(sheet,row+3,values[row]);
      }else{
         Logger.log("Row "+row+" is undefined or blank");
      }
  }
}
function check_json(attribute){
  if (attribute == undefined) {
    return ""
  }else{
    return attribute;
  }
}