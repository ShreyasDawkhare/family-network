$( function() {

  var availableTags = [];
  var people = [];
  var loadPeople = function(){
    jQuery.get( "/people", function( data ) {
      people = data;
      console.log(people);
      for (var i in people) {
        console.log(people[i]);
          availableTags.push({label:people[i].label,value:people[i].label, index:i});
      }
      console.log(availableTags);
    });
  };
  var addPersonSave = function(){
    $.post( "people", $( "#addPersonForm" ).serialize() )
        .done(function( data ) {
        });
  };
  var saveRelationship = function(){
    var from = $(".name-from").attr("data-personid");
    var to = $(".name-to").attr("data-personid");
    var relationtype = $(".relationship-types > li > .active").attr("data-relationtype");
    var color = $(".relationship-types > li > .active").attr("data-color");
    var arrowfrom = $(".relationship-types > li > .active").attr("data-arrowfrom");
    var arrowto = $(".relationship-types > li > .active").attr("data-arrowto");
    var data ={
      from:from,
      to:to,
      relationtype:relationtype,
      color:{color:color},
      arrow:{from:arrowfrom,to:arrowto}
    };
    console.log(data);
    $.post( "connections", data )
        .done(function( data ) {
            console.log(data);
        });
  };
  $(document).ready(function(){
    loadPeople();
    $("#btnAddPersonSave").click(addPersonSave);
    $("#btnSaveRelationship").click(saveRelationship);
  });
  $(".person-search").autocomplete({
    source: availableTags
  });
  $( "#search-from" ).on( "autocompleteselect", function( event, ui ) {
    console.log(ui);
    $(".name-from").html(ui.item.label);
    var img = people[ui.item.index].image;
    if(img == ""){
      img='icon/person-icon.png';
    }
    $(".image-from img").attr("src",img);
    $(".name-from").attr("data-personid",people[ui.item.index].id);
  } );
  $( "#search-to" ).on( "autocompleteselect", function( event, ui ) {
    console.log(ui);
    $(".name-to").html(ui.item.label);
    var img = people[ui.item.index].image;
    if(img == ""){
      img='icon/person-icon.png';
    }
    $(".image-to img").attr("src",img);
    $(".name-to").attr("data-personid",people[ui.item.index].id);
  } );
} );
