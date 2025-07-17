function getData(sheet,row,cve) {
      var json = getCVE(cve);
      if(json === undefined){
         Logger.log("CVE: "+cve+" is not found");
         return;
      }
      Logger.log("Publish Date: "+json.public_date.substring(0, json.public_date.indexOf("T")));
      sheet.getRange(row,2).setValue(json.public_date.substring(0, json.public_date.indexOf("T")));
      if( json.cvss3 !== undefined){        
        sheet.getRange(row,3).setValue(json.cvss3.cvss3_base_score);
        Logger.log("CVSS3 Score: "+json.cvss3.cvss3_base_score);
        sheet.getRange(row,4).setValue(json.cvss3.cvss3_scoring_vector);
        Logger.log("Scoring Vector: "+json.cvss3.cvss3_scoring_vector);
        const av = extractAV(json.cvss3.cvss3_scoring_vector);
        sheet.getRange(row,5).setValue(av);
        Logger.log("Attack Vector: "+av);
        const ac = extractAC(json.cvss3.cvss3_scoring_vector);
        sheet.getRange(row,6).setValue(ac);
        Logger.log("Attack Complexity: "+ac);
        const pr = extractPRandCIA(json.cvss3.cvss3_scoring_vector,'PR');
        sheet.getRange(row,7).setValue(pr);
        Logger.log("Priviledges Required: "+pr);
        const ui = extractUI(json.cvss3.cvss3_scoring_vector);
        sheet.getRange(row,8).setValue(ui);
        Logger.log("User Interaction: "+ui);
        const scope = extractScope(json.cvss3.cvss3_scoring_vector);
        sheet.getRange(row,9).setValue(scope);
        Logger.log("Scope: "+scope);
        const confidentiality = extractPRandCIA(json.cvss3.cvss3_scoring_vector,'C');
        sheet.getRange(row,10).setValue(confidentiality);
        Logger.log("Confidentiality: "+confidentiality);
        const intrigrity = extractPRandCIA(json.cvss3.cvss3_scoring_vector,'I');
        sheet.getRange(row,11).setValue(intrigrity);
        Logger.log("Intrigrity: "+intrigrity);    
        const availability = extractPRandCIA(json.cvss3.cvss3_scoring_vector+'/','A');
        sheet.getRange(row,12).setValue(availability);
        Logger.log("Availability: "+availability);  
        sheet.getRange(row,13).setValue(json.cvss3.status);
        Logger.log("Status: "+json.cvss3.status);

      }
      sheet.getRange(row,14).setValue(json.threat_severity);
      sheet.getRange(row,15).setValue(json.statement);
      if(json.mitigation !== undefined){
        sheet.getRange(row,16).setValue(json.mitigation.value)
      }
      var packages = ["Red Hat Enterprise Linux 6","Red Hat Enterprise Linux 7","Red Hat Enterprise Linux 8","Red Hat Enterprise Linux 9","Red Hat Enterprise Linux 10","Red Hat OpenShift Container Platform 4"]
      const packageMap = createMap(packages,17);
      var packages_state = json.package_state;
      Logger.log("====== Packages ======");
      for (var i = 0; i < packages_state.length; i++) {
        if(packageMap.has(packages_state[i].product_name)){
            var index = packageMap.get(packages_state[i].product_name);
            var fix_state = packages_state[i].fix_state;
            sheet.getRange(row,index).setValue(fix_state);
            Logger.log(packages_state[i].product_name+": "+fix_state);
        }
      }
      var products = ["Red Hat Enterprise Linux 6","Red Hat Enterprise Linux 7","Red Hat Enterprise Linux 8","Red Hat Enterprise Linux 9","Red Hat Enterprise Linux 10","Red Hat OpenShift Container Platform 4.12","Red Hat OpenShift Container Platform 4.13","Red Hat OpenShift Container Platform 4.14","Red Hat OpenShift Container Platform 4.15","Red Hat OpenShift Container Platform 4.16","Red Hat OpenShift Container Platform 4.17","Red Hat OpenShift Container Platform 4.18","Red Hat OpenShift Container Platform 4.19","Red Hat OpenShift Container Platform 4.20"]
      const productMap = createMap(products,23);
      var releases = json.affected_release;
      Logger.log("====== RHSA ======");
      if(releases != null){
        for (var i = 0; i < releases.length; i++) {
          if(productMap.has(releases[i].product_name)){
              var index = productMap.get(releases[i].product_name);
              var rhsa = releases[i].advisory;
              Logger.log(releases[i].product_name+": "+rhsa)
              var rhsa_link = "=HYPERLINK(\"https://access.redhat.com/errata/"+rhsa+"\",\""+rhsa+"\")";
              sheet.getRange(row,index).setValue(rhsa_link);
          }
       }  
      }
}


