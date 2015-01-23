/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved
 *
 * *********************************************************
 */


// ***********************************************************
//                                                           *
// GGR                                                       *
//                                                           *
// ***********************************************************

function initGGRCharts () {


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // GGR: ghg emissions chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_ggr_ghg_emissions = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_ggr_1',
          //  type: 'area',
            marginRight:20
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
  	    text: 'Global GHG emissions profile'
        },
        subtitle: {
            style: {
                font: 'normal 9px "Trebuchet MS", Verdana, sans-serif'
            },
         text: '---'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          line: {
            marker: {
                enabled: false
            }
          }
        },
        xAxis: {
          min: 1990,
          //max: 2100,
          tickInterval: 5,

          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2050') return this.value;
               if (this.value == '2100') return this.value;
               return '';
             }
          }
        },

        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'GtCO2e',
            margin: 5
          },
          min: -25,
          max: 125, //300,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          // valueSuffix: ' GtCO2e',
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (GtCO2e)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
          name: 'Total annual GHG emissions',
          data: [ [1990, 5], [1995, 5], [2000, 5], [2005, 5], [2010, 5], [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], 
                  [2040, 10], [2045, 10], [2050, 10] ],
          color: '#bdbdbd',
          marker: { radius: 2 }
         }, 
         {
          name: 'Total annual GHG emissions (trajectory)',
          data: [ [2050, 10],  [2055, 10], [2060, 10], [2065, 10], [2070, 10], [2075, 10], [2080, 10], [2085, 10], [2090, 10], [2095, 10], [2100, 10]  ],
          color: '#dddddd',
          dashStyle: 'ShortDot',
          marker: { radius: 2 }
         },
         {
          name: 'Total annual GHG emissions without GGR',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#3288bd',
          type: 'line',
          dashStyle: 'ShortDot',
          marker: { radius: 2 }
         }
         
        ]

    }, function(chart) {
        
       // ------------------------------------------------------------------------
       // add vertical separator line between observed and projected time series
       // ------------------------------------------------------------------------
       var x = chart.xAxis[0].toPixels(2010);
       var y  = chart.yAxis[0].toPixels(125);

       var y1  = chart.yAxis[0].toPixels(0);
       var x1 = chart.xAxis[0].toPixels(1990);
       var x2 = chart.xAxis[0].toPixels(2100);

       chart.renderer.path(['M', x1, y1, 'L', x2, y1])
         .attr({'stroke-width': 1, stroke: 'grey' }).add();


       chart.renderer.path(['M', x, y, 'L', x, 280])
         .attr({'stroke-width': 1, stroke: 'silver', dashstyle: 'dash' }).add();

       chart.renderer.text('observed', x-45, 60)
         .css({ color: '#C0C0C0', fontSize: '9px'}).add();

       chart.renderer.text('projected', x+12, 60)
         .css({ color: '#C0C0C0', fontSize: '9px' }).add();

    });




} // end initGGRCharts ()


// ***********************************************************
//                                                           *
// Costs                                                     *
//                                                           *
// ***********************************************************

function initCostOverviewCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // Cost section: Cost range chart (overview)
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_costs_context = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_costs_in_context',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Total energy system costs'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: { marker: { enabled: false } }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'index (2011 = 100)',
            margin: 5
          },
          min: 0,
          max: 400, 
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          valueSuffix: '',
          positioner: function () {
            return { x: 15, y: 30 };
          }
/*
          useHTML: true,
          headerFormat: '{point.key}' + ' ($bn)<br>' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
*/  
       },

        series: [
         {
          name: 'GDP',
          data: [ [2011, 4], [2015, 4], [2020, 4], [2025, 4], [2030, 4], [2035, 4], [2040, 4], [2045, 4], [2050, 4] ],
          color: '#ffffff', // '#c51b8a', // '#f03b20',
          dashStyle: 'ShortDot',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'User pathway (central)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#d95f0e',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'User pathway (low/high)',
          data: [ [2011, 2,4], [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          color:  '#ffff33', // '#ffff00', // '#b30000', // '#74a9cf',
          type: 'arearange',
          fillOpacity: 0.7,
          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }, {
          name: 'Counterfact. pathway (central)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#0570b0', // '#253494', // '#f781bf', // '#f0027f', //'#984ea3', // '#92c5de', // '#2b8cbe',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'Counterfact. pathway (low/high)',
          data: [ [2011, 2,4], [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          color: '#74a9cf', // '#2c7fb8', // '#2b83ba', //'#fec44f',
          type: 'arearange',
          fillOpacity: 0.7,
          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }        
        ]
    });

}


function createCostIndexChart (containerID, title) {

    var chart = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           renderTo: containerID,
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: title
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: { marker: { enabled: false } }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'index (2011 = 100)',
            margin: 5
          },
          min: 0,
          max: 500, 
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          valueSuffix: '',
          positioner: function () {
            return { x: 15, y: 30 };
          }
/*
          useHTML: true,
          headerFormat: '{point.key}' + ' ($bn)<br>' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
*/  
        },

        series: [
         {
          name: 'User pway (central)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          // color: '#2b8cbe',
          color: '#d95f0e',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'User pway (low/high)',
          data: [ [2011, 2,4], [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          type: 'arearange',
          // color: '#74a9cf',
          // fillOpacity: 0.4,
          color:  '#ffff33',
          fillOpacity: 0.7,
          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }, {
          name: 'Counterf. pway (central)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          // color: '#d95f0e',
          color: '#0570b0', // '#253494', // '#f781bf', // '#f0027f', //'#984ea3', // '#92c5de', // '#2b8cbe',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'Counterf. pway (low/high)',
          data: [ [2011, 2,4], [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          type: 'arearange',
          color: '#74a9cf', // '#2c7fb8', // '#2b83ba', //'#fec44f',
          // fillOpacity: 0.2,
          fillOpacity: 0.7,


          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }        
        ]
    });

  return chart;
}

function createCostIndexChart2015 (containerID, title) {

    var chart = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           renderTo: containerID,
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: title
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: { marker: { enabled: false } }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2015') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'index (2011 = 100)',
            margin: 5
          },
          min: 0,
          max: 500, 
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          valueSuffix: '',
          positioner: function () {
            return { x: 15, y: 30 };
          }
/*
          useHTML: true,
          headerFormat: '{point.key}' + ' ($bn)<br>' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
*/  
        },

        series: [
         {
          name: 'User pway (central)',
          data: [  [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          // color: '#2b8cbe',
          color: '#d95f0e',
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'User pway (low/high)',
          data: [  [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          type: 'arearange',
          // color: '#74a9cf',
          // fillOpacity: 0.4,
          color:  '#ffff33',
          fillOpacity: 0.7,
          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }, {
          name: 'Counterf. pway (central)',
          data: [  [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          // color: '#d95f0e',
          color: '#f781bf', 
          zIndex: 3,
          marker: { radius: 2 }
         }, {
          name: 'Counterf. pway (low/high)',
          data: [  [2015, 2,4], [2020, 2,4], [2025, 2,4], [2030, 2,4], [2035, 2,4], [2040, 2,4], [2045, 2,4], [2050, 2,4] ],
          type: 'arearange',
          // color: '#fec44f',
          // fillOpacity: 0.2,
          color: '#2c7fb8',
          fillOpacity: 0.7,
          tooltip: { formatter: function () { return false; }},
          lineWidth: 0
         }        
        ]
    });

  return chart;
}




function initCostCharts () {

    chart_costs_split_capital     = createCostIndexChart ('container_costs_capital',   'Energy system costs<br>(capital)');
    chart_costs_split_operational = createCostIndexChart ('container_costs_operating', 'Energy system costs<br>(operating)');
    chart_costs_split_fuel        = createCostIndexChart ('container_costs_fuel',      'Energy system costs<br>(fuel)');


    chart_costs_split_bar = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_costs_bar',
            type: 'column'
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
            text: 'Energy system costs'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2011 global avg', '2050 user pathway', '2050 counter-fact.']
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: { fontSize: '9px', fontWeight: 'normal' },
            text: '%',
            margin: 5
          },
          min: 0,
          max: 100,
          tickInterval: 10
        },
        tooltip: {
          shared: true,
          // valueSuffix: ' calories',
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          // positioner: function () { return { x: 15, y: 30 }; },
          useHTML: true,
          headerFormat: '{point.key}' + ' (%)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        plotOptions: {
          column: { stacking: 'normal' }
        },
        series: [
        {
          name: 'Capital',
          color: '#ff7f00',
          data: [null, null, null]
        }, {
          name: 'Operating',
          color: '#a6cee3',
          data: [null, null, null]
        }, {
          name: 'Fuel',
          color: '#1f78b4',
          data: [null, null, null]
        }
      ]
    });




} // end initCostCharts ()


function initCostBySectorCharts () {

    chart_costs_split_electricity   = createCostIndexChart ('container_costs_electricity',   'Electricity energy system<br>costs (op. & capital)');
    chart_costs_split_transport     = createCostIndexChart ('container_costs_transport',     'Transport energy system<br>costs (op. & capital)');
    chart_costs_split_manufacturing = createCostIndexChart ('container_costs_manufacturing', 'Manufact. energy system<br>costs (op. & capital)');
    chart_costs_split_buildings     = createCostIndexChart ('container_costs_buildings',     'Buildings energy system<br>costs (op. & capital)');

}

/*

function initCostBySectorChartsOLDSTUFF () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // Cost section: Cost by sector chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_costs_compare = new Highcharts.Chart({
    
        credits: { enabled: false },
        chart: {
           renderTo: 'container_costs_1',
           marginRight:10,
           marginLeft:80,
          type: 'bar'
        },
        title: {
          style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
          text: 'Difference in sector costs' // 'Incremental energy system costs compared to counterfactual'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: { marker: { enabled: false } }
        },
        xAxis: {
          categories: ['total costs', '', 
                       "a", "b", "c", "d"],
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            // enabled: false
            style: {
   	      fontSize: '9px'
       	    }
          },
          minorTickLength: 0,
          tickLength: 0,
           title: {
            style: {
   	      fontSize: '9px'
       	    },
            text: null
          }
        },
        yAxis: {
          tickInterval: 5000,
          min: -20000,
          max:  20000,
          title: {
            text: '$bn',
            style: {
   	      fontSize: '9px'
       	    },
            align: 'high'
          }
        },
        tooltip: {
         shared: true,
          style: {
 	    fontSize: '9px',
      	    padding: '8px'
      	  },

          positioner: function () {
            return { x: 15, y: 30 };
          },

          // valueSuffix: ' $tn',
          useHTML: true,
          headerFormat: '{point.key}' + ' ($bn)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          // '<td style="text-align: right">{point.y}</td></tr>' + {this.points[0].y} + " " + {this.points[1].y,
          footerFormat: '</table>'
        },
        plotOptions: {
          bar: {
            grouping: false,
            shadow: false
          }
        },
        series: [
           {
             name: 'Point cost range',
             color:  '#c7e9b4',
             borderColor: '#303030', 
             data: [0, 0, 0, 0, 0, 0]
           }
          ]
         });
    
} // end initCostCharts ()

*/


