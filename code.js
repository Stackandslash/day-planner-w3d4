var planner = {
  7: "",
  8: "",
  9: "",
  10: "",
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
};

const blockdate = moment().format("LLLL");
$("#time").text(blockdate);

if (!localStorage.getItem("planner")) {
  console.log("No stored planner");
} else {
  planner = JSON.parse(localStorage.getItem("planner"));
}

function hourCheck() {
  return "Time";
}

//we make a big object tree of a variable, where each hour is defined by number, and contains the string of the notes for that hour.
//
//This will need to be bounced into local storage.

//makeSlot function makes a time slot row and the associated columns, giving the row an ID associated with the hour. It checks the relative time, then sets the class of the textarea element appropriately.
function makeSlot(hour) {
  var timeClass = "present";
  var rawTime = moment().format("H");
  console.log(rawTime, hour);
  if (rawTime < parseInt(hour)) {
    timeClass = "future";
  } else if (rawTime > parseInt(hour)) {
    timeClass = "past";
  }

  if (hour > 12) {
    timeString = hour - 12 + " PM";
  } else {
    timeString = hour + " AM";
  }
  var rowEl = $("<div class='row time-block'>");
  $(".container").append(rowEl);

  rowEl.append($("<div class='col-1 hour'> <p>" + timeString + "</p></div>"));

  rowEl.append(
    $(
      '<textarea class="col-10 description ' +
        timeClass +
        '">' +
        planner[hour] +
        "</textarea>"
    )
  );

  rowEl.append(
    $(
      "<button class='col-1 btn saveBtn' id='" +
        hour +
        "'><span class='fas fa-save'></span></button>"
    )
  );
}

//Save function, detects a click anywhere in the container, then checks if the click is on an element with class saveBtn, before getting the specific row from an assigned ID on the button.
$(".container").on("click", function (e) {
  if (e.target.classList.contains("saveBtn")) {
    planner[e.target.id] = $(e.target).prev()[0].value; //This seems needlessly complex.
    localStorage.setItem("planner", JSON.stringify(planner));
  }
});

//the function here will place a time slot for each key in the planner variable. The first two options seem to make an extra slot at the bottom.

//This loop option was said to have issues with sometimes not appearing in order. Not recommended.
//Object.keys(planner).forEach(function(keyVar){
//    makeSlot(keyVar);
//})

//This loop option will still take one slot per entry in the planner object. With a relatively small change, it should allow the user to specify what time frame they want to plan for.
for (const key in planner) {
  makeSlot(key);
}