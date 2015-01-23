var costSubNavID 	= 1; // cost sub screen id

function switchCostScreen (id) {

  if (id == costSubNavID) return;

  for ( var i=1; i<=3; i++)
    if (i==id) document.getElementById('cost-subnav-' + i).className = 'selected';
    else       document.getElementById('cost-subnav-' + i).className = '';

  costSubNavID = id;


  while (document.getElementById("cost-diagram-table").hasChildNodes()) {
      var Knoten = document.getElementById("cost-diagram-table").firstChild;
      verschwunden = document.getElementById("cost-diagram-table").removeChild(Knoten);
  }


  if (id==1) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_in_context");
    addDivCell (rowNode, "container_costs_vs_counterfactual");

    document.getElementById("cost-diagram-table").appendChild(rowNode);

    document.getElementById("container_costs_in_context").setAttribute("style", "width: 500px; height: 290px");
    document.getElementById("container_costs_vs_counterfactual").setAttribute("style", "position:relative; width: 200px; height: 290px");



    initCostOverviewCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }

  else if (id==2) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_capital");
    addDivCell (rowNode, "container_costs_operating");
    addDivCell (rowNode, "container_costs_fuel");
    addDivCell (rowNode, "container_costs_bar");

    document.getElementById("cost-diagram-table").appendChild(rowNode);

    document.getElementById("container_costs_capital").setAttribute(  "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_operating").setAttribute("style", "width: 220px; height: 290px");
    document.getElementById("container_costs_fuel").setAttribute(     "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_bar").setAttribute(      "style", "width: 220px; height: 290px");

    initCostCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }

  else if (id==3) {
    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_costs_electricity");
    addDivCell (rowNode, "container_costs_transport");
    addDivCell (rowNode, "container_costs_manufacturing");
    addDivCell (rowNode, "container_costs_buildings");

    document.getElementById("cost-diagram-table").appendChild(rowNode);

    document.getElementById("container_costs_electricity").setAttribute(  "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_transport").setAttribute(    "style", "width: 220px; height: 290px");
    document.getElementById("container_costs_manufacturing").setAttribute("style", "width: 220px; height: 290px");
    document.getElementById("container_costs_buildings").setAttribute(    "style", "width: 220px; height: 290px");

    initCostBySectorCharts();
    setCfpIndex (document.cfp_form_1.cfp_selector.selectedIndex, 'sheetIDXXX');
  }
  return false;
}

