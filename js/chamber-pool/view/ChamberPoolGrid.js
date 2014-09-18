// Copyright 2002-2013, University of Colorado Boulder

/**
 * specific grid view chamber pool
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var GridLinesNode = require( 'UNDER_PRESSURE/common/view/GridLinesNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  var metersString = require( 'string!UNDER_PRESSURE/m' );
  var feetString = require( 'string!UNDER_PRESSURE/ft' );

  /**
   * View for grid in the chamber pool.
   * @param {ChamberPoolModel} chamberPoolModel
   * @param {ModelViewTransform2} modelViewTransform for transforming between model and view co-ordinates
   * @constructor
   */
  function ChamberPoolGrid( chamberPoolModel, modelViewTransform ) {
    Node.call( this );

    var fontOptions = {
      font: new PhetFont( 12 )
    };

    this.addChild( new GridLinesNode( chamberPoolModel.globalModel, modelViewTransform, chamberPoolModel.poolDimensions.leftChamber.x1, chamberPoolModel.poolDimensions.leftOpening.y1,
      chamberPoolModel.poolDimensions.rightOpening.x2, chamberPoolModel.poolDimensions.leftChamber.y2 + 0.3 ) );

    // Add the labels for meters
    var labelPosX = modelViewTransform.modelToViewX( ( chamberPoolModel.poolDimensions.leftChamber.x2 + chamberPoolModel.poolDimensions.rightOpening.x1 ) / 2 );
    var depthLabelsMeters = new Node();
    for ( var depthMeters = 0; depthMeters <= chamberPoolModel.poolDimensions.leftChamber.y2 - chamberPoolModel.globalModel.skyGroundBoundY; depthMeters++ ) {
      var metersText = new Text( depthMeters + ' ' + metersString, fontOptions );
      var metersLabelRect = new Rectangle( 0, 0, metersText.width + 5, metersText.height + 5, 10, 10, {fill: '#67a257'} );
      metersText.center = metersLabelRect.center;
      metersLabelRect.addChild( metersText );
      metersLabelRect.centerX = labelPosX;
      metersLabelRect.centerY = modelViewTransform.modelToViewY( depthMeters + chamberPoolModel.globalModel.skyGroundBoundY );
      depthLabelsMeters.addChild( metersLabelRect );
    }

    // Add the labels for feet, adjust for loop to limit number of labels.
    var depthLabelsFeet = new Node();
    for ( var depthFeet = 0; depthFeet <= ( chamberPoolModel.poolDimensions.leftChamber.y2 - chamberPoolModel.globalModel.skyGroundBoundY ) * 3.3 + 1; depthFeet += 5 ) {
      var feetText = new Text( depthFeet + ' ' + feetString, fontOptions );
      var feetLabelRect = new Rectangle( 0, 0, feetText.width + 5, feetText.height + 5, 10, 10, {fill: '#67a257'} );
      feetText.center = feetLabelRect.center;
      feetLabelRect.addChild( feetText );
      feetLabelRect.centerX = labelPosX;
      feetLabelRect.centerY = modelViewTransform.modelToViewY( depthFeet / 3.3 + chamberPoolModel.globalModel.skyGroundBoundY );
      depthLabelsFeet.addChild( feetLabelRect );
    }

    this.addChild( depthLabelsMeters );
    this.addChild( depthLabelsFeet );


    chamberPoolModel.globalModel.measureUnitsProperty.valueEquals( 'english' ).linkAttribute( depthLabelsFeet, 'visible' );
    chamberPoolModel.globalModel.measureUnitsProperty.valueEquals( 'metric' ).linkAttribute( depthLabelsMeters, 'visible' );

    chamberPoolModel.globalModel.isGridVisibleProperty.linkAttribute( this, 'visible' );

  }

  return inherit( Node, ChamberPoolGrid );
} );