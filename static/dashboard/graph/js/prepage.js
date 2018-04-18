(function(){

    var loadheader = function(){
      jQuery.get( "/dashboard/graph/header.html", function( data ) {
        $(".header-container").html(data);
        $( "#header-search" ).autocomplete({
          source: "/search_autocomplete",
          minLength: 2
        });
        $( "#header-search" ).on( "autocompleteselect", function( event, ui ) {
          $("#header-search-id").val(ui.item.id);
        } );
      });
    };
    var loadleftsidebar = function(){
      jQuery.get( "/dashboard/graph/leftsidebar.html", function( data ) {
        $(".leftsidebar-container").html(data);
      });
    };

    $(document).ready(function(){
      loadheader();
      loadleftsidebar();
    });


}());
