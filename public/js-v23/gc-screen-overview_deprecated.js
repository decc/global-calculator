// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var overviewSubscreenID   = 1;

// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
var energySubNavID 	= 1;
var emissionSubNavID 	= 1;
var costSubNavID 	= 1;


// ----------------------------------------------------------------------------
// handle the selection of a 2nd level subscreen 
// ----------------------------------------------------------------------------
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
    deleteRows('overview-thermometer-table');


    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_dashboard_energy_supply");
    addDivCell (rowNode, "container_dashboard_energy_demand");
    addDivCell (rowNode, "container_dashboard_ghg_emissions");
    addDivCell (rowNode, "container_dashboard_co2_budget");

    document.getElementById("overview-content-table").appendChild(rowNode);

    rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_dashboard_mean_temp");
    document.getElementById("overview-thermometer-table").appendChild(rowNode);

    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "dashboard-temp-info");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(newdiv);
    rowNode = document.createElement("tr");
    rowNode.appendChild(cellNode);
    document.getElementById("overview-thermometer-table").appendChild(rowNode);

    document.getElementById("container_dashboard_energy_supply").setAttribute("style", "width: 180px; height: 310px");
    document.getElementById("container_dashboard_energy_demand").setAttribute("style", "width: 125px; height: 310px");
    document.getElementById("container_dashboard_ghg_emissions").setAttribute("style", "width: 370px; height: 310px");
    document.getElementById("container_dashboard_co2_budget").setAttribute("style", "width: 120px; height: 310px");
    document.getElementById("container_dashboard_mean_temp").setAttribute("style", "width: 130px; height: 280px");
    document.getElementById("dashboard-temp-info").setAttribute("style", "width: 130px");

    document.getElementById("dashboard-temp-info").innerHTML =
            "<a target='_blank' href=\"http://www.globalcalculator.org/wp-content/uploads/2014/07/Temperature-range-calculation-methodology-and-discussion.pdf\" class=\"tooltip\">"
          + "<img border=0 src = 'imgs/info-icon-6.gif'> How is the temperature change estimated?"
          + "<span> <img class=\"callout\" src=\"imgs/tooltip/callout_black.gif\"/><strong>How does the Global Calculater estimate temperature change?</strong><br /><br />"
          + "<div>"
          + "The temperature change in 2100 for your chosen pathway is estimated by"
          + "combining IPCC results about the effect of cumulative CO2 emissions with"
          + "global temperature potentials for three other greenhouse gases (CH4, N2O,"
          + "and SO2).  <br><br>For more details please click here.</div></span>";


    initDashboardCharts ();
    updateDashboard();
    updateCo2BudgetDisplay(chart_dashboard_co2_budget);

  }
  else if (activeId==2) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-energy-subnav', energySubNavID,  1, 'Supply and demand');
    createSubNavItemRow (tableID, 'overview-energy-subnav', energySubNavID,  2, 'Sankey');


    var rowNode = document.createElement("tr");
    rowNode.appendChild(document.createElement("td"));
    addDivCell (rowNode, "sankey-nav-placeholder");
    rowNode.appendChild(document.createElement("td"));
    document.getElementById(tableID).appendChild(rowNode);

    rowNode = document.createElement("tr");
    rowNode.appendChild(document.createElement("td"));

    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "2");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "sankey-nav-detailed");
    rowNode.appendChild(cellNode);

    cellNode.appendChild(newdiv);

    document.getElementById(tableID).appendChild(rowNode);

    document.getElementById('sankey-nav-placeholder').setAttribute("style", "height:80px");
    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleEnergySubnavigation (energySubNavID);
  }
  else if (activeId==3) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-emissions-subnav', emissionSubNavID,  1, 'Emissions by source');
    createSubNavItemRow (tableID, 'overview-emissions-subnav', emissionSubNavID,  2, 'Emissions by gas');
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleEmissionSubnavigation (emissionSubNavID);

  }
  else if (activeId==4) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'overview-costs-subnav', costSubNavID,  1, 'Summary');
    createSubNavItemRow (tableID, 'overview-costs-subnav', costSubNavID,  2, 'Capital, operating, fuel');
    createSubNavItemRow (tableID, 'overview-costs-subnav', costSubNavID,  3, 'By sector');
    document.getElementById(tableID).setAttribute("style", "width:180px");

    handleCostSubnavigation (costSubNavID);
  }

}

