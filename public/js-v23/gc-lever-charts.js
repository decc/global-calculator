/* *********************************************************
 *
 * Author: Markus Wrobel 2014 - all rights reserved 
 *
 * *********************************************************
 */
 
 function roundVal (value, fac) {
  var x = 10*fac;
  value = Math.round (value * x) / x;
 return value;
}

function initLineGraphroundValue (value) {
   return Math.round (value * 10.0) / 10.0;
}
function roundValue2 (value) {
 return Math.round (value * 100.0) / 100.0;
}
function roundValue1 (value) {
 return Math.round (value * 10.0) / 10.0;
}
function roundValue0 (value) {
 return Math.round (value);
}


function initLineGraphForCompareValues (containerID, title, unitName, yMin, yMax, ytick, data) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataForCompareValues (chart, data);
}
function initLineGraphForCompareValues2 (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataForCompareValues2 (chart, data, scalefactor);
}

function initLineGraph (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpData (chart, data, scalefactor);
}
function initLineGraph1 (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpData1 (chart, data, scalefactor);
}
function initLineGraphHistoric (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraphHistoric (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataHistoric (chart, data, scalefactor);
}
function initLineGraphHistoricPop (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraphHistoric (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataHistoricPop (chart, data, scalefactor);
}

function initColumnChart (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChart (chart, data, scalefactor);
}
function initColumnChart2 (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChart2 (chart, data, scalefactor);
}

function initStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChart (chart, data, scalefactor);
}
function initStackedColumnChart2 (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChart2 (chart, data, scalefactor);
}
function initStackedColumnChartWithout2011 (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChartWithout2011 (chart, data, scalefactor);
}


function createColumnChart (containerID, title, unitName, yMin, yMax, ytick) {

  var chart = new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: containerID,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: translate(title)
    },
    exporting: { enabled: false },
    xAxis: { categories: [translate ('2011'), translate ('2050 Level 1'), translate ('2050 Level 2'), translate ('2050 Level 3'), translate ('2050 Level 4')]  },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: translate(unitName),
        margin: 5
      },
      min: yMin,
      max: yMax,
      tickInterval: ytick
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
          headerFormat: '{point.key}' + ' (' + translate(unitName) + ')' + '<table>',
          pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'
        }
  });
  return chart

} // end createColumnChart ()


function createStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick) {

  var chart = new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: containerID,
      type: 'column'
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: translate(title)
    },
    exporting: { enabled: false },
    xAxis: { categories: [translate ('2011'), translate ('2050 Level 1'), translate ('2050 Level 2'), translate ('2050 Level 3'), translate ('2050 Level 4')]  },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: translate(unitName),
        margin: 5
      },
      min: yMin,
      max: yMax,
      tickInterval: ytick
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
          headerFormat: '{point.key}' + ' (' + translate(unitName) + ')' + '<table>',
          pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right">{point.y}</td></tr>',
          footerFormat: '</table>'

        },
        plotOptions: {
          column: { stacking: 'normal' }
        }
  });
  return chart

} // end createStackedColChart ()


function createLineGraph (containerID, title, unitName, yMin, yMax, ytick) {

  var chart = new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: containerID,
      type: 'line',
      marginRight: 15
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: translate(title)
    },
    exporting: { enabled: false },
    plotOptions: {
      line: {
        marker: { enabled: false }
      }
    },
    xAxis: {
      min: 2011,
      max: 2050,
      tickInterval: 5,
      labels: {
   	fontSize: '10px',

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
          fontSize: '10px',
	  fontWeight: 'normal'
        },
        text: translate(unitName),
        margin: 5
      },
      min: yMin,
      max: yMax,
      tickInterval: ytick
    },
    plotOptions: {
      scatter: {
        tooltip: {
          style: {
     	    fontSize: '9px',
       	    padding: '8px'
          },
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x}: {point.y} ' + translate(unitName)
        }
      },
      line: {
        marker: { enabled: false }
      }
    },
    tooltip: {
      shared: true,
      yDecimals: 2,
      style: {
     	fontSize: '9px',
      	padding: '8px'
      },
      // positioner: function () { return { x: 15, y: 30 }; },
      useHTML: true,
      headerFormat: '{point.key} ' + translate(unitName) + '<table>',
      pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y:.2f}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: translate('Level 1'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Level 2'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Level 3'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Level 4'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }

    ]
  });

  return chart;

} // end createGraph ()

