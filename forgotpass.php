<?php
require 'database.php';

header("Content-Type: application/json");

$email = $_POST['email'];

$stmt = $mysqli->prepare("select username from users where email=?");
if(!$stmt){
	echo json_encode(array("success"=>false,
						   "message"=>"Query failed"));
	exit;
}
$stmt->bind_param('s',$email);
$stmt->execute();

$stmt->bind_result($username);
$stmt->fetch();

echo json_encode(array("success"=>true,
						"username"=>$username));
$stmt->close();

?>