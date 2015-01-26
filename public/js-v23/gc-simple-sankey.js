/* *********************************************************
 *
 * Author: Markus Wrobel 2014 
 *
 * *********************************************************
 */

var sankey;

function createSankey() {

    sankey = new Sankey();

    // -------------------------------------------------------------
    // adjust size
    // -------------------------------------------------------------
    sankey.convert_flow_values_callback = function(flow) {
        return flow * 0.18; // Pixels per TWh
    };

    // -------------------------------------------------------------
    // adjust value display 
    // -------------------------------------------------------------
    sankey.convert_flow_labels_callback = function(flow) {
        return Math.round(flow);	
    };

    sankey.convert_box_value_labels_callback = function(flow) {
        return ("" + Math.round(flow));
    };


    // -------------------------------------------------------------
    // define nodes
    // -------------------------------------------------------------
    sankey.stack(0, ["Solar", "Wind", "Marine", "Geothermal", "Hydro", "Nuclear", "Coal reserves", "Oil reserves", "Gas reserves", "Biomass and waste"]);
    sankey.stack(1, ["Solid", "Liquid", "Gas"], "Coal reserves");
    sankey.stack(2, ["Power plants"], "Solid");
    sankey.stack(3, ["Electricity grid", "Heat network"]);
    sankey.stack(4, ["Hydrogen"], "Electricity grid");
    sankey.stack(5, ["Buildings", "Manufacturing", "Transport", "Other", "GGR", "Losses / own use"]);


    // -------------------------------------------------------------
    // define colors
    // -------------------------------------------------------------
    sankey.setColors({
        "Electricity grid": '#fccde5', 

        "Coal reserves":"#fee08b",
        "Solid":"#fee08b",

        "Gas reserves" : "#3288bd",
        "Gas": "#3288bd",

        "Oil reserves": "#66c2a5",
        "Liquid": "#66c2a5",

        "Nuclear": "#d53e4f",

        "Biomass and waste": "#abdda4",

        "Solar": "#f46d43",
        "Wind": "#f46d43",
        "Marine": "#f46d43",

        "Heat network":"#d53e4f"
      });

    // -------------------------------------------------------------
    // Fix some of the colours
    // -------------------------------------------------------------
    sankey.nudge_colours_callback = function() {
       this.recolour(this.boxes["Losses / own use"].left_lines,"#aaa");
    };

      sankey.y_space = 11;
      sankey.right_margin = 100;
      sankey.left_margin = 100; //150;



    // -------------------------------------------------------------
    // Fix node position
    // -------------------------------------------------------------
    sankey.nudge_boxes_callback = function() {
      this.boxes["Losses / own use"].y = this.boxes["Biomass and waste"].b() - this.boxes["Losses / own use"].size()
      this.boxes["Biomass and waste"].y = this.boxes["Losses / own use"].b() - this.boxes["Biomass and waste"].size()
    };


    updateSankey();




} // end createSankey()


function updateSankey() {


    sankey.updateData( prepareSankeyValues (ds["sankey_simple"]) );
    sankey.redraw();

} // end createSankey()




// -----------------------------------------------------
// fix some wrong label names from model output 
// -----------------------------------------------------
function prepareSankeyValues (dataset) {


  for (var i=0; i<dataset.length; i++) {
    dataset[i][1] = Math.round (dataset[i][1]);


    if (dataset[i][0] == "Electricity") dataset[i][0] =  "Electricity grid";
    if (dataset[i][2] == "Electricity") dataset[i][2] =  "Electricity grid";

    if (dataset[i][2] == "Greenhouse gas removal") dataset[i][2] =  "GGR";

  }
 return dataset;
}




