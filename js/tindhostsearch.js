/**
 * tindsearch.js - helper functions for a better tind/website search box integration.
 */
/*jslint brower: true */
(function (window, document) {
    'use strict';

    function tindQuoteSearch(s) {
        if (s.indexOf('"') < 0 && s.indexOf("'") < 0 && s.indexOf(':') < 0) {
            return "'" + s + "'";
        }
        return s;
    }

    function tindHostSearchGo(form) {
        var queryInput = document.getElementById('usb-query-input') || null,
            val = '';

        if (queryInput !== null) {
            val = queryInput.value;
        }

        if (val !== '') {
            val = tindQuoteSearch(val);
            queryInput.value = val;
        }
    }
    window.tindHostSearchGo = tindHostSearchGo;
}(window, document));
