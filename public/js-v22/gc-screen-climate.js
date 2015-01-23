// ----------------------------------------------------------------------------
// id of active 2nd level subscreen 
// ----------------------------------------------------------------------------
var climateSubscreenID = 1; 

// ----------------------------------------------------------------------------
// ids of respective active 3rd level subscreens
// ----------------------------------------------------------------------------
var physicalChangesSubNavID = 1;
var humanImpactsSubNavID    = 1;
var basicPhysicsSubNavID    = 1;


// ----------------------------------------------------------------------------
// handle the selection of a 2nd level subscreen 
// ----------------------------------------------------------------------------
function handleClimate2ndLevelNavigation (activeId) {

  // alert ("handleClimate2ndLevelNavigation (" + activeId + ")");

  for ( var i=1; i<=3; i++)
    if (i==activeId) document.getElementById('climate-2ln-' + i).className = 'selectedNavItem';
    else             document.getElementById('climate-2ln-' + i).className = 'unselectedNavItem';

  climateSubscreenID = activeId;

  var tableID = 'climate-3rd-level-nav-table';
  deleteRows(tableID);

  if (activeId==1) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'climate-physical-changes-subnav', physicalChangesSubNavID,  1, translate ('Temperature change over time'));
    createSubNavItemRow (tableID, 'climate-physical-changes-subnav', physicalChangesSubNavID,  2, translate ('Temperature change maps'));
    createSubNavItemRow (tableID, 'climate-physical-changes-subnav', physicalChangesSubNavID,  3, translate ('Precipitation change maps'));
    createSubNavItemRow (tableID, 'climate-physical-changes-subnav', physicalChangesSubNavID,  4, translate ('Ocean acidification'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handlePhysicalChangesSubnavigation (physicalChangesSubNavID);
  } 
  else if (activeId==2) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'climate-impacts-subnav', humanImpactsSubNavID,  1, translate ('Summary impacts'));
    createSubNavItemRow (tableID, 'climate-impacts-subnav', humanImpactsSubNavID,  2, translate ('Detailed impacts'));
    createSubNavItemRow (tableID, 'climate-impacts-subnav', humanImpactsSubNavID,  3, translate ('Extreme weather'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleHumanImpactsSubnavigation (humanImpactsSubNavID);
  } 
  else if (activeId==3) {
    createNavTableHeader (tableID);
    createSubNavItemRow (tableID, 'climate-basic-physics-subnav', basicPhysicsSubNavID,  1, translate ('Basic physics'));

    document.getElementById(tableID).setAttribute("style", "width:180px");
    handleBasicPhysicsSubnavigation (basicPhysicsSubNavID);
  } 
}

// ----------------------------------------------------------------------------
// handle the selection of a 3rd level subscreen  
// in section 'Physical Changes'
// ----------------------------------------------------------------------------
function handlePhysicalChangesSubnavigation (id) {

  //if (physicalChangesSubNavID == id) return; 

  //alert ("handlePhysicalChangesSubnavigation (" + id + ")");

  physicalChangesSubNavID = id;

  for ( var i=1; i<=4; i++)
    if (i==id) document.getElementById('climate-physical-changes-subnav-' + i).className = 'selectedNavItem';
    else       document.getElementById('climate-physical-changes-subnav-' + i).className = 'unselectedNavItem';

  // ----------------------------------------------------------------- 
  // hide all climate related containers
  // ----------------------------------------------------------------- 
  contentDivs["climate-temperature-change"].className 	= 'tabContent hide';
  contentDivs["climate-maps"].className 		= 'tabContent hide';
  contentDivs["climate-impacts-summary"].className 	= 'tabContent hide';
  contentDivs["climate-impacts-details"].className 	= 'tabContent hide';
  contentDivs["climate-extreme-weather"].className 	= 'tabContent hide';
  contentDivs["climate-basic-physics"].className 	= 'tabContent hide';

  document.getElementById("model-uncertainty-levers").className = '';


  // ------------------------------------------------------------------ 
  // Temperature change over time
  // ------------------------------------------------------------------ 
  if (id == 1) {
    document.getElementById("container_cc_1").className = '';
    document.getElementById("cc-temp-info").className = '';
    updateThermometer(chart_cc_temperature_change, 'temperature-msg-cs');
    contentDivs["climate-temperature-change"].className 	= 'tabContent';
    updateTempTimeseries();
  }
  // ------------------------------------------------------------------ 
  // Maps
  // ------------------------------------------------------------------ 
  else if (id == 2 || id == 3 || id == 4) {

    if      (id == 2) updateTempMapAnimation();
    else if (id == 3) updatePrecipMapAnimation();
    else if (id == 4) updateOAMapAnimation ();

    if      (id == 2) document.getElementById("climate-map-info").innerHTML = translate ("Regional temperature change consistent with your pathway");
    else if (id == 3) document.getElementById("climate-map-info").innerHTML = translate ("Regional precipitation change consistent with your pathway");
    else if (id == 4) document.getElementById("climate-map-info").innerHTML = translate ("Regional ocean acidification change consistent with your pathway");

    if      (id == 2) document.getElementById("climate-map-key-msg").innerHTML = translate ("More warming over land than ocean, more warming in arctic areas than near equator");
    else if (id == 3) document.getElementById("climate-map-key-msg").innerHTML = translate ("The largest changes in total annual precipitation are experienced in the tropics");
    else if (id == 4) document.getElementById("climate-map-key-msg").innerHTML = translate ("The strongest acidification of the ocean is experienced in the Arctic regions");

    document.getElementById("container_cc_1").className = '';
    document.getElementById("cc-temp-info").className = '';
    updateThermometer(chart_cc_temperature_change, 'temperature-msg-cs');
    contentDivs["climate-maps"].className 			= 'tabContent';
  }
}

