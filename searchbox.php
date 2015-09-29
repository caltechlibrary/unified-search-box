<?php 
/**
 * searchbox.php - provide CSS, HTML fragment and JavaScript embed as functions returning them as strings.
 */

function joinPath($p1, $p2) {
   if ($p1 === "") {
	return $p2;
   }
   return $p1 . '/' . $p2; 
}

function searchboxCSS($basepath = "") {
    $css = file_get_contents(joinPath($basepath, 'css/usb.css'));
    //return PHP_EOL . '<link rel="stylesheet" href="/searchbox/css/usb.css">' . PHP_EOL; 
    return PHP_EOL . '<style rel="stylesheet">' . PHP_EOL . $css . PHP_EOL . '</style>' . PHP_EOL;
}

function searchboxHTML($basepath = "") {
    $src = <<<HTML

  <div id="usb-searchbox" class="usb-searchbox">
    <div class="usb-search-resources">
        <label id="usb-resource-label" class="usb-menu-label">Search</label>
        <div id="usb-search-resources" class="usb-menu">
            <div id="usb-resource-menu-selected" class="usb-menu-selected">Library Catalog</div>
            <a id="usb-resource-menu-selector" href="#" tabindex="1" class="usb-menu-select-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve">
                <path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"></path>
            </svg></a>
            <ul id="usb-resource-ul">
                <li><span class="usb-menu-item-primary"><a id="tind" href="#">Library Catalog</a></span> <span class="usb-menu-item-secondary">Books and Print Journals</span></li>
                <li><span class="usb-menu-item-primary"><a id="sfx" href="#">Find eJournals</a></span> <span class="usb-menu-item-secondary">Access by Title</span></li>
                <li><span class="usb-menu-item-primary"><a id="tindCourseReserves" href="#">Course Reserves</a></span></li>
                <li><span class="usb-menu-item-primary"><a id="coda" href="#">Caltech CODA</a></span> <span class="usb-menu-item-secondary">Collection of Open Digital Archives, Institutional Repository</span></li>
                <li><span class="usb-menu-item-primary"><a id="website" href="#">Search Website</a></span> <span class="usb-menu-item-secondary">Library website and LibGuides</span></li>
<!-- EDS, Archives is not ready for prime time.
                <li><span class="usb-menu-item-primary"><a id="eds" href="#">Cross database search</a></span> <span class="usb-menu-item-secondary">Articles, Books, etc.</span></li>
                <li><span class="usb-menu-item-primary"><a id="archivalMaterial" href="#">Archival materials</a></span> <span class="usb-menu-item-secondary">Caltech Archives</span></li>
                <li><span class="usb-menu-item-primary"><a id="archivalImages" href="#">Images</a></span> <span class="usb-menu-item-secondary">Caltech Archives</span></li>
                <li><span class="usb-menu-item-primary"><a id="moreSearchTools" href="#">More Search Tools</a></span></li>
-->
            </ul>
        </div><!-- END: id="usb-search-resources" -->
    </div><!-- END: class="usb-search-resources" -->

    <div id="usb-search-filters" class="usb-search-filters">
        <label id="usb-filter-label" class="usb-menu-label">By</label>
        <div id="usb-filter" class="usb-menu">
            <div id="usb-filter-menu-selected" class="usb-menu-selected"></div>
            <a id="usb-filter-menu-selector" href="#" tabindex="2" class="usb-menu-select-button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve">
                <path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"></path>
            </svg></a>
            <ul id="usb-filter-ul">
                <!-- EXAMPLE LI: <li><span class="usb-menu-item-primary"><a href="#" class="usb-menu-item-selected">Filter Item</a></span></li> -->
            </ul>
        </div><!-- END: id="usb-search-filters" -->
    </div><!-- END: class="usb-search-filters" -->

    <div class="usb-search-query">
        <label class="usb-query-label">For</label>
        <div class="usb-query-input">
            <form id="usb-query-form">
 		<input id="usb-query-input" tabindex="3" type="search" size="42">
<!--
		<button>Go</button>
-->
                <button><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="16" viewBox="0 0 12 12" aria-hidden="true" class="icon-search">
                        <path d="M7.273 0.727q1.187 0 2.19 0.585t1.588 1.588 0.585 2.19-0.585 2.19-1.588 1.588-2.19 0.585q-1.278 0-2.33-0.676l-3.284 3.301q-0.295 0.284-0.688 0.284-0.403 0-0.688-0.284t-0.284-0.688 0.284-0.688l3.301-3.284q-0.676-1.051-0.676-2.33 0-1.188 0.585-2.19t1.588-1.588 2.19-0.585zM7.273 8q0.591 0 1.128-0.23t0.929-0.622 0.622-0.929 0.23-1.128-0.23-1.128-0.622-0.929-0.929-0.622-1.128-0.23-1.128 0.23-0.929 0.622-0.622 0.929-0.23 1.128 0.23 1.128 0.622 0.929 0.929 0.622 1.128 0.23z"></path>
                </svg></button>
            </form><!-- END: id="usb-query-form" -->
        </div><!-- END: class="usb-query-input" -->
    </div><!-- END: class="usb-search-query-form" -->
  </div><!-- END: id="usb-searchbox" -->

HTML;
    return PHP_EOL. $src . PHP_EOL;
}

function searchboxJavaScript($basepath = "") {
    $js = file_get_contents(joinPath($basepath, "js/usb.js"));
    // return PHP_EOL . '<script src="http://support.ebscohost.com/eit/scripts/ebscohostsearch.js" type="text/javascript"></script>' . 
	return PHP_EOL .
	'<script rel="javascript" type="text/javascript">' . PHP_EOL . $js . PHP_EOL . '</script>' . PHP_EOL;
}
?>
