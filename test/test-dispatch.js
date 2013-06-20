
describe('Dispatch', function()
{
  describe('syncronous task', function()
  {
    it('should execute the first task', function()
    {
      new dispatch()
        .sync(function()
        {
          assert(true);
        }
      );
    });
    
    it('should pass variables from the previous task to the next task', function()
    {
      new dispatch()
        .sync(function()
        {
          return 10;
        })
        .sync(function(x)
        {
          assert.equal(x, 10);
        }
      );
    });
    
    it('should not execute when timer is paused', function()
    {
      var d = new dispatch(),
      e = new Event('scroll');
      
      window.dispatchEvent(e);
      d.sync(function()
        {
          assert(false);
        }
      );
      assert(true);
    });
  });
  
  describe('create thread', function()
  {
    it('should add a unit of work to the queue', function()
    {
      assert.equal(false);
    });
    
    it('should capture the arguments passed in', function()
    {
      assert.equal(false);
    });
  });
  
  describe('async', function()
  {
    it('background tasks can load XHR', function()
    {
      assert.equal(false);
    });
    
    it('background tasks can load dataURI images', function()
    {
      assert.equal(false);
    });
    
    it('background tasks can not load image', function()
    {
      assert.equal(false);
    });
    
    it('background tasks can not access persistence', function()
    {
      assert.equal(false);
    });
    
  })
})
