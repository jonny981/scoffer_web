<?php

header("Access-Control-Allow-Origin: http://scoffer.ddns.net");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$host = "127.0.0.1";
$port = 3306;
$socket = "";
$user = "root";
$password = "";
$dbname = "offers";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$offerID = $request->OfferID;

$sql = "DELETE
        FROM offer
        WHERE OfferID = '$offerID'";

$result = $con->query($sql);

print json_encode($result);
$con->close();
?>
