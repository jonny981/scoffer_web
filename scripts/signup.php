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
@$companyName = $request->companyName;
@$password = $request->password;
@$latitude = $request->latitude;
@$longitude = $request->longitude;
@$description = $request->description;
@$openingTime = $request->openingTime;
@$closingTime = $request->closingTime;

$query = "INSERT INTO Company (CompanyName, Password, Latitude, Longitude, Description, OpeningTime, ClosingTime)
          VALUES ('$companyName', '$password', '$latitude', '$longitude', '$description', '$openingTime', '$closingTime')";

if (mysqli_query($con, $query)) {
  echo "success";
} else {
  echo "error";
//    echo "Error: " . $query . "<br>" . mysqli_error($con);
}

mysqli_close($con);

?>