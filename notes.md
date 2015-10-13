# user comments

The primary desire behind the MIT UL approach is the desire to have second level text associated with the menu

```
    BIG TEST STATEMENT
       little context statement
```

For each the of the menu items.  

## todo

+ build hard coded elements with ULs
+ after working, then try to bolt on 508 features possibly after roll out

## Issues

+ weird chrome bug
+ re-inventing the select box
+ EDS form is very extensive which makes my data attributes bulky
    + Final implementation my choose a different approach then data attributes


## background

# ADA/508 references

+ [Section 508](http://www.section508.gov/) - how to comply
    + [ARIA](http://a11yproject.com/posts/getting-started-aria/)
    + [skip links](http://webaim.org/techniques/skipnav/)
    + [Tink's blog](http://tink.uk/)
+ Omeka [accessibility](http://omeka.org/codex/Accessibility_Statement) statement

## WebCompents, ready for prime time?

Based on caniuse, 2015-09-19, support is ranked good to not so good

1. HTML Templates - all major browsers except IE, Edge 13 provides support
2. Custom Elements - missing current Firefox, Edge, Safari
3. HTML Imports - only Chrome, Opera and Android browser
4. Shadow DOM - only Chrome, Opera and Android browser

With the exception of HTML Templates you need to use a polyfill. Pick your poison.
On the upside after four years we now have the four major vendors beginning to agree
on the spec.

If you are willing to use a polyfill in production then you should be able to use
HTML Templates and Custom Elements. You will still need to build from a responsive
approach to support legacy systems (still too frequent even with MS depreciating older
Windows boxes).  You are also going to have to build your own accessibibility support
in some cases. Plan on investing in automated testing and future maintenance.

### Example of Web Components built by the Github crew

+ [time-element](https://github.com/github/time-elements), mentioned in some of the recent panels on the state of web components as being the lone example in the "wild"
+ [include-fragment](https://github.com/github/include-fragment-element), an example of wrapping with non-custom elements.

Other mentions&#8230;

+[async-form-element](https://github.com/josh/async-form-element), adds support for form submission over XHR

### Some Github elements and JS

+ [fetch](https://github.com/github/fetch) - a simplified XHR replacement based on [fetch spec at whatwg.org](https://fetch.spec.whatwg.org)
    + requires promises, are you ready building with ES6 or willing to require a polyfill?

### Polyfills to use web components today

+ [x-tag](http://x-tags.org/download) - building from source is currently broken (2015-09-19) so grabbing the bundle here is convienent
+

## other resources

+ [Github trainining](https://training.github.com/kit/)

# Dependencies

+ [EDS docs](http://edswiki.ebscohost.com/Field_Codes) for Field Codes (e.g. Keyword, Title, Author, Subject)
+ [Modernizr](https://github.com/Modernizr/Modernizr)
+ [Moment](https://github.com/moment/moment)

