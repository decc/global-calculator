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

function roundValue (value) {
   return Math.round (value * 10.0) / 10.0;
}
function roundValue2 (value) {
 return Math.round (value * 100.0) / 100.0;
}


function initLineGraphForCompareValues (containerID, title, unitName, yMin, yMax, ytick, data) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataForCompareValues (chart, data);
}

function initLineGraph (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createLineGraph (containerID, title, unitName, yMin, yMax, ytick)
  pumpData (chart, data, scalefactor);
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
function initStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick, data, scalefactor) {
  var chart = createStackedColumnChart (containerID, title, unitName, yMin, yMax, ytick)
  pumpDataColumnChart (chart, data, scalefactor);
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
      text: title
    },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050 Level 1', '2050 Level 2', '2050 Level 3', '2050 Level 4']  },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: unitName,
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
          headerFormat: '{point.key}' + ' (' + unitName + ')' + '<table>',
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
      text: title
    },
    exporting: { enabled: false },
    xAxis: { categories: ['2011', '2050 Level 1', '2050 Level 2', '2050 Level 3', '2050 Level 4']  },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: unitName,
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
          headerFormat: '{point.key}' + ' (' + unitName + ')' + '<table>',
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
      animation: false,
      marginRight: 15
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: title
    },
    exporting: { enabled: false },
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
        text: unitName,
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
        pointFormat: '{point.x}: {point.y} ' + unitName
        }
      },
      line: { enableMouseTracking: false, shadow: false, animation: false, marker: { enabled: false } }
    },
    tooltip: {
      shared: true,
      yDecimals: 2,
      style: {
     	fontSize: '9px',
      	padding: '8px'
      },
      positioner: function () { return { x: 15, y: 30 }; },
      //valueSuffix: unitName,
      useHTML: true,
      headerFormat: '{point.key} ' + unitName + '<table>',
      pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
                   '<td style="text-align: right">{point.y:.2f}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Level 1',
      data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Level 2',
      data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Level 3',
      data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Level 4',
      data: [ [2011, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }

    ]
  });

  return chart

} // end createGraph ()

function createLineGraphHistoric (containerID, title, unitName, yMin, yMax, ytick) {

  var chart = new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: containerID,
      type: 'line',
      animation: false,
      marginRight: 15
    },
    title: {
      style: { font: 'normal 11px "Trebuchet MS", Verdana, sans-serif'  },
      text: title
    },
    exporting: { enabled: false },
    plotOptions: {
      line: { enableMouseTracking: false, shadow: false, animation: false, marker: { enabled: false } }
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
        text: unitName,
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
      positioner: function () { return { x: 15, y: 30 }; },
      //valueSuffix: unitName,
      useHTML: true,
      headerFormat: '{point.key} ' + unitName + '<table>',
      pointFormat: '<tr><td nowrap style="color: {series.color}">{series.name}: </td>' +
                   '<td dataset style="text-align: right">{point.y:.2f}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
    {
      name: 'Level 1',
      data: [ [2010, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Level 2',
      data: [ [2010, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Level 3',
      data: [ [2010, 10], [2015, 10], [2020, 10], [2025, 10], [2030, 10], [2035, 10], [2040, 10], [2045, 10], [2050, 10] ]
    }, {
      name: 'Historic',
      color: "orange",
      data: [ [1975, 10], [1980, 10], [1985, 10], [1990, 10], [1995, 10], [2000, 10], [2005, 10], [2010, 10] ]
    }
    ]
  });

  return chart

} // end createGraph ()






function pumpDataForCompareValues (chart, data) {

  var data_1 = new Array (9);
  var data_2 = new Array (9);
  var data_3 = new Array (9);
  var data_4 = new Array (9);

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = data[2][i+8];
    data_2[i] = data[3][i+8];
    data_3[i] = data[4][i+8];
    data_4[i] = data[5][i+8];
  }
  // -----------------------------------------------------------------
  // pump  data 
  // -----------------------------------------------------------------
  setDataPoints (chart, 0, data_1);
  setDataPoints (chart, 1, data_2);
  setDataPoints (chart, 2, data_3);
  setDataPoints (chart, 3, data_4);

/*
    chart.addSeries({                        
      name: 'TEST',
      type: 'scatter',
      data: [ [2011, 34] ]
    });
*/



  for (var i=6; i<data.length; i++) {
    chart.addSeries({                        
      name: data[i][0],
      type: 'scatter',
      data: [ [2011, data[i][8]] ]
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

    var shortedName = data[0][n].replace(' used by people with access to electricity','');
    shortedName = shortedName.replace('Global urban','Urban');
    shortedName = shortedName.replace(' (electric and internal combustion)','');
    shortedName = shortedName.replace('Design for ','');
    shortedName = shortedName.replace('Material switch for ','');

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

    var shortedName = data[0][n].replace(' used by people with access to electricity','');
    shortedName = shortedName.replace('Global urban','Urban');
    shortedName = shortedName.replace(' (electric and internal combustion)','');
    shortedName = shortedName.replace('Design for','');

    chart.addSeries({                        
      name: shortedName,
      color: colors[n],
      data: dataset
    });
  }

    chart.xAxis[0].setCategories(['2050 Level 1', '2050 Level 2', '2050 Level 3', '2050 Level 4']);


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

  for (var i=0; i<data_1.length; i++) {
    data_1[i] = data[2][i+8]*scalefactor;
    data_2[i] = data[3][i+8]*scalefactor;
    data_3[i] = data[4][i+8]*scalefactor;
    data_4[i] = data[5][i+8]*scalefactor;
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

  for (var i=0; i<data_1.length; i++) 
    data_h[i] = Math.round (data[1][i+1]);

  for (var i=0; i<data_2.length; i++) {
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

  var data_h = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010];
  var data_1 = [2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_2 = [2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
  var data_3 = [2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];

  for (var i=0; i<data_1.length; i++) 
    data_h[i] = Math.round (data[1][i+1]*scalefactor);

  for (var i=0; i<data_2.length; i++) {
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



