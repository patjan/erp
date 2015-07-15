function Cat(the_name) {
	this.name = the_name;
}

Cat.prototype = new Mammal();

Cat.prototype.have_baby = function() {
	var my_kitten = Mammal.prototype.have_baby();
	console.log('mew!');
	return my_kitten;
}
Cat.prototype.toString = function(){
	return '[Cat "' + this.name + '"]';
}