// ***********************************************************
//                                                           *
// Lifestyle - HOMES: TEMP. AND SIZE                         *
//                                                           *
// ***********************************************************

function initHomeTempAndSizeCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Home Temp. and size section: avg home temp in summer
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_home_temp_summer = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_home_temp_summer',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Avg urban home temperature - summer'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '°C',
            margin: 5
          },
          min: 0,
          max: 30, 
          tickInterval: 5
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
        useHTML: true,
        headerFormat: '{point.key}' + ' (°C)' + '<table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                     '<td style="text-align: right">{point.y}</td></tr>',
        footerFormat: '</table>'
       },
        series: [
        {
          name: 'Avg urban home temp.',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
        ]
    });
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Home Temp. and size section: avg home temp in winter
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_home_temp_winter = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_home_temp_winter',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Avg urban home temperature - winter'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '°C',
            margin: 5
          },
          min: 0,
          max: 30, 
          tickInterval: 5
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
        useHTML: true,
        headerFormat: '{point.key}' + ' (°C)' + '<table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                     '<td style="text-align: right">{point.y}</td></tr>',
        footerFormat: '</table>'
       },
        series: [
        {
          name: 'Avg urban home temp.',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
        ]
    });
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Home Temp. and size section: avg size
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_home_size = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_home_size',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Avg household size (m2)'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'm2',
            margin: 5
          },
          min: 0,
          max: 110, 
          tickInterval: 10
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
        useHTML: true,
        headerFormat: '{point.key}' + ' (m2)' + '<table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                     '<td style="text-align: right">{point.y}</td></tr>',
        footerFormat: '</table>'
       },
        series: [
        {
          name: 'Avg household size',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#ffffb3',
          marker: { radius: 2 }
        }        
        ]
    });
}

// ***********************************************************
//                                                           *
// Lifestyle - HOMES: APPLIANCES                             *
//                                                           *
// ***********************************************************

function initHomeAppliancesCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Appliances section: number of appliances per household
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
  chart_number_of_appliances = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_number_of_appliances',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Appliances per household'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'number',
        margin: 5
      },
      min: 0,
      max: 11, 
      tickInterval: 1
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + '' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [3.3, 3.3]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [3.3, 3.3]
    }
    ]
  });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Appliances section: number of lightbulbs per household
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_number_of_lightbulbs = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_number_of_lightbulbs',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Number of lightbulbs per household'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max: 40, 
          tickInterval: 5
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
        {
          name: 'Urban',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#8dd3c7',
          marker: { radius: 2 }
        }, {
          name: 'Rural',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#ffffb3',
          marker: { radius: 2 }
        }        
        ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Appliances section: energy consumption per household
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_energy_consumption_per_household = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_energy_consumption',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Energy consumption per household'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'kwh',
            margin: 5
          },
          min: 0,
          max: 12000, 
          tickInterval: 1000
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (kwh)' + '<table>',
          pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
        {
          name: 'Urban',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#8dd3c7',
          marker: { radius: 2 }
        }, {
          name: 'Rural',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#ffffb3',
          marker: { radius: 2 }
        }        
        ]
    });
}



// ***********************************************************
//                                                           *
// Lifestyle - TRAVEL: TRAVEL PER PERSON                     *
//                                                           *
// ***********************************************************

function initTravelSectionCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Travel/ Travel per person section: distance travelled by car per person
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_distance_travelled_by_car = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_distance_travelled_by_car',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Distance travelled by car per person'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'km',
            margin: 5
          },
          min: 0,
          max: 8000, 
          tickInterval: 1000
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (km)' + '<table>',
          pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
        {
          name: 'Average',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
        ]
    });

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Travel/ Travel per person section: % of km travelled by car
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_percent_km_travelled_by_car = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_percent_km_travelled_by_car',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: '% of km travelled by car'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '%',
            margin: 5
          },
          min: 0,
          max: 70, 
          tickInterval: 10
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (%)' + '<table>',
          pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
        {
          name: 'Average',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
        ]
    });

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Travel section: cars per person
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_cars_per_person = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_lifestyle_cars_per_person',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Cars per person'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max: 0.5, 
          tickInterval: 0.05
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat:  '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
        {
          name: 'Average',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
        ]
    });
}








function initTravelPerPersonCharts () {

  chart_lifestyle_1 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_1',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Passenger km/head'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'km',
        margin: 5
      },
      min: 0,
      max: 12000, 
      tickInterval: 3000
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (km/head)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });


  chart_lifestyle_2 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_2',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Passenger km using cars'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: '%',
        margin: 5
      },
      min: 0,
      max: 100, 
      tickInterval: 25
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (km)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });

}


function initHomeTemperatureAndSizeCharts () {

  chart_lifestyle_3 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_3',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Building size'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'm2',
        margin: 5
      },
      min: 0,
      max: 120, 
      tickInterval: 30
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (m2)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });

  chart_lifestyle_5 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_5',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Building temperature warm months'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'deg C',
        margin: 5
      },
      min: 0,
      max: 30, 
      tickInterval: 10
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (deg C)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });


  chart_lifestyle_6 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_6',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Building temperature cold months'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'deg C',
        margin: 5
      },
      min: 0,
      max: 30, 
      tickInterval: 10
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (deg C)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });

}


function initAppliancesCharts () {

  chart_lifestyle_4 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_4',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Appliances per household'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: 'number',
        margin: 5
      },
      min: 0,
      max: 10, 
      tickInterval: 2
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + '' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });



  chart_lifestyle_7 = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_lifestyle_chart_7',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Population'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: '%',
        margin: 5
      },
      min: 0,
      max: 100, 
      tickInterval: 25
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (km/head)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Urban',
      color: '#8dd3c7',
      data: [50, 50]
    }, {
      name: 'Rural',
      color: '#ffffb3',
      data: [50, 50]
    }
    ]
  });

}



// ***********************************************************
//                                                           *
// Dashboard                                                 *
//                                                           *
// ***********************************************************


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: init emission chart modus default
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------


