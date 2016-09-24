




var searchResults = [];
$("#storeSortBtnList").empty();

$("body").on("click", "#searchProduct", function() {
        
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
                          storeName: "walmart"
                        };
                  
                        searchResults.push(item);
                    }

                            if($('#walmart').length )  
                            {
                                 console.log("Best Buy Button Exist!!!");
                                 
                            }else{
                                // Then dynamicaly generates button store
                                var storeBtn = $("<button>") 
                                storeBtn.addClass("btn btn-default animated swing store"); // Added a class 
                                storeBtn.attr('id', "walmart");
                                storeBtn.attr('data-store', "walmart"); // Added a data-attribute
                                storeBtn.text("Walmart"); // Provided the initial button text
                                $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                            }
    
// Call BESTBUY API INSIDE DONE OF WALMART...Simlarly call future api class one by one inside the done methods of call
                    var queryURLBB = "https://api.bestbuy.com/v1/products((search=" + searchFor + ")&customerReviewAverage=4.8&(categoryPath.id=abcat0101000))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=10&format=json";

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
                              storeName: "bestbuy"
                            };
                          
                            searchResults.push(item);
                            
                          }  
                            //Check if button already exist and if doesnot exist then only create a new button
                           if($('#bestbuy').length )  
                            {
                                 console.log("Best Buy Button Exist!!!");
                                 
                            }else{
                                // Then dynamicaly generates button store
                                var storeBtn = $("<button>") 
                                storeBtn.addClass("btn btn-default animated swing store"); // Added a class
                                storeBtn.attr("id", "bestbuy");
                                storeBtn.attr('data-store', "bestbuy"); // Added a data-attribute
                                storeBtn.text("Best Buy"); // Provided the initial button text
                                $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                            }                        

                           displayResults(searchResults);           
                        });

                         
            });
            return false;
    });
function displayResults(resultsArray){

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
                    var containerDiv = $("<div class='col-xs-6 col-sm-4 animated zoomIn product'>");
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
                     

                    var buttonWishList = $("<button id='addItem'>");
                    buttonWishList.attr("type", "submit");
                    var spanBtn = $("<i class='fa fa-heart'>");
                    spanBtn.text(" List ");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.append(spanBtn);

                    divInfo.append(buttonWishList);
                    colproductDiv.append(divInfo);

                    rowProductDiv.append(colproductDiv); 
                    divItem.append(rowProductDiv);  
                    
                    
                    containerDiv.prepend(divItem);
                    $('#productList').prepend(containerDiv);
                }

}
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
            
        });




// Pseudo Code
// Onpageload:
// Create API functions for calling each api (with Fixed Query Decided by us)
// Data response is used to populate the carousal at landing 
// get response for api and save the results in format 
// StoreArray[
//     items{
//         name:
//         price:
//         customerRating:
//         storeLogo:
//         numberReviews:
//         imageURLSmall:
//         imageURLLarge:
//         shortdescription:
//         storeURL:
//     }]
//  once we have all the arrays ready with product information next step is to populate 
//  each div block with first item from array for respective store
// For $ block Carousal 
// identify properties container by #ID 
// Populate first slide of carousal with item one from array 