function createLineGraphHistoric (containerID, title, unitName, yMin, yMax, ytick) {

  var chart = new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: containerID,
      type: 'line',
      marginRight: 15
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: translate(title)
    },
    exporting: { enabled: false },
    plotOptions: {
      line: {
        marker: { enabled: false }
      }
    },
    xAxis: {
      min: 1975,
      max: 2050,
      tickInterval: 5,
      labels: {
   	fontSize: '10px',

        formatter: function() {
          if (this.value == '1980') return this.value;
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
          fontSize: '10px',
	  fontWeight: 'normal'
        },
        text: translate(unitName),
        margin: 5
      },
      min: yMin,
      max: yMax,
      tickInterval: ytick
    },
    tooltip: {
      shared: true,
      yDecimals: 2,
      style: {
     	fontSize: '9px',
      	padding: '8px'
      },
      // positioner: function () { return { x: 15, y: 30 }; },
      useHTML: true,
      headerFormat: '{point.key} ' + translate(unitName) + '<table>',
      pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
                   '<td dataset style="text-align: right">{point.y:.1f}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: translate('Level 1'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Level 2'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Level 3'),
      data: [ [2011, 0], [2015, 0], [2020, 0], [2025, 0], [2030, 0], [2035, 0], [2040, 0], [2045, 0], [2050, 0] ]
    }, {
      name: translate('Observed'),
      color: "orange",
      data: [ [1975, 0], [1980, 0], [1985, 0], [1990, 0], [1995, 0], [2000, 0], [2005, 0], [2010, 0], [2011, 0] ]
    }
    ]
  });

  return chart

} // end createGraph ()


// make compatible to structure (= move compare values to the end)
function reverseCompareValueRows (x) {

  var data = [];

  data[0] = x[0];
  data[1] = x[1];
  data[2] = x[x.length-4];
  data[3] = x[x.length-3];
  data[4] = x[x.length-2];
  data[5] = x[x.length-1];

  for (var i=2; i<x.length-4; i++) 
    data[i+4] = x[i];

  //alert (data);
  return data;

}





function pumpDataForCompareValues (chart, data) {

  var data_1 = new Array (9);
  var data_2 = new Array (9);
  var data_3 = new Array (9);
  var data_4 = new Array (9);

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = data[2][i+9];
    data_2[i] = data[3][i+9];
    data_3[i] = data[4][i+9];
    data_4[i] = data[5][i+9];
  }
  // -----------------------------------------------------------------
  // pump  data 
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_4);

  for (var i=6; i<data.length; i++) {
    chart.addSeries({                        
      name: translate(data[i][0]),
      type: 'scatter',
      data: [ [2011, data[i][9]] ]
    });
  }
  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

function pumpDataForCompareValues2 (chart, data, scalefactor) {

  var data_1 = new Array (9);
  var data_2 = new Array (9);
  var data_3 = new Array (9);
  var data_4 = new Array (9);

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = roundValue2 (data[2][i+9]*scalefactor);
    data_2[i] = roundValue2 (data[3][i+9]*scalefactor);
    data_3[i] = roundValue2 (data[4][i+9]*scalefactor);
    data_4[i] = roundValue2 (data[5][i+9]*scalefactor);
  }
  // -----------------------------------------------------------------
  // pump  data 
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_4);

  for (var i=6; i<data.length; i++) {
    chart.addSeries({                        
      name: translate(data[i][0]),
      type: 'scatter',
      data: [ [2011, roundValue2 (data[i][9]*scalefactor)] ]
    });
  }
  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