function initEmissionChartDefault (container) {

    chart_dashboard_ghg_emissions = new Highcharts.Chart({

        //loading: { labelStyle: { color: 'white' }, style: {backgroundColor: 'grey'} },

        credits: {
           enabled: false
        },
        chart: {
            renderTo: container, // 'container_dashboard_ghg_emissions',
            type: 'area',
            marginRight:20
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
  	    text: 'Global GHG emissions profile'
        },
        subtitle: {
            style: {
                font: 'normal 9px "Trebuchet MS", Verdana, sans-serif'
            },
         text: '---'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
            scatter: {
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '3.010 GT cumulative CO2e<br>exceeded by: {point.x}'
                }
            },
          line: {
            lineWidth: 2,
            marker: {
                enabled: false
            }
          },
          area: {
           stacking: 'normal',
            lineWidth: 0,
            marker: {
              enabled: false
            }
          }
        },
        xAxis: {
          min: 1990,
          max: 2100,
          tickInterval: 5,

          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2050') return this.value;
               if (this.value == '2100') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'GtCO2e',
            margin: 5
          },
          min: -25, // -50,
          max: 125, //300,
          tickInterval: 25
        },
        tooltip: {

          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          // valueSuffix: ' GtCO2e',
          positioner: function () {
            return { x: 190, y: 50 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (GtCO2e)<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [ {
          name: 'dummy data',
          stacking: null,
          data: [ [1990,  5], [1995,  5], [2000,  5], [2005,  5], [2010,  5], [2011, 10], [2015, 10], [2020, 10], [2025, 10], 
                  [2030, 10], [2035, 10], [2040, 10], [2045, 10],  [2050, 10] ],
          color: '#bdbdbd'
         } ]
    }, 
   function(chart) {
     
       var ren = this.renderer;
       // ------------------------------------------------------------------------
       // add vertical separator line between observed and projected time series
       // ------------------------------------------------------------------------
       var point = chart.series[0].data[5];

        // var x = point.plotX + chart.plotLeft - point.plotW; 
        
       var y1  = chart.yAxis[0].toPixels(0);
       var x1 = chart.xAxis[0].toPixels(1990);
       var x2 = chart.xAxis[0].toPixels(2100);

       chart.renderer.path(['M', x1, y1, 'L', x2, y1])
         .attr({'stroke-width': 1, stroke: 'silver'}).add();

       var x = chart.xAxis[0].toPixels(2010);
       var y = chart.yAxis[0].toPixels(125);

       ren.path(['M', x, y, 'L', x, 280])
         .attr({'stroke-width': 1, stroke: 'silver', dashstyle: 'dash'}).add();

       ren.text('observed', 78-3-6, 60)
         .css({color: '#C0C0C0', fontSize: '9px'}).add();

       ren.text('projected', 128, 60)
         .css({color: '#C0C0C0', fontSize: '9px'}).add();
    });
}









function initDashboardCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: energy demand chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_dashboard_energy_demand = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
            renderTo: 'container_dashboard_energy_demand',
            marginLeft:5,
            type: 'column'
        },
        title: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            text: 'Final energy'
        },
        subtitle: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            text: 'demand'
        },
        legend: {
            enabled: false,
            align: 'right',
            verticalAlign: 'middle',
            width:130,
            y: 20,
            padding:7,
            itemStyle: { fontSize: '10px' }
        },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2011', '2050']
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            enabled: false,
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          labels : { enabled: false },
          min: 0,
          max: 2000, 
          tickInterval: 250
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {  return { x: 5, y: 30 }; },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'

        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              // enabled: true,
              // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
          }
        },
        series: [
/*
        {
          name: 'Losses',
          color: 'rgba(200, 200, 200, 0.3)', // '#bababa',
          // borderColor: 'white',
          // dashStyle: 'dot',
          data: [50, 50]
        }, 
*/
        {
          name: 'Manufactur.',
          color: '#8dd3c7',
          data: [50, 50]
        }, {
          name: 'Transport',
          color: '#ffffb3',
          data: [50, 50]
        }, {
          name: 'Buildings',
          color: '#bebada',
          data: [50, 50]
        }, {
          name: 'Other',
          color: '#fb8072',
          data: [50, 50]
        }, {
          name: 'GGR',
          color: '#80b1d3',
          data: [50, 50]
        }
        ]
    });






    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: energy supply chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_dashboard_energy_supply = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
            renderTo: 'container_dashboard_energy_supply',
            type: 'column'
            // marginLeft:52,
            // marginTop:50,
            // marginBottom:20,
            // marginRight:140,
            // marginLeft:40,
            // zoomType: 'y'
        },
        title: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            text: 'Primary energy'
        },
        subtitle: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            text: 'supply'
        },
        legend: {
            enabled: false,
            align: 'right',
            verticalAlign: 'middle',
            width:130,
            y: 20,
            padding:7,
            itemStyle: { fontSize: '10px' }
        },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2011', '2050']
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 2000, 
          tickInterval: 250
        },

      tooltip: {
          shared: true,
          //valueSuffix: ' EJ',
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 5, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',

          footerFormat: '</table>'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              // enabled: true,
              // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
          }
        },
        series: [{
          name: 'Nuclear',
          color: '#e41a1c',
          data: [50, 50]
        }, {
          name: 'Heat',
          color: '#ff7f00',
          data: [50, 50]
        }, {
          name: 'Renewables',
          color: '#4daf4a',
          data: [50, 50]
        }, {
          name: 'Fossil fuel',
          color: '#377eb8',
          data: [50, 50]
        }
       ]
    });




    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: ghg emissions chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    initEmissionChartDefault ('container_dashboard_ghg_emissions');

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: co2 budget chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_dashboard_co2_budget = new Highcharts.Chart({
      credits: { enabled: false},
      chart: {
        renderTo: 'container_dashboard_co2_budget',
        spacingLeft:   4,
        spacingRight:  4,
        spacingBottom: 4,
        backgroundColor :'#191919'
      },
      title: {
        style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
        // text: '2°C\nCO2 budget'
        text: 'Cum. emissions\nto 2100'
      },
      legend: { enabled: false },
      exporting: { enabled: false},
      xAxis: {
        categories: ['2100'],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
          style: {
            fontSize: '9px',
            fontWeight: 'normal'
          },
          text: '',
          margin: 5
        },
        min: -2,
        max:  8,
        tickInterval: 1,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      tooltip: {
        shared: true,
        style: {
         fontSize: '9px',
         padding: '8px'
        },
        positioner: function () { return { x: 2, y: 10 }; }
        },
      plotOptions: {
        column: {
          borderWidth: 0,
          shadow: false
        }
      },
      series: [
      {
        name: 'Uncertainty',
        enabled: false,
        data: [ [2011, -999]],
        color: '#191919', //'#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
        tooltip: {
          useHTML: true,
          headerFormat: 'Cumul. emissions<br>to 2100:<br>',
          pointFormat: '<span style="font-weight: normal; color: orange">{point.y} GT CO2</span><br>= Your pathway<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">3,010 GT CO2</span><br>= 50% chance<br>of 2°C<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">2,260 GT CO2</span><br>= 50% chance<br>of 1.5°C'
/*
          pointFormat: '<span style="font-weight: normal; color: orange">3,010 GT</span><br>cumul. CO2 <br>emissions give<br>a 50% chance<br>to stay below<br>a 2°C mean<br>temperature<br>increase<br>-<br><span style="font-weight: normal; color: orange">Your pathway:</span><br><span style="font-weight: normal; color: orange">{point.y} GT</span><br>cumulative<br>CO2 emissions<br>by 2100'
*/
        }
      }
      ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // climate: co2 budget chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_cc_co2_budget = new Highcharts.Chart({
      credits: { enabled: false},
      chart: {
        renderTo: 'container_cc_co2_budget',
        spacingLeft:   4,
        spacingRight:  4,
        spacingBottom: 4,
        backgroundColor :'#191919'
      },
      title: {
        style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
        // text: '2°C\nCO2 budget'
        text: 'Cum. emissions\nto 2100'
      },
      legend: { enabled: false },
      exporting: { enabled: false},
      xAxis: {
        categories: ['2100'],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
          style: {
            fontSize: '9px',
            fontWeight: 'normal'
          },
          text: '',
          margin: 5
        },
        min: -2,
        max:  8,
        tickInterval: 1,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      tooltip: {
        shared: true,
        style: {
         fontSize: '9px',
         padding: '8px'
        },
        positioner: function () { return { x: 2, y: 10 }; }
        },
      plotOptions: {
        column: {
          borderWidth: 0,
          shadow: false
        }
      },
      series: [
      {
        name: 'Uncertainty',
        enabled: false,
        data: [ [2011, -999]],
        color: '#191919', //'#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
        tooltip: {
          useHTML: true,
          headerFormat: 'Cumul. emissions<br>to 2100:<br>',
          pointFormat: '<span style="font-weight: normal; color: orange">{point.y} GT CO2</span><br>= Your pathway<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">3,010 GT CO2</span><br>= 50% chance<br>of 2°C<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">2,260 GT CO2</span><br>= 50% chance<br>of 1.5°C'
/*
          pointFormat: '<span style="font-weight: normal; color: orange">3,010 GT</span><br>cumul. CO2 <br>emissions give<br>a 50% chance<br>to stay below<br>a 2°C mean<br>temperature<br>increase<br>-<br><span style="font-weight: normal; color: orange">Your pathway:</span><br><span style="font-weight: normal; color: orange">{point.y} GT</span><br>cumulative<br>CO2 emissions<br>by 2100'
*/
        }
      }
      ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // all other screens: co2 budget chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_screens_co2_budget = new Highcharts.Chart({

      credits: { enabled: false },
      chart: {
        renderTo: 'container_screens_co2_budget',
        spacingLeft:   4,
        spacingRight:  4,
        spacingBottom: 4,
        backgroundColor :'#191919'
      },
      title: {
        style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
        // text: '2°C\nCO2 budget'
        text: 'Cum. emissions\nto 2100'
      },
      legend: { enabled: false },
      exporting: { enabled: false},
      xAxis: {
        categories: ['2100'],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
          style: {
            fontSize: '9px',
            fontWeight: 'normal'
          },
          text: '',
          margin: 5
        },
        min: -2,
        max:  8,
        tickInterval: 1,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: { enabled: false}
      },
      tooltip: {
        shared: true,
        style: {
         fontSize: '9px',
         padding: '8px'
        },
        positioner: function () { return { x: 2, y: 10 }; }
        },
      plotOptions: {
          line: {
            lineWidth: 3,
            marker: { enabled: false }
          }
      },
      series: [
      {
        name: 'Uncertainty',
        enabled: false,
        data: [ [2011, -999]],
        color: '#191919', //'#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
        tooltip: {
          useHTML: true,
          headerFormat: 'Cumul. emissions<br>to 2100:<br>',
          pointFormat: '<span style="font-weight: normal; color: orange">{point.y} GT CO2</span><br>= Your pathway<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">3,010 GT CO2</span><br>= 50% chance<br>of 2°C<br>--------------------<br>' 
                     + '<span style="font-weight: normal; color: orange">2,260 GT CO2</span><br>= 50% chance<br>of 1.5°C'
/*
          pointFormat: '<span style="font-weight: normal; color: orange">3,010 GT</span><br>cumul. CO2 <br>emissions give<br>a 50% chance<br>to stay below<br>a 2°C mean<br>temperature<br>increase<br>-<br><span style="font-weight: normal; color: orange">Your pathway:</span><br><span style="font-weight: normal; color: orange">{point.y} GT</span><br>cumulative<br>CO2 emissions<br>by 2100'
*/
        }
      }
      ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // dashboard: thermometer chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_dashboard_temperature_change = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
        renderTo: 'container_dashboard_mean_temp',
        spacingLeft:   4,
        spacingRight:  4,
        spacingBottom: 4,
        backgroundColor :'#191919'
        },
        title: {
            style: {
                font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
            },
            align: 'center',
            x: 0,
            text: 'Mean\ntemp. increase\n2100'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: ['2100'],
          labels: {
             enabled: false
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '',
            margin: 0
          },
          min: -2,
          max: 8,
          tickInterval: 1,

          labels: {
            // enabled: false,	
            formatter: function() {
               if (this.value == '0') return this.value;
               if (this.value == '1') return this.value;
               if (this.value == '2') return this.value;
               if (this.value == '3') return this.value;
               if (this.value == '4') return this.value;
               if (this.value == '5') return this.value;
               if (this.value == '6') return this.value;
               if (this.value == '7') return this.value;
               if (this.value == '8') return this.value;
               return '';
             }
          }
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 2, y: 10 };
          }
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            shadow: false
          }
        },
        series: [
        {
	  name: 'Uncertainty',
	  type: 'errorbar',
	  data: [[2.2, 2.2]],
          color: '#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
          tooltip: {
            pointFormat: '<span style="font-weight: normal; color: orange">Temperature</span><br><span style="font-weight: normal; color: orange">increase:</span><br>between<br/>{point.low}C to {point.high}C<br/>'
	  },
           stemWidth: 1,
	   whiskerWidth: 1,
	   whiskerLength: '20%'
        }
        ]
    })

} // end initDashboard ()


// ***********************************************************
//                                                           *
// Climate                                                   *
//                                                           *
// ***********************************************************

function initClimateCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // climate: thermometer chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_cc_temperature_change = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_cc_1',
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 4,
            backgroundColor :'#191919'
         },
        title: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            align: 'center',
            x: 0,
            text: 'Mean\ntemp. increase\n2100'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2100'],
          labels: { enabled: false }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '',
            margin: 0
          },
          min: -2,
          max: 8,
          tickInterval: 1,

          labels: {
            // enabled: false,	
            formatter: function() {
               if (this.value == '0') return this.value;
               if (this.value == '1') return this.value;
               if (this.value == '2') return this.value;
               if (this.value == '3') return this.value;
               if (this.value == '4') return this.value;
               if (this.value == '5') return this.value;
               if (this.value == '6') return this.value;
               if (this.value == '7') return this.value;
               if (this.value == '8') return this.value;
               return '';
             }
          }
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 2, y: 10 };
          }
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            shadow: false
          }
        },
        series: [
        {
	  name: 'Uncertainty',
	  type: 'errorbar',
	  data: [[2.2, 2.2]],
          color: '#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
          tooltip: {
            pointFormat: '<span style="font-weight: normal; color: orange">Temperature</span><br><span style="font-weight: normal; color: orange">increase:</span><br>between<br/>{point.low}C to {point.high}C<br/>'
	  },
           stemWidth: 1,
	   whiskerWidth: 1,
	   whiskerLength: '20%'
        }
        ]
    })

    // -------------------------------------------------------------------------------------------------------------------
    //
    // climate: burning ember
    //
    // -------------------------------------------------------------------------------------------------------------------
