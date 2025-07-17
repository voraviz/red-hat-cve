function getAdvisoryTitle(rhsa){
  // rhsa = "RHSA-2022:6155"
  var url = "https://access.redhat.com/hydra/rest/securitydata/csaf/" + rhsa + ".json";
  var response = UrlFetchApp.fetch(url);
  var json = JSON.parse(response.getContentText());
  Logger.log("RHSA: "+rhsa);
  Logger.log("Title: "+json.document.title);
  if (json.document.title.length>0){
  return json.document.title;
  }else{
    return "";
  }

}