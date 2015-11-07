// Copyright 2014-2015, University of Colorado Boulder

/**
 * Constants used in this Sim.
 * @author Siddhartha Chinthapally (Actual Concepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );

  return {

    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 768, 504 ) },

    EARTH_GRAVITY: 9.8, // m/s^2
    MIN_PRESSURE: 50000, // Pascals
    MAX_PRESSURE: 250000, // Pascals

    MIN_FLOW_RATE: 1000, // Liter per second (L/s)
    MAX_FLOW_RATE: 10000, // Liter per second (L/s)

    // density values of fluids in kg/cubic mt
    GASOLINE_DENSITY: 700,
    HONEY_DENSITY: 1420,
    WATER_DENSITY: 1000,

    // constants for air pressure in Pascals, Pascals is SI, see http://en.wikipedia.org/wiki/Atmospheric_pressure
    EARTH_AIR_PRESSURE: 101325,
    EARTH_AIR_PRESSURE_AT_500_FT: 99490
  };
} );