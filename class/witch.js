var _super = require("./character.js").prototype,
    method = witch.prototype = Object.create( _super );

method.constructor = witch;

function witch() {
    _super.constructor.apply( this, ['witch'] );
}

module.exports = witch;