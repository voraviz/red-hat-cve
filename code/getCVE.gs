function getCVE(cve) {
      Logger.log("CVE:" + cve); // Log the value
      var url = "https://access.redhat.com/hydra/rest/securitydata/cve/" + cve + ".json";
      Logger.log("URL: "+url)
      try{
        var response = UrlFetchApp.fetch(url);
        Logger.log("Response Code: "+response.getResponseCode());
        return JSON.parse(response.getContentText());
      }catch (error){
        Logger.log(error);
        return undefined;
      }
}
