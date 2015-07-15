function Mammal(name){
	this.name = name;
	this.offspring = [];
}
Mammal.prototype - new LivingThing();
Mammal.prototype.have_baby = function() {
	Mammal.prototype.set_born();
	var new_baby = new this.constructor('Baby ' + this.name);
	this.offspring.push(new_baby);
	return new_baby;
}