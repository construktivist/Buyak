// ================================================================================================== //
// GLOBAL VARIABLES
// ================================================================================================== //
var walmartProducts = [];
var bestbuyProducts = [];
var searchResults = [];
var wishItemCount = 0;
var wishArray= [];
var indexCount = 0;

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
    // AJAX CALL FOR APIs TO POPULATE PRODUCT CAROUSEL On page load
    //(Scalable for search across multiple categories and products with interlooped api call)
    // localStorage.clear();

  // var localStorageArrTest = JSON.parse(localStorage.getItem("localWishlist"));

  // if (localStorageArrTest.length !== 0) {
  //   var wishCount = localStorageArrTest.length;
  //   console.log("INSIDE LOCAL STORAGE TEST IF BLOCK::::" + wishCount);
  // }  



  var populateCarousel = function(){

    var featuredCategories = 'computer';
      var sortQueryURLWalmart = "http://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + featuredCategories +"&sort=bestseller&responseGroup=full"
        $.ajax({
                    url: sortQueryURLWalmart,
                    method: 'GET',
                    crossDomain: true,
                    dataType: 'jsonp'
        })
        .done(function(response) {
            var results = response.items;
              console.log("Inside Walmart API CALL");
                for (var i = 0; i < results.length; i++){
                   var item = {
                                name: results[i].name,
                                price: results[i].salePrice,
                                mdImage: results[i].mediumImage,
                                lgImage: results[i].largeImage,
                                rating: results[i].customerRating,
                                numReviews: results[i].numReviews,
                                storeName: "walmart"
                              };
                      
                            //searchResults.push(item);
                            walmartProducts.push(item);
                        }// for Loop Ends                         
                  // Call BESTBUY API INSIDE DONE OF WALMART...Simlarly call future api class one by one inside the done methods of call
                  var queryURLBB = "https://api.bestbuy.com/v1/products((search=" + featuredCategories + ")&customerReviewAverage>=3.6&(categoryPath.id=abcat0101000))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=10&format=json";
                     $.ajax({
                              url: queryURLBB,
                              method: 'GET',
                              cache: true,
                              crossDomain: true,
                              dataType: 'jsonp'
                            })
                            .done(function(responseBB) {
                                var resultsBB = responseBB.products;
                                console.log("Inside BB API CALL" + JSON.stringify(resultsBB));       

                                for (var i = 0; i < resultsBB.length; i++){
                                  var item = {
                                    name: resultsBB[i].name,
                                    price: resultsBB[i].salePrice,
                                    mdImage: resultsBB[i].mediumImage,
                                    lgImage: resultsBB[i].largeImage,
                                    rating: resultsBB[i].customerReviewAverage,
                                    numReviews: resultsBB[i].customerReviewCount,
                                    storeName: "bestbuy"
                                  };                          
                                //searchResults.push(item);
                                bestbuyProducts.push(item);
                                
                              }// for Loop ends

                              //Call to display results in carousel 
                               carousalDisplay();        
                          });//Bestbuy API call ends
                             
        });//walmart API call ends
  }//populate Carousal ends
   
  // ========================AJAX Function FOR APIs TO POPULATE PRODUCT CAROUSEL Ends======================= //

  //CALL POPULATE CAROUSAL
  populateCarousel();
  $(".carousel").carousel({
          interval: 8000
  });

  //ON PRODUCT KEYWORD SEARCH IS CLICKED
  $(document).on("click", "#searchProduct", function() {

                $("#storeSortBtnList").empty();
                $('#contentSection').removeClass("hidden");
                $('#contentSectionFeatured').addClass("hidden");
                $('#search').val("");

                var searchFor = $("#productSearch").val().trim();
                console.log("Value of P : " + searchFor);
                $("#productSearch").val("");

                // CALL WALMART API FOR BEST SELLER PRODUCTS
                var sortQueryURLWalmart = "http://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + searchFor +"&sort=bestseller&responseGroup=full"

                $.ajax({
                        url: sortQueryURLWalmart,
                        method: 'GET',
                        crossDomain: true,
                        dataType: 'jsonp'
                    })
                    .done(function(response) {

                         var results = response.items;
                          for (var i = 0; i < results.length; i++){
                                var item = {
                                  name: results[i].name,
                                  price: results[i].salePrice,
                                  mdImage: results[i].mediumImage,
                                  lgImage: results[i].largeImage,
                                  rating: results[i].customerRating,
                                  numReviews: results[i].numReviews,
                                  description: results[i].shortDescription,
                                  storeURL: results[i].productUrl,
                                  storeName: "walmart"
                                };
                          
                                searchResults.push(item);
                                //walmartProductsArr.push(item);
                            }
                                    if($('#walmartSort').length)  
                                    {
                                         console.log("Walmart Button Exist!!!");
                                         
                                    }else{
                                        // Then dynamicaly generates button store
                                        var storeBtn = $("<button>") 
                                        storeBtn.addClass("btn btn-default animated bounceInRight store"); // Added a class 
                                        storeBtn.attr('id', "walmartSort");
                                        storeBtn.attr('data-store', "walmart"); // Added a data-attribute
                                        storeBtn.text("Walmart"); // Provided the initial button text
                                        $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                                    }
            
                            // Call BESTBUY API INSIDE DONE OF WALMART...Simlarly call future api class one by one inside the done methods of call
                            var queryURLBB = "https://api.bestbuy.com/v1/products((search=" + searchFor + ")&customerReviewAverage>=3.6&(categoryPath.id=abcat*))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=10&format=json";

                            $.ajax({
                                  url: queryURLBB,
                                  method: 'GET',
                                  cache: true,
                                  crossDomain: true,
                                  dataType: 'jsonp'
                                })
                                .done(function(responseBB) {
                                    var resultsBB = responseBB.products;
                                    console.log("Inside BB API CALL");                            

                                    for (var i = 0; i < resultsBB.length; i++){

                                            var item = {
                                              name: resultsBB[i].name,
                                              price: resultsBB[i].salePrice,
                                              mdImage: resultsBB[i].mediumImage,
                                              lgImage: resultsBB[i].largeImage,
                                              rating: resultsBB[i].customerReviewAverage,
                                              numReviews: resultsBB[i].customerReviewCount,
                                              description: results[i].longDescription,
                                              storeURL: results[i].url,
                                              storeName: "bestbuy"
                                            };
                                  
                                    searchResults.push(item);
                                    //bestbuyProductsArr.push(item);
                                    
                                  }  
                                    //Check if button already exist and if doesnot exist then only create a new button
                                   if($('#bestbuySort').length )  
                                    {
                                         console.log("Best Buy Button Exist!!!");
                                         
                                    }else{
                                        // Then dynamicaly generates button store
                                        var storeBtn = $("<button>") 
                                        storeBtn.addClass("btn btn-default animated bounceInRight store"); // Added a class
                                        storeBtn.attr("id", "bestbuySort");
                                        storeBtn.attr('data-store', "bestbuy"); // Added a data-attribute
                                        storeBtn.text("Best Buy"); // Provided the initial button text
                                        $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                                    }                        

                                   displayResults(searchResults);   
                                   //carousalDisplay(walmartProductsArr,bestbuyProductsArr);        
                                });

                                 
                    });
                            return false;
  });//seachproduct onclick ends
  
  //Store Button In Search Grid sort the products
  $(document).on('click', '.store', function(){

    console.log("Inside store click sort" + $(this).attr('data-store'));
    var store = $(this).attr('data-store');
    console.log(store);
      if (store == 'walmart'){
            $(".product").fadeOut(); 
            $(".product.walmart").fadeIn();
       }else if (store == 'bestbuy'){
            $(".product").fadeOut();
            $(".product.bestbuy").fadeIn();               
      }                
  });//onclick store ends

  //Add items from search grid to wishlist grid
  $(document).on('click', '.addItemToWishlist', function(){  

       var itemIndex = $(this).data("index");
       $(this).closest('.product').addClass("animated slideOutDown hidden");
       console.log("Inside ADDITEM item Index of item clicked" + itemIndex );

       var arrayItem = searchResults[itemIndex];
       console.log("Inside Add item to wishlist click Item From array" + JSON.stringify(arrayItem));

        wishArray.push(arrayItem);
        localStorage.clear();
        localStorage.setItem("localWishlist", JSON.stringify(wishArray));
        wishItemCount++;
        $(".fa-gift").text(" "+wishItemCount+" Items In Wishlist");
        displayList(wishArray);     
  });//Add item to wishlist Ends

  //Calls addItem function when Add Item to Wishlist on carousal is clicked
  $(document).on("click", ".addItem", function(){
        addItem(this);
        wishItemCount++;
        $(".fa-gift").text(" "+wishItemCount+" Items In Wishlist ");
  });

    // Remove item from search results
  $(document).on('click', '.removeItem', function(){
    $(this).closest('.product').addClass("animated slideOutDown hidden");
  });
    
  //Remove item from wishlist and display list with updated itemlist
  $(document).on('click', '.removeItemFromWishList', function(){

        $(this).closest('.wishlistItem').addClass("animated slideOutDown hidden");
        var indexWishItem = $(this).data("index");
        console.log("WishList Array Index" + indexWishItem);
        wishArray.splice(indexWishItem, 1);        
        localStorage.clear();
        localStorage.setItem("localWishlist", JSON.stringify(wishArray));
        wishItemCount--;
        $(".fa-gift").text(" "+ wishItemCount+" Items In Wishlist");
        displayList(wishListArr);
        // $(".fa-gift").text(" "+ wishItemCount+" Items in your Wishlist");

  });

  $(document).on('click', '#wishlist', function(){

    //write code to check if localstorage has wishlist items
    //check if there are any items in wishListGrid Display
    //clear grid of items and get localstorage wisharray and display
    //if array is empty give message that no items in wish list add items
    // ================================================================================================== //

    $('#wishListGrid').removeClass("hidden");
    displayList(wishArray);     

  });

  //BELOW SECTION FOR Pushing the local wishlist to firebase when user clicks save wishlist STORAGE OF WISHLIST
  // ================================================================================================== //
    $(document).on("click", "#saveListByName", function(){

      var listName = $("#wishListName").val().trim();
      var wishArray = localStorage.getItem("localWishlist");  

      database.ref().push({
      name : listName,
      wishlist: wishArray
      });
    });

    database.ref().on("value", function(snapshot){
      console.log(snapshot.val().name);
    })

});//document.ready ends


