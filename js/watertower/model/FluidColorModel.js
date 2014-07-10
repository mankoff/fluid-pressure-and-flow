// Copyright (c) 2002 - 2014. University of Colorado Boulder

/**
 * change fluid color when fluid density changes.
 * Simplified from under-pressure
 * @author Vasily Shakhov (Mlearner)
 * @author Siddhartha Chinthapally (Actual Concepts)
 *
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Constants = require( 'FLUID_PRESSURE_AND_FLOW/watertower/Constants' );

  /**
   *
   * @param {WaterTowerModel} waterTowerModel
   * @constructor
   */
  function FluidColorModel( waterTowerModel ) {
    var self = this;

    //from java version
    var GAS_COLOR = new Color( 149, 142, 139 );
    var WATER_COLOR = new Color( 20, 244, 255 );
    var HONEY_COLOR = new Color( 255, 191, 0 );

    var getRedLow = new LinearFunction( waterTowerModel.fluidDensityRange.min, Constants.WATER_DENSITY, GAS_COLOR.red, WATER_COLOR.red );
    var getGreenLow = new LinearFunction( waterTowerModel.fluidDensityRange.min, Constants.WATER_DENSITY, GAS_COLOR.green, WATER_COLOR.green );
    var getBlueLow = new LinearFunction( waterTowerModel.fluidDensityRange.min, Constants.WATER_DENSITY, GAS_COLOR.blue, WATER_COLOR.blue );

    var getRedHigh = new LinearFunction( Constants.WATER_DENSITY, waterTowerModel.fluidDensityRange.max, WATER_COLOR.red, HONEY_COLOR.red );
    var getGreenHigh = new LinearFunction( Constants.WATER_DENSITY, waterTowerModel.fluidDensityRange.max, WATER_COLOR.green, HONEY_COLOR.green );
    var getBlueHigh = new LinearFunction( Constants.WATER_DENSITY, waterTowerModel.fluidDensityRange.max, WATER_COLOR.blue, HONEY_COLOR.blue );

    PropertySet.call( this, {
      color: WATER_COLOR
    } );


    waterTowerModel.fluidDensityProperty.link( function( density ) {
      if ( density < Constants.WATER_DENSITY ) {
        self.color = new Color( getRedLow( density ), getGreenLow( density ), getBlueLow( density ) );
      }
      else {
        self.color = new Color( getRedHigh( density ), getGreenHigh( density ), getBlueHigh( density ) );
      }
    } );
  }

  return inherit( PropertySet, FluidColorModel, {
    reset: function() {
      this.color.reset();
    }
  } );
} );
