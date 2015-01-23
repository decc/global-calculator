// ----------------------------------------------------------------------------
// id of respective active 3rd level subscreen
// ----------------------------------------------------------------------------
var electricitySubNavID = 1;

// -------------------------------------------------------------
// handle screen selection in subsection Electricity
// -------------------------------------------------------------
function handleElectricitySubnavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('technology-electricity-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-electricity-subnav-' + i).className = 'unselectedNavItem';

  electricitySubNavID = activeId;

  deleteRows('technology-content-table');
  deleteRows('technology-content-table-2');


  // -------------------------------------------------------------
  // electricity: electricity supply
  // -------------------------------------------------------------
  if (activeId == 1) {

    var tableNode  =  document.getElementById("technology-content-table-2");

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

    appendDataTableRow ('Coal/biomass', 	'icap_coal_biomass', tableNode);
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
    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_electricity_balancing_electricity_supply").setAttribute("style", "width: 330px; height: 310px");

    document.getElementById("uranium-info-txt").innerHTML = "";

    initElectricityCharts();
    updateElectricity();
  }

  // -------------------------------------------------------------
  // electricity: carbon intensity
  // -------------------------------------------------------------
  else if (activeId == 2) {

    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_electricity_carbon_intensity");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);

    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_electricity_carbon_intensity").setAttribute("style", "width:530px; height:310px");

    document.getElementById("uranium-info-txt").innerHTML = "";


    initElectricityCarbonIntensityCharts();
    updateElectricityCarbonIntensityCharts();
  }
  // -------------------------------------------------------------
  // electricity: uranium
  // -------------------------------------------------------------
  else if (activeId == 3) {

    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');
    var newdiv4 = document.createElement ('div');
    var newdiv5 = document.createElement ('div');
    var newdiv6 = document.createElement ('div');
    var newdiv7 = document.createElement ('div');
    newdiv2.setAttribute("id",  "container_uranium_pie_1b");
    newdiv3.setAttribute("id",  "container_uranium_pie_2b");
    newdiv4.setAttribute("id",  "container_uranium_pie_3b");
    newdiv5.setAttribute("id",  "container_uranium_pie_1a");
    newdiv6.setAttribute("id",  "container_uranium_pie_2a");
    newdiv7.setAttribute("id",  "container_uranium_pie_3a");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");

    var tableNode  = document.createElement("table");
    tableNode.setAttribute("border", "0");

    var rowNode1  = document.createElement("tr");
    var cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_1b");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_2b");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_3b");
    rowNode1.appendChild(cellNode1);
    tableNode.appendChild(rowNode1);

    rowNode1  = document.createElement("tr");
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv2);
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv3);
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv4);
    rowNode1.appendChild(cellNode1);
    tableNode.appendChild(rowNode1);

    rowNode1  = document.createElement("tr");
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_1a");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_2a");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "uranium_study_3a");
    rowNode1.appendChild(cellNode1);
    tableNode.appendChild(rowNode1);

    rowNode1  = document.createElement("tr");
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv5);
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv6);
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.appendChild(newdiv7);
    rowNode1.appendChild(cellNode1);
    tableNode.appendChild(rowNode1);


    cellNode = document.createElement("td");
    cellNode.setAttribute("style", "width:5px");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "top");
    cellNode.appendChild(tableNode);
    rowNode.appendChild(cellNode);
    document.getElementById("technology-content-table").appendChild(rowNode);



    document.getElementById("uranium_study_1b").innerHTML = 'based on<br>method 1: ?';
    document.getElementById("uranium_study_2b").innerHTML = 'based on<br>method 2: ?';
    document.getElementById("uranium_study_3b").innerHTML = 'based on<br>method 3: ?';

    document.getElementById("container_uranium_pie_1b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_uranium_pie_2b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_uranium_pie_3b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_uranium_pie_1a").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_uranium_pie_2a").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_uranium_pie_3a").setAttribute("style", "width:150px; height:110px");

    document.getElementById("uranium_study_1a").innerHTML = 'based on<br>method 1: ?';
    document.getElementById("uranium_study_2a").innerHTML = 'based on<br>method 2: ?';
    document.getElementById("uranium_study_3a").innerHTML = 'based on<br>method 3: ?';


    document.getElementById("uranium-info-txt").innerHTML = "<br><br><br><br><br><br><hr color=\"gray\" noshade=\"\" size=\"1\" >Reserves are economically viable to extract; resources are more speculative, and not economically viable to extract.";

    initUraniumCharts ();
    adjustFFCharts (3);


  }
  return false;
}