function displayResults(resultsArray){

    //console.log(resultsArray);

                for (var i = 0; i < resultsArray.length; i++) {

                    //Get Item Values
                        //Get Item Name
                        var nameItem = resultsArray[i].name;
                        //make shorttext of the name
                        var shortnameItem = jQuery.trim(nameItem).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                        //Get Number of reviews
                        var reviewNum = resultsArray[i].numReviews;                         
                        if (typeof reviewNum === "undefined") {
                                reviewNum = "None" ;
                            }

                        //Get Image source url
                        var imageSrc = resultsArray[i].mdImage;
                        if(typeof imageSrc === "undefined"){
                            imageSrc = "http://placehold.it/180x180";
                        }

                        //Get Customer Rating
                        var ratingVal = resultsArray[i].rating;
                         if(typeof ratingVal === "undefined"){
                            ratingVal = ""
                         }                      

                    
                    //Make outer div 
                    var containerDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 animated zoomIn product'>");
                    containerDiv.addClass(resultsArray[i].storeName);
                    
                    //make  inner div
                    var divItem = $("<div class='col-xs-12 well item'>");
                    

                    //add row for title
                    var rowTitleDiv = $("<div class='row'>");
                    

                    var divTitle = $('<div class="col-xs-12 titleProduct">').html("<p>" + shortnameItem + "</p>");
                    // append div to rowTitleDiv and append rowTitleDiv to divItem
                    rowTitleDiv.append(divTitle);
                    divItem.append(rowTitleDiv);


                    //Add row to hold image and productinfo
                    var rowProductDiv = $("<div class='row'>");
                    var colproductDiv = $("<div class='col-xs-12'>");
                    
                    //Add column to hold image
                    var divImage = $("<div class='col-xs-6'>");    

                    var itemImage = $('<img>');
                    itemImage.attr('src', imageSrc);
                    itemImage.addClass("img-responsive img-rounded");  
                    itemImage.addClass("itemImage");
                    divImage.append(itemImage);
                    colproductDiv.append(divImage);    
                    

                    //Add info section to product

                    var divInfo = $("<div class='col-xs-6'>");                

                    divInfo.append("<p class='salePrice'> $" + resultsArray[i].price + "</p>")                    
                    divInfo.append("<p> Reviews : " + reviewNum + "<br><span class='badge'>" + ratingVal + "</span></p>");  
                     

                    var buttonWishList = $("<button>");
                    buttonWishList.attr("type", "submit");
                    buttonWishList.attr("data-toggle", "tooltip");
                    buttonWishList.attr("data-index", i);
                    
                    buttonWishList.attr("title", "Add To Wishlist");
                    buttonWishList.addClass("addItemToWishlist");
                    var spanBtn = $("<i class='fa fa-plus-circle'>");
                    spanBtn.text("");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.append(spanBtn);

                    var buttonRemove = $("<button>");
                    buttonRemove.attr("type", "submit");
                    buttonRemove.attr("data-toggle", "tooltip");
                    buttonRemove.attr("title", "Remove Item From Search displayResults");
                    buttonRemove.addClass("removeItem");
                    var spanRBtn = $("<i class='fa fa-minus-circle'>");
                    spanRBtn.text("");
                    buttonRemove.addClass("btn btn-default");
                    buttonRemove.append(spanRBtn);

                    divInfo.append(buttonWishList);
                    divInfo.append(buttonRemove);
                    colproductDiv.append(divInfo);

                    rowProductDiv.append(colproductDiv); 
                    divItem.append(rowProductDiv);                      
                    
                    containerDiv.prepend(divItem);
                    $('#productList').prepend(containerDiv);
                }
}
//displayResults ends

