// ==================================
// DAYLUME - DATE, TIME AND GREETING
// ==================================


// 1. GET CURRENT DATE AND TIME

function updateDateTime() {

    const now = new Date();

    const hour = now.getHours();

    // 2. SELECT GREETING

    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
    }
    else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
    }
    else if (hour >= 17 && hour < 21) {
        greeting = "Good evening";
    }
    else {
        greeting = "Good night";
    }

    // 3. DISPLAY GREETING

    const greetingElement =
        document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.textContent =
            greeting + ", Rakshita! 🤎";
    }

    // 4. DISPLAY DATE

    const dateElement =
        document.getElementById("current-date");

    if (dateElement) {
        dateElement.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    // 5. DISPLAY TIME

    const timeElement =
        document.getElementById("current-time");

    if (timeElement) {
        timeElement.textContent =
            now.toLocaleTimeString("en-IN");
    }

}


// 6. RUN THE FUNCTION

updateDateTime();


// 7. UPDATE CLOCK EVERY SECOND

setInterval(updateDateTime, 1000);

// ==================================
// DAYLUME - DAILY STEP TRACKER
// ==================================

const STEP_GOAL = 8000;

// Get today's date
function getTodayDate() {
    return new Date().toLocaleDateString("en-CA");
}

// Load today's saved steps
function loadSteps() {

    const today = getTodayDate();

    const allSteps =
        JSON.parse(localStorage.getItem("daylumeSteps")) || {};

    const todaySteps = allSteps[today] || 0;

    document.getElementById("step-input").value =
        todaySteps;

    updateStepProgress(todaySteps);
}


// Update step progress
function updateStepProgress(steps) {

    const remaining = Math.max(0, STEP_GOAL - steps);

    const progressElement =
        document.getElementById("step-progress");

    if (progressElement) {

        progressElement.textContent =
            steps + " / " + STEP_GOAL +
            " steps completed. " +
            remaining + " steps remaining.";

        if (steps >= STEP_GOAL) {
            progressElement.textContent =
                "Amazing! Your daily step goal is complete! 🤎";
        }
    }
}


// Save today's steps
document.getElementById("save-steps")
    .addEventListener("click", function() {

        const input =
            document.getElementById("step-input");

        const steps = Number(input.value);

        if (
            input.value.trim() === "" ||
            !Number.isInteger(steps) ||
            steps < 0
        ) {
            alert("Please enter a valid step count.");
            return;
        }

        const today = getTodayDate();

        const allSteps =
            JSON.parse(localStorage.getItem("daylumeSteps")) || {};

        allSteps[today] = steps;

        localStorage.setItem(
            "daylumeSteps",
            JSON.stringify(allSteps)
        );

        updateStepProgress(steps);

        alert("Your steps have been saved! 🤎");

    });


// Load saved steps when dashboard opens
if (document.getElementById("step-input")) {
    loadSteps();
}
// ==================================
// DAYLUME - WATER TRACKER
// ==================================

const WATER_GOAL = 13;


// Load today's water count
function loadWater() {

    const today = getTodayDate();

    const allWater =
        JSON.parse(localStorage.getItem("daylumeWater")) || {};

    const todayWater = allWater[today] || 0;

    updateWaterDisplay(todayWater);
}


// Update water display
function updateWaterDisplay(count) {

    document.getElementById("water-count").textContent =
        count + " / " + WATER_GOAL + " glasses";
}


// Save water count
function saveWater(count) {

    const today = getTodayDate();

    const allWater =
        JSON.parse(localStorage.getItem("daylumeWater")) || {};

    allWater[today] = count;

    localStorage.setItem(
        "daylumeWater",
        JSON.stringify(allWater)
    );

    updateWaterDisplay(count);
}


// Add one glass
document.getElementById("add-water")
    .addEventListener("click", function() {

        const today = getTodayDate();

        const allWater =
            JSON.parse(localStorage.getItem("daylumeWater")) || {};

        let count = allWater[today] || 0;

        count++;

        saveWater(count);

    });


// Remove one glass
document.getElementById("remove-water")
    .addEventListener("click", function() {

        const today = getTodayDate();

        const allWater =
            JSON.parse(localStorage.getItem("daylumeWater")) || {};

        let count = allWater[today] || 0;

        if (count > 0) {
            count--;
        }

        saveWater(count);

    });


// Load saved water count
if (document.getElementById("water-count")) {
    loadWater();
}

// ==================================
// DAYLUME - MORNING YOGA TRACKER
// ==================================

function loadYoga() {

    const today = getTodayDate();

    const allYoga =
        JSON.parse(localStorage.getItem("daylumeYoga")) || {};

    const completed = allYoga[today] || false;

    document.getElementById("yoga-check").textContent =
        completed ? "Yoga Completed ✓" : "Mark Yoga Complete";

    const savedTime =
        localStorage.getItem("daylumeYogaTime");

    document.getElementById("yoga-time").value =
        savedTime || "";
}


