$( function(){

  var earth;
  var audio;
  var city_mag_proportion = 3;
  earth = new Earth("#earth");
  earth.animate();

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
      audio = new AudioletApp( _frequencies, _quakes );
      audio.addEventListener('playing', function(evt){
        //evt includes evt.data with thequake location
        evt_data = evt.data;
        p = $( document.createElement('p') );
        p.append( evt_data.place );
        p.hide();
        p.css( 'font-size', evt_data.mg * city_mag_proportion );
        $('#cities').append(p.fadeIn());
      })
    });

    $("#loading").remove();

  });
});
