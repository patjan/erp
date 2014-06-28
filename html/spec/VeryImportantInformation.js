describe("very important information", function() {
	it("should be sent", function() {
		spyOn(jQuery, "ajax");
		var information = {"i am": Math.random()};

		VeryImportantInformation.send(information);
		
		expect(jQuery.ajax).toHaveBeenCalledWith({
			method: "POST",
			url: "/important_information",
			data: information
		});
	});
});