describe("Animal", function() {
	it("should have 6 legs if it is an insects", function() {
		var insect = new Animal();
		insect.kind = "insect";
		expect(insect.numLegs()).toBe(6);
	});

	it("should have 8 legs if it is a spider", function() {
		var insect = new Animal();
		insect.kind = "spider";
		expect(insect.numLegs()).toBe(8);
	});
	
	it("shouldn't know the number of legs of a millipede", function() {
		var insect = new Animal();
		insect.kind = "millipede";
		expect(insect.numLegs()).toBeUndefined();
	});
});