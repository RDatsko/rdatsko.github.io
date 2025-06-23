
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="common.css">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="events.css">

<!--fontawesome-->
<script src="https://kit.fontawesome.com/cf6b55f3a6.js" crossorigin="anonymous"></script>

<title>Document</title>
</head>
<body>

<h1>Tests</h1>

<div class="container mb_80">
    <div class="row">

<?php
    $event = json_decode(file_get_contents("events.json"), true)['events'];
    $artist = "all";
    include ( dirname(__FILE__) . '/event.php' );
?>

    </div>
</div>

</body>
</html>