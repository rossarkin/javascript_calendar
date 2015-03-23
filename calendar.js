(function(){Date.prototype.deltaDays=function(c){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+c)};Date.prototype.getSunday=function(){return this.deltaDays(-1*this.getDay())}})();
function Week(c){this.sunday=c.getSunday();this.nextWeek=function(){return new Week(this.sunday.deltaDays(7))};this.prevWeek=function(){return new Week(this.sunday.deltaDays(-7))};this.contains=function(b){return this.sunday.valueOf()===b.getSunday().valueOf()};this.getDates=function(){for(var b=[],a=0;7>a;a++)b.push(this.sunday.deltaDays(a));return b}}
function Month(c,b){this.year=c;this.month=b;this.nextMonth=function(){return new Month(c+Math.floor((b+1)/12),(b+1)%12)};this.prevMonth=function(){return new Month(c+Math.floor((b-1)/12),(b+11)%12)};this.getDateObject=function(a){return new Date(this.year,this.month,a)};this.getWeeks=function(){var a=this.getDateObject(1),b=this.nextMonth().getDateObject(0),c=[],a=new Week(a);for(c.push(a);!a.contains(b);)a=a.nextWeek(),c.push(a);return c}};

var today = new Date();
var currMonth = new Month(today.getFullYear(),today.getMonth());
updateCalendar();

var textMonth=null;

//Gives a text representation of the current month
function monthToText(){
	if(currMonth.month === 0){
		textMonth="January";
	}else if(currMonth.month ==1){
		textMonth='February';
	}else if(currMonth.month ==2){
		textMonth='March';
	}else if(currMonth.month ==3){
		textMonth='April';
	}else if(currMonth.month ==4){
		textMonth='May';
	}else if(currMonth.month ==5){
		textMonth='June';
	}else if(currMonth.month ==6){
		textMonth='July';
	}else if(currMonth.month ==7){
		textMonth='August';
	}else if(currMonth.month ==8){
		textMonth='September';
	}else if(currMonth.month ==9){
		textMonth='October';
	}else if(currMonth.month ==10){
		textMonth='November';
	}else{
		textMonth='December';
	}
	document.getElementById("currmonth").textContent = textMonth + " " + currMonth.year;

}


//button to move month forward
document.getElementById("nextMonth").addEventListener("click",function(){
	currMonth=currMonth.nextMonth();
	monthToText();
	updateCalendar();
}, false);
//button to move month backward
document.getElementById("prevMonth").addEventListener("click",function(){
	currMonth=currMonth.prevMonth();
	monthToText();
	updateCalendar();
}, false);
function daysInMonth(month,year){
	var d= new Date(year,month+1,0);
	return d.getDate();
}

//this is the MASTER function, updates the calendar without refreshing to reflect any changes
function updateCalendar(){

	if (sessionStorage.getItem("loggedin")) {
		$("#montheventbtns").css("display","inline-block");
	}

	var month = currMonth;
	var weeks = currMonth.getWeeks();
	var table = document.getElementById("days");
	updateEvents();

	while (table.hasChildNodes()) {
    	table.removeChild(table.lastChild);
	}
	
	for(var w=0;w<weeks.length;w++){
		var tr = document.createElement("tr");
		tr.setAttribute("class","dingusrow");
		for(var d=0;d<7;d++){
			var td = document.createElement("td");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}


	for(var wk=0; wk<weeks.length;){
		var rows = table.rows, rowcount = rows.length, r, cells, cellcount, c;
		for(r=0;r<rowcount;r++){
			cells=rows[r].cells;
			cellcount=cells.length;
			var days = weeks[wk].getDates(); 
			wk++;

			for(var da=0;da<days.length;){
				for (c=0; c<cellcount; c++) {
				cells[c].textContent=days[da].getDate();
				//assign each individual day an id to match events with
				cells[c].setAttribute("id",(days[da].getMonth()+1) + "/" +days[da].getDate());
				da++;
				}
			}
							
		}	
	}
	
}

function updateEvents(){
	while (document.getElementById("monthevents").hasChildNodes()) {
    	document.getElementById("monthevents").removeChild(document.getElementById("monthevents").lastChild);
	}
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "updateevent.php",true);
	var userid = sessionStorage.getItem("userid");
	var month = currMonth.month;
	var year = currMonth.year;
	var days = new Date(year, month+1,0).getDate();
	var jsonData;

	var dataString = "userid=" + encodeURIComponent(userid) + 
	"&month=" + encodeURIComponent(month) + "&year=" +encodeURIComponent(year);

	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");	
	xmlHttp.send(dataString);
	xmlHttp.addEventListener("load", function(event){	
			jsonData=JSON.parse(event.target.responseText);
			//console.log(jsonData);
			//console.log(days);
			for(var i=1; i<=jsonData.length-1; i++){
				listEvents(jsonData[i]);
				for(var j=1;j<=days;j++){    //for each event in the jsonData array, loop through all 
					if(jsonData[i].day==j){  //days until its .day is equal to the cell's day
					var newrow = document.createElement("tr");
					newrow.setAttribute("class","dingusclass");
					var newtd = document.createElement("td");
					var thisCell = document.getElementById(month+1 + "/" + jsonData[i].day);
					thisCell.setAttribute("class","event");
					
					//create the hovering element above every event
					var hoverlink = document.createElement("a");
					hoverlink.setAttribute("href", "#");
					hoverlink.setAttribute("class", "tooltip");
					hoverlink.textContent = jsonData[i].title;
					var span = document.createElement("span");
					span.setAttribute("id", jsonData[i].title);
					span.textContent = jsonData[i].title;

					var ul = document.createElement("ul");

					var li2 = document.createElement("li");
					li2.textContent = jsonData[i].description;
					ul.appendChild(li2);

					var li3 = document.createElement("li");
					li3.textContent = "Located at: " + jsonData[i].location;
					ul.appendChild(li3);

					var li4 = document.createElement("li");
					li4.textContent =  jsonData[i].starttime + jsonData[i].ampm + " - " + jsonData[i].endtime + jsonData[i].endampm;
					ul.appendChild(li4);

					span.appendChild(ul);
					hoverlink.appendChild(span);
					var br = document.createElement("br");
					newtd.appendChild(hoverlink);
					newtd.setAttribute("class", jsonData[i].type);
					newrow.appendChild(newtd);
					thisCell.appendChild(newrow);
					thisCell.appendChild(br);
				}}	
				}
	},false);

}
//make each event a radio button for selection of editing or deleting
function listEvents(jsonEvent){

	var listedEvent = document.createElement("input");
	listedEvent.setAttribute("type", "radio");
	listedEvent.setAttribute("name", "listedEvent");
	listedEvent.setAttribute("id",addslashes(jsonEvent.title));
	listedEvent.setAttribute("eventid",addslashes(jsonEvent.eventid));

	var label = document.createElement("label");
	label.setAttribute("for",jsonEvent.title);
	label.textContent=jsonEvent.title;
	document.getElementById("monthevents").appendChild(listedEvent);
	document.getElementById("monthevents").appendChild(label);
}







