# DAO pattern for loading RESTful resources

## Resource tasks

* parse serialize/deserialize
* validation
* convenince methods for post, get, update, delete
* add query params
* pagination
* faulting opbjects in an array or object

* create traditional javascript objects with prototypes

# Loading

* use __promises__ to let objects auto-download when needed
* resources can be relatint on another resource to build. Token Authentication.
* Allow for token authentication and to change resource calls if needed to create an object. ie. need token, need user id, need friends list, access friends photo

# Peresisting locally to allow for batch sending

* persist objects locally and store on rest server seperate

# Notifications/changes to the data

* allow for object mutation observing. or dirty check and sync with mutation observing interface.

* define a resource then create instances. Attach resources to other resources

# Allow for traditional subclassing

* define custom methods. custom methods can have default params. can pass object with custom params in function.


# General principles 

* no defined scheme needed. resoruces can be sperate. no-sql mentality.
* basic API for low learning curve.
* extend vanilla JSON with functions (freeze and seal) make them non-writable and non-enumeratable
* allow for actions on the API, all API calls won't result in an Object but some will take actions.

# Threading

* run fetchs on the background. alwys for parsing to happen on the background too. Allow the option for web workers and promises.

add javascript execultion time for pasering and loading to help find issues



$restful(function Token(){}, 
          '/login', 
          {username:'joe', password:'pass', token:1234}, 
          function(xhr)
          {
            if (success)
            {
              _saveToken();
            }
            else
            {
              _retryOrErrorOut();
            }
          });

$restful(function User(Token){}, 
        '/user/:id', 
        {
          parse:function(data)
          {
            //turn into object
          },
          assemble:function(json)
          {
            //stringify and/or url encode
          },
          
        })



http://ejohn.org/blog/ecmascript-5-objects-and-properties/
Additionally, properties can be…

Writable. If false, the value of the property can not be changed.
Configurable. If false, any attempts to delete the property or change its attributes (Writable, Configurable, or Enumerable) will fail.
Enumerable. If true, the property will be iterated over when a user does for (var prop in obj){} (or similar).

You can use the new Object.getOwnPropertyDescriptor method to get at this information for an existing property on an object.

    Object.getOwnPropertyDescriptor( obj, prop )

    var obj = {};
 
    Object.defineProperty( obj, "value", {
      value: true,
      writable: false,
      enumerable: true,
      configurable: true
    });
    
    // completely private variable
    (function(){
      var name = "John";
      Object.defineProperty( obj, "name", {
        get: function(){ return name; },
        set: function(value){ name = value; }
      });
    })();

Sealing an object prevents other code from deleting, or changing the descriptors of, any of the object’s properties – and from adding new properties.


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

configurable
true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. Defaults to false.
enumerable
true if and only if this property shows up during enumeration of the properties on the corresponding object. Defaults to false.
A data descriptor also has the following optional keys:

value
The value associated with the property. Can be any valid JavaScript value (number, object, function, etc) Defaults to undefined.
writable
True if and only if the value associated with the property may be changed with an assignment operator. Defaults to false.
An accessor descriptor also has the following optional keys:

get
A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property. Defaults to undefined.
set
A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property. Defaults to undefined.


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

    var o;
 
    // create an object with null as prototype
    o = Object.create(null);
 
 
    o = {};
    // is equivalent to:
    o = Object.create(Object.prototype);
 
 
    // Example where we create an object with a couple of sample properties.
    // (Note that the second parameter maps keys to *property descriptors*.)
    o = Object.create(Object.prototype, {
      // foo is a regular "value property"
      foo: { writable:true, configurable:true, value: "hello" },
      // bar is a getter-and-setter (accessor) property
      bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) { console.log("Setting `o.bar` to", value) }
    }});



http://docs.angularjs.org/api/ngResource.$resource

$resource(url[, paramDefaults][, actions]);

Returns
{Object} – A resource "class" object with methods for the default set of resource actions optionally extended with custom actions. The default set contains these actions:
{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
  

    var CreditCard = $resource('/user/:userId/card/:cardId',
     {userId:123, cardId:'@id'}, {
      charge: {method:'POST', params:{charge:true}}
     });
 
    // We can retrieve a collection from the server
    var cards = CreditCard.query(function() {
      // GET: /user/123/card
      // server returns: [ {id:456, number:'1234', name:'Smith'} ];
 
      var card = cards[0];
      // each item is an instance of CreditCard
      expect(card instanceof CreditCard).toEqual(true);
      card.name = "J. Smith";
      // non GET methods are mapped onto the instances
      card.$save();
      // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
      // server returns: {id:456, number:'1234', name: 'J. Smith'};
 
      // our custom method is mapped as well.
      card.$charge({amount:9.99});
      // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
    });
 
    // we can create an instance as well
    var newCard = new CreditCard({number:'0123'});
    newCard.name = "Mike Smith";
    newCard.$save();
    // POST: /user/123/card {number:'0123', name:'Mike Smith'}
    // server returns: {id:789, number:'01234', name: 'Mike Smith'};
    expect(newCard.id).toEqual(789);
    
    
    
    
    
    
    
    
    