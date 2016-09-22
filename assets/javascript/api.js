 
 $("body").on("click", "#searchProduct", function() {
        
        var searchFor = $("#productSearch").val().trim();
        console.log("Value of P : " + searchFor);
        var queryURLWalmart = "https://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + searchFor;
        var sortQueryURLWalmart = "http://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + searchFor +"&sort=bestseller&responseGroup=full"

        $.ajax({
                url: sortQueryURLWalmart,
                method: 'GET',
                crossDomain: true,
                dataType: 'jsonp'
            })
            .done(function(response) {
                var results = response;
                //console.log("Results: " + JSON.stringify(results));

                for (var i = 0; i < results.items.length; i++) {

                    //Get Item Values
                        //Get Item Name
                        var nameItem = results.items[i].name;
                        //make shorttext of the name
                        var shortnameItem = jQuery.trim(nameItem).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                        //Get Number of reviews
                        var reviewNum = results.items[i].numReviews;                         
                        if (typeof reviewNum === "undefined") {
                                reviewNum = "None" ;
                            }

                        //Get Image source url
                        var imageSrc = results.items[i].mediumImage;
                        if(typeof imageSrc === "undefined"){
                            imageSrc = "http://placehold.it/180x180";
                        }

                        //Get Customer Rating
                        var ratingVal = results.items[i].customerRating;
                         if(typeof ratingVal === "undefined"){
                            ratingVal = ""
                         }                      

                    
                    //Make outer div 
                    var containerDiv = $("<div class='col-xs-6 col-sm-4 animated zoomIn'>");
                    
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

                    divInfo.append("<p class='salePrice'> $" + results.items[i].salePrice + "</p>")                    
                    divInfo.append("<p> Reviews : " + reviewNum + "<br><span class='badge'>" + ratingVal + "</span><img src='"+ results.items[i].customerRatingImage + "' class='img-responsive starRatingImage' alt='customer ratings'></p>");  
                    
                    //Get Customer Rating
                        var ratingImage = results.items[i].customerRatingImage;
                         if(typeof ratingImage === "undefined"){
                            $(".img-responsive.starRatingImage").hide();
                         } 

                    var buttonWishList = $("<button>");
                    buttonWishList.attr("type", "submit");
                    var spanBtn = $("<i class='fa fa-heart'>");
                    spanBtn.text(" List ");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.append(spanBtn);

                    divInfo.append(buttonWishList);
                    colproductDiv.append(divInfo);

                    rowProductDiv.append(colproductDiv); 
                    divItem.append(rowProductDiv);  
                    
                    
                    containerDiv.append(divItem);
                    $('#productList').append(containerDiv);
                }
            });
            return false;
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

    





walmartAPICall = function(){
     var queryURLWalmart = "https://api.bestbuy.com/beta/products/trendingViewed?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&format=json";
        $.ajax({
                url: queryURLBB,
                method: 'GET',
                cache: true,
                crossDomain: true,
                dataType: 'jsonp'
            })
            .done(function(response) {
                var results = response;
                console.log("Results: " + JSON.stringify(results));                
            });

}