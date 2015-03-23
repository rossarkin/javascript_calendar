

function registerAjax(event){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var email = document.getElementById("email").value;

	var dataString = "username=" + encodeURIComponent(username) + 
	"&password=" + encodeURIComponent(password) + "&email=" + encodeURIComponent(email);

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "ajax_register.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData=JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("Successful registration!");
		}else{
			alert(jsonData.message);		
		}

	},false);
	xmlHttp.send(dataString);
	//clear fields
	document.getElementById("username").value='';
	document.getElementById("password").value='';
	document.getElementById("email").value='';
}
document.getElementById("regbtn").addEventListener("click",registerAjax,false);

function loginAjax(event){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var dataString = "username=" + encodeURIComponent(username) + 
	"&password=" + encodeURIComponent(password);

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "ajax_login.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData=JSON.parse(event.target.responseText);
		if(jsonData.success){
			sessionStorage.setItem("username", jsonData.user);
			sessionStorage.setItem("userid",jsonData.userid);
			sessionStorage.setItem("loggedin",true);

			//clear fields
			document.getElementById("loginstuff").style.display='none';
			document.getElementById("regstuff").style.display='none';

			var currentuser = document.getElementById("loggeduser");
			var loggedin = sessionStorage.getItem("username");
			currentuser.textContent=loggedin;
			var logoutbtn=document.getElementById("logoutbtn");
			$("#logoutbtn").show();
			logoutbtn.addEventListener("click",logout ,false);
			updateCalendar();

		}
	},false);
	xmlHttp.send(dataString);
}
document.getElementById("loginbtn").addEventListener("click",loginAjax,false);


function forgotUser(){
	var email = document.getElementById("email").value;
	if(email ==''){
		alert("Please enter the email associated with your account in email field");
	}else{
		var dataString = "email=" + encodeURIComponent(email);
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "forgotpass.php", true);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xmlHttp.send(dataString);
		console.log(email);

		xmlHttp.addEventListener("load", function(event){	

			var jsonData=JSON.parse(event.target.responseText);
			if(jsonData.success){
				sendMail(jsonData.username,email);
				document.getElementById("email").value='';
				alert("An email has been sent to " + email + "!");
			}else{
				alert(jsonData.message);		
			}
		},false);
		
	}
}
document.getElementById("forgotuser").addEventListener("click",forgotUser,false);

//email sending possible through Mandrill API
function sendMail(username,email) {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'OQi4rTNRRA3olh5pjSMQQg',
        'message': {
          'from_email': 'fedshape@hotmail.com',
          'to': [
              {
                'email': email,
                'name': username,
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Forgotten Calendar Password',
          'html': 'Dear ' + username +', your username is '+username
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}

function saveEvent(event){
	if (sessionStorage.getItem("username") === null){
		alert("Please log in to save events");
	}else{
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;
		var location = document.getElementById("location").value;
		var type = document.getElementById("type").value;
		var time = document.getElementById("hour").value + ":" + document.getElementById("minute").value;
		var endtime = document.getElementById("endhour").value + ":" + document.getElementById("endminute").value;
		var ampm = document.getElementById("AMPM").value;
		var endampm = document.getElementById("endAMPM").value;
		var month = document.getElementById("eventmonth").value;
		var day = document.getElementById("eventday").value;
		var year = document.getElementById("eventyear").value;
		var userid = sessionStorage.getItem("userid");


		var dataString = "title=" + encodeURIComponent(title) + 
		"&description=" + encodeURIComponent(description) + "&location=" + encodeURIComponent(location) + 
		"&type=" + encodeURIComponent(type) + "&time=" + encodeURIComponent(time) + "&AMPM=" + encodeURIComponent(ampm) + 
		"&endtime=" + encodeURIComponent(endtime) + "&endAMPM=" + encodeURIComponent(endampm) + 
		"&eventmonth=" + encodeURIComponent(month) + "&eventday=" + encodeURIComponent(day) +
		"&eventyear=" + encodeURIComponent(year) + "&userid=" + encodeURIComponent(userid);


		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "ajax_saveevent.php", true);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xmlHttp.send(dataString);

		xmlHttp.addEventListener("load", function(event){	

			var jsonData=JSON.parse(event.target.responseText);
			if(jsonData.success){
				document.getElementById("title").value='';
				document.getElementById("description").value='';
				document.getElementById("location").value='';
				document.getElementById("type").value='';
				document.getElementById("eventmonth").value='';
				document.getElementById("eventday").value='';
				document.getElementById("eventyear").value='';
			}else{
				alert(jsonData.message);		
			}
			updateCalendar();
		},false);
	}
}	

document.getElementById("eventbtn").addEventListener("click",saveEvent,false);



function deleteEvent(event){
	var listed = document.getElementsByName("listedEvent");
	var eventid;
	for (var i=0;i<listed.length;i++){  // loop through radio buttons to find checked button
  		if ( listed[i].checked ) {      // then grab checked event's id
    		eventid = listed[i].getAttribute("eventid");
  		}
	}

	var datastring = "eventid=" + encodeURIComponent(eventid);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "deleteevent.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(datastring);

	xmlHttp.addEventListener('load', function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			updateCalendar();
		}else{
			alert(jsonData.message);
		}
	},false);
	xmlHttp.send(datastring);
}

document.getElementById("deletebtn").addEventListener("click",deleteEvent,false);

function editEvent(event){
	
	var title = document.getElementById("edittitle").value;
	var description = document.getElementById("editdescription").value;
	var location = document.getElementById("editlocation").value;
	var type = document.getElementById("edittype").value;
	var time = document.getElementById("edithour").value + ":" + document.getElementById("editminute").value;
	var endtime = document.getElementById("editendhour").value + ":" + document.getElementById("editendminute").value;
	var ampm = document.getElementById("editAMPM").value;
	var endampm = document.getElementById("editendAMPM").value;
	var month = document.getElementById("editeventmonth").value;
	var day = document.getElementById("editeventday").value;
	var year = document.getElementById("editeventyear").value;

	var listed = document.getElementsByName("listedEvent");
	var eventid=null;
	for (var i=0;i<listed.length;i++){  // loop through radio buttons to find checked button
  		if ( listed[i].checked ) {      // then grab checked event's id
    		eventid = listed[i].getAttribute("eventid");
  		}
	}
	if(eventid===null){
		alert("Please select an event to edit");
		return;
	}

	var datastring = "eventid=" + encodeURIComponent(eventid) + "&title=" + encodeURIComponent(title) + 
		"&description=" + encodeURIComponent(description) + "&location=" + encodeURIComponent(location) + 
		"&type=" + encodeURIComponent(type) + "&time=" + encodeURIComponent(time) + "&AMPM=" + encodeURIComponent(ampm) + 
		"&endtime=" + encodeURIComponent(endtime) + "&endAMPM=" + encodeURIComponent(endampm) + 
		"&eventmonth=" + encodeURIComponent(month) + "&eventday=" + encodeURIComponent(day) +
		"&eventyear=" + encodeURIComponent(year);


	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "editevent.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xmlHttp.addEventListener('load', function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			updateCalendar();
		}else{
			alert(jsonData.message);
		}
	},false);
	xmlHttp.send(datastring);
}


function logout(){
	sessionStorage.clear();
	location.reload();
}

document.getElementById("logoutbtn").addEventListener("click",logout,false);

//useful function for sanitizing input into javascript
function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}




