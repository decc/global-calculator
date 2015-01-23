var actCFPIndex = 0; // store index of selected counterfactual pathway


var overviewSubscreenID   = 1;
var technologySubscreenID = 1;
var lifestyleSubscreenID  = 1;

var energySubNavID 	= 1;
var emissionSubNavID 	= 1;
var costSubNavID 	= 1;

var transportSubNavID	= 1;
var buildingsSubNavID 	= 1;
var manufacturingSubNavID = 1;
var electricitySubNavID = 1;
var bioenergySubNavID = 1;
var fossilFuelSubNavID = 1;
var ggrSubNavID = 1;


var homeSubNavID	= 1;
var travelSubNavID	= 1;
var dietSubNavID	= 1;


function handleTechnology2ndLevelNavigation (activeId) {
  for ( var i=1; i<=7; i++)
    if (i==activeId) document.getElementById('technology-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-2ln-' + i).className = 'unselectedNavItem';

  technologySubscreenID = activeId;

  var tableID = 'technology-3rd-level-nav-table';
  deleteRows(tableID);

  if (activeId==1) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  1, 'Overview');
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  2, 'Cars - technology and fuel');
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  3, 'Mode');
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  4, 'Fuel type');
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  5, 'Freight by load');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleTransportSubnavigation (transportSubNavID);
  } 
  else if (activeId==2) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  1, 'Energy use');
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  2, 'Insulation and technology');
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  3, 'Fuel type');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleBuildingsSubnavigation (buildingsSubNavID);
  } 


  else if (activeId==3) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  1, 'Overview');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  2, 'Sales of products');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  3, 'Iron and steel');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  4, 'Aluminium');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  5, 'Chemicals');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  6, 'Paper & other');
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  7, 'Cement');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleManufacturingSubnavigation (manufacturingSubNavID);
  } 
  
  else if (activeId==4) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-electricity-subnav', electricitySubNavID,  1, 'Electricity');
    createSubNavItemRow (tableID, 'technology-electricity-subnav', electricitySubNavID,  2, 'Uranium');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleElectricitySubnavigation (electricitySubNavID);
  } 
  else if (activeId==5) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-bioenergy-subnav', bioenergySubNavID,  1, 'Bioenergy');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleBioenergySubnavigation (bioenergySubNavID);
  } 
    
  else if (activeId==6) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  1, 'Oil');
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  2, 'Gas');
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  3, 'Coal');

    document.getElementById(tableID).setAttribute("style", "width:150px");
    handleFossilFuelSubnavigation (fossilFuelSubNavID);
  } 
  
     

}
function handleFossilFuelSubnavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('technology-fossilFuel-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-fossilFuel-subnav-' + i).className = 'unselectedNavItem';

  fossilFuelSubNavID = activeId;

  deleteRows('technology-content-table');

  if (false) {
  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }
}


function handleBioenergySubnavigation (activeId) {
  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('technology-bioenergy-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-bioenergy-subnav-' + i).className = 'unselectedNavItem';

  bioenergySubNavID = activeId;

  deleteRows('technology-content-table');

  if (false) {
  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }
}


function handleElectricitySubnavigation (activeId) {
  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('technology-electricity-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-electricity-subnav-' + i).className = 'unselectedNavItem';

  electricitySubNavID = activeId;

  deleteRows('technology-content-table');

  if (false) {
  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }
}

function handleManufacturingSubnavigation (activeId) {
  for ( var i=1; i<=7; i++)
    if (i==activeId) document.getElementById('technology-manufacturing-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-manufacturing-subnav-' + i).className = 'unselectedNavItem';

  manufacturingSubNavID = activeId;

  deleteRows('technology-content-table');

  if (activeId==1) {

    var tableNode1  = document.createElement("table");

    var rowNode1  = document.createElement("tr");

    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "2");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Energy consumption"));
    rowNode1.appendChild(cellNode);
    tableNode1.appendChild(rowNode1);

    rowNode1  = document.createElement("tr");
    addDivCell (rowNode1, "container_manufacturing_energy_consumption_observed");
    addDivCell (rowNode1, "container_manufacturing_energy_consumption_projected");
    tableNode1.appendChild(rowNode1);

    var rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "10px";
    rowNode.appendChild(cellNode);

    rowNode.appendChild(tableNode1);
    addDivCell (rowNode, "container_materials_2");

    document.getElementById("technology-content-table").appendChild(rowNode);


    document.getElementById("container_manufacturing_energy_consumption_observed").setAttribute("style", "width: 180px; height: 280px");
    document.getElementById("container_manufacturing_energy_consumption_projected").setAttribute("style", "width: 220px; height: 280px");
    document.getElementById("container_materials_2").setAttribute("style", "width: 330px; height: 310px");


    initMaterialsCharts();
    updateManufacturing();

  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }
}


function handleBuildingsSubnavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('technology-buildings-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-buildings-subnav-' + i).className = 'unselectedNavItem';

  buildingsSubNavID = activeId;

  deleteRows('technology-content-table');

  if (activeId==1) {

    var tableNode1  = document.createElement("table");

    var rowNode1  = document.createElement("tr");
    addDivCell (rowNode1, "container_buildings_1");
    tableNode1.appendChild(rowNode1);




    var tableNode  = document.createElement("table");
    tableNode.setAttribute("border", "0");
    tableNode.setAttribute("style", "border-collapse: collapse; margin: 1em;");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Population and urbanisation"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "5px";
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    appendDataTableRow ('Global population', 	'buildings_global_population', tableNode);
    appendDataTableRow ('Urbanisation', 	'buildings_urbanization', tableNode);
    appendDataTableRow ('Urban households', 	'buildings_urban_households', tableNode);
    appendDataTableRow ('Rural households', 	'buildings_rural_households', tableNode);
    appendDataTableRow ('Households with electricity', 	'buildings_households_with_electricity', tableNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode1);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.style.width = "40px";
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode);
    rowNode.appendChild(cellNode);


    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_buildings_1").setAttribute("style", "width: 330px; height: 310px");

    initBuildingsCharts();
    updateBuildings();

  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }
}

function showUnderConstructionMessage(tableID) {

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.style.height = "25px";
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.appendChild(document.createTextNode("THIS SECTION WILL BE AVAILABLE IN A LATER VERSION OF THE GLOBAL CALCULATOR"));
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.style.height = "25px";
    rowNode.appendChild(cellNode);
    document.getElementById(tableID).appendChild(rowNode);
}


function handleTransportSubnavigation (activeId) {

  for ( var i=1; i<=5; i++)
    if (i==activeId) document.getElementById('technology-transport-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-transport-subnav-' + i).className = 'unselectedNavItem';

  transportSubNavID = activeId;

  deleteRows('technology-content-table');



  if (activeId==1) {

    var tableNode1  = document.createElement("table");
  //  tableNode1.setAttribute("is", "tc-diagram-table");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "2");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("All transport energy demand"));
    rowNode.appendChild(cellNode);
    tableNode1.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_transport_energy_demand_observed");
    addDivCell (rowNode, "container_transport_energy_demand_projected");
    tableNode1.appendChild(rowNode);






    var tableNode  = document.createElement("table");
    tableNode.setAttribute("border", "0");
    tableNode.setAttribute("style", "border-collapse: collapse; margin: 1em;");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Number of vehicles (1000s) - Passenger"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "5px";
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    appendDataTableRow ('Light road', 	'passenger_light_road', tableNode);
    appendDataTableRow ('Heavy road', 	'passenger_heavy_road', tableNode);
    appendDataTableRow ('Rail', 	'passenger_rail', tableNode);
    appendDataTableRow ('Plane', 	'passenger_plane', tableNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "15px";
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Number of vehicles (1000s) - Freight"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "5px";
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    appendDataTableRow ('Light road', 	'freight_light_road', tableNode);
    appendDataTableRow ('Heavy road', 	'freight_heavy_road', tableNode);
    appendDataTableRow ('Rail', 	'freight_rail', tableNode);
    appendDataTableRow ('Ship', 	'freight_ship', tableNode);
    appendDataTableRow ('Plane', 	'freight_plane', tableNode);



    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode1);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.style.width = "40px";
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode);
    rowNode.appendChild(cellNode);


    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_transport_energy_demand_observed").setAttribute("style", "width: 180px; height: 280px");
    document.getElementById("container_transport_energy_demand_projected").setAttribute("style", "width: 220px; height: 280px");

    initTransportCharts ();
   updateTransport();

  }
  else {
    showUnderConstructionMessage("technology-content-table");
  }

}

