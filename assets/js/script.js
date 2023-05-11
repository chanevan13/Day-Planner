$(function () {
    // Display the current date in the header
    function displayCurrentDate() {
      $("#currentDay").text(dayjs().format('MMMM D, YYYY'));
    }
  
    // Create the time blocks for standard business hours
    function createTimeBlocks() {
      var currentHour = dayjs().hour();
  
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlockEl = $("<div>").addClass("time-block").attr("id", "hour-" + hour);
        var rowEl = $("<div>").addClass("row");
        var hourEl = $("<div>").addClass("hour col-1").text(dayjs(hour, "H").format("hA"));
        var descriptionEl = $("<textarea>").addClass("description col-10");
  
        // Set the color-coding for each time block(work in progress I need to change Ids in html)
        if (hour < currentHour) {
          descriptionEl.addClass("past");
        } else if (hour === currentHour) {
          descriptionEl.addClass("present");
        } else {
          descriptionEl.addClass("future");
        }
  
        var saveBtnEl = $("<button>").addClass("saveBtn col-1").html('<i class="fas fa-save"></i>');
  
        rowEl.append(hourEl, descriptionEl, saveBtnEl);
        timeBlockEl.append(rowEl);
        $(".container").append(timeBlockEl);
      }
    }
  
    // Save the event text in local storage when the save button is clicked and will stay if refreshed 
    function saveEvent() {
      var timeBlockEl = $(this).closest(".time-block");
      var userInput = timeBlockEl.find(".description").val();
      var timeBlockId = timeBlockEl.attr("id");
      localStorage.setItem(timeBlockId, userInput);
    }
  
    // Load the saved events from local storage
    function loadEvents() {
      $(".time-block").each(function() {
        var timeBlockId = $(this).attr("id");
        var savedUserInput = localStorage.getItem(timeBlockId);
        if (savedUserInput) {
          $(this).find(".description").val(savedUserInput);
        }
      });
    }
  
    // Call the necessary functions on page load
    displayCurrentDate();
    createTimeBlocks();
    loadEvents();
  
    // Event delegation for the save button click event
    $(document).on("click", ".saveBtn", saveEvent);
  });

  