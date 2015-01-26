var footballPitchUnit = 1;

function setFootballPitchUnit (id) {

  for ( var i=1; i<=2; i++)
    if (i==id) document.getElementById('football-pitch-unit-' + i).className = 'selectedNavItem';
    else       document.getElementById('football-pitch-unit-' + i).className = 'unselectedNavItem';

  footballPitchUnit = id;

  initLandYieldCharts(footballPitchUnit)
  updateLandYields(footballPitchUnit);

}

var resourcesSubscreenID = 1;

function switchResourceScreen (id) {

  // if (resourcesSubscreenID == id) return;

  for ( var i=1; i<=7; i++)
    if (i==id) document.getElementById('resources-subnav-' + i).className = 'selected';
    else       document.getElementById('resources-subnav-' + i).className = '';


  while (document.getElementById("resource-data-table").hasChildNodes()) {
    var Knoten = document.getElementById("resource-data-table").firstChild;
    verschwunden = document.getElementById("resource-data-table").removeChild(Knoten);
  }

  if (id == 1) {

    document.getElementById("resource-info").innerHTML = "";

    while (document.getElementById("resource-screen-table").hasChildNodes()) {
      var Knoten = document.getElementById("resource-screen-table").firstChild;
      verschwunden = document.getElementById("resource-screen-table").removeChild(Knoten);
    }



    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    newdiv1.setAttribute("id",  "container_land_overview");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);

    document.getElementById("container_land_overview").setAttribute("style", "width:530px; height:310px");

    initLandCharts();
    updateLand();
  }

  else if (id == 2) {

    document.getElementById("resource-info").innerHTML = ""; 

    while (document.getElementById("resource-screen-table").hasChildNodes()) {
      var Knoten = document.getElementById("resource-screen-table").firstChild;
      verschwunden = document.getElementById("resource-screen-table").removeChild(Knoten);
    }

/*
    var tableNode1  = document.createElement("table");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode1.appendChild(rowNode);

    appendDataTableRow ('Beef (pasture fed)', 		  		'yields_beef_pasture', tableNode1);
    appendDataTableRow ('Beef (fed on grains & residues)', 		'yields_beef_grains_and_residues', tableNode1);
    appendDataTableRow ('Sheep & goat meat (pasture fed)',		'yields_sheep_and_goat_meat_pasture', tableNode1);
    appendDataTableRow ('Sheep & goat meat (fed on grains & residues)',	'yields_sheep_and_goat_meat_grains_and_residues', tableNode1);
    appendDataTableRow ('Poultry', 					'yields_poultry', tableNode1);
    appendDataTableRow ('Pork', 					'yields_pork', tableNode1);
    appendDataTableRow ('Eggs', 					'yields_eggs', tableNode1);


    var tableNode2  = document.createElement("table");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode2.appendChild(rowNode);

    appendDataTableRow ('Milk products', 	'yields_milk_products', tableNode2);
    appendDataTableRow ('Cereals & grains', 	'yields_cereals_and_grains', tableNode2);
    appendDataTableRow ('Sugars', 		'yields_sugars', tableNode2);
    appendDataTableRow ('Fruit & vegetables', 'yields_fruit_and_vegetables', tableNode2);
    appendDataTableRow ('Pulses', 		'yields_pulses', tableNode2);
    appendDataTableRow ('Vegetable oil', 	'yields_vegetable_oil', tableNode2);
    appendDataTableRow ('Bioenergy', 		'yields_bioenergy', tableNode2);




    rowNode  = document.createElement("tr");

    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Yields from one football pitch during one year"));
    rowNode.appendChild(cellNode);
    document.getElementById("resource-data-table").appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "right");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Display values in "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in kg");
    a.innerHTML = "kg";
    a.onclick = function() { setFootballPitchUnit(1); return false; };

    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));

    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setFootballPitchUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);

    document.getElementById("resource-data-table").appendChild(rowNode);


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode2);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-data-table").appendChild(rowNode);


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Mass includes the water in the produce, as defined by UN Food and Agriculture Organisation Stat."));
    rowNode.appendChild(cellNode);
    document.getElementById("resource-data-table").appendChild(rowNode);


    document.getElementById("resource-data-table").setAttribute("style", "height:310px");
*/


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_land_yields_football_pitch");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);

    document.getElementById("container_land_yields_football_pitch").setAttribute("style", "width:730px; height:310px");

    initLandYieldCharts(footballPitchUnit)
    updateLandYields(footballPitchUnit);









    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "left");
    cellNode.setAttribute("valign", "top");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Display values in "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in kg");
    a.innerHTML = "kg";
    a.onclick = function() { setFootballPitchUnit(1); return false; };

    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));

    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setFootballPitchUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-data-table").appendChild(rowNode);


    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "football-pitch-info-txt");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "bottom");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-data-table").appendChild(rowNode);

    document.getElementById("football-pitch-info-txt").innerHTML = "The Global Calculator makes the simple assumption that yields by kcal for cereals, grains, sugar, fruit and vegetables, pulses and vegetable oil are the same.  However the yields by kg for these foods differ because they have different water contents.<br><br>Mass includes the water in the produce, as defined by UN Food and Agriculture Organisation Stat.";

    document.getElementById("resource-data-table").setAttribute("style", "height:310px");
    document.getElementById("football-pitch-info-txt").setAttribute("style", "width:130px");








  }

  else if (id == 3) {

    document.getElementById("resource-info").innerHTML = ""; 

    while (document.getElementById("resource-screen-table").hasChildNodes()) {
      var Knoten = document.getElementById("resource-screen-table").firstChild;
      verschwunden = document.getElementById("resource-screen-table").removeChild(Knoten);
    }

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_land_yields_grain_fed");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);

    document.getElementById("container_land_yields_grain_fed").setAttribute("style", "width:530px; height:310px");

    initLandGrainFedCharts();
    updateLandGrainFedCharts();

  }


