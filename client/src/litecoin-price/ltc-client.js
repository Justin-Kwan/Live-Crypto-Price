/**
 *  application client side that fetches from server and produces
 *  graph with realtime price
 */

var currPrice = 0;

fetch('http://127.0.0.1:8080/getLatestPriceLtc')
.then(function(response) {
    return response.json();
})
.then(function(Data) {

    currPrice = parseFloat(Data);

    var data = [
      {
        y:[currPrice], type:'line'
      }
    ];


    var layout = {
      title: '',
      showlegend: false,

      yaxis: {
        ticks: '',
        tickprefix: '$ ',
        width: 700,
        height: 700,
        autosize: false,
        fixedrange:true
      },
      xaxis: {
        ticks: '',
        tickformat: '',
        side: 'bottom',
        fixedrange:true
      }

    };

    Plotly.newPlot('chart', data, layout, {displayModeBar: false});

    var count = 0;

    setInterval(function() {

      fetch('http://127.0.0.1:8080/getLatestPriceLtc')
      .then(function(response) {
         // returns response in JSON format
          return response.json();
      })
      .then(function(Data) {

        var Digital = new Date();
        var hours = Digital.getHours();
        var minutes = Digital.getMinutes();

          currPrice = parseFloat(Data);

          Plotly.extendTraces('chart', {
            y:[[currPrice]]
          }, [0]);

          count++;
      });

        if(count > 24) {
            Plotly. relayout('chart',{
                xaxis: {
                  // starting range, ending range
                  range: [count - 24, count]
                }
            });
        }
    // repeat loop every 5 seconds to fetch latest price
    }, 5000);

});
