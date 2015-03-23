<?php
require 'database.php';

header("Content-Type: application/json");

$userid = (int) trim(htmlentities($_POST['userid']));
$month = (int) trim(htmlentities($_POST['month']))+1;
$year = (int) trim(htmlentities($_POST['year']));

$eventArray[] = array();


$stmt = $mysqli->prepare("select title, description, location, type, starttime, endtime, ampm, endampm, day, eventid from events where user=$userid and month=$month and year=$year");

if(!$stmt){
	echo json_encode(array("success"=>false,
						   "message"=>"Query failed"));
	exit;
}

$stmt-> execute();
$result= $stmt->get_result();



while($row = $result->fetch_assoc()){
	array_push($eventArray, array(
		"day" => htmlentities($row["day"]),
		"title" => htmlentities($row["title"]),
		"description" => htmlentities($row["description"]),
		"location" => htmlentities($row["location"]),
		"type" => htmlentities($row["type"]),
		"starttime" => htmlentities($row["starttime"]),
		"endtime" => htmlentities($row["endtime"]),
		"ampm" => htmlentities($row["ampm"]),
		"endampm" => htmlentities($row["endampm"]),
		"eventid" => htmlentities($row["eventid"])
		));
}


//$stmt->bind_param('sssissssii', $title, $descrip, $loc, $type, $starttime, ,$endtime, $ampm, $endampm, $day, $eventid);

// while($stmt->fetch()){
// 	array_push($eventArray, array('title'=>$title, 'description'=>$descrip, 'loc'=>$loc, 'type'=$type 
// 		'starttime'=$starttime, 'endtime'=$endtime, 'ampm'=>$ampm, 'endampm'=>$endampm, 'day'=>$day, 'eventid'=>$eventid));

// }


echo json_encode($eventArray);


 
$stmt->close();
?>