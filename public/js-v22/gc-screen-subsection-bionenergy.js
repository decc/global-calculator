// ----------------------------------------------------------------------------
// id of respective active 3rd level subscreen
// ----------------------------------------------------------------------------
var bioenergySubNavID = 1;

// -------------------------------------------------------------
// handle screen selection in subsection Bioenergy
// -------------------------------------------------------------
function handleBioenergySubnavigation (activeId) {
  for ( var i=1; i<=1; i++)
    if (i==activeId) document.getElementById('technology-bioenergy-subnav-' + i).className = 'selectedNavItem';
    else             document.getElementById('technology-bioenergy-subnav-' + i).className = 'unselectedNavItem';

  bioenergySubNavID = activeId;

  deleteRows('technology-content-table');
  deleteRows('technology-content-table-2');

  // -------------------------------------------------------------
  // Bioenergy: Bioenergy
  // -------------------------------------------------------------
  if (activeId==1) {

    var rowNode = document.createElement("tr");
    addDivCell (rowNode, "container_bioenergy_1");
    addDivCell (rowNode, "container_bioenergy_2");

    document.getElementById("technology-content-table").appendChild(rowNode);

    document.getElementById("container_bioenergy_1").setAttribute("style", "width:330px; height:310px");
    document.getElementById("container_bioenergy_2").setAttribute("style", "width:330px; height:310px");

    initBioenergyCharts ();
    updateBioenergy ();

  }
}

