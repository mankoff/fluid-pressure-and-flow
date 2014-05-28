//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var WaterTowerScreen = require( 'FLUID_PRESSURE_AND_FLOW/watertower/WaterTowerScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!FLUID_PRESSURE_AND_FLOW/fluid-pressure-and-flow.name' );

  var simOptions = {
    credits: {

      // all credits fields are optional
      leadDesign: '',
      softwareDevelopment: '',
      designTeam: '',
      interviews: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new WaterTowerScreen() ], simOptions );
    sim.start();
  } );
} );