<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$host = "127.0.0.1";
$port = 3306;
$user = "root";
$password = "";
$socket = "";
$dbname = "offers";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server');

/*
* Collect all Details from Angular HTTP Request.
*/
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

@$companyID = $request->companyID;
@$title = $request->title;
@$details = $request->details;
@$startDate = $request->startDate;
@$endDate = $request->endDate;
@$imageURL = $request->imageURL;

$query = "INSERT INTO offer (OfferTitle, FurtherInfo, OfferStartDate, OfferExpiryDate, CompanyID, ImageURL)
VALUES ('$title', '$details', '$startDate', '$endDate', '$companyID', '$imageURL');";



$result = $con->query($query);

print json_encode($result);

mysqli_close($con);
?>
