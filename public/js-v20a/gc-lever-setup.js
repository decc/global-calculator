// -------------------------------------------------------------------------------
// lever information
// -------------------------------------------------------------------------------
var NUM_MASTER_LEVERS 	= 15;
var NUM_LEVERS        	= 59; // = 51 user controllable levers + 1 region cost factor + 7 fuel cost; 
var NUM_CTRLABLE_LEVERS = 51; // = 51 user controllable levers (--> 1 region cost factor + 7 fuel cost levers not yet active in this version)

// -------------------------------------------------------------------------------
// store current status of all levers
// storage index = lever index (= url param string index, starting with 1)-1
// -------------------------------------------------------------------------------
var indices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0]; // 51 + 1 + 7 = 59 levers in this version


// -------------------------------------------------------------------------------
// store current status of all master levers
// -------------------------------------------------------------------------------
var master_indices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0]; // 14 master levers in this version


// --------------------------------------------------------------------
// master lever setup (lever names + lever ids) 
// lever id denotes position in url param str, starting with 1
// --------------------------------------------------------------------
var dl_demographics = [ ["Global population", 	1],
			["Urbanisation", 	2]];

var lifestyle_transport = [ ["Passenger distance", 	3],
			    ["Freight distance",  	4],
			    ["Mode", 		 	5],
			    ["Occupancy & load", 	6],
                            ["Car own or hire", 	7]];

var technology_transport = [ 
                             ["Transport efficiency", 	8],
                             ["Electric & hydrogen", 	9]];

var lifestyle_buildings = [ ["Building size", 			10],
			    ["Temperature & hot water use",  	11],
			    ["Lighting & appliance use", 	12],
	                    ["Product lifespan & demand", 	16]];

var technology_buildings = [ ["Building insulation", 			13],
			     ["Temperature and cooking technology",	14],
			     ["Appliance efficiency", 			15]];

var technology_manufacturing = [ ["Design, materials & recycling", 	17],
				 ["Iron, steel & aluminium", 		18],
				 ["Chemicals", 				19],
				 ["Paper & other",			20],
				 ["Cement", 				21]];

var technology_ccs = [  ["CCS (manufacturing)", 22],
			["CCS (electricity)", 	25]];

var technology_fossilfuels = [ ["Coal / oil / gas", 	23],
			       ["Fossil fuel efficiency", 		24]];

var technology_nuclear = [ ["Nuclear", 26]];

var technology_renewables = [ 	["Wind", 			27],
				["Hydroelectric", 		28],
				["Marine", 			29],
				["Solar", 			30],
				["Geothermal", 			31],
				["Storage & demand shifting", 	32]];

var lifestyle_food = [ 	["Calories consumed",	33],
			["Quantity of meat",	34],
                        ["Type of meat",	35]];

var land_foodyields = [	["Crop yields",				36],
			["Livestock (grains/residues fed)",	38],
			["Livestock (pasture fed)",		39],
			["Wastes & residues",			48]];

var technology_bioenergy = [ ["Bioenergy yields", 	40],
		  	     ["Solid or liquid", 	41]];


var land_landuse = [ 	["Surplus land (forest & bioenergy)", 	42],
			["Land-use efficiency",			37]];

// note: ggr section levers do not have a master lever:
var ggr = [ 	["Biochar", 				43],
		["Direct air capture", 			44],
		["Ocean fertilisation", 		45],
		["Enhanced weathering (oceanic)", 	46],
		["Enhanced weathering (terrestrial)", 	47]];

var dl_emissions = [ ["Emissions trajectory", 	49]];

// note: climate section levers do not have a master lever:
var cl_basic_physics     = [ ["Atmospheric CO2 fraction", 	50]];
var cl_model_uncertainty = [ ["Confidence in climate models", 	51]];




function getGGRName (leverID) {
  for(var i=0; i<ggr.length; i++) 
    if (ggr[i][1] == leverID) return ggr[i][0];
  return "INVALID-GGR-ID";
}


// -----------------------------------------------------------------------------------------------
// denotes those levers that have less than 4 stages and / or do not allow for decimals
//
// [lever id, max stages, decimal allowed]
// -----------------------------------------------------------------------------------------------
var specificLeverSetup = [ 
                          [ 1, 3, true], // lever 1 "Global population"
                          [ 2, 3, true], // lever 2 "Urbanisation"
                          [51, 2, false] // lever 48 "Confidence in climate models"
                     ];

function getMaxStageForLever (leverID) {
  for(var i=0; i<specificLeverSetup.length; i++) 
    if (specificLeverSetup[i][0] == leverID) return specificLeverSetup[i][1];
  return 4;
}
function isDecimalAllowedForLever (leverID) {
  for(var i=0; i<specificLeverSetup.length; i++) 
    if (specificLeverSetup[i][0] == leverID) return specificLeverSetup[i][2];
  return true;
}

// --------------------------------------------------------------------
// returns the internal lever ids for a given lever setup group
// --------------------------------------------------------------------
function getLeverSetFromSetup (leverSetup) {

  var arr = [];
  for(var i=0; i<leverSetup.length; i++) 
    arr.push(leverSetup[i][1]-1); // lever url pos id = internal id + 1
  return arr;
}

// --------------------------------------------------------------------
// returns the internal lever ids for a given master lever id
// --------------------------------------------------------------------
function getLeverSetForMaster (leverID) {

  if (leverID ==  1) return getLeverSetFromSetup(lifestyle_transport); 
  if (leverID ==  2) return getLeverSetFromSetup(lifestyle_buildings); 
  if (leverID ==  3) return getLeverSetFromSetup(lifestyle_food); 
  if (leverID ==  4) return getLeverSetFromSetup(technology_transport); 
  if (leverID ==  5) return getLeverSetFromSetup(technology_buildings); 
  if (leverID ==  6) return getLeverSetFromSetup(technology_manufacturing); 
  if (leverID ==  7) return getLeverSetFromSetup(technology_ccs); 
  if (leverID ==  8) return getLeverSetFromSetup(technology_fossilfuels); 
  if (leverID ==  9) return getLeverSetFromSetup(technology_nuclear); 
  if (leverID == 10) return getLeverSetFromSetup(technology_renewables); 
  if (leverID == 11) return getLeverSetFromSetup(land_foodyields); 
  if (leverID == 12) return getLeverSetFromSetup(land_landuse); 
  if (leverID == 13) return getLeverSetFromSetup(dl_demographics); 
  if (leverID == 14) return getLeverSetFromSetup(dl_emissions); 
  if (leverID == 15) return getLeverSetFromSetup(technology_bioenergy); 

  return [];
}

