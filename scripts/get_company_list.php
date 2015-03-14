<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$host="127.0.0.1";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="offers";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
	or die ('Could not connect to the database server' . mysqli_connect_error());

$sql = "SELECT * FROM Company";
$result = $con->query($sql);

$rows["companies"] = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
          $rows["companies"][] = $row;
    }
} else {
    echo "0 results";
}

print json_encode($rows);
$con->close();
?>
