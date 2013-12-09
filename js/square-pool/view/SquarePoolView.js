// Copyright 2002-2013, University of Colorado Boulder

/**
 * main ScreenView container for square pool.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  "use strict";
  var inherit = require( "PHET_CORE/inherit" );
  var CommonNode = require( "common/view/CommonNode" );
  var ScreenView = require( "JOIST/ScreenView" );
  var SquarePoolBack = require( "square-pool/view/SquarePoolBack" );
  var FaucetFluidNode = require( "common/view/FaucetFluidNode" );
  var SquarePoolWaterNode = require("square-pool/view/SquarePoolWaterNode");
  var BarometerNode = require( "common/view/BarometerNode" );


  function SquarePoolView( model ) {
    ScreenView.call( this, { renderer: "svg" } );

    //sky, earth and controls
    this.addChild( new CommonNode( model ) );

    //pool
    this.addChild( new SquarePoolBack( model ) );

    //fluids
    this.addChild( new FaucetFluidNode( model.inputFaucet, model, (model.poolDimensions.y2 - model.inputFaucet.location.y)*model.pxToMetersRatio ) );
    this.addChild( new FaucetFluidNode( model.outputFaucet, model, 1000 ) );

    //water
    this.addChild(new SquarePoolWaterNode(model));

    //barometers
    model.barometersStatement.forEach( function( positionProperty ) {
      self.addChild( new BarometerNode( model, positionProperty ) );
    } );

  }

  return inherit( ScreenView, SquarePoolView );
} );