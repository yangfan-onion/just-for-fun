var _super = require("./character.js").prototype,
    method = Citizen.prototype = Object.create( _super );

method.constructor = Citizen;

function Citizen() {
    _super.constructor.apply( this, ['citizen'] );
}

module.exports = Citizen;