/*
    chart_cc_burning_ember = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_cc_impacts_summary',
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 0,
            backgroundColor :'#191919'
         },
        title: {
            style: { font: 'normal 10px "Trebuchet MS", Verdana, sans-serif' },
            align: 'center',
            x: 0,
            text: 'burn ember burn'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2100'],
          labels: { enabled: false }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '',
            margin: 0
          },
          min: -2,
          max: 8,
          tickInterval: 1,

          labels: {
            // enabled: false,	
            formatter: function() {
               if (this.value == '0') return this.value;
               if (this.value == '1') return this.value;
               if (this.value == '2') return this.value;
               if (this.value == '3') return this.value;
               if (this.value == '4') return this.value;
               if (this.value == '5') return this.value;
               if (this.value == '6') return this.value;
               if (this.value == '7') return this.value;
               if (this.value == '8') return this.value;
               return '';
             }
          }
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 2, y: 80 };
          }
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            shadow: false
          }
        },
        series: [
        {
	  name: 'Uncertainty',
	  type: 'errorbar',
	  data: [[2.2, 2.2]],
          color: '#8c8a8c', // '#d53e4f', // 'silver', // '#8e8c8c', // 'silver', // '#FF8000', // 'orange',
          tooltip: {
            pointFormat: '<span style="font-weight: normal; color: orange">Temperature</span><br><span style="font-weight: normal; color: orange">increase:</span><br>between<br/>{point.low}C to {point.high}C<br/>'
	  },
           stemWidth: 1,
	   whiskerWidth: 1,
	   whiskerLength: '20%'
        }
        ]
    })
  */  

    chart_temperature_timeseries = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
            renderTo: 'container_cc_timeseries',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	    text: 'Mean temperature change'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            marker: { enabled: false }
          },
          arearange: {
            lineWidth: 0,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 1870,
          max: 2100,
          tickInterval: 10,

          labels: {

            formatter: function() {
               if (this.value == '1870') return this.value;
               if (this.value == '1900') return this.value;
               if (this.value == '1950') return this.value;
               if (this.value == '2000') return this.value;
               if (this.value == '2050') return this.value;
               if (this.value == '2100') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'degree Celsius',
            margin: 5
          },
          min: 0, 
          max: 8, 
          tickInterval: 0.5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          valueSuffix: ' C',
          positioner: function () {
            return { x: 15, y: 30 };
          }
/*
          useHTML: true,
          headerFormat: '{point.key}<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
*/
        },


      series: [

         {
          name: 'Actual (NASA)',
          data: [  [1870, 0], [1880, 0], [1890, 0], 
                   [1900, 0], [1910, 0], [1920, 0], [1930, 0], [1940, 0], [1950, 0], [1960, 0], [1970, 0], [1980, 0], [1990, 0],           
                   [2000, 0], [2005, 0], [2010, 0], [2011, 0], [2013, 0]],
          // color: '#d53e4f',
          type: 'line'
         }, {
          name: 'Actual (HadCRUT3)',
          data: [  [1870, 0], [1880, 0], [1890, 0], 
                   [1900, 0], [1910, 0], [1920, 0], [1930, 0], [1940, 0], [1950, 0], [1960, 0], [1970, 0], [1980, 0], [1990, 0],           
                   [2000, 0], [2005, 0], [2010, 0], [2011, 0], [2013, 0]],
          // color: '#d53e4f',
          type: 'line'
         }, {
          name: 'Actual (HadCRUT4)',
          data: [  [1870, 0], [1880, 0], [1890, 0], 
                   [1900, 0], [1910, 0], [1920, 0], [1930, 0], [1940, 0], [1950, 0], [1960, 0], [1970, 0], [1980, 0], [1990, 0],           
                   [2000, 0], [2005, 0], [2010, 0], [2011, 0], [2013, 0]],
          // color: '#d53e4f',
          type: 'line'
         }, {
          name: 'Projected (high estimate)',
          data: [ [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0], [2055, 0], [2060, 0], [2065, 0], 
                  [2070, 0], [2075, 0], [2080, 0], [2085, 0], [2090, 0], [2095, 0], [2100, 0]],
          color: '#cc4c02',
          type: 'line'
         }, {
          name: 'Projected (low estimate)',
          data: [ [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0], [2055, 0], [2060, 0], [2065, 0], 
                  [2070, 0], [2075, 0], [2080, 0], [2085, 0], [2090, 0], [2095, 0], [2100, 0]],
          color: '#fe9929',
          type: 'line'
         }, {
          name: 'Projected (high estimate)',
          data: [ [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0], [2055, 0], [2060, 0], [2065, 0], 
                  [2070, 0], [2075, 0], [2080, 0], [2085, 0], [2090, 0], [2095, 0], [2100, 0]],
          dashStyle: 'shortdot',
          color: '#cc4c02',
          type: 'line'
         }, {
          name: 'Projected (low estimate)',
          data: [ [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0], [2055, 0], [2060, 0], [2065, 0], 
                  [2070, 0], [2075, 0], [2080, 0], [2085, 0], [2090, 0], [2095, 0], [2100, 0]],
          dashStyle: 'shortdot',
          color: '#fe9929',
          type: 'line'
         }
        ]
    }, function(chart) {
       

  
       var ren = this.renderer;
       // ------------------------------------------------------------------------
       // add vertical separator line between observed and projected time series
       // ------------------------------------------------------------------------
       var point = chart.series[0].data[5];

       
                     var x = chart.xAxis[0].toPixels(2013);
                     var y = chart.yAxis[0].toPixels(8);

                     ren.path(['M', x, y, 'L', x, 280])
                         .attr({
                             'stroke-width': 1,
                             stroke: 'silver',
                             dashstyle: 'dash'
                         })
                        .add();

                     ren.text('observed', 170+78-3-6, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();

                     ren.text('projected', 170+128, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();

/*
       chart.series[0].hide();
       chart.series[1].hide();
       // ------------------------------------------------------------------------
       // show no data info
       // ------------------------------------------------------------------------
       chart.renderer.text('No data for this chart',      180, 150).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
       chart.renderer.text('available in this version !', 180, 170).attr({ zIndex: 2 }).css({ color: '#C0C0C0',fontSize: '10px'}).add();
*/

    });












    
} // end initClimateCharts ()



// ***********************************************************
//                                                           *
// Electricity                                               *
//                                                           *
// ***********************************************************

function initElectricityCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // electricity: electricity supply chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_electricity_balancing_electricity_supply = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_electricity_balancing_electricity_supply',
            marginRight:20,
            type: 'area'
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
 	    text: 'Electricity supply'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },

        plotOptions: {
          line: {
            lineWidth: 3,
            marker: { enabled: false }
          },
          area: {
            stacking: 'normal',
            // lineColor: '#666666',
            lineWidth: 0,
            marker: {
              enabled: false
            }
          }
        },


        xAxis: {
          min: 1975,
          max: 2050,
          tickInterval: 5,

          labels: {
            formatter: function() {
               if (this.value == '1975') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },

        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
			  fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 300,
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'Unabated solid fuel power plants',
          data: [ [1975, 55], [1980, 57], [1985, 62], [1990, 64], [1995, 68], [2000, 78], [2005, 94], [2010, 113], 
                  [2011, 114], [2015, 125], [2020, 130], [2025, 140], [2030, 145], [2035, 150], [2040, 155], [2045, 141], [2050, 134] ],
          color: '#e41a1c',
          marker: { radius: 2 }
         }, {
	  name: 'Unabated liquid fuel power plants',
          data: [ [1975, 55], [1980, 57], [1985, 62], [1990, 64], [1995, 68], [2000, 78], [2005, 94], [2010, 113], 
                  [2011, 114], [2015, 125], [2020, 130], [2025, 140], [2030, 145], [2035, 150], [2040, 155], [2045, 141], [2050, 134] ],
          color: '#377eb8',
          marker: { radius: 2 }
         }, {
	  name: 'Unabated gas fuel power plants',
          data: [ [1975, 55], [1980, 57], [1985, 62], [1990, 64], [1995, 68], [2000, 78], [2005, 94], [2010, 113], 
                  [2011, 114], [2015, 125], [2020, 130], [2025, 140], [2030, 145], [2035, 150], [2040, 155], [2045, 141], [2050, 134] ],
          color: '#4daf4a',
          marker: { radius: 2 }
         }, {
	  name: 'Carbon Capture and Storage',
          data: [ [1975, 15], [1980, 17], [1985, 19], [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          color: '#984ea3',
          marker: { radius: 2 }
         }, {
	  name: 'Nuclear',
          data: [ [1975, 15], [1980, 17], [1985, 19], [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          color: '#ff7f00',
          marker: { radius: 2 }
         }, {
	  name: 'Wind, solar, marine',
          data: [ [1975, 15], [1980, 17], [1985, 19], [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          color: '#ffff33',
          marker: { radius: 2 }
         }, {
	  name: 'Hydro',
          data: [ [1975, 15], [1980, 17], [1985, 19], [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          color: '#a65628',
          marker: { radius: 2 }
         }, {
	  name: 'Geothermal',
          data: [ [1975, 25], [1980, 27], [1985, 32], [1990, 30], [1995, 35], [2000, 40], [2005, 45], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          color: '#f781bf',
          marker: { radius: 2 }
        }, {
          name: 'Electricity demand', 
          color: 'white',
          dashStyle: 'ShortDot',
          type: 'line',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          marker: { radius: 2 }
         }
        ]
    }, function(chart) {
        
                     var ren = this.renderer;

                     // ------------------------------------------------------------------------
                     // add vertical separator line between observed and projected time series
                     // ------------------------------------------------------------------------
        
                     var x = chart.xAxis[0].toPixels(2010);

                     ren.path(['M', x, 40, 'L', x, 280])
                         .attr({
                             'stroke-width': 1,
                             stroke: 'silver',
                             dashstyle: 'dash'
                         })
                        .add();

                     ren.text('observed', 135-3, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();

                     ren.text('projected', 185, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();



    });

} // end initElectricityCharts ()


function initElectricityCarbonIntensityCharts() {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // Electricity: Carbon Intensity
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_electricity_carbon_intensity = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_electricity_carbon_intensity',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Electricity generation - carbon intensity'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
        },
        xAxis: {
          min: 2010,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'g CO2e / kwh',
            margin: 5
          },
          min: 0,
          max: 800,
          tickInterval: 100
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (g CO2e / kwh)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Carbon intensity',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // end initElectricityCarbonIntensityCharts



// ***********************************************************
//                                                           *
// Transport                                                 *
//                                                           *
// ***********************************************************

function initTransportTechAndFuelCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: number of cars on the road
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_cars_on_the_road = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            type: 'area',
            renderTo: 'container_transport_cars_on_the_road',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Number of cars on the road'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max: 4500000000,
          tickInterval: 500000000
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Hydrogen',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Electric',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'ICEs',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'PHs',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: avg efficiency of cars on the road
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_avg_efficiency = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_transport_avg_efficiency',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Avg efficiency of cars on the road'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'litres of gasoline equivalent per 100 km',
            margin: 5
          },
          min: 0,
          max: 10, 
          tickInterval: 1
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
        useHTML: true,
        headerFormat: '{point.key}' + ' (litres of gasoline equivalent per 100 km)' + '<table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                     '<td style="text-align: right">{point.y}</td></tr>',
        footerFormat: '</table>'
       },
       series: [

       {
          name: 'Average',
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }        
  
      ]
    });

} // end initTransportTechAndFuelCharts


function initTransportFuelTypeCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: transport by fuel type
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_by_fuel_type = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            type: 'area',
            renderTo: 'container_transport_by_fuel_type',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Transport by fuel type'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 240,
          tickInterval: 20
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Liquid hydrocarbons',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Electricity (delivered to end user)',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Gaseous hydrocarbons',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'H2',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // end initTransportFuelTypeCharts





function initTransportFreightCharts () {


    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: freight by load
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_freight_by_load = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
           renderTo: 'container_transport_freight_by_load',
           type: 'column',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
  	   text: 'Index of international freight by sea and output of coal/oil/iron products'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false }
          },
          column: {
            stacking: 'normal'
          }
        },
        xAxis: {
          categories: [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050]
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Index (2011=100)',
            margin: 5
          },
          min: 0,
          max: 250, 
          tickInterval: 25
        },
       tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding:  '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
        useHTML: true,
        headerFormat: '{point.key}' + ' (Index (2011=100))' + '<table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                     '<td style="text-align: right">{point.y}</td></tr>',
        footerFormat: '</table>'
       },

       series: [
       {
          name: 'International freight by sea',
          type: 'line',
          data: [ 100, 105, 105, 105, 105, 105, 105, 105, 105 ],
          color: '#4daf4a',
          marker: { radius: 2 }
        }, { 
          name: 'Output of coal/oil/iron products',
          type: 'line',
          data: [ 100, 105, 105, 105, 105, 105, 105, 105, 105 ],
          color: '#e6550d',
          marker: { radius: 2 }
        }
      ]


    });


