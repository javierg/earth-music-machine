$( function(){

  var earth;
  var audio;
  var city_mag_factor = 1.8;
  var cities_elem = '#cities';
  earth = new Earth("#earth");
  earth.animate();

  var magnitude_factor = function( mag ) {
    res = Math.pow(mag,city_mag_factor);
    console.log( res );
    return res;
  }

  $.quakes({period: 'day'}, function(_q){
    var _frequencies = [];
    var _quakes = [];
    var _htz;
    $.each( _q, function(k, v){
      _htz = v.mg * 80
      _frequencies.push(_htz);
      _quakes[_htz] = v;
    });
    $("#earth").click( function(){
      $( cities_elem ).empty();
      audio = new AudioletApp( _frequencies, _quakes );
      audio.addEventListener('playing', function(evt){

        //evt includes evt.data with thequake location
        evt_data = evt.data;
        p = $( document.createElement('p') );
        p.append( evt_data.place )
        p.hide();
        p.css( 'font-size', magnitude_factor( evt_data.mg ) );
        $(cities_elem).append(p.fadeIn());
      })
    });

    $("#loading").remove();

  });
});
