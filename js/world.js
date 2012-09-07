var SCREEN_WIDTH  = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

Earth = ( function(){
  var container, stats, camera, scene, renderer, group;
  var particleLight, pointLight, light;
  var materials = [];

  function Earth(selector) {
    if (! $ || ! jQuery ) {
      throw "jQuery is required.";
    }
    container = $(selector)[0];
    Earth.init(selector);
  }

  Earth.init = function() {
    camera = new THREE.PerspectiveCamera( 45, SCREEN_WIDTH/ SCREEN_HEIGHT, 1, 2000 );
    camera.position.set( 0, 0, 600 );
    scene = new THREE.Scene();

    group = new THREE.Object3D();
    scene.add( group );

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set( 0, 10, 10 );
    scene.add( light );

    var earthTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();

    loader.addEventListener( 'load', function ( evt ) {
      earthTexture.image = evt.content;
      earthTexture.needsUpdate = true;
    });

    loader.load( '/img/materials/earthmap.jpg' );

    var sphere = new THREE.SphereGeometry( 200, 20, 20 );

    var map = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      map: earthTexture,
      overdraw: true
    });

    var earthMesh = new THREE.Mesh( sphere, map );
    group.add( earthMesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    container.appendChild( renderer.domElement );
  }

  Earth.render = function() {
    posX = SCREEN_WIDTH/2;
    posY = SCREEN_HEIGHT/8;
    camera.position.x += ( posX - camera.position.x ) * 0.05;
    camera.position.y += ( posY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );
    group.rotation.y -= 0.005;
    renderer.render( scene, camera );
  }

  Earth.prototype.animate = function() {
    requestAnimationFrame( Earth.prototype.animate );
    Earth.render();
  }

  return Earth;

})();
