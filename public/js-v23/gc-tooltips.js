/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */

function getToolTips (leverID) {

  // id, "Lever", "Situation today",  "Level 1 bubble text", "Level 2 bubble text", "Level 3 bubble text", "Level 4 bubble text"
  for ( var i=0; i<ds["lever_descriptions"]["tooltips"].length; i++) 
    if (ds["lever_descriptions"]["tooltips"][i][0] == leverID) return ds["lever_descriptions"]["tooltips"][i];
  return "TOOLTIPS NOT FOUND";
}


/*
// old version

function getToolTips (leverID) {
  for ( var i=0; i<ds["lever_descriptions"]["descriptions"].length; i++) 
    if (ds["lever_descriptions"]["descriptions"][i][0] == leverID) return ds["lever_descriptions"]["descriptions"][i];
  return "TOOLTIPS NOT FOUND";
}

*/
