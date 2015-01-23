var dietTableUnit = 1;

function setDietTableUnit (id) {

  for ( var i=1; i<=2; i++)
    if (i==id) document.getElementById('diet-table-unit-' + i).className = 'selectedNavItem';
    else       document.getElementById('diet-table-unit-' + i).className = 'unselectedNavItem';

  dietTableUnit = id;

  initFoodCharts();
  updateFood();
//  updateDietTable (dietTableUnit);

}



var lifestyleSubscreenID = 1;

function switchLifestyleScreen (id) {

  // if (lifestyleSubscreenID == id) return;

  lifestyleSubscreenID = id;

  for ( var i=1; i<=4; i++)
    if (i==id) document.getElementById('lifestyle-subnav-' + i).className = 'selected';
    else       document.getElementById('lifestyle-subnav-' + i).className = '';


  while (document.getElementById("lifestyle-screen-table").hasChildNodes()) {
    var Knoten = document.getElementById("lifestyle-screen-table").firstChild;
    verschwunden = document.getElementById("lifestyle-screen-table").removeChild(Knoten);
  }

  while (document.getElementById("lifestyle-data-table").hasChildNodes()) {
    var Knoten = document.getElementById("lifestyle-data-table").firstChild;
    verschwunden = document.getElementById("lifestyle-data-table").removeChild(Knoten);
  }

  // -------------------------------------------------------------
  // Homes: Home Temp. and size
  // -------------------------------------------------------------
  if (id == 1) {

    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_home_temp_summer");
    newdiv2.setAttribute("id",  "container_lifestyle_home_temp_winter");
    newdiv3.setAttribute("id",  "container_lifestyle_home_size");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_home_temp_summer").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_home_temp_winter").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_home_size").setAttribute("style", "width:250px; height:310px");

    initHomeTempAndSizeCharts();
    updateHomeTempAndSizeCharts();

  }
  // -------------------------------------------------------------
  // Homes: Appliances
  // -------------------------------------------------------------
  else if (id == 2) {
    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_number_of_appliances");
    newdiv2.setAttribute("id",  "container_lifestyle_number_of_lightbulbs");
    newdiv3.setAttribute("id",  "container_lifestyle_energy_consumption");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_number_of_appliances").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_number_of_lightbulbs").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_energy_consumption").setAttribute("style", "width:250px; height:310px");

    initHomeAppliancesCharts();
    updateHomeAppliancesCharts();
  }

  // -------------------------------------------------------------
  // Travel: Travel per person
  // -------------------------------------------------------------
  else if (id == 3) {

    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_distance_travelled_by_car");
    newdiv2.setAttribute("id",  "container_lifestyle_percent_km_travelled_by_car");
    newdiv3.setAttribute("id",  "container_lifestyle_cars_per_person");


    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_lifestyle_distance_travelled_by_car").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_percent_km_travelled_by_car").setAttribute("style", "width:250px; height:310px");
    document.getElementById("container_lifestyle_cars_per_person").setAttribute("style", "width:250px; height:310px");

    initTravelSectionCharts();
    updateTravelSectionCharts();
  }

  // -------------------------------------------------------------
  // Diet: Diet
  // -------------------------------------------------------------
  else if (id == 4) {

    var newdiv1 = document.createElement ('div');
    newdiv1.setAttribute("id",  "container_food_bioenergy_1");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("container_food_bioenergy_1").setAttribute("style", "width:600px; height:310px");

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

    appendDataTableRow ('Beef', 	  	'diet_beef', tableNode1);
    appendDataTableRow ('Poultry', 	  	'diet_poultry', tableNode1);
    appendDataTableRow ('Pork', 	  	'diet_pork', tableNode1);
    appendDataTableRow ('Sheep and goat meat',	'diet_sheep_and_goat_meat', tableNode1);
    appendDataTableRow ('Fish', 		'diet_fish', tableNode1);
    appendDataTableRow ('Eggs', 		'diet_eggs', tableNode1);
    appendDataTableRow ('Milk products', 	'diet_milk_products', tableNode1);

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    tableNode1.appendChild(rowNode);


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

    appendDataTableRow ('Other animal products','diet_other_animal_products', tableNode2);
    appendDataTableRow ('Cereals and grains', 	'diet_cereals_and_grains', tableNode2);
    appendDataTableRow ('Sugars', 		'diet_sugars', tableNode2);
    appendDataTableRow ('Fruit, vegetables', 	'diet_fruit_vegetables', tableNode2);
    appendDataTableRow ('Pulses', 		'diet_pulses', tableNode2);
    appendDataTableRow ('Vegetable oil', 	'diet_vegetable_oil', tableNode2);
    appendDataTableRow ('Other', 		'diet_other', tableNode2);
    appendDataTableRow ('Total', 		'diet_total', tableNode2);



    rowNode  = document.createElement("tr");

    cellNode = document.createElement("td");
    cellNode.setAttribute("colspan", "5");
    cellNode.setAttribute("align", "center");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Diet per person per day"));
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);

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
    a.setAttribute("id",    'diet-table-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in grams");
    a.innerHTML = "grams";
    a.onclick = function() { setDietTableUnit(1); return false; };

    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));

    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'diet-table-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setDietTableUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-data-table").appendChild(rowNode);


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "top");
    cellNode.appendChild(tableNode1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "top");
    cellNode.appendChild(tableNode2);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);
