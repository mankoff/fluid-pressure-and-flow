// Copyright 2002-2013, University of Colorado Boulder

/**
 * Faucet node for this sim.
 * @author Chris Malley (PixelZoom, Inc.), Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var FaucetNode = require( 'SCENERY_PHET/FaucetNode' );

  /**
   * @param {Faucet} faucet
   * @param {Vector2} location
   * @param {} width
   * @constructor
   */
  function UPFaucetNode( faucet, width, mvt ) {
    FaucetNode.call( this, faucet.maxFlowRate, faucet.flowRateProperty, faucet.enabledProperty, { horizontalPipeLength: width, scale: faucet.scale, x: mvt.modelToViewX(faucet.location.x ), y: mvt.modelToViewY(faucet.location.y )} );
  }

  return inherit( FaucetNode, UPFaucetNode );
} );