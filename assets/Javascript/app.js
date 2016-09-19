$(document).ready(function(){

// ================================================================================================== //
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzBMRn1owNGPyB24mOo6UUP0v8KfUqMaQ",
    authDomain: "buyakdb.firebaseapp.com",
    databaseURL: "https://buyakdb.firebaseio.com",
    storageBucket: "buyakdb.appspot.com",
    messagingSenderId: "781575941750"
  };
  firebase.initializeApp(config);
// ================================================================================================== //

// ================================================================================================== //
//Global Variables below
var wishItemCount = 0;
var wishArray= [];


// ================================================================================================== //
  //Calls addItem function when Add Item button is clicked
  $("#addItem").click(function(){
  		addItem();
  });

  //Add Item to wishlist function
  function addItem(productItem){
  	var wishItem = productItem;

  };
// ================================================================================================== //



















});//End jQuery











