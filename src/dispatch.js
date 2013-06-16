
createQueue = function(instructions, args)
{
  var i = 0,
  synchronousAction = 'onmessage = function(event)' +
    '{\n'+
    'var data = event.data;\n'+
    (function(fn, arg){
      var names = fn.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg,'')
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
        .split(/,/),
      s = '';
      
      for (; i<args.length; i++) 
      {
        s += 'var '+names[i]+' = '+args[i]+';\n'
      }
      return s;
    }(instructions, args)) +
    'self.message(\n'+
    instructions.toString() + 
    ');\n'+
    '};';
    console.log(synchronousAction)
    

    var serizedAction = window.URL.createObjectURL(
                          new Blob([synchronousAction])),
    thread = new Worker(serizedAction);
    thread.onmessage = function(e){
      var result = e.data;
      // call next item
    }
    
    thread.onmessage()
    // add worker to queue
}
var h = 'hello', w = 'world';
createQueue(function(h,w){
  console.log(h,w)
},
[h,w]);



var blob = new Blob([
    "onmessage = function(e) { postMessage('msg from worker'); }"]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
  // e.data == 'msg from worker'
};
worker.postMessage(); // Start the worker.

asyc: function(){
  
},
sync: function(){
  
}



// example
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


