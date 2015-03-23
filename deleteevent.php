<?php
require 'database.php';
header("Content-Type: application/json");


$eventid=(int) trim(htmlentities($_POST['eventid']));
$stmt = $mysqli->prepare("delete from events where eventid=$eventid");

if(!$stmt){
	echo json_encode(array("success"=>false,
						   "message"=>"Query failed"));
	exit;
}
$stmt->execute();

echo json_encode(array("success"=>true));

$stmt->close();

?>