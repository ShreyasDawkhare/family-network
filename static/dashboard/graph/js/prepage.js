(function(){

    var loadheader = function(){
      jQuery.get( "/dashboard/graph/header.html", function( data ) {
        $(".header-container").html(data);
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
