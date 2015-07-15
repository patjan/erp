function Mammal(name){
	this.name = name;
	this.offspring = [];
}
Mammal.inheritsFrom(LivingThing);
Mammal.prototype.haveABaby = function() {
	this.parent.beBorn.call(this);
	var newBaby = new this.constructor('Baby ' + this.name);
	this.offspring.push(newBaby);
	return newBaby;
}