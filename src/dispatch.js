define('dispatch', 
  function () {
    'use strict';
    
    (function() {
      var requestAnimationFrame = window.requestAnimationFrame || 
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.msRequestAnimationFrame || 
                                  function( callback ){
                                    window.setTimeout(callback, 1000 / 60);
                                  };
      window.requestAnimationFrame = requestAnimationFrame;
      window.console = console || {};
      window.console.time = window.console.time || function(){};
      window.console.timeEnd = window.console.timeEnd || function(){}
    })();
    
    var DEFER_DELAY = (1000 / 60) * 3, 
    
    /*!
     * store workers and functions in a queue. 
     * TODO: find a way to have a object pool for web workers
     */
    queue = [],
    result = null,
    
    paused = false,
    pauseTimer = null,
    
    /*!
     * Process any work remaining in the queue
     */
    start = Date.now(),
    delta = 0,
    step = function(timestamp)
    {
      delta = timestamp - start;
      console.log(delta)
      next();
      requestAnimationFrame(step);
    },
    
    /*!
     * create a anonymous block of work and the inital arguments
     * \fn string createBlock(func, parameters)
     * \param func a function with isolated work function 
     * \param args an array of the arguments for the function
     * \return Worker a web worker to be executed by the queue
     */
    createThread = function(func, args, callback)
    {
      // TODO: add hook to stop processing when heavy load
      // TODO: fall back to main thread if workers not supported
      var capturedArguments = args,
      synchronousAction = 'onmessage = function(event)' +
        '{\n'+
        'var data = event.data;\n'+
        'var fn = '+
        func.toString() + 
        ';\n'+
        'returnValue = fn.apply(fn, data);\n'+
        'self.postMessage( returnValue );\n'+
        '};';
      
      var compile = new Blob([synchronousAction]),
      serizedAction = window.URL.createObjectURL(compile),
      thread = new Worker(serizedAction);
      thread.addEventListener('message', function(e)
      {
        callback(e.data);
      });
      
      return thread;
    },

    next = function(data)
    {
      if (paused) return;
      
      var i, task, args, fnc, len = queue.length;
      for (i=0; i<len; i++)
      {
        // start perf timer
        console.time('dispatch');
        
        // run a task
        task = queue.pop();
        
        if (task.type === 'sync') i = len;
        fnc = task.fnc;
        args = task.args;
        args.push(data)
        result = fnc.apply(this, args)
        
        // record perf timer
        console.timeEnd('dispatch');
      }
    },
    
    dispatch = function(){
      this.asyc = function(fnc, args)
      {
        var args = args || [],
        thread = createThread(fnc, args, next);
        
        queue.push({
          type: 'async', 
          args: args,
          fnc: function()
          {
            thread.postMessage(arguments)
          }
        });
        // TODO: need to add function to reuse thread since they are expenive to create
        
        return this;
      }
      this.sync = function(fnc, args)
      {
        var args = args || [];
        
        queue.push({
          type: 'async', 
          args: args,
          fnc: fnc
        });
        
        next(result);
        return this;
      }
      this.batch = function(fnc, items, throttle)
      {
        // create a function to iterate 
        
          // start perf timer
          // run an iteration
          // TODO: make changes via shadow dom, either as option or reflection
          // record perf timer
        // return self for chaining
      }
    };
    dispatch.prototype = function Dispatch(){}
    
    // add listeners for scrolling to defer work
    window.addEventListener('scroll', function()
    {
      if (pauseTimer) clearInterval(pauseTimer);
      
      paused = true;
      
      pauseTimer = setInterval(function()
      {
        paused = false;
        clearInterval(pauseTimer);
      }, DEFER_DELAY);
    });
    
    return dispatch;
});




/* examples 

dispatch.batch(function(arr, i)
{
  $li.html(arr[i].text);
}, [obj1,obj2,..], perIteration)


dispatch.async(/*load json/).async(/*parse json/).sync(/*update dom/)

dispatch.sync(/*persist to local storage/).async(/*update database/).sync(/*resolve persistence/)

dispatch.sync(/*load image/).sync(/*place image/)

dispatch.sync(/*grab a list of dom elements/).sync(/*update css on dom elements/)

dispatch.sync(/*grab a list of dom elements/).sync(/*pull into a shadow dom and change and reset back/)


// note: can a background task access a shadow dom? doubtful.

// note: can a dataURI image be cached?


// example of what the rest will do to get a resource 
dispatch.async(function(resourceURL)
{
  // resource URL would be 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'doodle.png', true);

  xhr.responseType = 'json';

  xhr.onload = function(e) 
  {
    if (this.status == 200) 
    {
      // happy path
    }
    else
    {
      // fail
    }
  };

  xhr.send();
}, resourceURL)
*/


