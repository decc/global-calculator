/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */




var actCfpID = ""; 
var cfpStore;

var costTechSubsetIndex = 3;  // subset to be displayed in cost compare screen (0..2) or 3 for mix

var maxYear = 2100;


function setCfpIndex (selectedIndex, sheetID) {

  // alert ("setCfpIndex (" + selectedIndex + ") " + cfps[selectedIndex]["name"]);

  actCFPIndex = selectedIndex;

  actCfpID =  getPathwayCode (selectedIndex); 
  updateCosts ();

  // sync the cfp selectors
  //  if      (sheetID == 'main_cost_screen')        document.forms.cfp_form_2.cfp_selector.selectedIndex = selectedIndex;
  //  else if (sheetID == 'cost_sensitivity_screen') document.forms.cfp_form_1.cfp_selector.selectedIndex = selectedIndex;

}

function setMaxYear (year, selectedIndex, sheetID) {

  maxYear = year;

  if (sheetID == 'overview') {
    updateDashboard ();
    document.forms.timeframe_form_ggr.max_year_selector.selectedIndex = selectedIndex;
  }
  else if (sheetID == 'ggr') {
    updateGGR();
    document.forms.timeframe_form.max_year_selector.selectedIndex = selectedIndex;
  }
}


function adjustCostChartSubset (subsetID) {
  costTechSubsetIndex = subsetID;
  updateCosts ();
}
function compare(a,b) {
  if (a.high < b.high) return 1;
  if (a.high > b.high) return -1;
  return 0;
}




  function getMaxLevelLeversForPathway (pathway) {
    var result = [];
    if (pathway.charAt(3-1)  == '4') result.push("Passenger distance");
    if (pathway.charAt(4-1)  == '4') result.push("Freight distance");
    if (pathway.charAt(5-1)  == '4') result.push("Mode & occupancy");
    if (pathway.charAt(14-1) == '4') result.push("Demand for products");
    if (pathway.charAt(31-1) == '4') result.push("Calories consumed");
    if (pathway.charAt(32-1) == '4') result.push("Meat consumed");
    if (pathway.charAt(8-1)  == '4') result.push("Building size");
    return result;
  }



function loadCounterFactualPathway (paramInfo) {

  var url = DATA_SERVICE + paramInfo; // append default cost countries: US US US

  // -----------------------------------------------------
  // send params to server and fetch the model output
  // -----------------------------------------------------
  $.getJSON(url, function(data) {

    cfpStore = [paramInfo, data[0]];

    updateCostDiagrams ();

  }); // end $.getJSON()

} // end getCounterFactualPathway (id)



/* ******************************************************
 *                                                      *
 * GGR                                                  *
 *                                                      *
 ****************************************************** */


function updateGGR () {

    // -----------------------------------------------------------------
    // pump data into the GGR screen's ghg emissions chart
    // -----------------------------------------------------------------
  
    // compile values from 1990 to 2050 for series 0   
    var vals_from_1990_to_2050 = new Array();
    
    // append the values from 1990 to 2010
    for (var i=0; i<ds["dashboard"]["GHG emissions historic Total"].length; i++)
      vals_from_1990_to_2050.push (ds["dashboard"]["GHG emissions historic Total"][i])

    // append the values from 2011, 2015, 2020 .. 2050
    for (var i=0; i<=8; i++)
      vals_from_1990_to_2050.push (ds["dashboard"]["GHG emissions projected Total"][i])

    // compile values from 2050 to 2100 for series 1 
    var vals_from_2050_to_2100 = new Array();

    // append the values from 2050 to 2100
    for (var i=8; i<ds["dashboard"]["GHG emissions projected Total"].length; i++)
      vals_from_2050_to_2100.push (ds["dashboard"]["GHG emissions projected Total"][i])

    // aggregate GGR effect from 2011 - 2050
    var ggr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var displayGGR = false;    

    for (var i=0; i<ggr.length; i++) {
        ggr[i] = ds["dashboard"]["ggr"]["Biochar"][i] 
               + ds["dashboard"]["ggr"]["Air capture"][i] 
               + ds["dashboard"]["ggr"]["Ocean fertilisation"][i] 
               + ds["dashboard"]["ggr"]["Enhanced weathering ocean"][i] 
               + ds["dashboard"]["ggr"]["Enhanced weathering terrestrial"][i];

         if (ggr[i] > 0) displayGGR = true;
      }

    // ---------------------------------------------------------------------------------------
    // if no GGR effect, disable series
    // ---------------------------------------------------------------------------------------
    if (! displayGGR ) {
      chart_ggr_ghg_emissions.series[2].hide();
//      chart_ggr_ghg_emissions.xAxis[0].update({max: 2150}, true);
    }
    else {
      chart_ggr_ghg_emissions.series[2].show();
      var emWithoutGGR = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i=0; i<9; i++) 
        emWithoutGGR[i] = ds["dashboard"]["GHG emissions projected Total"][i] + ggr[i];
      setDataPoints (chart_ggr_ghg_emissions, 2, roundArrayValues2 ( transformMt2Gt (emWithoutGGR) ));
    }

    setDataPoints (chart_ggr_ghg_emissions, 0, roundArrayValues2 ( transformMt2Gt (vals_from_1990_to_2050) ));

    if (maxYear == 2100) {
      chart_ggr_ghg_emissions.series[1].show();
      setDataPoints (chart_ggr_ghg_emissions, 1, roundArrayValues2 ( transformMt2Gt (vals_from_2050_to_2100) ));
    }
    else  { // 2050
      chart_ggr_ghg_emissions.series[1].hide();
    }
    
  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index] );

  chart_ggr_ghg_emissions.setTitle(null, { text: '' });
//  chart_ggr_ghg_emissions.setTitle(null, { text: 'Cumulative CO2 emissions by 2100: ' + cumEmiss + ' GT' });

    
  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_ggr_ghg_emissions.redraw(); // refresh ghg emissions chart



} // end updateGGR

// ***********************************************************
//                                                           *
// Costs                                                     *
//                                                           *
// ***********************************************************

function updateCosts () {

  if (cfpStore == null || cfpStore[0] != actCfpID) {

 //   document.getElementById('costs-info-cfpw-1').innerHTML = "<font color='#BEAED4'>updating ...</font>";
 //   document.getElementById('costs-info-cfpw-2').innerHTML = "<font color='#BEAED4'>updating ...</font>";
 //   document.getElementById('costs-info-cfpw-3').innerHTML = "<font color='#BEAED4'>updating ...</font>";

    loadCounterFactualPathway (actCfpID);
  }
  else updateCostDiagrams ();
}



function updateCostOverviewDiagrams () {


  chart_costs_context.showLoading();

  var cfp = cfpStore[1];

/*
  var gdp         = ds["costs"]["GDP indexed"]["Global GDP"].slice(0);
  var costsUserPW = ds["costs"]["Point indexed (non-amortised)"]["Total"].slice(0);
  var costsCFP    = cfp["costs"]["Point indexed (non-amortised)"]["Total"].slice(0);

  var gdpSum         = 0.0;
  var costsUserPWSum = 0.0;
  var costsCFPSum    = 0.0;


  for (var i=0; i<ds["costs"]["GDP indexed"]["Global GDP"].length; i++) {
    gdpSum         += gdp[i];
    costsUserPWSum += costsUserPW[i];
    costsCFPSum    += costsCFP[i];
  }

  var result = (costsUserPWSum - costsCFPSum) / gdpSum * 100;
  result = roundValue2 (result);

*/

  var gdp         =  ds["costs"]["webtool_cumulative_gdp_and_energy_costs"]["GDP"];
  var costsUserPW =  ds["costs"]["webtool_cumulative_gdp_and_energy_costs"]["Energy costs"];
  var costsCFP    = cfp["costs"]["webtool_cumulative_gdp_and_energy_costs"]["Energy costs"];


  var result = (costsUserPW - costsCFP) / gdp * 100;
  result = roundValue2 (result);


  var yOffset =  40;
  var boxW    = 170;
  var boxH    = 160;

  var jg = new jsGraphics(document.getElementById("container_costs_vs_counterfactual"));
  jg.setColor("#cccccc");
  jg.fillRect(0, yOffset, boxW, boxH);

  jg.setColor("#bdbdbd");
  jg.drawRect(0, yOffset, boxW, boxH);
  jg.drawRect(1, yOffset+1, boxW, boxH);


  var x = 20;
  var y = yOffset + 40;

  jg.setColor("#636363");
  jg.setFont("arial,helvetica,sans-serif", "11px", Font.BOLD);
  jg.drawString(translate('Your pathway is'),  x, y);


  var msg = translate('less expensive');
  var fontColor = "#636363";

  if (result < 0) {
    msg = translate('less expensive');
    fontColor = "#238443";
  }
  else if (result > 0) {
    msg = translate('more expensive');
    fontColor = "#ff0000";
  }

  jg.setColor(fontColor);
  jg.setFont("arial,helvetica,sans-serif", "15px", Font.BOLD);
  jg.drawString( Math.abs(result) + ' ' + translate('% of GDP'),   		x, y+13);

  jg.setFont("arial,helvetica,sans-serif", "11px", Font.BOLD);
  jg.drawString(msg,   		           x, y+32);
  jg.setColor("#636363");
  jg.drawString(translate('than the selected'),   	   x, y+47);
  jg.drawString(translate('counterfactual pathway.'), x, y+62);

  jg.paint();


  // alert (gdp + "\n" + costsUserPW  + "\n" + costsCFP  + "\n" + result + " %");


  // -----------------------------------------------------------------
  // pump data into the cost context chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_context, 0, roundArrayValues1 (ds["costs"]["GDP indexed"]["Global GDP"]) );
  setDataPoints (chart_costs_context, 1, roundArrayValues1 (ds["costs"]["Point indexed (non-amortised)"]["Total"].slice(0)) );

  $.each(chart_costs_context.series[2].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Low indexed (non-amortised)"]["Total"][i]), roundValue(ds["costs"]["High indexed (non-amortised)"]["Total"][i])], false);
  });

  setDataPoints (chart_costs_context, 3, roundArrayValues1 (cfp["costs"]["Point indexed (non-amortised)"]["Total"].slice(0)) );

  $.each(chart_costs_context.series[4].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Low indexed (non-amortised)"]["Total"][i]), roundValue(cfp["costs"]["High indexed (non-amortised)"]["Total"][i])], false);
  });

  chart_costs_context.redraw();

  chart_costs_context.hideLoading();
}



function updateCostDiagrams () {


  if (costSubNavID==1) {
    updateCostOverviewDiagrams ();
    return;
  }
  if (costSubNavID==3) {
    updateCostBySectorDiagrams ();
    return;
  }

  chart_costs_split_capital.showLoading();
  chart_costs_split_operational.showLoading();
  chart_costs_split_fuel.showLoading();
  chart_costs_split_bar.showLoading();


  var cfp = cfpStore[1];

  // -----------------------------------------------------------------
  // pump data into the cost screen split bar chart
  // -----------------------------------------------------------------
  chart_costs_split_bar.showLoading();
  setDataPoints (chart_costs_split_bar, 0, roundArrayValues1 (
    [  ds["costs"]["webtool_costs_as_percent"]["Capital costs (including opportunity costs)"][0]*100, 
       ds["costs"]["webtool_costs_as_percent"]["Capital costs (including opportunity costs)"][1]*100, 
      cfp["costs"]["webtool_costs_as_percent"]["Capital costs (including opportunity costs)"][1]*100 ]));

  setDataPoints (chart_costs_split_bar, 1, roundArrayValues1 (
    [  ds["costs"]["webtool_costs_as_percent"]["Operating costs"][0]*100, 
       ds["costs"]["webtool_costs_as_percent"]["Operating costs"][1]*100, 
      cfp["costs"]["webtool_costs_as_percent"]["Operating costs"][1]*100 ]));

  setDataPoints (chart_costs_split_bar, 2, roundArrayValues1 (
    [  ds["costs"]["webtool_costs_as_percent"]["Fuel costs"][0]*100, 
       ds["costs"]["webtool_costs_as_percent"]["Fuel costs"][1]*100, 
      cfp["costs"]["webtool_costs_as_percent"]["Fuel costs"][1]*100 ]));



  // -----------------------------------------------------------------
  // pump data into the cost screen split capital chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_capital, 0, roundArrayValues1 (ds["costs"]["Point indexed (non-amortised)"]["Capital costs (including opportunity costs)"]) );

  $.each(chart_costs_split_capital.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Low indexed (non-amortised)"]["Capital costs (including opportunity costs)"][i]), 
                   roundValue(ds["costs"]["High indexed (non-amortised)"]["Capital costs (including opportunity costs)"][i])], false);
  });

  setDataPoints (chart_costs_split_capital, 2, roundArrayValues1 (cfp["costs"]["Point indexed (non-amortised)"]["Capital costs (including opportunity costs)"]) );

  $.each(chart_costs_split_capital.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Low indexed (non-amortised)"]["Capital costs (including opportunity costs)"][i]), 
                   roundValue(cfp["costs"]["High indexed (non-amortised)"]["Capital costs (including opportunity costs)"][i])], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split operational chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_operational, 0, roundArrayValues1 (ds["costs"]["Point indexed (non-amortised)"]["Operating costs"]) );

  $.each(chart_costs_split_operational.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Low indexed (non-amortised)"]["Operating costs"][i]), 
                   roundValue(ds["costs"]["High indexed (non-amortised)"]["Operating costs"][i])], false);
  });

  setDataPoints (chart_costs_split_operational, 2, roundArrayValues1 (cfp["costs"]["Point indexed (non-amortised)"]["Operating costs"]) );

  $.each(chart_costs_split_operational.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Low indexed (non-amortised)"]["Operating costs"][i]), 
                   roundValue(cfp["costs"]["High indexed (non-amortised)"]["Operating costs"][i])], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split fuel chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_fuel, 0, roundArrayValues1 (ds["costs"]["Point indexed (non-amortised)"]["Fuel costs"]) );

  $.each(chart_costs_split_fuel.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Low indexed (non-amortised)"]["Fuel costs"][i]), 
                   roundValue(ds["costs"]["High indexed (non-amortised)"]["Fuel costs"][i])], false);
  });

  setDataPoints (chart_costs_split_fuel, 2, roundArrayValues1 (cfp["costs"]["Point indexed (non-amortised)"]["Fuel costs"]) );

  $.each(chart_costs_split_fuel.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Low indexed (non-amortised)"]["Fuel costs"][i]), 
                   roundValue(cfp["costs"]["High indexed (non-amortised)"]["Fuel costs"][i])], false);
  });




  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_costs_split_capital.redraw();
  chart_costs_split_operational.redraw();
  chart_costs_split_fuel.redraw();
  chart_costs_split_bar.redraw();

  chart_costs_split_capital.hideLoading();
  chart_costs_split_operational.hideLoading();
  chart_costs_split_fuel.hideLoading();
  chart_costs_split_bar.hideLoading();

} // end updateCosts

function updateCostBySectorDiagrams () {


  chart_costs_split_electricity.showLoading();
  chart_costs_split_transport.showLoading();
  chart_costs_split_manufacturing.showLoading();
  chart_costs_split_buildings.showLoading();

  var cfp = cfpStore[1];


  // -----------------------------------------------------------------
  // pump data into the cost screen split electricity chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_electricity, 0, roundArrayValues1 (ds["costs"]["Power indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_electricity.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Power indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(ds["costs"]["Power indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  setDataPoints (chart_costs_split_electricity, 2, roundArrayValues1 (cfp["costs"]["Power indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_electricity.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Power indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(cfp["costs"]["Power indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split transport chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_transport, 0, roundArrayValues1 (ds["costs"]["Transport indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_transport.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Transport indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(ds["costs"]["Transport indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  setDataPoints (chart_costs_split_transport, 2, roundArrayValues1 (cfp["costs"]["Transport indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_transport.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Transport indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(cfp["costs"]["Transport indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });


/*
  // -----------------------------------------------------------------
  // pump data into the cost screen split manufacturing chart -
  // handle missing 2011 values
  // -----------------------------------------------------------------
  var pointUserPW = ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Point"].slice(1);
  var highUserPW  = ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["High"].slice(1);
  var lowUserPW   = ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Low"].slice(1);

  var pointCFP = cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Point"].slice(1);
  var highCFP  = cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["High"].slice(1);
  var lowCFP   = cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Low"].slice(1);

  setDataPoints (chart_costs_split_manufacturing, 0, roundArrayValues1 (pointUserPW) );

  $.each(chart_costs_split_manufacturing.series[1].data, function (i, point) {
    point.update([ roundValue(lowUserPW[i]), 
                   roundValue(highUserPW[i])], false);
  });

  setDataPoints (chart_costs_split_manufacturing, 2, roundArrayValues1 (pointCFP) );

  $.each(chart_costs_split_manufacturing.series[3].data, function (i, point) {
    point.update([ roundValue(lowCFP[i]), 
                   roundValue(highCFP[i])], false);
  });
*/

  // -----------------------------------------------------------------
  // pump data into the cost screen split manufacturing chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_manufacturing, 0, roundArrayValues1 (ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_manufacturing.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(ds["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  setDataPoints (chart_costs_split_manufacturing, 2, roundArrayValues1 (cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_manufacturing.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(cfp["costs"]["Manufacturing indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split buildings chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_buildings, 0, roundArrayValues1 (ds["costs"]["Buildings indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_buildings.series[1].data, function (i, point) {
    point.update([ roundValue(ds["costs"]["Buildings indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(ds["costs"]["Buildings indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });

  setDataPoints (chart_costs_split_buildings, 2, roundArrayValues1 (cfp["costs"]["Buildings indexed (capex + opex, non-amortised)"]["Point"]) );

  $.each(chart_costs_split_buildings.series[3].data, function (i, point) {
    point.update([ roundValue(cfp["costs"]["Buildings indexed (capex + opex, non-amortised)"]["Low"][i]), 
                   roundValue(cfp["costs"]["Buildings indexed (capex + opex, non-amortised)"]["High"][i])], false);
  });



  chart_costs_split_electricity.redraw();
  chart_costs_split_transport.redraw();
  chart_costs_split_manufacturing.redraw();
  chart_costs_split_buildings.redraw();

  chart_costs_split_electricity.hideLoading();
  chart_costs_split_transport.hideLoading();
  chart_costs_split_manufacturing.hideLoading();
  chart_costs_split_buildings.hideLoading();

}

function updateCostDiagramsDEPREC () {


  if (costSubNavID==1) {
    updateCostOverviewDiagrams ();
    return;
  }

  return;

  chart_costs_compare.showLoading();
  chart_costs_split_capital.showLoading();
  chart_costs_split_operational.showLoading();
  chart_costs_split_fuel.showLoading();


  //alert ("updateCostDiagrams");

  var cfp = cfpStore[1];

  var names = []; 
  var high  = []; 
  var point = []; 
  var low   = []; 




  names.push ("Total"); 
  low.push   ( Math.round (ds["costs"]["Total capital and operating costs"][0] - cfp["costs"]["Total capital and operating costs"][0] )); 
  point.push ( Math.round (ds["costs"]["Total capital and operating costs"][1] - cfp["costs"]["Total capital and operating costs"][1] )); 
  high.push  ( Math.round (ds["costs"]["Total capital and operating costs"][2] - cfp["costs"]["Total capital and operating costs"][2] )); 

  names.push ("Electricity"); 
  low.push   ( Math.round (ds["costs"]["Power"][0] - cfp["costs"]["Power"][0] )); 
  point.push ( Math.round (ds["costs"]["Power"][1] - cfp["costs"]["Power"][1] )); 
  high.push  ( Math.round (ds["costs"]["Power"][2] - cfp["costs"]["Power"][2] )); 
  
  names.push ("Transport"); 
  low.push   ( Math.round (ds["costs"]["Transport"][0] - cfp["costs"]["Transport"][0] )); 
  point.push ( Math.round (ds["costs"]["Transport"][1] - cfp["costs"]["Transport"][1] )); 
  high.push  ( Math.round (ds["costs"]["Transport"][2] - cfp["costs"]["Transport"][2] )); 

  names.push ("Buildings"); 
  low.push   ( Math.round (ds["costs"]["Buildings"][0] - cfp["costs"]["Buildings"][0] )); 
  point.push ( Math.round (ds["costs"]["Buildings"][1] - cfp["costs"]["Buildings"][1] )); 
  high.push  ( Math.round (ds["costs"]["Buildings"][2] - cfp["costs"]["Buildings"][2] )); 

  names.push ("Fuels"); 
  low.push   ( Math.round (ds["costs"]["Fuels"][0] - cfp ["costs"]["Fuels"][0] )); 
  point.push ( Math.round (ds["costs"]["Fuels"][1] - cfp ["costs"]["Fuels"][1] )); 
  high.push  ( Math.round (ds["costs"]["Fuels"][2] - cfp ["costs"]["Fuels"][2] )); 


  names.push ("Manufacturing"); 
  low.push   ( Math.round( ds["costs"]["Manufacturing"][0] - cfp ["costs"]["Manufacturing"][0] )); 
  point.push ( Math.round( ds["costs"]["Manufacturing"][1] - cfp ["costs"]["Manufacturing"][1] )); 
  high.push  ( Math.round( ds["costs"]["Manufacturing"][2] - cfp ["costs"]["Manufacturing"][2] )); 

  // -----------------------------------------------------------------
  // pump data into the cost screen compare chart
  // -----------------------------------------------------------------
  chart_costs_compare.xAxis[0].update({categories: names}, true);
  setDataPoints (chart_costs_compare, 0, point);




  var capital_p  	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var capital_h  	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var capital_l  	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var capital_h_w 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var capital_l_w  	= [0, 0, 0, 0, 0, 0, 0, 0, 0];

  var operating_p	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var operating_h 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var operating_l 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var operating_h_w 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var operating_l_w 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];

  var fuel_p  	 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var fuel_h  	 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var fuel_l  	 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var fuel_h_w	 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var fuel_l_w	 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i=0; i<9; i++) {
    capital_p[i]    = Math.round( ds["costs"]["Costs split ts point"]["Capital costs (including finance)"][i] 	- cfp["costs"]["Costs split ts point"]["Capital costs (including finance)"][i]);
    operating_p[i]  = Math.round( ds["costs"]["Costs split ts point"]["Operating costs"][i]   		  	- cfp["costs"]["Costs split ts point"]["Operating costs"][i]);
    fuel_p[i]       = Math.round( ds["costs"]["Costs split ts point"]["Fuel costs"][i]   			- cfp["costs"]["Costs split ts point"]["Fuel costs"][i]);

    capital_h[i]    = Math.round( ds["costs"]["Costs split ts high"]["Capital costs (including finance)"][i] 	- cfp["costs"]["Costs split ts high"]["Capital costs (including finance)"][i]);
    operating_h[i]  = Math.round( ds["costs"]["Costs split ts high"]["Operating costs"][i]   		  	- cfp["costs"]["Costs split ts high"]["Operating costs"][i]);
    fuel_h[i]       = Math.round( ds["costs"]["Costs split ts high"]["Fuel costs"][i]   			- cfp["costs"]["Costs split ts high"]["Fuel costs"][i]);

    capital_l[i]    = Math.round( ds["costs"]["Costs split ts low"]["Capital costs (including finance)"][i] 	- cfp["costs"]["Costs split ts low"]["Capital costs (including finance)"][i]);
    operating_l[i]  = Math.round( ds["costs"]["Costs split ts low"]["Operating costs"][i]   		  	- cfp["costs"]["Costs split ts low"]["Operating costs"][i]);
    fuel_l[i]	    = Math.round( ds["costs"]["Costs split ts low"]["Fuel costs"][i]   				- cfp["costs"]["Costs split ts low"]["Fuel costs"][i]);

    capital_h_w[i]  = Math.round( ds["costs"]["Costs split ts high"]["Capital costs (including finance)"][i] 	- cfp["costs"]["Costs split ts low"]["Capital costs (including finance)"][i]);
    operating_h_w[i]= Math.round( ds["costs"]["Costs split ts high"]["Operating costs"][i]   		  	- cfp["costs"]["Costs split ts low"]["Operating costs"][i]);
    fuel_h_w[i]     = Math.round( ds["costs"]["Costs split ts high"]["Fuel costs"][i]   			- cfp["costs"]["Costs split ts low"]["Fuel costs"][i]);

    capital_l_w[i]  = Math.round( ds["costs"]["Costs split ts low"]["Capital costs (including finance)"][i] 	- cfp["costs"]["Costs split ts high"]["Capital costs (including finance)"][i]);
    operating_l_w[i]= Math.round( ds["costs"]["Costs split ts low"]["Operating costs"][i]   		  	- cfp["costs"]["Costs split ts high"]["Operating costs"][i]);
    fuel_l_w[i]	    = Math.round( ds["costs"]["Costs split ts low"]["Fuel costs"][i]   				- cfp["costs"]["Costs split ts high"]["Fuel costs"][i]);
  }
  // -----------------------------------------------------------------
  // pump data into the cost screen split capital chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_capital, 0, capital_p);
  $.each(chart_costs_split_capital.series[1].data, function (i, point) {
    point.update([capital_l_w[i], capital_h_w[i]], false);
  });
  $.each(chart_costs_split_capital.series[2].data, function (i, point) {
    point.update([capital_l[i], capital_h[i]], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split operational chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_operational, 0, operating_p);
  $.each(chart_costs_split_operational.series[1].data, function (i, point) {
    point.update([operating_l_w[i], operating_h_w[i]], false);
  });
  $.each(chart_costs_split_operational.series[2].data, function (i, point) {
    point.update([operating_l[i], operating_h[i]], false);
  });

  // -----------------------------------------------------------------
  // pump data into the cost screen split fuel chart
  // -----------------------------------------------------------------
  setDataPoints (chart_costs_split_fuel, 0, fuel_p);
  $.each(chart_costs_split_fuel.series[1].data, function (i, point) {
    point.update([fuel_l_w[i], fuel_h_w[i]], false);
  });
  $.each(chart_costs_split_fuel.series[2].data, function (i, point) {
    point.update([fuel_l[i], fuel_h[i]], false);
  });



  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_costs_compare.redraw(); 
  chart_costs_split_capital.redraw();
  chart_costs_split_operational.redraw();
  chart_costs_split_fuel.redraw();




  chart_costs_compare.hideLoading();
  chart_costs_split_capital.hideLoading();
  chart_costs_split_operational.hideLoading();
  chart_costs_split_fuel.hideLoading();


} // end updateCosts





/* ******************************************************
 *                                                      *
 * Dashboard                                            *
 *                                                      *
 ****************************************************** */


function transformMt2Gt (dataset) {
  for (var i=0; i<dataset.length; i++)
    dataset[i] = dataset[i] ;
 return dataset;
}

// assume MT in data
function getYearForReachingTresholdValue (years, dataset, treshold) {
  for (var i=0; i<dataset.length; i++)
    if (dataset[i] >= treshold )
      return parseInt(years[i]);
   return -999;

}

 

function updateEmissionsDiagramDefault () {

    // -----------------------------------------------------------------
    // remove all time series
    // -----------------------------------------------------------------
    while(chart_dashboard_ghg_emissions.series.length > 0)
      chart_dashboard_ghg_emissions.series[0].remove(true);

    // -----------------------------------------------------------------
    // compile values from 1990 to 2050 for series 0   
    // -----------------------------------------------------------------
    var vals_from_1990_to_2050 = new Array();
    
    // -----------------------------------------------------------------
    // append the values from 1990 to 2010
    // -----------------------------------------------------------------
    for (var i=0; i<ds["dashboard"]["GHG emissions historic Total"].length; i++)
      vals_from_1990_to_2050.push (ds["dashboard"]["GHG emissions historic Total"][i])

    // -----------------------------------------------------------------
    // append the values from 2011, 2015, 2020 .. 2050
    // -----------------------------------------------------------------
    for (var i=0; i<=8; i++)
      vals_from_1990_to_2050.push (ds["dashboard"]["GHG emissions projected Total"][i])

    // -----------------------------------------------------------------
    // compile values from 2050 to 2100 for series 1 
    // -----------------------------------------------------------------
    var vals_from_2050_to_2100 = new Array();

    // -----------------------------------------------------------------
    // append the values from 2050 to 2100
    // -----------------------------------------------------------------
    for (var i=8; i<ds["dashboard"]["GHG emissions projected Total"].length; i++) 
      vals_from_2050_to_2100.push (ds["dashboard"]["GHG emissions projected Total"][i])

    // -----------------------------------------------------------------
    // aggregate GGR effect from 2011 - 2050
    // -----------------------------------------------------------------
    var ggr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var displayGGR = false;    

    for (var i=0; i<ggr.length; i++) {
        ggr[i] = ds["dashboard"]["ggr"]["Biochar"][i] 
               + ds["dashboard"]["ggr"]["Air capture"][i] 
               + ds["dashboard"]["ggr"]["Ocean fertilisation"][i] 
               + ds["dashboard"]["ggr"]["Enhanced weathering ocean"][i] 
               + ds["dashboard"]["ggr"]["Enhanced weathering terrestrial"][i];

         if (ggr[i] > 0) displayGGR = true;
    }

    var ts_from_1990_2050 = [ [1990, null], [1995, null], [2000, null], [2005, null], [2010, null], [2011, null], [2015, null], [2020, null], [2025, null], 
                              [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ];

    for (var i=0; i<ts_from_1990_2050.length; i++) 
      ts_from_1990_2050[i][1] = roundValue (vals_from_1990_to_2050[i] ); 

    var ts_from_2050_2100 = [ [2050, null],  [2055, null], [2060, null], [2065, null], [2070, null], [2075, null], 
                              [2080, null], [2085, null], [2090, null], [2095, null], [2100, null] ];

    for (var i=0; i<ts_from_2050_2100.length; i++) 
      ts_from_2050_2100[i][1] = roundValue (vals_from_2050_to_2100[i] ); 


    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Total annual GHG emissions'),
      color: '#bdbdbd',
      type: 'line',
      stacking: null,
      marker: { radius: 2 },
      data: ts_from_1990_2050
    });

    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Total annual GHG emissions') + '<br>' + translate ('(trajectory)'),
      color: '#dddddd',
      dashStyle: 'ShortDot',
      type: 'line',
      stacking: null,
      marker: { radius: 2 },
      data: ts_from_2050_2100
    });
