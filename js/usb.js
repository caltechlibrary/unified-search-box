/**
 * usb.js - Unified Search Box behaviors.
 */
/*jslint browser: true */
(function (doc) {
    "use strict";
    var resources = doc.getElementById("usb-search-resources"),
        resourcesSelectButton = resources.querySelector(".usb-menu-select-button"),
        filtersContainer = doc.getElementById("usb-search-filters"),
        filters = doc.getElementById("usb-filter"),
        filtersSelectButton = filters.querySelector(".usb-menu-select-button"),
        searchQueryForm = doc.getElementById("usb-query-form"),
        searchQueryInput = doc.getElementById("usb-query-input"),
        searchWidget = {
/*
            "eds": {
                script: [{src: "http://support.ebscohost.com/eit/scripts/ebscohostsearch.js", type: "text/javascript"}],
                filter: [
                    {
                       label: "Keyword",
                       input: {name: "ebscohostkeywords", value: "1", "type": "hidden"}
                    },
                    {
                       label: "Title",
                       input: {name: "ebscohostkeywords", value: "", "type": "hidden"}
                    },
                    {
                       label: "Author",
                       input: {name: "ebscohostkeywords", value: "", "type": "hidden"}
                    }
                ],
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
                        {id: "ebscohostsearchtext", name: "ebscohostsearchtext", type: "text", value: "", placeholder: "Search Articles, Books, etc.", size: 64, maxlength: 128}
                    ]
                }
            },
*/
            "tind": {
                filter: [
                    {
                        label: "Title",
                        input: {name: "f", value: "title", "type": "hidden"}
                    },
                    {
                        label: "Author",
                        input: {name: "f", value: "author", "type": "hidden"}
                    },
                    {
                        label: "Subject",
                        input: {name: "f", value: "subject", "type": "hidden"}
                    },
                    {
                        label: "Keyword",
                        input: {name: "f", value: "", "type": "hidden"}
                    },
                    {
                        label: "ISBN",
                        input: {name: "f", value: "isbn", "type": "hidden"}
                    },
                    {
                        label: "ISSN",
                        input: {name: "f", value: "issn", "type": "hidden"}
                    },
                    {
                        label: "Call Number",
                        input: {name: "f", value: "callnumber", "type": "hidden"}
                    }
                ],
                form: {
                    method: "GET",
                    action: "https://caltech.tind.io/search",
                    input: [
                        {name: "ln", value: "en", "type": "hidden"},
                        {name: "c", value: "Caltech", "type": "hidden"},
                        {name: "action_search", value: "Search", "type": "hidden"},
                        {name: "p", value: "", placeholder: "Search library catalog", "type": "search", size: 64, maxlength: 128}
                    ]
                }
            },
            "sfx": {
                filter: [
                    {
                        label: "Title",
                        input: {name: "ejournaltitle", value: "", "type": "hidden"}
                    }
                ],
                form: {
                    method: "GET",
                    action: "http://sfx.caltech.edu:8088/caltech/az",
                    input: [
                        {name: "param_perform_save", value: "searchTitle", "type": "hidden"},
                        {name: "param_pattern_value", value: "", placeholder: "search by journal title", "type": "search", size: 64, maxlength: 128}
                    ]
                }
            },
            "tindCourseReserves": {
                filter: [
                    {
                        label: "Course",
                        input: {name: "f", value: "coursereserve", "type": "hidden"}
                    },
                    {
                        label: "Instructor",
                        //FIXME: I need to know the value for instructor searches. Is it instructor?
                        input: {name: "f", value: "", "type": "hidden"}
                    }
                ],
                form: {
                    method: "GET",
                    action: "https://caltech.tind.io/search",
                    input: [
                        {name: "ln", value: "en", "type": "hidden"},
                        {name: "cc", value: "Course Reserves", "type": "hidden"},
                        {name: "action_search", value: "Search", "type": "hidden"},
                        {name: "p", value: "", placeholder: "Search Course Reserves", "type": "search", size: 64, maxlength: 128}
                    ]
                }
            },
            "coda": {
                filter: [
                    {
                        label: "Keyword",
                        input: {name:"keyword", value: "", "type": "hidden"}
                    }
                ],
                form: {
                    method: "GET",
                    action: "https://cse.google.com/cse/publicurl",
                    input: [
                        {name: "cx", value: "005709273917748521174:b0g6d4sxowm", "type": "hidden"},
                        {name: "ie", value: "UTF-8", "type": "hidden"},
                        {name: "q", value: "", placeholder: "Search Caltech’s Institutional Repository", "type": "search", size: 64, maxlength: 128}
                    ]
                }
            },
/*
            "archivalImages": {
                filter: [],
                form: {
                    method: "POST",
                    action: "http://archives-dc.library.caltech.edu/",
                    input: [
                        {name: "form_build_id", value: "form-K83NaIRvMxcPkpUaVFu2yrlvZZQ6fYd3oiET4bj-ZpY", "type": "hidden"},
                        {name: "form_id", value: "islandora_solr_simple_search_form", "type": "hidden"},
                        {name: "islandora_simple_search_query", type: "text", value:"", placeholder: "Search Caltech’s Image Archives", size: 64, maxlength: 128}
                    ]
                }
            },
            "archivalMaterial": {
                filter: [],
                form: {
                    method: "GET",
                    action: "http://www.oac.cdlib.org/search",
                    input: [
                        {name: "x", value: "0", "type": "hidden"},
                        {name: "y", value: "0", "type": "hidden"},
                        {name: "institution", value: "California Institute of Technology", "type": "hidden"},
                        {name: "query", value: "", placeholder: "Search Caltech Archives", "type": "search", size: 64, maxlength: 128}
                    ]
                }
            },
*/
            "website": {
                filter: [
                    {
                        label: "Keyword",
                        input: {name: "keyword", value: "", "type": "hidden"}
                    }
                ],
                form: {
                    method: "GET",
                    action: "http://google.com/cse",
                    input: [
                        {name: "cx", value: "005709273917748521174:po9fevg5ksw", "type": "hidden"},
                        {name: "ie", value: "UTF-8", "type": "hidden"},
                        {name: "q", maxlength: "255", value: "", placeholder: "Search library website", "type": "text"}
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

    function closeMenu(ul) {
        ul.setAttribute('style', 'display:none;');
    }

    function openMenu(ul) {
        ul.setAttribute('style', 'display:inline-block;');
    }

    function toggleMenu(ul) {
        var style = ul.getAttribute('style') || "";

        if (style.indexOf("display:inline-block;") > -1) {
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
        var elem = ev.target,
            resourceUL = doc.getElementById("usb-resource-ul"),
            filterUL = doc.getElementById("usb-filter-ul");
        if (elem.id === "usb-resource-menu-selector" || elem.parentNode.id === "usb-resource-menu-selector") {
            closeMenu(filterUL);
            toggleMenu(resourceUL);
        } 
        if (elem.id === "usb-filter-menu-selector" || elem.parentNode.id === "usb-filter-menu-selector") {
            closeMenu(resourceUL);
            toggleMenu(filterUL);
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
            if (inputs[i].id == undefined || inputs[i].id !== "usb-query-input") {
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
     * @return number of filter items.
     */
    function updateFilterMenu(searchWidget, ul, form, resourceId, eventListener) {
        var resource = searchWidget[resourceId] || null,
            queryInput = doc.getElementById('usb-query-input') || null,
            filterMenuSelected = doc.getElementById('usb-filter-menu-selected') || null,
            liTemplate = '<span class="usb-menu-item-primary"><a href="#">{{label}}</a></span>';

        clearFilterMenu(ul, eventListener);
        //NOTE: Update the filter UL list
        if (resource.filter !== undefined && resource.filter.length > 0) {
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
                if (a !== null) {
                    a.addEventListener("click", eventListener);
                }
                ul.appendChild(li);
            });
            return resource.filter.length;
        }
        return 0;
    }

    /**
     * updateQueryForm - setup the input fields (including hidden ones) based
     * on the resource picked. It should remove any previously used input elements
     * as well as any listeners attached before adding the new input elements needed.
     * @param searchWidget data structure describing the relationship from resource to filters and input form
     * @param formElement the form element with the id of usb-query-form
     * @param resourceId a string to use to locate the resource in searchWidget data structure.
     * @param addFilterInputs - if true add the filster inputs
     */
    function updateQueryForm(searchWidget, formElement, resourceId) {
        var resource = searchWidget[resourceId],
            form = resource.form,
            inputs = form.input,
            i = 0,
            elem = null;

        clearQueryForm(formElement);
        formElement.setAttribute("method", form.method);
        formElement.setAttribute("action", form.action);

        for (i = 0; i < inputs.length; i += 1) {
            if (inputs[i].type === "search" || inputs[i].type === "text") {
                searchQueryInput.setAttribute("name", inputs[i].name);
                searchQueryInput.setAttribute("type", inputs[i].type);
                //FIXME: Tind will want values quoted in some cases e.g. 
                // "Ge 101" for complete course name, or 'Ge 101' for partial match course name
                searchQueryInput.setAttribute("value", inputs[i].value);
                searchQueryInput.setAttribute("placeholder", inputs[i].placeholder);
            } else {
                elem = doc.createElement("input");
                elem.setAttribute("type", inputs[i].type);
                elem.setAttribute("name", inputs[i].name);
                elem.setAttribute("value", inputs[i].value);
                searchQueryForm.appendChild(elem);
            }
        }
        if (form.onSubmit !== undefined) {
            formElement.setAttribute("onSubmit", form.onSubmit);
        } else if (formElement.hasAttribute("onSubmit") === true) {
            formElement.removeAttribute("onsubmit");
        }
    }

    /**
     * setHiddenInputField() - the hidden input element associated with filter selected
     * @param searchWidget data structure describing the relationship from resource to filters and input form
     * @param resourceId a string to use to locate the resource in searchWidget data structure.
     * @param label the string to used as a label in the fitler list object
     */
    function setHiddenInputField(searchWidget, resourceId, label) {
        var resource = searchWidget[resourceId],
            filter = resource.filter,
            i = 0,
            foundIt = false,
            elem = null;
        for (i = 0; i < filter.length && foundIt === false; i += 1) {
            if (filter[i].label === label) {
                foundIt = true;
                elem = searchQueryForm.querySelector("input[name="+filter[i].input.name+"]");
                if (elem !== null) {
                    elem.type = filter[i].input.type;
                    elem.name = filter[i].input.name;
                    elem.value = filter[i].input.value;
                } else {
                    elem = doc.createElement("input");
                    elem.setAttribute("type", filter[i].input.type);
                    elem.setAttribute("name", filter[i].input.name);
                    elem.setAttribute("value", filter[i].input.value);
                    searchQueryForm.appendChild(elem);
                }
            }
        }
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
            resourceUL = doc.getElementById("usb-resource-ul"),
            filterUL = doc.getElementById("usb-filter-ul"),
            cur = filterUL.parentNode, 
            menuSelected = cur.querySelector(".usb-menu-selected"),
            previouslySelected = cur.querySelector(".usb-menu-item-selected"),
            resources = doc.getElementById("usb-search-resources"),
            resourceSelected = resources.querySelector("li.usb-menu-item-selected") || null,
            resourceId = "",
            resourceAnchor = null;

        if (resourceSelected !== null) {
            resourceAnchor = resourceSelected.getElementsByTagName("a");
            if (resourceAnchor !== null && resourceAnchor[0].id !== undefined) {
                resourceId = resourceAnchor[0].id;
            }
        }

        if (previouslySelected !== null) {
            removeClass(previouslySelected, "usb-menu-item-selected");
        }
        addClass(elem.parentNode.parentNode, "usb-menu-item-selected");
        menuSelected.textContent = elem.textContent;
        if (resourceId !== "" ) {
            setHiddenInputField(searchWidget, resourceId, menuSelected.textContent);
        }
        closeMenu(resourceUL);
        closeMenu(filterUL);
        searchQueryInput.focus();
    }


    /**
     * resourcesEventHandler() - handle menu item level events. Rerender the
     * unified search box as appropriate.
     * @param ev the event the resource menu is listening for.
     */
    function resourcesEventHandler(ev) {
        var menuCount = 0,
            resourceId = "",
            elem = ev.target,
            filterUL = doc.getElementById("usb-filter-ul"),
            resourceUL = doc.getElementById("usb-resource-ul"),
            cur = resourceUL.parentNode,
            menuSelected = cur.querySelector(".usb-menu-selected"),
            previouslySelected = cur.querySelector(".usb-menu-item-selected"),
            filterMenuSelected = doc.getElementById("usb-filter-menu-selected") || null,
	        queryInput = doc.getElementById('usb-query-input') || null;

        if (previouslySelected !== null) {
            removeClass(previouslySelected, "usb-menu-item-selected");
        }
        addClass(elem.parentNode.parentNode, "usb-menu-item-selected");
        menuSelected.textContent = elem.textContent;

        resourceId = elem.id;
        updateQueryForm(searchWidget, searchQueryForm, resourceId);
        menuCount = updateFilterMenu(searchWidget, filterUL, searchQueryForm, resourceId, filtersEventHandler);
        if (menuCount > 0) {
            filtersSelectButton.focus();
            openMenu(filterUL);
            closeMenu(resourceUL);
        } else {
            filterMenuSelected.innerHTML = "";
            closeMenu(resourceUL);
            closeMenu(filterUL);
            queryInput.focus();
        }
    }


    /**
     * init() - initialize and start our unified search box
     */
    function init() {
        var i = 0,
            resourceId = "",
            activeResource = searchWidget[resourceId],
            queryInput = doc.getElementById("usb-query-input"),
            resourceUL = doc.getElementById("usb-resource-ul"),
            resourceMenuItems = resourceUL.querySelectorAll(".usb-menu-item-primary a"),
            filterUL = doc.getElementById("usb-filter-ul"),
            searchResources = doc.getElementById("usb-search-resources"),
            filterMenuSelected = doc.getElementById('usb-filter-menu-selected'),
            resourceMenuSelected = doc.getElementById('usb-resource-menu-selected'),
            liTemplate = '<span class="usb-menu-item-primary"><a href="#">{{label}}</a></span>';
        

        /* Add mouse handling to menu */
        resourcesSelectButton.addEventListener("click", menuEventHandler, false);
        filtersSelectButton.addEventListener("click", menuEventHandler, false);

        /* Add keyboard tab handling to menu */
        resourcesSelectButton.addEventListener("focus", menuEventHandler, false);
        filtersSelectButton.addEventListener("focus", menuEventHandler, false);

        // Add resource listeners and find correct resourceId to initialize query form an filter with.
        for (i = 0; i < resourceMenuItems.length; i += 1) {
            if (i === 0) {
                resourceId = resourceMenuItems[i].id;
                addClass(resourceMenuItems[i].parentNode.parentNode, "usb-menu-item-selected");
            }
            addMenuItemListener(resourceMenuItems[i], "click", resourcesEventHandler, false);
        }

        /* Set the initial focus and query form */
        updateQueryForm(searchWidget, searchQueryForm, resourceId);
        updateFilterMenu(searchWidget, filterUL, searchQueryForm, resourceId, filtersEventHandler);
        queryInput.focus();
    }


    /* Setup and run our unified search box */
    init();
}(document));
