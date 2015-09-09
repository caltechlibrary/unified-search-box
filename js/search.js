/**
 * search.js - embed a unified search component for the Caltech library.
 * Inspiration was MIT Library's search (source repository: https://github.com/mitlibraries-ux/MITlibraries-parent/blob/prod/js/search.js)
 *
 * @author R. S. Doiel, <rsdoiel@caltech.edu>
 */
 (function (window, document) {
     var menuElements = {},
        unifiedSearch = document.querySelector(".unified-search") || null,
        unifiedSearchFilter = document.querySelector(".unified-search-filter") || null,
        currentElement = unifiedSearch.querySelector(".unified-search-resources li") || null,
        unifiedSearchForm = unifiedSearch.querySelector(".unified-search-box form") || null;

     function setVisibility(element, visible) {
         // If JavaScript is enabled then display the JavaScript dependent form.
         if (visible === "visible" && element.className != undefined && element.className.indexOf("hidden") > -1) {
            element.className = element.className.replace("hidden", "").trim();
         } else {
            element.className = (element.className + " hidden").trim();
         }
     }

     function selectMenuItem(label) {
         var labels = Object.keys(menuElements);
         labels.forEach(function (k,i) {
             var item = menuElements[k];
             if (item.element.className.indexOf("selected") > -1) {
                 item.element.className = item.element.className.replace("selected", "").trim();
             }
             if (k == label) {
                 item.element.className = (item.element.className + " selected").trim();
             }
         })
     }

     function selectFilterItem(element) {
        var filterAnchors = document.querySelectorAll(".unified-search-filter a"),
        i = 0;
        if (filterAnchors !== null) {
            for (i = 0; i < filterAnchors.length; i  += 1) {
                if (filterAnchors[i].className.indexOf("selected") > -1) {
                    filterAnchors[i].className = filterAnchors[i].className.replace("selected", "").trim();
                }
            }
        }
        element.className = (element.className + " selected").trim();
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
        action = "",
        label = "",
        placeholder = "",
        hidden = "",
        hidden_fields = {},
        parts = [],
        label = element.textContent.trim(),
        inputName = "",
        queryBox = document.getElementById("unified-query-box");

        selectFilterItem(element);
        evt.preventDefault();
        label = element.textContent;

        inputName = element.getAttribute("data-input-name");
        if (inputName !== null) {
            queryBox.setAttribute("name", inputName);
        }
        placeholder = element.getAttribute("data-placeholder");
        queryBox.setAttribute("placeholder", placeholder);

        action = element.getAttribute("data-action");
        if (action != null) {
            unifiedSearchForm.setAttribute("action", action);
        }
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
                // Check if the field exists, add it if needed otherwise
                // update the value
                var child = unifiedSearchForm.querySelector("input[name=" + k + "]");
                if (child == null) {
                    child = document.createElement("input");
                }
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

         evt.preventDefault();

         if (menuItem !== undefined) {
             selectMenuItem(label);
             detachChildElement(unifiedSearchFilter, "UL");
             if (menuItem.ul !== null) {
                 unifiedSearchFilter.innerHTML = "<h1>By</h1>";
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
             setVisibility(unifiedSearchFilter, "visible");
         }
     }

     function attachFilterHandlers(ul) {
        var anchors = null,
        i = 0;
        if (ul !== null) {
            anchors = ul.querySelectorAll("a");
            for (i = 0; i < anchors.length; i += 1) {
                if (anchors[i].getAttribute("data-action") || anchors[i].getAttribute("data-hidden-fields")) {
                    anchors[i].addEventListener('click', menuFilterHandler, false);
                }
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

            if (action !== "") {
                anchor.addEventListener('click', menuResourceHandler, false);
                anchor.addEventListener('focus', menuResourceHandler, false);
                ul = detachChildElement(element, "UL");
                attachFilterHandlers(ul);
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
         if (currentElement.nodeName === "LI") {
             makeMenuElement(currentElement);
         }
         currentElement = currentElement.nextSibling;
     }

     // We should be ready to go so, make the unified search box visible!
     setVisibility(unifiedSearch, "visible");
 }(window, document))