/*
    if (displayGGR ) {

      var ts_without_ggr_from_2011_2050 = [ [2011, null], [2015, null], [2020, null], [2025, null], 
                                            [2030, null], [2035, null], [2040, null], [2045, null], [2050, null]  ];

      for (var i=0; i<ts_without_ggr_from_2011_2050.length; i++) 
        ts_without_ggr_from_2011_2050[i][1] = roundValue ( (ds["dashboard"]["GHG emissions projected Total"][i] + ggr[i]) );  // NOTE: we assume MT and transform to GT

      chart_dashboard_ghg_emissions.addSeries({                        
        name: 'Total annual GHG emissions<br>without GGR',
        color: '#3288bd',
        dashStyle: 'ShortDot',
        type: 'line',
        stacking: null,
        marker: { radius: 2 },
        data: ts_without_ggr_from_2011_2050
      });
    }
*/

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round ( ds["dashboard"]["cum GHG emissions projected"][index]  );

/*
      chart_dashboard_ghg_emissions.addSeries({                        
        name: '2°C treshold crossed',
        color: 'red',
        type: 'scatter',
        marker: { radius: 5 },
        data: [ [2020, 100] ]
      });
*/


/*
  var crossingTresholdYear = getYearForReachingTresholdValue (ds["dashboard"]["cumul emissions"]["years"], ds["dashboard"]["cumul emissions"]["CO2"], 3010);

  if (crossingTresholdYear != -999) {


    var x = [ [crossingTresholdYear, -5] ];
   //alert ("crossingTresholdYear: " + x )

      chart_dashboard_ghg_emissions.addSeries({                        
        name: '2°C treshold crossed',
        color: 'red',
        type: 'scatter',
        marker: { radius: 7, symbol: 'triangle' },
        data: x
      });

  }

*/


/*
    // ---------------------------------------------------------------------------------------
    // if no GGR effect, disable series
    // ---------------------------------------------------------------------------------------
    if (! displayGGR ) {
      chart_dashboard_ghg_emissions.series[2].hide();
    }
    else {
      chart_dashboard_ghg_emissions.series[2].show();
      var emWithoutGGR = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i=0; i<9; i++) 
        emWithoutGGR[i] = ds["dashboard"]["GHG emissions projected Total"][i] + ggr[i];
        setDataPoints (chart_dashboard_ghg_emissions, 2, roundArrayValues1 ( transformMt2Gt (emWithoutGGR) ));
    }
   
    // -----------------------------------------------------------------
    // pump data into the dashboard's ghg emissions chart
    // -----------------------------------------------------------------
    setDataPoints (chart_dashboard_ghg_emissions, 0, roundArrayValues1 ( transformMt2Gt (vals_from_1990_to_2050) ));

    if (maxYear == 2100) {
      chart_dashboard_ghg_emissions.series[1].show();
      setDataPoints (chart_dashboard_ghg_emissions, 1, roundArrayValues1 ( transformMt2Gt (vals_from_2050_to_2100) ));
    }
    else  { // 2050
      chart_dashboard_ghg_emissions.series[1].hide();
    }


*/

/*
  chart_dashboard_ghg_emissions.yAxis[0].update({
      text: 'GtCO2e'
  });

  chart_dashboard_ghg_emissions.xAxis[0].update({
      min: 1990,
      max: 2100 
   });
*/
  chart_dashboard_ghg_emissions.setTitle({ text: translate ('Global GHG emissions per year') });
//  chart_dashboard_ghg_emissions.setTitle(null, { text: 'Cumulative CO2 emissions by 2100: ' + cumEmiss + ' GT' });
  chart_dashboard_ghg_emissions.setTitle(null, { text: '' });
}



function getTS_1990_2050 (vals_from_1990_to_2050) {

   var ts_from_1990_2050 = [ [1990, null], [1995, null], [2000, null], [2005, null], [2010, null], [2011, null], [2015, null], [2020, null], [2025, null], 
                             [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ];

   for (var i=0; i<ts_from_1990_2050.length; i++) 
      ts_from_1990_2050[i][1] = roundValue (vals_from_1990_to_2050[i] );  // NOTE: we assume MT and transform to GT

   return ts_from_1990_2050;
}

function getTS_1990_2100 (vals_from_1990_to_2100) {

   var ts_from_1990_2100 = [ [1990, null], [1995, null], [2000, null], [2005, null], [2010, null], [2011, null], [2015, null], [2020, null], [2025, null], 
                             [2030, null], [2035, null], [2040, null], [2045, null], [2050, null], [2055, null], [2060, null], [2065, null], [2070, null], 
                             [2075, null], [2080, null], [2085, null], [2090, null], [2095, null], [2100, null] ];

   for (var i=0; i<ts_from_1990_2100.length; i++) 
      ts_from_1990_2100[i][1] = roundValue (vals_from_1990_to_2100[i] );  // NOTE: we assume MT and transform to GT

   return ts_from_1990_2100;
}

function updateEmissionsDiagramSector () {

    // -----------------------------------------------------------------
    // remove all time series
    // -----------------------------------------------------------------
    while(chart_dashboard_ghg_emissions.series.length > 0)
      chart_dashboard_ghg_emissions.series[0].remove(true);


    var hasValuesPosLandUse 	= false;
    var hasValuesNegLandUse 	= false;
    var hasValuesPosFuelComb 	= false;
    var hasValuesNegFuelComb 	= false;
    var hasValuesPosOther 	= false;
    var hasValuesNegOther 	= false;


    var data = ds["dashboard"]["by IPCC sector"]["Global Land Use, Land-Use Change and Forestry"];

    var valuesPosLandUse = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var valuesNegLandUse = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i=0; i<data.length; i++) {
      if ( roundValue(data[i]) >= 0) {
        valuesPosLandUse[i] = data[i];
        valuesNegLandUse[i] = 0;
        hasValuesPosLandUse = true;
      }
      else {
        valuesPosLandUse[i] = 0;
        valuesNegLandUse[i] = data[i];
        hasValuesNegLandUse = true;
      }
    }

    data = ds["dashboard"]["by IPCC sector"]["Global Fuel Combustion"];

    var valuesPosFuelComb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var valuesNegFuelComb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i=0; i<data.length; i++) {
      if ( roundValue(data[i]) >= 0) {
        valuesPosFuelComb[i] = data[i];
        valuesNegFuelComb[i] = 0;
        hasValuesPosFuelComb = true;
      }
      else {
        valuesPosFuelComb[i] = 0 
        valuesNegFuelComb[i] = data[i];
        hasValuesNegFuelComb = true;
      }
    }

//    alert ("valuesPosFuelComb = " + valuesPosFuelComb);
//    alert ("valuesNegFuelComb = " + valuesNegFuelComb);

    data = ds["dashboard"]["by IPCC sector"]["Global Other"];

    var valuesPosOther = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var valuesNegOther = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i=0; i<data.length; i++) {
      if (roundValue(data[i]) >= 0) {
        valuesPosOther[i] = data[i];
        valuesNegOther[i] = 0;
        hasValuesPosOther = true;
      }
      else {
        valuesPosOther[i] = 0;
        valuesNegOther[i] = data[i];
        hasValuesNegOther = true;
      }
    }
  
    var landUseNamePos = 'Land use & Forestry';
    var landUseNameNeg = 'Land use & Forestry';
    if (hasValuesPosLandUse && hasValuesNegLandUse) {
      landUseNamePos += ' (pos)';
      landUseNameNeg += ' (neg)';
    }

    var fuelCombNamePos = 'Fuel Combustion';
    var fuelCombNameNeg = 'Fuel Combustion';
    if (hasValuesPosFuelComb && hasValuesNegFuelComb) {
      fuelCombNamePos += ' (pos)';
      fuelCombNameNeg += ' (neg)';
    }

    var otherNamePos = 'Other';
    var otherNameNeg = 'Other';
    if (hasValuesPosOther && hasValuesNegOther) {
      otherNamePos += ' (pos)';
      otherNameNeg += ' (neg)';
    }


    if (hasValuesPosLandUse)
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (landUseNamePos),
        stack: 0,       color: '#a6d854',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2050 (valuesPosLandUse)
      });
    if (hasValuesNegLandUse)
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (landUseNameNeg),
        stack: 1,       color: '#a6d854',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2050 (valuesNegLandUse)
      });

    if (hasValuesPosFuelComb)
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (fuelCombNamePos),
        stack: 0,      color: '#fc8d62',      stacking: 'normal',
        marker: { radius: 2 },
        data: getTS_1990_2050 (valuesPosFuelComb)
      });
    if (hasValuesNegFuelComb)
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (fuelCombNameNeg),
        stack: 1,       color: '#fc8d62',      stacking: 'normal',
        marker: { radius: 2 },
        data: getTS_1990_2050 (valuesNegFuelComb)
      });

    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Fugitive emissions from fuels'),
      stack: 0,      stacking: 'normal',      marker: { radius: 2 },
      color: '#8da0cb',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Global Fugitive Emissions from Fuels"])
    });

    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Industrial processes'),
      stack: 0,      stacking: 'normal',      marker: { radius: 2 },
      color: '#e78ac3',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Global Industrial Processes"])
    });
    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Solvent and other product use'),
      stack: 0,      stacking: 'normal',      marker: { radius: 2 },
      color: '#ffd92f',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Global Solvent and Other Product Use"])
    });
    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Agriculture'),
      stack: 0,      stacking: 'normal',      marker: { radius: 2 },
      color: '#66c2a5',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Global Agriculture"])
    });

    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Waste'),
      stack: 0,      stacking: 'normal',      marker: { radius: 2 },
      color: '#b3b3b3	',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Global Waste"])
    });
    if (hasValuesPosOther) 
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (otherNamePos),
        stack: 0,       color: '#e5c494',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2050 (valuesPosOther)
      });
    if (hasValuesNegOther) 
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (otherNameNeg),
        stack: 1,       color: '#e5c494',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2050 (valuesNegOther)
      });


    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Net emissions'),
      stack: 1,       
      color: 'white',
      dashStyle: 'ShortDot',
      type: 'line',
      data: getTS_1990_2050 (ds["dashboard"]["by IPCC sector"]["Total"])
    });

/*

    setDataPoints (chart_dashboard_ghg_emissions,  3, roundArrayValues1 (transformMt2Gt (valuesPosLandUse)));
    setDataPoints (chart_dashboard_ghg_emissions,  4, roundArrayValues1 (transformMt2Gt (valuesNegLandUse)));
    setDataPoints (chart_dashboard_ghg_emissions,  5, roundArrayValues1 (transformMt2Gt (valuesPosFuelComb)));
    setDataPoints (chart_dashboard_ghg_emissions,  6, roundArrayValues1 (transformMt2Gt (valuesNegFuelComb)));
    setDataPoints (chart_dashboard_ghg_emissions,  7, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Global Fugitive Emissions from Fuels"] )));
    setDataPoints (chart_dashboard_ghg_emissions,  8, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Global Industrial Processes"] )));
    setDataPoints (chart_dashboard_ghg_emissions,  9, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Global Solvent and Other Product Use"] )));
    setDataPoints (chart_dashboard_ghg_emissions, 10, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Global Agriculture"] )));
    setDataPoints (chart_dashboard_ghg_emissions, 11, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Global Waste"] )));
    setDataPoints (chart_dashboard_ghg_emissions, 12, roundArrayValues1 (transformMt2Gt (valuesPosOther)));
    setDataPoints (chart_dashboard_ghg_emissions, 13, roundArrayValues1 (transformMt2Gt (valuesNegOther)));
    setDataPoints (chart_dashboard_ghg_emissions, 14, roundArrayValues1 (transformMt2Gt (ds["dashboard"]["by IPCC sector"]["Total"] )));

    // -----------------------------------------------------------------
    // hide overview time series
    // -----------------------------------------------------------------
    for (var i=0; i<=2; i++)
      chart_dashboard_ghg_emissions.series[i].hide();

    // -----------------------------------------------------------------
    // show emissions by sector 
    // -----------------------------------------------------------------
    for (var i=3; i<=14; i++)
      chart_dashboard_ghg_emissions.series[i].show();

    // -----------------------------------------------------------------
    // hide emissions by gas
    // -----------------------------------------------------------------
    for (var i=15; i<=18; i++)
      chart_dashboard_ghg_emissions.series[i].hide();

    chart_dashboard_ghg_emissions.yAxis[0].update({
      text: 'GtCO2e'
    });
*/

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round ( ds["dashboard"]["cum GHG emissions projected"][index]  );

  chart_dashboard_ghg_emissions.setTitle({ text: translate ('Global GHG emissions per year by source') });
//  chart_dashboard_ghg_emissions.setTitle(null, { text: 'Cumulative CO2 emissions by 2100: ' + cumEmiss + ' GT' });


  //chart_dashboard_ghg_emissions.hideLoading();

}

function updateEmissionsDiagramGas () {


    // -----------------------------------------------------------------
    // remove all time series
    // -----------------------------------------------------------------
    while(chart_dashboard_ghg_emissions.series.length > 0)
      chart_dashboard_ghg_emissions.series[0].remove(true);


    var hasValuesPosCO2	= false;
    var hasValuesNegCO2	= false;

    // -----------------------------------------------------------------
    // pump data into the dashboard's ghg emissions chart
    // -----------------------------------------------------------------

    var data = ds["dashboard"]["by gas"]["CO2"];

    var valuesPosCO2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var valuesNegCO2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i=0; i<data.length; i++) {
      if (roundValue(data[i]) >= 0) {
        valuesPosCO2[i] = data[i];
        valuesNegCO2[i] = 0;
        hasValuesPosCO2	= true;
      }
      else {
        valuesPosCO2[i] = 0;
        valuesNegCO2[i] = data[i];
        hasValuesNegCO2	= true;
      }
    }

    var co2NamePos = 'Carbon dioxide';
    var co2NameNeg = 'Carbon dioxide';
    if (hasValuesPosCO2 && hasValuesNegCO2) {
      co2NamePos += ' (pos)';
      co2NameNeg += ' (neg)';
    }


    if (hasValuesPosCO2) 
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (co2NamePos),
        stack: 0,       color: '#abdda4',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2100 (valuesPosCO2)
      });
    if (hasValuesNegCO2)
      chart_dashboard_ghg_emissions.addSeries({                        
        name: translate (co2NameNeg),
        stack: 1,       color: '#abdda4',      stacking: 'normal',      marker: { radius: 2 },
        data: getTS_1990_2100 (valuesNegCO2)
      });

/*

    // -----------------------------------------------------------------
    // ATTENTION: manually fixing of mixed up nitrous oxide and methane 
    // in the spreadsheet - adjust after spreadsheet is fixed !!!
    // -----------------------------------------------------------------
    chart_dashboard_ghg_emissions.addSeries({                        
      name: 'Methane',
      stack: 0,      color: '#fec44f',      stacking: 'normal',      marker: { radius: 2 },
      data: getTS_1990_2100 (ds["dashboard"]["by gas"]["NH4"])
    });
    chart_dashboard_ghg_emissions.addSeries({                        
      name: 'Nitrous oxide',
      stack: 0,      color: '#43a2ca',      stacking: 'normal',      marker: { radius: 2 },
      data: getTS_1990_2100 (ds["dashboard"]["by gas"]["CH4"])
    });
*/


// alert (ds["dashboard"]["by gas"]["NH4"])
// alert (ds["dashboard"]["by gas"]["CH4"])

    chart_dashboard_ghg_emissions.addSeries({                        
      // name: 'N2O',
      name: translate ('Nitrous oxide'),
      stack: 0,      color: '#fec44f',      stacking: 'normal',      marker: { radius: 2 },
      data: getTS_1990_2100 (ds["dashboard"]["by gas"]["N2O"])
    });
    chart_dashboard_ghg_emissions.addSeries({                        
      name: translate ('Methane'),
      stack: 0,      color: '#43a2ca',      stacking: 'normal',      marker: { radius: 2 },
      data: getTS_1990_2100 (ds["dashboard"]["by gas"]["CH4"])
    });



  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round ( ds["dashboard"]["cum GHG emissions projected"][index] );

  chart_dashboard_ghg_emissions.setTitle({ text: translate ('Global GHG emissions per year by gas') });
  // chart_dashboard_ghg_emissions.setTitle(null, { text: 'Cumulative CO2 emissions by 2100: ' + cumEmiss + ' GT' });
}



