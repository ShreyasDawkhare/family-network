$(function(){
  var data;
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
    jQuery.get( "all", function( d ) {
      data = d;
      if(availableTags.length <= 0) {
        for (var i in data.nodes) {
            availableTags.push({label:data.nodes[i].label,value:data.nodes[i].label, index:i});
        }
      }
      refreshCallback();
    });
  };
  var refreshPeopleData = function(){
    $(".people-table-container").html('<table id="people-table" class="table table-bordered table-striped table-responsive"><thead><tr><th style="display:none;">ID</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>ImageURL</th></tr></thead><tbody></tbody></table>');
    for(i in data.nodes){
      $("#people-table tbody").append("<tr><td style='display:none;'>"+data.nodes[i].id+"</td><td>"+data.nodes[i].firstname+"</td><td>"+data.nodes[i].lastname+"</td><td>"+data.nodes[i].gender+"</td><td>"+data.nodes[i].image+"</td></tr>");
    }
    $('#people-table').Tabledit({
      url: '/table/people',
      columns: {
          identifier: [0, 'id'],
          editable: [[1, 'firstname'], [2, 'lastname'], [3, 'gender'], [4, 'imageurl']]
      },
      restoreButton: false,
      editButton:false,
      onDraw: function() {
          $('#people-table').DataTable();
      }
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
      $("#connections-table tbody").append("<tr><td style='display:none;'>"+data.edges[i].id+"</td><td>"+f[0].firstname+" "+f[0].lastname+"</td><td>"+data.edges[i].relationtype+"</td><td>"+t[0].firstname+" "+t[0].lastname+"</td></tr>");
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
  var addPersonSave = function(){
    $.post( "people", $( "#addPersonForm" ).serialize() )
        .done(function( data ) {
          refresh();
        });
  };
  var addConnectionSave = function(){
    var fromid = $("#add-from").attr("data-personid");
    var toid = $("#add-to").attr("data-personid");
    var color = { color: getColorRelation()[$("#add-relationship").val()] };
    var relationtype = $("#add-relationship").val();
    var arrow = getArrowforRelation($("#add-relationship").val());
    var data = {
      from:fromid,
      to:toid,
      color:color,
      arrow:arrow,
      relationtype:relationtype
    };
    $.post( "connections", data)
        .done(function( data ) {
          $("#add-from").val('');
          $("#add-relationship").val('');
          $("#add-to").val('');
          refresh();
        });
  };
  var refreshCallback = function(){
    refreshPeopleData();
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
    $("#btnAddPersonSave").click(addPersonSave);
    $("#btnAddConnectionSave").click(addConnectionSave);
  });

});
