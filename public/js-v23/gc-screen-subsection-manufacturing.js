// ----------------------------------------------------------------------------
// id of respective active 3rd level subscreen
// ----------------------------------------------------------------------------
var manufacturingSubNavID = 1;

// -------------------------------------------------------------
// handle screen selection in subsection manufacturing
// -------------------------------------------------------------
function handleManufacturingSubnavigation (activeId) {


  for ( var i=1; i<=7; i++)
    if (i==activeId) document.getElementById('technology-manufacturing-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-manufacturing-subnav-' + i).className = 'unselectedNavItem';

  manufacturingSubNavID = activeId;

  deleteRows('technology-content-table');
  deleteRows('technology-content-table-2');

  if (activeId==1) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_energy_consumption_observed");
    addDivCell (rowNode, "container_manufacturing_energy_consumption_projected");

    var cellNode = document.createElement("td");
    cellNode.style.height = "15px";
    rowNode.appendChild(cellNode);

    addDivCell (rowNode, "container_materials_2");

    document.getElementById("technology-content-table").appendChild(rowNode);


    document.getElementById("container_manufacturing_energy_consumption_observed").setAttribute("style", "width: 180px; height: 310px");
    document.getElementById("container_manufacturing_energy_consumption_projected").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_materials_2").setAttribute("style", "width: 330px; height: 310px");


    initMaterialsCharts();
    updateManufacturing();
  }
  else if (activeId==2) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_iron_and_steel_uses");
    addDivCell (rowNode, "container_manufacturing_iron_and_steel");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_iron_and_steel_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_iron_and_steel").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingIronAndSteelCharts();
    updateManufacturingIronAndSteelCharts();
  }
  else if (activeId==3) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_aluminium_uses");
    addDivCell (rowNode, "container_manufacturing_aluminium");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_aluminium_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_aluminium").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingAluminiumCharts();
    updateManufacturingAluminiumCharts();
  }
  else if (activeId==4) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_chemicals_uses");
    addDivCell (rowNode, "container_manufacturing_chemicals");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_chemicals_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_chemicals").setAttribute("style", "width: 330px; height: 310px");
  
    initManufacturingChemicalsCharts();
    updateManufacturingChemicalsCharts();

  }
  else if (activeId==5) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "placeholder");
    addDivCell (rowNode, "container_manufacturing_paper");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("placeholder").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_paper").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingPaperCharts();
    updateManufacturingPaperCharts();
  }

  else if (activeId==6) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_cement_uses");
    addDivCell (rowNode, "container_manufacturing_cement");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_cement_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_cement").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingCementCharts();
    updateManufacturingCementCharts();
  }

  else if (activeId==7) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_sales_of_lightbulbs");
    addDivCell (rowNode, "container_manufacturing_sales_of_refrigerators");
    addDivCell (rowNode, "container_manufacturing_sales_of_televisions");
    document.getElementById("technology-content-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_sales_of_lightbulbs").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_manufacturing_sales_of_refrigerators").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_manufacturing_sales_of_televisions").setAttribute("style", "width: 220px; height: 310px");

    initManufacturingSalesOfProductsCharts();
    updateManufacturingSalesOfProductsCharts();
  }

  return false;
}


