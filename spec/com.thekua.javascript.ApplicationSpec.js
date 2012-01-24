describe("test", function() {
    it("should be successful", function(){
       // given
       var model = tdd.buildModel();

       // when 
       var result = model.something();

       // then
       expect(result).toBe(true);
    });
});
