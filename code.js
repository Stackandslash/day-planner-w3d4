var planner = {
    7: "",
    8: "",
    9: "",
    10: "This is the note for 10 AM",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
}
if (!localStorage.getItem("planner")){
    console.log("No stored planner");
}
else{
    planner = localStorage.getItem("planner");
}


function hourCheck(){
    return "Time";
}

//we make a big object tree of a variable, where each hour is defined by number, and contains the string of the notes for that hour. 
//
//This will need to be bounced into local storage.

//makeSlot function makes a time slot row and the associated columns, giving the row an ID associated with the hour. It checks the relative time, then sets the class of the textarea element appropriately.
function makeSlot(hour){
    var timeClass = "present";
    var rawTime = moment().format("H");
    if(rawTime < hour){
        timeClass = "future";
    }
    else if(rawTime > hour){
        timeClass = "past";
    }
    
    if(hour > 12){
        timeString = (hour - 12) + " PM";
    }
    else{
        timeString = (hour) + " AM";
    }
var rowEl = $("<div class='row time-block'>");
$(".container").append(rowEl);

rowEl.append($("<div class='col-1 hour'> <p>" + timeString + "</p></div>"));

rowEl.append($('<textarea class="col-10 description ' + timeClass + '">' + planner[hour] + '</textarea>'));

rowEl.append($("<button class='col-1 btn saveBtn'>Save</button>"));
}


//the function here will place a time slot for each key in the planner variable.
for (const key in planner) {
    makeSlot(key);
}


//What if we set up an option to enter the time span you wanted to cover? The parts are already largely in place.