function updateDashboard () {

  //alert (chart_dashboard_energy_demand == null);

    // -----------------------------------------------------
    // pump  data into the dashboard's energy demand chart
    // -----------------------------------------------------
/*
    setDataPoints (chart_dashboard_energy_demand, 0, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Losses"]));
    setDataPoints (chart_dashboard_energy_demand, 1, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Manufacturing"]));
    setDataPoints (chart_dashboard_energy_demand, 2, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Transport"]));
    setDataPoints (chart_dashboard_energy_demand, 3, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Residential, public and commercial"]));
    setDataPoints (chart_dashboard_energy_demand, 4, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Other end uses"]));
    setDataPoints (chart_dashboard_energy_demand, 5, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Greenhouse gas removal"]));
*/
    setDataPoints (chart_dashboard_energy_demand, 0, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Manufacturing"]));
    setDataPoints (chart_dashboard_energy_demand, 1, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Transport"]));
    setDataPoints (chart_dashboard_energy_demand, 2, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Residential, public and commercial"]));
    setDataPoints (chart_dashboard_energy_demand, 3, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Other end uses"]));
    setDataPoints (chart_dashboard_energy_demand, 4, roundArrayValues1 (ds["dashboard"]["energy demand 2050"]["Greenhouse gas removal"]));

    // -----------------------------------------------------------------
    // pump  data into the dashboard's energy supply chart
    // -----------------------------------------------------------------
/*
    setDataPoints (chart_dashboard_energy_supply, 0, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global nuclear fission"])); 
    setDataPoints (chart_dashboard_energy_supply, 1, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global solar, wind, wave and tidal"])); 
    setDataPoints (chart_dashboard_energy_supply, 2, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global heat"])); 
    setDataPoints (chart_dashboard_energy_supply, 3, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global geothermal"]));  
    setDataPoints (chart_dashboard_energy_supply, 4, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global hydro"]));  
    setDataPoints (chart_dashboard_energy_supply, 5, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global bioenergy and waste"]));
    setDataPoints (chart_dashboard_energy_supply, 6, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global coal and peat"])); 
    setDataPoints (chart_dashboard_energy_supply, 7, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global oil"]));  
    setDataPoints (chart_dashboard_energy_supply, 8, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global gas"]));  
*/

    var fossilFuel = ds["dashboard"]["energy supply 2050"]["Global coal and peat"].slice(0);
    for (var i=0; i<fossilFuel.length; i++) {
      fossilFuel[i] += ds["dashboard"]["energy supply 2050"]["Global oil"][i];
      fossilFuel[i] += ds["dashboard"]["energy supply 2050"]["Global gas"][i];
    }

    var renewables = ds["dashboard"]["energy supply 2050"]["Global solar, wind, wave and tidal"].slice(0);
    for (var i=0; i<renewables.length; i++) {
      renewables[i] += ds["dashboard"]["energy supply 2050"]["Global geothermal"][i];
      renewables[i] += ds["dashboard"]["energy supply 2050"]["Global hydro"][i];
      renewables[i] += ds["dashboard"]["energy supply 2050"]["Global bioenergy and waste"][i];
    }

    setDataPoints (chart_dashboard_energy_supply, 0, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global nuclear fission"])); 
    setDataPoints (chart_dashboard_energy_supply, 1, roundArrayValues1 (ds["dashboard"]["energy supply 2050"]["Global heat"])); 
    setDataPoints (chart_dashboard_energy_supply, 2, roundArrayValues1 (renewables)); 
    setDataPoints (chart_dashboard_energy_supply, 3, roundArrayValues1 (fossilFuel)); 


    // -----------------------------------------------------------------
    // update the dashboard's ghg emissions chart
    // -----------------------------------------------------------------
    if      (dashBoardSubsetID == 1) updateEmissionsDiagramDefault();
    else if (dashBoardSubsetID == 2) updateEmissionsDiagramSector();
    else if (dashBoardSubsetID == 3) updateEmissionsDiagramGas();
 

    // -----------------------------------------------------
    // hide loading messages
    // -----------------------------------------------------
//    chart_dashboard_energy_demand.hideLoading();
  //  chart_dashboard_energy_supply.hideLoading();
    // chart_dashboard_ghg_emissions.hideLoading();

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_dashboard_energy_demand.redraw(); // refresh energy demand chart
    chart_dashboard_energy_supply.redraw(); // refresh energy supply chart
    chart_dashboard_ghg_emissions.redraw(); // refresh ghg emissions chart


  // -----------------------------------------------------
  // trigger thermometer update for dashboard
  // -----------------------------------------------------
  updateThermometer (chart_dashboard_temperature_change, 'temperature-msg-db');

} // end updateDashboard




/* ******************************************************
 *                                                      *
 * CO2 budget (axis version)                            *
 *                                                      *
 ****************************************************** */
function updateCo2BudgetDisplay (chart) {

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index]);

  setDataPoints (chart, 0, [ cumEmiss ] );

  // ------------------------------------------------------------------------
  // erase last drawings
  // ------------------------------------------------------------------------
  chart.renderer.rect(0, 0, 330, 330)
      .attr({
         fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 3
     })
  .add();

  // ------------------------------------------------------------------------
  // draw y lines 
  // ------------------------------------------------------------------------
  for (var i=0; i<=8; i++) {
    chart.renderer.rect (35, chart.yAxis[0].toPixels(i*1000), 75, 1).attr({ fill: 'rgba(255, 255, 255, .1)', zIndex: 3}).add();
  if (i != 0 && i != 3) 
    chart.renderer.text ('' + i*1000, 5, chart.yAxis[0].toPixels(i*1000)+ 5 ).attr({ zIndex: 3}).css({ color: '#999', fontSize: '10px', fontWeight: 'bold' }).add();
//    chart.renderer.text ('' + i*1000, 100, chart.yAxis[0].toPixels(i*1000)+ 5 ).attr({ zIndex: 3}).css({ color: '#999', fontSize: '10px', fontWeight: 'bold' }).add();
  }

  // ------------------------------------------------------------------------
  // render unit for y axis (displayed in the header instead)
  // ------------------------------------------------------------------------
  //  chart.renderer.text('1000 GtCO2', 125, 160).attr({ rotation: -90, zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();



  // ------------------------------------------------------------------------
  // draw current emissions as bar
  // ------------------------------------------------------------------------
  chart.renderer.rect(40, chart.yAxis[0].toPixels(cumEmiss), 63, chart.yAxis[0].toPixels(0)-chart.yAxis[0].toPixels(cumEmiss)+1)
      .attr({
         fill: '#737373', //'#999', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 3
     })
  .add();

  var colorID = '#FF8000'
  if (cumEmiss > 3010) colorID = '#F00';


  var y = chart.yAxis[0].toPixels(3010);
  var x = 40;

  // ------------------------------------------------------------------------
  // draw budget line for 2 deg
  // ------------------------------------------------------------------------
  chart.renderer.rect(x, y, 63, 1)
      .attr({
         'stroke-width': 3,
         stroke: colorID, 
         zIndex: 5
     })
  .add();

  // ------------------------------------------------------------------------
  // draw budget line text label
  // ------------------------------------------------------------------------
  chart.renderer.rect(x-10,     y, 4, 1).attr({ fill: colorID, zIndex: 3 }).add();
  chart.renderer.text('2°',     x-22, y-1).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '11px'}).add();
  chart.renderer.text('target', x-35, y-1+10).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '9px'}).add();



  if (cumEmiss > 8000) {

    // ------------------------------------------------------------------------
    // erase title area
    // ------------------------------------------------------------------------
    var y = chart.yAxis[0].toPixels(8000);
    var x = 40;
    chart.renderer.rect(0, -1, 330, y+7)
        .attr({
           fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
           zIndex: 3
       })
    .add();

    // ------------------------------------------------------------------------
    // draw wave image to indicate we are above 8000
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/wave1.gif', x, y-5, 63, 19)
      .attr({
           zIndex: 3
       })
     .add(); 

    // ------------------------------------------------------------------------
    // redraw uppermost y tick line
    // ------------------------------------------------------------------------
    chart.renderer.rect (35, chart.yAxis[0].toPixels(8000), 75, 1).attr({ fill: 'rgba(255, 255, 255, .1)', zIndex: 3}).add();
    chart.renderer.text ('' + 8000, 5, chart.yAxis[0].toPixels(8000)+ 5 ).attr({ zIndex: 3}).css({ color: '#999', fontSize: '10px', fontWeight: 'bold' }).add();
  }


  // ------------------------------------------------------------------------
  // render chart title
  // ------------------------------------------------------------------------
  var cumEmX = 45-8;
  if      (cumEmiss >=10000) cumEmX = cumEmX-12;
  else if (cumEmiss >= 1000) cumEmX = cumEmX-6;


  if (languageID == "ch") {
    chart.renderer.text(translate ('Cumulative CO2'),    29-8+20, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('emissions to 2100'), 25-8+20, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(cumEmiss + ' ' + translate ('GtCO2'), cumEmX-10, 55).attr({ zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();
  }
  else if (languageID == "sp") {
    chart.renderer.text(translate ('Cumulative CO2'), 	 29-8-2, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('emissions to 2100'), 25-8-13, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(cumEmiss + ' ' + translate ('GtCO2'), cumEmX, 55).attr({ zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();
  }
  else if (languageID == "fr") {
    chart.renderer.text(translate ('Cumulative CO2'), 29-8-5, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('emissions to 2100'), 25-8-4, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(cumEmiss + ' ' + translate ('GtCO2'), cumEmX, 55).attr({ zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();
  }
  else if (languageID == "ru") {
    chart.renderer.text(translate ('Cumulative CO2'), 29-8-18, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('emissions to 2100'), 25-8-4, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(cumEmiss + ' ' + translate ('GtCO2'), cumEmX, 55).attr({ zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();
  }
  else {
    chart.renderer.text(translate ('Cumulative CO2'), 29-8, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('emissions to 2100'), 25-8, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(cumEmiss + ' ' + translate ('GtCO2'), cumEmX, 55).attr({ zIndex: 3}).css({ color: '#AAA', fontSize: '10px' }).add();
  }


  colorID = '#C0C0C0'
  if (cumEmiss > 3010) colorID = '#F00';

  var y1     = 260-15; 
  var offset = 12;
  var textY  = y1+10;
  var textX  = 5;


  chart.renderer.text(translate ('Keep emissions below'), 	textX, textY).attr({ zIndex: 3 }).css({ color: colorID, fontSize:    	'10px'}).add();
  chart.renderer.text(translate ('the line to maintain'), 	textX, textY+offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize:	'10px'}).add();
  chart.renderer.text(translate ('a 50% chance of'), 	textX, textY+2*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text(translate ('meeting the UNFCCC'), 	textX, textY+3*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text(translate ('2°C target!'), textX, textY+4*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();


/*  chart.renderer.text('Keep emissions below', 	textX, textY).attr({ zIndex: 3 }).css({ color: colorID, fontSize:    	'10px'}).add();
  chart.renderer.text('the line to maintain', 	textX, textY+offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize:	'10px'}).add();
  chart.renderer.text('a 50% chance', 		textX, textY+2*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text('of meeting the', 	textX, textY+3*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text('UNFCCC 2°C target!', 	textX, textY+4*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
*/

/*
  chart.renderer.text('Keep emissions', 	15, textY).attr({ zIndex: 3 }).css({ color: colorID, fontSize:    	'10px'}).add();
  chart.renderer.text('below the line for a', 	15, textY+offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize:	'10px'}).add();
  chart.renderer.text('50% chance to stay', 	15, textY+2*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text('below 2°C mean', 	15, textY+3*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
  chart.renderer.text('temp. increase!', 	15, textY+4*offset).attr({ zIndex: 3 }).css({ color: colorID, fontSize: '10px'}).add();
*/


  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw(); // refresh co2 budget  chart

} // end updateCo2BudgetDisplay () 

/* ******************************************************
 *                                                      *
 * CO2 budget (slim arrow version)                      *
 *                                                      *
 ****************************************************** */
function updateCo2BudgetDisplayDISABLED (chart) {

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index] );

/*
  if (cumEmiss > 3010)
    chart.setTitle({text: '2°C CO2 budget', style: {color: '#F00'} });
  else 
    chart.setTitle({text: '2°C CO2 budget', style: {color: '#Fff'} });
*/
  setDataPoints (chart, 0, [ cumEmiss ] );

  var x  = 23+20;
  var y1 = 260-15; 
  var y2 = 0;   
   
  var w1 = Math.sqrt (3010);
  var h1 = w1;

  var maxW = w1; //2*w1; 

  var w2 = Math.sqrt (cumEmiss);
  w2 = w1; // Math.min (w2, maxW);
  var h2 = cumEmiss / w2;

  var scaleFac = 0.7; //0.6;
  w1 = w1 * scaleFac; 
  h1 = h1 * scaleFac; 
  w2 = w2 * scaleFac; 
  h2 = h2 * scaleFac; 

  // -----------------------------------------------------
  // erase last drawings
  // -----------------------------------------------------
  chart.renderer.rect(0, 0, 300, 310)
      .attr({
         fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  // -----------------------------------------------------
  // draw current emissions
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h2, w2, h2)
      .attr({
         fill: '#737373', //'#999', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();


  var colorID = '#FF8000'
  if (cumEmiss > 3010) colorID = '#F00';

  // -----------------------------------------------------
  // draw budget line for 2 deg
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h1-1, w1, 1)
      .attr({
         'stroke-width': 3,
         stroke: colorID, 
         zIndex: 2
     })
  .add();

/*
  var h3 = Math.sqrt (2260);
  h3 = h3 * scaleFac; 

  // -----------------------------------------------------
  // draw budget line for 1.5 deg
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h3-1, w1, 1)
      .attr({
         'stroke-width': 3,
         stroke: colorID,
         zIndex: 2
     })
  .add();
*/

  chart.renderer.rect(x-10, y1-h1-1, 4, 1).attr({ fill: colorID, zIndex: 2 }).add();
  chart.renderer.text('2°',     x-22, y1-h1-1+5-5).attr({ zIndex: 2 }).css({ color: colorID,fontSize: '11px'}).add();
  chart.renderer.text('target', x-35, y1-h1-1+5+5).attr({ zIndex: 2 }).css({ color: colorID,fontSize: '9px'}).add();


  var textY = y1+12+2+2;


  colorID = '#C0C0C0'
  if (cumEmiss > 3010) colorID = '#F00';


  chart.renderer.text('Keep emissions', 	10, textY).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('below the line for a', 	10, textY+10).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('50% chance to stay', 	10, textY+20).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('below 2°C mean', 	10, textY+30).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('temp. increase!', 	10, textY+40).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();

/*
  chart.renderer.text('Stay below the', 5, textY).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('line for a 50%', 5, textY+10).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('chance to stay', 5, textY+20).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('below 2°C mean', 5, textY+30).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('temp. increase!', 5, textY+40).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
*/

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_dashboard_co2_budget.redraw(); // refresh co2 budget  chart

} // end updateCo2BudgetDisplay () 







function updateCo2BudgetDisplayLAST (chart) {

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index] );

/*
  if (cumEmiss > 3010)
    chart.setTitle({text: '2°C CO2 budget', style: {color: '#F00'} });
  else 
    chart.setTitle({text: '2°C CO2 budget', style: {color: '#Fff'} });
*/
  setDataPoints (chart, 0, [ cumEmiss ] );

  var x  = 23+20;
  var y1 = 260-15; 
  var y2 = 0;   
   
  var w1 = Math.sqrt (3010);
  var h1 = w1;

  var maxW = w1; //2*w1; 

  var w2 = Math.sqrt (cumEmiss);
  w2 = w1; // Math.min (w2, maxW);
  var h2 = cumEmiss / w2;

  var scaleFac = 0.7; //0.6;
  w1 = w1 * scaleFac; 
  h1 = h1 * scaleFac; 
  w2 = w2 * scaleFac; 
  h2 = h2 * scaleFac; 

  // -----------------------------------------------------
  // erase last drawings
  // -----------------------------------------------------
  chart.renderer.rect(0, 0, 300, 310)
      .attr({
         fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  // -----------------------------------------------------
  // draw current emissions
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h2, w2, h2)
      .attr({
         fill: '#737373', //'#999', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();


  var colorID = '#FF8000'
  if (cumEmiss > 3010) colorID = '#F00';

  // -----------------------------------------------------
  // draw budget line for 2 deg
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h1-1, w1, 1)
      .attr({
         'stroke-width': 3,
         stroke: colorID, 
         zIndex: 2
     })
  .add();

/*
  var h3 = Math.sqrt (2260);
  h3 = h3 * scaleFac; 

  // -----------------------------------------------------
  // draw budget line for 1.5 deg
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h3-1, w1, 1)
      .attr({
         'stroke-width': 3,
         stroke: colorID,
         zIndex: 2
     })
  .add();
*/

  chart.renderer.rect(x-10, y1-h1-1, 4, 1).attr({ fill: colorID, zIndex: 2 }).add();
  chart.renderer.text('2°',     x-22, y1-h1-1+5-5).attr({ zIndex: 2 }).css({ color: colorID,fontSize: '11px'}).add();
  chart.renderer.text('target', x-35, y1-h1-1+5+5).attr({ zIndex: 2 }).css({ color: colorID,fontSize: '9px'}).add();


  var textY = y1+12+2+2;


  colorID = '#C0C0C0'
  if (cumEmiss > 3010) colorID = '#F00';


  chart.renderer.text('Keep emissions', 	10, textY).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('below the line for a', 	10, textY+10).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('50% chance to stay', 	10, textY+20).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('below 2°C mean', 	10, textY+30).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();
  chart.renderer.text('temp. increase!', 	10, textY+40).attr({ zIndex: 2 }).css({ color: colorID, fontSize: '9px'}).add();

/*
  chart.renderer.text('Stay below the', 5, textY).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('line for a 50%', 5, textY+10).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('chance to stay', 5, textY+20).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('below 2°C mean', 5, textY+30).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('temp. increase!', 5, textY+40).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
*/

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_dashboard_co2_budget.redraw(); // refresh co2 budget  chart

} // end updateCo2BudgetDisplay () 



/* ******************************************************
 *                                                      *
 * CO2 budget (slim version)                            *
 *                                                      *
 ****************************************************** */
/*
function updateCo2BudgetDisplay (chart) {

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index] );

  setDataPoints (chart, 0, [ cumEmiss ] );

  var x  = 23;
  var y1 = 260-15; 
  var y2 = 0;   
   
  var w1 = Math.sqrt (3010);
  var h1 = w1;

  var maxW = w1; //2*w1; 

  var w2 = Math.sqrt (cumEmiss);
  w2 = w1; // Math.min (w2, maxW);
  var h2 = cumEmiss / w2;

  var scaleFac = 0.67; //0.6;
  w1 = w1 * scaleFac; 
  h1 = h1 * scaleFac; 
  w2 = w2 * scaleFac; 
  h2 = h2 * scaleFac; 

  // -----------------------------------------------------
  // erase last drawings
  // -----------------------------------------------------
  chart.renderer.rect(0, 0, 300, 310)
      .attr({
         fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  // -----------------------------------------------------
  // draw current emissions
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h2, w2, h2)
      .attr({
         fill: '#737373', //'#999', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  // -----------------------------------------------------
  // draw budget box
  // -----------------------------------------------------
  chart.renderer.rect(x, y1-h1-1, w1, 1)
      .attr({
         'stroke-width': 3,
         stroke: '#FF8000', // 'red', //'orange',
         zIndex: 2
     })
  .add();

  var textY = y1+12+2+2;


  chart.renderer.text('Stay below the', 5, textY).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('line for a 50%', 5, textY+10).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('chance to stay', 5, textY+20).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('below 2°C mean', 5, textY+30).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();
  chart.renderer.text('temp. increase!', 5, textY+40).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '9px'}).add();


  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_dashboard_co2_budget.redraw(); // refresh co2 budget  chart

} // end updateCo2BudgetDisplay () 
*/


/* ******************************************************
 *                                                      *
 * CO2 budget (box version)                             *
 *                                                      *
 ****************************************************** */
/*
function updateCo2BudgetDisplay () {

  var index = 0;
  if (maxYear == 2100) index = 1;
  var cumEmiss = Math.round (ds["dashboard"]["cum GHG emissions projected"][index]);

  var chart = chart_dashboard_co2_budget;

  setDataPoints (chart, 0, [ cumEmiss ] );

  var y1 = 170; //145; // 295; //chart.yAxis[0].toPixels(0);
  var y2 = 0; //chart.yAxis[0].toPixels(300);
   
  var w1 = Math.sqrt (3010);
  var h1 = w1;

  var maxW = w1; //2*w1; 

  var w2 = Math.sqrt (cumEmiss);
  //w2 = Math.min (w2, maxW);
  var h2 = cumEmiss / w2;

  var scaleFac = 0.8;
  w1 = w1 * scaleFac; 
  h1 = h1 * scaleFac; 
  w2 = w2 * scaleFac; 
  h2 = h2 * scaleFac; 


  chart.renderer.rect(0, 0, 300, 300)
      .attr({
         fill: '#191919', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  chart.renderer.rect(31, y1-h2, w2, h2)
      .attr({
         fill: '#737373', //'#999', // 'rgba(0, 0, 0, 0.1)',
         zIndex: 2
     })
  .add();

  chart.renderer.rect(31+1-1, y1-h1-1, w1, h1)
      .attr({
         'stroke-width': 3,
         stroke: '#FF8000', // 'red', //'orange',
         zIndex: 2
     })
  .add();

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_dashboard_co2_budget.redraw(); // refresh co2 budget  chart

} // end updateCo2BudgetDisplay () 
*/



/* ******************************************************
 *                                                      *
 * Climate screen - basic physics page                  *
 *                                                      *
 ****************************************************** */
function updateBasicPhysics () {

  document.getElementById("extra-energy-trapped-2050").innerHTML	 = "<font color='orange'>" + roundValue (ds["climate_change"]["energy_trapped_by_co2_2050"]) + " " + translate("EJ") + " " + "</font>";
  document.getElementById("extra-energy-trapped-2100").innerHTML	 = "<font color='orange'>" + roundValue (ds["climate_change"]["energy_trapped_by_co2_2100"]) + " " + translate("EJ") + " " + "</font>";
  document.getElementById("ice-melted-mass-2100").innerHTML 		 = "<font color='orange'>" + (ds["climate_change"]["ice_melted_mass_2100"] ) + " " + translate("Gt") + " " +  "</font>";
  document.getElementById("slr-due-to-ice-melt-2100").innerHTML 	 = "<font color='orange'>" + ds["climate_change"]["slr_due_to_ice_melt_2100"] + " " + translate("m") + " " + "</font>";
  document.getElementById("slr-due-to-thermal-expansion-2100").innerHTML = "<font color='orange'>" + ds["climate_change"]["slr_due_to_thermal_expansion_2100"] + " " + translate("m") + " " + "</font>";

  document.getElementById("slr-total-2100").innerHTML 	 = "<font color='orange'>" + 
     roundValue2 ( ds["climate_change"]["slr_due_to_ice_melt_2100"] + ds["climate_change"]["slr_due_to_thermal_expansion_2100"]) + " " + translate("m") + "" + "</font>";

 }



/* ******************************************************
 *                                                      *
 * Climate screen - temperature timeseries              *
 *                                                      *
 ****************************************************** */

function getExceedIndex () {

  for (var i=0; i<ds["climate_change"]["years projected"].length; i++) {

    if ( ds["climate_change"]["High estimate"][i]  == "Extreme warming – beyond the level assessed by the IPCC" ||
         ds["climate_change"]["Low estimate"][i]   == "Extreme warming – beyond the level assessed by the IPCC") {

       return i;
    }
  }
  return -1;
}


function updateTempTimeseries () {

  var highEstimate = ds["climate_change"]["High estimate"].slice(0);
  var lowEstimate  = ds["climate_change"]["Low estimate"].slice(0);

  var highEstimateLastValid = ds["climate_change"]["High estimate"].slice(0);
  var lowEstimateLastValid  = ds["climate_change"]["Low estimate"].slice(0);

  var exceedsIPCCRange = false;

/*
  for (var i=0; i<ds["climate_change"]["years projected"].length; i++) {

    if ( ds["climate_change"]["High estimate"][i]  == "Extreme warming – beyond the level assessed by the IPCC" ||
         ds["climate_change"]["Low estimate"][i]   == "Extreme warming – beyond the level assessed by the IPCC") {

       exceedsIPCCRange = true;
       highEstimate[i] = null;
       lowEstimate[i]  = null;
    }
    else {
     highEstimate[i] = roundValue(highEstimate[i]);
     lowEstimate[i]  = roundValue(lowEstimate[i]);
    }
  }
*/

  var exceedIndex = -1;
  for (var i=0; i<ds["climate_change"]["years projected"].length; i++) {

    if ( ds["climate_change"]["High estimate"][i]  == "Extreme warming – beyond the level assessed by the IPCC" ||
         ds["climate_change"]["Low estimate"][i]   == "Extreme warming – beyond the level assessed by the IPCC") {

       exceedsIPCCRange = true;
    }
  }

  var exceedIndex = getExceedIndex();

  for (var i=0; i<ds["climate_change"]["years projected"].length; i++) {

    if ( i < exceedIndex-2 ) {
      highEstimate[i] = roundValue(highEstimate[i]);
      lowEstimate[i]  = roundValue(lowEstimate[i]);

      if (i == exceedIndex-3 ) {
        highEstimateLastValid[i] = roundValue(highEstimateLastValid[i]);
        lowEstimateLastValid[i]  = roundValue(lowEstimateLastValid[i]);
      }
      else {
        highEstimateLastValid[i] = null;
        lowEstimateLastValid[i]  = null;
      }
	
    }
    else if ( i < exceedIndex ) {
      highEstimate[i] = null;
      lowEstimate[i]  = null;

      highEstimateLastValid[i] = roundValue(highEstimateLastValid[i]);
      lowEstimateLastValid[i]  = roundValue(lowEstimateLastValid[i]);
    }
    else {
      highEstimate[i] = null;
      lowEstimate[i]  = null;

      highEstimateLastValid[i] = null;
      lowEstimateLastValid[i]  = null;
    }

  }




  // -----------------------------------------------------------------
  // pump data into chart (actual)
  // -----------------------------------------------------------------
  setDataPoints (chart_temperature_timeseries, 0, roundArrayValues2 (ds["climate_change"]["Actual (NASA)"]));
  setDataPoints (chart_temperature_timeseries, 1, roundArrayValues2 (ds["climate_change"]["Actual (HadCRUT3)"]));
  setDataPoints (chart_temperature_timeseries, 2, roundArrayValues2 (ds["climate_change"]["Actual (HadCRUT4)"]));


  //alert ("exceedsIPCCRange = " + exceedsIPCCRange + "\n" + highEstimate)


  if (exceedsIPCCRange) {
/*
    alert (ds["climate_change"]["High estimate"] + "\n" + 
           highEstimate + "\n" + 
           highEstimateLastValid  + "\n" + 
           ds["climate_change"]["Low estimate"] + "\n" + 
           lowEstimate   + "\n" + 
           lowEstimateLastValid);
*/

//    chart_temperature_timeseries.series[3].hide();
//    chart_temperature_timeseries.series[4].hide();
    chart_temperature_timeseries.series[5].show();
    chart_temperature_timeseries.series[6].show();

    setDataPoints (chart_temperature_timeseries, 3, highEstimate);
    setDataPoints (chart_temperature_timeseries, 4, lowEstimate);
    setDataPoints (chart_temperature_timeseries, 5, highEstimateLastValid);
    setDataPoints (chart_temperature_timeseries, 6, lowEstimateLastValid);

  }
  else {
//    chart_temperature_timeseries.series[3].show();
//    chart_temperature_timeseries.series[4].show();
    chart_temperature_timeseries.series[5].hide();
    chart_temperature_timeseries.series[6].hide();

    // -----------------------------------------------------------------
    // pump data into chart (projected)
    // -----------------------------------------------------------------
    setDataPoints (chart_temperature_timeseries, 3, roundArrayValues2 (ds["climate_change"]["High estimate"]));
    setDataPoints (chart_temperature_timeseries, 4, roundArrayValues2 (ds["climate_change"]["Low estimate"]));
  }
  // -----------------------------------------------------
  // refresh chart
  // -----------------------------------------------------
  chart_temperature_timeseries.redraw(); 
}


/* ******************************************************
 *                                                      *
 * Thermometer (Dashboard, Climate)                     *
 *                                                      *
 ****************************************************** */

function updateThermometer (chart, messageID) {

  var index = 0;
  if (maxYear == 2100) index = 1;

  // ------------------------------------------------------------------------
  // erase last drawings
  // ------------------------------------------------------------------------
  chart.renderer.rect(0, 0, 200, 400)
      .attr({
         fill: '#191919', // '#151515', 
         zIndex: 3
     })
  .add();

  // ------------------------------------------------------------------------
  // render chart title
  // ------------------------------------------------------------------------

  if (languageID == "en") {
    chart.renderer.text(translate ('Global mean temperature'), 5, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'), 25-9, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }
  else if (languageID == "po") {
    chart.renderer.text(translate ('Global mean temperature'), 5+2, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'),   5-1, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }
  else if (languageID == "fr") {
    chart.renderer.text(translate ('Global mean temperature'), 5+2, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'),   5+2, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }
  else if (languageID == "ch") {
    chart.renderer.text(translate ('Global mean temperature'), 5+25, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'),   5+20, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }
  else if (languageID == "ba") {
    chart.renderer.text(translate ('Global mean temperature'), 5+11, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'),   5+4, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }
  else {
    chart.renderer.text(translate ('Global mean temperature'), 5, 23).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
    chart.renderer.text(translate ('change in 2100 (in°C)'),   5, 39).attr({ zIndex: 3}).css({ color: '#FFF', fontSize: '10px' }).add();
  }

  // ---------------------------------------------------------------------------------------
  // enable y axis labels 
  // ---------------------------------------------------------------------------------------
  chart.yAxis[0].update({
    labels: { enabled: true }
  });

  // ------------------------------------------------------------------------
  // draw y lines 
  // ------------------------------------------------------------------------
  for (var i=0; i<=8; i++)
    chart.renderer.rect (25, chart.yAxis[0].toPixels(i), 10, 1)
      .attr({
         fill: 'rgba(255, 255, 255, .1)', 
         zIndex: 3
     })
   .add();


  // ---------------------------------------------------------------------------------------
  // check if we have a 'assessment range exceeded' warning
  // ---------------------------------------------------------------------------------------
  var ipccRangeExceeded =  (ds["warning_messages"]["beyond_ipcc_assessment"].toUpperCase().indexOf("NO WARNING") != 0   ||
                            ds["dashboard"]["temperature change Low"][index]  == "warning - range exceeds IPCC assessment" ||
                            ds["dashboard"]["temperature change High"][index] == "warning - range exceeds IPCC assessment");

  // ---------------------------------------------------------------------------------------
  // deal with 'assessment range exceeded' warning
  // ---------------------------------------------------------------------------------------
  if ( ipccRangeExceeded ) {

    // ------------------------------------------------------------------------
    // draw red thermometer image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/empty-thermometer-red.gif', 45, chart.yAxis[0].toPixels(8), 34, chart.yAxis[0].toPixels(0)-20)
      .attr({
           zIndex: 3
       })
     .add(); 

    // -----------------------------------------------------------------
    // adjust the tooltip to static message
    // -----------------------------------------------------------------
    chart.tooltip.options.formatter = function() {
/*
        return '<span style="font-weight: normal; color: orange">' + 'This is a <span style="font-weight: normal; color: red">very high' + '</span><br>' + 
               '<span style="font-weight: normal; color: red">' + 'emissions pathway' + '</span><br>' + 
               '<span style="font-weight: normal; color: orange">' + 'which could have' + '</span><br>' + 
               '<span style="font-weight: normal; color: red">' + 'very dangerous' + '</span><br>' + 
               '<span style="font-weight: normal; color: red">' + 'impacts</span>' + '<span style="font-weight: normal; color: orange">' + ' on the' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'climate because the' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'top of your temperature' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'range exceeds 6C.' + '<br>  </span><br>' + 
               '<span style="font-weight: normal; color: orange">' + 'It is not possible to' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'show the high/low' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'temperature range for' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'your pathway because' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'it has more emissions' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'than any considered by' + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + 'the IPCC science.';
*/

        return '<span style="font-weight: normal; color: orange">' + translate ('This is a') + ' <span style="font-weight: normal; color: red">' + translate ('very high') + '</span><br>' + 
               '<span style="font-weight: normal; color: red">'    + translate ('emissions pathway') + '</span><br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('which could have') + '</span><br>' + 
               '<span style="font-weight: normal; color: red">'    + translate ('very dangerous im-') + '</span><br>' + 

               '<span style="font-weight: normal; color: red">'    + translate ('pacts') + ' ' + 
               '<span style="font-weight: normal; color: orange">' + translate ('on the climate.') +  '<br>  </span><br>' + 

/*
               '<span style="font-weight: normal; color: red">'    + translate ('pacts') + ' </span><br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('on the climate.') +  '<br>  </span><br>' + 
*/
               '<span style="font-weight: normal; color: orange">' + translate ('The top of the possi-') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('ble temperature range') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('exceeds 6C, and you') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('are at risk of trig-') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('gering feedbacks and') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('impacts not represen-') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('ted well in climate') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('models. The IPCC does') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('not assess a high/low') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('temperature range at') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('this extreme level of') + '<br>' + 
               '<span style="font-weight: normal; color: orange">' + translate ('emissions.');
    }




    // -----------------------------------------------------------------
    // draw exclamation mark
    // -----------------------------------------------------------------
    chart.renderer.rect (82, chart.yAxis[0].toPixels(6.5), 8, 40)
        .attr({
           fill: '#ff0000', // '#151515', 
           zIndex: 3
       })
    .add();
    chart.renderer.rect (82, chart.yAxis[0].toPixels(6.5)+40+7, 8, 8)
        .attr({
           fill: '#ff0000', // '#151515', 
           zIndex: 3
       })
    .add();
/*
    // ------------------------------------------------------------------------
    // draw arrow image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/arrow-2.png', 82, chart.yAxis[0].toPixels(6.5), 30, 76)
      .attr({
           zIndex: 3
       })
     .add(); 
*/
  }
  else {         							 

    // ------------------------------------------------------------------------
    // get pixel coords for actual temp range and gradient img
    // ------------------------------------------------------------------------
    var yLow  = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change Low"][index]) );
    var yHigh = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change High"][index]) );

    var yLowGrad  = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change Low"][index] - 0.8) );
    var yHighGrad = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change High"][index] + 0.8) );

    // ------------------------------------------------------------------------
    // draw gradient image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/temperature-gradient.png', 88+10-23-20, yHighGrad, 14, yLowGrad-yHighGrad).attr({
          zIndex: 3
      })
    .add(); 

    // ------------------------------------------------------------------------
    // draw thermometer image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/empty-thermometer.png', 56+2+30-23-20, chart.yAxis[0].toPixels(8), 34, chart.yAxis[0].toPixels(0)-20)
      .attr({
           zIndex: 3
       })
     .add(); 

    // ------------------------------------------------------------------------
    // draw uncertainty range 
    // ------------------------------------------------------------------------
    chart.renderer.rect (85, yHigh, 17, 1).attr({ fill: '#999',  zIndex: 3}).add();
    chart.renderer.rect (85, yLow,  17, 1).attr({ fill: '#999',  zIndex: 3}).add();
    chart.renderer.rect (85+8, yHigh,  1, yLow-yHigh+1).attr({ fill: '#999',  zIndex: 3}).add();

    // ---------------------------------------------------------------------------------------
    // enable temperature display in chart
    // ---------------------------------------------------------------------------------------
    chart.series[0].show();

    var uncertaintyRange = [ [ roundValue (ds["dashboard"]["temperature change Low"][index]), roundValue (ds["dashboard"]["temperature change High"][index]) ] ];

    // -----------------------------------------------------------------
    // pump data into chart
    // -----------------------------------------------------------------
    setDataPoints (chart, 0, uncertaintyRange);

    // -----------------------------------------------------------------
    // adjust the tooltip to dynamic message
    // -----------------------------------------------------------------
    chart.tooltip.options.formatter = function() {
        var str = "";
        $.each(this.points,function(){
            str += '<span style="font-weight: normal; color: orange">' + translate ("Temperature") + '</span><br><span style="font-weight: normal; color: orange">'
                +  translate ("increase") + " 2100:</span><br>" + translate ("between") + '<br/>' + this.point.low + translate ("C") + ' ' 
                + translate ("to") + ' ' + this.point.high + translate ("C") + '<br/>';
        });
        return str; 
    }
  }

  // -----------------------------------------------------
  // refresh chart
  // -----------------------------------------------------
  chart.redraw();

} // end updateThermometer


function updateThermometerVersion1 (chart, messageID) {

  var index = 0;
  if (maxYear == 2100) index = 1;

  // ------------------------------------------------------------------------
  // erase last drawings
  // ------------------------------------------------------------------------
  chart.renderer.rect(0, 0, 200, 400)
      .attr({
         fill: '#191919', // '#151515', 
         zIndex: 3
     })
  .add();


  var ipccRangeExceeded =  (ds["warning_messages"]["beyond_ipcc_assessment"].toUpperCase().indexOf("NO WARNING") != 0   ||
                            ds["dashboard"]["temperature change Low"][index]  == "warning - range exceeds IPCC assessment" ||
                            ds["dashboard"]["temperature change High"][index] == "warning - range exceeds IPCC assessment");

  // ---------------------------------------------------------------------------------------
  // deal with assessment range exceeded warning
  // ---------------------------------------------------------------------------------------
  if ( ipccRangeExceeded ) {

    // ---------------------------------------------------------------------------------------
    // disable temperature display in chart
    // ---------------------------------------------------------------------------------------
    chart.series[0].hide();

    // ---------------------------------------------------------------------------------------
    // disable y axis labels 
    // ---------------------------------------------------------------------------------------
    chart.yAxis[0].update({
            labels: {
                enabled: false
            }
        });

    // ---------------------------------------------------------------------------------------
    // display info  message within chart
    // ---------------------------------------------------------------------------------------
    chart.renderer.text('WARNING:',      20, 100).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('Emissions are', 20, 120).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('so high that',  20, 133).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('they exceed',   20, 146).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('the range', 	 20, 159).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('assessed',      20, 172).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();
    chart.renderer.text('by the IPCC.',  20, 185).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add();

    chart.renderer.text('No global mean', 20, 215).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 
    chart.renderer.text('temperature',    20, 228).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 
    chart.renderer.text('rise',      	  20, 241).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 
    chart.renderer.text('assessment',     20, 254).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 
    chart.renderer.text('for 2100',	  20, 267).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 
    chart.renderer.text('is possible!',	  20, 280).attr({ zIndex: 3 }).css({ color: 'red',fontSize: '10px'}).add(); 


  }
  else {         							 

    // ---------------------------------------------------------------------------------------
    // enable y axis labels 
    // ---------------------------------------------------------------------------------------
    chart.yAxis[0].update({
      labels: { enabled: true }
    });

    // ------------------------------------------------------------------------
    // draw y lines 
    // ------------------------------------------------------------------------
    for (var i=0; i<=8; i++)
      chart.renderer.rect (25, chart.yAxis[0].toPixels(i), 10, 1)
        .attr({
           fill: 'rgba(255, 255, 255, .1)', 
           zIndex: 3
       })
     .add();

    var yLow  = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change Low"][index]) );
    var yHigh = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change High"][index]) );

    var yLowGrad  = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change Low"][index] - 0.8) );
    var yHighGrad = chart.yAxis[0].toPixels( roundValue (ds["dashboard"]["temperature change High"][index] + 0.8) );

    // ------------------------------------------------------------------------
    // draw gradient image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/temperature-gradient.png', 88+10-23-20, yHighGrad, 14, yLowGrad-yHighGrad).attr({
          zIndex: 3
      })
    .add(); 

    // ------------------------------------------------------------------------
    // draw thermometer image
    // ------------------------------------------------------------------------
    chart.renderer.image('./imgs/empty-thermometer.png', 56+2+30-23-20, chart.yAxis[0].toPixels(8), 34, chart.yAxis[0].toPixels(0)-20)
      .attr({
           zIndex: 3
       })
     .add(); 

    // ------------------------------------------------------------------------
    // draw uncertainty range 
    // ------------------------------------------------------------------------
    chart.renderer.rect (85, yHigh, 17, 1).attr({ fill: '#999',  zIndex: 3}).add();
    chart.renderer.rect (85, yLow,  17, 1).attr({ fill: '#999',  zIndex: 3}).add();
    chart.renderer.rect (85+8, yHigh,  1, yLow-yHigh+1).attr({ fill: '#999',  zIndex: 3}).add();

    // ---------------------------------------------------------------------------------------
    // enable temperature display in chart
    // ---------------------------------------------------------------------------------------
    chart.series[0].show();

    var uncertaintyRange = [ [ roundValue (ds["dashboard"]["temperature change Low"][index]), roundValue (ds["dashboard"]["temperature change High"][index]) ] ];

    // -----------------------------------------------------------------
    // pump data into chart
    // -----------------------------------------------------------------
    setDataPoints (chart, 0, uncertaintyRange);

    // ---------------------------------------------------------------------------------------
    // hide info  message next to chart
    // ---------------------------------------------------------------------------------------
    // document.getElementById(messageID).innerHTML = "";
  }

  // -----------------------------------------------------
  // refresh chart
  // -----------------------------------------------------
  chart.redraw();

} // end updateThermometerVersion1




/* ******************************************************
 *                                                      *
 * Burning ember                                        *
 *                                                      *
 ****************************************************** */


function getY (yMin, yMax, tyMin, tyMax, yAct) {

  if (yAct < yMin)
    return tyMax -  ( ( (yAct - yMin) / (yMax - yMin) ) * (tyMax -tyMin) );

  if (yAct > yMax)
    return tyMax -  ( ( (yAct - yMin) / (yMax - yMin) ) * (tyMax -tyMin) );

  return tyMax -  ( ( (yAct - yMin) / (yMax - yMin) ) * (tyMax -tyMin) );
}

function updateBurningEmber () {


  var index = 0;
  if (maxYear == 2100) index = 1;

  var ipccRangeExceeded =  (ds["warning_messages"]["beyond_ipcc_assessment"].toUpperCase().indexOf("NO WARNING") != 0   ||
                            ds["dashboard"]["temperature change Low"][index]  == "warning - range exceeds IPCC assessment" ||
                            ds["dashboard"]["temperature change High"][index] == "warning - range exceeds IPCC assessment");

  var x = 150;

  var yMin = 0; 
  var yMax = 5.6;
 
  var tyMin = 21; //23; 
  var tyMax = 23+174; // 178;


  var jg = new jsGraphics(document.getElementById("container_cc_impacts_summary"));
  jg.setColor("#ffffff");
  jg.fillRect(0, 0, 580, 310);
  jg.drawImage("./imgs/ipcc-be.png", x, 0, 404, 303);


  // ---------------------------------------------------------------------------------------
  // hide the thermometer in the ipcc graph
  // ---------------------------------------------------------------------------------------
  jg.setColor("#ffffff");
  jg.fillRect(x, 0, 37, 240);

  //  jg.setColor("#ffffff");
  //  jg.fillRect(x, 218, 10, 12);

  // ---------------------------------------------------------------------------------------
  // draw frame
  // ---------------------------------------------------------------------------------------
  jg.setColor("#bdbdbd");
  jg.drawRect(0, 0, 580, 310);
  jg.drawRect(1, 1, 580, 310);


  // ---------------------------------------------------------------------------------------
  // draw ticks
  // ---------------------------------------------------------------------------------------
  jg.setFont("arial,helvetica,sans-serif", "10px", Font.PLAIN);
  jg.setColor("#ff0000");

  var y = getY (yMin, yMax, tyMin, tyMax, 0);
  //jg.drawLine(x+10, y, x+200, y); 

/*
  for (var i=0; i<=5; i++) {
    var temp = 0.0 + i + 0.6;
    var y = getY (yMin, yMax, tyMin, tyMax, temp);
    jg.drawLine(x+10, y, x+200, y); 
  }
*/
    jg.setColor("#636363");
  for (var i=0; i<=5; i++) {
    var temp = 0.0 + i;
    var y = getY (yMin, yMax, tyMin, tyMax, temp);
//    jg.drawLine(x+25, y, x+35, y); 
    jg.drawString('+' + temp + "°C",   x+10, y-6); 

  }

  // ---------------------------------------------------------------------------------------
  // deal with temp  change data warning (exceeding ipcc range) = bug or feature ?):
  // ---------------------------------------------------------------------------------------
  if ( ipccRangeExceeded ) {


    jg.setColor("#ff0000");
    jg.setFont("arial,helvetica,sans-serif", "11px", Font.BOLD);

    var yOffset = 50;

    jg.drawString(translate('Emissions of'),  20, 107-yOffset);
    jg.drawString(translate('your pathway'),  20, 120-yOffset);
    jg.drawString(translate('so high that'),  20, 133-yOffset);
    jg.drawString(translate('they exceed'),   20, 146-yOffset);
    jg.drawString(translate('the range'), 	   20, 159-yOffset);
    jg.drawString(translate('assessed'),      20, 172-yOffset);
    jg.drawString(translate('by the IPCC.'),  20, 185-yOffset);

    jg.drawString(translate('No global mean'), 20, 215-yOffset); 
    jg.drawString(translate('temperature rise'),    20, 228-yOffset); 
    jg.drawString(translate('assessment'),      	    20, 241-yOffset); 
    jg.drawString(translate('for 2100'),     20, 254-yOffset); 
    jg.drawString(translate('is possible!'),   20, 267-yOffset); 

    jg.paint();

  }
  else {

/*
    var yMin = 0; 
    var yMax = 5;
 
    var tyMin = 23; 
    var tyMax = 178;
*/

    jg.setColor("#636363");
    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);

    var yOffset = 0;

    jg.drawString(translate('Mean temperature'),  	20, 94-yOffset);
    jg.drawString(translate('change for 2100'),  	20, 107-yOffset);
    jg.drawString(translate('associated'),  	20, 120-yOffset);
    jg.drawString(translate('with your pathway:'), 20, 133-yOffset);

    var tempRangeLow  = roundValue (ds["dashboard"]["temperature change Low"][index]);
    var tempRangeHigh = roundValue (ds["dashboard"]["temperature change High"][index]);

    var tempRangeLowRecent  = roundValue (ds["dashboard"]["temperature change Low"][index] - 0.6);
    var tempRangeHighRecent = roundValue (ds["dashboard"]["temperature change High"][index] - 0.6);

    jg.setColor("#ff0000");
    jg.setFont("arial,helvetica,sans-serif", "12px", Font.BOLD);
    jg.drawString(tempRangeLow + '°C ' +  translate('to') + ' ' + tempRangeHigh + '°C',  20, 146-yOffset);


    jg.setColor("#636363");
    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);
    jg.drawString(translate('from pre-industrial'), 	   20, 159-yOffset);

/*
    jg.setColor("#636363");
    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);
    jg.drawString('from preindustrial, i.e.', 	   20, 159-yOffset);

    jg.setColor("#ff0000");
    jg.setFont("arial,helvetica,sans-serif", "12px", Font.BOLD);
    jg.drawString( tempRangeLowRecent + '°C to ' + tempRangeHighRecent + '°C',  20, 172-yOffset);
    jg.setColor("#636363");
    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);
    jg.drawString('from recent (1986-2005)', 	   20, 185-yOffset);
*/


    var y1 = getY (yMin, yMax, tyMin, tyMax, tempRangeLow);
    var y2 = getY (yMin, yMax, tyMin, tyMax, tempRangeHigh);

//    var y1 = getY (yMin, yMax, tyMin, tyMax, tempRangeLowRecent);
//    var y2 = getY (yMin, yMax, tyMin, tyMax, tempRangeHighRecent);

//    alert ("tyMin = 23;  tyMax = 178\n" + "tempRangeLow = " + tempRangeLow + " --> y= " + y1 + "\ntempRangeHigh = " + tempRangeHigh + " --> y= " + y2);
    
 
    var h  = Math.abs (y2-y1);

    jg.setColor("#ff0000");
    jg.drawLine(x-6-5, y1-1, x+8-5, y1-1); 
    jg.drawLine(x-6-5, y1,   x+8-5, y1); 
    jg.drawLine(x-6-5, y1+1, x+8-5, y1+1); 


    jg.drawLine(x-5-5, y1, x-5-5,    Math.max (y2,4) ); 
    jg.drawLine(x-6-5, y1, x-6-5,    Math.max (y2,4) ); 
    jg.drawLine(x-4-5, y1, x-4-5,    Math.max (y2,4) ); 

    if (y2 > 4) {
      jg.drawLine(x-6-5, y2-1, x+8-5, y2-1); 
      jg.drawLine(x-6-5, y2, x+8-5, y2); 
      jg.drawLine(x-6-5, y2+1, x+8-5, y2+1); 
    }
    else {
     jg.setColor("#ffffff");
     jg.fillRect (x-6-5, 6, 3, 2 ); 
     jg.fillRect (x-6-5, 10, 3, 2 ); 
     jg.fillRect (x-6-5, 14, 3, 2 ); 
     jg.fillRect (x-6-5, 18, 3, 2 ); 
     jg.fillRect (x-6-5, 22, 3, 2 ); 


    } 

    jg.paint();

  }

} // end updateBurningEmber


function drawRcpImg () {

// alert ("hi");
//return;
  var x = 150;

  var yMin = 0; 
  var yMax = 5.6;
 
  var tyMin = 21; //23; 
  var tyMax = 23+174; // 178;


  var jg = new jsGraphics(document.getElementById("container_cc_impacts_details"));

  
  jg.setColor("rgba(0, 0, 0, 0.1)");
  jg.fillRect(0, 0, 580, 310);


  // ---------------------------------------------------------------------------------------
  // draw frame
  // ---------------------------------------------------------------------------------------
  jg.setColor("#bdbdbd");
  // jg.drawRect(0, 0, 580, 310);
  //jg.drawRect(1, 1, 580, 310);


    jg.setColor("#999");
    jg.setFont("arial,helvetica,sans-serif", "12px", Font.BOLD);
    jg.drawString('Increasing CO2 emissions and impacts',  	110, 13);

    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);
    jg.drawString('Hover over the icons below to see examples of potential impacts', 110, 33);


    jg.drawString('RCP8.5 (8215Gt)',  	18, 96);
    jg.drawString('RCP6.0 (5920Gt)',  	18, 155);
    jg.drawString('RCP2.6 (3025Gt)',  	18, 210);
	
    for (var i=0; i<8; i++)
      jg.drawImage("./imgs/icons/zoom-orange.gif", 110+i*40, 85, 32, 32);

    for (var i=0; i<4; i++)
      jg.drawImage("./imgs/icons/zoom-orange.gif", 110+i*40, 155-11, 32, 32);

    for (var i=0; i<2; i++)
      jg.drawImage("./imgs/icons/zoom-orange.gif", 110+i*40, 210-11, 32, 32);

    jg.setColor("#636363");
    jg.setFont("arial,helvetica,sans-serif", "10px", Font.BOLD);




    jg.paint();


} // end drawRcpImg


/* ******************************************************
 *                                                      *
 * Electricity                                          *
 *                                                      *
 ****************************************************** */

function updateElectricityCarbonIntensityCharts() {

  setDataPoints (chart_electricity_carbon_intensity, 0, roundArrayValues1 (ds["electricity"]["emissions intensity"]["CO2e"] ));

  // -----------------------------------------------------
  // refresh chart
  // -----------------------------------------------------
  chart_electricity_carbon_intensity.redraw();

}

function updateElectricity() {

    // -----------------------------------------------------------------
    // pump  data into the electricity supply chart
    // -----------------------------------------------------------------
    setDataPoints (chart_electricity_balancing_electricity_supply, 0, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Unabated solid fuel power plants"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 1, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Unabated liquid fuel power plants"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 2, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Unabated gas fuel power plants"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 3, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Carbon Capture and Storage"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 4, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Nuclear"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 5, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Wind, solar, marine"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 6, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Hydro"] ));
    setDataPoints (chart_electricity_balancing_electricity_supply, 7, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Geothermal"] ));

    setDataPoints (chart_electricity_balancing_electricity_supply, 8, roundArrayValues1 (ds["electricity"]["electricity energy supply"]["Demand for electricity to grid"] ));
 


    // -----------------------------------------------------
    // refresh chart
    // -----------------------------------------------------
    chart_electricity_balancing_electricity_supply.redraw();
  
    // -----------------------------------------------------------------
    // pump  data into the 'Installed capacity' output table
    // -----------------------------------------------------------------

    document.getElementById('icap_coal_biomass_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Coal / biomass"][0]) + "</font>";
    document.getElementById('icap_coal_biomass_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Coal / biomass"][1]) + "</font>";
   
    document.getElementById('icap_liquid_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Liquid"][0]) + "</font>";
    document.getElementById('icap_liquid_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Liquid"][1]) + "</font>";

    document.getElementById('icap_gas_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Gas"][0]) + "</font>";
    document.getElementById('icap_gas_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Gas"][1]) + "</font>";

    document.getElementById('icap_ccs_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Carbon capture and storage"][0]) + "</font>";
    document.getElementById('icap_ccs_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Carbon capture and storage"][1]) + "</font>";

    document.getElementById('icap_nuclear_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Nuclear"][0]) + "</font>";
    document.getElementById('icap_nuclear_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Nuclear"][1]) + "</font>";

    document.getElementById('icap_wind_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Wind"][0]) + "</font>";
    document.getElementById('icap_wind_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Wind"][1]) + "</font>";

    document.getElementById('icap_hydro_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Hydro"][0]) + "</font>";
    document.getElementById('icap_hydro_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Hydro"][1]) + "</font>";

    document.getElementById('icap_marine_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Marine"][0]) + "</font>";
    document.getElementById('icap_marine_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Marine"][1]) + "</font>";

    document.getElementById('icap_solar_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Solar"][0]) + "</font>";
    document.getElementById('icap_solar_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Solar"][1]) + "</font>";

    document.getElementById('icap_geothermal_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Geothermal"][0]) + "</font>";
    document.getElementById('icap_geothermal_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Geothermal"][1]) + "</font>";

    document.getElementById('icap_storage_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Storage"][0]) + "</font>";
    document.getElementById('icap_storage_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["electricity"]["installed capacity"]["Storage"][1]) + "</font>";


} // end updateElectricity

/* ******************************************************
 *                                                      *
 * Transport                                            *
 *                                                      *
 ****************************************************** */
function updateTransportTechAndFuelCharts () {

  // -----------------------------------------------------------------
  // pump  data into charts
  // -----------------------------------------------------------------
  setDataPoints (chart_transport_cars_on_the_road,  0, roundArrayValues1 (ds["transport"]["transport by fuel type"]["Hydrogen"] ));
  setDataPoints (chart_transport_cars_on_the_road,  1, roundArrayValues1 (ds["transport"]["transport by fuel type"]["Electric"] ));
  setDataPoints (chart_transport_cars_on_the_road,  2, roundArrayValues1 (ds["transport"]["transport by fuel type"]["ICEs"] ));
  setDataPoints (chart_transport_cars_on_the_road,  3, roundArrayValues1 (ds["transport"]["transport by fuel type"]["PHs"] ));
 
  setDataPoints (chart_transport_avg_efficiency,    0, roundArrayValues1 (ds["transport"]["passenger efficiency average all cars"]["All cars"] ));

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_transport_cars_on_the_road.redraw();
  chart_transport_avg_efficiency.redraw();
}

function updateTransportFuelTypeCharts () {

  // -----------------------------------------------------------------
  // pump  data into charts
  // -----------------------------------------------------------------
  setDataPoints (chart_transport_by_fuel_type,  0, roundArrayValues1 (ds["transport"]["fuel type used by mode"]["Global Liquid hydrocarbons"] ));
  setDataPoints (chart_transport_by_fuel_type,  1, roundArrayValues1 (ds["transport"]["fuel type used by mode"]["Global Electricity (delivered to end user)"] ));
  setDataPoints (chart_transport_by_fuel_type,  2, roundArrayValues1 (ds["transport"]["fuel type used by mode"]["Global Gaseous hydrocarbons"] ));
  setDataPoints (chart_transport_by_fuel_type,  3, roundArrayValues1 (ds["transport"]["fuel type used by mode"]["Global H2"] ));
 
  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_transport_by_fuel_type.redraw();
}
function updateTransportFreightCharts () {

  var freightByShip = ds["transport"]["total international freight by ship"]["International ship: Index vs 2011 figure"].slice(0);
  for (var i=0; i<freightByShip.length; i++) {
    freightByShip[i]  = freightByShip[i]*100;
  }

  setDataPoints (chart_transport_freight_by_load,  0, roundArrayValues2 (freightByShip));
  setDataPoints (chart_transport_freight_by_load,  1, roundArrayValues2 (ds["transport"]["products shipped by sea"]["Weighted index of oil, coal and iron products shipped by sea"]));

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart_transport_freight_by_load.redraw();
}


function updateTransportModeCharts() {

    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
/*
    setDataPoints (chart_transport_energy_demand_observed,  0, roundArrayValues1 (ds["transport"]["energy demand historic"]["Transport"] ));

    setDataPoints (chart_transport_energy_demand_projected, 0, roundArrayValues1 (ds["transport"]["energy demand projected"]["Global Road transport"]));
    setDataPoints (chart_transport_energy_demand_projected, 1, roundArrayValues1 (ds["transport"]["energy demand projected"]["Global Rail transport"]));
    setDataPoints (chart_transport_energy_demand_projected, 2, roundArrayValues1 (ds["transport"]["energy demand projected"]["Global Aviation transport"]));
    setDataPoints (chart_transport_energy_demand_projected, 3, roundArrayValues1 (ds["transport"]["energy demand projected"]["Global Water transport"]));
*/


    setDataPoints (chart_transport_energy_demand_observed,  0, roundArrayValues1 (ds["transport"]["energy demand historic"]["Transport"] ));

    setDataPoints (chart_transport_energy_demand_projected, 0, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Passenger Light road"]));
    setDataPoints (chart_transport_energy_demand_projected, 1, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Passenger Heavy road"]));
    setDataPoints (chart_transport_energy_demand_projected, 2, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Passenger Rail"]));
    setDataPoints (chart_transport_energy_demand_projected, 3, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Passenger Plane"]));
    setDataPoints (chart_transport_energy_demand_projected, 4, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Passenger Ship"]));
    setDataPoints (chart_transport_energy_demand_projected, 5, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Freight Light road"]));
    setDataPoints (chart_transport_energy_demand_projected, 6, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Freight Heavy road"]));
    setDataPoints (chart_transport_energy_demand_projected, 7, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Freight Rail"]));
    setDataPoints (chart_transport_energy_demand_projected, 8, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Freight Plane"]));
    setDataPoints (chart_transport_energy_demand_projected, 9, roundArrayValues1 (ds["transport"]["all energy used by mode"]["Freight Ship"]));

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_transport_energy_demand_observed.redraw();
    chart_transport_energy_demand_projected.redraw();

    // -----------------------------------------------------
    // update result table
    // -----------------------------------------------------


    document.getElementById('passenger_light_road_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Light road"][0]) + "</font>";
    document.getElementById('passenger_light_road_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Light road"][1]) + "</font>";

    document.getElementById('passenger_heavy_road_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Heavy road"][0]) + "</font>";
    document.getElementById('passenger_heavy_road_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Heavy road"][1]) + "</font>";

    document.getElementById('passenger_rail_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Rail"][0]) + "</font>";
    document.getElementById('passenger_rail_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Rail"][1]) + "</font>";

    document.getElementById('passenger_plane_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Plane"][0]) + "</font>";
    document.getElementById('passenger_plane_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock passenger"]["Plane"][1]) + "</font>";



    document.getElementById('freight_light_road_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Light road"][0]) + "</font>";
    document.getElementById('freight_light_road_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Light road"][1]) + "</font>";

    document.getElementById('freight_heavy_road_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Heavy road"][0]) + "</font>";
    document.getElementById('freight_heavy_road_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Heavy road"][1]) + "</font>";

    document.getElementById('freight_rail_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Rail"][0]) + "</font>";
    document.getElementById('freight_rail_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Rail"][1]) + "</font>";

    document.getElementById('freight_ship_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Ship"][0]) + "</font>";
    document.getElementById('freight_ship_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Ship"][1]) + "</font>";

    document.getElementById('freight_plane_2011').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Plane"][0]) + "</font>";
    document.getElementById('freight_plane_2050').innerHTML = "<font color='orange'>" + 
      Math.round (ds["transport"]["vehicle stock freight"]["Plane"][1]) + "</font>";




} // end updateTransport


/* ******************************************************
 *                                                      *
 * Buildings                                            *
 *                                                      *
 ****************************************************** */


function updateBuildingsInsulationAndTechCharts() {

  var data = ds["buildings"]["space heating"]["% of urban space heating by zero carbon and electric technologies"].slice(0);

  for (var i=0; i<data.length; i++) 
    data[i] = data[i]*100;

  setDataPoints (chart_buildings_heating, 0, roundArrayValues1 (data));
  setDataPoints (chart_buildings_insulation, 0, roundArrayValues1 (ds["buildings"]["insulation"]["Global urban insulation"]));


  chart_buildings_heating.redraw();
  chart_buildings_insulation.redraw();
}
function updateBuildingsFuelCharts() {

  setDataPoints (chart_buildings_by_fuel_type, 0, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Solar"]));
  setDataPoints (chart_buildings_by_fuel_type, 1, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Environmental heat"]));
  setDataPoints (chart_buildings_by_fuel_type, 2, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Heat (supplied to grid)"]));
  setDataPoints (chart_buildings_by_fuel_type, 3, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Liquid hydrocarbons"]));
  setDataPoints (chart_buildings_by_fuel_type, 4, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Solid hydrocarbons"]));
  setDataPoints (chart_buildings_by_fuel_type, 5, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Traditional biomass"]));
  setDataPoints (chart_buildings_by_fuel_type, 6, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Gaseous hydrocarbons"]));
  setDataPoints (chart_buildings_by_fuel_type, 7, roundArrayValues1 (ds["buildings"]["by fuel type"]["Global Electricity (delivered to end user)"]));

  chart_buildings_by_fuel_type.redraw();

}
function updateBuildingsEnergyUseCharts() {

    // -----------------------------------------------------------------
    // aggregate the nonresidential time series
    // -----------------------------------------------------------------
    var nonresid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i=0; i<9; i++) {
      nonresid[i] += ds["buildings"]["energy demand projected nonresid"]["Global Heating"][i];
      nonresid[i] += ds["buildings"]["energy demand projected nonresid"]["Global Cooling"][i];
      nonresid[i] += ds["buildings"]["energy demand projected nonresid"]["Global Appliances"][i];
      nonresid[i] += ds["buildings"]["energy demand projected nonresid"]["Global Lighting"][i];
      nonresid[i] += ds["buildings"]["energy demand projected nonresid"]["Global Other"][i];
    }

    // -----------------------------------------------------------------
    // pump  data into the energy demand charts
    // -----------------------------------------------------------------
    setDataPoints (chart_buildings_energy_use, 0, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Heating"]));
    setDataPoints (chart_buildings_energy_use, 1, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Cooling"]));
    setDataPoints (chart_buildings_energy_use, 2, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Hot water"]));
    setDataPoints (chart_buildings_energy_use, 3, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Appliances"]));
    setDataPoints (chart_buildings_energy_use, 4, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Cooking"]));
    setDataPoints (chart_buildings_energy_use, 5, roundArrayValues1 (ds["buildings"]["energy demand projected resid"]["Global Lighting"]));
    setDataPoints (chart_buildings_energy_use, 6, roundArrayValues1 (nonresid));

    setDataPoints (chart_buildings_energy_use_observed, 0, roundArrayValues1 (ds["buildings"]["energy demand historic"]));

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_buildings_energy_use_observed.redraw();
    chart_buildings_energy_use.redraw();



    // -----------------------------------------------------------------
    // pump  data into the 'Population and urbanization' output table
    // -----------------------------------------------------------------
/*
    document.getElementById('buildings_global_population_2011').innerHTML = "<font color='orange'>" + roundValue2 (ds["buildings"]["misc"]["Total"][0]) + "</font>";
    document.getElementById('buildings_global_population_2050').innerHTML = "<font color='orange'>" + roundValue2 (ds["buildings"]["misc"]["Total"][1]) + "</font>";

    document.getElementById('buildings_urbanization_2011').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Urbanisation"][0] * 100) + ' %' + "</font>";
    document.getElementById('buildings_urbanization_2050').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Urbanisation"][1] * 100) + ' %' + "</font>";

    document.getElementById('buildings_urban_households_2011').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Urban households"][0]) + "</font>";
    document.getElementById('buildings_urban_households_2050').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Urban households"][1]) + "</font>";

    document.getElementById('buildings_rural_households_2011').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Rural households"][0]) + "</font>";
    document.getElementById('buildings_rural_households_2050').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Rural households"][1]) + "</font>";

    document.getElementById('buildings_households_with_electricity_2011').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Households with access to electricity"][0]* 100)  + ' %' + "</font>";
    document.getElementById('buildings_households_with_electricity_2050').innerHTML = "<font color='orange'>" + Math.round (ds["buildings"]["misc"]["Households with access to electricity"][1]* 100)  + ' %' + "</font>";
*/

} // end updateBuildings



/* ******************************************************
 *                                                      *
 * Manufacturing                                        *
 *                                                      *
 ****************************************************** */

function updateManufacturing() {



    // -----------------------------------------------------------------
    // pump  data into manufacturing energy consumption charts
    // -----------------------------------------------------------------
    setDataPoints (chart_manufacturing_energy_consumption_observed, 0, roundArrayValues1 (ds["manufacturing"]["energy consumption historic"]["Total"]));

/*
    // handle NO DATA FROM NAMED RANGE
    chart_manufacturing_energy_consumption_observed.series[0].hide();
    chart_manufacturing_energy_consumption_observed.renderer.text('No data for this',  70, 150).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
    chart_manufacturing_energy_consumption_observed.renderer.text('chart available',   70, 170).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
    chart_manufacturing_energy_consumption_observed.renderer.text('in this version !', 70, 190).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
*/


    setDataPoints (chart_manufacturing_energy_consumption_projected, 0, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Iron and steel"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 1, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Aluminium"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 2, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Chemicals"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 3, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Pulp and paper"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 4, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Cement"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 5, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Timber"]));
    setDataPoints (chart_manufacturing_energy_consumption_projected, 6, roundArrayValues1 (ds["manufacturing"]["energy consumption projected"]["Other"]));

    // -----------------------------------------------------------------
    // pump  data into manufacturing production chart
    // -----------------------------------------------------------------
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 0, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Iron and steel"])));
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 1, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Aluminium"])));
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 2, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Chemicals"])));
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 3, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Pulp and paper"])));
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 4, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Cement"])));
    setDataPoints (chart_manufacturing_energy_efficiency_of_production, 5, roundArrayValues1 (transformMt2Gt (ds["manufacturing"]["production"]["Timber"])));

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_manufacturing_energy_consumption_observed.redraw();
    chart_manufacturing_energy_consumption_projected.redraw();
    chart_manufacturing_energy_efficiency_of_production.redraw();

} // end updateManufacturing


/* ******************************************************
 *                                                      *
 * Materials                                            *
 *                                                      *
 ****************************************************** */

// --------------------------------------------------------------------------
// helper function for updateMaterials()
//
// input: array with time series values 2011..2050 
// returns array of normalized values with value for data[0] = 100
// --------------------------------------------------------------------------
function getNormalizedData (data) {

    // ------------------------------------------------------------------
    // define norm factor to set value for data[0] (2011) to 100
    // ------------------------------------------------------------------
    var normFactor = 100 / data[0];

    // ------------------------------------------------------------------
    // compute normalized values (2011=100), round for 2 digits
    // ------------------------------------------------------------------
    var normalizedData = new Array();
    for (var i=0; i<data.length; i++) 
      normalizedData[i] = roundValue2 (data[i] * normFactor);

    return normalizedData;
}

function updateMaterials() {

   // ******************************************************
   // materials - diagram total production index
   // ******************************************************

   // ---------------------------------------------------------------------------------------------
   // steel - aggregate and compute normalized values (2011=100)
   // ---------------------------------------------------------------------------------------------
   var aggSteel = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   for (var i=0; i<9; i++) {
      aggSteel[i] += ds["materials"]["material_demand"]["iron_and_steel"]["Oxygen steel"][i];
      aggSteel[i] += ds["materials"]["material_demand"]["iron_and_steel"]["Oxygen Hisarna steel"][i];
      aggSteel[i] += ds["materials"]["material_demand"]["iron_and_steel"]["Electric steel"][i];
   }
   var normSteel = getNormalizedData (aggSteel);

   /*
   s += "Oxygen steel : "   + ds["materials"]["material_demand"]["iron_and_steel"]["Oxygen steel"] + "<br>";
   s += "Oxygen Hisarna steel : "   + ds["materials"]["material_demand"]["iron_and_steel"]["Oxygen Hisarna steel"] + "<br>";
   s += "Electric steel : "   + ds["materials"]["material_demand"]["iron_and_steel"]["Electric steel"] + "<br>";
   s += "aggSteel : "   + aggSteel + "<br>";
   s += "normSteel : "  + normSteel + "<hr>";
   */

   // ---------------------------------------------------------------------------------------------
   // aluminium - aggregate and compute normalized values (2011=100)
   // ---------------------------------------------------------------------------------------------
   var aggAlu = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   for (var i=0; i<9; i++) {
      aggAlu[i] += ds["materials"]["material_demand"]["aluminium"]["alumina"][i];
      aggAlu[i] += ds["materials"]["material_demand"]["aluminium"]["primary aluminium"][i];
      aggAlu[i] += ds["materials"]["material_demand"]["aluminium"]["secondary aluminium"][i];
   }
   var normAlu = getNormalizedData (aggAlu);

   /*
   s += "alumina : "   + ds["materials"]["material_demand"]["aluminium"]["alumina"] + "<br>";
   s += "primary aluminium : "   + ds["materials"]["material_demand"]["aluminium"]["primary aluminium"] + "<br>";
   s += "secondary aluminium : "   + ds["materials"]["material_demand"]["aluminium"]["secondary aluminium"] + "<br>";
   s += "aggAlu : "   + aggAlu + "<br>";
   s += "normAlu : "  + normAlu + "<hr>";
   */

   // ---------------------------------------------------------------------------------------------
   // chemicals - aggregate and compute normalized values (2011=100)
   // ---------------------------------------------------------------------------------------------
   var aggChemicals = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   for (var i=0; i<9; i++) {
      aggChemicals[i] += ds["materials"]["material_demand"]["chemicals"]["Chemicals: High Added Value Chemicals"][i];
      aggChemicals[i] += ds["materials"]["material_demand"]["chemicals"]["Chemicals: Ammonia"][i];
      aggChemicals[i] += ds["materials"]["material_demand"]["chemicals"]["Chemicals: Methanol"][i];
      aggChemicals[i] += ds["materials"]["material_demand"]["chemicals"]["Chemicals: Other"][i];
   }
   var normChemicals = getNormalizedData (aggChemicals);

   /*
   s += "Chemicals: High Added Value Chemicals : "   + ds["materials"]["material_demand"]["chemicals"]["Chemicals: High Added Value Chemicals"] + "<br>";
   s += "Chemicals: Ammonia : "                      + ds["materials"]["material_demand"]["chemicals"]["Chemicals: Ammonia"] + "<br>";
   s += "Chemicals: Methanol : "                     + ds["materials"]["material_demand"]["chemicals"]["Chemicals: Methanol"] + "<br>";
   s += "Chemicals: Other : "                        + ds["materials"]["material_demand"]["chemicals"]["Chemicals: Other"] + "<br>";
   s += "aggChemicals : "   + aggChemicals + "<br>";
   s += "normChemicals : "  + normChemicals + "<hr>";
   */
 
   // ---------------------------------------------------------------------------------------------
   // pulp and paper - aggregate and compute normalized values (2011=100)
   // ---------------------------------------------------------------------------------------------
   var aggPaper = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   for (var i=0; i<9; i++) {
      aggPaper[i] += ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Pulp"][i];
      aggPaper[i] += ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Virgin"][i];
      aggPaper[i] += ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Recycled"][i];
   }
   var normPaper = getNormalizedData (aggPaper);

   /*
   s += "Paper: Pulp : "   + ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Pulp"] + "<br>";
   s += "Paper: Virgin : "   + ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Virgin"] + "<br>";
   s += "Paper: Recycled : "   + ds["materials"]["material_demand"]["pulp_and_paper"]["Paper: Recycled"] + "<br>";
   s += "aggPaper : "   + aggPaper + "<br>";
   s += "normPaper : "  + normPaper + "<hr>";
   */

   // ------------------------------------------------------------------
   // cement - compute normalized values (2011=100), round for 2 digits
   // ------------------------------------------------------------------
   var normCement = getNormalizedData (ds["materials"]["material_demand"]["cement"]["cement"]);

   /*
   s += "cement : "   + ds["materials"]["material_demand"]["cement"]["cement"] + "<br>";
   s += "normCement : "  + normCement + "<hr>";
   */

   // ------------------------------------------------------------------
   // other industries - compute normalized values (2011=100), round for 2 digits
   // ------------------------------------------------------------------
   var normOtherIndustries = getNormalizedData (ds["materials"]["material_demand"]["other industries"]["other industries"]);

   /*
   s += "other industries : "   + ds["materials"]["material_demand"]["other industries"]["other industries"] + "<br>";
   s += "normOtherIndustries : "  + normOtherIndustries + "<hr>";
   */

    // -----------------------------------------------------------------
    // pump  data into the total production index chart
    // -----------------------------------------------------------------
    setDataPoints (chart_materials_total_production, 0, normSteel);
    setDataPoints (chart_materials_total_production, 1, normAlu);
    setDataPoints (chart_materials_total_production, 2, normChemicals);
    setDataPoints (chart_materials_total_production, 3, normPaper);
    setDataPoints (chart_materials_total_production, 4, normCement);
    setDataPoints (chart_materials_total_production, 5, normOtherIndustries);

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_materials_total_production.redraw();


} // end updateMaterials




/* ******************************************************
 *                                                      *
 * Food                                                 *
 *                                                      *
 ****************************************************** */
function updateFood() {


  // "2011", "2050", "2011a", "2050a"

  var unit = "?";
  if (dietTableUnit == 1) unit = "g";
  else                    unit = "kcal";

  var dietData;

  if (unit == "g") 	dietData = ds["food_and_bioenergy"]["webtool_diet_table"];
  else 			dietData = ds["food_and_bioenergy"]["webtool_diet_table2"];

  var chart = chart_food_bioenergy_food_consumption;

  setDataPoints (chart,  0, roundArrayValues ( dietData["Beef"] ));
  setDataPoints (chart,  1, roundArrayValues ( dietData["Poultry"] ));
  setDataPoints (chart,  2, roundArrayValues ( dietData["Pork"] ));
  setDataPoints (chart,  3, roundArrayValues ( dietData["Sheep and goat meat"] ));
  setDataPoints (chart,  4, roundArrayValues ( dietData["Fish"] ));
  setDataPoints (chart,  5, roundArrayValues ( dietData["Eggs"] ));
  setDataPoints (chart,  6, roundArrayValues ( dietData["Milk products"] ));
  setDataPoints (chart,  7, roundArrayValues ( dietData["Other animal products (e.g. animal fats, offals etc.)"] ));
  setDataPoints (chart,  8, roundArrayValues ( dietData["Cereals and grains"] ));
  setDataPoints (chart,  9, roundArrayValues ( dietData["Sugars"] ));
  setDataPoints (chart, 10, roundArrayValues ( dietData["Fruit, vegetables (including roots and tubers)"] ));
  setDataPoints (chart, 11, roundArrayValues ( dietData["Pulses"] ));
  setDataPoints (chart, 12, roundArrayValues ( dietData["Vegetable oil"] ));
  setDataPoints (chart, 13, roundArrayValues ( dietData["Other"] ));

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();

} // end updateFood



/* ******************************************************
 *                                                      *
 * Lifestyle                                            *
 *                                                      *
 ****************************************************** */

function updateDietTable (dietTableUnit) {


  var unit = "g";
  if (dietTableUnit == 1) unit = "g";
  else                    unit = "kcal";

  var index_2011 = -1;
  var index_2050 = -1;
  if (unit == "g") {
    index_2011 = 0;
    index_2050 = 1;
  }
  else {
    index_2011 = 2;
    index_2050 = 3;
  }

  // "2011", "2050", "2011a", "2050a"

  var dietData = ds["food_and_bioenergy"]["webtool_diet_table"];


  var name = "Beef";
  document.getElementById('diet_beef_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_beef_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Poultry";
  document.getElementById('diet_poultry_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_poultry_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Pork";
  document.getElementById('diet_pork_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_pork_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Sheep and goat meat";
  document.getElementById('diet_sheep_and_goat_meat_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_sheep_and_goat_meat_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Fish";
  document.getElementById('diet_fish_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_fish_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Eggs";
  document.getElementById('diet_eggs_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_eggs_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Milk products";
  document.getElementById('diet_milk_products_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_milk_products_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Other animal products (e.g. animal fats, offals etc.)";
  document.getElementById('diet_other_animal_products_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_other_animal_products_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";



  name = "Cereals and grains";
  document.getElementById('diet_cereals_and_grains_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_cereals_and_grains_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Sugars";
  document.getElementById('diet_sugars_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_sugars_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Fruit, vegetables (including roots and tubers)";
  document.getElementById('diet_fruit_vegetables_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_fruit_vegetables_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Pulses";
  document.getElementById('diet_pulses_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_pulses_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Vegetable oil";
  document.getElementById('diet_vegetable_oil_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_vegetable_oil_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Other";
  document.getElementById('diet_other_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_other_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";

  name = "Total";
  document.getElementById('diet_total_2011').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2011]) + " " + unit + "</font>";
  document.getElementById('diet_total_2050').innerHTML = "<font color='orange'>" + Math.round (dietData[name][index_2050]) + " " + unit + "</font>";





}



function updateHomeTempAndSizeCharts () {

    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_home_temp_winter, 0, roundArrayValues1 (ds["lifestyle"]["home temperature"]["Global urban heating season temperature"]));
    setDataPoints (chart_home_temp_summer, 0, roundArrayValues1 (ds["lifestyle"]["home temperature"]["Global urban cooling season temperature"]));
    setDataPoints (chart_home_size,        0, roundArrayValues1 (ds["lifestyle"]["building size"]["Average household size"]));


    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_home_temp_summer.redraw();
    chart_home_temp_winter.redraw();
    chart_home_size.redraw();
}

function updateHomeAppliancesCharts () {

    var appliances_urban = [Math.round (ds["lifestyle"]["Number of appliances per household"][0]),
                            Math.round (ds["lifestyle"]["Number of appliances per household"][3])];
    var appliances_rural = [Math.round (ds["lifestyle"]["Number of appliances per household"][1]),
                            Math.round (ds["lifestyle"]["Number of appliances per household"][4])];

    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_number_of_appliances, 0, appliances_urban);
    setDataPoints (chart_number_of_appliances, 1, appliances_rural);

    setDataPoints (chart_number_of_lightbulbs, 0, roundArrayValues1 (ds["lifestyle"]["lightbulbs per household"]["Urban"]));
    setDataPoints (chart_number_of_lightbulbs, 1, roundArrayValues1 (ds["lifestyle"]["lightbulbs per household"]["Rural"]));

    setDataPoints (chart_energy_consumption_per_household, 0, roundArrayValues1 (ds["lifestyle"]["energy consumption per household"]["Urban"]));
    setDataPoints (chart_energy_consumption_per_household, 1, roundArrayValues1 (ds["lifestyle"]["energy consumption per household"]["Rural"]));

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_number_of_appliances.redraw();
    chart_number_of_lightbulbs.redraw();
    chart_energy_consumption_per_household.redraw();

}

function updateTravelSectionCharts () {

    var percVals = ds["lifestyle"]["percent distance travelled by car"]["Average"].slice(0);
    for (var i=0; i<percVals.length; i++) 
      percVals[i] = percVals[i]*100;


    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_distance_travelled_by_car,   0, roundArrayValues1 (ds["lifestyle"]["passenger distance travelled by car"]["Average"]));
    setDataPoints (chart_percent_km_travelled_by_car, 0, roundArrayValues1 (percVals));
    setDataPoints (chart_cars_per_person,             0, roundArrayValues2 (ds["lifestyle"]["cars per person"]["Average"]));

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_distance_travelled_by_car.redraw();
    chart_percent_km_travelled_by_car.redraw();
    chart_cars_per_person.redraw();
}







/* 

// DEPREC !!

function updateTravelPerPersonCharts () {

    var passenger_km_urban = [ Math.round (ds["lifestyle"]["Passenger km/head"][0]), 
                               Math.round (ds["lifestyle"]["Passenger km/head"][3]) ];
    var passenger_km_rural = [ Math.round (ds["lifestyle"]["Passenger km/head"][1]), 
                               Math.round (ds["lifestyle"]["Passenger km/head"][4]) ];

    var transport_urban = [ Math.round (ds["lifestyle"]["% of total passenger km using cars"][0]*100), 
                            Math.round (ds["lifestyle"]["% of total passenger km using cars"][3]*100) ];
    var transport_rural = [ Math.round (ds["lifestyle"]["% of total passenger km using cars"][1]*100), 
                            Math.round (ds["lifestyle"]["% of total passenger km using cars"][4]*100) ];


    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_lifestyle_1, 0, passenger_km_urban);
    setDataPoints (chart_lifestyle_1, 1, passenger_km_rural);

    setDataPoints (chart_lifestyle_2, 0, transport_urban);
    setDataPoints (chart_lifestyle_2, 1, transport_rural);

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_lifestyle_1.redraw();
    chart_lifestyle_2.redraw();

}

function updateHomeTemperatureAndSizeCharts () {

    var building_size_urban = [Math.round (ds["lifestyle"]["Building size (in metres squared)"][0]),
                               Math.round (ds["lifestyle"]["Building size (in metres squared)"][3])];
    var building_size_rural = [Math.round (ds["lifestyle"]["Building size (in metres squared)"][1]),
                               Math.round (ds["lifestyle"]["Building size (in metres squared)"][4])];

    var building_temp_warm_months_urban = [Math.round (ds["lifestyle"]["Building temperature in warm months"][0]),
                                           Math.round (ds["lifestyle"]["Building temperature in warm months"][3])]
    var building_temp_warm_months_rural = [Math.round (ds["lifestyle"]["Building temperature in warm months"][1]),
                                           Math.round (ds["lifestyle"]["Building temperature in warm months"][4])]

    var building_temp_cold_months_urban = [Math.round (ds["lifestyle"]["Building temp in cold months"][0]),
                                           Math.round (ds["lifestyle"]["Building temp in cold months"][3])]
    var building_temp_cold_months_rural = [Math.round (ds["lifestyle"]["Building temp in cold months"][1]),
                                           Math.round (ds["lifestyle"]["Building temp in cold months"][4])]

    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_lifestyle_3, 0, building_size_urban);
    setDataPoints (chart_lifestyle_3, 1, building_size_rural);

    setDataPoints (chart_lifestyle_5, 0, building_temp_warm_months_urban);
    setDataPoints (chart_lifestyle_5, 1, building_temp_warm_months_rural);

    setDataPoints (chart_lifestyle_6, 0, building_temp_cold_months_urban);
    setDataPoints (chart_lifestyle_6, 1, building_temp_cold_months_rural);

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_lifestyle_3.redraw();
    chart_lifestyle_5.redraw();
    chart_lifestyle_6.redraw();

}

function updateAppliancesCharts() {


    var appliances_urban = [Math.round (ds["lifestyle"]["Number of appliances per household"][0]),
                            Math.round (ds["lifestyle"]["Number of appliances per household"][3])];
    var appliances_rural = [Math.round (ds["lifestyle"]["Number of appliances per household"][1]),
                            Math.round (ds["lifestyle"]["Number of appliances per household"][4])];



    var population_urban = [Math.round ((ds["lifestyle"]["% of population in urban/rural areas"][0]*100)), 
                            Math.round ((ds["lifestyle"]["% of population in urban/rural areas"][3]*100))]

    var population_rural = [Math.round ((ds["lifestyle"]["% of population in urban/rural areas"][1]*100)), 
                            Math.round ((ds["lifestyle"]["% of population in urban/rural areas"][4]*100))]

    // -----------------------------------------------------------------
    // pump  data into charts
    // -----------------------------------------------------------------
    setDataPoints (chart_lifestyle_4, 0, appliances_urban);
    setDataPoints (chart_lifestyle_4, 1, appliances_rural);

    setDataPoints (chart_lifestyle_7, 0, population_urban);
    setDataPoints (chart_lifestyle_7, 1, population_rural);

    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_lifestyle_4.redraw();
    chart_lifestyle_7.redraw();

} // end updateLifestyle

*/



function updateManufacturingIronAndSteelCharts () {

    setDataPoints (chart_manufacturing_iron_and_steel_uses, 0, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Transport"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 1, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Buildings"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 2, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Infrastructure"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 3, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Consumables e.g. appliances, packaging"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 4, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Wind turbines"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 5, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["PV panels"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 6, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Fertiliser"]));
    setDataPoints (chart_manufacturing_iron_and_steel_uses, 7, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_steel_use_gt"]["Other"]));


    setDataPoints (chart_manufacturing_iron_and_steel, 0, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_steel_energy_demand"]["Steel.Oxygen"]));
    setDataPoints (chart_manufacturing_iron_and_steel, 1, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_steel_energy_demand"]["Steel.OxygenHisarna"]));
    setDataPoints (chart_manufacturing_iron_and_steel, 2, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_steel_energy_demand"]["Steel.Electric"]));
    setDataPoints (chart_manufacturing_iron_and_steel, 3, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_steel_energy_demand"]["Steel.ElectricDRI"]));
    setDataPoints (chart_manufacturing_iron_and_steel, 4, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_steel_energy_demand"]["Steel.Others"]));

    chart_manufacturing_iron_and_steel_uses.redraw();
    chart_manufacturing_iron_and_steel.redraw();
}

function updateManufacturingAluminiumCharts () {

    setDataPoints (chart_manufacturing_aluminium_uses, 0, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Transport"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 1, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Buildings"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 2, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Infrastructure"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 3, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Consumables e.g. appliances, packaging"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 4, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Wind turbines"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 5, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["PV panels"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 6, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Fertiliser"]));
    setDataPoints (chart_manufacturing_aluminium_uses, 7, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_use_gt"]["Other"]));

    setDataPoints (chart_manufacturing_aluminium, 0, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_energy_demand"]["Aluminium.Alumina"]));
    setDataPoints (chart_manufacturing_aluminium, 1, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_energy_demand"]["Aluminium.Primary"]));
    setDataPoints (chart_manufacturing_aluminium, 2, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_aluminium_energy_demand"]["Aluminium.Secondary"]));

    chart_manufacturing_aluminium_uses.redraw();
    chart_manufacturing_aluminium.redraw();
}

function updateManufacturingPaperCharts () {

    setDataPoints (chart_manufacturing_paper, 0, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_paper_energy_demand"]["Pulp & paper.Pulp"]));
    setDataPoints (chart_manufacturing_paper, 1, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_paper_energy_demand"]["Pulp & paper.Virgin"]));
    setDataPoints (chart_manufacturing_paper, 2, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_paper_energy_demand"]["Pulp & paper.Recycled"]));

    chart_manufacturing_paper.redraw();
}

function updateManufacturingChemicalsCharts () {

    setDataPoints (chart_manufacturing_chemicals_uses, 0, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Transport"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 1, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Buildings"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 2, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Infrastructure"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 3, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Consumables e.g. appliances, packaging"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 4, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Wind turbines"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 5, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["PV panels"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 6, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Fertiliser"]));
    setDataPoints (chart_manufacturing_chemicals_uses, 7, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_chemical_use_gt"]["Other"]));

    setDataPoints (chart_manufacturing_chemicals, 0, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_chemicals_energy_demand"]["Chemicals & petrochemicals.HVC"]));
    setDataPoints (chart_manufacturing_chemicals, 1, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_chemicals_energy_demand"]["Chemicals & petrochemicals.Ammonia"]));
    setDataPoints (chart_manufacturing_chemicals, 2, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_chemicals_energy_demand"]["Chemicals & petrochemicals.Methanol"]));
    setDataPoints (chart_manufacturing_chemicals, 3, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_chemicals_energy_demand"]["Chemicals & petrochemicals.Others"]));

    chart_manufacturing_chemicals_uses.redraw();
    chart_manufacturing_chemicals.redraw();
}

function updateManufacturingCementCharts () {


    setDataPoints (chart_manufacturing_cement_uses, 0, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Transport"]));
    setDataPoints (chart_manufacturing_cement_uses, 1, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Buildings"]));
    setDataPoints (chart_manufacturing_cement_uses, 2, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Infrastructure"]));
    setDataPoints (chart_manufacturing_cement_uses, 3, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Consumables e.g. appliances, packaging"]));
    setDataPoints (chart_manufacturing_cement_uses, 4, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Wind turbines"]));
    setDataPoints (chart_manufacturing_cement_uses, 5, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["PV panels"]));
    setDataPoints (chart_manufacturing_cement_uses, 6, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Fertiliser"]));
    setDataPoints (chart_manufacturing_cement_uses, 7, roundArrayValues2 (ds["manufacturing"]["g_supertable_manufacturing_cement_use_gt"]["Other"]));



    setDataPoints (chart_manufacturing_cement, 0, roundArrayValues1 (ds["manufacturing"]["g_supertable_manufacturing_cement_energy_demand"]["Cement"]));

    chart_manufacturing_cement_uses.redraw();
    chart_manufacturing_cement.redraw();
}
function updateManufacturingSalesOfProductsCharts() {
    setDataPoints (chart_manufacturing_sales_of_lightbulbs,    0, roundArrayValues1 (ds["manufacturing"]["sales_of_lightbulbs"]["TOTAL"]));
    setDataPoints (chart_manufacturing_sales_of_refrigerators, 0, roundArrayValues1 (ds["manufacturing"]["sales_of_refrigerators"]["TOTAL"]));
    setDataPoints (chart_manufacturing_sales_of_televisions,   0, roundArrayValues1 (ds["manufacturing"]["sales_of_televisions"]["TOTAL"]));

    chart_manufacturing_sales_of_lightbulbs.redraw();
    chart_manufacturing_sales_of_refrigerators.redraw();
    chart_manufacturing_sales_of_televisions.redraw();
}



/* ******************************************************
 *                                                      *
 * Bioenergy                                            *
 *                                                      *
 ****************************************************** */
function updateBioenergy () {


    // -----------------------------------------------------------------
    // pump  data into the bioenergy supply chart 1
    // -----------------------------------------------------------------
    setDataPoints (chart_bioenergy_energy_supply_1, 0, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply"]["Biocrops unused"]));
    setDataPoints (chart_bioenergy_energy_supply_1, 1, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply"]["Waste"]));
    setDataPoints (chart_bioenergy_energy_supply_1, 2, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply"]["Forest residues"]));
    setDataPoints (chart_bioenergy_energy_supply_1, 3, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply"]["Bioenergy crops"]));
    setDataPoints (chart_bioenergy_energy_supply_1, 4, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply"]["Traditional biomass"]));


    // -----------------------------------------------------------------
    // pump  data into the bioenergy supply chart 2
    // -----------------------------------------------------------------
    setDataPoints (chart_bioenergy_energy_supply_2, 0, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Solid oversupply"]));
    setDataPoints (chart_bioenergy_energy_supply_2, 1, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Liquid oversupply"]));
    setDataPoints (chart_bioenergy_energy_supply_2, 2, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Solid"]));
    setDataPoints (chart_bioenergy_energy_supply_2, 3, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Liquid bioenergy"]));
    setDataPoints (chart_bioenergy_energy_supply_2, 4, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Gas"]));
    setDataPoints (chart_bioenergy_energy_supply_2, 5, roundArrayValues1 (ds["food_and_bioenergy"]["bioenergy supply 2"]["Losses"]));


    // -----------------------------------------------------------------
    // pump  data into the bioenergy demand chart
    // -----------------------------------------------------------------
    // DO NOT DELETE - CURRENTLY DEACTIVATED
/*
    setDataPoints (chart_bioenergy_energy_demand, 0, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Losses"]));
    // setDataPoints (chart_bioenergy_energy_demand, 1, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Oversupply"]));
    setDataPoints (chart_bioenergy_energy_demand, 1, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Transport"]));
    setDataPoints (chart_bioenergy_energy_demand, 2, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Electricity (unabated thermal)"]));
    setDataPoints (chart_bioenergy_energy_demand, 3, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Electricity (carbon capture and storage)"]));
    setDataPoints (chart_bioenergy_energy_demand, 4, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Buildings"]));
    setDataPoints (chart_bioenergy_energy_demand, 5, roundArrayValues (ds["food_and_bioenergy"]["bioenergy demand"]["Manufacturing"]));
*/


    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_bioenergy_energy_supply_1.redraw();
    chart_bioenergy_energy_supply_2.redraw();
    //chart_bioenergy_energy_demand.redraw();


} // end updateBioenergy

/* ******************************************************
 *                                                      *
 * Energy Flows                                         *
 *                                                      *
 ****************************************************** */

function updateEnergyFlows() {

    // -----------------------------------------------------------------
    // pump  data into the energy demand chart
    // -----------------------------------------------------------------

    // NOTE no observed data available from spreadsheet for losses until 2010

    setDataPoints (chart_energy_energy_demand, 0, roundArrayValues1 (ds["energy"]["energy demand"]["Manufacturing"]));
    setDataPoints (chart_energy_energy_demand, 1, roundArrayValues1 (ds["energy"]["energy demand"]["Transport"]));
    setDataPoints (chart_energy_energy_demand, 2, roundArrayValues1 (ds["energy"]["energy demand"]["Residential, public and commercial"]));
    setDataPoints (chart_energy_energy_demand, 3, roundArrayValues1 (ds["energy"]["energy demand"]["Other end uses"]));
    setDataPoints (chart_energy_energy_demand, 4, roundArrayValues1 (ds["energy"]["energy demand"]["Greenhouse gas removal"]));

    // -----------------------------------------------------------------
    // pump  data into the energy supply chart
    // -----------------------------------------------------------------
    setDataPoints (chart_energy_energy_supply, 0, roundArrayValues1 (ds["energy"]["energy supply"]["Global nuclear fission"] ));
    setDataPoints (chart_energy_energy_supply, 1, roundArrayValues1 (ds["energy"]["energy supply"]["Global solar, wind, wave and tidal"] ));
    setDataPoints (chart_energy_energy_supply, 2, roundArrayValues1 (ds["energy"]["energy supply"]["Global heat"] ));
    setDataPoints (chart_energy_energy_supply, 3, roundArrayValues1 (ds["energy"]["energy supply"]["Global geothermal"] ));
    setDataPoints (chart_energy_energy_supply, 4, roundArrayValues1 (ds["energy"]["energy supply"]["Global hydro"] ));
    setDataPoints (chart_energy_energy_supply, 5, roundArrayValues1 (ds["energy"]["energy supply"]["Global bioenergy and waste"] ));
    setDataPoints (chart_energy_energy_supply, 6, roundArrayValues1 (ds["energy"]["energy supply"]["Global coal and peat"] ));
    setDataPoints (chart_energy_energy_supply, 7, roundArrayValues1 (ds["energy"]["energy supply"]["Global oil"] ));
    setDataPoints (chart_energy_energy_supply, 8, roundArrayValues1 (ds["energy"]["energy supply"]["Global gas"] ));





    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    chart_energy_energy_demand.redraw();
    chart_energy_energy_supply.redraw();

} // end updateEnergyFlows


/* ******************************************************
 *                                                      *
 * Fossil Fuels etc.                                    *
 *                                                      *
 ****************************************************** */

var ffChartValues = ["Oil", "Gas", "Coal", "Uranium"];
var ffChartValueIndex = 0; 

function adjustFFCharts (index) {
  ffChartValueIndex = index;
  updateFossilFuels();
}


function updateFossilFuels() {

    var id =  ffChartValues[ffChartValueIndex]; 


    // activate series that are hidden if uranium was selected
    // chart_ff_and_resources_all_1.series[0].show();
    // chart_ff_and_resources_pie_2a.series[0].show();
    // chart_ff_and_resources_pie_3a.series[0].show();


    if (id == "Coal") {

      chart_ff_and_resources_all_1.setTitle({text: translate ('Cumulative consumption: coal')});

      chart_ff_and_resources_all_1.yAxis[0].update({
         title:{
            text: translate ('Gt')
          },
          min: 0,
          max: 500,
          tickInterval: 50
       });
 

      var reserves = new Array();
      reserves[0] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining reserves"]["method 1 EIA"] ];
      reserves[1] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining reserves"]["method 2 GFIGNR"] ];
      reserves[2] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining reserves"]["method 3 WEC"] ];

      reserves[0][1] = reserves[0][1]-reserves[0][0]; // subtract consumption by 2050 from reserves estimate
      reserves[1][1] = reserves[1][1]-reserves[1][0]; // subtract consumption by 2050 from reserves estimate
      reserves[2][1] = reserves[2][1]-reserves[2][0]; // subtract consumption by 2050 from reserves estimate

      if (reserves[0][1]< 0)  reserves[0][1]  = 0;
      if (reserves[1][1]< 0)  reserves[1][1]  = 0;
      if (reserves[2][1]< 0)  reserves[2][1]  = 0;

      var resources = new Array();

      resources[0] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining resources"]["method 1 USGS"] ];
      resources[1] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining resources"]["method 2 WEC"] ];
      resources[2] =   [ ds["ff_resources"]["coal"]["consumption 2050"], ds["ff_resources"]["coal"]["remaining resources"]["method 3"] ];

      resources[0][1] = resources[0][1]-resources[0][0]; // subtract consumption by 2050 from resource estimate
      resources[1][1] = resources[1][1]-resources[1][0]; // subtract consumption by 2050 from resource estimate
      resources[2][1] = resources[2][1]-resources[2][0]; // subtract consumption by 2050 from resource estimate

      if (resources[0][1]< 0)  resources[0][1]  = 0;
      if (resources[1][1]< 0)  resources[1][1]  = 0;
      if (resources[2][1]< 0)  resources[2][1]  = 0;


      // -----------------------------------------------------------------
      // pump  data into the resources chart
      // -----------------------------------------------------------------
      var coal = new Array (ds["ff_resources"]["coal"]["time series"].length); 
      for (var i=0; i<coal.length; i++)
        coal[i] = ds["ff_resources"]["coal"]["time series"][i];
      setDataPoints (chart_ff_and_resources_all_1,  0, roundArrayValues2 ( coal ));
/*
      // handle NO DATA FROM NAMED RANGE
      chart_ff_and_resources_all_1.series[0].hide();
      chart_ff_and_resources_all_1.renderer.text('No data for this',  100, 150).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('chart available',   100, 170).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('in this version !', 100, 190).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
*/
      setDataPoints (chart_ff_and_resources_pie_1b, 0, roundArrayValues2 ( reserves[0] ));
      setDataPoints (chart_ff_and_resources_pie_2b, 0, roundArrayValues2 ( reserves[1] ));
      setDataPoints (chart_ff_and_resources_pie_3b, 0, roundArrayValues2 ( reserves[2] ));

      setDataPoints (chart_ff_and_resources_pie_1a, 0, roundArrayValues2 ( resources[0] ));
      setDataPoints (chart_ff_and_resources_pie_2a, 0, roundArrayValues2 ( resources[1] ));
      setDataPoints (chart_ff_and_resources_pie_3a, 0, roundArrayValues2 ( resources[2] ));

      // -----------------------------------------------------------------
      // update resource estimate source info 
      // -----------------------------------------------------------------
      document.getElementById('ff_study_1b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (EIA)");
      document.getElementById('ff_study_2b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (GFIGNR)");
      document.getElementById('ff_study_3b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (WEC)");

      document.getElementById('ff_study_1a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (USGS)");
      document.getElementById('ff_study_2a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (WEC)");
      document.getElementById('ff_study_3a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3");

    }
    else if (id == "Oil") {

      chart_ff_and_resources_all_1.setTitle({text: translate ('Cumulative consumption: oil')});

      chart_ff_and_resources_all_1.yAxis[0].update({
         title:{
            text: translate ('litres')
          },
          min: 0,
          max:           500000000000000,
          tickInterval:   50000000000000
       });
 
      var reserves = new Array();

      reserves[0] =  [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining reserves"]["method 1 EIA"] ];
      reserves[1] =  [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining reserves"]["method 2 BP"] ];
      reserves[2] =  [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining reserves"]["method 3 OPEC"] ];

      reserves[0][1] = reserves[0][1]-reserves[0][0]; // subtract consumption by 2050 from reserves estimate
      reserves[1][1] = reserves[1][1]-reserves[1][0]; // subtract consumption by 2050 from reserves estimate
      reserves[2][1] = reserves[2][1]-reserves[2][0]; // subtract consumption by 2050 from reserves estimate

      if (reserves[0][1]< 0)  reserves[0][1]  = 0;
      if (reserves[1][1]< 0)  reserves[1][1]  = 0;
      if (reserves[2][1]< 0)  reserves[2][1]  = 0;

      var resources = new Array();

      resources[0] = [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining resources"]["method 1 USGS"] ];
      resources[1] = [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining resources"]["method 2 USGS"] ];
      resources[2] = [ ds["ff_resources"]["oil"]["consumption 2050"], ds["ff_resources"]["oil"]["remaining resources"]["method 3 USGS"] ];

      resources[0][1] = resources[0][1]-resources[0][0]; // subtract consumption by 2050 from resource estimate
      resources[1][1] = resources[1][1]-resources[1][0]; // subtract consumption by 2050 from resource estimate
      resources[2][1] = resources[2][1]-resources[2][0]; // subtract consumption by 2050 from resource estimate

      if (resources[0][1]< 0)  resources[0][1]  = 0;
      if (resources[1][1]< 0)  resources[1][1]  = 0;
      if (resources[2][1]< 0)  resources[2][1]  = 0;


      // -----------------------------------------------------------------
      // update resource estimate source info 
      // -----------------------------------------------------------------
      document.getElementById('ff_study_1b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (EIA)");
      document.getElementById('ff_study_2b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (BP)");
      document.getElementById('ff_study_3b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (OPEC)");

      document.getElementById('ff_study_1a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (USGS 2000 5%)");
      document.getElementById('ff_study_2a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (USGS 2000 Mean)");
      document.getElementById('ff_study_3a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (USGS 2000 95%)");


      // -----------------------------------------------------------------
      // pump  data into the resources chart
      // -----------------------------------------------------------------
      setDataPoints (chart_ff_and_resources_all_1,  0, roundArrayValues2 ( ds["ff_resources"]["oil"]["time series"] ));
/*
      // handle NO DATA FROM NAMED RANGE
      chart_ff_and_resources_all_1.series[0].hide();
      chart_ff_and_resources_all_1.renderer.text('No data for this',  100, 150).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('chart available',   100, 170).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('in this version !', 100, 190).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
*/
      setDataPoints (chart_ff_and_resources_pie_1b, 0, roundArrayValues2 ( reserves[0] ));
      setDataPoints (chart_ff_and_resources_pie_2b, 0, roundArrayValues2 ( reserves[1] ));
      setDataPoints (chart_ff_and_resources_pie_3b, 0, roundArrayValues2 ( reserves[2] ));

      setDataPoints (chart_ff_and_resources_pie_1a, 0, roundArrayValues2 ( resources[0] ));
      setDataPoints (chart_ff_and_resources_pie_2a, 0, roundArrayValues2 ( resources[1] ));
      setDataPoints (chart_ff_and_resources_pie_3a, 0, roundArrayValues2 ( resources[2] ));

    }
    else if (id == "Gas") {

      chart_ff_and_resources_all_1.setTitle({text: translate ('Cumulative consumption: gas')});

      chart_ff_and_resources_all_1.yAxis[0].update({
         title:{
            text: translate ('Tm3')
          },
          min: 0,
          max:           200,
          tickInterval:   20
       });

      var reserves = new Array();

      reserves[0] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining reserves"]["method 1 EIA"] ];
      reserves[1] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining reserves"]["method 2 BP"] ];
      reserves[2] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining reserves"]["method 3"] ];

      reserves[0][1] = reserves[0][1]-reserves[0][0]; // subtract consumption by 2050 from reserves estimate
      reserves[1][1] = reserves[1][1]-reserves[1][0]; // subtract consumption by 2050 from reserves estimate
      reserves[2][1] = reserves[2][1]-reserves[2][0]; // subtract consumption by 2050 from reserves estimate

      if (reserves[0][1]< 0)  reserves[0][1]  = 0;
      if (reserves[1][1]< 0)  reserves[1][1]  = 0;
      if (reserves[2][1]< 0)  reserves[2][1]  = 0;


      var resources = new Array();

      resources[0] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining resources"]["method 1 RWE"] ];
      resources[1] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining resources"]["method 2 Dolcera"] ];
      resources[2] = [ ds["ff_resources"]["gas"]["consumption 2050"], ds["ff_resources"]["gas"]["remaining resources"]["method 3 IEA"] ];

      resources[0][1] = resources[0][1]-resources[0][0]; // subtract consumption by 2050 from resource estimate
      resources[1][1] = resources[1][1]-resources[1][0]; // subtract consumption by 2050 from resource estimate
      resources[2][1] = resources[2][1]-resources[2][0]; // subtract consumption by 2050 from resource estimate

      if (resources[0][1]< 0)  resources[0][1]  = 0;
      if (resources[1][1]< 0)  resources[1][1]  = 0;
      if (resources[2][1]< 0)  resources[2][1]  = 0;


      // -----------------------------------------------------------------
      // update resource estimate source info 
      // -----------------------------------------------------------------
      document.getElementById('ff_study_1b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (EIA)");
      document.getElementById('ff_study_2b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (BP)");
      document.getElementById('ff_study_3b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (EY)");

      document.getElementById('ff_study_1a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (RWE.cz)");
      document.getElementById('ff_study_2a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (Dolcera)");
      document.getElementById('ff_study_3a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (IEA)");

      // -----------------------------------------------------------------
      // pump  data into the resources chart
      // -----------------------------------------------------------------
      setDataPoints (chart_ff_and_resources_all_1,  0, roundArrayValues2 ( ds["ff_resources"]["gas"]["time series"] ));
/*
      // handle NO DATA FROM NAMED RANGE
      chart_ff_and_resources_all_1.series[0].hide();
      chart_ff_and_resources_all_1.renderer.text('No data for this',  100, 150).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('chart available',   100, 170).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
      chart_ff_and_resources_all_1.renderer.text('in this version !', 100, 190).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
*/


      setDataPoints (chart_ff_and_resources_pie_1b, 0, roundArrayValues2 ( reserves[0] ));
      setDataPoints (chart_ff_and_resources_pie_2b, 0, roundArrayValues2 ( reserves[1] ));
      setDataPoints (chart_ff_and_resources_pie_3b, 0, roundArrayValues2 ( reserves[2] ));

      setDataPoints (chart_ff_and_resources_pie_1a, 0, roundArrayValues2 ( resources[0] ));
      setDataPoints (chart_ff_and_resources_pie_2a, 0, roundArrayValues2 ( resources[1] ));
      setDataPoints (chart_ff_and_resources_pie_3a, 0, roundArrayValues2 ( resources[2] ));

    }

    else if (id == "Uranium") {
/*
      chart_ff_and_resources_all_1.setTitle({text: 'Time series for uranium not available'});

      chart_ff_and_resources_all_1.yAxis[0].update({
         title:{
            text: 'GT'
          },
          min: 0,
          max:           200,
          tickInterval:   20
       });
*/
      var reserves = new Array();

      reserves[0] = [ ds["ff_resources"]["uranium"]["consumption 2050"]*1000, ds["ff_resources"]["uranium"]["remaining reserves"]["method 1 NucInfo"]*1000 ];
      reserves[1] = [ ds["ff_resources"]["uranium"]["consumption 2050"]*1000, ds["ff_resources"]["uranium"]["remaining reserves"]["method 2 NucEnviro"]*1000 ];
      reserves[2] = [ ds["ff_resources"]["uranium"]["consumption 2050"]*1000, ds["ff_resources"]["uranium"]["remaining reserves"]["method 3 NucEnviro"]*1000 ];

      reserves[0][1] = reserves[0][1]-reserves[0][0]; // subtract consumption by 2050 from reserves estimate
      reserves[1][1] = reserves[1][1]-reserves[1][0]; // subtract consumption by 2050 from reserves estimate
      reserves[2][1] = reserves[2][1]-reserves[2][0]; // subtract consumption by 2050 from reserves estimate

      if (reserves[0][1]< 0)  reserves[0][1]  = 0;
      if (reserves[1][1]< 0)  reserves[1][1]  = 0;
      if (reserves[2][1]< 0)  reserves[2][1]  = 0;


      var resources = new Array();

      // only one resource method
      resources[0] = [ ds["ff_resources"]["uranium"]["consumption 2050"]*1000, ds["ff_resources"]["uranium"]["remaining resources"]["method 1 NucEnviro"]*1000 ];
      resources[1] = [ null, null ];
      resources[2] = [ null, null ];

      resources[0][1] = resources[0][1]-resources[0][0]; // subtract consumption by 2050 from resource estimate
      // resources[1][1] = resources[1][1]-resources[1][0]; // subtract consumption by 2050 from resource estimate
      // resources[2][1] = resources[2][1]-resources[2][0]; // subtract consumption by 2050 from resource estimate

      if (resources[0][1]< 0)  resources[0][1]  = 0;
      // if (resources[1][1]< 0)  resources[1][1]  = 0;
      // if (resources[2][1]< 0)  resources[2][1]  = 0;


      // -----------------------------------------------------------------
      // update resource estimate source info 
      // -----------------------------------------------------------------
      document.getElementById('uranium_study_1b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (NucInfo)");
      document.getElementById('uranium_study_2b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 2 (NucEnviro)");
      document.getElementById('uranium_study_3b').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 3 (NucEnviro)");

      document.getElementById('uranium_study_1a').innerHTML = translate ("Estimate based on") + "<br>" + translate ("method 1 (NucEnviro)");
      document.getElementById('uranium_study_2a').innerHTML = "";
      document.getElementById('uranium_study_3a').innerHTML = "";

      // -----------------------------------------------------------------
      // no time series available
      // -----------------------------------------------------------------
      // chart_ff_and_resources_all_1.series[0].hide();


      setDataPoints (chart_uranium_pie_1b, 0, roundArrayValues2 ( reserves[0] ));
      setDataPoints (chart_uranium_pie_2b, 0, roundArrayValues2 ( reserves[1] ));
      setDataPoints (chart_uranium_pie_3b, 0, roundArrayValues2 ( reserves[2] ));

      setDataPoints (chart_uranium_pie_1a, 0, roundArrayValues2 ( resources[0] ));
      // setDataPoints (chart_uranium_pie_2a, 0, roundArrayValues2 ( resources[1] ));
      // setDataPoints (chart_uranium_pie_3a, 0, roundArrayValues2 ( resources[2] ));
      chart_uranium_pie_2a.series[0].hide();
      chart_uranium_pie_3a.series[0].hide();

    }
  
    // -----------------------------------------------------
    // refresh charts
    // -----------------------------------------------------
    if (id == "Coal" || id == "Oil" ||  id == "Gas") {
      chart_ff_and_resources_all_1.redraw();
      chart_ff_and_resources_pie_1a.redraw();
      chart_ff_and_resources_pie_2a.redraw();
      chart_ff_and_resources_pie_3a.redraw();
      chart_ff_and_resources_pie_1b.redraw();
      chart_ff_and_resources_pie_2b.redraw();
      chart_ff_and_resources_pie_3b.redraw();
   }
   else if (id == "Uranium") {
     chart_uranium_pie_1a.redraw();
     chart_uranium_pie_2a.redraw();
     chart_uranium_pie_3a.redraw();
     chart_uranium_pie_1b.redraw();
     chart_uranium_pie_2b.redraw();
     chart_uranium_pie_3b.redraw();
   }
 
} // end updateFossilFuels

/* ******************************************************
 *                                                      *
 * Land                                                 *
 *                                                      *
 ****************************************************** */
function scaleLanduseValues (values) {
  return values;
/*
 var xs = new Array (values.length)
 for (var i=0; i<values.length; i++)
   xs[i] = values[i] / 1000000.0;
 return xs;
*/
}



function updateLandYields(footballPitchUnit) {

 // updateLandYieldsTable(footballPitchUnit);

 // alert ("updateLandYields " + footballPitchUnit);

  var unit = "kg";
  if (footballPitchUnit == 1) unit = "kg";
  else                        unit = "kcal";

  var index_2011 = -1;
  var index_2050 = -1;
  var index_unit = -1;
  if (unit == "kg") {
    index_2011 = 0;
    index_2050 = 1;
    index_unit = 2;
  }
  else {
    index_2011 = 3;
    index_2050 = 4;
    index_unit = 5;
  }

  // "2011", "2050", "Unit", "2011a", "2050a", "Unita"

  var fp = ds["food_and_bioenergy"]["webtool_football_pitch"];

 
  var colIndex = index_2011;
  var data_2011 = [ 
    fp["Beef (pasture fed)"][colIndex],
    fp["Beef (fed on grains and residues)"][colIndex],
    fp["Sheep and goat meat (pasture fed)"][colIndex],
    fp["Sheep and goat meat (fed on grains and residues)"][colIndex],
    fp["Poultry"][colIndex],
    fp["Pork"][colIndex],
    fp["Eggs"][colIndex],
    fp["Milk products"][colIndex],
    fp["Cereals and grains"][colIndex],
    fp["Sugars"][colIndex],
    fp["Fruit and vegetables"][colIndex],
    fp["Pulses"][colIndex],
    fp["Vegetable oil"][colIndex] ];
    
  colIndex = index_2050;
  var data_2050 = [ 
    fp["Beef (pasture fed)"][colIndex],
    fp["Beef (fed on grains and residues)"][colIndex],
    fp["Sheep and goat meat (pasture fed)"][colIndex],
    fp["Sheep and goat meat (fed on grains and residues)"][colIndex],
    fp["Poultry"][colIndex],
    fp["Pork"][colIndex],
    fp["Eggs"][colIndex],
    fp["Milk products"][colIndex],
    fp["Cereals and grains"][colIndex],
    fp["Sugars"][colIndex],
    fp["Fruit and vegetables"][colIndex],
    fp["Pulses"][colIndex],
    fp["Vegetable oil"][colIndex] ];


    setDataPoints (chart_land_yields_football_pitch, 0, roundArrayValues ( data_2011 ));
    setDataPoints (chart_land_yields_football_pitch, 1, roundArrayValues ( data_2050 ));

    chart_land_yields_football_pitch.redraw();
}

function updateLandYieldsTable(footballPitchUnit) {

// ----- table ----------------------

  var unit = "kg";
  if (footballPitchUnit == 1) unit = "kg";
  else                        unit = "kcal";

  var index_2011 = -1;
  var index_2050 = -1;
  var index_unit = -1;
  if (unit == "kg") {
    index_2011 = 0;
    index_2050 = 1;
    index_unit = 2;
  }
  else {
    index_2011 = 3;
    index_2050 = 4;
    index_unit = 5;
  }

  // "2011", "2050", "Unit", "2011a", "2050a", "Unita"

  var fp = ds["food_and_bioenergy"]["webtool_football_pitch"];

  var name = "Beef (pasture fed)";
  document.getElementById('yields_beef_pasture_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_beef_pasture_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Beef (fed on grains and residues)";
  document.getElementById('yields_beef_grains_and_residues_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_beef_grains_and_residues_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Sheep and goat meat (pasture fed)";
  document.getElementById('yields_sheep_and_goat_meat_pasture_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_sheep_and_goat_meat_pasture_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Sheep and goat meat (fed on grains and residues)";
  document.getElementById('yields_sheep_and_goat_meat_grains_and_residues_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_sheep_and_goat_meat_grains_and_residues_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Poultry";
  document.getElementById('yields_poultry_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_poultry_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Pork";
  document.getElementById('yields_pork_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_pork_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Eggs";
  document.getElementById('yields_eggs_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_eggs_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Milk products";
  document.getElementById('yields_milk_products_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_milk_products_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Cereals and grains";
  document.getElementById('yields_cereals_and_grains_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_cereals_and_grains_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Sugars";
  document.getElementById('yields_sugars_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_sugars_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Fruit and vegetables";
  document.getElementById('yields_fruit_and_vegetables_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_fruit_and_vegetables_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Pulses";
  document.getElementById('yields_pulses_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_pulses_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Vegetable oil";
  document.getElementById('yields_vegetable_oil_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2011]) + " " + fp[name][index_unit] + "</font>";
  document.getElementById('yields_vegetable_oil_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][index_2050]) + " " + fp[name][index_unit] + "</font>";

  name = "Bioenergy";
  document.getElementById('yields_bioenergy_2011').innerHTML = "<font color='orange'>" + Math.round (fp[name][0]) + " " + fp[name][2] + "</font>"; // special case: always kwh
  document.getElementById('yields_bioenergy_2050').innerHTML = "<font color='orange'>" + Math.round (fp[name][1]) + " " + fp[name][2] + "</font>"; // special case: always kwh

}

function updateLandGrainFedCharts() {

  var gm = ds["food_and_bioenergy"]["webtool_grainfed_meat"];
  var d_2011 = [ gm["Beef"][0]*100, gm["Sheep and Goats"][0]*100, gm["Pigs"][0]*100, gm["Poutlry"][0]*100 ];
  var d_2050 = [ gm["Beef"][1]*100, gm["Sheep and Goats"][1]*100, gm["Pigs"][1]*100, gm["Poutlry"][1]*100 ];

  setDataPoints (chart_land_yields_grain_fed , 0, d_2011);
  setDataPoints (chart_land_yields_grain_fed , 1, d_2050);

  // -----------------------------------------------------
  // refresh chart
  // -----------------------------------------------------
  chart_land_yields_grain_fed.redraw();

}



function updateLand() {
/*
   setDataPoints (chart_land_overview, 0, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Desert, ice etc"])));
   setDataPoints (chart_land_overview, 1, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Settlements and infrastructure"])));
   setDataPoints (chart_land_overview, 2, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Natural grassland"])));
   setDataPoints (chart_land_overview, 3, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for bioenergy"])));
   setDataPoints (chart_land_overview, 4, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Commercial forest"])));
   setDataPoints (chart_land_overview, 5, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Native forest"])));
   setDataPoints (chart_land_overview, 6, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for non-food crops"])));
   setDataPoints (chart_land_overview, 7, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for food crops"])));
   setDataPoints (chart_land_overview, 8, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for animals"])));
*/

   setDataPoints (chart_land_overview, 0, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Desert, ice etc"])));
   setDataPoints (chart_land_overview, 1, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Settlements and infrastructure"])));
   setDataPoints (chart_land_overview, 2, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Natural grassland"])));
   setDataPoints (chart_land_overview, 3, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for energy crops"])));
   setDataPoints (chart_land_overview, 4, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Commercial forest"])));
   setDataPoints (chart_land_overview, 5, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Forest"])));
   setDataPoints (chart_land_overview, 6, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for non-food crops"])));
   setDataPoints (chart_land_overview, 7, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for food crops"])));
   setDataPoints (chart_land_overview, 8, roundArrayValues (scaleLanduseValues (ds["land_use"]["land use projected"]["Land for animals"])));

    // -----------------------------------------------------
    // refresh chart
    // -----------------------------------------------------
    chart_land_overview.redraw();
} // end updateLand


function setSupertableField (fieldSuffix, fieldID, str) {
  document.getElementById(fieldID + ' ' +  fieldSuffix).innerHTML   = "<font color='orange'>" + str + "</font>";
}


function updateSupertableField4String (data, dataIndex, fieldSuffix, fieldID, dataID) {

  try {
    document.getElementById(fieldID + ' label').innerHTML   = "<font color='white'>" + translate(dataID) + "</white>";
    document.getElementById(fieldID + ' ' +  fieldSuffix).innerHTML   = "<font color='orange'>" + data[dataID][dataIndex] + "</font>";
  }
  catch (e) {
    document.getElementById(fieldID + ' ' +  fieldSuffix).innerHTML   = "<font color='red'>" + "NOT FOUND!" + "</font>";
  }
}

function updateSupertableField (data, dataIndex, fieldSuffix, fieldID, dataID) {

  try {
    document.getElementById(fieldID + ' label').innerHTML   = "<font color='white'>" + translate(dataID) + "</white>";
    document.getElementById(fieldID + ' ' +  fieldSuffix).innerHTML   = "<font color='orange'>" + data[dataID][dataIndex] + "</font>";
  }
  catch (e) {
    document.getElementById(fieldID + ' ' +  fieldSuffix).innerHTML   = "<font color='red'>" + "NOT FOUND!" + "</font>";
  }
}


function updateSupertable () {

  var data = ds["supertable"]["supertable"];

  updateSupertableColumn (data, "2011",   0);
  updateSupertableColumn (data, "userpw", 1);



}
function updateSupertableColumn (data, suffix, dataIndex) {


  updateSupertableField (data, dataIndex, suffix, 'st emissions per capita', 		"GHG emissions (t CO2e) per capita");
  if (dataIndex == 1) {
    updateSupertableField (data, dataIndex, suffix, 'st cumulative emissions by 2100', 	"Cumulative emissions by 2100 (Gt CO2e)");
    updateSupertableField4String (data, dataIndex, suffix, 'st temperature change 2100',"Temperature change in 2100 (⁰C)");
  }
  updateSupertableField (data, dataIndex, suffix, 'st population', 			"Population (billions of people)");
  updateSupertableField (data, dataIndex, suffix, 'st population in urban areas', 	"% population in urban areas");

  updateSupertableField (data, dataIndex, suffix, 'st total energy supply', 		"Total energy supply (EJ / year)");
  updateSupertableField (data, dataIndex, suffix, 'st total energy demand', 		"Total energy demand (EJ / year)");
  updateSupertableField (data, dataIndex, suffix, 'st energy demand per capita', 	"Energy demand (kWh / capita / year)");
  updateSupertableField (data, dataIndex, suffix, 'st primary energy from fossil fuels',"Proportion of primary energy from fossil fuels");
  updateSupertableField (data, dataIndex, suffix, 'st bioenergy supply', 		"Bioenergy supply (EJ / year)");
  updateSupertableField4String (data, dataIndex, suffix, 'st oil reserves', 		"% of oil reserves (as of 2011) left in the ground");
  updateSupertableField4String (data, dataIndex, suffix, 'st gas reserves', 		"% of gas reserves (as of 2011) left in the ground");
  updateSupertableField4String (data, dataIndex, suffix, 'st coal reserves', 		"% of coal reserves (as of 2011) left in the ground");

  updateSupertableField (data, dataIndex, suffix, 'st electricity demand per capita',	"Electricity demand (kWh / capita /year)");
  updateSupertableField (data, dataIndex, suffix, 'st wind capacity', 			"Wind capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st solar capacity', 			"Solar capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st nuclear capacity', 		"Nuclear capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st hydro-electric capacity', 	"Hydro-electric capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st css for power', 			"CCS for power (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st unabated fossil fuel capacity', 	"Unabated fossil fuel capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st storage capacity', 		"Storage capacity (GW)"); 
  updateSupertableField (data, dataIndex, suffix, 'st efficiency unabated fossil fuel', "Efficiency of unabated fossil fuel power generation"); 

  if (dataIndex==0)  updateSupertableField4String (data, dataIndex, suffix, 'st efficiency css fossil fuel', 	"Efficiency of CCS fossil fuel power generation"); 
  else               updateSupertableField        (data, dataIndex, suffix, 'st efficiency css fossil fuel', 	"Efficiency of CCS fossil fuel power generation"); 
  updateSupertableField (data, dataIndex, suffix, 'st emissions intensity', "Emissions intensity (global average g CO2e / kWh)"); 



  updateSupertableField (data, dataIndex, suffix, 'st number of passenger vehicles', 	"Number of passenger vehicles on the road (thousands)"); 
  updateSupertableField (data, dataIndex, suffix, 'st distance travelled by air', 	"Distance travelled per person by air (global average)"); 
  updateSupertableField (data, dataIndex, suffix, 'st zero emission vehicles', 		"% urban cars that are zero emission (electric/hydrogen)"); 
  updateSupertableField (data, dataIndex, suffix, 'st efficiency of ice car', 	"Efficiency of average global car (litres gasoline equivalent per 100km)"); 
  updateSupertableField (data, dataIndex, suffix, 'st vehicle km travelled', 		"Total domestic passenger km travelled each year per capita (including walking, cycles, motorcycles, cars and public transport, but not international/plane travel)"); 
  updateSupertableField (data, dataIndex, suffix, 'st vehicle km travelled plus int', 	"Total passenger km travelled each year per capita (includes domestic, international and plane travel)"); 
  updateSupertableField (data, dataIndex, suffix, 'st passenger km travelled', 		"% of passenger km travelled using cars (out of total domestic&international km travelled)");
  updateSupertableField (data, dataIndex, suffix, 'st freight tonne domestic', 		"Domestic freight (Tonne km / capita / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st freight tonne international', 	"International freight (Tonne km / capita / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st air freight', 			"Proportion of international freight by air"); 

  updateSupertableField (data, dataIndex, suffix, 'st appliances per household', 	"Number of appliances per household"); 
  updateSupertableField (data, dataIndex, suffix, 'st washing machines per household', 	"Number of washing machines in an average urban household"); 
  updateSupertableField (data, dataIndex, suffix, 'st appliance efficiency', 		"Refrigerator average power (W) in urban areas"); 
  updateSupertableField (data, dataIndex, suffix, 'st building temp warm months', 	"Building temperature in warm months (⁰C)"); 
  updateSupertableField (data, dataIndex, suffix, 'st building temp cold months', 	"Building temperature in cold months (⁰C)"); 
  updateSupertableField (data, dataIndex, suffix, 'st building insulation', 		"Home/building insulation  (rate of heat loss in GW / M ha*℃)");
  updateSupertableField (data, dataIndex, suffix, 'st urban households using zero-carbon space heating', 	"% urban heating provided from zero carbon technologies (solar, heat pumps) or electric for heating");
  updateSupertableField (data, dataIndex, suffix, 'st households access to electricity', 			"Global % of households that have access to electricity");


  updateSupertableField (data, dataIndex, suffix, 'st iron steel aluminium output', 	"Iron, steel and aluminium output (Gt / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st paper and other output', 		"Paper and other output (Gt / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st chemicals output', 		"Chemicals output (Gt / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st cement output', 			"Cement output (Gt / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st timber output', 			"Timber output (Gt / year)"); 
  updateSupertableField (data, dataIndex, suffix, 'st steel decrease energy demand', 		"Global Oxygen steel technology (% decrease in energy demand from 2011)"); 
  updateSupertableField (data, dataIndex, suffix, 'st paper decrease energy demand', 		"Global Pulp & paper: Pulp technology (% decrease in energy demand from 2011)"); 
  updateSupertableField (data, dataIndex, suffix, 'st chemicals decrease energy demand',	"Global Chemicals: High Value Chemicals  technology (% decrease in energy demand from 2011)"); 
  updateSupertableField (data, dataIndex, suffix, 'st cement decrease energy demand', 		"Global Cement technology (% decrease in energy demand from 2011)"); 


  updateSupertableField (data, dataIndex, suffix, 'st manufacturing emissions captured css', "% of manufacturing emissions captured by CCS"); 
  updateSupertableField (data, dataIndex, suffix, 'st consumer packaging demand', 	"Demand for consumer packaging (% of 2011 tonne demand)"); 
  updateSupertableField (data, dataIndex, suffix, 'st electrical equipment demand', 	"Demand for electrical equipment (% of 2011 tonne demand)"); 
  updateSupertableField (data, dataIndex, suffix, 'st lifespan of products', 		"Lifespan of refrigerator (years) in urban areas");

  updateSupertableField (data, dataIndex, suffix, 'st crop yields', 			"Crop yield growth from 2011"); 
  updateSupertableField (data, dataIndex, suffix, 'st cows per hectar', 		"Average number of cows per hectare (pasture fed only)"); 
  updateSupertableField (data, dataIndex, suffix, 'st cows fed from gains', 		"Proportion of cows fed from gains/residues and farmed in confined systems");
//  updateSupertableField (data, dataIndex, suffix, 'st animal yields', 			"Increase in non-intensive animal yields (animals per area)"); 
//  updateSupertableField (data, dataIndex, suffix, 'st intensification beef production', "Intensification of beef production"); 
//  updateSupertableField (data, dataIndex, suffix, 'st intensification animals', 	"Intensification of animals (feedlot systems)"); 
  updateSupertableField (data, dataIndex, suffix, 'st productive land for bioenergy', 		"Bioenergy area (millions of hectares)."); 
//  updateSupertableField (data, dataIndex, suffix, 'st productive land for food', 		"% of productive land used for food (livestock and food crops)"); 
  updateSupertableField (data, dataIndex, suffix, 'st productive land for forest', 	"Forest area (native and commercial, millions of hectares"); 
//  updateSupertableField (data, dataIndex, suffix, 'st productive land for native forest', 	"% of productive land used for native forest"); 



  updateSupertableField (data, dataIndex, suffix, 'st calories consumed', 		"Calories consumed per head (kcal / person / day)"); 
  updateSupertableField (data, dataIndex, suffix, 'st calories from meat', 		"Calories from meat (kcal / person / day)"); 
 
/*
  if (dataIndex==1) {
    updateSupertableField (data, dataIndex, suffix, 'st costs point'	,	"Cost in 2050 - point estimate ($tn)"); 
    updateSupertableField (data, dataIndex, suffix, 'st costs high',		"Cost in 2050 - high estimate ($tn)"); 
    updateSupertableField (data, dataIndex, suffix, 'st costs low', 		"Cost in 2050 - low estimate ($tn)"); 
    updateSupertableField (data, dataIndex, suffix, 'st fuel costs', 		"Fuel costs as % of total costs"); 
    updateSupertableField (data, dataIndex, suffix, 'st fuel tax', 			"Tax levied by fossil fuel exporters in 2050 ($tn)"); 
  }
*/
  updateSupertableField (data, dataIndex, suffix, 'st emissions saved ghg', 		"Emissions saved by speculative GHG removal technologies (Gt CO2e / year)");


}





function initSupertable () {
  for (var i=0; i<=6; i++) {
    setSupertableField ('cfp-' + i, 'st emissions per capita', 	"...");
    setSupertableField ('cfp-' + i, 'st cumulative emissions by 2100', 	"...");
    setSupertableField ('cfp-' + i, 'st temperature change 2100', 	"...");
    setSupertableField ('cfp-' + i, 'st population', 	"...");
    setSupertableField ('cfp-' + i, 'st population in urban areas', 	"...");
    setSupertableField ('cfp-' + i, 'st total energy supply', 	"...");
    setSupertableField ('cfp-' + i, 'st total energy demand', 	"...");
    setSupertableField ('cfp-' + i, 'st energy demand per capita', 	"...");
    setSupertableField ('cfp-' + i, 'st primary energy from fossil fuels', 	"...");
    setSupertableField ('cfp-' + i, 'st bioenergy supply', 	"...");
    setSupertableField ('cfp-' + i, 'st oil reserves', 	"...");
    setSupertableField ('cfp-' + i, 'st gas reserves', 	"...");
    setSupertableField ('cfp-' + i, 'st coal reserves', 	"...");
    setSupertableField ('cfp-' + i, 'st electricity demand per capita', 	"...");
    setSupertableField ('cfp-' + i, 'st wind capacity', 	"...");
    setSupertableField ('cfp-' + i, 'st solar capacity', 	"...");
    setSupertableField ('cfp-' + i, 'st nuclear capacity', 	"...");
    setSupertableField ('cfp-' + i, 'st hydro-electric capacity', 	"...");
    setSupertableField ('cfp-' + i, 'st css for power', 		"...");
    setSupertableField ('cfp-' + i, 'st unabated fossil fuel capacity', "...");
    setSupertableField ('cfp-' + i, 'st storage capacity', 		"...");
    setSupertableField ('cfp-' + i, 'st efficiency unabated fossil fuel',	"...");
    setSupertableField ('cfp-' + i, 'st efficiency css fossil fuel', 	"...");
    setSupertableField ('cfp-' + i, 'st emissions intensity', 		"...");
    setSupertableField ('cfp-' + i, 'st number of passenger vehicles', 	"...");
    setSupertableField ('cfp-' + i, 'st distance travelled by air', 	"...");
    setSupertableField ('cfp-' + i, 'st zero emission vehicles', 	"...");
    setSupertableField ('cfp-' + i, 'st efficiency of ice car', 	"...");
    setSupertableField ('cfp-' + i, 'st vehicle km travelled', 		"...");
    setSupertableField ('cfp-' + i, 'st vehicle km travelled plus int', "...");
    setSupertableField ('cfp-' + i, 'st passenger km travelled', 	"...");
    setSupertableField ('cfp-' + i, 'st freight tonne domestic', 	"...");
    setSupertableField ('cfp-' + i, 'st freight tonne international', 	"...");
    setSupertableField ('cfp-' + i, 'st air freight', 			"...");

    setSupertableField ('cfp-' + i, 'st appliances per household', 	"...");
    setSupertableField ('cfp-' + i, 'st washing machines per household', 	"...");
    setSupertableField ('cfp-' + i, 'st appliance efficiency', 		"...");
    setSupertableField ('cfp-' + i, 'st building temp warm months', 	"...");
    setSupertableField ('cfp-' + i, 'st building temp cold months', 	"...");
    setSupertableField ('cfp-' + i, 'st building insulation', 		"...");
    setSupertableField ('cfp-' + i, 'st urban households using zero-carbon space heating', 	"...");
    setSupertableField ('cfp-' + i, 'st households access to electricity', 	"...");

    setSupertableField ('cfp-' + i, 'st iron steel aluminium output', 	"...");
    setSupertableField ('cfp-' + i, 'st paper and other output', 	"...");
    setSupertableField ('cfp-' + i, 'st chemicals output', 	"...");
    setSupertableField ('cfp-' + i, 'st cement output', 	"...");
    setSupertableField ('cfp-' + i, 'st timber output', 	"...");
    setSupertableField ('cfp-' + i, 'st steel decrease energy demand', 	"...");
    setSupertableField ('cfp-' + i, 'st paper decrease energy demand', 	"...");
    setSupertableField ('cfp-' + i, 'st chemicals decrease energy demand', 	"...");
    setSupertableField ('cfp-' + i, 'st cement decrease energy demand', 	"...");

    setSupertableField ('cfp-' + i, 'st manufacturing emissions captured css', 	"...");
    setSupertableField ('cfp-' + i, 'st consumer packaging demand', 	"...");
    setSupertableField ('cfp-' + i, 'st electrical equipment demand', 	"...");
    setSupertableField ('cfp-' + i, 'st lifespan of products', 	"...");

    setSupertableField ('cfp-' + i, 'st crop yields', 				"...");
    setSupertableField ('cfp-' + i, 'st cows per hectar', 			"...");
    setSupertableField ('cfp-' + i, 'st cows fed from gains', 			"...");
    setSupertableField ('cfp-' + i, 'st productive land for bioenergy', 	"...");
    setSupertableField ('cfp-' + i, 'st productive land for forest', "...");

    setSupertableField ('cfp-' + i, 'st calories consumed', 			"...");
    setSupertableField ('cfp-' + i, 'st calories from meat', 			"...");
    setSupertableField ('cfp-' + i, 'st efficiency css fossil fuel', 		"...");
/*
    setSupertableField ('cfp-' + i, 'st costs point', 	"...");
    setSupertableField ('cfp-' + i, 'st costs high', 	"...");
    setSupertableField ('cfp-' + i, 'st costs low', 	"...");
    setSupertableField ('cfp-' + i, 'st fuel costs', 	"...");
    setSupertableField ('cfp-' + i, 'st fuel tax', 	"...");
*/
    setSupertableField ('cfp-' + i, 'st emissions saved ghg', 	"...");
  }

}

function updateSupertablePathway (cfpIndex, colIndex) {

  var pwCode = getPathwayCode (cfpIndex);

  var url = DATA_SERVICE + pwCode; 

  // -----------------------------------------------------
  // send params to server and fetch the model output
  // -----------------------------------------------------
  $.getJSON(url, function(data) {

     var stData = data[0]["supertable"]["supertable"];
   
     document.getElementById('st cfp-name-' + colIndex).innerHTML = translate(cfps[cfpIndex]["name"]);
     updateSupertableColumn (stData, 'cfp-' + colIndex, 1);


  }); // end $.getJSON()

} // end updateSupertablePathway



function hasLandUseWarning() {
  return (ds["warning_messages"]["land_use"].indexOf("No warning") != 0);
}


function updateWarnings () {

 var hasWarnings = false; 


 var climateInfos = "";

 if (ds["warning_messages"]["beyond_ipcc_assessment"].toUpperCase().indexOf("NO WARNING") != 0)    
   climateInfos += translate (ds["warning_messages"]["beyond_ipcc_assessment"]) + "<br><br>";
 if (ds["warning_messages"]["50_percent_chance_warming"].toUpperCase().indexOf("NO WARNING") != 0) 
    climateInfos += translate (ds["warning_messages"]["50_percent_chance_warming"]) + "<br><br>";
 if (ds["warning_messages"]["co2_concentrations"].toUpperCase().indexOf("NO WARNING") != 0) 	   
   climateInfos += translate (ds["warning_messages"]["co2_concentrations"]) + "<br><br>";
 if (ds["warning_messages"]["crop_yields_and_warming"].toUpperCase().indexOf("NO WARNING") != 0)   
   climateInfos += translate (ds["warning_messages"]["crop_yields_and_warming"]) + "<br><br>";

 if (climateInfos.length > 0) {
   climateInfos = climateInfos.substring (0, climateInfos.length-8);
   document.getElementById('warning-icon-climate').src="imgs/icons/climate-enabled.gif"
   document.getElementById("warnings-climate").innerHTML = "<font color='red'>" + climateInfos + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-climate').src="imgs/icons/climate-disabled.gif"
   document.getElementById('warnings-climate').innerHTML = translate ("Your current pathway has no warnings for climate");
 }


 if (ds["warning_messages"]["electricity_oversupply"].indexOf("No warning") != 0) {
   document.getElementById('warning-icon-electricity').src="imgs/icons/electricity-enabled.gif"
   document.getElementById("warnings-electricity").innerHTML = "<font color='red'>" + translate (ds["warning_messages"]["electricity_oversupply"]) + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-electricity').src="imgs/icons/electricity-disabled.gif"
   document.getElementById('warnings-electricity').innerHTML = translate ("Your current pathway has no warnings for electricity");
 }


 var energySecInfos = "";

 if (ds["warning_messages"]["fossil_fuel_proportion"].indexOf("No warning") != 0) energySecInfos += translate (ds["warning_messages"]["fossil_fuel_proportion"]) + "<br><br>";
 if (ds["warning_messages"]["bio_oversupply"].indexOf("No warning") != 0)	  energySecInfos += translate (ds["warning_messages"]["bio_oversupply"]) + "<br><br>";
 
 if (energySecInfos.length > 0) {
   energySecInfos = energySecInfos.substring (0, energySecInfos.length-8);
   document.getElementById('warning-icon-energy-security').src="imgs/icons/energy-security-enabled.gif"
   document.getElementById("warnings-energy-security").innerHTML = "<font color='red'>" + energySecInfos + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-energy-security').src="imgs/icons/energy-security-disabled.gif"
   document.getElementById('warnings-energy-security').innerHTML = translate ("Your current pathway has no warnings for energy security");
 }

 if (ds["warning_messages"]["ggr"].indexOf("No warning") != 0) {
   document.getElementById('warning-icon-tech-dev').src="imgs/icons/tech-enabled.gif"
   document.getElementById("warnings-tech-dev").innerHTML = "<font color='red'>" + translate (ds["warning_messages"]["ggr"]) + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-tech-dev').src="imgs/icons/tech-disabled.gif"
   document.getElementById('warnings-tech-dev').innerHTML = translate ("Your current pathway has no warnings for technological development");
 }

 if (ds["warning_messages"]["level4"].indexOf("No warning") != 0) {

   // var msg = translate (ds["warning_messages"]["level4"]);
   document.getElementById('warning-icon-abatement-efforts').src="imgs/icons/4-enabled.gif"
   document.getElementById("warnings-abatement-efforts").innerHTML = "<font color='red'>" + translate (ds["warning_messages"]["level4"]) + "</font>";

   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-abatement-efforts').src="imgs/icons/4-disabled.gif"
   document.getElementById('warnings-abatement-efforts').innerHTML = translate ("Your current pathway has no warnings for level 4 abatement efforts");
 }

 var resourceInfos = "";

 if (ds["warning_messages"]["coal_reserves"].indexOf("No warning") != 0)    resourceInfos += translate (ds["warning_messages"]["coal_reserves"]) + "<br><br>";
 if (ds["warning_messages"]["oil_reserves"].indexOf("No warning")  != 0)    resourceInfos += translate (ds["warning_messages"]["oil_reserves"]) + "<br><br>";
 if (ds["warning_messages"]["gas_reserves"].indexOf("No warning")     != 0) resourceInfos += translate (ds["warning_messages"]["gas_reserves"]) + "<br><br>";
 if (ds["warning_messages"]["uranium_reserves"].indexOf("No warning") != 0) resourceInfos += translate (ds["warning_messages"]["uranium_reserves"]) + "<br><br>";
 
 if (resourceInfos.length > 0) {
   resourceInfos = resourceInfos.substring (0, resourceInfos.length-8);
   document.getElementById('warning-icon-resources').src="imgs/icons/resources-enabled.gif"
   document.getElementById("warnings-resources").innerHTML = "<font color='red'>" + resourceInfos + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-resources').src="imgs/icons/resources-disabled.gif"
   document.getElementById('warnings-resources').innerHTML = translate ("Your current pathway has no warnings for resources");
 }


 var landUseInfos = "";

 if (ds["warning_messages"]["forest"].indexOf("No warning") != 0)   landUseInfos += translate (ds["warning_messages"]["forest"]) + "<br><br>";
 if (ds["warning_messages"]["land_use"].indexOf("No warning") != 0) landUseInfos += translate (ds["warning_messages"]["land_use"]) + "<br><br>";
 
 if (landUseInfos.length > 0) {
   landUseInfos = landUseInfos.substring (0, landUseInfos.length-8);
   document.getElementById('warning-icon-land-use').src="imgs/icons/land-use-enabled.gif"
   document.getElementById("warnings-land-use").innerHTML = "<font color='red'>" + landUseInfos + "</font>";
   hasWarnings = true;
 }
 else {
   document.getElementById('warning-icon-land-use').src="imgs/icons/land-use-disabled.gif"
   document.getElementById('warnings-land-use').innerHTML = translate ("Your current pathway has no warnings for land use");
 }


 if (hasWarnings) document.getElementById('warnings-header').innerHTML = "<font color='#ff0000'>&nbsp;&nbsp;" + translate ("Warnings") + "&nbsp;&nbsp;</font>"
 else             document.getElementById('warnings-header').innerHTML = "<font color='#737373'>&nbsp;&nbsp;" + translate ("Warnings") + "&nbsp;&nbsp;</font>"



/*
:warning_messages=>{
"50_percent_chance_warming"=>"WARNING: Cumulative CO2 emissions by 2100 exceed 3010 GtCO2, the amount associated with a 50% chance of keeping global mean temperature increase below 2C by 2100.  Reduce emissions by increasing effort across more levers.", 
"bio_oversupply"=>"No warning on bio crop oversupply ", 
"electricity_oversupply"=>"No warning on electricity oversupply", 
"coal_reserves"=>"No warning on coal consumption", 
"forest"=>"No warning on forest area change", 
"fossil_fuel_proportion"=>"WARNING - your pathway increases the dependence on fossil fuels from 2011 to 2050. A greater dependence of on fossil fuels in the global primary energy supply mix could mean greater import dependence for some countries and greater exposure to possibly volatile fossil fuel prices.  Click on energy tab to view fossil fuel dependence.", 
"gas_reserves"=>"No warning on gas consumption", 
"ggr"=>"No warning on GGR", 
"land_use"=>"No warning on land use", 
"level4"=>"No warning on level 4s", 
"oil_reserves"=>"No warning on oil consumption"},
*/

} // end updateWarnings



