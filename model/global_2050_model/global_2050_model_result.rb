require_relative '../global_2050_model'

class Global2050ModelResult < Global2050ModelUtilities  
  attr_accessor :excel, :pathway_v22
  
  def initialize
    # @excel = Global2050ModelShim.new
    @excel = Global2050Model.new
  end
  
  def self.calculate_pathway_v22(code)
    new.calculate_pathway_v22(code)
  end



  # **********************************************
  # new !
  # **********************************************
  def calculate_cfps_v22(code)
    #puts "Global2050ModelResult V18 calculate_cfps() " + code
    Thread.exclusive do 
      reset
      @pathway_v22 = { _id: code, choices: set_choices(code) }
      pathway_v22[:cfps]          	= getCFPs()
    end
    return pathway_v22
  end

  # **********************************************
  # new !
  # **********************************************
  def calculate_sankey_v22(code)
    #puts "Global2050ModelResult V18 calculate_sankey() " + code
    Thread.exclusive do 
      reset
      @pathway_v22 = { _id: code, choices: set_choices(code) }
      pathway_v22[:sankey]        	= get_sankey_data()
    end
    return pathway_v22
  end

  def calculate_pathway_plus_setup_v22(code)
    #puts "Global2050ModelResult V22 calculate_pathway_plus_setup()" + code
    Thread.exclusive do 
      reset
      @pathway_v22 = { _id: code, choices: set_choices(code) }

     # pathway_v22[:lever_vals_detailed]	= get_lever_values_from_spreadsheet_detailed()
     # pathway_v22[:one_pagers] 		= get_one_pagers_data()


     pathway_v22[:lever_vals] 		= get_lever_values_from_spreadsheet()
     pathway_v22[:sankey_simple]        = get_simple_sankey_data()
     pathway_v22[:dashboard]     	= get_dashboard_data() 
     pathway_v22[:energy]             	= get_energy_data()
     pathway_v22[:food_and_bioenergy] 	= get_food_and_bioenergy_data()
     pathway_v22[:transport]     	= get_transport_data()
     pathway_v22[:buildings]          	= get_buildings_data()
     pathway_v22[:manufacturing] 	= get_manufacturing_data()
     pathway_v22[:land_use]           	= get_land_use_data()
     pathway_v22[:ff_resources]       	= get_ff_and_other_resources_data()
     pathway_v22[:electricity]        	= get_electricity_data()
     pathway_v22[:costs]         	= getCosts()
     pathway_v22[:lifestyle]       	= get_lifestyle_data()
     pathway_v22[:warning_messages]	= get_warning_messages()
     pathway_v22[:climate_change]      	= get_climate_change_data()
     pathway_v22[:supertable]       	= get_supertable_data()

     pathway_v22[:lever_descriptions] 	= get_lever_descriptions()
     pathway_v22[:lever_graph_data]    	= get_lever_graph_data()
     pathway_v22[:cfps]          	= getCFPs()

     pathway_v22[:one_pager_desc] 	= get_lever_onepagers()

    end
    return pathway_v22
  end
  



  # **********************************************
  # classic !
  # **********************************************
  def calculate_pathway_v22(code)
    #puts "Global2050ModelResult V22 calculate_pathway() " + code
    Thread.exclusive do 
      reset
      @pathway_v22 = { _id: code, choices: set_choices(code) }

#    pathway_v22[:one_pagers] 		= get_one_pagers_data()
#    pathway_v22[:lever_descriptions]    =  get_lever_descriptions()
#    pathway_v22[:cfps]          	= getCFPs()
     # pathway_v22[:lever_vals_detailed]	= get_lever_values_from_spreadsheet_detailed()


     pathway_v22[:lever_vals] 		= get_lever_values_from_spreadsheet()

     pathway_v22[:dashboard]     	= get_dashboard_data() 

     pathway_v22[:energy]             	= get_energy_data()
     pathway_v22[:ff_resources]       	= get_ff_and_other_resources_data()
     pathway_v22[:lifestyle]       	= get_lifestyle_data()
     pathway_v22[:buildings]          	= get_buildings_data()
     pathway_v22[:land_use]           	= get_land_use_data()
     pathway_v22[:sankey_simple]        = get_simple_sankey_data()
     pathway_v22[:food_and_bioenergy] 	= get_food_and_bioenergy_data()
     pathway_v22[:climate_change]      	= get_climate_change_data()
     pathway_v22[:supertable]       	= get_supertable_data()

     pathway_v22[:electricity]        	= get_electricity_data()
     pathway_v22[:costs]         	= getCosts()
     pathway_v22[:transport]     	= get_transport_data()
     pathway_v22[:manufacturing] 	= get_manufacturing_data()
     pathway_v22[:warning_messages]    	= get_warning_messages()

