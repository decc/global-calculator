// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var landSubscreenID  = 1;


// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
var landuseNavID	= 1;
var yieldsSubNavID	= 1;
var farmingSubNavID	= 1;
var foodSankeySubNavID	= 1;


// ----------------------------------------------------------------------------
// id of the football pitch graph unit (kg, kcal)
// ----------------------------------------------------------------------------
var footballPitchUnit = 1;


// ----------------------------------------------------------------------------
// handle the selection of the football pitch graphunit
// ----------------------------------------------------------------------------
function setFootballPitchUnit (id) {

  for ( var i=1; i<=2; i++)
    if (i==id) document.getElementById('football-pitch-unit-' + i).className = 'selectedNavItem';
    else       document.getElementById('football-pitch-unit-' + i).className = 'unselectedNavItem';

  footballPitchUnit = id;

  initLandYieldCharts(footballPitchUnit)
  updateLandYields(footballPitchUnit);
}


// ----------------------------------------------------------------------------
// handle the selection of a 2nd level subscreen 
// ----------------------------------------------------------------------------
function handleLand2ndLevelNavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('land-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('land-2ln-' + i).className = 'unselectedNavItem';

  landSubscreenID = activeId;

  var tableID = 'land-3rd-level-nav-table';


  if (activeId==1) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'land-landuse-subnav', landuseNavID,  1, translate ('Land use'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleLanduseSubnavigation (landuseNavID);
  }
  else if (activeId==2) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'land-yields-subnav', yieldsSubNavID,  1, translate ('Yields'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleYieldsSubnavigation (yieldsSubNavID);
  }
  else if (activeId==3) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'land-farming-practices-subnav', farmingSubNavID,  1, translate ('Farming practices'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleFarmingPracticesSubnavigation (farmingSubNavID);
  }
/*
  else if (activeId==4) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'land-food-sankey-subnav', foodSankeySubNavID,  1, 'Food sankey');
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleFoodSankeySubnavigation (foodSankeySubNavID);
  }
*/
}



// -------------------------------------------------------------------
// Section Land Subsection Land use
// -------------------------------------------------------------------
function handleLanduseSubnavigation (activeId) {

  //alert ("handleLanduseSubnavigation " + activeId);

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('land-landuse-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('land-landuse-subnav-' + i).className = 'unselectedNavItem';
  
  landuseNavID = activeId;

  deleteRows('land-content-table');
  deleteRows('land-content-table-2');

  if (activeId==1) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_land_overview");

    document.getElementById("land-content-table").appendChild(rowNode);

    document.getElementById("container_land_overview").setAttribute("style", "width:670px; height:310px");

    initLandCharts();
    updateLand();
  }

}
// -------------------------------------------------------------------
// Section Land Subsection Yields
// -------------------------------------------------------------------
function handleYieldsSubnavigation (activeId) {

//  alert ("handleYieldsSubnavigation " + activeId);

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('land-yields-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('land-yields-subnav-' + i).className = 'unselectedNavItem';
  
  yieldsSubNavID = activeId;

  deleteRows('land-content-table');
  deleteRows('land-content-table-2');
  document.getElementById("land-content-table-2").setAttribute("style", "width:0px");


  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_land_yields_football_pitch");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("land-content-table").appendChild(rowNode);

    document.getElementById("container_land_yields_football_pitch").setAttribute("style", "width:730px; height:310px");

    initLandYieldCharts(footballPitchUnit)
    updateLandYields(footballPitchUnit);



    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "left");
    cellNode.setAttribute("valign", "top");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode(translate("Display values in") + " "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', translate("Display values in") + " " +  translate("kg"));
    a.innerHTML = translate("kg");
    a.onclick = function() { setFootballPitchUnit(1); return false; };

    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));

    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', translate("Display values in") + " " +  translate("kcal"));
    a.innerHTML = translate("kcal");
    a.onclick = function() { setFootballPitchUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);
    document.getElementById("land-content-table-2").appendChild(rowNode);


    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "football-pitch-info-txt-x");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "bottom");
    cellNode.setAttribute("align", "left");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("land-content-table-2").appendChild(rowNode);

    document.getElementById("football-pitch-info-txt-x").innerHTML = translate("The Global Calculator makes the simple assumption that yields by kcal for cereals, grains, sugar, fruit and vegetables, pulses and vegetable oil are the same. However the yields by kg for these foods differ because they have different water contents.") + "<br><br>" + translate("Mass includes the water in the produce, as defined by UN Food and Agriculture Organisation Stat.");

    document.getElementById("land-content-table-2").setAttribute("style", "height:310px");
    document.getElementById("football-pitch-info-txt-x").setAttribute("style", "width:130px");

  }
}
// -------------------------------------------------------------------
// Section Land Subsection Farming practices
// -------------------------------------------------------------------
function handleFarmingPracticesSubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('land-farming-practices-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('land-farming-practices-subnav-' + i).className = 'unselectedNavItem';
  
  farmingSubNavID = activeId;

  deleteRows('land-content-table');
  deleteRows('land-content-table-2');

  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_land_yields_grain_fed");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("land-content-table").appendChild(rowNode);

    document.getElementById("container_land_yields_grain_fed").setAttribute("style", "width:670px; height:310px");

    initLandGrainFedCharts();
    updateLandGrainFedCharts();

  }
}

/*
function handleFoodSankeySubnavigation (activeId) {


  deleteRows('land-content-table');
  deleteRows('land-content-table-2');


  var rowNode  = document.createElement("tr");
  addDivCell (rowNode, "container_food_sankey");
  document.getElementById("land-content-table").appendChild(rowNode);

  document.getElementById("container_food_sankey").setAttribute("style", "width:530px; height:310px");
  document.getElementById("container_food_sankey").innerHTML = "<br><br<br<br<br>This section is under construction";
}
*/