/*
  else if (id == 2) {

    document.getElementById("resource-info").innerHTML = ""; //Mass includes the<br>water in the<br>produce, as defined<br>by UN Food and<br>Agriculture Organisation<br>Stat.";

    while (document.getElementById("resource-screen-table").hasChildNodes()) {
      var Knoten = document.getElementById("resource-screen-table").firstChild;
      verschwunden = document.getElementById("resource-screen-table").removeChild(Knoten);
    }


    var tableNode1  = document.createElement("table");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode1.appendChild(rowNode);

    appendDataTableRow ('Beef (pasture fed)', 		  		'yields_beef_pasture', tableNode1);
    appendDataTableRow ('Beef (fed on grains & residues)', 		'yields_beef_grains_and_residues', tableNode1);
    appendDataTableRow ('Sheep & goat meat (pasture fed)',		'yields_sheep_and_goat_meat_pasture', tableNode1);
    appendDataTableRow ('Sheep & goat meat (fed on grains & residues)',	'yields_sheep_and_goat_meat_grains_and_residues', tableNode1);
    appendDataTableRow ('Poultry', 					'yields_poultry', tableNode1);
    appendDataTableRow ('Pork', 					'yields_pork', tableNode1);
    appendDataTableRow ('Eggs', 					'yields_eggs', tableNode1);


    var tableNode2  = document.createElement("table");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2011"));
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("id",  "rightBorder");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "right");
    cellNode.appendChild(document.createTextNode("2050"));
    rowNode.appendChild(cellNode);

    tableNode2.appendChild(rowNode);

    appendDataTableRow ('Milk products', 	'yields_milk_products', tableNode2);
    appendDataTableRow ('Cereals & grains', 	'yields_cereals_and_grains', tableNode2);
    appendDataTableRow ('Sugars', 		'yields_sugars', tableNode2);
    appendDataTableRow ('Fruit & vegetables', 'yields_fruit_and_vegetables', tableNode2);
    appendDataTableRow ('Pulses', 		'yields_pulses', tableNode2);
    appendDataTableRow ('Vegetable oil', 	'yields_vegetable_oil', tableNode2);
    appendDataTableRow ('Bioenergy', 		'yields_bioenergy', tableNode2);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("rowspan", "4");
    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "container_land_yields_grain_fed");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Yields from one football pitch during one year"));
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "right");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Display values in "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in kg");
    a.innerHTML = "kg";
    a.onclick = function() { setFootballPitchUnit(1); return false; };

    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));

    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'football-pitch-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setFootballPitchUnit(2); return false; };

    cellNode.appendChild(a);

    rowNode.appendChild(cellNode);

    document.getElementById("resource-screen-table").appendChild(rowNode);



    rowNode  = document.createElement("tr");

    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(tableNode2);
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);

    rowNode  = document.createElement("tr");
//    cellNode = document.createElement("td");
//    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");

    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.appendChild(document.createTextNode("Mass includes the water in the produce, as defined by UN Food and Agriculture Organisation Stat."));
    rowNode.appendChild(cellNode);
    document.getElementById("resource-screen-table").appendChild(rowNode);


    document.getElementById("container_land_yields_grain_fed").setAttribute("style", "width:300px; height:310px");

    document.getElementById("resource-screen-table").setAttribute("style", "height:310px");


    initLandYieldCharts();
    updateLandYields(footballPitchUnit);

  }
*/
  else if (id >= 4 && id <= 7) {

    document.getElementById("resource-info").innerHTML = "Reserves are<br>economically<br>viable to extract;<br> resources are more <br>speculative, and not<br>economically <br>viable to extract.";


    // init resource charts, if we come from land section
    if (resourcesSubscreenID < 4) {

    while (document.getElementById("resource-screen-table").hasChildNodes()) {
      var Knoten = document.getElementById("resource-screen-table").firstChild;
      verschwunden = document.getElementById("resource-screen-table").removeChild(Knoten);
    }

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
    document.getElementById("resource-screen-table").appendChild(rowNode);


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

    initFossilFuelsCharts ();
    }
    adjustFFCharts (id-4);
  }

  resourcesSubscreenID = id;
  return false;
}

