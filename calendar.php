<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="calendar.css">
	<link rel="icon" href="favicon.ico">
	<title>Calendar Caliente</title>
</head>
<body>
	<div id='header'>
		<h1>Calendank</h1>
		<h2 id="currmonth"></h2>
	</div>
	<div id='left'>
		
			<div id='quickadd'>
				<form id="event-form" method="POST">
					<input type='text' id='title' placeholder='Title'>
					<br>
					<input type='text' name='description' id='description' placeholder='Description'>
					<br>
					<input type='text' id='location' placeholder='Location'>
					<br>
					<select name="type" id="type" onchange="" size="1">
				    	<option value="01">Green</option>
				    	<option value="02">Red</option>
				    	<option value="03">Blue</option>
				    	<option value="04">Yellow</option>
				    	<option value="05">Purple</option>
				    	<option value="06">Cyan</option>
				    	<option value="07">Orange</option>
					</select>
					<br>
					Start Time:
					<select name="hour" id="hour" onchange="" size="1">
						<option value="01">1</option>
				    	<option value="02">2</option>
				    	<option value="03">3</option>
				    	<option value="04">4</option>
				    	<option value="05">5</option>
				    	<option value="06">6</option>
				    	<option value="07">7</option>
				    	<option value="08">8</option>
				    	<option value="09">9</option>
				    	<option value="10">10</option>
				    	<option value="11">11</option>
				    	<option value="12">12</option>
					</select>:<select name="minute" id="minute" onchange="" size="1">
						<option value="00">00</option>
				    	<option value="30">30</option>
				    	<option value="45">45</option>
					</select> <select name="AMPM" id="AMPM" onchange="" size="1">
						<option value="AM">AM</option>
				    	<option value="PM">PM</option>
					</select> 
					<br>
					End Time:
					<select name="endhour" id="endhour" onchange="" size="1">
						<option value="01">1</option>
				    	<option value="02">2</option>
				    	<option value="03">3</option>
				    	<option value="04">4</option>
				    	<option value="05">5</option>
				    	<option value="06">6</option>
				    	<option value="07">7</option>
				    	<option value="08">8</option>
				    	<option value="09">9</option>
				    	<option value="10">10</option>
				    	<option value="11">11</option>
				    	<option value="12">12</option>
					</select>:<select name="endminute" id="endminute" onchange="" size="1">
						<option value="00">00</option>
				    	<option value="30">30</option>
				    	<option value="45">45</option>
					</select> <select name="endAMPM" id="endAMPM" onchange="" size="1">
						<option value="AM">AM</option>
				    	<option value="PM">PM</option>
					</select> 
					<br>
					<select name="month" id="eventmonth" onchange="" size="1">
						<option value="01">January</option>
				    	<option value="02">February</option>
				    	<option value="03">March</option>
				    	<option value="04">April</option>
				    	<option value="05">May</option>
				    	<option value="06">June</option>
				    	<option value="07">July</option>
				    	<option value="08">August</option>
				    	<option value="09">September</option>
				    	<option value="10">October</option>
				    	<option value="11">November</option>
				    	<option value="12">December</option>
					</select>
					<br>
					<input type='number' id='eventday' min="1" max="31" step="1" placeholder="Day">
					<br>
					<input type="number" id="eventyear" min="2015" step="1" placeholder="Year">
					<br>
					<input type='button' id='eventbtn' value='Add'>
				</form>
			</div>
	
	</div>
		<div id='right'>
			<div id='calendar'>

				<table id='daynames'>
					<tr>
					<th>Sunday</th>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wednesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
					</tr>
				</table>
				
				<table id='days'>
					
				</table>
			</div>
			<div id='calControl'>
				<button id='prevMonth'>Prev-</button>
				<button id='nextMonth'>Next</button>
			</div>
		</div>
		<div id='topright'>
			<div id='useroptions'>
			<div id = 'loginstuff'>
				<input type='text' id='username' placeholder='username'>
				<input type='password' id='password' placeholder='password'>
				<input type='text' id='email' placeholder='email if registering'>
				<br>
				<input type='submit' id='loginbtn' value='login'>
			</div>
			<div id = 'regstuff'>
				<input type='submit' id='regbtn' value='register'>
				<input type='submit' id='forgotuser' value='forgot username?'>
			</div>
			
			</div>
			<div id = 'userstuff'>
				<p id='currentuser'>
					<span style="padding-bottom:30px;" id="loggeduser"></span>
					<button id="logoutbtn" style="display:none;">Logout</button>
				</p>
				<div id = 'monthevents'>
					
				</div>
				<form style="display:none;" id="montheventbtns">
					<button type="button" id='editbtn'>Edit</button>
					<button type = "button" id='deletebtn'>Delete</button>
				</form>
				<div style="background-color:black;">
					<form style="border:1px solid black;" id="editform" method="POST">
					<input type='text' id='edittitle' placeholder='Title'>
					<br>
					<input type='text' name='description' id='editdescription' placeholder='Description'>
					<br>
					<input type='text' id='editlocation' placeholder='Location'>
					<br>
					<select name="type" id="edittype" onchange="" size="1">
				    	<option value="01">Green</option>
				    	<option value="02">Red</option>
				    	<option value="03">Blue</option>
				    	<option value="04">Yellow</option>
				    	<option value="05">Purple</option>
				    	<option value="06">Cyan</option>
				    	<option value="07">Orange</option>
					</select>
					<br>
					Start Time:
					<select name="hour" id="edithour" onchange="" size="1">
						<option value="01">1</option>
				    	<option value="02">2</option>
				    	<option value="03">3</option>
				    	<option value="04">4</option>
				    	<option value="05">5</option>
				    	<option value="06">6</option>
				    	<option value="07">7</option>
				    	<option value="08">8</option>
				    	<option value="09">9</option>
				    	<option value="10">10</option>
				    	<option value="11">11</option>
				    	<option value="12">12</option>
					</select>:<select name="minute" id="editminute" onchange="" size="1">
						<option value="00">00</option>
				    	<option value="30">30</option>
				    	<option value="45">45</option>
					</select> <select name="AMPM" id="editAMPM" onchange="" size="1">
						<option value="AM">AM</option>
				    	<option value="PM">PM</option>
					</select> 
					<br>
					End Time:
					<select name="endhour" id="editendhour" onchange="" size="1">
						<option value="01">1</option>
				    	<option value="02">2</option>
				    	<option value="03">3</option>
				    	<option value="04">4</option>
				    	<option value="05">5</option>
				    	<option value="06">6</option>
				    	<option value="07">7</option>
				    	<option value="08">8</option>
				    	<option value="09">9</option>
				    	<option value="10">10</option>
				    	<option value="11">11</option>
				    	<option value="12">12</option>
					</select>:<select name="endminute" id="editendminute" onchange="" size="1">
						<option value="00">00</option>
				    	<option value="30">30</option>
				    	<option value="45">45</option>
					</select> <select name="endAMPM" id="editendAMPM" onchange="" size="1">
						<option value="AM">AM</option>
				    	<option value="PM">PM</option>
					</select> 
					<br>
					<select name="month" id="editeventmonth" onchange="" size="1">
						<option value="01">January</option>
				    	<option value="02">February</option>
				    	<option value="03">March</option>
				    	<option value="04">April</option>
				    	<option value="05">May</option>
				    	<option value="06">June</option>
				    	<option value="07">July</option>
				    	<option value="08">August</option>
				    	<option value="09">September</option>
				    	<option value="10">October</option>
				    	<option value="11">November</option>
				    	<option value="12">December</option>
					</select>
					<br>
					<input type='number' id='editeventday' min="1" max="31" step="1" placeholder="Day">
					<br>
					<input type="number" id="editeventyear" min="2015" step="1" placeholder="Year">
					<br>
				</form>
				</div>
			</div>
		</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="ajax.js"></script>
<script src="calendar.js"></script>

	<script>
	if (!(sessionStorage.getItem("username") === null)) {
 
	var useroptions = document.getElementById("useroptions");
	document.getElementById("loginstuff").style.display='none';
	document.getElementById("regstuff").style.display='none';

	var currentuser = document.getElementById("loggeduser");
	var loggedin = sessionStorage.getItem("username");
	currentuser.textContent=loggedin;

	var logoutbtn=document.getElementById("logoutbtn");
	$("#logoutbtn").show();
	}
	monthToText();
	
	$(document).ready(function(){
		$("#editform").dialog({
			autoOpen: false,
			height: 500,
			width: 350,
			modal: true,
			buttons: [
				{
					text:"Confirm Edit",
					click: function(){
						editEvent();
						$("#editform").dialog("close");
						document.getElementById("edittitle").value='';
						document.getElementById("editdescription").value='';
						document.getElementById("editlocation").value='';
						document.getElementById("edittype").value='';
						document.getElementById("editeventmonth").value='';
						document.getElementById("editeventday").value='';
						document.getElementById("editeventyear").value='';
					}
				}
				
			]
		})
	});
	$('#editbtn').button().click(function() {
        $("#editform").dialog("open");
	});

	</script>
</body>
</html>