// ================================================================================================== //

function carousalDisplay(){

        console.log(walmartProducts);
        console.log(bestbuyProducts);
        //Get the number of slides to create
        var numSlides = walmartProducts.length;
        console.log(numSlides);

        //Create carousal div
        var divCarousal = $("<div id='myCarousel' class='carousel slide' data-ride='carousel'>");
        // Indicators ol list
        var olDiv = $("<ol class='carousel-indicators'>");
        for (var i = 0; i < numSlides; i++) {
            var liSlide = $("<li data-target='#myCarousel' data-slide-to='" + i + "' class='active'></li>");
            olDiv.append(liSlide);
        }

        divCarousal.append(olDiv);

        var divCarousalInner = $("<div class='carousel-inner'>");
        //Create number of slides equal to number of item in products array
        for (var slideCount = 0; slideCount < numSlides; slideCount++){

            var divItem = $("<div class='item'>");        
            if(slideCount==0){
                //Set item class to active for first slide
                divItem.addClass("active");
             }
            //Create panels for number of stores currently we have 2 stores
            for (var i = 0; i < 2; i++) {

                var colItem =$("<div class='col-xs-12 col-sm-6'>");
                var panelItem = $("<div class='panel panel-default'>");
                var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>Panel Heading Title Here</h4>");

                // Create substring of the name and then append it to heading
                //Select items from Product Array based on the panel number eg panel one is for walmart 
                if(i==0){                
                    var shortItemName = jQuery.trim(walmartProducts[slideCount].name).substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
                    var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");
                }else if(i==1){                
                     var shortItemName = jQuery.trim(bestbuyProducts[slideCount].name).substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
                    var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");
                }
                panelItem.append(panelHeadingItem);

                var panelBodyItem = $("<div class='panel-body'>");
                var bodyRow = $("<div class='row'>");
                var bodyCol = $("<div class='col-sm-12'>");
                // Create image src for each store
                if(i==0){
                    // console.log("FOR WALMART PRODUCT Image");
                    var panelBodyImageCol = $("<div class='col-xs-6 product-image'>").html("<img src='" + walmartProducts[slideCount].mdImage + "' class='img-responsive'>");
                    bodyCol.append(panelBodyImageCol);
                }else if(i==1){
                    // console.log("FOR BESTBUY PRODUCT Image");
                    var panelBodyImageCol = $("<div class='col-xs-6 product-image'>").html("<img src='" + bestbuyProducts[slideCount].lgImage + "' class='img-responsive'>");
                    bodyCol.append(panelBodyImageCol);
                }

                //Get Product Information column for each store
                if(i==0){
                    console.log("FOR WALMART PRODUCT Info");
                    var panelBodyInfoCol = $("<div class='col-xs-6 product-info'>");
                    panelBodyInfoCol.append("<p class='salePrice'> $" + walmartProducts[slideCount].price + "</p>");
                    panelBodyInfoCol.append("<p class='reviews'> Reviews : " + walmartProducts[slideCount].numReviews + "<br><span class='badge'>" + walmartProducts[slideCount].rating + "</span></p>");
                   
                    var buttonWishList = $("<button>");
                        buttonWishList.attr("type", "submit");
                        buttonWishList.attr("data-toggle", "tooltip");
                        buttonWishList.attr("title", "Add To Wishlist");
                        buttonWishList.addClass("btn btn-default");
                        buttonWishList.addClass("addItem");
                        buttonWishList.addClass("walmart-item");
                        buttonWishList.attr("data-index", slideCount);
                        buttonWishList.attr("data-storename", walmartProducts[slideCount].storeName);
                        var spanBtn = $("<i class='fa fa-plus-circle'>");
                        spanBtn.text("Add to Wishlist");
                        buttonWishList.append(spanBtn);

                        panelBodyInfoCol.append(buttonWishList);
                        bodyCol.append(panelBodyInfoCol);                  
                }else if(i==1){
                    console.log("FOR BESTBUY PRODUCT Info");
                     var panelBodyInfoCol = $("<div class='col-xs-6 product-info'>");
                    panelBodyInfoCol.append("<p class='salePrice'> $" + bestbuyProducts[slideCount].price + "</p>");
                    panelBodyInfoCol.append("<p class='reviews'> Reviews : " + bestbuyProducts[slideCount].numReviews + "<br><span class='badge'>" + bestbuyProducts[slideCount].rating + "</span></p>");
                     
                     var buttonWishList = $("<button>");
                        buttonWishList.attr("type", "submit");
                        buttonWishList.attr("data-toggle", "tooltip");
                        buttonWishList.attr("title", "Add To Wishlist");
                        buttonWishList.addClass("btn btn-default");
                        buttonWishList.addClass("addItem");
                        buttonWishList.addClass("bestbuy-item");
                        buttonWishList.attr("data-index", slideCount);
                        buttonWishList.attr("data-storename", bestbuyProducts[slideCount].storeName);
                        var spanBtn = $("<i class='fa fa-plus-circle'>");
                        spanBtn.text("Add to Wishlist");
                        buttonWishList.append(spanBtn);

                        panelBodyInfoCol.append(buttonWishList);
                        bodyCol.append(panelBodyInfoCol);
                }

                bodyRow.append(bodyCol);
                panelBodyItem.append(bodyRow);

                panelItem.append(panelBodyItem);

                var panelFooterItem = $("<div class='panel-footer'>");
                var footerRow = $("<div class='row'>");
                var footerCol = $("<div class='col-xs-3 col-xs-offset-9'>");
                if(i==0){
                    footerCol.append("<img src='assets/images/Walmart_icon.png' class='img-responsive img-logo-panel-heading icon'>");
                    footerRow.append(footerCol);
                }else if(i==1){
                    footerCol.append("<img src='assets/images/BB_Icon.png' class='img-responsive img-logo-panel-heading icon'>");
                    footerRow.append(footerCol);
                }

                panelFooterItem.append(footerRow);

                panelItem.append(panelFooterItem);

                colItem.append(panelItem);
                
                divItem.append(colItem);
            }
      
            divCarousalInner.append(divItem);
        }   

        divCarousal.append(divCarousalInner);

        var carousalNavPrev = $("<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>");
        carousalNavPrev.append("<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'>");
        carousalNavPrev.append("<span class='sr-only'>Previous</span>");

        divCarousal.append(carousalNavPrev);

        var carousalNavNext = $("<a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>");
        carousalNavNext.append("<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>");
        carousalNavNext.append("<span class='sr-only'>Next</span>");

        divCarousal.append(carousalNavNext);

        $("#contentSectionFeatured").append(divCarousal);
}//carousalDisplay Ends 

