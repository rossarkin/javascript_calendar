<?php
require 'database.php';

header("Content-Type: application/json");

$user = (String) trim(htmlentities($_POST["username"]));

$stmt = $mysqli->prepare("select id, password from users where username=?");
if(!$stmt){
	if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
	}
}	

$stmt->bind_param('s',$user);
$stmt->execute();

$stmt->bind_result($id,$pwd_hash);
$stmt->fetch();

$guess = $_POST["password"];

if(crypt($guess,$pwd_hash)==$pwd_hash){
	$_SESSION['user'] = $user;
	echo json_encode(array("success"=>true,
							"user"=>$user,
							"userid"=>$id));
	exit;
}else{
	echo json_encode(array(
			"success"=>false,
			"message"=> "Invalid username or wrong password"));
	exit;
}


?>