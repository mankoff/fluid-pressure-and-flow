/**
 * View for the 'Water Tower' includes the tower, water, stand/legs, hose and the wheel.
 *
 * @author Siddhartha Chinthapally (Actual Concepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var WaterTowerLegsNode = require( 'FLUID_PRESSURE_AND_FLOW/watertower/view/WaterTowerLegsNode' );

  //images
  var handleImage = require( 'image!FLUID_PRESSURE_AND_FLOW/handle.png' );
  var wheelImage = require( 'image!FLUID_PRESSURE_AND_FLOW/wheel.png' );

  /**
   * @param {WaterTower} model
   * @param {ModelViewTransform2} mvt transform to convert between model and view values
   * @param options
   * @constructor
   */
  function WaterTowerView( model, mvt, options ) {
    var waterTowerView = this;
    options = _.extend( {
      waterColor: 'rgb(20, 244, 255)',
      towerFrameColor: 'black'
    }, options );

    Node.call( this );


    //add the frame
    var modelTankShape = new Shape()
      .moveTo( mvt.modelToViewX( 0 ), mvt.modelToViewY( 0 ) )
      .lineTo( mvt.modelToViewX( 2 * model.TANK_RADIUS ), mvt.modelToViewY( 0 ) )
      .lineTo( mvt.modelToViewX( 2 * model.TANK_RADIUS ), mvt.modelToViewY( model.TANK_HEIGHT ) )
      .lineTo( mvt.modelToViewX( 0 ), mvt.modelToViewY( model.TANK_HEIGHT ) ).close();

    var waterTankFrame = new Path( modelTankShape, { top: 20, stroke: options.towerFrameColor} );
    this.addChild( waterTankFrame );

    //add water
    var waterShape = new Shape()
      .moveTo( mvt.modelToViewX( 0 ) + 1, mvt.modelToViewY( 0 ) + 1 )
      .lineTo( mvt.modelToViewX( 2 * model.TANK_RADIUS ) - 1, mvt.modelToViewY( 0 ) + 1 )
      .lineTo( mvt.modelToViewX( 2 * model.TANK_RADIUS ) - 1, mvt.modelToViewY( model.waterLevel() ) )
      .lineTo( mvt.modelToViewX( 0 ) + 1, mvt.modelToViewY( model.waterLevel() ) ).close();
    this.addChild( new Path( waterShape, { bottom: waterTankFrame.bottom - 1, fill: options.waterColor} ) );

    //add the legs
    this.addChild( new WaterTowerLegsNode( waterTankFrame.width, waterTankFrame.height * 1.05, {top: waterTankFrame.bottom} ) );

    //add the handle
    var handleNode = new Image( handleImage, { cursor: 'pointer', scale: 0.3, top: waterTankFrame.bottom, centerX: waterTankFrame.centerX} );
    this.addChild( handleNode );

    //add the wheel and rope
    var wheelNode = new Image( wheelImage, { cursor: 'pointer', scale: 0.4, bottom: waterTankFrame.top, right: waterTankFrame.right + 3} );
    this.addChild( wheelNode );
    this.addChild( new Path( Shape.lineSegment( 0, waterTankFrame.height - 20, 0, 0 ), { right: wheelNode.right, top: wheelNode.bottom, lineWidth: 1, stroke: 'black'} ) );

    //add the gate at the end of the rope
    var sluiceGate = new Rectangle( 0, 0, 5, 20, {
      fill: new LinearGradient( 0, 0, 5, 0 )
        .addColorStop( 0, '#656570' )
        .addColorStop( 0.5, '#dee6f5' )
        .addColorStop( 0.7, '#bdc3cf' )
        .addColorStop( 1, '#656570' ),
      bottom: waterTankFrame.bottom,
      left: waterTankFrame.right,
      stroke: 'black',
      lineWidth: 0.5
    } );
    this.addChild( sluiceGate );

    var clickYOffset;
    handleNode.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        clickYOffset = waterTowerView.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },
      drag: function( e ) {
        var y = waterTowerView.globalToParentPoint( e.pointer.point ).y - clickYOffset;

        //restrict the node movement between 80 and 180
        y = (y < 80) ? 80 : (y > 180) ? 180 : y;
        waterTowerView.setTranslation( 0, y );
      }
    } ) );

    this.mutate( options );
  }

  return inherit( Node, WaterTowerView );

} );