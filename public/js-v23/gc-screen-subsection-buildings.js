// ----------------------------------------------------------------------------
// id of respective active 3rd level subscreen
// ----------------------------------------------------------------------------
var buildingsSubNavID 	= 1;

// -------------------------------------------------------------
// handle screen selection in subsection buildings
// -------------------------------------------------------------
function handleBuildingsSubnavigation (activeId) {
  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('technology-buildings-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-buildings-subnav-' + i).className = 'unselectedNavItem';

  buildingsSubNavID = activeId;

  deleteRows('technology-content-table');
  deleteRows('technology-content-table-2');

  // -------------------------------------------------------------
  // buildings: Insulation and technology
  // -------------------------------------------------------------
  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_buildings_heating");
    addDivCell (rowNode, "container_buildings_insulation");

    document.getElementById("technology-content-table").appendChild(rowNode);

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

    document.getElementById("technology-content-table").appendChild(rowNode);

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

    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_buildings_by_fuel_type").setAttribute("style", "width: 660px; height: 310px");

    initBuildingsFuelCharts();
    updateBuildingsFuelCharts();
  }


  return false;
}