// -------------------------------------------------------------------
// Section Overview Subsection Energy
// -------------------------------------------------------------------
function handleEnergySubnavigation (activeId) {
  for ( var i=1; i<=2; i++)
    if (i==activeId) document.getElementById('overview-energy-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-energy-subnav-' + i).className = 'unselectedNavItem';

  energySubNavID = activeId;

  deleteRows('overview-content-table');
  deleteRows('overview-thermometer-table');

  // -------------------------------------------------------------------
  // Section Overview Subsection Energy
  // -------------------------------------------------------------------
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

    document.getElementById('sankey-nav-detailed').innerHTML = "";


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

/*
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
*/
    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("sankey").setAttribute("style", "width:690px; height:300px; background-image:url(imgs/popup-gradient.png)");

    createSankey();
    updateCo2BudgetDisplay(chart_screens_co2_budget);

    document.getElementById('sankey-nav-detailed').innerHTML = "- <a href='' onclick='openSankey (); return false;' title = 'open detailed Sankey diagram of energy flows'>Open detailed Sankey</a>";

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
  deleteRows('overview-thermometer-table');


  // -------------------------------------------------------------------
  // emissions by source
  // -------------------------------------------------------------------
  if (activeId==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_emissions_by_source");
    document.getElementById("overview-content-table").appendChild(rowNode);
    document.getElementById("container_emissions_by_source").setAttribute("style", "width: 670px; height: 310px");

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
    document.getElementById("container_emissions_by_gas").setAttribute("style", "width: 670px; height: 310px");

    initEmissionChartDefault ('container_emissions_by_gas');
    updateEmissionsDiagramGas();
    updateCo2BudgetDisplay(chart_screens_co2_budget);
  }
}



// -------------------------------------------------------------------
// Section Overview Subsection Costs
// -------------------------------------------------------------------
function handleCostSubnavigation (activeId) {

  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('overview-costs-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('overview-costs-subnav-' + i).className = 'unselectedNavItem';
  costSubNavID = activeId;


  deleteRows('overview-content-table');
  deleteRows('overview-thermometer-table');

  if (activeId==1) {


    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_in_context");
    addDivCell (rowNode, "container_costs_vs_counterfactual");

    document.getElementById("overview-content-table").appendChild(rowNode);

    document.getElementById("container_costs_in_context").setAttribute("style", "width: 500px; height: 290px");
    document.getElementById("container_costs_vs_counterfactual").setAttribute("style", "position:relative; width: 200px; height: 290px");

    initCostOverviewCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }

  else if (activeId==2) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_capital");
    addDivCell (rowNode, "container_costs_operating");
    addDivCell (rowNode, "container_costs_fuel");
    addDivCell (rowNode, "container_costs_bar");

    document.getElementById("overview-content-table").appendChild(rowNode);

    document.getElementById("container_costs_capital").setAttribute(  "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_operating").setAttribute("style", "width: 220px; height: 290px");
    document.getElementById("container_costs_fuel").setAttribute(     "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_bar").setAttribute(      "style", "width: 220px; height: 290px");

    initCostCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }

  else if (activeId==3) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_electricity");
    addDivCell (rowNode, "container_costs_transport");
    addDivCell (rowNode, "container_costs_manufacturing");
    addDivCell (rowNode, "container_costs_buildings");

    document.getElementById("overview-content-table").appendChild(rowNode);

    document.getElementById("container_costs_electricity").setAttribute(  "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_transport").setAttribute(    "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_manufacturing").setAttribute("style", "width: 220px; height: 290px");
    document.getElementById("container_costs_buildings").setAttribute(    "style", "width: 220px; height: 290px");

    initCostBySectorCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }
//  return false;
}