function handleLifestyle2ndLevelNavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('lifestyle-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-2ln-' + i).className = 'unselectedNavItem';

  lifestyleSubscreenID = activeId;

  var tableID = 'lifestyle-3rd-level-nav-table';

  if (activeId==1) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-home-subnav', travelSubNavID,  1, 'Temperature and size');
    createSubNavItemRow (tableID, 'lifestyle-home-subnav', travelSubNavID,  2, 'Appliances');
    document.getElementById(tableID).setAttribute("style", "width:150px");

    handleHomeSubnavigation (homeSubNavID);
  }
  else if (activeId==2) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-travel-subnav', travelSubNavID,  1, 'Travel per person');
    document.getElementById(tableID).setAttribute("style", "width:150px");

    handleTravelSubnavigation (travelSubNavID);
  }
  else if (activeId==3) {

    deleteRows(tableID);

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'lifestyle-diet-subnav', dietSubNavID,  1, 'Diet');
    createSubNavItemRow (tableID, 'lifestyle-diet-subnav', dietSubNavID,  2, 'Health');
    document.getElementById(tableID).setAttribute("style", "width:150px");

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

  deleteRows('lifestyle-content-table');

  // -------------------------------------------------------------------
  // Home temperature and size
  // -------------------------------------------------------------------
  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_lifestyle_chart_3");
    addDivCell (rowNode, "container_lifestyle_chart_5");
    addDivCell (rowNode, "container_lifestyle_chart_6");
    document.getElementById("lifestyle-content-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_chart_3").setAttribute("style", "width:220px; height:310px");
    document.getElementById("container_lifestyle_chart_5").setAttribute("style", "width:220px; height:310px");
    document.getElementById("container_lifestyle_chart_6").setAttribute("style", "width:220px; height:310px");

    initHomeTemperatureAndSizeCharts ();
    updateHomeTemperatureAndSizeCharts ();
  }

  // -------------------------------------------------------------------
  // Appliances
  // -------------------------------------------------------------------
  else if (activeId==2) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_lifestyle_chart_4");
    addDivCell (rowNode, "container_lifestyle_chart_7");
    document.getElementById("lifestyle-content-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_chart_4").setAttribute("style", "width:220px; height:310px");
    document.getElementById("container_lifestyle_chart_7").setAttribute("style", "width:220px; height:310px");

    initAppliancesCharts ();
    updateAppliancesCharts ();
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

  deleteRows('lifestyle-content-table');

  // -------------------------------------------------------------------
  // travel per person
  // -------------------------------------------------------------------
  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_lifestyle_chart_1");
    addDivCell (rowNode, "container_lifestyle_chart_2");
    document.getElementById("lifestyle-content-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_chart_1").setAttribute("style", "width:220px; height:310px");
    document.getElementById("container_lifestyle_chart_2").setAttribute("style", "width:220px; height:310px");

    initTravelPerPersonCharts ();
    updateTravelPerPersonCharts ();
  }
}
// -------------------------------------------------------------------
// Section Lifestyle Subsection Diet
// -------------------------------------------------------------------
function handleDietSubnavigation (activeId) {

  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('lifestyle-diet-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('lifestyle-diet-subnav-' + i).className = 'unselectedNavItem';

  dietSubNavID = activeId;

  deleteRows('lifestyle-content-table');

  // -------------------------------------------------------------------
  // Diet
  // -------------------------------------------------------------------
  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_food_bioenergy_1");
    document.getElementById("lifestyle-content-table").appendChild(rowNode);
    document.getElementById("container_food_bioenergy_1").setAttribute("style", "width:330px; height:310px");
    initFoodCharts();
    updateFood();
  }

  if (activeId==2) {
    showUnderConstructionMessage("lifestyle-content-table");
  }
}



