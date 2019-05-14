var method = GameCenter.prototype;
var Wolf = require("../class/wolf.js");
var Citizen = require("../class/citizen.js");
var Witch = require("../class/witch.js");
var User = require("../class/user.js");
var moment = require('moment');

function GameCenter(count){
	this.count = count;
	this.characters = [];
	this.users = [];

	// this.start = moment().format('YYYY-MM-DD HH:mm:ss')

	this.initUsers(count);
	this.initCharacter(count);

	this.randomCharacter();
	this.notifySameCharacter();

	this.fight();
}

method.initUsers = function(count){
	for(var i=1; i<=count; i++){
		this.users.push(new User(i));
	}

	return this.users;
}

method.initCharacter = function(count){
	switch (count) {
		case 6:
			this.characters.push(new Wolf());
			this.characters.push(new Wolf());

			this.characters.push(new Citizen());
			this.characters.push(new Citizen());
			this.characters.push(new Citizen());

			this.characters.push(new Witch());

			break;
		
		default:
			break;
	}

	return this.characters;
}

method.randomCharacter = function(){
	var max = this.users.length;
	var count = 0;
	while(count < max){
		var randomInt = Math.floor(Math.random() * Math.floor(max));

		var character = this.characters[randomInt];
		var user = this.users[count];

		if(character.getUserId()) continue;

		this.characters[randomInt].setUserId(user.getUserId());
		this.users[count].setCharacter(character.getCharacter());
		
		count++;
	}

	console.table(this.users);
}

//notify same character
method.notifySameCharacter = function(){
	//foreach all charactor
}

method.fight = function(){
	while(this.isGameOver){
		for(var i=0; i<this.users.length; i++){
			this.users[i].action();	
		}

		for(var i=0; i<this.users.length; i++){
			this.users[i].vote();
		}
	}
}

method.isGameOver = function(){
	var aliveUsersCharacter = new Set();
	for(var i=0; i<this.users.length; i++){
		if(!this.users[i].getIsKill()){
			aliveUsersCharacter.push(this.users[i].getCharacter())
		}
	}

	var types = {};
	for(var i=0; i<aliveUsers.length; i++){
		ty
	}
}

module.exports = GameCenter;