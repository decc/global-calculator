
var electricitySubscreenID = 1;

function switchElectricityScreen (id) {

  // if (electricitySubscreenID == id) return;

  electricitySubscreenID = id;

  for ( var i=1; i<=2; i++)
    if (i==id) document.getElementById('electricity-subnav-' + i).className = 'selected';
    else       document.getElementById('electricity-subnav-' + i).className = '';

  while (document.getElementById("electricity-screen-table").hasChildNodes()) {
    var Knoten = document.getElementById("electricity-screen-table").firstChild;
    verschwunden = document.getElementById("electricity-screen-table").removeChild(Knoten);
  }
  while (document.getElementById("electricity-data-table").hasChildNodes()) {
    var Knoten = document.getElementById("electricity-data-table").firstChild;
    verschwunden = document.getElementById("electricity-data-table").removeChild(Knoten);
  }

  // -------------------------------------------------------------
  // electricity: electricity supply
  // -------------------------------------------------------------
  if (id == 1) {

    var tableNode  =  document.getElementById("electricity-data-table");

    // tableNode.setAttribute("border", "0");
    // tableNode.setAttribute("style", "border-collapse: collapse; margin: 1em;");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Installed capacity (in GW)"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("style", "height: 5px");
    cellNode.appendChild(document.createTextNode("&nbsp;"));
    rowNode.appendChild(cellNode);


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode.appendChild(rowNode);

    appendDataTableRow ('Coal / biomass', 	'icap_coal_biomass', tableNode);
    appendDataTableRow ('Liquid', 	  	'icap_liquid', tableNode);
    appendDataTableRow ('Gas', 		  	'icap_gas', tableNode);
    appendDataTableRow ('CCS', 		  	'icap_ccs', tableNode);
    appendDataTableRow ('Nuclear', 	  	'icap_nuclear', tableNode);
    appendDataTableRow ('Wind', 	  	'icap_wind', tableNode);
    appendDataTableRow ('Hydro', 	  	'icap_hydro', tableNode);
    appendDataTableRow ('Marine',		'icap_marine', tableNode);
    appendDataTableRow ('Solar', 		'icap_solar', tableNode);
    appendDataTableRow ('Geothermal', 	  	'icap_geothermal', tableNode);
    appendDataTableRow ('Global storage unit',  'icap_storage', tableNode);





    rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_electricity_balancing_electricity_supply");
    document.getElementById("electricity-screen-table").appendChild(rowNode);

    document.getElementById("container_electricity_balancing_electricity_supply").setAttribute("style", "width: 330px; height: 310px");

    initElectricityCharts();
    updateElectricity();
  }


/*
  if (id == 1) {

    var tableNode1  = document.createElement("table");

    var rowNode1  = document.createElement("tr");
    addDivCell (rowNode1, "container_electricity_balancing_electricity_supply");
    tableNode1.appendChild(rowNode1);

    var tableNode  = document.createElement("table");
    tableNode.setAttribute("border", "0");
    tableNode.setAttribute("style", "border-collapse: collapse; margin: 1em;");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Installed capacity (in GW)"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");

    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode.appendChild(rowNode);

    appendDataTableRow ('Coal / biomass', 	'icap_coal_biomass', tableNode);
    appendDataTableRow ('Liquid', 	  	'icap_liquid', tableNode);
    appendDataTableRow ('Gas', 		  	'icap_gas', tableNode);
    appendDataTableRow ('CCS', 		  	'icap_ccs', tableNode);
    appendDataTableRow ('Nuclear', 	  	'icap_nuclear', tableNode);
    appendDataTableRow ('Wind', 	  	'icap_wind', tableNode);
    appendDataTableRow ('Hydro', 	  	'icap_hydro', tableNode);
    appendDataTableRow ('Marine',		'icap_marine', tableNode);
    appendDataTableRow ('Solar', 		'icap_solar', tableNode);
    appendDataTableRow ('Geothermal', 	  	'icap_geothermal', tableNode);
    appendDataTableRow ('Global storage unit',  'icap_storage', tableNode);


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


    document.getElementById("electricity-screen-table").appendChild(rowNode);

    document.getElementById("container_electricity_balancing_electricity_supply").setAttribute("style", "width: 330px; height: 310px");

    initElectricityCharts();
    updateElectricity();
  }
*/
  // -------------------------------------------------------------
  // electricity: carbon intensity
  // -------------------------------------------------------------
  else if (id == 2) {

    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_electricity_carbon_intensity");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);

    document.getElementById("electricity-screen-table").appendChild(rowNode);

    document.getElementById("container_electricity_carbon_intensity").setAttribute("style", "width:530px; height:310px");

    initElectricityCarbonIntensityCharts();
    updateElectricityCarbonIntensityCharts();
  }
  return false;
}

