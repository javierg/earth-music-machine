EARTH SOUND MACHINE
===================

This is an experiment based on HTML5. We use JS for a generative experience derived from the earthquakes of the day. The script produces a melody based on the magnitude of the earthquakes while also displaying their location.

It employs the [Audiolet] (https://github.com/oampo/Audiolet) audio synth JS library and the [Three.js](https://github.com/mrdoob/three.js/), a 3D JS plugin.

We also experimented with different ways to simulate Classes on JS, although we think the best option is to achieve this is [CoffeeScript](http://coffeescript.org/) so we are planning on migrating the code to that platform.

Next goals:

* Represent the location in a spinning globe.
* Add a rhythm base to the sounds based on the depth that the quake was registered.
* Add ambient sounds based on the location of the event.
* Better performance.
* Add interaction.

>Earthquake data from [USGS](http://earthquake.usgs.gov/earthquakes/)