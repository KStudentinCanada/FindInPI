// =========================================
// PI BIRTHDAY FINDER
// Frontend JavaScript
// =========================================

let pi = "";

// HTML Elements
const birthdayInput = document.getElementById("birthday");
const searchBtn = document.getElementById("searchBtn");

const loadingSection = document.getElementById("loadingSection");
const resultSection = document.getElementById("resultSection");

const birthdayText = document.getElementById("birthdayText");
const digitPosition = document.getElementById("digitPosition");
const digitSnippet = document.getElementById("digitSnippet");

// =========================================
// Load pi.txt
// =========================================

async function loadPi() {

    try {

        const response = await fetch("pi.txt");

        pi = await response.text();

        console.log(`Loaded ${pi.length} digits of π`);

    }

    catch (error) {

        alert("Unable to load pi.txt");

        console.error(error);

    }

}

loadPi();

// =========================================
// Search Button
// =========================================

searchBtn.addEventListener("click", searchPi);

// =========================================
// Search
// =========================================

function searchPi() {

    if (pi === "") {

        alert("Pi is still loading. Please wait.");

        return;

    }

    const rawDate = birthdayInput.value;

    if (!rawDate) {

        alert("Please choose your birthday.");

        return;

    }

    // Convert:
    // 2008-07-14
    // ->
    // 20080714

    const birthday = rawDate.replace(/-/g, "");

    const targets = [

        {
            type: "YYYYMMDD",
            value: birthday
        },

        {
            type: "YYMMDD",
            value: birthday.slice(2)
        },

        {
            type: "MMDD",
            value: birthday.slice(4)
        }

    ];

    showLoading();

    // Small delay so loading animation is visible

    setTimeout(() => {

        performSearch(targets);

    }, 600);

}

// =========================================
// Perform Search
// =========================================

function performSearch(targets) {

    for (const target of targets) {

        const index = pi.indexOf(target.value);

        if (index !== -1) {

            const start = index + 1;
            const end = start + target.value.length - 1;

            const before =
                pi.slice(Math.max(0, index - 10), index);

            const after =
                pi.slice(
                    index + target.value.length,
                    index + target.value.length + 10
                );

            hideLoading();

            showResult(
                target,
                start,
                end,
                before,
                after
            );

            return;

        }

    }

    hideLoading();

    resultSection.classList.remove("hidden");

    birthdayText.textContent =
        birthdayInput.value;

    digitPosition.textContent =
        "Not found";

    digitSnippet.innerHTML =
        "<em>Your birthday wasn't found in the first 1,000,000 digits.</em>";

}

// =========================================
// Loading
// =========================================

function showLoading() {

    loadingSection.classList.remove("hidden");

    resultSection.classList.add("hidden");

}

function hideLoading() {

    loadingSection.classList.add("hidden");

}

// =========================================
// Show Result
// =========================================

function showResult(target, start, end, before, after) {

    resultSection.classList.remove("hidden");

    birthdayText.textContent =
        birthdayInput.value;

    digitPosition.textContent =
        `Digits ${start.toLocaleString()} - ${end.toLocaleString()}`;

    digitSnippet.innerHTML = `

${before}
<span class="highlight">${target.value}</span>
${after}

<br><br>

<strong>Matched Format:</strong> ${target.type}

`;

}
