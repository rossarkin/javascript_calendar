<?php
require 'database.php';

header("Content-Type: application/json");

$user = (String) trim(htmlentities($_POST["username"]));

if($_POST["password"]==""){
	echo json_encode(array(
		"success"=>false,
		"message"=>"Please enter a password"));
	exit;
}else{
	$pass = crypt(htmlentities($_POST["password"]));
}
if($_POST["email"]==""){
	echo json_encode(array(
		"success"=>false,
		"message"=>"Please enter an email address"));
	exit;
}else{
	$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
}


$stmt = $mysqli->prepare("select username,email from users");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}	

$stmt->execute();
$stmt->bind_result($username,$emailtaken);


while($stmt->fetch()){
	if($user==$username){
		echo json_encode(array(
			"success"=>false,
			"message"=> "Username taken"));
		exit;
	}else if($email==$emailtaken){
		echo json_encode(array(
			"success"=>false,
			"message"=> "Account with that email already registered"));
		exit;
	}
}

$stmt->close();

$stmt2 = $mysqli->prepare("insert into users(username,password,email) values(?,?,?)");
if(!$stmt2){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
	}
$stmt2->bind_param('sss', $user,$pass,$email);
$stmt2->execute();
$stmt2->close();

echo json_encode(array("success"=>true));
exit;
?>