$(function(){
  var data;
  var refresh = function(){
    jQuery.get( "/all", function( d ) {
      data = d;
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
  var addPersonSave = function(){
    $.post( "/people", $( "#addPersonForm" ).serialize() )
        .done(function( data ) {
          refresh();
        });
  };
  var refreshCallback = function(){
    refreshPeopleData();
  };
  $(document).ready(function(){
    refresh();
    $("#btnAddPersonSave").click(addPersonSave);
  });

});
