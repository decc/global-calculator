// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var lifestyleSubscreenID  = 1;


// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
var homeSubNavID	= 1;
var travelSubNavID	= 1;
var dietSubNavID	= 1;


// ----------------------------------------------------------------------------
// id of the food consumption graph unit (grams, kcal)
// ----------------------------------------------------------------------------
var dietTableUnit = 1;


// ----------------------------------------------------------------------------
// handle the selection of the food consumption graph unit
// ----------------------------------------------------------------------------
function setDietTableUnit (id) {

  for ( var i=1; i<=2; i++)
    if (i==id) document.getElementById('diet-table-unit-' + i).className = 'selectedNavItem';
    else       document.getElementById('diet-table-unit-' + i).className = 'unselectedNavItem';

  dietTableUnit = id;

  initFoodCharts();
  updateFood();
}


// ----------------------------------------------------------------------------
// handle the selection of a 2nd level subscreen 
// ----------------------------------------------------------------------------
function handleLifestyle2ndLevelNavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('lifestyle-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-2ln-' + i).className = 'unselectedNavItem';

  lifestyleSubscreenID = activeId;

  var tableID = 'lifestyle-3rd-level-nav-table';

  if (activeId==1) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-home-subnav', travelSubNavID,  1, translate ('Temperature and size'));
    createSubNavItemRow (tableID, 'lifestyle-home-subnav', travelSubNavID,  2, translate ('Appliances'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

   handleHomeSubnavigation (homeSubNavID);
  }
  else if (activeId==2) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-travel-subnav', travelSubNavID,  1, translate ('Travel per person'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleTravelSubnavigation (travelSubNavID);
  }
  else if (activeId==3) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-diet-subnav', dietSubNavID,  1, translate ('Diet'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleDietSubnavigation (dietSubNavID);
  }
}

// -------------------------------------------------------------------
// Section Lifestyle Subsection Home
// -------------------------------------------------------------------
function handleHomeSubnavigation (activeId) {

  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('lifestyle-home-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-home-subnav-' + i).className = 'unselectedNavItem';
  
  homeSubNavID = activeId;

  deleteRows('lifestyle-screen-table');
  deleteRows('lifestyle-data-table');

  // -------------------------------------------------------------
  // Homes: Home Temp. and size
  // -------------------------------------------------------------
  if (activeId == 1) {

    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_home_temp_summer");
    newdiv2.setAttribute("id",  "container_lifestyle_home_temp_winter");
    newdiv3.setAttribute("id",  "container_lifestyle_home_size");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_home_temp_summer").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_home_temp_winter").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_home_size").setAttribute("style", "width:250px; height:310px");

    initHomeTempAndSizeCharts();
    updateHomeTempAndSizeCharts();

  }
  // -------------------------------------------------------------
  // Homes: Appliances
  // -------------------------------------------------------------
  else if (activeId == 2) {
    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_number_of_appliances");
    newdiv2.setAttribute("id",  "container_lifestyle_number_of_lightbulbs");
    newdiv3.setAttribute("id",  "container_lifestyle_energy_consumption");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_number_of_appliances").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_number_of_lightbulbs").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_energy_consumption").setAttribute("style", "width:250px; height:310px");

    initHomeAppliancesCharts();
    updateHomeAppliancesCharts();
  }



}

// -------------------------------------------------------------------
// Section Lifestyle Subsection Travel
// -------------------------------------------------------------------
function handleTravelSubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('lifestyle-travel-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-travel-subnav-' + i).className = 'unselectedNavItem';
  
  travelSubNavID = activeId;

  deleteRows('lifestyle-screen-table');
  deleteRows('lifestyle-data-table');

  var rowNode  = document.createElement("tr");
  addDivCell (rowNode, "container_lifestyle_distance_travelled_by_car");
  addDivCell (rowNode, "container_lifestyle_percent_km_travelled_by_car");
  addDivCell (rowNode, "container_lifestyle_cars_per_person");


  document.getElementById("lifestyle-screen-table").appendChild(rowNode);

  document.getElementById("container_lifestyle_distance_travelled_by_car").setAttribute("style", "width:250px; height:310px");
  document.getElementById("container_lifestyle_percent_km_travelled_by_car").setAttribute("style", "width:250px; height:310px");
  document.getElementById("container_lifestyle_cars_per_person").setAttribute("style", "width:250px; height:310px");

  initTravelSectionCharts();
  updateTravelSectionCharts();

}
// -------------------------------------------------------------------
// Section Lifestyle Subsection Diet
// -------------------------------------------------------------------
function handleDietSubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('lifestyle-diet-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-diet-subnav-' + i).className = 'unselectedNavItem';

  dietSubNavID = activeId;

  deleteRows('lifestyle-screen-table');
  deleteRows('lifestyle-data-table');

    var newdiv1 = document.createElement ('div');
    newdiv1.setAttribute("id",  "container_food_bioenergy_1");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_food_bioenergy_1").setAttribute("style", "width:600px; height:310px");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "left");
    cellNode.setAttribute("valign", "top");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Display values in "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'diet-table-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in grams");
    a.innerHTML = "grams";
    a.onclick = function() { setDietTableUnit(1); return false; };
    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));
    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'diet-table-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setDietTableUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);


    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "diet-info-txt");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "bottom");
    cellNode.setAttribute("align", "left");

    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);

    document.getElementById("diet-info-txt").innerHTML = translate ("The cereals, grains, sugar, fruit and vegetables, pulses and vegetable oil split is illustrative because the Global Calculator does not model this breakdown explicitly.  Rather, the Global Calculator models the total calories from these crops and makes a simple assumption about how this is split by type of crop.") + "<br><br>" + translate ("Mass includes the water in the produce, as defined by FAO Stat.");


    document.getElementById("lifestyle-data-table").setAttribute("style", "height:310px");
    document.getElementById("diet-info-txt").setAttribute("style", "width:130px");



    initFoodCharts();
    updateFood();

}


