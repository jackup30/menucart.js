/**
 * Initializes the document ready function to handle various UI interactions and cart operations.
 * 
 * @file /Users/otonielvillarreal/*
 * @requires jQuery
 * 
 * @function
 * @name jQuery(document).ready
 * 
 * @param {Object} $ - jQuery object
 * 
 * @description
 * This function sets up event listeners and handlers for various UI elements and cart operations.
 * It includes functionality for scrolling, adding/removing items from the cart, displaying the cart panel,
 * and updating the cart's contents and total price.
 * 
 * @example
 * jQuery(document).ready(function($) {
 *     // Your code here
 * });
 * 
 * @event click - Handles click events for various buttons and elements.
 * @event scroll - Handles scroll events for the window.
 * 
 * @property {Array} localValue - Array to store the locales with the quantity of their products.
 * @property {number} priceGlob - Global variable to store the total price of the cart.
 * @property {string} localext - Text content of elements with class 'pr'.
 * 
 * @function round - Rounds a number to a specified number of decimal places.
 * @param {number} value - The number to be rounded.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} - The rounded number.
 * 
 * @function Array.prototype.unique - Returns a new array with unique elements.
 * @returns {Array} - Array with unique elements.
 * 
 * @namespace add_cart - Object to handle cart operations.
 * @property {Array} Lpv - Array to store Lpv values.
 * @property {Array} articulos - Array to store cart items.
 * @property {Array} cantArti - Array to store quantities of cart items.
 * @property {Array} cantArti2 - Array to store additional quantities of cart items.
 * @property {Array} locals - Array to store local values.
 * 
 * @function add_cart.checkD - Checks and loads cart data from localStorage.
 * 
 * @function add_cart.extract - Extracts and updates cart item details.
 * @param {string} name - Name of the product.
 * @param {string} price - Price of the product.
 * @param {string} img - Image URL of the product.
 * @param {string} local - Local value of the product.
 * @param {string} id_prod - ID of the product.
 * @param {number} cant - Quantity of the product.
 * @param {string} pv - PV value of the product.
 * 
 * @function add_cart.verify - Verifies and updates the cart items.
 * @param {Array} array - Array of cart items.
 * 
 * @function add_cart.print - Prints the cart items to the UI.
 * @param {Array} array - Array of cart items.
 * 
 * @function add_cart.calc - Calculates the total price of the cart.
 * @param {Array} array - Array of cart items.
 * 
 * @function isPositive - Checks if a value is a positive integer.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a positive integer, false otherwise.
 * 
 * @function regIsNumber - Checks if a value is a positive integer.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a positive integer, false otherwise.
 * 
 * @property {number} qt - Quantity tracker.
 * 
 * @event click - Handles click events for various buttons and elements.
 * 
 * @example
 * $('.rest-cart').click(function() {
 *     // Your code here
 * });
 * 
 * @example
 * $(".button-addtocart").click(function() {
 *     // Your code here
 * });
 * 
 * @example
 * $(".paid").click(function(event) {
 *     // Your code here
 * });
 */
