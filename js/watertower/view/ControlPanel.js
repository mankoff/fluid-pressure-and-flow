//  Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Control Panel' node.
 *
 * @author Siddhartha Chinthapally (ActualConcepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Shape = require( 'KITE/Shape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Panel = require( 'SUN/Panel' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Image = require( 'SCENERY/nodes/Image' );

  // strings
  var measuringTapeString = require( 'string!FLUID_PRESSURE_AND_FLOW/measuringTape' );
  var rulerString = require( 'string!FLUID_PRESSURE_AND_FLOW/ruler' );
  var hoseString = require( 'string!FLUID_PRESSURE_AND_FLOW/hose' );

  // images
  //image
  var nozzleImg = require( 'image!FLUID_PRESSURE_AND_FLOW/nozzle.png' );
  var measuringTapeImg = require( 'image!FLUID_PRESSURE_AND_FLOW/measuringTape.png' );


  /**
   *
   * @param {WaterTowerModel} waterTowerModel of the simulation
   * @param options
   * @constructor
   */
  function ControlPanel( waterTowerModel, options ) {

    options = _.extend( {
      xMargin: 10,
      yMargin: 10,
      fill: '#f2fa6a ',
      stroke: 'gray',
      lineWidth: 1,
      resize: false,
      scale: 0.9
    }, options );

    var textOptions = {font: new PhetFont( 14 )};

    var ruler = [new Text( rulerString, textOptions ), this.createRulerIcon()];
    var measuringTape = [new Text( measuringTapeString, textOptions ), this.createMeasuringTapeIcon()];
    var hose = [new Text( hoseString, textOptions ), this.createHoseIcon()];

    var widestItem = _.max( [measuringTape, ruler, hose], function( itemSet ) { return itemSet[0].width + itemSet[1].width; } );

    var maxWidth = widestItem[0].width + widestItem[1].width;

    // itemSet is a combination of a text node and a corresponding icon (image node). Corresponds to a row in the panel.
    // pad inserts a "spacing" node (rectangle) so that the text, space and image together occupy a certain fixed width.
    var pad = function( itemSet ) {
      var padWidth = maxWidth - itemSet[0].width - itemSet[1].width;
      return [itemSet[0], new Rectangle( 0, 0, padWidth + 5, 20 ), itemSet[1]];
    };

    var checkBoxOptions = {
      boxWidth: 18,
      spacing: 5
    };

    // pad all the rows so the text nodes are left aligned and the icons is right aligned
    var checkBoxChildren = [
      new CheckBox( new HBox( {children: pad( ruler )} ), waterTowerModel.isRulerVisibleProperty, checkBoxOptions ),
      new CheckBox( new HBox( {children: pad( measuringTape )} ), waterTowerModel.isMeasuringTapeVisibleProperty, checkBoxOptions ),
      new CheckBox( new HBox( {children: pad( hose )} ), waterTowerModel.isHoseVisibleProperty, checkBoxOptions )
    ];
    var checkBoxes = new VBox( {align: 'left', spacing: 10, children: checkBoxChildren} );

    var content = new VBox( {
      spacing: 10,
      children: [checkBoxes],
      align: 'left'
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ControlPanel, {

    //Create an icon for the ruler check box
    createRulerIcon: function() {
      return new RulerNode( 30, 20, 15, ['0', '1', '2'], '', {
        insetsWidth: 7,
        minorTicksPerMajorTick: 4,
        majorTickFont: new PhetFont( 12 ),
        clipArea: Shape.rect( -1, -1, 44, 22 )
      } );
    },

    //create an icon for the hose
    createHoseIcon: function() {
      var icon = new Path( new Shape().moveTo( 0, 0 ).arc( -15, 8, 10, 180, 90, true ).lineTo( 10, 16 ).lineTo( 10, 0 ).lineTo( 0, 0 ), {stroke: 'grey', lineWidth: 1, fill: '#00FF99'} );
      icon.addChild( new Image( nozzleImg, { cursor: 'pointer', rotation: Math.PI / 2, scale: 0.8, left: icon.right, bottom: icon.bottom + 1} ) );
      return icon;
    },

    //create an icon for the measuring tape
    createMeasuringTapeIcon: function() {
      var icon = new Image( measuringTapeImg, { cursor: 'pointer', scale: 0.6} );
      var size = 5;
      icon.addChild( new Path( new Shape().moveTo( -size, 0 ).lineTo( size, 0 ).moveTo( 0, -size ).lineTo( 0, size ), {stroke: '#E05F20', lineWidth: 2, left: icon.right + 12, top: icon.bottom + 12} ) );
      return icon;
    }
  } );
} );