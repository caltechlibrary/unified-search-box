/**
 * search.js - embed a unified search component for the CalTech library.
 * Inspiration was MIT Library's search (source repository: https://github.com/mitlibraries-ux/MITlibraries-parent/blob/prod/js/search.js)
 *
 * @author R. S. Doiel, <rsdoiel@caltech.edu>
 */
 (function (window, document) {
     var menuElements = [],
        unifiedSearch = document.querySelector(".unified-search") || null,
        unifiedSearchFilter = document.querySelector(".unified-search-filter") || null,
        currentElement = unifiedSearch.querySelector(".unified-search li") || null,
        unifiedSearchForm = unifiedSearch.querySelector(".unified-search form") || null;

     function setVisibility(element, visible) {
         // If have JavaScript enabled then display the JavaScript dependent form.
         if (visible === "visible" && element.className != undefined && element.className.indexOf("hidden") > -1) {
            element.className = element.className.replace("hidden", "").trim();
         } else if (element.className != undefined && element.className.indexOf("visible") > -1) {
            element.className = element.className.replace("visible", "").trim()
         }
         element.className += " " + visible;
     }

     // Detaches the selected node and returns the detacted node.
     function detachChildElement(element, selector) {
         var child = element.querySelector(selector);
         if (child == null) {
             return null;
         }
         return element.removeChild(child);
     }

    function menuFilterHandler(evt) {
        var element = evt.currentTarget,
        hidden = "",
        hidden_fields = {},
        parts = [];

        //FIXME: Need to set a class on selected filter so we have a visible indicator of what was "clicked"
        console.log("DEBUG menuFilterHandler() event intercepted: " + evt.currentTarget.textContent);
        evt.preventDefault();
        hidden = element.getAttribute("data-hidden-fields");
        if (hidden != null) {
            if (hidden.indexOf("&") > -1) {
                parts = hidden.split("&");
                parts.forEach(function (item, i) {
                    var kv = item.split("=", 2);
                    hidden_fields[decodeURI(kv[0])] = decodeURI(kv[1]);
                });
            } else {
                parts = hidden.split("=", 2);
                hidden_fields[decodeURI(parts[0])] = decodeURI(parts[1]);
            }
            // Add the fields to the existing search form.
            Object.keys(hidden_fields).forEach(function (k, i) {
                var child = document.createElement("input");
                child.setAttribute("type", "hidden");
                child.setAttribute("name", k);
                child.setAttribute("value", hidden_fields[k]);
                unifiedSearchForm.appendChild(child);
            });
        }
    }

     function menuResourceHandler(evt) {
         var element = evt.currentTarget,
            label = element.textContent,
            menuItem = menuElements[label],
            queryBox = document.getElementById("unified-query-box"),
            child = null;

         console.log("DEBUG event intercepted: " + evt.currentTarget.textContent);
         console.log("DEBUG menu Label: " + label.trim());
         console.log("DEBUG menu item: " + JSON.stringify(menuItem));
         console.log("DEBUG hidden fields: " + JSON.stringify(menuItem.hidden_fields));
         console.log("DEBUG hidden field count: " + Object.keys(menuItem.hidden_fields).length)

         if (menuItem !== undefined) {
             console.log("DEBUG trying to set unifiedSearchFilter visible.");
             detachChildElement(unifiedSearchFilter, "UL");
             if (menuItem.ul !== null) {
                 unifiedSearchFilter.appendChild(menuItem.ul);
             }
             // Update Action and method
             unifiedSearchForm.setAttribute("action", menuItem.action);
             unifiedSearchForm.setAttribute("method", menuItem.method);
             // Remove any stale hidden fields
             do {
                 child = detachChildElement(unifiedSearchForm, "input[type=hidden]");
             }  while (child != null);
             // Add any additional hidden fields needed
             Object.keys(menuItem.hidden_fields).forEach(function(field, i) {
                 var child = document.createElement("input");
                 child.setAttribute("type", "hidden");
                 child.setAttribute("name", field);
                 child.setAttribute("value", menuItem.hidden_fields[field]);
                 unifiedSearchForm.appendChild(child);
             })

             queryBox.setAttribute("name", menuItem.inputName)
             queryBox.setAttribute("placeholder", menuItem.placeholder);
             console.log("DEBUG form", unifiedSearchForm.action, unifiedSearchForm.method)
             setVisibility(unifiedSearchFilter, "visible");
         }
         evt.preventDefault();
     }

     function attachFilterHandlers(ul) {
         var anchors = null,
            i = 0;
        if (ul !== null) {
            anchors = ul.querySelectorAll("a");
            for (i = 0; i < anchors.length; i += 1) {
                console.log("DEBUG attaching listener to " + anchors[i].textContent);
                anchors[i].addEventListener('click', menuFilterHandler, false);
            }
        }
     }

     function makeMenuElement(element) {
         var anchor = element.querySelector("A"),
            label = "",
            method = "GET",
            action = "",
            placeholder = "",
            inputName = "",
            ul = null,
            parts = [],
            hidden_fields = {},
            hidden = "",
            k = "",
            v = "";

        if (anchor !== null) {
            label = anchor.textContent || "";
            method = anchor.getAttribute("data-method") || "GET";
            action = anchor.getAttribute("data-action") || "";
            placeholder = anchor.getAttribute("data-placeholder") || "";
            inputName = anchor.getAttribute("data-input-name") || "";
            hidden = anchor.getAttribute("data-hidden-fields") || "";
            console.log("DEBUG element: " + element.nodeName);
            console.log("DEBUG label type: " + typeof label);
            console.log("DEBUG attach handler: " + label);
            console.log("DEBUG anchor.outerHTML: " + anchor.outerHTML);
            console.log("DEBUG action: " + action);
            console.log("DEBUG method: " + method);
            if (action !== "") {
                anchor.addEventListener('click', menuResourceHandler, false);
                ul = detachChildElement(element, "UL");
                attachFilterHandlers(ul);
                console.log("DEBUG after detacted --> element.innerHTML: " + element.innerHTML);
                if (hidden.trim() !== "") {
                    if (hidden.indexOf("&") > -1) {
                        parts = hidden.split("&");
                        parts.forEach(function (item, i) {
                            var kv = item.split("="),
                                k = decodeURI(kv[0]),
                                v = decodeURI(kv[1]);
                            if (k != inputName) {
                                hidden_fields[k] = v;
                            }
                        });
                    } else if (hidden.indexOf("&") > -1) {
                        parts = hidden.split("=");
                        k = decodeURI(parts[0]);
                        v = decodeURI(parts[1]);
                        hidden_fields[k] = v;
                    }
                }
                console.log("DEBUG hidden_fields from URL: " + JSON.stringify(hidden_fields));
            }
            menuElements[label] = {
                 label: label,
                 element: element,
                 method: method,
                 action: action,
                 hidden_fields: hidden_fields,
                 inputName: inputName,
                 placeholder:placeholder,
                 ul: ul
            };
            console.log("DEBUG", JSON.stringify(menuElements[label], null, "\t"));
        }
     }


     //
     // Main processing for unified search box
     //

     // Validate box structure as one we know how to work with.
     //FIXME: Need to implement some sort of validation so that box can be managed via HTML only.

     // Make the search stuff hidden while we're building the new page functionality.
     setVisibility(unifiedSearch, "hidden");
     // Build a menu list and re-arrange things.
     while (currentElement != null) {
         console.log("DEBUG currentElement: " + currentElement.nodeName + ", " + currentElement.textContent);
         if (currentElement.nodeName === "LI") {
             makeMenuElement(currentElement);
         }
         currentElement = currentElement.nextSibling;
     }

     // We should be ready to go so, make the unified search box visible!
     setVisibility(unifiedSearch, "visible");
 }(window, document))
