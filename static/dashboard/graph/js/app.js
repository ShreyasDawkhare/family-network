(function(){
    // create a network
    var container = document.getElementById('family-network');
    var data = {};
    var options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      locale: 'en',
      interaction:{
        multiselect: true,
        navigationButtons: true
      },
      nodes: {
        borderWidth: 2,
        borderWidthSelected: 2,
        shape: 'circularImage',
        //brokenImage: 'icon/circle-dark.png',
        image: '',
        size: 35,
        font: {
          color: '#000000',
          size: 14, // px
          face: 'arial',
          align: 'center'
        },
        color: {
          border: '#2980b9',
          background: '#29B6F6',
          highlight: {
            border: '#E64A19',
            background: '#FF5722'
          },
          hover: {
            border: '#E64A19',
            background: '#FF5722'
          }
        }
      },
      edges:{
        width: 3,
        font: '12px arial #ff0000',
        scaling:{
          label: true,
        },
        smooth: true,
        length: 400
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: false,
        selectConnectedEdges: true,
      },
      layout: {
        randomSeed: 0,
        improvedLayout:true
      },
      physics: {
        barnesHut: {
          avoidOverlap: 1
        }
      }
    };

    var network = new vis.Network(container, data, options);
    network.on("doubleClick", function (params) {
        console.log(params);

    });
    var refresh = function(){
      jQuery.get( "/all", function( data ) {
        console.log(data);
        network.setData(data);
      });
    };

    $(document).ready(function(){
      refresh();
      $(".btnrefresh").click(refresh);
    });


}());