function handleOverview2ndLevelNavigation (activeId) {

  // alert ('handleOverview2ndLevelNavigation (' + activeId + ')');

  for ( var i=1; i<=4; i++)
    if (i==activeId) document.getElementById('overview-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-2ln-' + i).className = 'unselectedNavItem';

  overviewSubscreenID = activeId;

  var tableID = 'overview-3rd-level-nav-table';
  deleteRows(tableID);

  // hide / show central CO2 budget diagram
  if (activeId==1) document.getElementById("container_screens_co2_budget").className = 'tabContent hide';
  else             document.getElementById("container_screens_co2_budget").className = '';

  // hide / show cost cfp selector 
  if (activeId==4) document.getElementById("costs-cfp-selection").className = '';
  else             document.getElementById("costs-cfp-selection").className = 'tabContent hide';

  if (activeId==1) {
    document.getElementById(tableID).setAttribute("style", "width:0px");

    deleteRows('overview-content-table');

    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_dashboard_energy_supply");
    addDivCell (rowNode, "container_dashboard_energy_demand");
    addDivCell (rowNode, "container_dashboard_ghg_emissions");
    addDivCell (rowNode, "container_dashboard_co2_budget");
    addDivCell (rowNode, "container_dashboard_mean_temp");

    document.getElementById("overview-content-table").appendChild(rowNode);

    document.getElementById("container_dashboard_energy_supply").setAttribute("style", "width: 180px; height: 310px");
    document.getElementById("container_dashboard_energy_demand").setAttribute("style", "width: 115px; height: 310px");
    document.getElementById("container_dashboard_ghg_emissions").setAttribute("style", "width: 370px; height: 310px");
    document.getElementById("container_dashboard_co2_budget").setAttribute("style", "width: 110px; height: 310px");
    document.getElementById("container_dashboard_mean_temp").setAttribute("style", "width: 120px; height: 310px");

    initDashboardCharts ();
    updateDashboard();
    updateCo2BudgetDisplay(chart_dashboard_co2_budget);

  }
  else if (activeId==2) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-energy-subnav', energySubNavID,  1, 'Supply and demand');
    createSubNavItemRow (tableID, 'overview-energy-subnav', energySubNavID,  2, 'Sankey');
    document.getElementById(tableID).setAttribute("style", "width:150px");

    handleEnergySubnavigation (energySubNavID);
  }
  else if (activeId==3) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-emissions-subnav', emissionSubNavID,  1, 'Emissions by source');
    createSubNavItemRow (tableID, 'overview-emissions-subnav', emissionSubNavID,  2, 'Emissions by gas');
    document.getElementById(tableID).setAttribute("style", "width:150px");

    handleEmissionSubnavigation (emissionSubNavID);

  }
  else if (activeId==4) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-costs-subnav', costSubNavID,  1, 'Summary');
    createSubNavItemRow (tableID, 'overview-costs-subnav', costSubNavID,  2, 'Breakdown');
    document.getElementById(tableID).setAttribute("style", "width:150px");

    handleCostSubnavigation (costSubNavID);
  }


//    if (dashBoardSubsetID == activeId) return;

}

function addDivCell (rowNode, divID) {
  var newdiv = document.createElement ('div');
  newdiv.setAttribute("id",  divID);
  var cellNode = document.createElement("td");
  cellNode.appendChild(newdiv);
  rowNode.appendChild(cellNode);
}

