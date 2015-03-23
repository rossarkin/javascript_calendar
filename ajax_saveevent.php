<?php
require 'database.php';

header("Content-Type: application/json");


$descrip = (String) trim(htmlentities($_POST['description']));
$ampm = (String) trim(htmlentities($_POST['AMPM']));
$endampm = (String) trim(htmlentities($_POST['endAMPM']));
$type = (int) trim(htmlentities($_POST['type']));
$month = (int) trim(htmlentities($_POST['eventmonth']));
$userid = (int) trim(htmlentities($_POST['userid']));
$starttime = (String) trim(htmlentities($_POST['time']));
$endtime = (String) trim(htmlentities($_POST['endtime']));

if($_POST['title']==""){
	echo json_encode(array("success"=>false,
						   "message"=>"Please enter a title"));
	exit;
}else{
	$title = (String) trim(htmlentities($_POST['title']));
}

if($_POST['location']==""){
	echo json_encode(array(
		"success"=>false,"message"=>"Please enter a location"));
	exit;
}else{
	$loc = (String) trim(htmlentities($_POST['location']));
}

if($_POST['eventday']==""){
	echo json_encode(array(
		"success"=>false,
		"message"=>"Please enter a day"));
	exit;
}else{
	$day = (int) trim(htmlentities($_POST['eventday']));
}

if($_POST['eventyear']==""){
		echo json_encode(array(
		"success"=>false,
		"message"=>"Please enter a year"));
	exit;
}else{
	$year = (int) trim(htmlentities($_POST['eventyear']));
}




$stmt = $mysqli->prepare("insert into events (title, description, location, user, type, starttime, endtime, AMPM, endAMPM, day, month, year) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if(!$stmt){
	echo json_encode(array("success"=>false,
						   "message"=>"Query failed"));
	exit;
}
 
$stmt->bind_param('sssiissssiii', $title, $descrip, $loc, $userid, $type, $starttime, $endtime, $ampm, $endampm, $day, $month, $year);
 
$stmt->execute();
 
$stmt->close();
echo json_encode(array("success"=>true));
exit;
 
?>
