/**
 * usb.js - Unified Search Box behaviors.
 */
/*jslint browser: true */
(function (doc) {
    "use strict";
    var resources = doc.getElementById("usb-search-resources"),
        resourcesSelectButton = resources.querySelector(".usb-menu-select-button"),
        resourcesMenuItems = resources.querySelectorAll(".usb-menu-item-primary a"),
        filtersContainer = doc.getElementById("usb-search-filters"),
        filters = doc.getElementById("usb-filter"),
        filtersUL = doc.getElementById("usb-filter-ul"),
        filtersSelectButton = filters.querySelector(".usb-menu-select-button"),
        filtersMenuItems = filters.querySelectorAll(".usb-menu-item-primary a"),
        searchQueryForm = doc.getElementById("usb-query-form"),
        searchQueryInput = doc.getElementById("usb-query-input"),
        resourceId = "eds",
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
        searchWidget = {
            "eds": {
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
                        {id: "ebscohostkeywords", name: "ebscohostkeywords", type: "hidden", value: "", placeholder: "Search Articles, Books, etc."},
                        {id: "ebscohostsearchtext", name: "ebscohostsearchtext,", type: "text", size: 23}
                    ]
                }
            },
            "tind": {
                filter: [
                    {label: "Title", input: [
                        {name: "f", value: "title", "type": "hidden"}
                    ]},
                    {label: "Author", input: [
                        {name: "f", value: "author", "type": "hidden"}
                    ]},
                    {label: "Subject", input: [
                        {name: "f", value: "subject", "type": "hidden"}
                    ]},
                    {label: "Keyword", input: [
                        {name: "f", value: "keyword", "type": "hidden"}
                    ]},
                    {label: "ISBN", input: [
                        {name: "f", value: "isbn", "type": "hidden"}
                    ]},
                    {label: "Journal", input: [
                        {name: "f", value: "journal", "type": "hidden"}
                    ]},
                    {label: "Abstract", input: [
                        {name: "f", value: "abstract", "type": "hidden"}
                    ]},
                    {label: "ISSN", input: [
                        {name: "f", value: "issn", "type": "hidden"}
                    ]}
                ],
                form: {
                    method: "GET",
                    action: "http://caltech.tind.io/search",
                    input: [
                        {name: "q", value: "", placeholder: "Search library catalog", "type": "search", size: 23}
                    ]
                }
            },
            "sfx": {
                filter: [{label: 'eJournal Titles', input: []}],
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
                    {label: "Course", input: [
                        {name: "f", value: "coursereserves", "type": "hidden"}
                    ]},
                    {label: "Instructor", input: [
                        {name: "f", value: "instructors", "type": "hidden"}
                    ]}
                ],
                form: {
                    method: "GET",
                    action: "",
                    input: [
                        {name: "c", value: "Course Reserves", "type": "hidden"},
                        {name: "q", value: "", placeholder: "Search Course Reserves", "type": "search", size: 64}
                    ]
                }
            },
            "coda": {
                filter: [],
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
                filter: [],
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
                filter: [],
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
                filter: [],
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
            elem.className = (currentClasses + " " + className).trim();
        }
    }

    function removeClass(elem, className) {
        var currentClasses = elem.className || "";
        if (currentClasses.indexOf(className) !== -1) {
            elem.className = currentClasses.replace(className, "").replace("  ", " ");
        }
    }

    function hideFilters(state) {
        if (state === true) {
            addClass(filtersContainer, "hide");
        } else {
            removeClass(filtersContainer, "hide");
        }
    }

    function getParentOfTagName(elem, tagName) {
        // Walk up to the parent of the UL.
        var cur = elem, prev = null;
        while (cur !== null) {
            console.log("DEBUG walking? " + cur.tagName);
            prev = cur;
            cur = prev.parentNode;
            if (prev.tagName === tagName) {
                break;
            }
        }
        return cur;
    }

    function toggleMenu(element) {
        var ul = element.getElementsByTagName('ul').item(0);

        if (ul.getAttribute('style') === "display:inline-block;") {
            ul.setAttribute('style', 'display:none;');
        } else {
            ul.setAttribute('style', 'display:inline-block;');
        }
    }

    /**
     * menuEventHandler - toggles the menu visibility as necessary
     * @param ev - the event trigger.
     */
    function menuEventHandler(ev) {
        var elem = ev.target;
        // we don't use getParentOfTagName() here since we're already in a set of nested divs here.
        if (elem !== null) {
            switch (elem.tagName.toLowerCase()) {
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

    /**
     * clearQueryForm - reset the form with id equal usb-query-form to an
     * empty form withput any input elements.
     * @param form the element with id equal to usb-query-form
     */
    function clearQueryForm(form) {
        var inputs = form.querySelectorAll("input"),
            i = 0;
        for (i = 0; i < inputs.length; i += 1) {
            if (inputs[i].id === undefined || inputs[i].id !== 'usb-query-input') {
                form.removeChild(inputs[i]);
            }
        }
    }

    /**
     * clearFilterMenu() - remove any li, spans and anchors in the UL list as well
     * as any listeners.
     * @param ul - the ul element containg the li, spans and anchors to be cleared.
     */
    function clearFilterMenu(ul, eventListener) {
        var anchors = ul.querySelectorAll("a") || [],
            li = ul.querySelectorAll("li") || [],
            i = 0;

        for (i = 0; i < anchors.length; i += 1) {
            anchors[i].removeEventListener("click", eventListener);
        }
        for (i = 0; i < li.length; i += 1) {
            ul.removeChild(li[i]);
        }
    }


    /**
     * updateFilterMenu - updates the filter menu based on what resource was selected.
     * @param searchWidget data structure describing the relationship from resource to filters and input form
     * @param ul the ul element which will contain an filters for the resource
     * @param form the form element with id equal udb-query-form
     * @param resourceId a string to use to locate the resource in searchWidget data structure.
     * @param eventListener the event listener needs to be removed before removing the child to avoid memory leaks.
     */
    function updateFilterMenu(searchWidget, ul, form, resourceId, eventListener) {
        var resource = searchWidget[resourceId] || null,
            filterMenuSelected = doc.getElementById('usb-filter-menu-selected') || null,
            liTemplate = '<span class="usb-menu-item-primary"><a href="#">{{label}}</a></span>';

        console.log("DEBUG updateFilterMenu not implemented. ", resourceId, resource);
        clearFilterMenu(ul, eventListener);
        //FIXME: Update the filter UL list
        if (resource.filter === undefined || resource.filter.length === 0) {
            hideFilters(true);
        } else {
            hideFilters(false);
            resource.filter.forEach(function (obj, i) {
                var li = doc.createElement("li"),
                    a = null;
                li.innerHTML = liTemplate.replace("{{label}}", obj.label);
                if (i === 0) {
                    li.className = "usb-menu-item-selected";
                    if (filterMenuSelected !== null) {
                        filterMenuSelected.textContent = obj.label;
                    }
                }
                a = li.querySelector("a");
                //FIXME: Add new listeners UL
                if (a !== null) {
                    //FIXME: Adjust query form if necessary
                    //FIXME: The event listener will need to add/update input fields to the form when selected.
                    a.addEventListener("click", eventListener);
                }
                ul.appendChild(li);
            });
        }
        console.log("DEBUG ul after update: ", ul.innerHTML);
    }

    /**
     * updateQueryForm - setup the input fields (including hidden ones) based
     * on the resource picked. It should remove any previously used input elements
     * as well as any listeners attached before adding the new input elements needed.
     * @param searchWidget data structure describing the relationship from resource to filters and input form
     * @param form the form element with the id of usb-query-form
     * @param resourceId a string to use to locate the resource in searchWidget data structure.
     * @param addFilterInputs - if true add the filster inputs
     */
    function updateQueryForm(searchWidget, form, resourceId) {
        console.log("DEBUG updateQueryForm not implemented.");
        clearQueryForm(form);
    }

    /**
     * addMenuItemListener() - add a handler listing for eventName
     * @param elem - the menu item element
     * @param eventName - the string name of the event to listen for (e.g. click)
     * @param listerner the event handler for that event.
     * @param useCapture - pass through the useCapture flag for attached listener.
     */
    function addMenuItemListener(elem, eventName, listener, useCapture) {
        elem.addEventListener(eventName, listener, useCapture);
    }

    /**
     * filtersEventHandler() - handle menu item level events. Rerender the
     * unified search box as appropriate.
     * @param ev the event the resource menu is listening for.
     */
    function filtersEventHandler(ev) {
        var elem = ev.target,
            cur = getParentOfTagName(elem, "UL"),
            menuSelected = cur.querySelector(".usb-menu-selected"),
            previouslySelected = cur.querySelector(".usb-menu-item-selected");

        if (previouslySelected !== null) {
            removeClass(previouslySelected, "usb-menu-item-selected");
        }
        addClass(elem.parentNode.parentNode, "usb-menu-item-selected");
        menuSelected.textContent = elem.textContent;
        console.log("DEBUG elem.id, elem.tagName, elem.textContent? " + elem.id + ": " + elem.tagName + " -> " + elem.textContent);
        console.log("DEBUG menuSelected.id, menuSelected.tagName, menuSelected.textContent? " + menuSelected.id + ": " + menuSelected.tagName + " -> " + menuSelected.textContent);

        //FIXME: add or update hidden fields in the form the form with the selected item.
        searchQueryInput.focus();
        toggleMenu(cur);
    }


    /**
     * resourcesEventHandler() - handle menu item level events. Rerender the
     * unified search box as appropriate.
     * @param ev the event the resource menu is listening for.
     */
    function resourcesEventHandler(ev) {
        var elem = ev.target,
            cur = getParentOfTagName(elem, "UL"),
            menuSelected = cur.querySelector(".usb-menu-selected"),
            previouslySelected = cur.querySelector(".usb-menu-item-selected");

        if (previouslySelected !== null) {
            removeClass(previouslySelected, "usb-menu-item-selected");
        }
        console.log("DEBUG elem.parentNode.tagName --> " + elem.parentNode.parentNode.tagName);
        addClass(elem.parentNode.parentNode, "usb-menu-item-selected");
        menuSelected.textContent = elem.textContent;
        console.log("DEBUG elem.tagName, elem.textContent? " + elem.tagName + " -> " + elem.textContent);

        resourceId = elem.id;
        updateQueryForm(searchWidget, searchQueryForm, resourceId);
        updateFilterMenu(searchWidget, filtersUL, searchQueryForm, resourceId, filtersEventHandler);
        filtersSelectButton.focus();
        toggleMenu(cur);
    }


    /**
     * init() - initialize and start our unified search box
     */
    function init() {
        var i = 0;
        /* Add mouse handling to menu */
        resourcesSelectButton.addEventListener("click", menuEventHandler, false);
        for (i = 0; i < resourcesMenuItems.length; i += 1) {
            addMenuItemListener(resourcesMenuItems[i], "click", resourcesEventHandler, false);
        }

        filtersSelectButton.addEventListener("click", menuEventHandler, false);
        for (i = 0; i < filtersMenuItems.length; i += 1) {
            addMenuItemListener(filtersMenuItems[i], "click", filtersEventHandler, false);
        }

        /* Add keyboard tab handling to menu */
        resourcesSelectButton.addEventListener("focus", menuEventHandler, false);
        filtersSelectButton.addEventListener("focus", menuEventHandler, false);

        /* Set the initial focus, filter and query form */
        updateQueryForm(searchWidget, searchQueryForm, resourceId);
        updateFilterMenu(searchWidget, filtersUL, searchQueryForm, resourceId);
        toggleMenu(resources);
        resourcesSelectButton.focus();
    }


    /* Setup and run our unified search box */
    init();
}(document));
