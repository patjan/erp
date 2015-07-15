function LivingThing() {
	display('LivingThing');

	this.is_alive = false;
	
	this.set_born = function()	 { this.is_alive = true; }
}