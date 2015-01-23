
var buildingsSubscreenID = 1;

function switchBuildingsScreen (activeId) {

//  if (buildingsSubscreenID == activeId) return;

  buildingsSubscreenID = activeId;

  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('buildings-subnav-' + i).className = 'selected';
    else             document.getElementById('buildings-subnav-' + i).className = '';


  while (document.getElementById("buildings-screen-table").hasChildNodes()) {
    var Knoten = document.getElementById("buildings-screen-table").firstChild;
    verschwunden = document.getElementById("buildings-screen-table").removeChild(Knoten);
  }


  // -------------------------------------------------------------
  // buildings: Insulation and technology
  // -------------------------------------------------------------
  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_buildings_heating");
    addDivCell (rowNode, "container_buildings_insulation");

    document.getElementById("buildings-screen-table").appendChild(rowNode);

    document.getElementById("container_buildings_heating").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_buildings_insulation").setAttribute("style", "width: 330px; height: 310px");

    initBuildingsInsulationAndTechCharts();
    updateBuildingsInsulationAndTechCharts();
  }
  // -------------------------------------------------------------
  // buildings: Energy use
  // -------------------------------------------------------------
  else if (activeId==2) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_buildings_2");
    addDivCell (rowNode, "container_buildings_1");

    document.getElementById("buildings-screen-table").appendChild(rowNode);

    document.getElementById("container_buildings_2").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_buildings_1").setAttribute("style", "width: 330px; height: 310px");

    initBuildingsEnergyUseCharts();
    updateBuildingsEnergyUseCharts();
  }
  // -------------------------------------------------------------
  // buildings: Fuel type
  // -------------------------------------------------------------
  else if (activeId==3) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_buildings_by_fuel_type");

    document.getElementById("buildings-screen-table").appendChild(rowNode);

    document.getElementById("container_buildings_by_fuel_type").setAttribute("style", "width: 660px; height: 310px");

    initBuildingsFuelCharts();
    updateBuildingsFuelCharts();
  }


  return false;
}

/*
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
*/
