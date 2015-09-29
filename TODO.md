

This should probably go in a basecamp project but I don’t have rights to create one. So here’s my current general list of things to be dealt with

## Invenio related

1. Course Reserves/Instructor: I am getting index missing errors when I specify the f=instructor
2. Library Catalog/Call Number: I need to find out the right value of “f” in the URL parameters
3. Library Catalog/Keyword: Using f=keyword returns an index missing error, what is the value for "f"?

## UI behavior issues (JS)

+ Resource menu should not be open by default but the focus should be on the element to open that menu.
+ Tabbing seems to disappear if you click some place else on the page, also tab order when you have a menu box open is not obvious (e.g. Should you be able to tab down the links in the menu or should tab take you to the next top level menu)
+ ARIA is not implemented yet
+ I need to implement the non-JavaScript version of the search box

## UI visual issues (CSS)

+ I am not really happy with the up/down triangles for our select boxes
+ I am not really happy with the magnifying glass for the search submit button


