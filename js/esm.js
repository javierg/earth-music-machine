$( function(){

  var earth;
  var audio;
  earth = new Earth("#earth");
  earth.animate();

  $.quakes({period: 'day'}, function(_q){
    _frequencies = []
    $.each( _q, function(k, v){
      _frequencies.push( v.mg * 80 );
    });
    $("#earth").click( function(){
      audio = new AudioletApp( _frequencies );
    });

    $("#loading").remove();

  });
});
