/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */


function isValidLanguageID (languageID) {
  if (languageID == "en")	return true;
  if (languageID == "ch")	return true;
  if (languageID == "po")	return true;
  if (languageID == "ba")	return true;

  // if (languageID == "fr")	return true;
  // if (languageID == "ru")	return true;
  if (languageID == "sp")	return true;

  return false;
}

function myTrim(x) {
  if (x==null) return "";
  return x.replace(/^\s+|\s+$/gm,'');
}

function translate (txt) {

//  alert (txt);
  if (txt==null) return "";
  

  if (languageID == "en") return txt;

  if (languageID == "ch") {
    for ( var i=0; i<mandarin_translation_table_1.length; i++) 
      if (myTrim (mandarin_translation_table_1[i][0].toUpperCase()) == myTrim (txt.toUpperCase()) ) return myTrim (mandarin_translation_table_1[i][1]);

    for ( var i=0; i<mandarin_translation_table_2.length; i++) 
      if (myTrim (mandarin_translation_table_2[i][0].toUpperCase()) == myTrim (txt.toUpperCase()) ) return myTrim (mandarin_translation_table_2[i][1]);
  }


  return translateFromMultiTable (txt);
}


function translateFromMultiTable (txt) {

  var langIndex = getLangIndex (languageID);
  
  if (langIndex == -999) return txt;
  if (langIndex ==    0) return txt;

  for ( var i=0; i<multi_translation_table_1.length; i++) 
    if (myTrim (multi_translation_table_1[i][0]) == myTrim (txt)) return myTrim (multi_translation_table_1[i][langIndex]);
  //  if (myTrim (multi_translation_table_1[i][0].toUpperCase()) == myTrim (txt.toUpperCase())) return myTrim (multi_translation_table_1[i][langIndex]);
  
  return txt;
}

function getLangIndex (languageID) {
  if (languageID == "en") return 0;
  if (languageID == "po") return 1;
  if (languageID == "ba") return 2;
  if (languageID == "fr") return 3;
  if (languageID == "ru") return 4;
  if (languageID == "sp") return 5;
  return -999;
}


