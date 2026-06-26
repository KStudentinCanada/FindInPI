// ======================================
// PI BIRTHDAY FINDER
// GitHub Pages Version
// ======================================

// HTML Elements
const birthdayInput = document.getElementById("birthday");
const searchBtn = document.getElementById("searchBtn");

const loadingSection = document.getElementById("loadingSection");
const resultSection = document.getElementById("resultSection");

const birthdayText = document.getElementById("birthdayText");
const digitPosition = document.getElementById("digitPosition");
const digitSnippet = document.getElementById("digitSnippet");

// Store pi digits
let pi = "";

// ======================================
// Load pi.txt when page opens
// ======================================

async function loadPi() {
    try {
        const response = await fetch("pi.txt");

        if (!response.ok) {
            throw new Error("Could not load pi.txt");
        }

        pi = await response.text();

        console.log("Pi loaded successfully!");
    }
    catch (error) {
        alert("Could not load pi.txt.");
        console.error(error);
    }
}

loadPi();

// ======================================
// Search Button
// ======================================

searchBtn.addEventListener("click", () => {

    if (pi.length === 0) {
        alert("Pi is still loading. Please wait a few seconds.");
        return;
    }

    const birthday = birthdayInput.value;

    if (!birthday) {
        alert("Please select your birthday.");
        return;
    }

    const formattedBirthday = formatBirthday(birthday);

    showLoading();

    // Give loading animation a chance to appear
    setTimeout(() => {

        const position = pi.indexOf(formattedBirthday);

        hideLoading();

        if (position !== -1) {

            const start = Math.max(0, position - 15);
            const end = Math.min(pi.length, position + formattedBirthday.length + 15);

            const snippet =
                pi.substring(start, position) +
                "<strong>" +
                formattedBirthday +
                "</strong>" +
                pi.substring(position + formattedBirthday.length, end);

            showResult(formattedBirthday, {
                found: true,
                position: position + 1,
                snippet: snippet
            });

        } else {

            showResult(formattedBirthday, {
                found: false
            });

        }

    }, 100);

});

// ======================================
// Convert Birthday
// YYYY-MM-DD → MMDDYYYY
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
            `Digit #${data.position.toLocaleString()}`;

        digitSnippet.innerHTML = data.snippet;

    }
    else {

        digitPosition.textContent =
            "Not found in the digits of π.";

        digitSnippet.innerHTML =
            "<em>No matching sequence found.</em>";

    }

}
