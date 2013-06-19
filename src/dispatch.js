define('dispatch', 
  function () {
    'use strict';
    
    /*!
     * store workers and functions in a queue. 
     * TODO: find a way to have a object pool for web workers
     */
    var queue = [],
    
    /*!
     * create a anonymous block of work and the inital arguments
     * \fn string createBlock(func, parameters)
     * \param func a function with isolated work function 
     * \param args an array of the arguments for the function
     * \return Worker a web worker to be executed by the queue
     */
    createThread = function(func, args)
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
  
      var serizedAction = window.URL.createObjectURL(
                            new Blob([synchronousAction])),
      thread = new Worker(serizedAction);
      thread.addEventListener('message', function(e)
      {
        console.debug(e.data)
        var result = e.data;
        // call next task in the queue chain
      });
      
      // add worker to queue
      
    },

    runQueue: function()
    {
      // add listeners for scrolling, mousemove, over runloop time to stop execution
      
      // loop through queue
        // start perf timer
        
        // run a task
        
        // record perf timer
    },
    
    dispatch = {
      asyc: function()
      {
        // create a worker thread.
        // TODO: need to add function to reuse thread since they are expenive to create
        // add to queue 
        // return self for chaining
      },
      sync: function()
      {
        
        // return self for chaining
      },
      batch: function(fnc, items, throttle)
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


