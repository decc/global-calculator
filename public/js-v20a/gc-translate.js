/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */

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


function translate (txt) {

  var langIndex = getLangIndex (languageID);
  
  if (langIndex == -999) return txt;
  if (langIndex ==    0) return txt;

  for ( var i=0; i<texts.length; i++) 
   if (texts[i][0] == txt) return escape (texts[i][langIndex]);
  
  return txt;
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
