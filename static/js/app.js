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
        brokenImage: 'icon/circle-dark.png',
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
          background: '#3498db',
          highlight: {
            border: '#d35400',
            background: '#e67e22'
          },
          hover: {
            border: '#d35400',
            background: '#e67e22'
          }
        }
      },
      edges:{
        width: 2,
        font: '12px arial #ff0000',
        scaling:{
          label: true,
        },
        smooth: true,
        length: 260
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: false,
        selectConnectedEdges: true,
      },
      layout: {
        randomSeed: 0,
        improvedLayout:true
      }
    };

    var network = new vis.Network(container, data, options);

    var refresh = function(){
      jQuery.get( "all", function( data ) {
        network.setData(data);
      });
    };

    var addPersonSave = function(){
      $.post( "people", $( "#addPersonForm" ).serialize() )
          .done(function( data ) {
              refresh();
          });
      $('#addPersonModal').modal('hide');
    };

    var addRelationSave = function(){
      var data = $("#addRelationForm").serializeArray();
      console.log(data);
      $.post( "connections", $( "#addRelationForm" ).serialize() )
          .done(function( data ) {
              refresh();
              console.log(data);
          });
      $('#addRelationModal').modal('hide');
    };

    $(document).ready(function(){
      refresh();
      $(".btnRefresh").click(refresh);
      $("#btnAddPersonSave").click(addPersonSave);
      $("#btnAddRelationSave").click(addRelationSave);
    });


}());
