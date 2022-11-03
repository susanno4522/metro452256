/* Update on: 26/01/2018 11:08:47 Metrofood */
/*jslint browser: true */
/*jshint node: true */

'use strict';
window.vtexito = (function($, undefined){

    var BASE_URL = "/api/catalog_system/pub/products/search/";

    function setConfig(url){
        return {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET",
                "headers": {
                    "accept": "application/json",
                    "content-type": "application/json"
            }
        };
    }

    return {
        /*
        Obtiene productos de una coleccion
        */
        getCollectionId: function(id, from, to){
            if (!from) from = 1;
            if (!to) to = 10;
            var url = BASE_URL + "?fq=productClusterIds:" + id + "&_from=" + (from - 1) + "&_to=" + (to - 1);
            return $.ajax(setConfig(url));
        },

        /*
        Obtiene productos con un id
        */
        getProductId: function(id){
            var url = BASE_URL + "?fq=productId:" + id;
            return $.ajax(setConfig(url));
        },

        /*
        Obtiene productos de una categoría
        */
        getCategoryId: function(id, from, to){
            if (!from) from = 1;
            if (!to) to = 10;
            var url = BASE_URL + "?fq=C:" + id  + "&_from=" + (from - 1) + "&_to=" + (to - 1);
            return $.ajax(setConfig(url));
        }

    };

})(window.jQuery);