// ================================================================================================== //

//Add Item from carousal to wishlist function
function addItem(item){

        var index = $(item).data("index");
        var store = $(item).data("storename");

        //This one is for Carousel array
        if (store === "walmart"){
          var storeArray = walmartProducts;
        } else {
          var storeArray = bestbuyProducts;
        }

        //Items added to wishlist go to wishArray and are stored in localStorage.
        var wishItem = storeArray[index];
        wishArray.push(wishItem);
        console.log(wishArray);
        localStorage.clear();
        localStorage.setItem("localWishlist", JSON.stringify(wishArray));
        displayList(wishArray);
}
// ================================================================================================== //

function displayList(wishListArr){

    console.log("inside wishlist display function");
    $("#saveWishList").removeClass("hidden");

     if($("#wishListGrid").length){
        $("#wishListGrid").empty();
      }

     $("#wishListGridDisplay").removeClass("hidden");
    for (var i = 0; i < wishListArr.length ; i++){
        
        //Create Modal Item Short List
        if (wishListArr[i].storeName == "walmart") {
            console.log(wishListArr[i].storeName);
            var anchorImgSrc = wishListArr[i].mdImage;

        }else if (wishListArr[i].storeName == "bestbuy") {
            console.log(wishListArr[i].storeName);
             var anchorImgSrc = wishListArr[i].lgImage;
        }

        
        var itemContainer = $("<div class=' col-sm-3 text-center wishlistItem'>");

       
        var colContainer = $("<div class='col-sm-12 well portfolioItem'>");

        var imageAnchor = $("<a href='#' data-target='"+ i +"' data-toggle='modal'>").html("<img src='"+ anchorImgSrc  +"' class='img-responsive' alt=''>");
        colContainer.append(imageAnchor);
        var shortName = jQuery.trim(wishListArr[i].name).substring(0, 50).split(" ").slice(0, -1).join(" ") + "...";
        var itemInfoDiv = $("<div>").html("<p>"+ shortName +"</p><h3> $ "+ wishListArr[i].price +"</h3>");
        colContainer.append(itemInfoDiv);

        var buttonRemove = $("<button>");
                    buttonRemove.attr("type", "submit");
                    buttonRemove.attr("data-toggle", "tooltip");
                    buttonRemove.attr("data-index", i);
                    buttonRemove.attr("title", "Remove Item From Search displayResults");
                    buttonRemove.addClass("removeItemFromWishList");

                    var spanRBtn = $("<i class='fa fa-minus-circle'>");
                    spanRBtn.text("");
                    buttonRemove.addClass("btn btn-default");
                    buttonRemove.append(spanRBtn);

        
        itemContainer.append(buttonRemove);
        itemContainer.append(colContainer);
        $("#wishListGrid").append(itemContainer);    
    }
}//displayList function ends

//Implement Local storage for wishlist items
$("#wishListGrid").empty();
// If Data exists inside of localStorage then loop through and display it.
if(JSON.parse(localStorage.getItem("localWishlist"))){

  var storedWishlist = JSON.parse(localStorage.getItem("localWishlist"));

  wishArray = storedWishlist;

  wishItemCount = wishArray.length;

  $(".fa-gift").text(" "+ wishItemCount+" Items In Wishlist");

  displayList(wishArray);  

  if(wishItemCount === 0){
    $('#wishListSection').addClass('hidden');
  }

}