function handleEnergySubnavigation (activeId) {
  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('overview-energy-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-energy-subnav-' + i).className = 'unselectedNavItem';

  energySubNavID = activeId;

  deleteRows('overview-content-table');

  if (activeId == 1) {

    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_energy_1");
    addDivCell (rowNode, "container_energy_2");

    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("container_energy_1").setAttribute("style", "width:330px; height:310px");
    document.getElementById("container_energy_2").setAttribute("style", "width:330px; height:310px");

    initEnergyFlowsCharts ();
    updateEnergyFlows ();
    updateCo2BudgetDisplay(chart_screens_co2_budget);

  }
  else if (activeId == 2) {

    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "sankey");

    var cellNode = document.createElement("td");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Energy flows in 2050"));

    var rowNode = document.createElement("tr");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "center");
    cellNode.setAttribute("style", "width:830px; height:310px;");
    cellNode.appendChild(newdiv);

    rowNode = document.createElement("tr");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("style", "width:50px");
    rowNode.appendChild(cellNode);


    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute('title', 'open detailed Sankey diagram of energy flows');
    a.innerHTML = 'open detailed Sankey';

    cellNode = document.createElement("td");
    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);

    a.onclick = function() { 
      openSankey (); return false; 
    };

    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("sankey").setAttribute("style", "width:690px; height:300px; background-image:url(imgs/popup-gradient.png)");

    createSankey();
    updateCo2BudgetDisplay(chart_screens_co2_budget);
  }
}

// -------------------------------------------------------------------
// Section Overview Subsection Emissions
// -------------------------------------------------------------------
function handleEmissionSubnavigation (activeId) {

  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('overview-emissions-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-emissions-subnav-' + i).className = 'unselectedNavItem';
  emissionSubNavID = activeId;

  deleteRows('overview-content-table');


  // -------------------------------------------------------------------
  // emissions by source
  // -------------------------------------------------------------------
  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_emissions_by_source");
    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("container_emissions_by_source").setAttribute("style", "width: 370px; height: 310px");

    initEmissionChartDefault ('container_emissions_by_source');
    updateEmissionsDiagramSector();
    updateCo2BudgetDisplay(chart_screens_co2_budget);
  }
  // -------------------------------------------------------------------
  // emissions by gas
  // -------------------------------------------------------------------
  else if (activeId==2) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_emissions_by_gas");
    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("container_emissions_by_gas").setAttribute("style", "width: 370px; height: 310px");

    initEmissionChartDefault ('container_emissions_by_gas');
    updateEmissionsDiagramGas();
    updateCo2BudgetDisplay(chart_screens_co2_budget);
  }



}
function handleCostSubnavigation (activeId) {

  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('overview-costs-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-costs-subnav-' + i).className = 'unselectedNavItem';
  costSubNavID = activeId;


  // -----------------------------------------------------
  // init counterfactual pathway selector
  // -----------------------------------------------------
  var x = document.cfp_form_1.cfp_selector;
  // alert (x);
  x.options.length=0

  for (var i=0; i<cfps.length; i++) {
    x.options[x.options.length] = new Option(cfps[i].name, cfps[i].name, i==0, false);
  }
  x.selectedIndex = actCFPIndex;

  deleteRows('overview-content-table');

  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_range_overview");
    addDivCell (rowNode, "container_costs_in_context");

    document.getElementById("overview-content-table").appendChild(rowNode);

    document.getElementById("container_costs_range_overview").setAttribute("style", "width: 300px; height: 290px");
    document.getElementById("container_costs_in_context").setAttribute("style", "width: 300px; height: 290px");

    initCostOverviewCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }

  else if (activeId==2) {
    var rowNode = document.createElement("tr");
    // addDivCell (rowNode, "container_costs_2");
    addDivCell (rowNode, "container_costs_3");
    addDivCell (rowNode, "container_costs_5");
    addDivCell (rowNode, "container_costs_6");
    addDivCell (rowNode, "container_costs_1");

    document.getElementById("overview-content-table").appendChild(rowNode);

    // document.getElementById("container_costs_2").setAttribute("style", "width: 200px; height: 290px");
    document.getElementById("container_costs_3").setAttribute("style", "width: 230px; height: 290px");
    document.getElementById("container_costs_5").setAttribute("style", "width: 230px; height: 290px");
    document.getElementById("container_costs_6").setAttribute("style", "width: 230px; height: 290px");
    document.getElementById("container_costs_1").setAttribute("style", "width: 290px; height: 290px");

    initCostCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
    //updateCosts();
  }
  updateCo2BudgetDisplay(chart_screens_co2_budget);
}


///////////////////////////////////////////////////////////////

// delete all table rows

function deleteRows(tableID) {
  while (document.getElementById(tableID).hasChildNodes()) {
    var aNode = document.getElementById(tableID).firstChild;
    gone = document.getElementById(tableID).removeChild(aNode);
  }
}

