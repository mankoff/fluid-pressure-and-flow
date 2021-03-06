// Copyright 2013-2015, University of Colorado Boulder

/**
 * Control panel that contains various tools like ruler, grid and atmosphere controls.
 * @author Vasily Shakhov (Mlearner)
 * @author Siddhartha Chinthapally (Actual Concepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var fluidPressureAndFlow = require( 'FLUID_PRESSURE_AND_FLOW/fluidPressureAndFlow' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Shape = require( 'KITE/Shape' );
  var Panel = require( 'SUN/Panel' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var AtmosphereControlNode = require( 'FLUID_PRESSURE_AND_FLOW/under-pressure/view/AtmosphereControlNode' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  var gridString = require( 'string!FLUID_PRESSURE_AND_FLOW/grid' );
  var rulerString = require( 'string!FLUID_PRESSURE_AND_FLOW/ruler' );

  /**
   * @param {UnderPressureModel} underPressureModel of the sim.
   * @param {Object} [options]
   * @constructor
   */
  function ControlPanel( underPressureModel, options ) {

    options = _.extend( {
      yMargin: 7,
      xMargin: 5,
      fill: '#f2fa6a',
      stroke: 'gray',
      lineWidth: 1,
      resize: false,
      minWidth: 150,
      maxWidth: 150
    }, options );

    var maxControlWidth = ( options.maxWidth * 0.9 ) || 200; // the fallback value is fairly arbitrary
    var textOptions = { font: new PhetFont( 12 ), maxWidth: maxControlWidth };
    var rulerSet = [ new Text( rulerString, textOptions ), this.createRulerIcon() ];
    var gridArray = [ new Text( gridString, textOptions ) ];
    var atmosphereControlNode = new AtmosphereControlNode( underPressureModel.isAtmosphereProperty, {
      maxWidth: options.maxWidth
    } );

    var alignOptions = {
      boxWidth: 15,
      spacing: 5
    };

    // align ruler icon right
    var padWidth = options.maxWidth - rulerSet[ 0 ].width - rulerSet[ 1 ].width - alignOptions.boxWidth -
                   alignOptions.spacing * 2;
    var rulerArray = [ rulerSet[ 0 ], new HStrut( padWidth ), rulerSet[ 1 ] ];

    var rulerCheckBox = new CheckBox( new HBox( { children: rulerArray } ), underPressureModel.isRulerVisibleProperty,
      alignOptions );
    var gridCheckBox = new CheckBox( new HBox( { children: gridArray } ), underPressureModel.isGridVisibleProperty,
      alignOptions );

    // touch areas, empirically determined
    rulerCheckBox.touchArea = rulerCheckBox.bounds.dilatedY( 1 );
    gridCheckBox.touchArea = gridCheckBox.bounds.dilatedY( 3 );

    var checkBoxChildren = [ rulerCheckBox, gridCheckBox ];

    var checkBoxes = new VBox( { align: 'left', spacing: 5, children: checkBoxChildren } );

    var content = new VBox( {
      spacing: 5,
      children: [ checkBoxes, new VStrut( 2 ), atmosphereControlNode ],
      align: 'left'
    } );

    Panel.call( this, content, options );
  }

  fluidPressureAndFlow.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel, {

    //Create an icon for the ruler check box
    createRulerIcon: function() {
      var rulerWidth = 30;
      var rulerHeight = 20;
      var insetsWidth = 7;

      return new RulerNode( rulerWidth, rulerHeight, rulerWidth / 2, [ '0', '1', '2' ], '', {
        insetsWidth: insetsWidth,
        minorTicksPerMajorTick: 4,
        majorTickFont: new PhetFont( 12 ),
        // In the mock, the right border of the ruler icon is not visible.
        // So, clipping it using a rectangle that is 1px lesser in width than the icon.
        clipArea: Shape.rect( 0, 0, rulerWidth + 2 * insetsWidth - 1, rulerHeight )
      } );
    }
  } );
} );