jQuery(document).ready(function($) {
    /**variables para realizar la eliminación del título de un mercado en el carrito de compras
       cuando los artículos en ese local es 0.
       ----------------------21-9-2016---------------------------------


    **/

    var localValue = []; //<------------array que contendrá los locales con la cantidad de sus productos

    //---------------------------------

    var priceGlob = 0;
    var localext = $(".pr").text();

    $('.ir-arriba').click(function() {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.ir-arriba').slideDown(300);
        } else {
            $('.ir-arriba').slideUp(300);
        }
    });


    $('body').on('click', '.mplus', function() { //<------------------botón interno del carrito que le suma un producto
        var n = $(this).attr("id"),
            cant1 = "#artCar_cantidad" + n,
            produ = "#product" + n;
        var cant = parseInt($(cant1).text());
        cant += 1;
        $(cant1).text(cant);

        var pv = "#pv" + n,
            dp = "#idp" + n,
            nam = "#product-nameCart" + n,
            prc = "#product-priceCart" + n,
            im = "#imgs" + n;
        var l = "#loc" + n,
            b = $(pv).attr("value"),
            c = $(dp).attr("value");
        /**
         * @type {string}
         * @description The HTML content of the element referenced by the variable `nam`.
         */
        var namF = $(nam).html(),
            imF = $(im).attr("src"),
            lo = $(l).attr("value"),
            prcF = $(prc).html(),
            incar = "#qtyincar" + c;
        var id_input = "#prodinp" + c;

        $(id_input).text(cant);
        add_cart.extract(namF, prcF, imF, lo, c, cant, b);
    });

    $('body').on('click', '.mminus', function() {
        var n = $(this).attr("id"),
            cant1 = "#artCar_cantidad" + n,
            produ = "#product" + n;
        var cant = parseInt($(cant1).text());
        if (cant > 0) {
            cant -= 1;
            $(cant1).text(cant);

            var pv = "#pv" + n,
                dp = "#idp" + n,
                nam = "#product-nameCart" + n,
                prc = "#product-priceCart" + n,
                im = "#imgs" + n;
            var l = "#loc" + n,
                b = $(pv).attr("value"),
                c = $(dp).attr("value");
            var namF = $(nam).html(),
                imF = $(im).attr("src"),
                lo = $(l).attr("value"),
                prcF = $(prc).html(),
                incar = "#qtyincar" + c;
            var id_input = "#prodinp" + c;

            if (cant == 0) {
                $(produ).remove();
            }
            $(id_input).text(cant);
            add_cart.extract(namF, prcF, imF, lo, c, cant, b);
        }
    });
    $('#shop').on('click', function(event) {
        event.preventDefault();
        $('.cd-panel').addClass('is-visible');
        $('.menusidebar').show();
    });
    $('#shop2').on('click', function(event) {
        event.preventDefault();
        $('.cd-panel').addClass('is-visible');
        $('.menusidebar').show();
    });

    // Close the lateral panel when clicking outside of it
    $('.cd-panel').on('click', function(event) {
        if ($(event.target).is('.cd-panel')) {
            $('.cd-panel').removeClass('is-visible');
            event.preventDefault();
        }
    });

    // Close the panel when clicking the close icon
    $('.closing').on('click', function(event) {
        event.preventDefault();
        $('.cd-panel').removeClass('is-visible');
    });


    function round(value, decimals) { 
        // Ensure the value is a number and decimals is a positive integer
        if (typeof value !== 'number' || typeof decimals !== 'number' || decimals < 0) {
            throw new Error('Invalid input');
        }
        // Use toFixed to round the number to the specified decimals
        return Number(value.toFixed(decimals));
    }

    Array.prototype.unique = function() {
        return [...new Set(this)];
    };

    var add_cart = {
        Lpv: [],
        articulos: [],
        cantArti: [],
        cantArti2: [],
        locals: [],
        checkD: function() {
            var that = this;
            if (localStorage.getItem("arty") != null) {
                that.cantArti = JSON.parse(localStorage.getItem("arty"));
                that.cantArti.forEach(function(item, i) {
                    $.ajax({
                        data: {
                            "id": item.id,
                            "pv": item.pv,
                            "cant": item.cant
                        },
                        url: 'http://localhost/mandaoLocal/includes/reqimpcar.php',
                        type: 'post',
                        dataType: 'json',
                        success: function(response) {
                            var id = response.id_pr;
                            var prodinp = "#prodinp" + id;
                            if (response.cant > 0) {
                                $(prodinp).parent(".qtyincar").show();
                                $(prodinp).text(response.cant);
                            }
                            add_cart.extract(response.title, response.price, response.img, response.local, response.id_pr, response.cant, response.prove);
                        },
                        error: function(xhr, status, error) {
                            console.error("AJAX Error: ", status, error);
                        }
                    });
                });
            }
        },
        extract: function(name, price, img, local, id_prod, cant, pv) {
            var that = this;
            var existingProduct = that.articulos.find(function(item) {
                return item.id === id_prod;
            });

            if (existingProduct) {
                existingProduct.cant = cant;
            } else {
                that.articulos.push({
                    "local": local,
                    "name": name,
                    "price": price,
                    "img": img,
                    "cant": cant,
                    "id": id_prod,
                    "pv": pv
                });
                that.locals.push(local);
            }

            add_cart.verify(that.articulos);
        },
        verify: function(array) {
            var that = this;
            var uniqueProducts = [];
            var productMap = {};

            array.forEach(function(item) {
                if (productMap[item.id]) {
                    productMap[item.id].cant = item.cant;
                } else {
                    productMap[item.id] = item;
                    uniqueProducts.push(item);
                }
            });

            that.cantArti = uniqueProducts.map(function(item) {
                return {
                    "id": item.id,
                    "cant": item.cant,
                    "pv": item.pv
                };
            });

            add_cart.print(uniqueProducts);
            localStorage.setItem("arty", JSON.stringify(that.cantArti));
        },
        print: function(array) {
            var that = this;
            that.locals = that.locals.unique();

            that.locals.forEach(function(local, h) {
                var idL = local.replace(/\s|&/g, "_");
                var idLoc = "#idLoc" + idL;

                if ($(idLoc).length == 0) {
                    $(".panel-cart").append(
                        `<div class='panel-group' id='${idL}'>
                            <div class='panel panel-default'>
                                <div class='panel-heading'>
                                    <h4 class='panel-title'>
                                        <a data-toggle='collapse' href='#collapse${h}'>${local}</a>
                                    </h4>
                                </div>
                                <div id='collapse${h}' class='panel-collapse collapse in'>
                                    <div id='idLoc${idL}'></div>
                                    <button class='center-block'></button>
                                </div>
                            </div>
                        </div>`
                    );
                }

                array.forEach(function(item, i) {
                    if (item.local === local) {
                        var product = "#product-nameCart" + i;
                        var canti = "#artCar_cantidad" + i;
                        var price = "#product-priceCart" + i;
                        var btn = "#product" + i;

                        if ($(product).length == 0) {
                            $(idLoc).append(
                                `<div id='product${i}' class='col-md-12 col-sm-12 col-xs-12 ctntcart'>
                                    <div class='imgCart col-md-2 col-sm-2 col-xs-2'>
                                        <img id='imgs${i}' class='imgCart center-block img-responsive' src='${item.img}'>
                                    </div>
                                    <div class='product-nameCart col-md-6 col-sm-6 col-xs-6' id='product-nameCart${i}'>${item.name}</div>
                                    <div class='col-md-2 col-xs-2 col-sm-2'>
                                        <span class='mplus' id='${i}'><i class='btn btn-default fa fa-plus-circle' aria-hidden='true'></i></span>
                                        <span class='cantInCar' id='artCar_cantidad${i}'></span>
                                        <span class='mminus' id='${i}'><i class='btn btn-default fa fa-minus-circle' aria-hidden='true'></i></span>
                                    </div>
                                    <div class='product-priceCart col-md-2 col-sm-2 col-xs-2' id='product-priceCart${i}'>${item.price}</div>
                                    <input type='hidden' id='pv${i}' name='pv' value='${item.pv}'>
                                    <input type='hidden' id='loc${i}' name='loc' value='${item.local}'>
                                    <input type='hidden' id='idp${i}' name='idp' value='${item.id}'>
                                </div>`
                            );
                        }

                        $(canti).html(item.cant);

                        if (item.cant == 0) {
                            $(product).remove();
                            $(canti).remove();
                            $(price).remove();
                            $(btn).remove();
                        }
                    }
                });
            });

            add_cart.calc(array);
        },
        calc: function(array) {
            var priceT = 0;
            array.forEach(function(item) {
                var canti = parseInt(item.cant);
                var priceExt = parseFloat(item.price.substring(1)) * canti;
                priceT += priceExt;
            });

            var priceTF = round(priceT, 2).toFixed(2);
            priceGlob = priceTF;

            if (priceT == 0) {
                $(".numberTotal").text(priceT);
                $(".shopC").show();
            } else {
                $(".shopC").hide();
                $("#pluscart").show().text(priceTF);
                $(".numberTotal").text(priceTF);
            }

            if (priceTF >= 10.00) {
                $(".paid").attr("href", "http://localhost/mandaoLocal/orden/pago");
                document.cookie = "loPmanda02016=new;path=/";
            } else {
                $(".paid").attr("href", "JavaScript:void(0);");
            }
        }
    };
    //add_cart.ExtCpv();
    add_cart.checkD();

    function isPositive(value) {
        // Ensure the value is a string and matches the positive integer pattern
        return typeof value === 'string' && /^\+?(0|[1-9]\d*)$/.test(value);
    }
    function regIsNumber(value) {
        return isPositive(value);
    }
    var qt = 0;

    $('.rest-cart').click(function() { // Function to decrease the values on the main page
        var id_prod = $(this).attr("id").substring(8);
        var id_input = "#prodinp" + id_prod;
        var cant = parseInt($(id_input).text());
        var pv = $(".img-div").attr("id").substring(5);
        var nameprod = "#name" + id_prod;
        var priceprod = "#price" + id_prod;
        var imgprod = "#image" + id_prod;
        var incar = "#qtyincar" + id_prod;
        var nameprodF = $(nameprod).text();
        var priceprodF = $(priceprod).text();
        var imgprodF = $(imgprod).attr("src");

        if (regIsNumber(cant) && cant > 0) {
            cant--;
            if (cant == 0) {
                $(incar).hide();
            }
            qt = Math.max(0, qt - 1);
            $(id_input).text(cant);
            add_cart.extract(nameprodF, priceprodF, imgprodF, localext, id_prod, cant, pv);
        }
    });



    $(".button-addtocart").click(function() {
        var num = $(this).attr("id");
        var pv = $(".img-div").attr("id").substring(5);
        var id_prod = num.substring(8);
        var id_input = "#prodinp" + id_prod;
        var nameprod = "#name" + id_prod;
        var priceprod = "#price" + id_prod;
        var imgprod = "#image" + id_prod;
        var incar = "#qtyincar" + id_prod;
        var nameprodF = $(nameprod).text();
        var priceprodF = $(priceprod).text();
        var imgprodF = $(imgprod).attr("src");
        var cant = parseInt($(id_input).text()) || 0;

        cant++;
        $(id_input).text(cant);
        $(incar).show();
        qt += 1;
        add_cart.extract(nameprodF, priceprodF, imgprodF, localext, id_prod, cant, pv);
    });
    $(".paid").click(function(event) {
        if (priceGlob < 10.00) {
            event.preventDefault();
            $(".alertPa").show();
        } else {
            $(".alertPa").hide();
        }
    });

});
