$(function(){
  var data;
  var ConnectionEdges = new vis.DataSet();
  var availableTags = [];
  var getColorRelation = function(){
    return color_relation_map = {
      'husband-wife': "#E81123",
      'son-father': "#00c300",
      'son-mother':"#00c300",
      'daughter-father':"#00c300",
      'daughter-mother':"#00c300",
      'siblings':"#FFB900"
    };
  };
  var getArrowforRelation = function(relationship){
    switch(relationship) {
      case 'husband-wife': return {to:false,from:false};
      case 'son-father': return {to:true,from:false};
      case 'son-mother': return {to:true,from:false};
      case 'daughter-father': return {to:true,from:false};
      case 'daughter-mother': return {to:true,from:false};
      case 'siblings': return {to:false,from:false};
    }
  };
  var refresh = function(){
    jQuery.get( "/all", function( d ) {
      data = d;
      ConnectionEdges = new vis.DataSet(d.edges);
      if(availableTags.length <= 0) {
        for (var i in data.nodes) {
            availableTags.push({label:data.nodes[i].label,value:data.nodes[i].label, index:i});
        }
      }
      refreshCallback();
    });
  };
  var getPersonById = function(id){
    return data.nodes.filter(
      function(x) {
        return x.id == id;
      }
    );
  }
  var refreshConnectionsData = function(){
    $(".connections-table-container").html('<table id="connections-table" class="table table-bordered table-striped table-responsive"><thead><tr><th style="display:none;">ID</th><th>First person</th><th>Relationship</th><th>Second person</th></tr></thead><tbody></tbody></table>');
    for(i in data.edges){
      var f = getPersonById(data.edges[i].from);
      var t = getPersonById(data.edges[i].to);
      $("#connections-table tbody").append("<tr><td style='display:none;'>"+data.edges[i].id+"</td><td>"+f[0].label+"</td><td>"+data.edges[i].relationtype+"</td><td>"+t[0].label+"</td></tr>");
    }
    $('#connections-table').Tabledit({
      url: '/table/connections',
      columns: {
          identifier: [0, 'id'],
          editable: []
      },
      restoreButton: false,
      editButton:false,
      onDraw: function() {
          $('#connections-table').DataTable();
      }
    });
  };
  var addConnectionSave = function(){
    var fromid = $("#add-from").attr("data-personid");
    var toid = $("#add-to").attr("data-personid");
    var relationtype = $("#add-relationship").val();
    var edges = ConnectionEdges.get({
      filter: function (item) {
        return ((item.from.toString() == fromid && item.to.toString() == toid) || (item.to.toString() == fromid && item.from.toString() == toid));
      }
    });
    if(edges.length <= 0){
      console.log("not present");
      var data = {
        from:fromid,
        to:toid,
        relationtype:relationtype
      };
      $.post( "/connections", data)
          .done(function( data ) {
            $("#add-from").val('');
            $("#add-relationship").val('');
            $("#add-to").val('');
            refresh();
          });

    } else {
      console.log("already present");
    }

  };
  var refreshCallback = function(){
    refreshConnectionsData();
  };
  $(".person-search").autocomplete({
    source: availableTags
  });
  $( "#add-from" ).on( "autocompleteselect", function( event, ui ) {
    $("#add-from").attr("data-personid",data.nodes[ui.item.index].id);
  } );
  $( "#add-to" ).on( "autocompleteselect", function( event, ui ) {
    $("#add-to").attr("data-personid",data.nodes[ui.item.index].id);
  } );
  $(document).ready(function(){
    refresh();
    $("#btnAddConnectionSave").click(addConnectionSave);
  });

});
