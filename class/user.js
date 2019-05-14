var method = User.prototype;

function User(userId){
	this.userId = userId;
}

method.setIsKill = function(isKill){
	this.isKill = isKill;
}

method.getIsKill = function(character){
	return this.isKill;
}

method.setCharacter = function(character){
	this.character = character;
}

method.getCharacter = function(character){
	return this.character;
}

method.getUserId = function(character){
	return this.userId;
}

module.exports = User;