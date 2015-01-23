// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var technologySubscreenID = 1;

// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
// var transportSubNavID	= 1;
// var buildingsSubNavID 	= 1;
// var manufacturingSubNavID = 1;
// var electricitySubNavID = 1;
// var bioenergySubNavID = 1;
// var fossilFuelSubNavID = 1;
var ggrSubNavID = 1;


function handleTechnology2ndLevelNavigation (activeId) {
  for ( var i=1; i<=7; i++)
    if (i==activeId) document.getElementById('technology-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-2ln-' + i).className = 'unselectedNavItem';

  technologySubscreenID = activeId;

  var tableID = 'technology-3rd-level-nav-table';
  deleteRows(tableID);


  if (activeId != 7) contentDivs["ggr-x"].className = 'tabContent hide';
  else               contentDivs["ggr-x"].className = 'tabContent';

  if (activeId==1) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  1, translate ('Cars - technology and fuel'));
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  2, translate ('Mode'));
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  3, translate ('Fuel type'));
    createSubNavItemRow (tableID, 'technology-transport-subnav', transportSubNavID,  4, translate ('Freight by load'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleTransportSubnavigation (transportSubNavID);
  } 
  else if (activeId==2) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  1, translate ('Insulation and technology'));
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  2, translate ('Energy use'));
    createSubNavItemRow (tableID, 'technology-buildings-subnav', buildingsSubNavID,  3, translate ('Fuel type'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleBuildingsSubnavigation (buildingsSubNavID);
  } 
  else if (activeId==3) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  1, translate ('Overview'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  2, translate ('Iron and steel'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  3, translate ('Aluminium'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  4, translate ('Chemicals'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  5, translate ('Paper & other'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  6, translate ('Cement'));
    createSubNavItemRow (tableID, 'technology-manufacturing-subnav', manufacturingSubNavID,  7, translate ('Sales of products'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleManufacturingSubnavigation (manufacturingSubNavID);
  } 
  
  else if (activeId==4) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-electricity-subnav', electricitySubNavID,  1, translate ('Electricity'));
    createSubNavItemRow (tableID, 'technology-electricity-subnav', electricitySubNavID,  2, translate ('Carbon intensity'));
    createSubNavItemRow (tableID, 'technology-electricity-subnav', electricitySubNavID,  3, translate ('Uranium'));

    var newdivInfo = document.createElement ('div');
    newdivInfo.setAttribute("id",  "uranium-info-txt");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "3");
    cellNode.appendChild(newdivInfo);
    var rowNode  = document.createElement("tr");
    rowNode.appendChild(cellNode);
    document.getElementById(tableID).appendChild(rowNode);

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleElectricitySubnavigation (electricitySubNavID);
  } 
  else if (activeId==5) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-bioenergy-subnav', bioenergySubNavID,  1, translate ('Bioenergy'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleBioenergySubnavigation (bioenergySubNavID);
  } 
    
  else if (activeId==6) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  1, translate ('Oil'));
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  2, translate ('Gas'));
    createSubNavItemRow (tableID, 'technology-fossilFuel-subnav', fossilFuelSubNavID,  3, translate ('Coal'));

    var newdivInfo = document.createElement ('div');
    newdivInfo.setAttribute("id",  "ff-info-txt");
    var cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "3");
    cellNode.appendChild(newdivInfo);
    var rowNode  = document.createElement("tr");
    rowNode.appendChild(cellNode);
    document.getElementById(tableID).appendChild(rowNode);

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleFossilFuelSubnavigation (fossilFuelSubNavID);
  } 

  else if (activeId == 7) {

    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'technology-ggr-subnav', ggrSubNavID,  1, translate ('GGR'));

    deleteRows('technology-content-table');
    deleteRows('technology-content-table-2');
    contentDivs["ggr-x"].className = 'tabContent';

    document.getElementById(tableID).setAttribute("style", "width:180px");
    updateGGR();
  }

}

