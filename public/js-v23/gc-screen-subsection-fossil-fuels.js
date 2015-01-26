// ----------------------------------------------------------------------------
// id of respective active 3rd level subscreen
// ----------------------------------------------------------------------------
var fossilFuelSubNavID = 1;

// -------------------------------------------------------------
// handle screen selection in subsection Fossil Fuels
// -------------------------------------------------------------
function handleFossilFuelSubnavigation (activeId) {

  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('technology-fossilFuel-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-fossilFuel-subnav-' + i).className = 'unselectedNavItem';

  fossilFuelSubNavID = activeId;

  deleteRows('technology-content-table');
  deleteRows('technology-content-table-2');

  // -------------------------------------------------------------
  // Fossil Fuels: Oil / Coal / Gas
  // -------------------------------------------------------------
  if (activeId==1 || activeId==2 || activeId==3) {

    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');
    var newdiv4 = document.createElement ('div');
    var newdiv5 = document.createElement ('div');
    var newdiv6 = document.createElement ('div');
    var newdiv7 = document.createElement ('div');
    newdiv1.setAttribute("id",  "container_ff_and_resources_all_1");
    newdiv2.setAttribute("id",  "container_ff_and_resources_pie_1b");
    newdiv3.setAttribute("id",  "container_ff_and_resources_pie_2b");
    newdiv4.setAttribute("id",  "container_ff_and_resources_pie_3b");
    newdiv5.setAttribute("id",  "container_ff_and_resources_pie_1a");
    newdiv6.setAttribute("id",  "container_ff_and_resources_pie_2a");
    newdiv7.setAttribute("id",  "container_ff_and_resources_pie_3a");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);

    var tableNode  = document.createElement("table");
    tableNode.setAttribute("border", "0");

    var rowNode1  = document.createElement("tr");
    var cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "ff_study_1b");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "ff_study_2b");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "ff_study_3b");
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
    cellNode1.setAttribute("id", "ff_study_1a");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "ff_study_2a");
    rowNode1.appendChild(cellNode1);
    cellNode1 = document.createElement("td");
    cellNode1.setAttribute("align", "center");
    cellNode1.setAttribute("id", "ff_study_3a");
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



    document.getElementById("ff_study_1b").innerHTML = 'based on<br>method 1: OPEC';
    document.getElementById("ff_study_2b").innerHTML = 'based on<br>method 2: EIA';
    document.getElementById("ff_study_3b").innerHTML = 'based on<br>method 3: BP';

    document.getElementById("container_ff_and_resources_all_1").setAttribute("style", "width:330px; height:310px");
    document.getElementById("container_ff_and_resources_pie_1b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_ff_and_resources_pie_2b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_ff_and_resources_pie_3b").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_ff_and_resources_pie_1a").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_ff_and_resources_pie_2a").setAttribute("style", "width:150px; height:110px");
    document.getElementById("container_ff_and_resources_pie_3a").setAttribute("style", "width:150px; height:110px");

    document.getElementById("ff_study_1a").innerHTML = 'based on<br>method 1: OPEC';
    document.getElementById("ff_study_2a").innerHTML = 'based on<br>method 2: EIA';
    document.getElementById("ff_study_3a").innerHTML = 'based on<br>method 3: BP';

    document.getElementById("ff-info-txt").innerHTML = "<br><br><br><br><br><br><hr color=\"gray\" noshade=\"\" size=\"1\">" + translate("Reserves are economically viable to extract; resources are more speculative, and not economically viable to extract.");


    initFossilFuelsCharts ();
    adjustFFCharts (activeId-1);
  }
}

