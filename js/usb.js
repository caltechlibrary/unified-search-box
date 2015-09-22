/**
 * usb.js - Unified Search Box behaviors.
 <!--
   SEARCH TARGET | LABEL | DESCRIPTION
   --------------|-------|------------------
   EDS           | Find It | Articles, Books, etc.
   --------------|-------|------------------
   TIND          | Library Catalog | Books and Print Journals
   --------------|-------|------------------
   SFX           | Find eJournals | Library Ejournal subscriptions
   --------------|-------|------------------
   TIND          | Course Reserves |
   --------------|-------|------------------
   Google Custom Search | CODA: Caltech Collection of Digital Archives | Caltech’s Institutional Repository
   --------------|-------|------------------
   Google Custom Search | Website search | Library website and LibGuides
   --------------|-------|------------------
   Link to web page | More search tools and Help |
   --------------|-------|------------------
 -->
 */
(function (doc, win) {
    "use strict";
    var resources = doc.getElementById("usb-search-resources"),
        resourcesSelectButton = resources.querySelector(".usb-menu-select-button"),
        resourcesMenuItems = resources.querySelectorAll(".usb-menu-item-primary a"),
        filters = doc.getElementById("usb-search-filters"),
        filtersSelectButton = filters.querySelector(".usb-menu-select-button"),
        filtersMenuItems = filters.querySelectorAll(".usb-menu-item-primary a"),
        searchQueryInput = doc.getElementById("usb-query-input"),
        i = 0;

    var searchWidget = {
            eds: {
                filter: [],
                script: [{src: "http://support.ebscohost.com/eit/scripts/ebscohostsearch.js", type: "text/javascript"}],
                form: {
                    method: "GET",
                    action: "",
                    onSubmit: "return ebscoHostSearchGo(this);",
                    input: [
                        {id: "ebscohostwindow", name: "ebscohostwindow", type: "hidden", value: "0"},
                        {id: "ebscohosturl", name: "ebscohosturl", type: "hidden", value: "https://clsproxy.library.caltech.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=0&custid=s8984125&groupid=main&profid=eds&mode=bool&lang=en&authtype=ip"},
                        {id: "ebscohostsearchsrc", name: "ebscohostsearchsrc", type: "hidden", value: "db"},
                        {id: "ebscohostsearchmode", name: "ebscohostsearchmode", type: "hidden", value: "+"},
                        {id: "ebscohostkeywords", name: "ebscohostkeywords", type: "hidden", value: ""},
                        {id: "ebscohostsearchtext", name: "ebscohostsearchtext,", type: "text", size: 23}
                    ]
                }
            },
            tind: {
                filter: [
                    {label: "Title"},
                    {label: "Author"},
                    {label: "Subject"},
                    {label: "Keyword"},
                    {label: "ISBN"},
                    {label: "Journal"},
                    {label: "Abstract"},
                    {label: "ISSN"}
                ],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                    ]
                }
            },
            sfx: {
                filter: [],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                    ]
                }
            },
            courseReserves: {
                filter: [
                    {label: "Course"},
                    {label: "Instructor"}
                ],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                    ]
                }
            },
            coda: {
                filter: [],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                    ]
                }
            },
            website: {
                filter: [],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                    ]
                }
            }
        };

    function addClass(elem, className) {
        var currentClasses = elem.className || "";
        if (currentClasses.indexOf(className) === -1) {
           elem.className = (currentClasses+" "+className).trim();
        }
    }

    function removeClass(elem, className) {
        var currentClasses = elem.className || "";
        if (currentClasses.indexOf(className) !== -1) {
           elem.className = currentClasses.replace(className, "").replace("  ", " ");
        }
    }

    function getParentOfTagName(elem, tagName) {
        // Walk up to the parent of the UL.
        var cur = elem, prev = null;
        while (cur !== null) {
          console.log("DEBUG walking? "+cur.tagName);
            prev = cur;
            cur = prev.parentNode;
            if (prev.tagName === tagName) {
                break;
            }
        }
        return cur;
    }

    function menuEventHandler(evt) {
        var elem = evt.target;
        // we don't use getParentOfTagName() here since we're already in a set of nested divs here.
        if (elem !== null) {
            switch(elem.tagName.toLowerCase()) {
            case 'a':
                toggleMenu(elem.parentNode);
                break;
            case 'path':
                toggleMenu(elem.parentNode.parentNode.parentNode);
                break;
            default:
                toggleMenu(elem.parentNode.parentNode);
                break;
            }
        }
    }

    function toggleMenu(element){
        var ul = element.getElementsByTagName('ul').item(0);

        if (ul.getAttribute('style')=="display:inline-block;") {
            ul.setAttribute('style','display:none;');
        } else {
            ul.setAttribute('style','display:inline-block;');
        }
    }

    function addMenuItemListener(elem, eventName, listener, useCapture) {
      elem.addEventListener(eventName, listener, useCapture);
    }

    function menuItemEventHandler(evt) {
      var elem = evt.target;
      var cur = getParentOfTagName(elem, "UL"),
          menuSelected = cur.querySelector(".usb-menu-selected"),
          previouslySelected = cur.querySelector(".usb-menu-item-selected");

      if (previouslySelected !== null) {
          removeClass(previouslySelected, "usb-menu-item-selected");
      }
      addClass(elem, "usb-menu-item-selected");
      menuSelected.textContent = elem.textContent;
      console.log("DEBUG elem.tagName, elem.textContent? "+elem.tagName+" -> "+elem.textContent);
      //FIXME: update filter menu from resource selection.
      //FIXME: update query input form resource selection.

      if (cur.id && cur.id === "usb-search-resources") {
          // Do we have a filter list? or do we go straight to query form?
          // Find filters select button.
          filtersSelectButton.focus();
      } else {
          searchQueryInput.focus();
      }
      toggleMenu(cur);
    }

    /* Add mouse handling to menu */
    resourcesSelectButton.addEventListener("click", menuEventHandler, false);
    for (i = 0; i < resourcesMenuItems.length; i++) {
       addMenuItemListener(resourcesMenuItems[i], "click", menuItemEventHandler, false);
    }

    filtersSelectButton.addEventListener("click", menuEventHandler, false);
    for (i = 0; i < filtersMenuItems.length; i++) {
       addMenuItemListener(filtersMenuItems[i], "click", menuItemEventHandler, false);
    }

    /* Add keyboard tab handling to menu */
    resourcesSelectButton.addEventListener("focus", menuEventHandler, false);
    filtersSelectButton.addEventListener("focus", menuEventHandler, false);
}(document, window));
