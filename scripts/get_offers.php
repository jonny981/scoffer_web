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

$request = json_decode($postdata);;

@$radius = $request->radius;
@$userLat = $request->latitude;
@$userLong = $request->longitude;

$sql = "SELECT *, ROUND(( 3959 * acos( cos( radians('$userLat') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('$userLong') ) + sin( radians('$userLat') ) * sin( radians( latitude ) ) ) ) , 1)
        AS distance
        FROM company INNER JOIN offer ON company.CompanyID = offer.CompanyID
        HAVING distance < '$radius'
        ORDER BY distance
        LIMIT 0 , 20;";

$result = $con->query($sql);

$rows["success"] = "";
$rows["offers"] = array();
$rows["totalOffers"] = 0;

if ($result->num_rows > 0) {
  // output data of each row
  while ($row = $result->fetch_assoc()) {
    $rows["offers"][] = $row;
    $rows["totalOffers"]++;
  }
  $rows["success"] = true;
} else {
  $rows["success"] = true;
  echo "0 results";
}

print json_encode($rows);
$con->close();

?>
