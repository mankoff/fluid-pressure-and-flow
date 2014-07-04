// Copyright (c) 2002 - 2014. University of Colorado Boulder

/**
 * WaterTowerLegsNode
 * @author Siddhartha Chinthapally (Actual Concepts) on 6/24/2014.
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Line = require( 'SCENERY/nodes/Line' );

  /**
   *
   * @param {Number} width between the right and left legs at the bottom
   * @param {Number} height of each leg
   * @param options
   * @constructor
   */
  function WaterTowerLegsNode( width, height, options ) {
    Node.call( this );
    this.options = _.extend( {
      legWidth: 10,
      crossbeamWidth: 4
    }, options );
    var legPaintOptions = {stroke: 'black', lineWidth: 1, fill: 'black'};
    var crossbeamPaintOptions = { stroke: 'black', lineWidth: this.options.crossbeamWidth};

    this.waterTowerWidth = width;
    this.waterTowerHeight = height;

    this.leftLegPath = new Path( null, legPaintOptions );
    this.rightLegPath = new Path( null, legPaintOptions );
    this.crossbeam1Path = new Line( 0, 0, 0, 0, crossbeamPaintOptions );
    this.crossbeam2Path = new Line( 0, 0, 0, 0, crossbeamPaintOptions );
    this.crossbeam3Path = new Line( 0, 0, 0, 0, crossbeamPaintOptions );
    this.crossbeam4Path = new Line( 0, 0, 0, 0, crossbeamPaintOptions );
    this.children = [ this.leftLegPath, this.rightLegPath, this.crossbeam1Path, this.crossbeam2Path, this.crossbeam3Path, this.crossbeam4Path ];
    this.updateShape();
    this.mutate( this.options );
  }

  return inherit( Node, WaterTowerLegsNode, {

    //Update the shape of the water tower legs when the water tower has been raised or lowered.
    updateShape: function() {

      var width = this.waterTowerWidth;
      var height = this.waterTowerHeight;
      var leftLegTopX = width * 0.2;
      var rightLegTopX = width * 0.8;
      var options = this.options;

      var fLeftLegX = new LinearFunction( 0, height, leftLegTopX, 0 ); //y1, y2, x1, x2
      var fRightLegX = new LinearFunction( 0, height, rightLegTopX, width );

      //Left leg
      this.leftLegPath.setShape( new Shape().moveTo( fLeftLegX( 0 ), 0 )
        .lineTo( fLeftLegX( height ), height )
        .lineTo( fLeftLegX( height ) + options.legWidth, height )
        .lineTo( fLeftLegX( 0 ) + options.legWidth, 0 ).close() );


      //Right leg
      this.rightLegPath.setShape( new Shape().moveTo( fRightLegX( 0 ), 0 )
        .lineTo( fRightLegX( height ), height )
        .lineTo( fRightLegX( height ) - options.legWidth, height )
        .lineTo( fRightLegX( 0 ) - options.legWidth, 0 ).close() );

      //Crossbeams
      this.crossbeam1Path.setLine( fLeftLegX( height * 0.9 ), height * 0.9, fRightLegX( height * 0.7 ), height * 0.7 );
      this.crossbeam2Path.setLine( fLeftLegX( height * 0.7 ), height * 0.7, fRightLegX( height * 0.9 ), height * 0.9 );
      this.crossbeam3Path.setLine( fLeftLegX( height * 0.5 ), height * 0.5, fRightLegX( height * 0.3 ), height * 0.3 );
      this.crossbeam4Path.setLine( fLeftLegX( height * 0.3 ), height * 0.3, fRightLegX( height * 0.5 ), height * 0.5 );

    }
  } );
} );