// Copyright (c) 2002 - 2014. University of Colorado Boulder

/**
 * View for the pipe consisting of the right and left pipe heads and a flexible middle pipe created using splines.
 * @author Siddhartha Chinthapally (Actual Concepts).
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Shape = require( 'KITE/Shape' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Vector2 = require( 'DOT/Vector2' );
  var ParticleCanvasNode = require( 'FLUID_PRESSURE_AND_FLOW/flow/view/ParticleCanvasNode' );
  var Bounds2 = require( 'DOT/Bounds2' );

  // images
  var leftPipeImage = require( 'image!FLUID_PRESSURE_AND_FLOW/pipe-left-front.png' );
  var pipeSegmentImage = require( 'image!FLUID_PRESSURE_AND_FLOW/pipe-segment.png' );
  var rightSidePipeImage = require( 'image!FLUID_PRESSURE_AND_FLOW/pipe-right.png' );
  var leftPipeBackImage = require( 'image!FLUID_PRESSURE_AND_FLOW/pipe-left-back.png' );

  // constants
  var LINE_COLOR = '#613705';
  var PIPE_SCALE = 0.6;
  var PIPE_SEGMENT_X_SCALE = 100;

  /*
   * Constructor for PipeNode
   * @param {FlowModel} flowModel of the simulation.
   * @param {Pipe} pipe model for this pipe node
   * @param {ModelViewTransform2} modelViewTransform to convert between model and view co-ordinate frames
   * @param {Bounds2} layoutBounds of the simulation
   * @constructor
   */
  function PipeNode( flowModel, modelViewTransform, layoutBounds ) {

    var pipeNode = this;
    Node.call( this );
    this.flowModel = flowModel;
    this.modelViewTransform = modelViewTransform;
    this.layoutBounds = layoutBounds;

    this.leftPipeYOffset = 25; // left pipe top offset w.r.t the left top control point
    this.rightPipeYOffset = 25; // right pipe top offset w.r.t the right top control point

    this.groundY = this.modelViewTransform.modelToViewY( 0 );
    this.pipeNodeYOffset = 57; // w.r.t to ground in px

    this.leftPipeRightOffset = 55;
    this.rightPipeLeftOffset = 75;

    //left side pipe image.
    var leftPipeHead = new Image( leftPipeImage, { scale: PIPE_SCALE } );

    var leftPipeSegment = new Image( pipeSegmentImage,
      {
        right: leftPipeHead.left + 20,
        scale: new Vector2( PIPE_SEGMENT_X_SCALE, PIPE_SCALE )
      } );

    this.leftPipeNode = new Node( {
      children: [ leftPipeHead, leftPipeSegment ],
      top: this.groundY + this.pipeNodeYOffset,
      right: layoutBounds.minX + this.leftPipeRightOffset,
      scale: PIPE_SCALE } );

    var leftPipeWidth = leftPipeHead.getImageWidth() * PIPE_SCALE * PIPE_SCALE;

    this.leftPipeLeftOffset = leftPipeWidth - this.leftPipeRightOffset;

    this.leftPipeBackNode = new Node( {
      children: [ new Image( leftPipeBackImage, { scale: PIPE_SCALE } ) ],
      top: this.groundY + this.pipeNodeYOffset,
      right: layoutBounds.minX + this.leftPipeRightOffset,
      scale: PIPE_SCALE } );

    // shape for the pipelines
    this.pipeFlowLine = new Path( null, { stroke: LINE_COLOR, lineWidth: '6' } );

    // shape for fluid. Although this is identical in "shape" to pipeFlowLine a separate node is used to layer
    // the particles between fluid and the pipelines so that they appear on top of fluid and don't protrude over the pipe.
    // See https://github.com/phetsims/fluid-pressure-and-flow/issues/183
    this.pipeFluidNode = new Path( null,
      { stroke: LINE_COLOR, lineWidth: '0', fill: flowModel.fluidColorModel.color } );

    // Skip bounds computation to improve performance, see energy-skate-park-basics#245
    // Qualitative tests did not show a significant improvement
    var emptyBounds = new Bounds2( 0, 0, 0, 0 );
    this.pipeFluidNode.computeShapeBounds = function() {
      return emptyBounds;
    };

    // right side pipe image.
    var rightPipeHead = new Image( rightSidePipeImage, { scale: PIPE_SCALE } );
    var rightPipeMiddle = new Image( pipeSegmentImage,
      { left: rightPipeHead.right - 30, scale: new Vector2( PIPE_SEGMENT_X_SCALE, PIPE_SCALE ) } );

    this.rightPipeNode = new Node( {
      children: [ rightPipeHead, rightPipeMiddle ],
      bottom: this.leftPipeNode.bottom,
      left: layoutBounds.maxX - pipeNode.rightPipeLeftOffset,
      scale: PIPE_SCALE } );

    // order of different layers within pipe Node -- leftPipeBackNode, pipeFluidNode, preParticleLayer, pipeFlowLine,
    // leftPipeNode and rightPipeNode
    this.addChild( this.leftPipeBackNode );
    this.addChild( this.pipeFluidNode );

    this.preParticleLayer = new Node();
    this.addChild( this.preParticleLayer );

    this.particlesLayer = new ParticleCanvasNode( flowModel.flowParticles, flowModel.gridParticles, modelViewTransform,
      { canvasBounds: new Bounds2( 20, 80, 800, 600 )
      } );
    this.addChild( this.particlesLayer );
    this.addChild( this.pipeFlowLine );

    this.addChild( this.rightPipeNode );
    this.addChild( this.leftPipeNode );

    flowModel.fluidColorModel.colorProperty.linkAttribute( pipeNode.pipeFluidNode, 'fill' );

    // init the PipeFlow Line shape
    this.updatePipeFlowLineShape();
  }

  return inherit( Node, PipeNode,
    {
      // update the pipe flow line shape (the flexible middle pipe)
      // @private
      updatePipeFlowLineShape: function() {

        // getting cross sections
        var splineCrossSections = this.flowModel.pipe.getSplineCrossSections();

        var xPointsBottom = new Array( splineCrossSections.length );
        var yPointsBottom = new Array( splineCrossSections.length );
        var xPointsTop = new Array( splineCrossSections.length );
        var yPointsTop = new Array( splineCrossSections.length );

        //  points for lineTo
        for ( var l = 0; l < splineCrossSections.length; l++ ) {
          xPointsBottom[l] = splineCrossSections[l].x;
          yPointsBottom[l] = splineCrossSections[l].yBottom;
          xPointsTop[l] = splineCrossSections[l].x;
          yPointsTop[l] = splineCrossSections[l].yTop;
        }

        var flowLineShape = new Shape().moveTo( this.modelViewTransform.modelToViewX( xPointsBottom[ 0 ] ),
          this.modelViewTransform.modelToViewY( yPointsBottom[ 0 ] ) );

        var minXOfPipeFlowLineShape = -6.7; // model value
        var maxXOfPipeFlowLineShape = 6.8;
        var i;
        for ( i = 1; i < xPointsBottom.length; i = i + 1 ) {
          // Spline points beyond the last pipe cross section are not needed.
          if ( xPointsBottom[ i ] < maxXOfPipeFlowLineShape && xPointsBottom[ i ] > minXOfPipeFlowLineShape ) {
            flowLineShape.lineTo( this.modelViewTransform.modelToViewX( xPointsBottom[ i ] ),
              this.modelViewTransform.modelToViewY( yPointsBottom[ i ] ) );
          }
        }

        for ( i = xPointsTop.length; i > 0; i = i - 1 ) {
          // Spline points beyond the last pipe cross section are not needed.
          if ( xPointsBottom[ i ] < maxXOfPipeFlowLineShape && xPointsBottom[ i ] > minXOfPipeFlowLineShape ) {
            flowLineShape.lineTo( this.modelViewTransform.modelToViewX( xPointsTop[ i ] ),
              this.modelViewTransform.modelToViewY( yPointsTop[ i ] ) );
          }
        }
        this.pipeFlowLine.shape = flowLineShape;

        // make a copy of the line shape for the fluid node
        this.pipeFluidNode.shape = flowLineShape.copy();

      },

      reset: function() {

        // reset the left and right pipe position and scale
        this.leftPipeNode.setMatrix( Matrix3.translation( this.layoutBounds.minX - this.leftPipeLeftOffset,
            this.groundY + this.pipeNodeYOffset ) );
        this.leftPipeNode.scale( PIPE_SCALE );
        this.leftPipeBackNode.setMatrix( Matrix3.translation( this.layoutBounds.minX - this.leftPipeLeftOffset,
            this.groundY + this.pipeNodeYOffset ) );
        this.leftPipeBackNode.scale( PIPE_SCALE );
        this.rightPipeNode.setMatrix( Matrix3.translation( this.layoutBounds.maxX - this.rightPipeLeftOffset,
            this.groundY + this.pipeNodeYOffset ) );
        this.rightPipeNode.scale( PIPE_SCALE );

        // mark pipe as dirty for getting new spline cross sections
        this.flowModel.pipe.dirty = true;
        this.updatePipeFlowLineShape();
        this.flowModel.fluxMeter.trigger( 'update' );

      }
    } );
} );