// Save or change reminder time
document.getElementById("save-yoga-time")
    .addEventListener("click", function() {

        const time =
            document.getElementById("yoga-time").value;

        if (!time) {
            alert("Please select a time.");
            return;
        }

        localStorage.setItem("daylumeYogaTime", time);

        alert("Yoga reminder time updated! 🤎");

    });


// Complete yoga
document.getElementById("yoga-check")
    .addEventListener("click", function() {

        const today = getTodayDate();

        const allYoga =
            JSON.parse(localStorage.getItem("daylumeYoga")) || {};

        allYoga[today] = true;

        localStorage.setItem(
            "daylumeYoga",
            JSON.stringify(allYoga)
        );

        loadYoga();

    });


// Load saved information
if (document.getElementById("yoga-check")) {
    loadYoga();
}
// ==================================
// DAYLUME - DAILY WELLNESS JOURNEY
// ==================================


   function loadChallenge() {

    const today = getTodayDate();

    let challengeData =
        JSON.parse(localStorage.getItem("daylumeChallenge")) || {};

    if (!challengeData.startDate) {
        challengeData.startDate = today;
    }

    if (!Array.isArray(challengeData.completedDates)) {
        challengeData.completedDates = [];
    }

    // Keep the extended journey duration
    if (!challengeData.totalDays || challengeData.totalDays < 14) {
        challengeData.totalDays = 14;
    }

    const completedDates = challengeData.completedDates;
    const totalDays = challengeData.totalDays;

    // Calculate current challenge day
    const start = new Date(challengeData.startDate + "T00:00:00");
    const current = new Date(today + "T00:00:00");

    const dayNumber =
        Math.max(1, Math.floor((current - start) / 86400000) + 1);

    // Calculate progress
    const completedCount = completedDates.length;

    const remaining =
        Math.max(0, totalDays - completedCount);

    // Calculate current streak
    let streak = 0;
    let checkDate = new Date(current);

    while (true) {

        const dateString =
            checkDate.getFullYear() + "-" +
            String(checkDate.getMonth() + 1).padStart(2, "0") + "-" +
            String(checkDate.getDate()).padStart(2, "0");

        if (completedDates.includes(dateString)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    // Display progress
    const dayElement = document.getElementById("challenge-day");
    const progressElement = document.getElementById("challenge-progress");
    const streakElement = document.getElementById("challenge-streak");
    const remainingElement = document.getElementById("challenge-remaining");

    if (dayElement) {
        dayElement.textContent = "Day " + dayNumber;
    }

    if (progressElement) {
        progressElement.textContent =
            "Completed days: " + completedCount + " / " + totalDays;
    }

    if (streakElement) {
        streakElement.textContent =
            "Current streak: " + streak + " days";
    }

    if (remainingElement) {
        remainingElement.textContent =
            remaining > 0
                ? remaining + " check-ins left in your journey."
                : "You've completed your current journey! Keep going! 🤎";
    }

    // Update check-in button
    const button = document.getElementById("sugar-check");

    if (button) {

        if (completedDates.includes(today)) {
            button.textContent = "Today's Check-in Completed ✓";
            button.disabled = true;
        } else {
            button.textContent = "Complete Today's Check-in";
            button.disabled = false;
        }
    }

    // Save updated challenge data
    localStorage.setItem(
        "daylumeChallenge",
        JSON.stringify(challengeData)
    );
}

   

// ==================================
// DAYLUME - PROGRESS CALENDAR
// ==================================

const INITIAL_CHALLENGE_DAYS = 14;


// Get challenge information
function getCalendarData() {

    const today = getTodayDate();

    let data =
        JSON.parse(localStorage.getItem("daylumeChallenge")) || {};

    if (!data.startDate) {
        data.startDate = today;
    }

    if (!data.completedDates) {
        data.completedDates = [];
    }

    if (!data.totalDays) {
        data.totalDays = INITIAL_CHALLENGE_DAYS;
    }

    localStorage.setItem(
        "daylumeChallenge",
        JSON.stringify(data)
    );

    return data;
}


// Format date without timezone problems
function formatCalendarDate(date) {

    const day = String(date.getDate()).padStart(2, "0");

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    return year + "-" + month + "-" + day;
}


// Display calendar
function displayCalendar() {

    const container =
        document.getElementById("calendar-container");

    if (!container) return;

    const data = getCalendarData();

    const startDate = new Date(
        data.startDate + "T00:00:00"
    );

    const today = getTodayDate();

    container.innerHTML = "";

    document.getElementById("calendar-title").textContent =
        "Your " + data.totalDays + "-Day Journey";


    for (let i = 0; i < data.totalDays; i++) {

        const date = new Date(startDate);

        date.setDate(startDate.getDate() + i);

        const dateString = formatCalendarDate(date);

        const isCompleted =
            data.completedDates.includes(dateString);

        let status = "Upcoming";

        if (isCompleted) {
            status = "Completed ✓";
        }
        else if (dateString === today) {
            status = "Today";
        }
        else if (dateString < today) {
            status = "Missed";
        }

        const dayCard = document.createElement("div");

        dayCard.className = "calendar-day";

        dayCard.innerHTML = `
            <strong>Day ${i + 1}</strong>
            <span>${date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short"
            })}</span>
            <small>${status}</small>
        `;

        if (isCompleted) {
            dayCard.classList.add("completed");
        }
        else if (dateString === today) {
            dayCard.classList.add("today");
        }
        else if (dateString < today) {
            dayCard.classList.add("missed");
        }

        container.appendChild(dayCard);
    }

}


// Extend challenge by 14 days
const extendButton =
    document.getElementById("extend-challenge");

if (extendButton) {

    extendButton.addEventListener("click", function() {

        const data = getCalendarData();

        data.totalDays += 14;

        localStorage.setItem(
            "daylumeChallenge",
            JSON.stringify(data)
        );

        displayCalendar();

        alert("Your Daylume journey has been extended! 🤎");

    });

}


// Load calendar
if (document.getElementById("calendar-container")) {
    displayCalendar();
}// ==================================
// DAYLUME - FOOD DIARY
// ==================================

function loadFoodDiary() {

    const today = getTodayDate();

    const allMeals =
        JSON.parse(localStorage.getItem("daylumeFood")) || {};

    const todayMeals = allMeals[today] || [];

    const diary = document.getElementById("food-diary");

    if (!diary) return;

    diary.innerHTML = "";

    if (todayMeals.length === 0) {
        diary.textContent = "No meals recorded yet. 🤎";
        return;
    }

    todayMeals.forEach(function(meal) {

        const entry = document.createElement("p");

        entry.textContent = meal.type + ": " + meal.food;

        diary.appendChild(entry);

    });
}


// Save a meal
const saveFoodButton = document.getElementById("save-food");

if (saveFoodButton) {

    saveFoodButton.addEventListener("click", function() {

        const today = getTodayDate();

        const mealType =
            document.getElementById("meal-type").value;

        const food =
            document.getElementById("food-input").value.trim();

        if (!food) {
            alert("Please enter what you ate.");
            return;
        }

        const allMeals =
            JSON.parse(localStorage.getItem("daylumeFood")) || {};

        if (!allMeals[today]) {
            allMeals[today] = [];
        }

        allMeals[today].push({
            type: mealType,
            food: food
        });

        localStorage.setItem(
            "daylumeFood",
            JSON.stringify(allMeals)
        );

        document.getElementById("food-input").value = "";

        loadFoodDiary();

        alert("Meal saved successfully! 🤎");

    });

}


// Load today's meals
loadFoodDiary();

// ==================================
 // DAYLUME - MEAL SUGGESTIONS
 // ==================================

const suggestionButton =
    document.getElementById("get-food-suggestion");

if (suggestionButton) {

    suggestionButton.addEventListener("click", function() {

        const question =
            document.getElementById("food-question")
                .value.trim().toLowerCase();

        const result =
            document.getElementById("food-suggestion");

        if (!question) {
            result.textContent = "Tell me what you're craving! 🤎";
            return;
        }

        let suggestion =
            "Enjoy your meal! Try including a source of protein, some vegetables or fruit, and enough food to feel comfortably satisfied.";

        if (question.includes("dosa")) {
            suggestion =
                "Dosa idea: Enjoy your dosa with sambar for protein and vegetables, plus chutney. 🤎";
        }

        else if (question.includes("idli")) {
            suggestion =
                "Idli idea: Pair idlis with sambar and chutney for a satisfying, balanced meal.";
        }

        else if (question.includes("poha")) {
            suggestion =
                "Poha idea: Add peas or peanuts, and enjoy it with curd or milk for a more balanced meal.";
        }

        else if (question.includes("rice")) {
            suggestion =
                "Rice idea: Enjoy rice with dal, curd and a vegetable sabji. A lovely balanced combination!";
        }

        else if (question.includes("roti") ||
                 question.includes("chapati")) {
            suggestion =
                "Roti idea: Pair your rotis with dal or another protein-rich dish and some vegetable sabji.";
        }

        else if (question.includes("pizza")) {
            suggestion =
                "Pizza is okay to enjoy! You can pair it with a side salad or some vegetables if you like.";
        }

        else if (question.includes("sweet") ||
                 question.includes("chocolate")) {
            suggestion =
                "You can enjoy something sweet! Have what you like, and continue with your regular balanced meals.";
        }

        else if (question.includes("sandwich")) {
            suggestion =
                "Sandwich idea: Add vegetables and a filling such as paneer, cheese or beans. Enjoy it with fruit or curd.";
        }

        result.textContent = suggestion;

    });

}


 