// wait for the document to be ready before making call
$(document).ready(function () {
  // make a GET request to the JSON API using jQuery's .getJSON method
  $.getJSON("schedule.json", function (data) {
    // store the schedule data in a global variable
    let scheduleData = data.schedule;

    //Populate the table with all the schedule data
    populateTable(scheduleData);

    //Listen for changes to the dropDown Menu
    $("#day-selector").on("change", function () {
      let selectedDay = $(this).val();

      //filter the schedule
      let filteredData = scheduleData.filter(function (schedule) {
        return selectedDay === "all" || schedule.days.includes(selectedDay);
      });
      populateTable(filteredData);
    });

    $("#student-selector").on("change", function () {
      let selectedStudent = $(this).val();

      //filter the schedule
      let filteredData = scheduleData.filter(function (schedule) {
        return selectedStudent === "all" || schedule.student_name.includes(selectedStudent);
      });
      populateTable(filteredData);
    });

    $("#wing-selector").on("change", function () {
      let selectedWing = $(this).val();

      //filter the schedule
      let filteredData = scheduleData.filter(function (schedule) {
        return selectedWing === "all" || schedule.wing.includes(selectedWing);
      });
      populateTable(filteredData);
    });

  });
  // Function to populate the table with schedule data
  function populateTable(scheduleData) {
    $("#schedule-table-body").empty();

    $.each(scheduleData, function (i, schedule) {
      let row = "<tr>";
      row += "<td>" + schedule.student_name + "</td>";
      row += "<td>" + schedule.class_name + "</td>";
      row += "<td>" + schedule.teacher_name + "</td>";
      row += "<td>" + schedule.room_number + "</td>";
      row += "<td>" + schedule.wing + "</td>";
      row += "<td>" + schedule.days.join(", ") + "</td>";
      row += "</tr>";
      $("#schedule-table-body").append(row);
    });
  }
});
