function Cat(name){
	this.name = name;
}
Cat.inheritsFrom(Mammal);
Cat.prototype.haveABaby = function() {
	var theKitten = this.parent.haveABaby.call(this);
	console.log('mew!');
	return theKitten;
}
Cat.prototype.toString = function(){
	return '[Cat "' + this.name + '"]';
}