// ----------------------------------------------------------------------------
// handle the selection of a 3rd level subscreen  
// in section 'Human Impacts'
// ----------------------------------------------------------------------------
function handleHumanImpactsSubnavigation (id) {

  document.getElementById("model-uncertainty-levers").className = '';

  //if (humanImpactsSubNavID == id) return; 

  humanImpactsSubNavID = id;

  for ( var i=1; i<=3; i++)
    if (i==id) document.getElementById('climate-impacts-subnav-' + i).className = 'selectedNavItem';
    else       document.getElementById('climate-impacts-subnav-' + i).className = 'unselectedNavItem';

  // ----------------------------------------------------------------- 
  // hide all climate related containers
  // ----------------------------------------------------------------- 
  contentDivs["climate-temperature-change"].className 	= 'tabContent hide';
  contentDivs["climate-maps"].className 		= 'tabContent hide';
  contentDivs["climate-impacts-summary"].className 	= 'tabContent hide';
  contentDivs["climate-impacts-details"].className 	= 'tabContent hide';
  contentDivs["climate-extreme-weather"].className 	= 'tabContent hide';
  contentDivs["climate-basic-physics"].className 	= 'tabContent hide';

  // ------------------------------------------------------------------ 
  // Summary impacts
  // ------------------------------------------------------------------ 
  if (id == 1) {
    document.getElementById("container_cc_1").className = '';
    document.getElementById("cc-temp-info").className = '';
    contentDivs["climate-impacts-summary"].className 	= 'tabContent';
    updateThermometer(chart_cc_temperature_change, 'temperature-msg-cs');
    updateBurningEmber(); 
  }
  // ------------------------------------------------------------------ 
  // Detailed impacts
  // ------------------------------------------------------------------ 
  else if (id == 2) {
    document.getElementById("container_cc_1").className = '';
    document.getElementById("cc-temp-info").className = '';
    contentDivs["climate-impacts-details"].className 	= 'tabContent';

    updateThermometer(chart_cc_temperature_change, 'temperature-msg-cs');


  }
  // ------------------------------------------------------------------ 
  // Extreme weather
  // ------------------------------------------------------------------ 
  else if (id == 3) {
    document.getElementById("container_cc_1").className = 'tabContent hide';
    document.getElementById("cc-temp-info").className = 'tabContent hide';
    contentDivs["climate-extreme-weather"].className 	= 'tabContent';
  }
}

// ----------------------------------------------------------------------------
// handle the selection of a 3rd level subscreen 
// in section 'Basic Physics'
// ----------------------------------------------------------------------------
function handleBasicPhysicsSubnavigation (id) {


  document.getElementById("model-uncertainty-levers").className 	= 'tabContent hide';

  //if (basicPhysicsSubNavID == id) return; 

  basicPhysicsSubNavID = id;

  for ( var i=1; i<=1; i++)
    if (i==id) document.getElementById('climate-basic-physics-subnav-' + i).className = 'selectedNavItem';
    else       document.getElementById('climate-basic-physics-subnav-' + i).className = 'unselectedNavItem';

  // ----------------------------------------------------------------- 
  // hide all climate related containers
  // ----------------------------------------------------------------- 
  contentDivs["climate-temperature-change"].className 	= 'tabContent hide';
  contentDivs["climate-maps"].className 		= 'tabContent hide';
  contentDivs["climate-impacts-summary"].className 	= 'tabContent hide';
  contentDivs["climate-impacts-details"].className 	= 'tabContent hide';
  contentDivs["climate-extreme-weather"].className 	= 'tabContent hide';
  contentDivs["climate-basic-physics"].className 	= 'tabContent hide';

  // ------------------------------------------------------------------ 
  // Basic physics
  // ------------------------------------------------------------------ 
  if  (id == 1) {
    document.getElementById("container_cc_1").className = 'tabContent hide';
    document.getElementById("cc-temp-info").className = 'tabContent hide';
    contentDivs["climate-basic-physics"].className 		= 'tabContent';
    updateBasicPhysics();
  }
}

