/**
 * usb.js - Unified Search Box behaviors.
 */
(function (doc, win) {
    "use strict";
    var resources = doc.getElementById("usb-search-resources"),
        resourcesSelectButton = resources.querySelector(".usb-menu-select-button"),
        resourcesMenuItems = resources.querySelectorAll(".usb-menu-item-primary a"),
        filters = doc.getElementById("usb-search-filters"),
        filtersUL = doc.getElementById("usb-search-filter-ul"),
        filtersSelectButton = filters.querySelector(".usb-menu-select-button"),
        filtersMenuItems = filters.querySelectorAll(".usb-menu-item-primary a"),
        searchQueryForm = doc.getElementById("usb-query-form"),
        searchQueryInput = doc.getElementById("usb-query-input"),
        i = 0;

    /**
     * model the search engines options and form implementations
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
    var resourceId = "eds",
        searchWidget = {
            "eds": {
                filter: [{label: "Articles, Books, etc.", input:[]}],
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
                        {id: "ebscohostkeywords", name: "ebscohostkeywords", type: "hidden", value: "", placeholder: "Search Articles, Books, etc."},
                        {id: "ebscohostsearchtext", name: "ebscohostsearchtext,", type: "text", size: 23}
                    ]
                }
            },
            "tind": {
                filter: [
                    {label: "Title", input:[
                        {name:"f", value:"title", "type": "hidden"}
                    ]},
                    {label: "Author", input:[
                        {name:"f", value:"author", "type": "hidden"}
                    ]},
                    {label: "Subject", input:[
                        {name:"f", value:"subject", "type": "hidden"}
                    ]},
                    {label: "Keyword", input:[
                        {name:"f", value:"keyword", "type": "hidden"}
                    ]},
                    {label: "ISBN", input:[
                        {name:"f", value:"isbn", "type": "hidden"}
                    ]},
                    {label: "Journal", input:[
                        {name:"f", value:"journal", "type": "hidden"}
                    ]},
                    {label: "Abstract", input:[
                        {name:"f", value:"abstract", "type": "hidden"}
                    ]},
                    {label: "ISSN", input:[
                        {name:"f", value:"issn", "type": "hidden"}
                    ]}
                ],
                form: {
                    method: "GET",
                    action: "http://caltech.tind.io/search",
                    input: [
                        {name:"q", value: "", placeholder: "Search library catalog", "type": "search", size: 23}
                    ]
                }
            },
            "sfx": {
                filter: [{label: 'eJournal Titles', input:[]}],
                form: {
                    method: "GET",
                    action: "http://sfx.caltech.edu:8088/caltech/az",
                    input: [
                        {name: "param_perform_save", value: "searchTitle", "type": "hidden"},
                        {name: "param_pattern_value", placeholder: "Library eJournal subscriptions", "type": "search", size: 23}
                    ]
                }
            },
            "tindCourseReserves": {
                filter: [
                    {label: "Course", input:[
                        {name:"f", value:"coursereserves", "type": "hidden"}
                    ]},
                    {label: "Instructor", input:[
                        {name:"f", value:"instructors", "type": "hidden"}
                    ]}
                ],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                        {name: "c", value: "Course Reserves", "type": "hidden"},
                        {name:"q", value: "", placeholder: "Search Course Reserves", "type": "search", size: 64}
                    ]
                }
            },
            "coda": {
                filter: [{label: "Keywords, titles or authors", input:[]}],
                form: {
                    method: "GET",
                    action: "https://cse.google.com/cse/publicurl",
                    input: [
                        {name: "cx", value: "005709273917748521174:b0g6d4sxowm"},
                        {name: "ie", value: "UTF-8"},
                        {name: "q", value: "", placeholder: "Search Caltech’s Institutional Repository", "type": "search", size: 64}
                    ]
                }
            },
            "archivalImages": {
                filter:[{label: "keywords", input:[]}],
                form: {
                    method: "GET",
                    action: "http://archives-dc.library.caltech.edu/islandora/search/KEYWORD",
                    input: [
                        {name: "type", value: "dismax", "type": "hidden"},
                        {name: "q", value: "", placeholder: "Search Caltech’s Image Archives", "type": "search", size: 64}
                    ]
                }
            },
            "archivalMaterial": {
                filter:[{label: "keywords", input:[]}],
                form: {
                    method: "GET",
                    action: "http://archives-dc.library.caltech.edu/islandora/search/KEYWORD",
                    input: [
                        {name: "type", value: "dismax", "type": "hidden"},
                        {name: "q", value: "", placeholder: "Search Caltech’s Image Archives", "type": "search", size: 64}
                    ]
                }
            },
            "website": {
                filter: [{label: "keywords, terms or phrases"}],
                form: {
                    method: "GET",
                    action: "http://google.com/cse",
                    input: [
                        {type: "hidden", name: "cx", value: "005709273917748521174:po9fevg5ksw"},
                        {type: "hidden", name: "ie", value: "UTF-8"},
                        {type: "text", name: "q", maxlength: "255", value: "", placeholder: "Search library website"}
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

      if (cur.id && cur.id === "usb-search-resources") {
          // Do we have a filter list? or do we go straight to query form?
          // Find filters select button.
          resourceId = elem.id;
          updateQueryForm(searchWidget, searchQueryForm, resourceId);
          updateFilterMenu(searchWidget, filtersUL, searchQueryForm, resourceId);
          filtersSelectButton.focus();
      } else {
          updateQueryForm(searchWidget, resourceId);
          searchQueryInput.focus();
      }
      toggleMenu(cur);
    }

    function clearQueryForm(form) {
        console.log("DEBUG clearQueryForm not implemented.");
        //FIXME: remove all inputs from query form
        //FIXME: reset the actions and other form attributes
    }

    function updateFilterMenu(widget, ul, form, resourceId) {
        console.log("DEBUG updateFilterMenu not implemented.");
        //FIXME: remove any listeners on the filter list.
        //FIXME: Update the filter UL list
        //FIXME: Add new listeners UL
        //FIXME: Adjust query form if necessary
    }

    function updateQueryForm(widget, form, resourceId) {
        console.log("DEBUG updateQueryForm not implemented.");
        clearQueryForm(form);
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

    /* Set the initial focus, filter and query form */
    updateQueryForm(searchWidget, searchQueryForm, resourceId);
    updateFilterMenu(searchWidget, filtersUL, searchQueryForm, resourceId);
    toggleMenu(resources);
    resourcesSelectButton.focus();
}(document, window));
