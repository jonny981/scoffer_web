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

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;

$loginQuery = "SELECT *
        FROM Company
        WHERE Email = '$email' AND Password = '$password'";
$loginResult = $con->query($loginQuery);

$emailQuery = "SELECT *
        FROM Company
        WHERE Email = '$email'";
$emailResult = $con->query($emailQuery);

class responseHolder {
    function responseobject() {
        $this->validUser = false;
        $this->validDetails = false;
        $this->details = new ArrayObject();
    }
}

$response = new responseHolder();

if ($loginResult->num_rows > 0) {
    // output data of each row
    while($row = $loginResult->fetch_assoc()) {
          $response->details = $row;
    }
    $response->validDetails = true;
} else {
    $response->details = new ArrayObject();
    $response->validDetails = false;
}

if ($emailResult->num_rows > 0) {
    $response->validUser = true;
} else {
$response->validUser = false;
}

print json_encode($response);

$con->close();
?>
