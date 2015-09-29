<?php
require_once("searchbox.php");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
  <title>Unified Search Box prototypes</title>
  <link href="css/page-basic.css" rel="stylesheet">
  <!-- START: Unified Searchbox CSS -->
  <?php echo searchboxCSS(); ?>
  <!--   END: Unified Searchbox CSS -->

</head>
<body>
  <header><h1>Prototype 5</h1></header>
  <section>
<!-- START: Unified Searchbox HTML fragment and JavaScript -->
<?php 
    echo searchboxHTML();
    echo searchboxJavaScript();
?>
<!--   END: Unified Searchbox HTML fragment and JavaScript -->
  </section>
  <nav>
    <h2>project prototypes</h2>
    <ul>
      <li><a href="index.html">home</a></li>
      <li><a href="prototype1.html">prototype 1</a> a UL list as datastructure describing hetrogenious search forms</li>
      <li><a href="prototype2.html">prototype 2</a> a more traditional element implementation</li>
      <li><a href="prototype3.html">prototype 3</a> using the EDS form API</li>
      <li><a href="prototype4.html">prototype 4</a> getting tab and focus working</li>
      <li><a href="prototype5.html">prototype 5</a> a working prototype</li>
      <li><a href="searchbox.php">PHP library Implementation</a></li>
      <li><a href="test.php">Test PHP Library Implementation</a></li>
      <li><a href="searchbox.html">HTML fragment implementation</a></li>
    </ul>
  </nav>
  <footer>No droids, here. We're of no interest. Move along.</footer>
</body>
</html>
