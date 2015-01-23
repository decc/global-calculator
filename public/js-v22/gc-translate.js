/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */


function isValidLanguageID (languageID) {
  if (languageID == "en")	return true;
  //  if (languageID == "de")	return true;
  if (languageID == "po")	return true;
  if (languageID == "fr")	return true;
  if (languageID == "ch")	return true;
  if (languageID == "ba")	return true;
  return false;
}


function translate (txt) {

  var langIndex = getLangIndex (languageID);
  
  if (langIndex == -999) return txt;
  if (langIndex ==    0) return txt;

  for ( var i=0; i<translation_table_1.length; i++) 
    if (translation_table_1[i][0].toUpperCase() == txt.toUpperCase()) return translation_table_1[i][langIndex];
  
  return txt;
}

function getLangIndex (languageID) {
  if (languageID == "en") return 0;
  if (languageID == "po") return 1;
  if (languageID == "fr") return 2;
  if (languageID == "ch") return 3;
  if (languageID == "ba") return 4;
  return -999;
}


/*
function translate (txt) {

  var langIndex = getLangIndex (languageID);
  
  if (langIndex == -999) return txt;
  if (langIndex ==    0) return txt;

  for ( var i=0; i<texts.length; i++) 
   if (texts[i][0] == txt) return escape (texts[i][langIndex]);
  
  return txt;
}

function getLangIndex (languageID) {
  if (languageID == "en") return 0;
  if (languageID == "de") return 1;
  return -999;
}


function escape (txt) {

  var str = txt.replace("Ä", "&Auml;");
  str = str.replace("ä", "&auml;");
  str = str.replace("Ö", "&Ouml;");
  str = str.replace("ö", "&ouml;");

  str = str.replace("Ü", "&Uuml;");
  str = str.replace("ü", "&uuml;");
  
  return str;
}

var texts = [

["OVERVIEW", 	"&Uuml;BERBLICK"],
["ENERGY", 	"ENERGIE"],
["TRANSPORT", 	"TRANSPORT"],
["BUILDINGS", 	"GEBÄUDE"],
["MANUFACTURING", "PRODUKTION"],
["RESOURCES", 	"ROHSTOFFE"],
["ELECTRICITY", "ELEKTRIZITÄT"],
["GGR", 	"GGR"],
["CLIMATE", 	"KLIMA"],
["COSTS", 	"KOSTEN"],
["LIFESTYLE", 	"LEBENSSTIL"],

["Overview", 	"&Uuml;berblick"],
["Energy flows", "Energie-Fl&uuml;sse"],
["Transport", 	"Transport"],
["Buildings", 	"Geb&auml;ude"],
["Manufacturing", "Produktion"],
["Fossil fuels and other scarce resources", "Fossile Brennstoffe und andere knappe Rohstoffe"],
["Electricity balancing", "Elektrizit&auml;ts-Bilanz"],
["Speculative greenhouse gas removal", "Spekulative Entfernung von Treibhausgasen (GGR)"],
["Climate science & impacts", "Klima - Wissenschaft und Klimafolgen"],
["Costs", 	"Kosten"],
["Lifestyle", 	"Lebensstil"]

];

*/