/*
    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: growth in output
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_growth_in_output = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_transport_growth_in_output',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Growth in output'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Index (2011=100)',
            margin: 5
          },
          min: 0,
          max: 250,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Index (2011=100))' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Oil',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Coal',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Iron and Steel',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });
*/

} // end initTransportFreightCharts




function initTransportModeCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: observed energy demand chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_energy_demand_observed = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_transport_energy_demand_observed',
            type: 'area',
            marginRight:0 // 5
        },
        title: {
            style: { font: 'normal 9px "Trebuchet MS", Verdana, sans-serif' },
	    text: 'observed'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineWidth: 0,
            marker: { enabled: false },
            shadow: false,
            states: {
              hover: { lineWidth: 1 }
            },
            threshold: null
          }
        },
        xAxis: {
          min: 1990,
          max: 2010,
          tickInterval: 5,
          labels: {
       	    fontSize: '9px',
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2005') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: { fontSize: '9px', fontWeight: 'normal' },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 500,
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
		  name: 'All transport',
          data: [ [1990, 595], [1995, 600], [2000, 620], [2005, 630], [2010, 655]],

          color: '#8080FF',
          marker: { radius: 2 }
         }

        ]

    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // transport: projected energy demand chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_transport_energy_demand_projected = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_transport_energy_demand_projected',
            type: 'area',
            // marginTop:50,
            // marginBottom:20,
            marginRight:20,
            marginLeft: 0 // 5
        },
        title: {
          style: { font: 'normal 9px "Trebuchet MS", Verdana, sans-serif' },
  	  text: 'projected'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineWidth: 0,
            marker: { enabled: false },
            shadow: false,
            states: {
              hover: { lineWidth: 1 }
            },
            threshold: null
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
       	    fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          opposite: true,
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: { fontSize: '9px', fontWeight: 'normal' },
            text: '',
            margin: 5
          },
          min: 0,
          max: 500,
          tickInterval: 50,
          labels : {
            enabled: false
          }

        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
/*
        series: [
         {
	  name: 'Road transport',
          data: [ [2011, 355], [2015, 350], [2020, 98], [2025, 94], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          // color: '#8080FF',
          marker: { radius: 2 }
         },

         {
	  name: 'Rail transport',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          // color: '#8080FF',
          marker: { radius: 2 }
         },

         {
	  name: 'Aviation transport',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          // color: '#8080FF',
          marker: { radius: 2 }
         },

         {
	  name: 'Water transport',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          // color: '#8080FF',
          marker: { radius: 2 }
         }
        ]
*/

        series: [
         {
	  name: 'Passenger Light road',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Passenger Heavy road',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Passenger Rail',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Passenger Plane',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Passenger Ship',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Freight Light road',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Freight Heavy road',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Freight Rail',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Freight Plane',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }, {
	  name: 'Freight Ship',
          data: [ [2011, 100], [2015, 100], [2020, 178], [2025, 194], [2030, 113], [2035, 125], [2040, 130], [2045, 140], [2050, 150] ],
          marker: { radius: 2 }
         }
        ]
    });




} // end initTransportModeCharts ()



// ***********************************************************
//                                                           *
// Buildings                                                 *
//                                                           *
// ***********************************************************
function initBuildingsInsulationAndTechCharts() {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // buildings: heating
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_buildings_heating = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_buildings_heating',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Space heating by zero carbon or electric technologies (urban)'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: '%',
            margin: 5
          },
          min: 0,
          max: 100,
          tickInterval: 10
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (%)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Urban',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

    // -------------------------------------------------------------------------------------------------------------------
    //
    // buildings: insulation
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_buildings_insulation = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_buildings_insulation',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Building insulation (urban)'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'GW heat loss per m2',
            margin: 5
          },
          min: 0,
          max: 20,
          tickInterval: 2
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (GW heat loss per m2)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Urban',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // initBuildingsInsulationAndTechCharts()

function initBuildingsFuelCharts() {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // buildings: number of cars on the road
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_buildings_by_fuel_type = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            type: 'area',
            renderTo: 'container_buildings_by_fuel_type',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Energy use by fuel type'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 240,
          tickInterval: 20
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Solar',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Environmental heat',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Heat (supplied to grid)',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Liquid hydrocarbons',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Solid hydrocarbons',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Traditional biomass',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Gaseous hydrocarbons',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Global Electricity (delivered to end user)',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // end initBuildingsFuelCharts()



function initBuildingsEnergyUseCharts() {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // buildings: observed energy use chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_buildings_energy_use_observed = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_buildings_2',
            type: 'area',
            marginRight:0 // 5
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
	    text: 'Observed'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },

            plotOptions: {
                area: {
                  stacking: 'normal',

                    lineWidth: 0,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },


        xAxis: {
          min: 1975,
          max: 2010,
          tickInterval: 5,

          labels: {
        	    fontSize: '9px',
            formatter: function() {
               if (this.value == '1975') return this.value;
               if (this.value == '2005') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
			  fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 250,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'All buildings',
          data: [ [1975, 10], [1980, 10], [1985, 10],[1990, 10], [1995, 10], [2000, 10], [2005, 10], [2010, 10]],

          color: '#8080FF',
          marker: { radius: 2 }
         }

        ]

    });
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // buildings: energy use chart projected
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_buildings_energy_use = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_buildings_1',
            type: 'area',
            marginRight:20,
            marginLeft: 0 // 5
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
  	  text: 'Projected energy use'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },

        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 0,
            marker: {
                        enabled: false
            }
          }
        },
        xAxis: {
          min: 2011, // 1990,
          max: 2050,
          tickInterval: 10,

          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          opposite: true,
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
			  fontWeight: 'normal'
            },
            text: '',
            margin: 5
          },
          min: 0,
          max: 250,
          tickInterval: 25,
          labels : {
            enabled: false
          }
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [

           /*
           // ==============================================================================================================================
           // 
           // NOTE: the disabled version is  for combining observed and projected data.  Since observed data is not available for
           // version 1, we are only using projected data now
           // 
           // ==============================================================================================================================

         {
	  name: 'Heating and cooling',
          data: [ [1990, 30], [1995, 35], [2000, 40], [2005, 45], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          color: '#7FC97F',
          marker: { radius: 2 }
         },
         {
	  name: 'Lighting and applicances',
          data: [ [1990, 64], [1995, 68], [2000, 78], [2005, 94], [2010, 113], 
                  [2011, 114], [2015, 125], [2020, 130], [2025, 140], [2030, 145], [2035, 150], [2040, 155], [2045, 141], [2050, 134] ],
          color: '#FDC086',
          marker: { radius: 2 }
         },
         {
	  name: 'Cooking',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          color: '#BEAED4',
          marker: { radius: 2 }
         }
         */

         {
	  name: 'Heating',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#a6cee3',
          marker: { radius: 2 }
         },
         {
	  name: 'Cooling',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#1f78b4',
          marker: { radius: 2 }
         },
         {
	  name: 'Hot water',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#b2df8a',
          marker: { radius: 2 }
         },
         {
	  name: 'Applicances',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#33a02c',
          marker: { radius: 2 }
         },
         {
	  name: 'Cooking',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#fb9a99',
          marker: { radius: 2 }
         },
         {
	  name: 'Lighting',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#e31a1c',
          marker: { radius: 2 }
         },
         {
	  name: 'Non-residential',
          data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ],
          color: '#fee08b',
          marker: { radius: 2 }
         }
        ]

    });

} // end initBuildingsCharts ()


// ***********************************************************
//                                                           *
// Manufacturing                                             *
//                                                           *
// ***********************************************************

