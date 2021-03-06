// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the faucet, which is user controlled and allows fluid to flow in from the top left of the screen or down
 * through the bottom of the pool.
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var fluidPressureAndFlow = require( 'FLUID_PRESSURE_AND_FLOW/fluidPressureAndFlow' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Vector2} location center of output pipe
   * @param {number} maxFlowRate L/sec
   * @param {number} scale of Faucet (the top faucet is larger than the bottom faucet)
   * @constructor
   */
  function FaucetModel( location, maxFlowRate, scale ) {

    var faucetModel = this;
    this.location = location;
    this.maxFlowRate = maxFlowRate;
    this.scale = scale;
    this.spoutWidth = 1.35 * scale; // empirically determined

    PropertySet.call( this, {
      // @public
      flowRate: 0,
      enabled: true
    } );

    // when disabled, turn off the faucet.
    this.enabledProperty.onValue( false, function() {
      faucetModel.flowRate = 0;
    } );
  }

  fluidPressureAndFlow.register( 'FaucetModel', FaucetModel );

  return inherit( PropertySet, FaucetModel );
} );
