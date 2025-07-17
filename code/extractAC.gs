function extractAC(cvss3) {
  
  // The regular expression pattern to find "AV:" followed by one or more characters
  // that are not a forward slash, and then a forward slash.
  // The parentheses create a capturing group for the desired value.
  const regex = /AC:([^/]+)/;

  // Use the 'match' method on the string with the regex.
  // The 'match' method returns an array if a match is found, where the first element
  // is the full match, and subsequent elements are the captured groups.
  const match = cvss3.match(regex);
  var translatedValue = "";
  // Check if a match was found
  if (match) {
    // The extracted string is in the first capturing group (index 1 of the match array)
    const extractedString = match[1];
    //Logger.log("Extracted string: " + extractedString); // Logs "Extracted string: L" to the Apps Script log
    if (extractedString === 'L') {
        translatedValue = 'Low';
      } else if (extractedString === 'H') {
        translatedValue = 'High';
      }  else {
        translatedValue = "Unknown"; // Handle cases where the character is neither N nor L
      }
  } else {
    // If no match is found, log a message
    Logger.log("No match found for the pattern.");
  }
  return translatedValue;
}