function initMaterialsCharts () {


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // Manufacturing: observed energy consumption chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_energy_consumption_observed = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_manufacturing_energy_consumption_observed',
            type: 'area',
            marginRight: 0 // 5
        },
        title: {
            style: {
                font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
            },
  	   text: 'Observed'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
                area: {
                  stacking: 'normal',

                    lineWidth: 0,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
        },
        xAxis: {
          min: 1990,
          max: 2010,
          tickInterval: 5,
          labels: {
       	    fontSize: '9px',
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2005') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
   	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 500,
          tickInterval: 50
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'All manufacturing',
          data: [ [1990, 595], [1995, 600], [2000, 620], [2005, 630], [2010, 655]],

          color: '#8080FF',
          marker: { radius: 2 }
         }

        ]

    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // Manufacturing: projected energy consumption chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_energy_consumption_projected = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_manufacturing_energy_consumption_projected',
            type: 'area',
            marginRight:20,
            marginLeft:0 //5
        },
        title: {
            style: {
                font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
            },
	    text: 'Projected energy consumption' 
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
                area: {
                  stacking: 'normal',

                    lineWidth: 0,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
       	    fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          opposite: true,
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
   	      fontWeight: 'normal'
            },
            text: '',
            margin: 5
          },
          min: 0,
          max: 500,
          tickInterval: 50,
          labels : {
            enabled: false
          }
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Iron and steel',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Aluminium',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Chemicals',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Pulp and paper',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Cement',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Timber',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Other',
//          color: '#cacaca',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }

       ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy efficiency of production chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_manufacturing_energy_efficiency_of_production = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            type: 'area',
            renderTo: 'container_materials_2',
            marginRight:20
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
   	    text: 'Tonnes of output'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
                area: {
                  stacking: 'normal',

                    lineWidth: 0,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },

        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Gt',
            margin: 5
          },
          min: 0,
          max: 20,
          tickInterval: 2.5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Gt)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Iron and steel',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Aluminium',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Chemicals',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Pulp and paper',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Cement',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Timber',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]

    });

} // end initMaterialsCharts ()














function initManufacturingIronAndSteelChart () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy efficiency of production chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_manufacturing_iron_and_steel = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_iron_and_steel',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Energy demand Iron / Steel'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 75,
          tickInterval: 5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'Oxygen',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Oxygen Hisarna',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Electric',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Electric DRI',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Other',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });


    chart_manufacturing_iron_and_steel_uses = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_iron_and_steel_uses',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Steel uses'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Tonnes',
            margin: 5
          },
          min: 0,
          max: 75,
          tickInterval: 5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Tonnes)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Something',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }, {
	  name: 'Something else',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }
      ]
    }, function(chart) {
       chart.renderer.text('This chart',     90, 60).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('is under',       90, 75).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('construction !', 90, 90).css({ color: '#C0C0C0', fontSize: '10px' }).add();
    });


} // end initManufacturingIronAndSteelChart ()

function initManufacturingAluminiumChart () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy efficiency of production chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_manufacturing_aluminium = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_aluminium',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Energy demand Aluminium'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 16,
          tickInterval: 2
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'Alumina',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Primary',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Secondary',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });


    chart_manufacturing_aluminium_uses = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_aluminium_uses',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Aluminium uses'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Tonnes',
            margin: 5
          },
          min: 0,
          max: 75,
          tickInterval: 5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Tonnes)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Something',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }, {
	  name: 'Something else',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }
      ]
    }, function(chart) {
       chart.renderer.text('This chart',     90, 60).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('is under',       90, 75).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('construction !', 90, 90).css({ color: '#C0C0C0', fontSize: '10px' }).add();
    });

} // end initManufacturingAluminiumChart ()


function initManufacturingPaperChart () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy efficiency of Paper  chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_paper = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_paper',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Energy demand Paper'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 20,
          tickInterval: 2
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'Pulp',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Virgin',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Recycled',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // end initManufacturingPaperChart ()


function initManufacturingChemicalsChart () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy efficiency of Chemicals  chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_chemicals = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_chemicals',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Energy demand Chemicals'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 110,
          tickInterval: 10
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'HVC',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Ammonia',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Methanol',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }, {
	  name: 'Other',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });


    chart_manufacturing_chemicals_uses = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_chemicals_uses',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Chemicals uses'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Tonnes',
            margin: 5
          },
          min: 0,
          max: 75,
          tickInterval: 5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Tonnes)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Something',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }, {
	  name: 'Something else',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }
      ]
    }, function(chart) {
       chart.renderer.text('This chart',     90, 60).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('is under',       90, 75).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('construction !', 90, 90).css({ color: '#C0C0C0', fontSize: '10px' }).add();
    });


} // end initManufacturingChemicalsChart ()

function initManufacturingCementChart () {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // materials: energy demand Cement chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_cement = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_cement',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Energy demand Cement'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 22,
          tickInterval: 2
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },

        series: [
         {
	  name: 'Cement',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });


    chart_manufacturing_cement_uses = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {
           type: 'area',
           renderTo: 'container_manufacturing_cement_uses',
           marginRight:20
        },
        title: {
           style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	   text: 'Cement uses'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',
             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'Tonnes',
            margin: 5
          },
          min: 0,
          max: 75,
          tickInterval: 5
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + ' (Tonnes)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Something',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }, {
	  name: 'Something else',
          marker: { radius: 2 },
          data: [ [2011, null], [2015, null], [2020, null], [2025, null], [2030, null], [2035, null], [2040, null], [2045, null], [2050, null] ]
         }
      ]
    }, function(chart) {
       chart.renderer.text('This chart',     90, 60).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('is under',       90, 75).css({ color: '#C0C0C0', fontSize: '10px' }).add();
       chart.renderer.text('construction !', 90, 90).css({ color: '#C0C0C0', fontSize: '10px' }).add();
    });

} // end initManufacturingCementChart ()


function initManufacturingSalesOfProductsCharts() {

    // -------------------------------------------------------------------------------------------------------------------
    //
    // manufacturing: sales of lightbulbs
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_sales_of_lightbulbs = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_manufacturing_sales_of_lightbulbs',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Sales of lightbulbs'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max:          22000000000,
          tickInterval:  2000000000
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Total',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

    // -------------------------------------------------------------------------------------------------------------------
    //
    // manufacturing: sales of refrigerators
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_sales_of_refrigerators = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_manufacturing_sales_of_refrigerators',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Sales of refrigerators'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max:           2000000000,
          tickInterval:   250000000
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Total',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });


    // -------------------------------------------------------------------------------------------------------------------
    //
    // manufacturing: sales of televisions
    //
    // -------------------------------------------------------------------------------------------------------------------
    chart_manufacturing_sales_of_televisions = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_manufacturing_sales_of_televisions',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Sales of televisions'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
           area: {
             stacking: 'normal',

             lineWidth: 0,
             marker: { enabled: false },
             shadow: false,
             states: {
               hover: { lineWidth: 1}
             },
             threshold: null
           }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'number',
            margin: 5
          },
          min: 0,
          max:           2000000000,
          tickInterval:   250000000
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' Gt',
          useHTML: true,
          headerFormat: '{point.key}' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Total',
          marker: { radius: 2 },
          data: [ [2011, 1], [2015, 1], [2020, 1], [2025, 1], [2030, 1], [2035, 1], [2040, 1], [2045, 1], [2050, 1] ]
         }
       ]
    });

} // initManufacturingSalesOfProductsCharts()


// ***********************************************************
//                                                           *
// Food                                                      *
//                                                           *
// ***********************************************************

function initFoodCharts () {

  var unit = "grams";
  if (dietTableUnit == 1) unit = "grams";
  else                    unit = "kcal";

  var maxX = 3000;
  var tick =  250;
  if (dietTableUnit == 1) {
    maxX = 2000;
    tick =  200;
  }


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // food: food consumption chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_food_bioenergy_food_consumption = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            renderTo: 'container_food_bioenergy_1',
            type: 'column'
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
            text: 'Food consumption / head'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        xAxis: {
          categories: ['2011 global avg', '2050 user pathway', 'Botswana 2011', 'Brazil 2011', 'China 2011', 'India 2011', 'Japan 2011', 'UK 2011', 'US 2011']
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: { fontSize: '9px', fontWeight: 'normal' },
            text: unit,
            margin: 5
          },
          min: 0,
          max: maxX,
          tickInterval: tick
        },
        tooltip: {
          shared: true,
          // valueSuffix: ' calories',
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          // positioner: function () { return { x: 15, y: 30 }; },
          useHTML: true,
          headerFormat: '{point.key}' + ' (' + unit + ')' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        plotOptions: {
          column: { stacking: 'normal' }
        },
        series: [
        {
          name: 'Beef',
          color: '#ff7f00',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Poultry',
          color: '#a6cee3',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Pork',
          color: '#e31a1c',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Sheep and goat meat',
          color: '#b2df8a',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Fish',
          color: '#33a02c',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Eggs',
          color: '#fb9a99',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Milk products',
          color: '#1f78b4',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Other animal products',
          color: '#fdbf6f',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Cereals and grains',
          color: '#ff7f00',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Sugars',
          color: '#cab2d6',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Fruit, vegetables',
          color: '#7fc97f',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Pulses',
          color: '#ffff33',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Vegetable oil',
          color: '#6a3d9a',
          data: [100, 200, null, null, null, null, null, null, null]
        }, {
          name: 'Other',
          color: '#ffff99',
          data: [100, 200, null, null, null, null, null, null, null]
        }
      ]
    });



} // end initFoodCharts ()


// ***********************************************************
//                                                           *
// Bioenergy                                                 *
//                                                           *
// ***********************************************************

