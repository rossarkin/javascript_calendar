<?php

$mysqli = new mysqli('localhost', 'frozenberg', '120588', 'calendar');

if($mysqli->connect_errno){
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>