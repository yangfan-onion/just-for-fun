var _super = require("./character.js").prototype,
    method = Wolf.prototype = Object.create( _super );

method.constructor = Wolf;

function Wolf() {
    _super.constructor.apply( this, ['wolf'] );
}

method.action() = function(){
	//kill some one
	
	
}

module.exports = Wolf;