function initBioenergyCharts () {


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // Bioenergy: projected energy supply chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_bioenergy_energy_supply_1 = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            type: 'area',
            renderTo: 'container_bioenergy_1',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Bioenergy supply by source'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
                area: {
                  stacking: 'normal',
                    lineWidth: 0,
                    marker: { enabled: false },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 325,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Bionergy unused',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#a6cee3',
          marker: { radius: 2 }
         }, {
          name: 'Waste',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#fef0d9',
          marker: { radius: 2 }
         }, {
	  name: 'Forest residues',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#fdcc8a',
          marker: { radius: 2 }
         }, {
	  name: 'Bioenergy crops',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#fc8d59',
          marker: { radius: 2 }
         }, {
	  name: 'Traditional biomass',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#d7301f',
          marker: { radius: 2 }
         }
        ]
    });



    chart_bioenergy_energy_supply_2 = new Highcharts.Chart({

        credits: { enabled: false },
        chart: {
            type: 'area',
            renderTo: 'container_bioenergy_2',
            marginRight:20
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
   	    text: 'Bioenergy supply by solid / liquid / gas'
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        plotOptions: {
                area: {
                  stacking: 'normal',
                    lineWidth: 0,
                    marker: { enabled: false },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,
          labels: {
            fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 325,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Solid oversupply',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#1f78b4',
          marker: { radius: 2 }
         }, {
	  name: 'Liquid oversupply',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#a6cee3',
          marker: { radius: 2 }
         }, {
          name: 'Solid',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#b2df8a',
          marker: { radius: 2 }
         }, {
	  name: 'Liquid',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#fb9a99',
          marker: { radius: 2 }
         }, {
	  name: 'Gasous',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#33a02c',
          marker: { radius: 2 }
         }, {
	  name: 'Losses',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#cfcfcf',
          marker: { radius: 2 }
         }
        ]
    });

         
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // Bioenergy: projected energy demand chart   DO NOT DELETE - CURRENTLY DEACTIVATED
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

/*
    chart_bioenergy_energy_demand = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            type: 'area',
            renderTo: 'container_bioenergy_2',
            marginRight:20
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
   	    text: 'Bioenergy demand'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
                area: {
                  stacking: 'normal',

                    lineWidth: 0,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 5,

          labels: {
        	  fontSize: '9px',
            formatter: function() {
               if (this.value == '2011') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },

        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 150,
          tickInterval: 25
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [

         {
          name: 'Losses',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#bababa',
          marker: { radius: 2 }
         },
       {
	  name: 'Transport',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#a6cee3',
          marker: { radius: 2 }
         },
         {
	  name: 'Electricity (unabated thermal)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#1f78b4',
          marker: { radius: 2 }
         },
         {
	  name: 'Electricity (carbon capture and storage)',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#b2df8a',
          marker: { radius: 2 }
         },
         {
	  name: 'Buildings',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#33a02c	',
          marker: { radius: 2 }
         },
         {
	  name: 'Manufacturing',
          data: [ [2011, 3], [2015, 3], [2020, 3], [2025, 3], [2030, 3], [2035, 3], [2040, 3], [2045, 3], [2050, 3] ],
          color: '#fdbf6f',
          marker: { radius: 2 }
         }
        ]
    });
*/

} // end initBioenergyCharts ()



// ***********************************************************
//                                                           *
// Energy flows                                              *
//                                                           *
// ***********************************************************

function initEnergyFlowsCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // energy flows: energy supply chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_energy_energy_supply = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_energy_1',
            type: 'area',
            marginRight:20
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
   	    text: 'Energy supply'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 0,
            marker: {
                        enabled: false
            }
          }
        },
        xAxis: {
          min: 1990,
          max: 2050,
          tickInterval: 10,
          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
			  fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 2000,
          tickInterval: 200
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
          name: 'Nuclear fission',
          color: '#d53e4f',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Solar, wind, wave and tidal',
          color: '#f46d43',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Heat',
          color: '#fdae61',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Geothermal',
          color: '#ffffbf',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Hydro',
          color: '#e6f598',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Bioenergy and waste',
          color: '#abdda4',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Coal and peat',
          color: '#fee08b',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Oil',
          color: '#66c2a5',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }, {
          name: 'Gas',
          color: '#3288bd',
          data: [ [1990, 20], [1995, 25], [2000, 20], [2005, 25], [2010, 30], 
                  [2011, 30], [2015, 30], [2020, 35], [2025, 30], [2030, 35], [2035, 40], [2040, 40], [2045, 45], [2050, 50] ],
          marker: { radius: 2 }
         }
        ]
    }, function(chart) {
        
                     var ren = this.renderer;

                     // ------------------------------------------------------------------------
                     // add vertical separator line between observed and projected time series
                     // ------------------------------------------------------------------------
        
                     var x = chart.xAxis[0].toPixels(2010);

                     ren.path(['M', x, 40, 'L', x, 280])
                         .attr({
                             'stroke-width': 1,
                             stroke: 'silver',
                             dashstyle: 'dash'
                         })
                        .add();

                     ren.text('observed', 109, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();

                     ren.text('projected', 159+1, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();


    });



    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // energy flows: energy demand chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    chart_energy_energy_demand = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_energy_2',
            marginRight:20,
            type: 'area'
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
	    text: 'Energy demand'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 0,
            marker: {
              enabled: false
            }
          }
        },
        xAxis: {
          min: 1990,
          max: 2050,
          tickInterval: 10,
          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'EJ',
            margin: 5
          },
          min: 0,
          max: 2000,
          tickInterval: 200
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          // valueSuffix: ' EJ',
          useHTML: true,
          headerFormat: '{point.key}' + ' (EJ)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
/*
         {
          name: 'Losses',
          color: 'rgba(200, 200, 200, 0.3)', // '#bababa',
          data: [ 
                  [1990, null], [1995, null], [2000, null], [2005, null], [2010, null], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         },
*/
         {
          name: 'Manufacturing',
          color: '#8dd3c7',
          data: [ [1990, 30], [1995, 35], [2000, 45], [2005, 50], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         }, {
          name: 'Transport',
          color: '#ffffb3',
          data: [ [1990, 30], [1995, 35], [2000, 45], [2005, 50], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         }, {
          name: 'Buildings',
          color: '#bebada',
          data: [ [1990, 30], [1995, 35], [2000, 45], [2005, 50], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         }, {
          name: 'Other',
          color: '#fb8072',
          data: [ [1990, 30], [1995, 35], [2000, 45], [2005, 50], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         }, {
          name: 'GGR',
          color: '#80b1d3',
          data: [ [1990, 30], [1995, 35], [2000, 45], [2005, 50], [2010, 50], 
                  [2011, 50], [2015, 60], [2020, 65], [2025, 70], [2030, 75], [2035, 80], [2040, 90], [2045, 100], [2050, 105] ],
          marker: { radius: 2 }
         }
        ]
    }, function(chart) {
        
                     var ren = this.renderer;

                     // ------------------------------------------------------------------------
                     // add vertical separator line between observed and projected time series
                     // ------------------------------------------------------------------------
        
                     var x = chart.xAxis[0].toPixels(2010);

                     ren.path(['M', x, 40, 'L', x, 280])
                         .attr({
                             'stroke-width': 1,
                             stroke: 'silver',
                             dashstyle: 'dash'
                         })
                        .add();

                     ren.text('observed', 109, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();

                     ren.text('projected', 159+1, 60)
                      .css({
                        color: '#C0C0C0',
                        fontSize: '9px'
                      })
                      .add();


    });



} // end initEnergyFlowsCharts ()


// ***********************************************************
//                                                           *
// Fossil fuels etc                                          *
//                                                           *
// ***********************************************************

function initFossilFuelsCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // fossil fuels etc: overview chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
/*
    chart_ff_and_resources_all_1 = new Highcharts.Chart({
        chart: {
            renderTo: 'container_ff_and_resources_all_1',
            type: 'column',
        },
        title: {
            style: {
	      font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
	    },
            text: 'Projected resources by 2050'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: ['Oil (bbl)', 'Coal (GT)', 'Gas (Tm3)']
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            text: 'Fraction of consumed resources',
            margin: 5
          },
          min: 0,
          max: 100,
          tickInterval: 20,

          labels: {
            enabled: false
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          useHTML: true,
          headerFormat: '{point.key}<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y} </td></tr>',
          footerFormat: '</table>'

        },
        plotOptions: {
          column: {
            stacking: 'percent',
            dataLabels: {
            }
          }
        },
        series: [{
          name: 'Consumed between now and 2050',
          color: '#f46d43',
          data: [1000, 2000, 3000]
        },
        {
          name: 'Outstanding in 2050 (method 1)',
          color: '#c7e9b4',
          data: [50, 1500, 15000]
        },
        {
          name: 'Additionally outstanding in 2050 (method 2)',
          color: '#7fcdbb',
          data: [100, 1200, 22000]
        },
        {
          name: 'Additionally outstanding in 2050 (method 3)',
          color: '#41b6c4',
          data: [200, 200, 19000]
        }
       ]
    });
*/
    chart_ff_and_resources_all_1 = new Highcharts.Chart({

        credits: {
           enabled: false
        },
        chart: {
            renderTo: 'container_ff_and_resources_all_1',
            marginRight:20,
            type: 'area'
        },
        title: {
            style: {
                font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
            },
	    text: 'Coal'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 0,
            marker: {
              enabled: false
            }
          }
        },
        xAxis: {
          min: 2011,
          max: 2050,
          tickInterval: 10,
          labels: {
            formatter: function() {
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }

          }
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
		fontWeight: 'normal'
            },
            text: 'GT',
            margin: 5
          },
          min: 0,
          max: 2000,
          tickInterval: 200
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          valueSuffix: ' ',
          useHTML: true,
          headerFormat: '{point.key}<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
          name: 'Cumulative consumtion',
          color: '#f46d43',
          data: [ [2011, 50], [2015, 50], [2020, 50], [2025, 50], [2030, 50], [2035, 50], [2040, 50], [2045, 50], [2050, 50] ],
          marker: { radius: 2 }
         }
        ]
    });


// ---------------------------------------------------
// resources pie charts:
// ---------------------------------------------------

    chart_ff_and_resources_pie_1a = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_1a',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Resources 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Estimate',
            innerSize: 50,
            data: [
                ['consumed resources',   50.0],
                ['available resources',  50.0]
            ]
        }]
    });


    chart_ff_and_resources_pie_2a = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_2a',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Resources 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Resource estimate',
            innerSize: 50,
            data: [
                ['consumed resources',   50.0],
                ['available resources',  50.0]
            ]
        }]
    });

    chart_ff_and_resources_pie_3a = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_3a',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Resources 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Resource estimate',
            innerSize: 50,
            data: [
                ['consumed resources',   50.0],
                ['available resources',  50.0]
            ]
        }]
    });