*/



    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("align", "left");
    cellNode.setAttribute("valign", "top");
    cellNode.setAttribute("style", "white-space: nowrap");
    cellNode.appendChild(document.createTextNode("Display values in "));

    var a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'diet-table-unit-1');
    a.setAttribute('class', 'selectedNavItem');
    a.setAttribute('title', "Display in grams");
    a.innerHTML = "grams";
    a.onclick = function() { setDietTableUnit(1); return false; };
    cellNode.appendChild(a);
    cellNode.appendChild(document.createTextNode(" | "));
    a = document.createElement('a');
    a.href =  "";
    a.setAttribute("id",    'diet-table-unit-2');
    a.setAttribute('class', 'unselectedNavItem');
    a.setAttribute('title', "Display in kcal");
    a.innerHTML = "kcal";
    a.onclick = function() { setDietTableUnit(2); return false; };

    cellNode.appendChild(a);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);


    var newdiv = document.createElement ('div');
    newdiv.setAttribute("id",  "diet-info-txt");

    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.setAttribute("valign", "bottom");
    cellNode.appendChild(newdiv);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-data-table").appendChild(rowNode);

    document.getElementById("diet-info-txt").innerHTML = "The cereals, grains, sugar, fruit and vegetables, pulses and vegetable oil split is illustrative because the Global Calculator does not model this breakdown explicitly.  Rather, the Global Calculator models the total calories from these crops and makes a simple assumption about how this is split by type of crop.<br><br>Mass includes the water in the produce, as defined by FAO Stat.";


    document.getElementById("lifestyle-data-table").setAttribute("style", "height:310px");
    document.getElementById("diet-info-txt").setAttribute("style", "width:130px");



    initFoodCharts();
    updateFood();
  }
  // -------------------------------------------------------------
  // Diet: Health
  // -------------------------------------------------------------
  else if (id == 5) {

    var newdiv1 = document.createElement ('div');
    newdiv1.setAttribute("id",  "some-placeholder");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    document.getElementById("lifestyle-screen-table").appendChild(rowNode);

    document.getElementById("some-placeholder").setAttribute("style", "width:330px; height:310px");


  }

  // -------------------------------------------------------------
  // Old home and transport
  // -------------------------------------------------------------
  else if (id == 6) {

    var newdiv1 = document.createElement ('div');
    var newdiv2 = document.createElement ('div');
    var newdiv3 = document.createElement ('div');
    var newdiv4 = document.createElement ('div');
    var newdiv5 = document.createElement ('div');
    var newdiv6 = document.createElement ('div');
    var newdiv7 = document.createElement ('div');

    newdiv1.setAttribute("id",  "container_lifestyle_chart_1");
    newdiv2.setAttribute("id",  "container_lifestyle_chart_2");
    newdiv3.setAttribute("id",  "container_lifestyle_chart_3");
    newdiv4.setAttribute("id",  "container_lifestyle_chart_4");
    newdiv5.setAttribute("id",  "container_lifestyle_chart_5");
    newdiv6.setAttribute("id",  "container_lifestyle_chart_6");
    newdiv7.setAttribute("id",  "container_lifestyle_chart_7");

    var rowNode  = document.createElement("tr");
    var cellNode = document.createElement("td");
    cellNode.appendChild(newdiv1);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv2);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv3);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.setAttribute("rowspan",  "2");
    cellNode.setAttribute("valign",  "top");
    cellNode.appendChild(newdiv7);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);


    rowNode  = document.createElement("tr");
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv4);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv5);
    rowNode.appendChild(cellNode);
    cellNode = document.createElement("td");
    cellNode.appendChild(newdiv6);
    rowNode.appendChild(cellNode);

    document.getElementById("lifestyle-screen-table").appendChild(rowNode);


    document.getElementById("container_lifestyle_chart_1").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_2").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_3").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_4").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_5").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_6").setAttribute("style", "width:170px; height:150px");
    document.getElementById("container_lifestyle_chart_7").setAttribute("style", "width:170px; height:150px");

    initAppliancesCharts ();
    initHomeTemperatureAndSizeCharts ();
    initTravelPerPersonCharts ();

    updateAppliancesCharts ();
    updateHomeTemperatureAndSizeCharts ();
    updateTravelPerPersonCharts ();
  }
  lifestyleSubscreenID = id;
  return false;
}

