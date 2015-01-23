// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var costSubscreenID   = 1;
var costSubNavID     = 1; // accessed by updateCharts !

// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
var costsSummarySubNavID  = 1;
var capOpFuelSubNavID 	  = 1;
var costsBySectorSubNavID = 1;

// ----------------------------------------------------------------------------
// handle the selection of a 2nd level subscreen 
// ----------------------------------------------------------------------------
function handleCosts2ndLevelNavigation (activeId) {

  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('costs-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('costs-2ln-' + i).className = 'unselectedNavItem';

  costSubscreenID = activeId;
  costSubNavID    = activeId;


  var tableID = 'costs-3rd-level-nav-table';
  deleteRows(tableID);


  // ----------------------------------------------------------------------------
  // Summary
  // ----------------------------------------------------------------------------
  if (activeId==1) {

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'costs-summary-subnav', costsSummarySubNavID,  1, translate ('Summary'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleCostsSummarySubnavigation (costsSummarySubNavID);

  }
  // ----------------------------------------------------------------------------
  // Capital, operating, fuel
  // ----------------------------------------------------------------------------
  else if (activeId==2) {

  

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'costs-capOpFuel-subnav', capOpFuelSubNavID,  1, translate ('Capital, operating, fuel'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleCapOpFuelSubnavigation (capOpFuelSubNavID);

  }
  // ----------------------------------------------------------------------------
  // By sector
  // ----------------------------------------------------------------------------
  else if (activeId==3) {

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'costs-sector-subnav', costsBySectorSubNavID,  1, translate ('By sector'));
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleCostsBySectorSubnavigation (costsBySectorSubNavID);

  }
}

// -------------------------------------------------------------------
// Section Costs Subsection Summary
// -------------------------------------------------------------------
function handleCostsSummarySubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('costs-summary-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('costs-summary-subnav-' + i).className = 'unselectedNavItem';

  costsSummarySubNavID = activeId;

  deleteRows('costs-content-table');

  var rowNode = document.createElement("tr");
  addDivCell (rowNode, "container_costs_in_context");
  addDivCell (rowNode, "container_costs_vs_counterfactual");

  document.getElementById("costs-content-table").appendChild(rowNode);

  document.getElementById("container_costs_in_context").setAttribute("style", "width: 500px; height: 290px");
  document.getElementById("container_costs_vs_counterfactual").setAttribute("style", "position:relative; width: 200px; height: 290px");

  initCostOverviewCharts();
  setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
}

// -------------------------------------------------------------------
// Section Costs Subsection Capital, operating, fuel
// -------------------------------------------------------------------
function handleCapOpFuelSubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('costs-capOpFuel-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('costs-capOpFuel-subnav-' + i).className = 'unselectedNavItem';
  capOpFuelSubNavID = activeId;

  deleteRows('costs-content-table');

  var rowNode = document.createElement("tr");
  addDivCell (rowNode, "container_costs_capital");
  addDivCell (rowNode, "container_costs_operating");
  addDivCell (rowNode, "container_costs_fuel");
  addDivCell (rowNode, "container_costs_bar");

  document.getElementById("costs-content-table").appendChild(rowNode);

  document.getElementById("container_costs_capital").setAttribute(  "style", "width: 220px; height: 290px");
  document.getElementById("container_costs_operating").setAttribute("style", "width: 220px; height: 290px");
  document.getElementById("container_costs_fuel").setAttribute(     "style", "width: 220px; height: 290px");
  document.getElementById("container_costs_bar").setAttribute(      "style", "width: 220px; height: 290px");

  initCostCharts();
  setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
}



// -------------------------------------------------------------------
// Section Costs Subsection By sector
// -------------------------------------------------------------------
function handleCostsBySectorSubnavigation (activeId) {

  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('costs-sector-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('costs-sector-subnav-' + i).className = 'unselectedNavItem';
  costsBySectorSubNavID = activeId;


  deleteRows('costs-content-table');

  var rowNode = document.createElement("tr");
  addDivCell (rowNode, "container_costs_electricity");
  addDivCell (rowNode, "container_costs_transport");
  addDivCell (rowNode, "container_costs_manufacturing");
  addDivCell (rowNode, "container_costs_buildings");

  document.getElementById("costs-content-table").appendChild(rowNode);

  document.getElementById("container_costs_electricity").setAttribute(  "style", "width: 220px; height: 290px");
  document.getElementById("container_costs_transport").setAttribute(    "style", "width: 220px; height: 290px");
  document.getElementById("container_costs_manufacturing").setAttribute("style", "width: 220px; height: 290px");
  document.getElementById("container_costs_buildings").setAttribute(    "style", "width: 220px; height: 290px");

  initCostBySectorCharts();
  setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
}


