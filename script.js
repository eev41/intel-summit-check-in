// Check-in Form Fields
const checkInForm = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Attendance Tracking
let attendeeCount = 0;
let maxAttendeeCount = 50;
let waterAttendeeCount = 0;
let zeroAttendeeCount = 0;
let powerAttendeeCount = 0;

// Progress Bar
let progressBar = document.getElementById("progressBar");

// Greeting
const greeting = document.getElementById("greeting");

// Attendee Lists
const waterAttendees = document.getElementById("waterAttendees");
const zeroAttendees = document.getElementById("zeroAttendees");
const powerAttendees = document.getElementById("powerAttendees");

checkInForm.addEventListener("submit", function (event) 
{
  event.preventDefault();

  if (attendeeCount < maxAttendeeCount)
  {
    // Get form entries
    const nameInput = attendeeName.value;
    const teamInput = teamSelect.value;
    const teamInputName = teamSelect.selectedOptions[0].text;

    // Display personalized greeting
    const greetingMessage = `Welcome ${nameInput} from ${teamInputName}!`
    greeting.textContent = greetingMessage;
    greeting.style.display = "block";

    // Update overall count and progress
    ++attendeeCount;
    document.getElementById("attendeeCount").textContent = attendeeCount;

    const attendeeCountPercentage = Math.round((attendeeCount / maxAttendeeCount) * 100) + "%";
    progressBar.style.width = attendeeCountPercentage;

    // Update team count
    if (teamInput == "water")
    {
      ++waterAttendeeCount;
      document.getElementById("waterCount").textContent = waterAttendeeCount;
    }
    else if (teamInput == "zero")
    {
      ++zeroAttendeeCount;
      document.getElementById("zeroCount").textContent = zeroAttendeeCount;
    }
    else if (teamInput == "power")
    {
      ++powerAttendeeCount;
      document.getElementById("powerCount").textContent = powerAttendeeCount;
    }

    // Update team attendee list
    if (teamInput == "water")
      waterAttendees.insertAdjacentHTML('afterbegin', `${nameInput}<br>`);
    else if (teamInput == "zero")
      zeroAttendees.insertAdjacentHTML('afterbegin', `${nameInput}<br>`);
    else if (teamInput == "power")
      powerAttendees.insertAdjacentHTML('afterbegin', `${nameInput}<br>`);

    // Reset form
    checkInForm.reset();

    // Reset greeting, after delay
    window.setTimeout(function ()
    {
      greeting.textContent = "";
      greeting.style.display = "none";
    }, 10000);
  }

  // Celebration
  if (attendeeCount == maxAttendeeCount)
  {
    let winner;

    if (waterAttendeeCount > zeroAttendeeCount && waterAttendeeCount > powerAttendeeCount)
      winner = "water-card";
    else if (zeroAttendeeCount > waterAttendeeCount && zeroAttendeeCount > powerAttendeeCount)
      winner = "zero-card";
    else if (powerAttendeeCount > waterAttendeeCount && powerAttendeeCount > zeroAttendeeCount)
      winner = "power-card";
    else
      winner = "";
    
    document.getElementById("celebration-message").style.display = "block";
    if (winner != "")
    { 
      document.getElementById(winner).style.boxShadow = "0 0 25px 2px gold";
      document.getElementById("celebration-message").insertAdjacentHTML('beforeend', "<br>And we have a winner!")
    }
    --maxAttendeeCount;
  }
});