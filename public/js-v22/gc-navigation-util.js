/* ****************************************************************************
 *
 * utility functions for dynamically setting up the 3rd level navigation
 * 
 **************************************************************************** */

// ----------------------------------------------------------------------
// delete all rows in table tableID
// ----------------------------------------------------------------------
function deleteRows(tableID) {
  while (document.getElementById(tableID).hasChildNodes()) {
    var aNode = document.getElementById(tableID).firstChild;
    gone = document.getElementById(tableID).removeChild(aNode);
  }
}

// ----------------------------------------------------------------------
// create a navigation table header in table tableID
// ----------------------------------------------------------------------
function createNavTableHeader (tableID) {

  var rowNode  = document.createElement("tr");
  var cellNode = document.createElement("td");
  cellNode.style.width = "180px";
  //cellNode.setAttribute('width',  '130px');
  cellNode.setAttribute("colspan", "3");

  var txt = document.createTextNode(translate ("Display")); // create text node
  cellNode.appendChild(txt);                   // append DIV to the table cell
  rowNode.appendChild(cellNode);
  document.getElementById(tableID).appendChild(rowNode);


  rowNode  = document.createElement("tr");
  cellNode = document.createElement("td");
  cellNode.setAttribute("colspan", "3");

  var hr = document.createElement("hr");
  hr.setAttribute("color",   "gray");
  hr.setAttribute("noshade", "");
  hr.setAttribute("size", 	 "1");

  cellNode.appendChild(hr);
  rowNode.appendChild(cellNode);

  document.getElementById(tableID).appendChild(rowNode);
}

// ----------------------------------------------------------------------
// create a navigation item in table tableID
// assign onclick function based on navSubsetID
// ----------------------------------------------------------------------
function createSubNavItemRow (tableID, navSubsetID, persistentID, id, name) {

  var rowNode  = document.createElement("tr");
  var cellNode = document.createElement("td");

  var txt = document.createTextNode("-"); 
  cellNode.setAttribute("width", "5px");
  cellNode.appendChild(txt);              
  rowNode.appendChild(cellNode);

  cellNode = document.createElement("td");
  cellNode.setAttribute("style", "white-space: nowrap");
  cellNode.setAttribute("align", "left");

  var classID = (persistentID == id) ? 'selectedNavItem' : 'unselectedNavItem';

  var a = document.createElement('a');
  a.href =  "";
  a.setAttribute("id",    navSubsetID + '-' + id);
  a.setAttribute('class', classID);
  a.setAttribute('title', translate("Display") + ": '" + translate(name) + "'");
  a.innerHTML = name;

  if (navSubsetID == 'overview-energy-subnav') {
    a.onclick = function() { handleEnergySubnavigation (id); return false; };
  }
  else if (navSubsetID == 'overview-emissions-subnav') {
    a.onclick = function() { handleEmissionSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'overview-costs-subnav') {
    a.onclick = function() { handleCostSubnavigation (id); return false; };
  }

  else if (navSubsetID == 'technology-transport-subnav') {
    a.onclick = function() { handleTransportSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-buildings-subnav') {
    a.onclick = function() { handleBuildingsSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-manufacturing-subnav') {
    a.onclick = function() { handleManufacturingSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-electricity-subnav') {
    a.onclick = function() { handleElectricitySubnavigation (id); return false; };
  }
  else if (navSubsetID == 'technology-bioenergy-subnav') {
    a.onclick = function() { handleBioenergySubnavigation (id); return false; };
  }

  else if (navSubsetID == 'technology-fossilFuel-subnav') {
    a.onclick = function() { handleFossilFuelSubnavigation (id); return false; };
  }

  else if (navSubsetID == 'lifestyle-home-subnav') {
    a.onclick = function() { handleHomeSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'lifestyle-travel-subnav') {
    a.onclick = function() { handleTravelSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'lifestyle-diet-subnav') {
    a.onclick = function() { handleDietSubnavigation (id); return false; };
  }


  else if (navSubsetID == 'climate-physical-changes-subnav') {
    a.onclick = function() { handlePhysicalChangesSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'climate-impacts-subnav') {
    a.onclick = function() { handleHumanImpactsSubnavigation (id); return false; };
  }
  else if (navSubsetID == 'climate-basic-physics-subnav') {
    a.onclick = function() { handleBasicPhysicsSubnavigation (id); return false; };
  }





  else {
    a.onclick = function() { return false; };
  }

  cellNode.appendChild(a);
  rowNode.appendChild(cellNode);

  cellNode = document.createElement("td");
  cellNode.setAttribute('width',  '100%');
  rowNode.appendChild(cellNode);
 
  document.getElementById(tableID).appendChild(rowNode);
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



///////////////////////////////////////////////////////////////

