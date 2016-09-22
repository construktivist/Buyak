$(document).ready(function(){

// FIREBASE INITIALIZATION
// ================================================================================================== //
//  Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzBMRn1owNGPyB24mOo6UUP0v8KfUqMaQ",
    authDomain: "buyakdb.firebaseapp.com",
    databaseURL: "https://buyakdb.firebaseio.com",
    storageBucket: "buyakdb.appspot.com",
    messagingSenderId: "781575941750"
  };
  
  firebase.initializeApp(config);

  database = firebase.database();
// ================================================================================================== //





// GLOBAL VARIABLES
// ================================================================================================== //
  var wishItemCount = 0;
  var wishArray= [];
  var testProduct = "This is a test product";

// ================================================================================================== //




// AJAX CALL FOR APIs BELOW
// ================================================================================================== //
 // var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + p;

        // $.ajax({
        //         url: queryURL,
        //         method: 'GET',
        //         crossDomain: true,
        //         dataType: 'jsonp'
        //     })
        //     .done(function(response) {

        //       }
        //     });











// ================================================================================================== //

//ARRAY OF THE PRODUCTS THAT HAVE BEEN SEARCHED. THIS WILL BE USED FOR THE WISHLIST CONTENT.

//WHEN SUBMIT IS CLICKED, ADD INPUT TO THE PRODUCT ARRAY
//WHEN SUBMIT IS CLICKED, PRODUCT MODALS WILL APPEAR
$('#submit').on('click', function(){
	$('.logo').addClass('hidden');
	$('.modal-content').removeClass('hidden');
	$('#search').val("");
});





//BELOW SECTION FOR LOCAL STORAGE OF WISHLIST
// ================================================================================================== //
//View wishlist
$('#wishlist').on('click', function(){
	$('#wishListGrid').removeClass('hidden');
});


//Calls addItem function when Add Item button is clicked
  $("#addItem").click(function(){
  		addItem(testProduct);
      wishItemCount++
  });

  //Add Item to wishlist function
  function addItem(productItem){``  
  	var wishItem = productItem;
    console.log(wishItem);
  	wishArray.push(wishItem);
    localStorage.setItem("localWishlist", wishArray)
  };

//Delivers wishlist to DOM from Local Storage
  console.log(localStorage.getItem("localWishlist"));
// ================================================================================================== //




















});//End jQuery











