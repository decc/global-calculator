var manufacturingSubNavID = 1;

function handleManufacturingSubnavigation (id) {

  if (id == manufacturingSubNavID) return;

  for ( var i=1; i<=7; i++)
    if (i==id) document.getElementById('manuf-subnav-' + i).className = 'selected';
    else       document.getElementById('manuf-subnav-' + i).className = '';

  manufacturingSubNavID = id;


  while (document.getElementById("manufacturing-diagram-table").hasChildNodes()) {
      var Knoten = document.getElementById("manufacturing-diagram-table").firstChild;
      verschwunden = document.getElementById("manufacturing-diagram-table").removeChild(Knoten);
  }


  if (id==1) {

    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_energy_consumption_observed");
    addDivCell (rowNode, "container_manufacturing_energy_consumption_projected");

    var cellNode = document.createElement("td");
    cellNode.style.height = "15px";
    rowNode.appendChild(cellNode);

    addDivCell (rowNode, "container_materials_2");

    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);


    document.getElementById("container_manufacturing_energy_consumption_observed").setAttribute("style", "width: 180px; height: 310px");
    document.getElementById("container_manufacturing_energy_consumption_projected").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_materials_2").setAttribute("style", "width: 330px; height: 310px");


    initMaterialsCharts();
    updateManufacturing();
  }
  else if (id==2) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_iron_and_steel_uses");
    addDivCell (rowNode, "container_manufacturing_iron_and_steel");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_iron_and_steel_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_iron_and_steel").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingIronAndSteelChart();
    updateManufacturingIronAndSteelChart();
  }
  else if (id==3) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_aluminium_uses");
    addDivCell (rowNode, "container_manufacturing_aluminium");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_aluminium_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_aluminium").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingAluminiumChart();
    updateManufacturingAluminiumChart();
  }
  else if (id==4) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_chemicals_uses");
    addDivCell (rowNode, "container_manufacturing_chemicals");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_chemicals_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_chemicals").setAttribute("style", "width: 330px; height: 310px");
  
    initManufacturingChemicalsChart();
    updateManufacturingChemicalsChart();

  }
  else if (id==5) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "placeholder");
    addDivCell (rowNode, "container_manufacturing_paper");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("placeholder").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_paper").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingPaperChart();
    updateManufacturingPaperChart();
  }


  else if (id==6) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_cement_uses");
    addDivCell (rowNode, "container_manufacturing_cement");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_cement_uses").setAttribute("style", "width: 330px; height: 310px");
    document.getElementById("container_manufacturing_cement").setAttribute("style", "width: 330px; height: 310px");

    initManufacturingCementChart();
    updateManufacturingCementChart();
  }

  else if (id==7) {
    var rowNode  = document.createElement("tr");
    addDivCell (rowNode, "container_manufacturing_sales_of_lightbulbs");
    addDivCell (rowNode, "container_manufacturing_sales_of_refrigerators");
    addDivCell (rowNode, "container_manufacturing_sales_of_televisions");
    document.getElementById("manufacturing-diagram-table").appendChild(rowNode);
    document.getElementById("container_manufacturing_sales_of_lightbulbs").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_manufacturing_sales_of_refrigerators").setAttribute("style", "width: 220px; height: 310px");
    document.getElementById("container_manufacturing_sales_of_televisions").setAttribute("style", "width: 220px; height: 310px");

    initManufacturingSalesOfProductsCharts();
    updateManufacturingSalesOfProductsCharts();
  }

  return false;
}


