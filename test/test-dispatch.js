describe('Dispatch', function()
{
  describe('create thread', function()
  {
    it('should add a unit of work to the queue', function()
    {
      var foo = '-';
      expect(foo).to.be.a('string');
    });
    
    it('should capture the arguments passed in', function()
    {
      var foo = 1;
      expect(foo).to.be.a('string');
    });
  });
  
  describe('async', function()
  {
    it('background tasks can load XHR', function()
    {
      var foo = 1;
      expect(foo).to.be.a('string');
    });
    
    it('background tasks can load dataURI images', function()
    {
      var foo = 1;
      expect(foo).to.be.a('string');
    });
    
    it('background tasks can not load image', function()
    {
      var foo = 1;
      expect(foo).to.be.a('string');
    });
    
    it('background tasks can not access persistence', function()
    {
      var foo = 1;
      expect(foo).to.be.a('string');
    });
    
  })
})
