
var transportSubscreenID = 1;

function switchTransportScreen (activeId) {

//  if (transportSubscreenID == activeId) return;

  transportSubscreenID= activeId;

  for ( var i=1; i<=4; i++)
    if (i==activeId) document.getElementById('transport-subnav-' + i).className = 'selected';
    else             document.getElementById('transport-subnav-' + i).className = '';


  while (document.getElementById("transport-screen-table").hasChildNodes()) {
    var Knoten = document.getElementById("transport-screen-table").firstChild;
    verschwunden = document.getElementById("transport-screen-table").removeChild(Knoten);
  }


  // -------------------------------------------------------------
  // Transport: Cars - technology and fuel
  // -------------------------------------------------------------
  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_transport_cars_on_the_road");
    addDivCell (rowNode, "container_transport_avg_efficiency");

    document.getElementById("transport-screen-table").appendChild(rowNode);

    document.getElementById("container_transport_cars_on_the_road").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_transport_avg_efficiency").setAttribute("style", "width: 330px; height: 310px");

    initTransportTechAndFuelCharts();
    updateTransportTechAndFuelCharts();
  }
  // -------------------------------------------------------------
  // Transport: Mode
  // -------------------------------------------------------------
  else if (activeId==2) {

    var tableNode1  = document.createElement("table");
    tableNode1.setAttribute("is", "tc-diagram-table");

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
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Number of vehicles (1000s) - Passenger"));
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "5px";
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
    cellNode.setAttribute("style", "white-space: nowrap");
    rowNode.appendChild(cellNode);
    tableNode.appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.style.height = "5px";
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

    document.getElementById("transport-screen-table").appendChild(rowNode);

    document.getElementById("container_transport_energy_demand_observed").setAttribute("style", "width: 180px; height: 280px");
    document.getElementById("container_transport_energy_demand_projected").setAttribute("style", "width: 220px; height: 280px");

    initTransportModeCharts();
    updateTransportModeCharts();

  }
  // -------------------------------------------------------------
  // Transport: Fuel type
  // -------------------------------------------------------------
  else if (activeId==3) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_transport_by_fuel_type");

    document.getElementById("transport-screen-table").appendChild(rowNode);

    document.getElementById("container_transport_by_fuel_type").setAttribute("style", "width: 660px; height: 310px");

    initTransportFuelTypeCharts();
    updateTransportFuelTypeCharts();
  }
  // -------------------------------------------------------------
  // Transport: Freight by load
  // -------------------------------------------------------------
  else if (activeId==4) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_transport_freight_by_load");

    addDivCell (rowNode, "fbl-info-txt");

    document.getElementById("transport-screen-table").appendChild(rowNode);


//    document.getElementById("fbl-info-txt").innerHTML = "This graph is helpful for sanity checking whether the user's choice for \"freight distance\" is compatible with the output of coal, oil and iron products generated by other lever choices.  Coal, oil and iron products account for the majority (60% in 2013) of international freight by sea.";


    document.getElementById("fbl-info-txt").setAttribute("style", "width:130px");
    document.getElementById("container_transport_freight_by_load").setAttribute("style", "width: 500px; height: 310px");

    initTransportFreightCharts();
    updateTransportFreightCharts();
  }

  return false;
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
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.setAttribute("align", "right");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  id + "_2050");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.setAttribute("align", "right");
    rowNode.appendChild(cellNode);

    tableNode.appendChild(rowNode);
}

