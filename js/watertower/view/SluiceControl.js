// Copyright (c) 2002 - 2014. University of Colorado Boulder

/**
 * View for the sluice state (open/close) switcher
 * @author Siddhartha Chinthapally (Actual Concepts) on 6/23/2014.
 */
define( function( require ) {
    'use strict';

    // modules
    var inherit = require( 'PHET_CORE/inherit' );
    var Node = require( 'SCENERY/nodes/Node' );
    var ABSwitch = require( 'SUN/ABSwitch' );
    var Text = require( 'SCENERY/nodes/Text' );

    /**
     * Constructor for the sluice controller
     * @param {Property<Boolean>} isSluiceOpenProperty -- property to control the sluice gate
     * @param options
     * @constructor
     */
    function SluiceControl( isSluiceOpenProperty, options ) {

      Node.call( this );
      this.addChild( new ABSwitch( isSluiceOpenProperty, false, new Text( "Close" ), true, new Text( "Open" ) ) );

      this.mutate( options );
    }

    return inherit( Node, SluiceControl );
  }
);