// ---------------------------------------------------
// reserves pie charts:
// ---------------------------------------------------

    chart_ff_and_resources_pie_1b = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_1b',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Reserves 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Reserve estimate',
            innerSize: 50,
            data: [
                ['consumed reserves',   50.0],
                ['available reserves',  50.0]
            ]
        }]
    });

    chart_ff_and_resources_pie_2b = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_2b',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Reserves 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Reserve estimate',
            innerSize: 50,
            data: [
                ['consumed reserves',   50.0],
                ['available reserves',  50.0]
            ]
        }]
    });


    chart_ff_and_resources_pie_3b = new Highcharts.Chart({
        credits: {
           enabled: false
        },
       chart: {
            renderTo: 'container_ff_and_resources_pie_3b',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            spacingTop:    4,
            spacingLeft:   4,
            spacingRight:  4,
            spacingBottom: 7,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text:   'Reserves 2050',
            align:  'center',
            verticalAlign: 'middle',
            y: 33
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          pointFormat: '{point.percentage:.1f}%',
          style: {
      	    fontSize: '10px',
      	    padding: '8px'
      	  }
        },
        plotOptions: {
            pie: {
               colors : ['#f46d43', '#41b6c4'],
               dataLabels: {
                 enabled: false,
                 distance: -0,
                 style: {
                   fontWeight: 'bold',
                   color: 'white',
                   textShadow: '0px 1px 2px black'
                 }
               },
               startAngle: -90,
               endAngle:    90,
               size: 125,
               center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Reserve estimate',
            innerSize: 50,
            data: [
                ['consumed reserves',   50.0],
                ['available reserves',  50.0]
            ]
        }]
    });

/*

// last version:

    chart_ff_and_resources_pie_3 = new Highcharts.Chart({
       chart: {
            renderTo: 'container_ff_and_resources_pie_3',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            style: {
	      font: 'normal 10px "Trebuchet MS", Verdana, sans-serif'
	    },
            text: 'Consumed / available<br>in 2050',
            align: 'center',
            verticalAlign: 'middle',
            y: 53
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                colors : ['#f46d43', '#41b6c4'],

                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Resource estimate',
            innerSize: '50%',
            data: [
                ['consumed',   45.0],
                ['available',  26.8],
            ]
        }]
    });
*/


} // end initFossilFuelsCharts ()


// ***********************************************************
//                                                           *
// Land                                                      *
//                                                           *
// ***********************************************************


    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // lifestyle / Homes / Appliances section: number of appliances per household
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

function initLandYieldCharts(footballPitchUnit) {

  var unit = "Kg";
  if (footballPitchUnit == 1) unit = "Kg";
  else                        unit = "kcal";

  var maxX = 4000000;
  var tick =  500000;
  if (footballPitchUnit == 1) {
    maxX = 5000;
    tick =  500;
  }


  chart_land_yields_football_pitch = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_land_yields_football_pitch',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Yields from one football pitch during one year'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { 
      categories: ['Beef (pasture fed)', 'Beef (grains<br>& resid. fed)', 'Sheep & goat meat<br>(pasture fed)', 
                   'Sheep & goat meat<br>(grains & resid. fed)', 'Poultry', 'Pork', 'Eggs', 'Milk products', 
                   'Cereals & grains', 'Sugars', 'Fruit & vegetable', 'Pulses', 'Vegetable oil'],
      labels: {
        rotation: -35,
        style: {
          fontSize:'10px'
        }
      }
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,


      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: unit,
        margin: 5
      },
      min: 0,
      max: maxX, 
      tickInterval: tick
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' ' + unit + ')' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: '2011',
      color: '#8dd3c7',
      data: [null, null, null, null, null, null, null, null, null, null, null, null, null]
    }, {
      name: '2050',
      color: '#ffffb3',
      data: [null, null, null, null, null, null, null, null, null, null, null, null, null]
    }
    ]
  });
}

function initLandGrainFedCharts() {

  chart_land_yields_grain_fed = new Highcharts.Chart({

    credits: {  enabled: false },
    chart: {
      renderTo: 'container_land_yields_grain_fed',
      marginLeftt:5,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
      text: 'Lifestock fed with cereals & residues'
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ['Beef', 'Sheeps & goats', 'Pigs', 'Poultry'] },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { 
        style: {
          fontSize: '9px',
	  fontWeight: 'normal'
        },
        text: '%',
        margin: 5
      },
      min: 0,
      max: 100, 
      tickInterval: 10
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '9px',
        padding: '8px'
      },
      positioner: function () {
        return { x: 5, y: 30 };
      },
      // valueSuffix: ' EJ',
      useHTML: true,
      headerFormat: '{point.key}' + ' (%)' + '<table>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: '2011',
      color: '#8dd3c7',
      data: [null, null, null, null]
    }, {
      name: '2050',
      color: '#ffffb3',
      data: [null, null, null, null]
    }
    ]
  });
}

function initLandCharts () {

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // land: overview chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------

    chart_land_overview = new Highcharts.Chart({
        credits: { enabled: false },
        chart: {

            renderTo: 'container_land_overview',
            marginRight:20,
            type: 'area',
            events: {
                 load: function () {
                 }
            }
        },
        title: {
            style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif' },
	    text: 'Land use'
        },
        legend: { enabled: false },
        exporting: { enabled: false },

        plotOptions: {
          area: {
            stacking: 'normal',
            lineWidth: 0,
            marker: { enabled: false }
          }
        },
        xAxis: {
          min: 1990,
          max: 2050,
          tickInterval: 5,

          labels: {
            formatter: function() {
               if (this.value == '1990') return this.value;
               if (this.value == '2000') return this.value;
               if (this.value == '2010') return this.value;
               if (this.value == '2020') return this.value;
               if (this.value == '2030') return this.value;
               if (this.value == '2040') return this.value;
               if (this.value == '2050') return this.value;
               return '';
             }
          }
        },

        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            style: {
              fontSize: '9px',
	      fontWeight: 'normal'
            },
            text: 'M ha', // 'million HA',
            margin: 5
          },
          min: 0,
          max: 14000,
          tickInterval: 1000
        },
        tooltip: {
          shared: true,
          style: {
      	    fontSize: '9px',
      	    padding: '8px'
      	  },
          positioner: function () {
            return { x: 15, y: 30 };
          },
          useHTML: true,
          headerFormat: '{point.key}' + ' (M ha)' + '<table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        },
        series: [
         {
	  name: 'Desert, ice etc',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#ffffcc',
          marker: { radius: 2 }
         }, {
	  name: 'Settlements and infrastructure',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#bdbdbd',
          marker: { radius: 2 }
         }, {
	  name: 'Natural grassland',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#a6cee3',
          marker: { radius: 2 }
         }, {
	  name: 'Land for energy crops',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#1f78b4',
          marker: { radius: 2 }
         }, {
	  name: 'Commercial forest',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#b2df8a',
          marker: { radius: 2 }
         }, {
	  name: 'Forest',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#33a02c',
          marker: { radius: 2 }
         }, {
	  name: 'Land for non-food crops',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#ff7f00',
          marker: { radius: 2 }
         }, {
	  name: 'Land for food crops',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#fb9a99',
          marker: { radius: 2 }
         }, {
	  name: 'Land for animals (pasture)',
          data: [ [1990,111], [1995,111], [2000,111], [2005,111], [2010,111], [2011, 111], [2015, 111], [2020, 111], [2025, 111], [2030, 111], [2035, 111], [2040, 111], [2045, 111], [2050, 111] ],
          color: '#e31a1c',
          marker: { radius: 2 }
         }

        ]

    }, function(chart) {
        
       // ------------------------------------------------------------------------
       // add vertical separator line between observed and projected time series
       // ------------------------------------------------------------------------
       var x = chart.xAxis[0].toPixels(2010);
       var y  = chart.yAxis[0].toPixels(14000);

       var y1  = chart.yAxis[0].toPixels(0);
       var x1 = chart.xAxis[0].toPixels(1990);
       var x2 = chart.xAxis[0].toPixels(2100);

       chart.renderer.path(['M', x1, y1, 'L', x2, y1])
         .attr({'stroke-width': 1, stroke: 'black' }).add();

       chart.renderer.path(['M', x, y, 'L', x, 280])
         .attr({'stroke-width': 1, stroke: 'silver', dashstyle: 'dash' }).add();

       chart.renderer.text('observed', x-45, 45)
         .css({ color: '#C0C0C0', fontSize: '9px'}).add();

       chart.renderer.text('projected', x+12, 45)
         .css({ color: '#C0C0C0', fontSize: '9px' }).add();

    });

/*
    chart_land_overview_OLD = new Highcharts.Chart({
        chart: {
            renderTo: 'container_land_overview',
            type: 'column',
        },
        title: {
            style: {
		      font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
		    },
            text: 'Global land use 2050'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          pie: {

                colors: [  '#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494'],
                size: 150,
                // allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#ddd',
                    connectorColor: '#ddd',
                    connectorPadding: 5,
                    distance: 20,
                    format: '{point.name}<br>{point.percentage:.1f} %',
                     style: {
					   fontSize: '10px'
                    }
                }
            }
        },
        series: [{
          type: 'pie',
          name: 'Land use 2050',
          data: [
                ['Forest',   20],
                ['Arable (food crops)',       20],
                ['Arable (bioenergy)', 15],
                ['Arable (other)',    10],
                ['Pasture for livestock',     15],
                {
	                name: 'Unproductive (desert, settlements)',
	                y: 23,
	                selected: true,
	                sliced: true
	        },
                ['Remainder productive land',     15]
            ]        }
       ]
    });
*/


/*
 :land_use=>{"forest"=>["Global Forest", 2442594069.1868095], "arable.food"=>["Global Arable land for food crops", 772800278.4439362], "arable.bio"=>["Global Arable land for bioenergy", 0.0], "arable.other"=>["Global Arable land for other ", 8000000.0], "pasture.food"=>["Global Pasture for livestock", 6240942594.369254], "other.land.unproductive"=>["Global Other land (desert, settlements)", 4076305710.0], "other.land.productive"=>["Global Remainder of productive terestial land after bioenergy and food", 139607108.00000012]}, 
*/

    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    //
    // land: detail chart
    //
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
/*
    chart_land_detail = new Highcharts.Chart({
        chart: {
            renderTo: 'container_land_detail',
            type: 'column',
        },
        title: {
            style: {
		      font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'
		    },
            text: 'Details for land use: settlements<br>Note: only dummy data for demonstration purposes!'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {

                colors: [   '#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4' ],
                size: 150,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#ddd',
                    connectorColor: '#ddd',
                    connectorPadding: 5,
                    distance: 20,
                    format: '{point.name}<br>{point.percentage:.1f} %',
                     style: {
					   fontSize: '10px'
                    }
                }
            }
        },
        series: [{
          type: 'pie',
          name: 'Land use 2050',
          data: [
                ['Resident. buildings',   20],
                ['Non-resident. buildings',       20],
                ['Transport infra.', 20],
                ['Elect. Gen. infra.',    20],
            ]        }
       ]
    });
*/

} // end initLandCharts ()



