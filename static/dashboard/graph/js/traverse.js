(function(){
    // create a network
    var container = document.getElementById('family-network');
    var traverseDataNodes = new vis.DataSet();
    var traverseDataEdges = new vis.DataSet();
    var traverseNodeIds = [];
    var traverseEdgeIds = [];
    var setSelectionData ={
      nodes:[],
      edges:[]
    };
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
      },
      physics: {
        barnesHut: {
          avoidOverlap: 1
        }
      }
    };

    var network = new vis.Network(container, {}, options);
    network.on("doubleClick", function (params) {
        setSelectionData.nodes.push(params.nodes[0].toString());
        var explodeNode = traverseDataNodes.get(params.nodes[0].toString());
        for(var i=0;i<explodeNode.connections.length;i++){
          var c = traverseDataEdges.get(explodeNode.connections[i]);
          if(c){
            if(c.from.toString() == explodeNode._id.toString()){
              if(traverseNodeIds.indexOf(c.to.toString()) >= 0){
                setSelectionData.edges.push(explodeNode.connections[i].toString());
              }
            }
            if(c.to.toString() == explodeNode._id.toString()){
              if(traverseNodeIds.indexOf(c.from.toString()) >= 0){
                setSelectionData.edges.push(explodeNode.connections[i].toString());
              }
            }
          }
        }
        for(var i=0;i<explodeNode.neighbours.length;i++){
          if(traverseNodeIds.indexOf(explodeNode.neighbours[i]) < 0){
            jQuery.get( "/people/"+explodeNode.neighbours[i]+"", function( data ) {
              for(var i=0;i<data.length;i++){
                data[i].label = data[i].name;
                data[i].id = data[i]._id;
                traverseNodeIds.push(data[i]._id);
                traverseDataNodes.add(data[i]);
              }
            });
          }
        }
        for(var i=0;i<explodeNode.connections.length;i++){
          if(traverseEdgeIds.indexOf(explodeNode.connections[i]) < 0){
            jQuery.get( "/connections/"+explodeNode.connections[i]+"", function( data ) {
              data.label = data.name;
              data.id = data._id;
              traverseEdgeIds.push(data._id);
              traverseDataEdges.add(data);
            });
          }
        }
        setTimeout(function(){
          network.setData({
            nodes:traverseDataNodes,
            edges:traverseDataEdges
          });
          network.selectNodes([]);
          network.selectEdges([]);
          network.setSelection(setSelectionData);
        }, 200);

    });
    var addNode = function(node){
      traverseData.nodes.add(node);
    };
    var refresh = function(){
      traverseDataNodes = new vis.DataSet();
      traverseDataEdges = new vis.DataSet();
      traverseNodeIds = [];
      traverseEdgeIds = [];
      var setSelectionData ={
        nodes:[],
        edges:[]
      };
      var url = new URL(window.location.href);
      var id = url.searchParams.get("id");
      if(id){
        jQuery.get( "/people/"+id+"", function( data ) {
          data = data[0];
          data.label = data.name;
          data.id =data._id;
          traverseDataNodes.add(data);
          traverseNodeIds.push(data._id);
          setSelectionData.nodes.push(data._id.toString());
          network.setData({
            nodes:traverseDataNodes,
            edges:traverseDataEdges
          });
          network.setSelection(setSelectionData);
        });
      }
    };

    $(document).ready(function(){
      refresh();
      $(".btnrefresh").click(refresh);
    });


}());