function pumpDataColumnChart (chart, data, scalefactor) {

  var dataNum = data[0].length-1;

  var colors = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'];
  
  for (var n=1; n<=dataNum; n++) {

    var dataset = new Array (5);
    for (var i=0; i<5; i++) 
      dataset[i] = roundValue2 (data[i+1][n]*scalefactor);

    var shortedName = translate(data[0][n]);

/*
    var shortedName = data[0][n].replace(' used by people with access to electricity','');
    shortedName = shortedName.replace('Global urban','Urban');
    shortedName = shortedName.replace(' (electric and internal combustion)','');
    shortedName = shortedName.replace('Design for ','');
    shortedName = shortedName.replace('Material switch for ','');
*/
    chart.addSeries({                        
      name: shortedName,
      color: colors[n],
      data: dataset
    });
  }

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

// diff data structure
function pumpDataColumnChart2 (chart, data, scalefactor) {

  var dataNum = data.length-1;

  var colors = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'];
  
  for (var n=1; n<=dataNum; n++) {

    var dataset = new Array (5);
    for (var i=0; i<5; i++) 
      dataset[i] = roundValue2 (data[n][i+1]*scalefactor);

    var shortedName = translate(data[n][0]);

    chart.addSeries({                        
      name: shortedName,
      color: colors[n],
      data: dataset
    });
  }

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}


function pumpDataColumnChartWithout2011 (chart, data, scalefactor) {

  var dataNum = data[0].length-1;

  var colors = ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'];
  
  for (var n=1; n<=dataNum; n++) {

    var dataset = new Array (4);
    for (var i=0; i<4; i++) 
      dataset[i] = roundValue2 (data[i+2][n]*scalefactor);

    var shortedName = translate(data[0][n]);
/*
    shortedName = shortedName.replace(' used by people with access to electricity','');
    shortedName = shortedName.replace('Global urban','Urban');
    shortedName = shortedName.replace(' (electric and internal combustion)','');
    shortedName = shortedName.replace('Design for','');
*/


    chart.addSeries({                        
      name: shortedName,
      color: colors[n],
      data: dataset
    });
  }

    chart.xAxis[0].setCategories(['2050 ' + translate('Level 1'), '2050 ' + translate('Level 2'), '2050 ' + translate('Level 3'), '2050 ' + translate('Level 4')]);


  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}



function pumpData (chart, data, scalefactor) {

  var data_1 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_2 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_3 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_4 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];

//  alert (data[2][0+9]);
 // alert (data[2][0+9] + "\n" + data_1[0]);

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = data[2][i+9]*scalefactor;
    data_2[i] = data[3][i+9]*scalefactor;
    data_3[i] = data[4][i+9]*scalefactor;
    data_4[i] = data[5][i+9]*scalefactor;
  }

  // -----------------------------------------------------------------
  // pump  data into the energy demand charts
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_4);

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

function pumpData1 (chart, data, scalefactor) {

  var data_1 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_2 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_3 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_4 = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];


  for (var i=0; i<data_1.length; i++) {
    data_1[i] = data[1][i+9]*scalefactor;
    data_2[i] = data[2][i+9]*scalefactor;
    data_3[i] = data[3][i+9]*scalefactor;
    data_4[i] = data[4][i+9]*scalefactor;
  }

  // -----------------------------------------------------------------
  // pump  data into the energy demand charts
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_4);

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

function pumpDataHistoric (chart, data, scalefactor) {

  var data_h = [1975, 1980, 1985, 1990, 1995, 2000, 2005];
  var data_1 = [2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_2 = [2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_3 = [2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];

  for (var i=0; i<data_h.length; i++) 
    data_h[i] = Math.round (data[1][i+1]);

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = Math.round (data[2][i+8]*scalefactor);
    data_2[i] = Math.round (data[3][i+8]*scalefactor);
    data_3[i] = Math.round (data[4][i+8]*scalefactor);
  }
  // -----------------------------------------------------------------
  // pump  data into the energy demand charts
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_h);

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}

function pumpDataHistoricPop (chart, data, scalefactor) {

  var years_h = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2011];
  var years_m = [2011, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];


  var data_h = [];
  var data_1 = [];
  var data_2 = [];
  var data_3 = [];

  for (var i=0; i<years_h.length; i++) 
    data_h.push (Math.round (data[1][i+1]*scalefactor));
//  data_h.push (null); // currently no value for 2010 !

//  data_1.push (null); // currently no value for 2010 !
//  data_2.push (null); // currently no value for 2010 !
//  data_3.push (null); // currently no value for 2010 !

  for (var i=0; i<years_m.length; i++) {
    data_1.push (Math.round (data[2][i+9]*scalefactor));
    data_2.push (Math.round (data[3][i+9]*scalefactor));
    data_3.push (Math.round (data[4][i+9]*scalefactor));
  }

  // -----------------------------------------------------------------
  // pump  data into the energy demand charts
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_h);

  // -----------------------------------------------------
  // refresh charts
  // -----------------------------------------------------
  chart.redraw();
}



