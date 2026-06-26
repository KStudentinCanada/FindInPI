// ======================================
// PI BIRTHDAY FINDER
// Frontend JavaScript
// ======================================

// HTML Elements
const birthdayInput = document.getElementById("birthday");
const searchBtn = document.getElementById("searchBtn");

const loadingSection = document.getElementById("loadingSection");
const resultSection = document.getElementById("resultSection");

const birthdayText = document.getElementById("birthdayText");
const digitPosition = document.getElementById("digitPosition");
const digitSnippet = document.getElementById("digitSnippet");

// Change this later if your backend URL changes
const API_URL = "http://localhost:3000/search";

// ======================================
// Search Button
// ======================================

searchBtn.addEventListener("click", async () => {

    const birthday = birthdayInput.value;

    if (!birthday) {
        alert("Please select your birthday.");
        return;
    }

    // Convert YYYY-MM-DD → MMDDYYYY
    const formattedBirthday = formatBirthday(birthday);

    // Show loading
    showLoading();

    try {

        // ----------------------------------
        // Send request to backend
        // ----------------------------------

        const response = await fetch(`${API_URL}?number=${formattedBirthday}`);

        if (!response.ok) {
            throw new Error("Server error.");
        }

        const data = await response.json();

        hideLoading();

        showResult(formattedBirthday, data);

    } catch (error) {

        hideLoading();

        alert("Could not connect to the server.");

        console.error(error);

    }

});

// ======================================
// Convert Birthday
// YYYY-MM-DD -> MMDDYYYY
// ======================================

function formatBirthday(date) {

    const [year, month, day] = date.split("-");

    return `${month}${day}${year}`;

}

// ======================================
// Loading
// ======================================

function showLoading() {

    loadingSection.classList.remove("hidden");

    resultSection.classList.add("hidden");

}

function hideLoading() {

    loadingSection.classList.add("hidden");

}

// ======================================
// Display Result
// ======================================

function showResult(birthday, data) {

    resultSection.classList.remove("hidden");

    birthdayText.textContent = birthday;

    if (data.found) {

        digitPosition.textContent =
            `Digit #${Number(data.position).toLocaleString()}`;

        // If backend returns a snippet
        if (data.snippet) {

            digitSnippet.innerHTML = data.snippet;

        } else {

            digitSnippet.innerHTML =
                "<em>Snippet will be available soon.</em>";

        }

    }

    else {

        digitPosition.textContent =
            "Not found in the first 1,000,000 digits.";

        digitSnippet.innerHTML =
            "<em>No matching sequence found.</em>";

    }

}