/*
function deleteRows(tableID) {
  var tbl = document.getElementById(tableID); // table reference
  var lastRow = tbl.rows.length - 1;           // set the last row index
  for (var i = lastRow; i >= 0; i--) {
    tbl.deleteRow(i);
  }
}
*/
function createNavTableHeader (tableID) {

  var rowNode  = document.createElement("tr");
  var cellNode = document.createElement("td");
  cellNode.style.width = "200px";
  //cellNode.setAttribute('width',  '130px');
  cellNode.setAttribute("colspan", "2");

  var txt = document.createTextNode("Display"); // create text node
  cellNode.appendChild(txt);                   // append DIV to the table cell
  rowNode.appendChild(cellNode);
  document.getElementById(tableID).appendChild(rowNode);

  rowNode  = document.createElement("tr");
  cellNode = document.createElement("td");
  cellNode.setAttribute("colspan", "2");

  var hr = document.createElement("hr");
  hr.setAttribute("color",   "gray");
  hr.setAttribute("noshade", "");
  hr.setAttribute("size", 	 "1");

  cellNode.appendChild(hr);
  rowNode.appendChild(cellNode);
  document.getElementById(tableID).appendChild(rowNode);
}

function createSubNavItemRow (tableID, navSubsetID, persistentID, id, name) {

  var rowNode  = document.createElement("tr");
  var cellNode = document.createElement("td");

  var txt = document.createTextNode("-"); // create text node
  cellNode.appendChild(txt);                   // append DIV to the table cell
  rowNode.appendChild(cellNode);

  cellNode = document.createElement("td");
  cellNode.setAttribute("style", "white-space: nowrap");
  cellNode.setAttribute("align", "left");

  var classID = (persistentID == id) ? 'selectedNavItem' : 'unselectedNavItem';

  var a = document.createElement('a');
  a.href =  "";
  a.setAttribute("id",    navSubsetID + '-' + id);
  a.setAttribute('class', classID);
  a.setAttribute('title', "Display: '" + name + "'");
  a.innerHTML = name;

  if (navSubsetID == 'overview-energy-subnav') {
    a.onclick = function() { handleEnergySubnavigation (id); return false; };
  }
  else if (navSubsetID == 'overview-emissions-subnav') {
    a.onclick = function() { handleEmissionSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'overview-costs-subnav') {
    a.onclick = function() { handleCostSubnavigation (id); return false; };
  }

  else if (navSubsetID == 'technology-transport-subnav') {
    a.onclick = function() { handleTransportSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-buildings-subnav') {
    a.onclick = function() { handleBuildingsSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-manufacturing-subnav') {
    a.onclick = function() { handleManufacturingSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-electricity-subnav') {
    a.onclick = function() { handleElectricitySubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-bioenergy-subnav') {
    a.onclick = function() { handleBioenergySubnavigation (id); return false; };
  }

  else if (navSubsetID == 'technology-fossilFuel-subnav') {
    a.onclick = function() { handleFossilFuelSubnavigation (id); return false; };
  }




  else if (navSubsetID == 'lifestyle-home-subnav') {
    a.onclick = function() { handleHomeSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'lifestyle-travel-subnav') {
    a.onclick = function() { handleTravelSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'lifestyle-diet-subnav') {
    a.onclick = function() { handleDietSubnavigation (id); return false; };
  }



  else {
    a.onclick = function() { return false; };
  }

  cellNode.appendChild(a);
  rowNode.appendChild(cellNode);

  cellNode = document.createElement("td");
  cellNode.setAttribute('width',  '30px');
  rowNode.appendChild(cellNode);
 
  document.getElementById(tableID).appendChild(rowNode);
}

function appendDataTableRow (name, id, tableNode) {

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("id", "topBorder");
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode(name));
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  id + "_2011");
    cellNode.setAttribute("align", "right");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  id + "_2050");
    cellNode.setAttribute("align", "right");
    rowNode.appendChild(cellNode);


    tableNode.appendChild(rowNode);
}



///////////////////////////////////////////////////////////////

