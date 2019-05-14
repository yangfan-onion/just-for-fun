var method = Character.prototype;

function Character(type){
	this.type = type;
	this.speechSeconds = 30;
}

method.getCharacter = function(){
	return this.type;
}

method.setUserId = function(userId){
	this.userId = userId;
}

method.getUserId = function(userId){
	return this.userId;
}

method.vote = function(index, maxCount){
	if(index > maxCount) return false;
	this.vote = index;
}

method.getVote = function(){
	return this.vote;
}

method.action = function(){
	throw new Error('You have to implement the method!');
}

module.exports = Character;