=begin
=end

    pathway_v22[:lever_graph_data]   	= get_lever_graph_data()
    pathway_v22[:cfps]          	= getCFPs()
    # pathway_v22[:lever_descriptions]  =  get_lever_descriptions()
    # pathway_v22[:one_pager_desc] 	= get_lever_onepagers()
    end
    return pathway_v22
  end

  def extractWhatsInAtStart 
    #puts "Global2050ModelResult extractWhatsInAtStart() "
    Thread.exclusive do 
      reset
      @pathway_v22 = { _id: "extractWhatsInAtStart"}
      pathway_v22[:lever_vals] 		= get_lever_values_from_spreadsheet()


    end
    return pathway_v22
  end

      
  
  
  
  
    

  #  ------------- start MW definitions --------------------------------------------------


  def get_data_cell_array (sheet,row)
   ['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # emissions sheet: cell values for 1990 to 2010
  # ----------------------------------------------------------------
  def get_data_cell_array_emissions_historic (row)
   sheet = "outputs_emissions"
   ['h', 'i', 'j', 'k', 'l'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # emissions sheet: cell values for 2011 to 2100
  # ----------------------------------------------------------------
  def get_data_cell_array_emissions_projected (row)
   sheet = "outputs_emissions"
   ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah'  ].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # emissions sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_emissions_projected_2011_2050 (row)
   sheet = "outputs_emissions"
   ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # emissions sheet: cell values for 1990 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_emissions_1990_2050 (row)
   sheet = "outputs_emissions"
   ['h', 'i', 'j', 'k', 'l', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # emissions sheet: cell values for 1990 to 2100
  # ----------------------------------------------------------------
  def get_data_cell_array_emissions_1990_2100 (row)
   sheet = "outputs_emissions"
   ['h', 'i', 'j', 'k', 'l', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah'].map { |c| r("#{sheet}_#{c}#{row}") }
  end


  # -----------------------------------------------------------------------------------------
  # compile the model output for the *** dashboard *** 
  # -----------------------------------------------------------------------------------------
  def get_dashboard_data ()
    x = {}

    # ----------------------------------------------------------------
    # energy supply in 2011 and 2050 : 
    # ----------------------------------------------------------------
    y1 = r("webtool_supply_2011")
    y2 = r("webtool_supply_2050")

    x["energy supply 2050"] = {}
    x["energy supply 2050"]["Global nuclear fission"] 			= [ y1[0][0],  y2[0][0] ]  
    x["energy supply 2050"]["Global solar, wind, wave and tidal"] 	= [ y1[2][0],  y2[2][0] ]  
    x["energy supply 2050"]["Global geothermal"] 			= [ y1[4][0],  y2[4][0] ]  
    x["energy supply 2050"]["Global hydro"] 				= [ y1[6][0],  y2[6][0] ]  
    x["energy supply 2050"]["Global bioenergy and waste"] 		= [ y1[8][0],  y2[8][0] ]  
    x["energy supply 2050"]["Global heat"] 				= [ y1[10][0], y2[10][0] ]  
    x["energy supply 2050"]["Global coal and peat"] 			= [ y1[12][0], y2[12][0] ]  
    x["energy supply 2050"]["Global oil"] 				= [ y1[14][0], y2[14][0] ]  
    x["energy supply 2050"]["Global gas"] 				= [ y1[16][0], y2[16][0] ]  

    # ----------------------------------------------------------------
    # energy demand in 2011 and 2050 : 
    # ----------------------------------------------------------------
    y1 = r("webtool_demand_2011")
    y2 = r("webtool_demand_2050")
=begin
    x["energy demand 2050"] = {}
    x["energy demand 2050"]["Losses"] 					= [ y1[0][0],  y2[0][0] ]  
    x["energy demand 2050"]["Transport"] 				= [ y1[2][0],  y2[2][0] ]  
    x["energy demand 2050"]["Residential, public and commercial"]	= [ y1[4][0],  y2[4][0] ]  
    x["energy demand 2050"]["Manufacturing"] 				= [ y1[6][0],  y2[6][0] ]  
    x["energy demand 2050"]["Other end uses"] 				= [ y1[8][0],  y2[8][0] ]  
    x["energy demand 2050"]["Greenhouse gas removal"]	 		= [ y1[10][0], y2[10][0] ]  
=end
    x["energy demand 2050"] = {}
    x["energy demand 2050"]["Transport"] 				= [ y1[1][0], y2[1][0] ]  
    x["energy demand 2050"]["Residential, public and commercial"]	= [ y1[3][0], y2[3][0] ]  
    x["energy demand 2050"]["Manufacturing"] 				= [ y1[5][0], y2[5][0] ]  
    x["energy demand 2050"]["Other end uses"] 				= [ y1[7][0], y2[7][0] ]  
    x["energy demand 2050"]["Greenhouse gas removal"]	 		= [ y1[9][0], y2[9][0] ]  

    # ----------------------------------------------------------------
    # cumul GHG emissions total projected 2050, 2100 
    # ----------------------------------------------------------------
    x["cum GHG emissions projected"] = ["", r("webtool_cumulative_co2_2100")] # no named ref for 2050 available

    # ----------------------------------------------------------------
    # temperature change  in 2050 and in 2050: 
    # ----------------------------------------------------------------
    a1 = r("webtool_warming_2050") 
    a2 = r("webtool_warming_2100") 
    x["temperature change High"] = [a1[0][0], a2[0][0]] 
    x["temperature change Low"]  = [a1[1][0], a2[1][0]] 
   


    # ----------------------------------------------------------------
    # GHG emissions total historic 1990-2010 
    # ----------------------------------------------------------------
    # x["GHG emissions historic " +  "(years)"] = get_data_cell_array_emissions_historic (45) # years  (for control)
    # x["GHG emissions historic " +  r("outputs_emissions_d54").to_s] = get_data_cell_array_emissions_historic (54) # values

    # ----------------------------------------------------------------
    # GHG emissions total projected 2011-2100 
    # ----------------------------------------------------------------
    # x["GHG emissions projected " +  "(years)"] = get_data_cell_array_emissions_projected (45) # years (for control)
    # x["GHG emissions projected " +  r("outputs_emissions_d54").to_s] = get_data_cell_array_emissions_projected (54) # values


    y = r("webtool_co2e_total_emissions")

    a = []
    a[0..4] = y[0][0..4]
    x["GHG emissions historic Total"] = a

    a = []
    a[0..18] = y[0][8..26]
    x["GHG emissions projected Total"] = a






    # ----------------------------------------------------------------
    # emissions by IPCC sector 1990 - 2050
    # ----------------------------------------------------------------
    y = r("webtool_co2e_ipcc")

    x["by IPCC sector"] = {}
    (1..9).each do |n|
      x["by IPCC sector"][y[n][1]] = y[n][5..9] + y[n][13..21] 
    end



    # ----------------------------------------------------------------
    # emissions by gas 1990 - 2100
    # ----------------------------------------------------------------
    y = r("webtool_co2e_by_gas")

    x["by gas"] = {}
    (1..4).each do |n|
      x["by gas"][y[n][1]] = y[n][5..9] + y[n][13..31] 
    end


    # ----------------------------------------------------------------
    # GGR 2011 - 2050: 
    # ----------------------------------------------------------------
    y = r("webtool_ggr_captured_co2")
    x["ggr"] = {}


    # ATTENTION - using dummy data due to problem with named range in this version !!!
    x["ggr"]["Biochar"] 			= [0, 0, 0, 0, 0, 0, 0, 0, 0]
    x["ggr"]["Air capture"] 			= [0, 0, 0, 0, 0, 0, 0, 0, 0]
    x["ggr"]["Ocean fertilisation"] 		= [0, 0, 0, 0, 0, 0, 0, 0, 0]
    x["ggr"]["Enhanced weathering ocean"] 	= [0, 0, 0, 0, 0, 0, 0, 0, 0]
    x["ggr"]["Enhanced weathering terrestrial"] = [0, 0, 0, 0, 0, 0, 0, 0, 0]

=begin
  #  x["ggr"]["years"] 				= y[0][13..21]
    x["ggr"]["Biochar"] 			= y[1][13..21]
    x["ggr"]["Air capture"] 			= y[2][13..21]
    x["ggr"]["Ocean fertilisation"] 		= y[3][13..21]
    x["ggr"]["Enhanced weathering ocean"] 	= y[4][13..21]
    x["ggr"]["Enhanced weathering terrestrial"] = y[5][13..21]
=end

    x["cumul emissions"] = {}
    x["cumul emissions"]["years"] = get_data_cell_array_emissions_1990_2100 (103) # years (for control)
    x["cumul emissions"]["CO2"]   = get_data_cell_array_emissions_1990_2100 (113) # values CO2


    x["webtool_demand_2011"] = r("webtool_demand_2011")
    x["webtool_demand_2050"] = r("webtool_demand_2050")
    x["webtool_1990_to_2050_demand"] = r("webtool_1990_to_2050_demand")


    x["XXXX webtool_ggr_captured_co2"] = r("webtool_ggr_captured_co2")

    return x
  end  


  # ----------------------------------------------------------------
  # energy sheet: cell values for 1975 to 2010 and 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_energy (row)
   sheet = "outputs_energy"
   ['h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** electricity *** 
  # -----------------------------------------------------------------------------------------
  def get_electricity_data ()
    x = {}

    # ----------------------------------------------------------------
    # data for tabular display
    # installed capacity 2011 and 2050
    # ----------------------------------------------------------------
    y1 = r("webtool_capacity_2011")
    y2 = r("webtool_capacity_2050")

    x["installed capacity"] = {}
    x["installed capacity"]["Coal / biomass"]		  = [y1[0][0],  y2[0][0]]
    x["installed capacity"]["Liquid"] 			  = [y1[1][0],  y2[1][0]]
    x["installed capacity"]["Gas"] 			  = [y1[2][0],  y2[2][0]]
    x["installed capacity"]["Carbon capture and storage"] = [y1[3][0],  y2[3][0]]
    x["installed capacity"]["Nuclear"] 			  = [y1[4][0],  y2[4][0]]
    x["installed capacity"]["Wind"] 			  = [y1[5][0],  y2[5][0]]
    x["installed capacity"]["Hydro"]			  = [y1[6][0],  y2[6][0]]
    x["installed capacity"]["Marine"]			  = [y1[7][0],  y2[7][0]]
    x["installed capacity"]["Solar"]			  = [y1[8][0],  y2[8][0]]
    x["installed capacity"]["Geothermal"]		  = [y1[9][0],  y2[9][0]]
    x["installed capacity"]["Storage"]			  = [y1[10][0], y2[10][0]]


    y = r("webtool_electricity")
    x["electricity energy supply"] = {}

    (1..8).each do |n|
      x["electricity energy supply"][y[n][0]] = y[n][4..11] + y[n][14..22] 
    end
    x["electricity energy supply"][y[9][0]]  = y[9][14..22] 
    x["electricity energy supply"][y[10][0]] = y[10][14..22] 

    y = r('g_supertable_emissions_intensity_g_per_kwh')
    x["emissions intensity"] = {}
    x["emissions intensity"]["years"] = y[0][10..18]
    x["emissions intensity"][y[1][1].strip] = y[1][10..18]

   # x["g_supertable_emissions_intensity_g_per_kwh"]  = y

    return x
  end  

  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** food and bioenergy *** 
  # -----------------------------------------------------------------------------------------
  def get_food_and_bioenergy_data ()
    x = {}

    # ----------------------------------------------------------------
    # calories per person 2011 and 2050
    # ----------------------------------------------------------------
    y1 = r("webtool_diet_2011")
    y2 = r("webtool_diet_2050")

    x["calories per person"] = {}
    x["calories per person"]["Cows and other bovines"] = [ y1[0][0],  y2[0][0] ]
    x["calories per person"]["Chickens and other poultry"] = [ y1[1][0],   y2[1][0] ]
    x["calories per person"]["Pigs"] = [ y1[2][0],   y2[2][0] ]
    x["calories per person"]["Sheep and goats"] = [ y1[3][0],   y2[3][0] ]
    x["calories per person"]["Other animals"] = [ y1[4][0],   y2[4][0] ]
    x["calories per person"]["Animal fats"] = [ y1[5][0],   y2[5][0] ]
    x["calories per person"]["Offals"] = [ y1[6][0],   y2[6][0] ]
    x["calories per person"]["Fish, seafood and other aquatic products"] = [ y1[7][0],   y2[7][0] ]
    x["calories per person"]["Eggs"] = [ y1[8][0],   y2[8][0] ]
    x["calories per person"]["Milk products"] = [ y1[9][0],   y2[9][0] ]
    x["calories per person"]["Food crops"] = [ y1[10][0],  y2[10][0] ]



    # ----------------------------------------------------------------
    # bioenergy supply 2011 .. 2050 
    # ----------------------------------------------------------------

    y = r("webtool_bioenergy_supply")

    x["bioenergy supply"] 			 = {}
    x["bioenergy supply"][y[1][0]] = y[1][14..22]
    x["bioenergy supply"][y[3][0]] = y[3][14..22]
    x["bioenergy supply"][y[5][0]] = y[5][14..22]
    x["bioenergy supply"][y[7][0]] = y[7][14..22]
    x["bioenergy supply"][y[8][0]] = y[8][14..22]
    x["bioenergy supply"][y[9][0]] = y[9][14..22]

    y = r("webtool_bioenergy_supply_final_solid_liquid_gas")

    x["bioenergy supply 2"] 			 = {}
    (0..6).each do |n|
      x["bioenergy supply 2"][y[n][0]] = y[n][15..23]
    end



    y = r('webtool_grainfed_meat')
    x["webtool_grainfed_meat"] = {}
    (0..4).each do |n|
      x["webtool_grainfed_meat"][y[n][0].strip] = y[n][1..2]
    end

    y = r('webtool_diet_table')
    x["webtool_diet_table"] = {}
    (0..15).each do |n|
      x["webtool_diet_table"][y[n][0].strip] = y[n][1..9]
    end

    y = r('webtool_diet_table2')
    x["webtool_diet_table2"] = {}
    (0..15).each do |n|
      x["webtool_diet_table2"][y[n][0].strip] = y[n][1..9]
    end


    y = r('webtool_football_pitch')
    x["webtool_football_pitch"] = {}
    (0..14).each do |n|
      x["webtool_football_pitch"][y[n][0].strip] = y[n][2..7]
    end

    x["XXXXXXXXXXXXXX webtool_football_pitch"] = y
 
   return x
  end  

  # ----------------------------------------------------------------
  # energy sheet: cell values for 1990 to 2010
  # ----------------------------------------------------------------
  def get_data_cell_array_energy_historic_1990_to_2010 (row)
   sheet = "outputs_energy"
   ['k', 'l', 'm', 'n', 'o'].map { |c| r("#{sheet}_#{c}#{row}") }
  end
  # ----------------------------------------------------------------
  # energy sheet: cell values for 1985 to 2010
  # ----------------------------------------------------------------
  def get_data_cell_array_energy_historic_1985_to_2010 (row)
   sheet = "outputs_energy"
   ['j', 'k', 'l', 'm', 'n', 'o'].map { |c| r("#{sheet}_#{c}#{row}") }
  end
  # ----------------------------------------------------------------
  # energy sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_energy_projected_2011_2050 (row)
   sheet = "outputs_energy"
   ['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # energy sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_energy_1990_2050 (row)
   sheet = "outputs_energy"
   ['k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map { |c| r("#{sheet}_#{c}#{row}") }
  end


  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** transport *** 
  # -----------------------------------------------------------------------------------------
  def get_transport_data ()
    x = {}

    # ----------------------------------------------------------------
    # transport energy demand historic 1990 - 2010
    # ----------------------------------------------------------------
    x["energy demand historic"] = {}
    x["energy demand historic"]["Transport"] = []
    x["energy demand historic"]["Transport"] =  r("webtool_transport_historic")[0][3..7]
 

    # ----------------------------------------------------------------
    # transport energy demand projected 2011 - 2050 
    # ----------------------------------------------------------------
    y = r("webtool_transport_2011_to_2050")

    x["energy demand projected"] = {}
    (1..4).each do |n|
      x["energy demand projected"][y[n][1]]     = y[n][15..23]
    end 


    y = r("webtool_freight_vehicles")

    x["vehicle stock freight"] = {}
    (1..5).each do |n|
      x["vehicle stock freight"][y[n][0]]   = [ y[n][14], y[n][22] ]
    end 

    # x["test 2"] = y

    y = r("webtool_passenger_vehicles")

    x["vehicle stock passenger"] = {}
    (1..4).each do |n|
      x["vehicle stock passenger"][y[n][0]] = [ y[n][14], y[n][22] ]
    end 

    #x["g_supertable_passenger_stock_type_of_car"] = r("g_supertable_passenger_stock_type_of_car")
    #x["g_supertable_transport_all_fuel_type_used_by_mode"] = r("g_supertable_transport_all_fuel_type_used_by_mode")
    #x["g_supertable_growth_in_output_most_common_transported_goods"] = r("g_supertable_growth_in_output_most_common_transported_goods")


    y = r("g_supertable_passenger_stock_type_of_car")
    x["transport by fuel type"] = {}
    x["transport by fuel type"]["years"] = y[0][10..18]

    (2..5).each do |n|
      x["transport by fuel type"][y[n][1].strip] = y[n][10..18] 
    end 

    y = r("g_supertable_transport_all_fuel_type_used_by_mode")
    x["fuel type used by mode"] = {}
    x["fuel type used by mode"]["years"] = y[0][10..18]

    (1..4).each do |n|
      x["fuel type used by mode"][y[n][0].strip] = y[n][10..18] 
    end 


    y = r("g_supertable_transport_all_energy_used_by_mode")
    x["all energy used by mode"] = {}
    x["all energy used by mode"]["years"] = y[0][10..18]
    (1..10).each do |n|
      x["all energy used by mode"][y[n][0].strip + " " + y[n][1].strip] = y[n][10..18] 
    end 

    y = r('g_supertable_passenger_efficiency_average_all_cars')
    x['passenger efficiency average all cars'] = {}
    x['passenger efficiency average all cars']["years"] = y[0][10..18]
    (2..2).each do |n|
      x["passenger efficiency average all cars"][y[n][1].strip] = y[n][10..18] 
    end 


    y = r("g_supertable_growth_in_output_most_common_transported_goods")
    x["growth in output"] = {}
    x["growth in output"]["years"] = y[0][10..18]
    (1..3).each do |n|
      x["growth in output"][y[n][1].strip] = y[n][10..18] 
    end 




    y = r("g_supertable_transport_freight_by_load_2011_percent")
    x["freight by load 2011 percent"] = {}
    x["freight by load 2011 percent"]["years"] = y[0][10]
    (1..4).each do |n|
      x["freight by load 2011 percent"][y[n][0].strip] = y[n][10] 
    end 

=begin
    y = r("g_supertable_transport_freight_distance_total")
    x["freight distance total"] = {}
    x["freight distance total"]["years"] = y[0][10..18]
    (4..4).each do |n|
      x["freight distance total"][y[n][0].strip] = y[n][10..18] 
    end 
=end


    y = r("webtool_products_shipped_by_sea")
    x["products shipped by sea"] = {}
    x["products shipped by sea"]["years"] = y[0][14..22]
    (1..1).each do |n|
      x["products shipped by sea"][y[n][0].strip] = y[n][14..22] 
    end 


    y = r("g_supertable_transport_total_international_freight_by_ship")
    x["total international freight by ship"] = {}
    x["total international freight by ship"]["years"] = y[0][10..18]
    (2..2).each do |n|
      x["total international freight by ship"][y[n][0].strip] = y[n][10..18] 
    end 




    return x
  end  





  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** supertable *** 
  # -----------------------------------------------------------------------------------------
  def get_supertable_data ()
    x = {}
    y = r("webtool_supertable")
  #  x["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"] = y


# =begin

    x["supertable"] = {}
    x["supertable"]["years"] = y[2][3..4]

    # -----------------------------------------------------------------------------------------
    # Emissions and temperature
    # -----------------------------------------------------------------------------------------
    x["supertable"][y[3][1].strip] = y[3][3..4]		# GHG emissions (t CO2e) per capita
    x["supertable"][y[4][1].strip] = [-999, y[4][3]]	# Cumulative emissions by 2100 (Gt CO2e)
    x["supertable"][y[5][1].strip] = [-999, y[5][3]]	# Temperature change in 2100 (⁰C)

    # -----------------------------------------------------------------------------------------
    # Demographics and long term
    # -----------------------------------------------------------------------------------------
    x["supertable"][y[7][1].strip] = y[7][3..4]
    x["supertable"][y[8][1].strip] = y[8][3..4]
    # -----------------------------------------------------------------------------------------
    # Energy
    # -----------------------------------------------------------------------------------------
    (10..17).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Electricity
    # -----------------------------------------------------------------------------------------
    (19..29).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Transport
    # -----------------------------------------------------------------------------------------
    (32..41).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Buildings
    # -----------------------------------------------------------------------------------------
    (43..50).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Manufacturing
    # -----------------------------------------------------------------------------------------
    (52..64).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Land
    # -----------------------------------------------------------------------------------------
    (66..70).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Food
    # -----------------------------------------------------------------------------------------
    (72..73).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Cost
    # -----------------------------------------------------------------------------------------
    (75..79).each do |n|
      x["supertable"][y[n][1].strip] = y[n][3..4]
    end  
    # -----------------------------------------------------------------------------------------
    # Emissions saved
    # -----------------------------------------------------------------------------------------
    x["supertable"][y[81][1].strip] = y[81][3..4]

# =end


#     x["xxxxxXXXXXXX webtool_supertable"] = r("webtool_supertable")

    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** lifestyle *** 
  # -----------------------------------------------------------------------------------------
  def get_lifestyle_data ()
    x = {}
    y = r("webtool_lifestyle")
    x["years"] 	 = y[0][1..6]
    x["what"]  	 = y[1][1..6]
    x[y[2][0]]   = y[2][1..6]
    x[y[3][0]]   = y[3][1..6]
    x[y[5][0]]   = y[5][1..6]
    x[y[6][0]]   = y[6][1..6]
    x[y[7][0]]   = y[7][1..6]
    x[y[9][0]]   = y[9][1..6]
    x[y[10][0]]  = y[10][1..6]
    x[y[23][0]]  = y[23][1..6]

#    x["X1"] = y


    y = r('g_supertable_passenger_distance_travelled_by_car_summary')
    x["passenger distance travelled by car"] = {}
    x["passenger distance travelled by car"]["years"] = y[0][10..18]
    x["passenger distance travelled by car"][y[3][0].strip] = y[3][10..18]

    y = r('g_supertable_passenger_percent_distance_travelled_by_car_summary')
    x["percent distance travelled by car"] = {}
    x["percent distance travelled by car"]["years"] = y[0][10..18]
    x["percent distance travelled by car"][y[3][0].strip] = y[3][10..18]

    y = r('g_supertable_passenger_average_cars_per_person_summary')
    x["cars per person"] = {}
    x["cars per person"]["years"] = y[0][10..18]
    x["cars per person"][y[4][1].strip] = y[4][10..18]

    y = r('g_supertable_buildings_home_temperature_all')
    x["home temperature"] = {}
    x["home temperature"]["years"] = y[0][10..18]
    x["home temperature"][y[1][1].strip] = y[1][10..18]
    x["home temperature"][y[4][1].strip] = y[4][10..18]

    y = r('g_supertable_buildings_home_building_size')
    x["building size"] = {}
    x["building size"]["years"] = y[0][10..18]
    x["building size"][y[3][1].strip] = y[3][10..18]

    y = r('g_supertable_buildings_lightbulbs_per_household')
    x["lightbulbs per household"] = {}
    x["lightbulbs per household"]["years"] = y[0][10..18]
    x["lightbulbs per household"][y[1][0].strip] = y[1][10..18]
    x["lightbulbs per household"][y[2][0].strip] = y[2][10..18]

    y = r('g_supertable_buildings_final_energy_consumption_per_household')
    x["energy consumption per household"] = {}
    x["energy consumption per household"]["years"] = y[0][10..18]
    x["energy consumption per household"][y[1][0].strip] = y[1][10..18]
    x["energy consumption per household"][y[2][0].strip] = y[2][10..18]

    return x
  end  

  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** buildings *** 
  # -----------------------------------------------------------------------------------------
  def get_buildings_data ()
    x = {}

    # ----------------------------------------------------------------
    # misc data for tabular dispay
    # % population living in urban areas
    # no. of households
    # ----------------------------------------------------------------
    x["misc"] = {}
    x["misc"]["Total"] = [r("webtool_population_2011"), r("webtool_population_2050")] 
    x["misc"]["Urbanisation"] = [r("webtool_urbanisation_2011"), r("webtool_urbanisation_2050")]
    x["misc"]["Urban households"] = [r("webtool_urban_households_2011"), r("webtool_urban_households_2050")]
    x["misc"]["Rural households"] = [r("webtool_rural_households_2011"), r("webtool_rural_households_2050")]
    x["misc"]["Households with access to electricity"] = [r("webtool_percent_with_elec_2011"), r("webtool_percent_with_elec_2050")]



    y = r("webtool_buildings_2011_to_2050")

    x["energy demand projected resid"] = {}
    (1..6).each do |n|
      x["energy demand projected resid"][y[n][0]] = y[n][14..22]
    end 


    x["energy demand projected nonresid"] = {}
    (9..13).each do |n|
      x["energy demand projected nonresid"][y[n][0]] = y[n][14..22]
    end 

    # ----------------------------------------------------------------
    # energy demand historic 1990 - 2010
    # ----------------------------------------------------------------
    y = r("webtool_buildings_historic")
    x["energy demand historic"] = y[0][0..7]

    y = r("g_supertable_buildings_proportion_space_heating_lowcarbon_urban")
    x["space heating"] = {}
    x["space heating"]["years"] = y[0][10..18]
    x["space heating"][y[5][1].strip] = y[5][10..18]

    y = r("g_supertable_house_insulation")
    x["insulation"]  = {}
    x["insulation"]["years"] = y[0][9..17]
    x["insulation"][y[1][1].strip] = y[1][9..17]

    y = r("g_supertable_buildings_fuel_type_used_by_all_buildings")
    x["by fuel type"] = {}
    x["by fuel type"]["years"] = y[0][10..18]
    (1..8).each do |n|
      x["by fuel type"][y[n][1].strip] = y[n][10..18]
    end 




    return x
  end  



  # ----------------------------------------------------------------
  # misc sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_outputs_misc_2011_2050 (row)
   sheet = "outputs_misc"
   ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'].map { |c| r("#{sheet}_#{c}#{row}") }
  end



  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** fossil fuels and other resources *** 
  # -----------------------------------------------------------------------------------------
  def get_ff_and_other_resources_data ()
    x = {}

    x["gas"]  	 = {}
    x["coal"] 	 = {}
    x["oil"]  	 = {}
    x["uranium"] = {}


    # ----------------------------------------------------------------
    # cum consumption 2011 to 2050
    # ----------------------------------------------------------------
    y = r("webtool_cumulative_consumption")

    x["coal"]["time series"]	= []
    x["oil"]["time series"]	= []
    x["gas"]["time series"]	= []
    # x["uranium"]["time series"]	= []

    x["coal"]["time series"]	= y[1][15..23]
    x["oil"]["time series"]	= y[2][15..23]
    x["gas"]["time series"]	= y[3][15..23]
    # x["uranium"]["time series"]	= y[4][15..23]


    # ----------------------------------------------------------------
    # coal cum consumption 2011 to 2050 and reserves from 3 methods
    # ----------------------------------------------------------------
    x["coal"]["consumption 2050"]     = r("webtool_consumed_coal") # cum consumption (2050)
 


    y = r("webtool_coal_reserves")

=begin
    x["coal"]["remaining reserves"] = {}
    x["coal"]["remaining reserves"]["method 1 EIA"]    = y[0][0]  # reserves estimate
    x["coal"]["remaining reserves"]["method 2 GFIGNR"] = y[1][0]  # reserves estimate
    x["coal"]["remaining reserves"]["method 3 WEC"]    = y[2][0]  # reserves estimate
=end

    # ATTENTION manual fix for missing value and resulting shifting of the last for coal reserves
    x["coal"]["remaining reserves"] = {}
    x["coal"]["remaining reserves"]["method 1 EIA"]    = y[0][0]  # ATTENTION: should be y[0][0]
    x["coal"]["remaining reserves"]["method 2 GFIGNR"] = 1038  # ATTENTION: manual filled, should be y[1][0]
    x["coal"]["remaining reserves"]["method 3 WEC"]    = y[1][0]  # ATTENTION: should be y[2][0]


    y = r("webtool_coal_resources")
    x["coal"]["remaining resources"] = {}
    x["coal"]["remaining resources"]["method 1 USGS"]  = y[0][0] # resource estimate
    x["coal"]["remaining resources"]["method 2 WEC"]   = y[1][0] # resource estimate
    x["coal"]["remaining resources"]["method 3"]       = y[2][0] # resource estimate



    # ----------------------------------------------------------------
    # oil cum consumption 2011 to 2050 and reserves from 3 methods
    # ----------------------------------------------------------------
    x["oil"]["consumption 2050"]     = r("webtool_consumed_oil") # cum consumption (2050)

    y = r("webtool_oil_reserves")
    x["oil"]["remaining reserves"] = {}
    x["oil"]["remaining reserves"]["method 1 EIA"]    = y[0][0]  # reserves estimate
    x["oil"]["remaining reserves"]["method 2 BP"]     = y[1][0]  # reserves estimate
    x["oil"]["remaining reserves"]["method 3 OPEC"]   = y[2][0]  # reserves estimate

    y = r("webtool_oil_resources")
    x["oil"]["remaining resources"] = {}
    x["oil"]["remaining resources"]["method 1 USGS"]    = y[0][0] # resource estimate
    x["oil"]["remaining resources"]["method 2 USGS"]    = y[1][0] # resource estimate
    x["oil"]["remaining resources"]["method 3 USGS"] 	= y[2][0] # resource estimate


    # ----------------------------------------------------------------
    # gas cum consumption 2011 to 2050 and reserves from 3 methods
    # ----------------------------------------------------------------
    x["gas"]["consumption 2050"]     = r("webtool_consumed_gas") # cum consumption (2050)
 
    y = r("webtool_gas_reserves")
    x["gas"]["remaining reserves"] = {}
    x["gas"]["remaining reserves"]["method 1 EIA"]    = y[0][0]  # reserves estimate
    x["gas"]["remaining reserves"]["method 2 BP"]     = y[1][0]  # reserves estimate
    x["gas"]["remaining reserves"]["method 3"]        = y[2][0]  # reserves estimate

    y = r("webtool_gas_resources")
    x["gas"]["remaining resources"] = {}
    x["gas"]["remaining resources"]["method 1 RWE"]     = y[0][0] # resource estimate
    x["gas"]["remaining resources"]["method 2 Dolcera"] = y[1][0] # resource estimate
    x["gas"]["remaining resources"]["method 3 IEA"]     = y[2][0] # resource estimate


    # ----------------------------------------------------------------
    # uranium cum consumption 2011 to 2050 and reserves from 3 methods
    # ----------------------------------------------------------------
    x["uranium"]["consumption 2050"]     = r("webtool_consumed_uranium") # cum consumption (2050)

    y = r("webtool_uranium_reserves")
    x["uranium"]["remaining reserves"] = {}
    x["uranium"]["remaining reserves"]["method 1 NucInfo"]    = y[0][0]  # reserves estimate
    x["uranium"]["remaining reserves"]["method 2 NucEnviro"]  = y[1][0]  # reserves estimate
    x["uranium"]["remaining reserves"]["method 3 NucEnviro"]  = y[2][0]  # reserves estimate

    y = r("webtool_uranium_resources")
    x["uranium"]["remaining resources"] = {}
    x["uranium"]["remaining resources"]["method 1 NucEnviro"]     = y[0][0] # resource estimate


    return x
  end  


  # ----------------------------------------------------------------
  # land use sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_land_use_projected_2011_2050 (row)
   sheet = "outputs_land_use_technology"
   ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # ----------------------------------------------------------------
  # physical implications sheet: cell values for 2011 to 2050
  # ----------------------------------------------------------------
  def get_data_cell_array_physical_implications_projected_2011_2050 (row)
   sheet = "outputs_physical_implications"
   ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'].map { |c| r("#{sheet}_#{c}#{row}") }
  end

  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** land use *** 
  # -----------------------------------------------------------------------------------------
  def get_land_use_data ()
    x = {}
=begin
    x["land use projected"] = {}
    x["land use projected"]["(years)"]                                          = get_data_cell_array_physical_implications_projected_2011_2050 (56) # years (for control)
    x["land use projected"][r("outputs_physical_implications_c57").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (57) # 
    x["land use projected"][r("outputs_physical_implications_c58").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (58) # 
    x["land use projected"][r("outputs_physical_implications_c59").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (59) # 
    x["land use projected"][r("outputs_physical_implications_c60").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (60) # 
    x["land use projected"][r("outputs_physical_implications_c61").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (61) # 
    x["land use projected"][r("outputs_physical_implications_c62").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (62) # 
    x["land use projected"][r("outputs_physical_implications_c63").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (63) # 
    x["land use projected"][r("outputs_physical_implications_c64").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (64) # 
    x["land use projected"][r("outputs_physical_implications_c65").to_s.strip]  = get_data_cell_array_physical_implications_projected_2011_2050 (65) # 
=end

    y = r("webtool_land_use")

    x["land use projected"] = {}

    (0..9).each do |n|
      x["land use projected"][ y[n][0].strip ] = y[n][9..22]
    end

    # x["webtool_land_use"] = y


=begin
    x["land use projected"]["Land for animals"] 		= y[0]
    x["land use projected"]["Land for food crops"] 		= y[1]
    x["land use projected"]["Land for non-food crops"] 		= y[2]
    x["land use projected"]["Native forest"] 			= y[3]
    x["land use projected"]["Commercial forest"] 		= y[4]
    x["land use projected"]["Land for bioenergy"] 		= y[5]
    x["land use projected"]["Unused productive land"] 		= y[6]
    x["land use projected"]["Settlements and infrastructure"] 	= y[7]
    x["land use projected"]["Desert, ice etc"] 			= y[8]
=end

  #  x["y"] = y


    return x
  end  

  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** climate *** (see also dahboard for temp change) 
  # -----------------------------------------------------------------------------------------
  def get_climate_change_data ()
    x = {}


    # -----------------------------------------------------------------------------------------
    # data for th basic physics page
    # -----------------------------------------------------------------------------------------
    x["energy_trapped_by_co2_2050"]        = r("webtool_climate_extra_energy_trapped_by_co2_2050")
    x["energy_trapped_by_co2_2100"]        = r("webtool_climate_extra_energy_trapped_by_co2_2100")
    x["ice_melted_mass_2100"]              = r("webtool_climate_ice_melted_mass_2100")
    x["slr_due_to_ice_melt_2100"]          = r("webtool_climate_sea_level_rise_due_to_ice_melt_2100")
    x["slr_due_to_thermal_expansion_2100"] = r("webtool_climate_sea_level_rise_due_to_thermal_expansion_2100")

    y = r("webtool_warming_co2only_timeseries")

    # -----------------------------------------------------------------------------------------
    # observed data (1870 .. 2013)
    # -----------------------------------------------------------------------------------------
    x["years observed"]  = y[0][1..18]
    x[y[2][0]]  = y[2][1..18]
    x[y[3][0]]  = y[3][1..18]
    x[y[4][0]]  = y[4][1..18]

    # -----------------------------------------------------------------------------------------
    # projected data (2020 .. 2100)
    # -----------------------------------------------------------------------------------------
    x["years projected"]  = y[0][20..36]
    x[y[1][0]]  = y[1][20..36]
    x[y[5][0]]  = y[5][20..36]

    x["y"]              = y
   

    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** climate *** (see also dahboard for temp change) 
  # -----------------------------------------------------------------------------------------
  def get_warning_messages ()
    x = {}
    x["50_percent_chance_warming"] 	= r("webtool_warning_50_percent_chance_warming")
    x["beyond_ipcc_assessment"]		= r("webtool_warning_beyondipccassessment")
    x["bio_oversupply"] 	   	= r("webtool_warning_bio_oversupply")
    x["electricity_oversupply"] 	= r("webtool_warning_electricity_oversupply")
    x["co2_concentrations"] 		= r("webtool_warnings_co2_concentrations")
    x["coal_reserves"] 			= r("webtool_warnings_coal_reserves")
    x["crop_yields_and_warming"]	= r("webtool_warnings_crop_yields_and_warming")
    x["forest"] 			= r("webtool_warnings_forest")
    x["fossil_fuel_proportion"] 	= r("webtool_warnings_fossil_fuel_proportion")
    x["gas_reserves"] 			= r("webtool_warnings_gas_reserves")
    x["ggr"] 				= r("webtool_warnings_ggr")
    x["land_use"] 			= r("webtool_warnings_land_use")
    x["level4"] 			= r("webtool_warnings_level4")
    x["oil_reserves"] 			= r("webtool_warnings_oil_reserves")
    x["uranium_reserves"]		= r("webtool_warnings_uranium_reserves")
    # x["lower_temp_preindustrial"]	= r("webtool_warnings_lower_temp_preindustrial")


    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** manufacturing *** 
  # -----------------------------------------------------------------------------------------

  def get_manufacturing_data ()

    x = {}

    # ----------------------------------------------------------------
    # material demand after product manufacturing efficiency
    # ----------------------------------------------------------------
    y = r("webtool_manufacturing_output");
    x["production"] = {}
    x["production"]["Iron and steel"]	= []
    x["production"]["Aluminium"]	= []	
    x["production"]["Chemicals"]	= []
    x["production"]["Pulp and paper"]	= []
    x["production"]["Cement"]		= []
    x["production"]["Timber"]		= []

    x["production"]["Iron and steel"] 	= y[1][14..22] 
    x["production"]["Aluminium"] 	= y[2][14..22] 
    x["production"]["Chemicals"] 	= y[3][14..22] 
    x["production"]["Pulp and paper"]	= y[4][14..22] 
    x["production"]["Cement"]		= y[5][14..22] 
    x["production"]["Timber"]		= y[6][14..22] 

    # ----------------------------------------------------------------
    # energy consumption projected 2011 - 2050 
    # ----------------------------------------------------------------
    y = r("webtool_manufacturing_energy");
    x["energy consumption projected"] = {}
    x["energy consumption projected"]["Iron and steel"] = []
    x["energy consumption projected"]["Aluminium"]	  = []	
    x["energy consumption projected"]["Chemicals"]	  = []
    x["energy consumption projected"]["Pulp and paper"] = []
    x["energy consumption projected"]["Cement"]	  = []
    x["energy consumption projected"]["Other"]	  = []
    x["energy consumption projected"]["Timber"]	  = [] 

    x["energy consumption projected"]["Iron and steel"] = y[1][15..23] 
    x["energy consumption projected"]["Aluminium"] 	  = y[2][15..23] 
    x["energy consumption projected"]["Chemicals"] 	  = y[3][15..23] 
    x["energy consumption projected"]["Pulp and paper"] = y[4][15..23] 
    x["energy consumption projected"]["Cement"] 	  = y[5][15..23] 
    x["energy consumption projected"]["Other"]	  = y[6][15..23] 
    x["energy consumption projected"]["Timber"]	  = y[7][15..23] 


    x["energy consumption historic"] = {}
    x["energy consumption historic"]["Total"] = []
    x["energy consumption historic"]["Total"] = r("webtool_manufacturing_historic")[0][3..7]


    y = r("webtool_steel_energy_demand")
    x["webtool_steel_energy_demand"] =  {}
    (0..6).each do |n|
      x["webtool_steel_energy_demand"][ y[n][0].strip ] = y[n][15..23]
    end

    y = r("webtool_aluminium_energy_demand")
    x["webtool_aluminium_energy_demand"] =  {}
    (0..4).each do |n|
      x["webtool_aluminium_energy_demand"][ y[n][0].strip ] = y[n][15..23]
    end

    y = r("webtool_paperpulp_energy_demand")
    x["webtool_paperpulp_energy_demand"] =  {}
    (0..4).each do |n|
      x["webtool_paperpulp_energy_demand"][ y[n][0].strip ] = y[n][15..23]
    end

    y = r("webtool_chemicals_energy_demand")
    x["webtool_chemicals_energy_demand"] =  {}
    (0..5).each do |n|
      x["webtool_chemicals_energy_demand"][ y[n][0].strip ] = y[n][15..23]
    end

    y = r("g_supertable_manufacturing_cement_energy_demand");
    x["g_supertable_manufacturing_cement_energy_demand"] =  {}
    #x["g_supertable_manufacturing_cement_energy_demand"]["years"] = y[0][10..18]
    x["g_supertable_manufacturing_cement_energy_demand"][y[1][1].strip] = y[1][10..18]

    y = r("g_supertable_manufacturing_steel_energy_demand")
    x["g_supertable_manufacturing_steel_energy_demand"] =  {}
    #x["g_supertable_manufacturing_steel_energy_demand"]["years"] = y[0][10..18]
    (1..5).each do |n|
      x["g_supertable_manufacturing_steel_energy_demand"][ y[n][1].strip ] = y[n][10..18]
    end

    y = r("g_supertable_manufacturing_aluminium_energy_demand")
    x["g_supertable_manufacturing_aluminium_energy_demand"] =  {}
    #x["g_supertable_manufacturing_aluminium_energy_demand"]["years"] = y[0][10..18]
    (1..3).each do |n|
      x["g_supertable_manufacturing_aluminium_energy_demand"][ y[n][1].strip ] = y[n][10..18]
    end
  
    y = r("g_supertable_manufacturing_chemicals_energy_demand")
    x["g_supertable_manufacturing_chemicals_energy_demand"] =  {}
    #x["g_supertable_manufacturing_chemicals_energy_demand"]["years"] = y[0][10..18]
    (1..4).each do |n|
      x["g_supertable_manufacturing_chemicals_energy_demand"][ y[n][1].strip ] = y[n][10..18]
    end

    y = r("g_supertable_manufacturing_paper_energy_demand")
    x["g_supertable_manufacturing_paper_energy_demand"] =  {}
    #x["g_supertable_manufacturing_paper_energy_demand"]["years"] = y[0][10..18]
    (1..3).each do |n|
      x["g_supertable_manufacturing_paper_energy_demand"][ y[n][1].strip ] = y[n][10..18]
    end

    y = r("g_supertable_buildings_sales_of_lightbulbs")
    x["sales_of_lightbulbs"] =  {}
    #x["sales_of_lightbulbs"]["years"] = y[0][10..18]
    x["sales_of_lightbulbs"][ y[9][1].strip ] = y[9][10..18]

    y = r("g_supertable_buildings_sales_of_refrigerators")
    x["sales_of_refrigerators"] =  {}
    #x["sales_of_refrigerators"]["years"] = y[0][10..18]
    x["sales_of_refrigerators"][ y[3][1].strip ] = y[3][10..18]

    y = r("g_supertable_buildings_sales_of_televisions")
    x["sales_of_televisions"] =  {}
    #x["sales_of_televisions"]["years"] = y[0][10..18]
    x["sales_of_televisions"][ y[3][1].strip ] = y[3][10..18]


    y = r("g_supertable_manufacturing_steel_use_gt")
    x["g_supertable_manufacturing_steel_use_gt"] =  {}
    x["g_supertable_manufacturing_steel_use_gt"]["years"] = y[0][6..14]
    (1..8).each do |n|
      x["g_supertable_manufacturing_steel_use_gt"][ y[n][1].strip ] = y[n][6..14]
    end

    y = r("g_supertable_manufacturing_aluminium_use_gt")
    x["g_supertable_manufacturing_aluminium_use_gt"] =  {}
    x["g_supertable_manufacturing_aluminium_use_gt"]["years"] = y[0][6..14]
    (1..8).each do |n|
      x["g_supertable_manufacturing_aluminium_use_gt"][ y[n][1].strip ] = y[n][6..14]
    end

    y = r("g_supertable_manufacturing_chemical_use_gt")
    x["g_supertable_manufacturing_chemical_use_gt"] =  {}
    x["g_supertable_manufacturing_chemical_use_gt"]["years"] = y[0][6..14]
    (1..8).each do |n|
      x["g_supertable_manufacturing_chemical_use_gt"][ y[n][1].strip ] = y[n][6..14]
    end

    y = r("g_supertable_manufacturing_cement_use_gt")
    x["g_supertable_manufacturing_cement_use_gt"] =  {}
    x["g_supertable_manufacturing_cement_use_gt"]["years"] = y[0][6..14]
    (1..8).each do |n|
      x["g_supertable_manufacturing_cement_use_gt"][ y[n][1].strip ] = y[n][6..14]
    end

#    x["xxxxxxxxxxxxxxxxxxxxxxx g_supertable_manufacturing_steel_use_gt"] =  r("g_supertable_manufacturing_steel_use_gt")
#    x["xxxxxxxxxxxxxxxxxxxxxxx g_supertable_manufacturing_aluminium_use_gt"] =  r("g_supertable_manufacturing_aluminium_use_gt")
#    x["xxxxxxxxxxxxxxxxxxxxxxx g_supertable_manufacturing_chemical_use_gt"] =  r("g_supertable_manufacturing_chemical_use_gt")
#    x["xxxxxxxxxxxxxxxxxxxxxxx g_supertable_manufacturing_cement_use_gt"] =  r("g_supertable_manufacturing_cement_use_gt")


    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile the model output for theme  *** energy *** 
  # -----------------------------------------------------------------------------------------
  def get_energy_data ()
    x = {}

# "y"=>[[77.0, 90.0, 89.0, 96.0, 97.0, 105.0, 120.0, 137.0, 143.0]]}}






    # ----------------------------------------------------------------
    # energy demand 1990 - 2050
    # ----------------------------------------------------------------
    y = r("webtool_1990_to_2050_demand")

    x["energy demand"] = {}
    x["energy demand"]["Transport"]				= y[0][7..11] + y[0][14..22]
    x["energy demand"]["Residential, public and commercial"] 	= y[2][7..11] + y[2][14..22]
    x["energy demand"]["Manufacturing"]	 			= y[4][7..11] + y[4][14..22]
    x["energy demand"]["Other end uses"] 			= y[6][7..11] + y[6][14..22]
    x["energy demand"]["Greenhouse gas removal"] 		= y[8][7..11] + y[8][14..22]




    # ----------------------------------------------------------------
    # energy supply 1990 - 2050
    # ----------------------------------------------------------------
    y = r("webtool_1990_to_2050_supply")

    x["energy supply"] = {}

    (1..17).step(2) do |n|
      x["energy supply"][y[n][0].strip] = y[n][7..11] + y[n][14..22]
    end

=begin
    x["energy supply"]["years"]					=  y[0][7..11]  + y[0][14..22]
    x["energy supply"]["Global nuclear fission"]		=  y[1][7..11]  + y[1][14..22]
    x["energy supply"]["Global solar, wind, wave and tidal"]	=  y[3][7..11]  + y[3][14..22]
    x["energy supply"]["Global geothermal"]			=  y[5][7..11]  + y[5][14..22]
    x["energy supply"]["Global hydro"]				=  y[7][7..11]  + y[7][14..22]
    x["energy supply"]["Global bioenergy and waste"]		=  y[9][7..11]  + y[9][14..22]
    x["energy supply"]["Global heat"]				= y[11][7..11] + y[11][14..22]
    x["energy supply"]["Global coal and peat"]			= y[13][7..11] + y[13][14..22]
    x["energy supply"]["Global oil"]				= y[15][7..11] + y[15][14..22]
    x["energy supply"]["Global gas"]				= y[17][7..11] + y[17][14..22]
=end

    x["x"] = y


    return x
  end  




  # -----------------------------------------------------------------------------------------
  # compile the model output for the one pagers 
  # -----------------------------------------------------------------------------------------
  def get_one_pagers_data ()
    x = {}

    # ----------------------------------------------------------------
    # wind supply historic 1990 - 2010
    # ----------------------------------------------------------------
    x["wind supply historic"] = {}
    x["wind supply historic"]["(years)"]                    = get_data_cell_array_energy_historic_1990_to_2010 (57) # years (for control)
    x["wind supply historic"][r("outputs_energy_d61").to_s.strip] = get_data_cell_array_energy_historic_1990_to_2010 (61) # values

    # ----------------------------------------------------------------
    # wind supply projected 2011 - 2050 
    # ----------------------------------------------------------------
    x["wind supply projected"] = {}
    x["wind supply projected"]["(years)"]                    = get_data_cell_array_energy_projected_2011_2050 (57) # years (for control)
    x["wind supply projected"][r("outputs_energy_d61").to_s.strip] = get_data_cell_array_energy_projected_2011_2050 (61) # values

    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile lever graph data
  # -----------------------------------------------------------------------------------------
  def get_lever_graph_data ()
    x = {} 

    x["g_1pager_population"] 		= r ("g_1pager_population");
    x["g_1pager_urbanisation"] 		= r ("g_1pager_urbanisation");

    x["g_1pager_passenger_distance_urban_average"] 		= r("g_1pager_passenger_distance_urban_average")
    x["g_1pager_passenger_distance_rural_average"] 		= r("g_1pager_passenger_distance_rural_average")
    x["g_1pager_passenger_distance_international_average"] 	= r("g_1pager_passenger_distance_international_average")
    x["g_1pager_passenger_distance_automobilecity"] 		= r("g_1pager_passenger_distance_automobilecity")
    x["g_1pager_passenger_distance_boomingcity"] 		= r("g_1pager_passenger_distance_boomingcity")
    x["g_1pager_passenger_distance_transitcity"] 		= r("g_1pager_passenger_distance_transitcity")

    x["g_1pager_freight_distance_total_international_and_domestic"]	= r("g_1pager_freight_distance_total_international_and_domestic");
    x["g_1pager_freight_distance_domestic"]				= r("g_1pager_freight_distance_domestic");
    x["g_1pager_freight_distance_international"]			= r("g_1pager_freight_distance_international");
    x["g_1pager_freight_distance_tonne_per_person"]			= r("g_1pager_freight_distance_tonne_per_person");

    x["webtool_1pager_passenger_percent_distance_travelled_urban"]	= r("webtool_1pager_passenger_percent_distance_travelled_urban");
    x["webtool_1pager_passenger_percent_distance_travelled_rural"]	= r("webtool_1pager_passenger_percent_distance_travelled_rural");
    x["webtool_1pager_passenger_percent_distance_travelled_nonplane"]	= r("webtool_1pager_passenger_percent_distance_travelled_nonplane");
    x["g_1pager_freight_proportion_mode_domestic"]			= r("g_1pager_freight_proportion_mode_domestic");


    x["g_1pager_occupancies_urbanpassengercar"]			= r("g_1pager_occupancies_urbanpassengercar");
    x["g_1pager_occupancies_ruralpassengercar"]			= r("g_1pager_occupancies_ruralpassengercar");
    x["g_1pager_loadfactor_freight_domestic_light_truck"]	= r("g_1pager_loadfactor_freight_domestic_light_truck");
    x["g_1pager_loadfactor_freight_international_ship"]		= r("g_1pager_loadfactor_freight_international_ship");


    x["g_1pager_transport_ownership_km_per_average_car_ice"]		= r("g_1pager_transport_ownership_km_per_average_car_ice");
    x["g_1pager_transport_ownership_km_per_average_car_ice_rural"]	= r("g_1pager_transport_ownership_km_per_average_car_ice_rural");
    x["g_1pager_transport_ownership_all"]				= r("g_1pager_transport_ownership_all");

####

    x["g_1pager_freight_efficiency_domestic_light_truck_ice_liquid"] 	= r("g_1pager_freight_efficiency_domestic_light_truck_ice_liquid");
    x["g_1pager_freight_efficiency_international_plane"]		= r("g_1pager_freight_efficiency_international_plane");
    x["g_1pager_passenger_efficiencies_car_ice"]			= r("g_1pager_passenger_efficiencies_car_ice");
    x["g_1pager_passenger_efficiencies_car_electric"]			= r("g_1pager_passenger_efficiencies_car_electric");


    x["g_1pager_tech_shares_urban_passenger_bus"] 		= r("g_1pager_tech_shares_urban_passenger_bus");
    x["g_1pager_tech_shares_urban_passenger_car"] 		= r("g_1pager_tech_shares_urban_passenger_car");
    x["g_1pager_tech_shares_urban_passenger_plane_longhaul"] 	= r("g_1pager_tech_shares_urban_passenger_plane_longhaul");
    x["g_1pager_tech_shares_urban_passenger_train"] 		= r("g_1pager_tech_shares_urban_passenger_train");
    x["g_1pager_car_passenger_urban_total_h2_and_electric"]	= r("g_1pager_car_passenger_urban_total_h2_and_electric");
    x["g_1pager_tech_shares_urban_passenger_train"]		= r("g_1pager_tech_shares_urban_passenger_train");
    x["g_1pager_tech_shares_urban_light_freight_lowcarbon"]	= r("g_1pager_tech_shares_urban_light_freight_lowcarbon");

    x["g_1pager_building_size_rural"]		= r("g_1pager_building_size_rural");
    x["g_1pager_building_size_urban"]		= r("g_1pager_building_size_urban");
    x["g_1pager_building_size_residential"]	= r("g_1pager_building_size_residential");


    x["g_1pager_house_temperature_cooling_urban"]	= r("g_1pager_house_temperature_cooling_urban");
    x["g_1pager_house_temperature_heating_urban"]	= r("g_1pager_house_temperature_heating_urban");
    x["g_1pager_house_temperature_cooling_rural"]	= r("g_1pager_house_temperature_cooling_rural");
    x["g_1pager_house_temperature_heating_rural"]	= r("g_1pager_house_temperature_heating_rural");
    x["g_1pager_hotwater_demand_rural"]			= r("g_1pager_hotwater_demand_rural");
    x["g_1pager_hotwater_demand_urban"]			= r("g_1pager_hotwater_demand_urban");

    x["g_1pager_appliances_ownership_urban_refrigerators_owned"]	= r("g_1pager_appliances_ownership_urban_refrigerators_owned");
    x["g_1pager_appliances_ownership_urban"]				= r("g_1pager_appliances_ownership_urban");
    x["g_1pager_lighting_demand_urban"]					= r("g_1pager_lighting_demand_urban");
    x["g_1pager_cooking_demand_urban_kwh_per_hhd"]			= r("g_1pager_cooking_demand_urban_kwh_per_hhd");
    x["g_1pager_lighting_demand_urban"]					= r("g_1pager_lighting_demand_urban");

    x["g_1pager_house_insulation_rural"] 	= r("g_1pager_house_insulation_rural");
    x["g_1pager_house_insulation_urban"] 	= r("g_1pager_house_insulation_urban");
    x["g_1pager_house_insulation_non_res"]	= r("g_1pager_house_insulation_non_res");

    x["g_1pager_heating_technology_urban_percent_solar_or_heatpump"]	= r("g_1pager_heating_technology_urban_percent_solar_or_heatpump");
    x["g_1pager_cooling_technology_urban"]	= r("g_1pager_cooling_technology_urban");
    x["g_1pager_hot_water_technology_urban"]	= r("g_1pager_hot_water_technology_urban");
    x["g_1pager_cooking_technology_urban"]	= r("g_1pager_cooking_technology_urban");
    x["g_1pager_lighting_technology_urban"]	= r("g_1pager_lighting_technology_urban");
    x["g_1pager_heating_technology_urban"]	= r("g_1pager_heating_technology_urban");

    x["g_1pager_appliances_efficiency_urban_tv"]		= r("g_1pager_appliances_efficiency_urban_tv");
    x["g_1pager_appliances_efficiency_urban_refrigerator"]	= r("g_1pager_appliances_efficiency_urban_refrigerator");

    # Product lifespan & demand

    x["g_1pager_g30_lifespan_urbancarice"]	= r("g_1pager_g30_lifespan_urbancarice");
    x["g_1pager_g30_lifespan_urbantv"]		= r("g_1pager_g30_lifespan_urbantv");

    # Design, material switch & recycling

    x["g_1pager_g30_demandperproductdesign"]		= r("g_1pager_g30_demandperproductdesign");
    x["g_1pager_g30_demandperproductrecyclingtotal"]	= r("g_1pager_g30_demandperproductrecyclingtotal");
    x["g_1pager_g30_materialswitchtoaluminium"]		= r("g_1pager_g30_materialswitchtoaluminium");
    x["g_1pager_g30_materialswitchtoplastics"]		= r("g_1pager_g30_materialswitchtoplastics");
    x["g_1pager_g30_materialswitchtotimber"]		= r("g_1pager_g30_materialswitchtotimber");


    x["webtool_1pager_steel_alum_co2intensity"]	= r("webtool_1pager_steel_alum_co2intensity");
    x["g_1pager_g30_steeltechnologies"]		= r("g_1pager_g30_steeltechnologies");
    x["g_1pager_g30_fuel_switches_steel"]	= r("g_1pager_g30_fuel_switches_steel");
    x["g_1pager_g30_energyefficiency"]		= r("g_1pager_g30_energyefficiency");


    x["webtool_1pager_chemicals_co2intensity"]	= r("webtool_1pager_chemicals_co2intensity");
    x["g_1pager_g30_fuel_switches_chemicals"]	= r("g_1pager_g30_fuel_switches_chemicals");


    x["webtool_1pager_paper_co2intensity"]	= r("webtool_1pager_paper_co2intensity");

    x["webtool_1pager_cement_co2intensity"]	= r("webtool_1pager_cement_co2intensity");



    x["g_1pager_g30_processimprovementsasee_cement"]	= r("g_1pager_g30_processimprovementsasee_cement");
    x["g_1pager_g30_processimprovementsasee_highvaluechemicals"]	= r("g_1pager_g30_processimprovementsasee_highvaluechemicals");
    x["g_1pager_g30_processimprovementsasee_pulp"]	= r("g_1pager_g30_processimprovementsasee_pulp");
    x["g_1pager_g30_processimprovementsasee_steel"]	= r("g_1pager_g30_processimprovementsasee_steel");




    x["g_1pager_ccs_industry_summary"] 		= r("g_1pager_ccs_industry_summary");

    x["g_1pager_hydrocarbon_plants_proportion_solid_fueled"]	= r("g_1pager_hydrocarbon_plants_proportion_solid_fueled");
    x["g_1pager_hydrocarbon_plants_proportion_gas_fueled"]	= r("g_1pager_hydrocarbon_plants_proportion_gas_fueled");
    x["g_1pager_hydrocarbon_plants_proportion_liquid_fueled"]	= r("g_1pager_hydrocarbon_plants_proportion_liquid_fueled");
    x["g_1pager_hydrocarbon_proportion_slg"] 			= r("g_1pager_hydrocarbon_proportion_slg");



    x["g_1pager_solid_split_percent_ultra_and_supercritical"]	= r("g_1pager_solid_split_percent_ultra_and_supercritical");
    x["g_1pager_gas_split"]	= r("g_1pager_gas_split");
    x["g_1pager_liquid_split"]	= r("g_1pager_liquid_split");

    x["g_1pager_capacity_ccs"] 				= r("g_1pager_capacity_ccs");
    x["webtool_1pager_total_energy_produced_ccs_total"]	= r("webtool_1pager_total_energy_produced_ccs_total");

    x["g_1pager_capacity_nuclear"] 			= r("g_1pager_capacity_nuclear");
    x["g_1pager_power_watts_per_capita"]		= r("g_1pager_power_watts_per_capita");
    x["webtool_1pager_total_energy_produced_nuclear"]	= r("webtool_1pager_total_energy_produced_nuclear");

    x["g_1pager_capacity_wind_combined_offshore_and_onshore"]	= r("g_1pager_capacity_wind_combined_offshore_and_onshore");
    x["g_1pager_capacity_offshore_wind"] 			= r("g_1pager_capacity_offshore_wind");
    x["g_1pager_capacity_onshore_wind"] 			= r("g_1pager_capacity_onshore_wind");
    x["webtool_1pager_total_energy_produced_wind_total"]	= r("webtool_1pager_total_energy_produced_wind_total");

    x["g_1pager_capacity_hydroelectric"]		 	= r("g_1pager_capacity_hydroelectric");
    x["webtool_1pager_total_energy_produced_hydro"]		= r("webtool_1pager_total_energy_produced_hydro");

    x["g_1pager_capacity_marine_combined_tidal_and_wave"]	= r("g_1pager_capacity_marine_combined_tidal_and_wave");
    x["webtool_1pager_total_energy_produced_total_marine"]	= r("webtool_1pager_total_energy_produced_total_marine");

    x["g_1pager_capacity_solar_combined_pv_and_concentrated"]	= r("g_1pager_capacity_solar_combined_pv_and_concentrated");
    x["webtool_1pager_total_energy_produced_total_solar"]	= r("webtool_1pager_total_energy_produced_total_solar");


    x["g_1pager_capacity_geothermal"] 				= r("g_1pager_capacity_geothermal");
    x["webtool_1pager_total_energy_produced_geothermal"]	= r("webtool_1pager_total_energy_produced_geothermal");

    x["g_1pager_capacity_storage"] 	= r ("g_1pager_capacity_storage");

    x["g_1pager_calories"] 		= r ("g_1pager_calories");

    x["g_1pager_meat_consumption"] 	= r ("g_1pager_meat_consumption");

    x["g_1pager_meat_type_total_ruminant"]	= r("g_1pager_meat_type_total_ruminant");
    x["g_1pager_meat_type_total_nonruminant"]	= r("g_1pager_meat_type_total_nonruminant");


    x["g_1pager_percent_increase_crop_yields2"]	= r("g_1pager_percent_increase_crop_yields2");
    x["g_1pager_crop_yieldswm2"]		= r("g_1pager_crop_yieldswm2");

    x["g_1pager_land_synergies"] 		= r ("g_1pager_land_synergies");

    x["g_1pager_animals_non_intensive_cowsperha"]	= r("g_1pager_animals_non_intensive_cowsperha");
    x["g_1pager_animals_non_intensive_sheepperha"]	= r("g_1pager_animals_non_intensive_sheepperha");
    x["g_1pager_feed_conversion_nonintensive_cows"]	= r("g_1pager_feed_conversion_nonintensive_cows");
    x["g_1pager_feed_conversion_nonintensive_sheep_and_goats"]	= r("g_1pager_feed_conversion_nonintensive_sheep_and_goats");




    x["g_1pager_feed_conversion_all"]				= r("g_1pager_feed_conversion_all");
    x["g_1pager_animals_intensification_cows"]			= r("g_1pager_animals_intensification_cows");
    x["g_1pager_animals_intensification_sheep_and_goats"]	= r("g_1pager_animals_intensification_sheep_and_goats");


    x["g_1pager_bioenergy_wm2"]			= r("g_1pager_bioenergy_wm2");
    x["g_1pager_bioenergy_yield_dryt"]		= r("g_1pager_bioenergy_yield_dryt");

    x["g_1pager_bioenergy_proportion_liquid"]	= r("g_1pager_bioenergy_proportion_liquid");
    x["g_1pager_bioenergy_yield"] 		= r("g_1pager_bioenergy_yield");
    x["g_1pager_bioenergy_proportion_solid"]	= r("g_1pager_bioenergy_proportion_solid");


    x["g_1pager_landuse_all"] 			= r ("g_1pager_landuse_all");

    x["g_1pager_ggr_biochar"]			= r("g_1pager_ggr_biochar");
    x["g_1pager_ggr_direct_air_capture"]	= r("g_1pager_ggr_direct_air_capture");
    x["g_1pager_ggr_ocean_fertilisation"]	= r("g_1pager_ggr_ocean_fertilisation");
    x["g_1pager_ggr_weathering_ocean"]		= r("g_1pager_ggr_weathering_ocean");
    x["g_1pager_ggr_weathering_terrestial"]	= r("g_1pager_ggr_weathering_terrestial");

    x["g_1pager_percent_post_farm_waste_crops"]	= r("g_1pager_percent_post_farm_waste_crops");
    x["g_1pager_percent_on_farm_waste"] 	= r ("g_1pager_percent_on_farm_waste");
    x["g_1pager_food_waste_post_farm"] 		= r ("g_1pager_food_waste_post_farm"); 
    x["g_1pager_percent_post_farm_waste"] 	= r ("g_1pager_percent_post_farm_waste");

    x["g_1pager_post2050_emissions"] 		= r ("g_1pager_post2050_emissions");







=begin
    x[""]	= r("");
    x[""]	= r("");
    x[""]	= r("");
    x[""]	= r("");
    x[""]	= r("");

    # x[""]	= r("");

    x["g_1pager_modeshares_automobilecity"]		= r("g_1pager_modeshares_automobilecity");
    x["g_1pager_modeshares_boomingcity"]		= r("g_1pager_modeshares_boomingcity");
    x["g_1pager_modeshares_transitcity"]		= r("g_1pager_modeshares_transitcity");

    x["g_1pager_freight_efficiencies_domestic"] 			= r ("g_1pager_freight_efficiencies_domestic");


    x["g_1pager_hotwater_demand_rural"]			= r("g_1pager_hotwater_demand_rural");
    x["g_1pager_hotwater_demand_urban"]			= r("g_1pager_hotwater_demand_urban");


    x["g_1pager_appliances_ownership_urban"]	= r("g_1pager_appliances_ownership_urban");
    x["g_1pager_cooking_demand_urban"]		= r("g_1pager_cooking_demand_urban");






    x["g_1pager_lighting_technology_urban"] 	= r ("g_1pager_lighting_technology_urban");
    x["g_1pager_cooking_technology_urban"] 	= r ("g_1pager_cooking_technology_urban");

    x["g_1pager_appliances_efficiency_urban"] 	= r ("g_1pager_appliances_efficiency_urban");

    x["g_1pager_g30_demandperproductdesign_cement"] 		= r ("g_1pager_g30_demandperproductdesign_cement");
    x["g_1pager_g30_demandperproductdesign_steel"] 		= r ("g_1pager_g30_demandperproductdesign_steel");
    x["g_1pager_g30_demandperproductrecycling"] 		= r ("g_1pager_g30_demandperproductrecycling");
    x["g_1pager_g30_demandperproductrecycling_aluminium"] 	= r ("g_1pager_g30_demandperproductrecycling_aluminium");

    x["g_1pager_g30_energyefficiency_steel"] 		= r ("g_1pager_g30_energyefficiency_steel");
    x["g_1pager_g30_processimprovementsasee_steel"] 	= r ("g_1pager_g30_processimprovementsasee_steel");

    x["g_1pager_g30_energyefficiency_highvaluechemicals"]	 	= r ("g_1pager_g30_energyefficiency_highvaluechemicals");
    x["g_1pager_g30_processimprovementsasee_highvaluechemicals"]	= r ("g_1pager_g30_processimprovementsasee_highvaluechemicals");

    x["g_1pager_g30_energyefficiency_pulp"] 		= r ("g_1pager_g30_energyefficiency_pulp");
    x["g_1pager_g30_processimprovementsasee_pulp"] 	= r ("g_1pager_g30_processimprovementsasee_pulp");

    x["g_1pager_g30_processimprovementsasee_cement"] 	= r ("g_1pager_g30_processimprovementsasee_cement"); # ??

    x["g_1pager_ccs_industry_steel_oxygen"] 	= r ("g_1pager_ccs_industry_steel_oxygen");


    x["g_1pager_oil_prices"] 			= r ("g_1pager_oil_prices");

    x["g_1pager_solid_split"] 	= r ("g_1pager_solid_split");
    x["g_1pager_liquid_split"] 	= r ("g_1pager_liquid_split");
    x["g_1pager_gas_split"] 	= r ("g_1pager_gas_split");




    x["g_1pager_capacity_marine_tidal"] 	= r ("g_1pager_capacity_marine_tidal");
    x["g_1pager_capacity_marine_wave"] 		= r ("g_1pager_capacity_marine_wave");

    x["g_1pager_capacity_concentrated_solar"] 	= r ("g_1pager_capacity_concentrated_solar");
    x["g_1pager_capacity_solar_pv"] 		= r ("g_1pager_capacity_solar_pv");


    x["g_1pager_peak"] 			= r ("g_1pager_peak");

    x["g_1pager_crop_yields"] 		= r ("g_1pager_crop_yields");

    x["g_1pager_animals_intensification_cows"] 		= r ("g_1pager_animals_intensification_cows");
    x["g_1pager_animals_non_intensive_yields_cows"] 	= r ("g_1pager_animals_non_intensive_yields_cows");
    x["g_1pager_feed_conversion_cows"] 			= r ("g_1pager_feed_conversion_cows");
    x["g_1pager_feed_conversion_milk"] 			= r ("g_1pager_feed_conversion_milk");


    x["g_1pager_food_waste_on_farm"] 		= r ("g_1pager_food_waste_on_farm");

    x["g_1pager_landuse_forest"] 	= r ("g_1pager_landuse_forest");


    x["g_1pager_g30_energyefficiency"] 			= r ("g_1pager_g30_energyefficiency");
    x["g_1pager_g30_energyefficiency_aluminium"] 	= r ("g_1pager_g30_energyefficiency_aluminium");
    x["g_1pager_g30_energyefficiency_otherindustries"] 	= r ("g_1pager_g30_energyefficiency_otherindustries");
    x["g_1pager_g30_energyefficiency_steel_alum"] 	= r ("g_1pager_g30_energyefficiency_steel_alum");

    x["g_1pager_g30_materialswitchtoaluminium"] 	= r ("g_1pager_g30_materialswitchtoaluminium");
    x["g_1pager_g30_materialswitchtoplastics"] 		= r ("g_1pager_g30_materialswitchtoplastics");
    x["g_1pager_g30_materialswitchtotimber"]		= r ("g_1pager_g30_materialswitchtotimber");



    x["g_1pager_passenger_distance_automobilecity test"] 	= r("g_1pager_passenger_distance_automobilecity")
    x["xxx g_1pager_population"] 	= r("g_1pager_population")

=end

    return x
  end  


  # -----------------------------------------------------------------------------------------
  # compile lever descriptions 
  # -----------------------------------------------------------------------------------------
  def get_lever_descriptions ()
    x = {} 

 

    
    # new version for tooltips
    y = r('webtool_lever_overviewpage')
    s3=[]
    # id, "Lever", "Situation today",  "Level 1 bubble text", "Level 2 bubble text", "Level 3 bubble text", "Level 4 bubble text"
    (1..59).each do |n|
      s3  << [ n, y[n][0],  y[n][2], y[n][6], y[n][7], y[n][8], y[n][9]] 
    end

    x["tooltips"] = s3



    x["ggr levers"] = {}
    x["ggr levers"][r("detailed_lever_guides_b73").to_s.strip] = [r("detailed_lever_guides_c73").to_s, r("detailed_lever_guides_d73").to_s, r("detailed_lever_guides_e73").to_s, r("detailed_lever_guides_h73").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b74").to_s.strip] = [r("detailed_lever_guides_c74").to_s, r("detailed_lever_guides_d74").to_s, r("detailed_lever_guides_e74").to_s, r("detailed_lever_guides_h74").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b75").to_s.strip] = [r("detailed_lever_guides_c75").to_s, r("detailed_lever_guides_d75").to_s, r("detailed_lever_guides_e75").to_s, r("detailed_lever_guides_h75").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b76").to_s.strip] = [r("detailed_lever_guides_c76").to_s, r("detailed_lever_guides_d76").to_s, r("detailed_lever_guides_e76").to_s, r("detailed_lever_guides_h76").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b77").to_s.strip] = [r("detailed_lever_guides_c77").to_s, r("detailed_lever_guides_d77").to_s, r("detailed_lever_guides_e77").to_s, r("detailed_lever_guides_h77").to_s] 


    x["ggr levers"][r("detailed_lever_guides_b78").to_s.strip] = [r("detailed_lever_guides_c78").to_s, r("detailed_lever_guides_d78").to_s, r("detailed_lever_guides_e78").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b79").to_s.strip] = [r("detailed_lever_guides_c79").to_s, r("detailed_lever_guides_d79").to_s, r("detailed_lever_guides_e79").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b70").to_s.strip] = [r("detailed_lever_guides_c70").to_s, r("detailed_lever_guides_d70").to_s, r("detailed_lever_guides_e70").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b71").to_s.strip] = [r("detailed_lever_guides_c71").to_s, r("detailed_lever_guides_d71").to_s, r("detailed_lever_guides_e71").to_s] 
    x["ggr levers"][r("detailed_lever_guides_b72").to_s.strip] = [r("detailed_lever_guides_c72").to_s, r("detailed_lever_guides_d72").to_s, r("detailed_lever_guides_e72").to_s] 





   y = r("webtool_lever_guides")

    s2=[]
      # ["Lever", "Code", "Situation today", "Chosen level description", "Energy supply / demand from choice by 2050", "Interactions with other levers", "Level 1 bubble text", "Level 2 bubble text", "Level 3 bubble text", "Level 4 bubble text", "Note", "Lever", "Question for key number", "Metric - key unit", "Metric - 2011", "Metric - L1", "Metric - L2", "Metric - L3", "Metric - L4", "Lever controls", "One-pager context", "Things to consider", "1-pager Level 1", "1-pager Level 2", "1-pager Level 3", "1-pager Level 4"], 

    # ==> [id, "Lever", "Situation today", "Interactions with other levers", "One-pager context", "Things to consider", "1-pager Level 1", "1-pager Level 2", "1-pager Level 3", "1-pager Level 4"], 

   (0..59).each do |n|
      s2  << [ n, y[n][0],  y[n][2], y[n][5], y[n][20], y[n][21], y[n][22], y[n][23], y[n][24], y[n][25]] 
    end

    x["descriptions"] = s2



    return x
  end  

  def get_lever_onepagers ()

   y1 = r("webtool_lever_guides")   # to get the lever name
   y  = r("webtool_lever_1pagers")


# ==> [id, levername, "Lever controls", "One-pager context", "Things to consider", "1-pager Level 1", "1-pager Level 2", "1-pager Level 3", "1-pager Level 4",  "References", "Extra text"]

   x = {} 
   s=[]
   (0..59).each do |n|
      s  << [ n, y1[n][0], y[n][0], y[n][1], y[n][2], y[n][3], y[n][4], y[n][5], y[n][6], y[n][7], y[n][8]] 
    end

   x["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"] = s

  end  

  # -----------------------------------------------------------------------------------------
  # compile sankey data
  # -----------------------------------------------------------------------------------------
  def get_sankey_data  ()

    y = r("webtool_sankey_detailed")
    
    s=[]
    (2..382).step(2) do |n|
      s  << [ y[n][1].strip,  y[n][27], y[n][3].strip ] # from, value for 2050, to
    end

    x = r("webtool_sankey_simple")
    return s
  end


  def get_simple_sankey_data  ()

    y = r("webtool_sankey_simple")
   
    s=[]
    (2..120).step(2) do |n|
      s  << [ y[n][1].strip,  y[n][27], y[n][3].strip ] # from, value for 2050, to
    end

    return s



  end


  def getCosts()


    # ----------------------------------------------------------------
    # aggregated costs (low, point, high)
    # ----------------------------------------------------------------

    x = {}
    x["costs total low"]  = r("webtool_total_real_undiscounted_low_withfinance")
    x["costs total"]      = r("webtool_total_real_undiscounted_point_withfinance") # point
    x["costs total high"] = r("webtool_total_real_undiscounted_high_withfinance")



    y = r("webtool_capex_opex")
    (1..5).each do |n|
      x[ y[n][0].strip ] = [ y[n][3], y[n][4], y[n][5] ]
    end
    y = r("webtool_fuels")
    x["Fuels"]          = [ y[1][3], y[1][4], y[1][5] ]


    y = r("webtool_costs_total_range")
    x["Costs total range ts"] = {}
    (1..3).each do |n|
      x["Costs total range ts"][ y[n][0] ] = y[n][7..15]
    end

    y = r("webtool_cost_time_series_point")
    x["Costs split ts point"] = {}
    (1..4).each do |n|
      x["Costs split ts point"][ y[n][0] ] = y[n][7..15]
    end

    y = r("webtool_cost_time_series_low")
    x["Costs split ts low"] = {}
    (1..4).each do |n|
      x["Costs split ts low"][ y[n][0] ] = y[n][7..15]
    end

    y = r("webtool_cost_time_series_high")
    x["Costs split ts high"] = {}
    (1..4).each do |n|
      x["Costs split ts high"][ y[n][0] ] = y[n][7..15]
    end

   y = r("webtool_gdp_to_2050")
   x["gdp"] = {}
   x["gdp"]["years"] = y[0][7..15]
   x["gdp"]["gdp"]   = y[1][7..15]

  #  x["webtool_technology_costs_high_real_undiscounted_finance"] = r("webtool_technology_costs_high_real_undiscounted_finance")
  #  x["webtool_technology_costs_low_real_undiscounted_finance"] = r("webtool_technology_costs_low_real_undiscounted_finance")
  #  x["webtool_technology_costs_point_real_undiscounted_finance"] = r("webtool_technology_costs_point_real_undiscounted_finance")

    
    # x["XXXXXXXXX webtool_cost_index_gdp"] = r("webtool_cost_index_gdp")
    # x["XXXXXXXXX webtool_costs_indexed_cost_type"] = r("webtool_costs_indexed_cost_type")

    y = r("webtool_cost_index_gdp")
    x["GDP indexed"] = {} # "High indexed (non-amortised)"
    x["GDP indexed"]["years"] = y[0][7..15]
    x["GDP indexed"][y[1][0].strip] = y[1][7..15]


    y = r("webtool_costs_indexed_cost_type")
    x[y[0][0].strip] = {} # "High indexed (non-amortised)"
    x[y[0][0].strip]["years"] = y[2][8..16]
    (3..6).each do |n|
      x[y[0][0].strip][ y[n][1] ] = y[n][8..16]
    end

    x[y[10][0].strip] = {} # "Point indexed (non-amortised)"
    x[y[10][0].strip]["years"] = y[12][8..16]
    (13..16).each do |n|
      x[y[10][0].strip][ y[n][1] ] = y[n][8..16]
    end

    x[y[20][0].strip] = {} # "Low indexed (non-amortised)"
    x[y[20][0].strip]["years"] = y[22][8..16]
    (23..26).each do |n|
      x[y[20][0].strip][ y[n][1] ] = y[n][8..16]
    end

    y = r("webtool_costs_indexed_by_sector")
    x[y[0][0].strip] = {} # "Transport indexed (capex + opex, non-amortised)"
    (2..5).each do |n|
      x[y[0][0].strip][ y[n][1] ] = y[n][8..16]
    end

    x[y[10][0].strip] = {} # "Buildings indexed (capex + opex, non-amortised)"
    (12..15).each do |n|
      x[y[10][0].strip][ y[n][1] ] = y[n][8..16]
    end

    x[y[20][0].strip] = {} # "Manufacturing indexed (capex + opex, non-amortised)"
    (22..25).each do |n|
      x[y[20][0].strip][ y[n][1] ] = y[n][8..16]
    end

    x[y[30][0].strip] = {} # "Power indexed (capex + opex, non-amortised)"
    (32..35).each do |n|
      x[y[30][0].strip][ y[n][1] ] = y[n][8..16]
    end

    y = r("webtool_costs_as_percent")
    x["webtool_costs_as_percent"] = {}
    (0..3).each do |n|
      x["webtool_costs_as_percent"][y[n][0].strip] = [ y[n][7], y[n][15]]
    end

    y = r("webtool_cumulative_gdp_and_energy_costs")
    x["webtool_cumulative_gdp_and_energy_costs"] = {}
#    x["webtool_cumulative_gdp_and_energy_costs"]["yyyyyyyyyyyy"] = y
    x["webtool_cumulative_gdp_and_energy_costs"][y[0][3].strip] = y[1][3] # "GDP"
    x["webtool_cumulative_gdp_and_energy_costs"][y[0][4].strip] = y[1][4] # "Energy costs"
    

    return x
  end



  def getCFP (col)
    s = []
    (7..55).each do |row|
      s  << r("user_inputs_#{col}#{row}")
    end
    return s;
  end

  def getCFPs()
    x = {}
    x["W"] = {}
    y = r("webtool_example_pathways")

#=begin

    # --------------------------------------------------------------------------------
    # ATTENTION: assumes the last entry in the named range is nil, so we ignore it
    # --------------------------------------------------------------------------------
    (0..y[0].length-2).each do |col|
#    (0..23).each do |col|
      x["W"] [ y[0][col] ] = []

      (1..59).each do |row|
         x["W"][ y[0][col]  ]  << y[row][col]
      end

    end
#=end

#    x["YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY ARRAY"] = y    
#    x["YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY ARRAY [0] LENGTH INFO"] = y[0].length    
#    x["YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY ARRAY LENGTH INFO"] = y.length    

   return x

  end


  def get_lever_values_from_spreadsheet()
    s = [] 
    (7..62).each do |row|
      s << r("user_inputs_e#{row}")
    end
    return s
  end


  def get_lever_values_from_spreadsheet_detailed()

    s = [] 
    (7..62).each do |row|
      s << [r("user_inputs_d#{row}"), r("user_inputs_e#{row}")]
    end
    return s

  end


end

if __FILE__ == $0

   puts "\n\n\n\n\n\n---------------------"
   puts "******************************************************************************************************"
   puts "*"
   puts "*"
   puts "*  MW global_2050_model Global2050ModelResult V22 test start"
   puts "*"
   puts "*"
   puts "*  interfacing DECC C program from 19 Dec 2014 (spreadsheet v.3.92.22)"
   puts "*"
   puts "*"
   puts "******************************************************************************************************"


   g = Global2050ModelResult.new

=begin

 puts "extractWhatsInAtStart: "
 a = []
 a = g.extractWhatsInAtStart
 puts "---------------------"
 puts a
 puts "---------------------"
=end

   a = []
   # a << g.calculate_pathway_plus_setup_v22("111111111223334443BBBBBD33D4BBBBBB223334ji11111431111111111"); # 51 + 1 + 7
   a << g.calculate_pathway_v22("22njmeo11mglccc1bi1jg42m4hcjdceh444in22oDt11111hf2211111111"); # 51 + 1 + 7

                                                            
   puts "---------------------"
   puts a
   puts "---------------------"
   puts "\n\n MW global_2050_model-2.0 Global2050ModelResult V22 test end"
   puts "---------------------"



end
