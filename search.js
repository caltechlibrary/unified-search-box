/**
 * search.js - embed a simple component for creating a unified search box for the CalTech library.
 * It was inspired by MIT Library's search.js (source repository: https://github.com/mitlibraries-ux/MITlibraries-parent/blob/prod/js/search.js)
 *
 * @author R. S. Doiel, <rsdoiel@caltech.edu>
 */
 (function (window, document) {
     var menuElements = [],
        unifiedSearch = document.querySelector(".unified-search") || null,
        unifiedSearchFilter = document.querySelector(".unified-search-filter"),
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
     function detachSelected(element, selector) {
         var child = element.querySelector(selector);
         if (child == null) {
             return null;
         }
         return element.removeChild(child);
     }

     // Extract a label name based on the first #text node in element.
     function getIthText(element, i) {
         if (i == undefined) {
             i = 0
         }
         if (element.textContent) {
             return element.textContent.split("\n")[i].trim();
         }
         return "";
     }

     function menuHandler(evt) {
         var element = evt.currentTarget,
            label = getIthText(element, 0),
            menuItem = menuElements[label],
            queryBox = document.getElementById("unified-query-box");

         console.log("DEBUG event intercepted: " + evt.currentTarget.textContent);
         console.log("DEBUG menu Label: " + label.trim());
         console.log("DEBUG menu item: " + JSON.stringify(menuItem));

         if (menuItem !== undefined) {
             console.log("DEBUG trying to set unifiedSearchFilter visible.");
             unifiedSearchFilter.innerHTML = "";
             if (menuItem.ul !== null) {
                 unifiedSearchFilter.innerHTML = "<ul>" + menuItem.ul.innerHTML + "</ul>";
             }
             unifiedSearchForm.setAttribute("action", menuItem.action);
             unifiedSearchForm.setAttribute("method", menuItem.method);
             queryBox.setAttribute("name", menuItem.inputName)
             queryBox.setAttribute("placeholder", menuItem.placeholder);
             console.log("DEBUG form", unifiedSearchForm.action, unifiedSearchForm.method)
             setVisibility(unifiedSearchFilter, "visible");
         }
         evt.preventDefault();
     }

     function makeMenuElement(element) {
         var label = //element.querySelector("label").textContent ||
                getIthText(element, 0) || "",
            method = element.getAttribute("data-method") || "",
            action = element.getAttribute("data-action") || "",
            placeholder = element.getAttribute("data-placeholder") || "",
            inputName = element.getAttribute("data-input-name") || "",
            ul = element.querySelector("UL");

        console.log("DEBUG we need to attach an event handler to " + label);
        console.log("DEBUG label type: " + typeof label)
        element.addEventListener('click', menuHandler, false);
        ul = detachSelected(element, "UL");

        menuElements[label] = {
             label: label,
             element: element,
             method: method,
             action: action,
             inputName: inputName,
             placeholder:placeholder,
             ul: ul
        };
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
