const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".nav-links");
const login = document.querySelector(".login");

// this code is for the functionality of the hamburger icon for mobile and tablet view
toggleButton.addEventListener("click", () => {
  login.classList.toggle("active");
  navbarLinks.classList.toggle("active"); // Toggle "active" class on nav-links
});

// i am creating an object for currencies with currency codes as keys and url of flags as values

const currencies = {
  USD: "https://flagcdn.com/us.svg",
  EUR: "https://flagcdn.com/eu.svg",
  JPY: "https://flagcdn.com/jp.svg",
  GBP: "https://flagcdn.com/gb.svg",
  AUD: "https://flagcdn.com/au.svg",
  CAD: "https://flagcdn.com/ca.svg",
  CHF: "https://flagcdn.com/ch.svg",
  CNY: "https://flagcdn.com/cn.svg",
  SEK: "https://flagcdn.com/se.svg",
  NZD: "https://flagcdn.com/nz.svg",
  MXN: "https://flagcdn.com/mx.svg",
  SGD: "https://flagcdn.com/sg.svg",
  HKD: "https://flagcdn.com/hk.svg",
  NOK: "https://flagcdn.com/no.svg",
  KRW: "https://flagcdn.com/kr.svg",
  TRY: "https://flagcdn.com/tr.svg",
  INR: "https://flagcdn.com/in.svg",
  RUB: "https://flagcdn.com/ru.svg",
  BRL: "https://flagcdn.com/br.svg",
  ZAR: "https://flagcdn.com/za.svg",
};

// Getting HTML elements from the currency converter div
const fromFlag = document.getElementById("from-currency-flag");
const toFlag = document.getElementById("to-currency-flag");
const fromCurrencyDropdown = document.getElementById("from-currency");
const toCurrencyDropdown = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const date = document.getElementById("date");
const time = document.getElementById("time");

function populateDropdowns() {
  // Loop through the currencies object and create options
  for (const [currency, flagUrl] of Object.entries(currencies)) {
    const fromOption = document.createElement("option");
    const toOption = document.createElement("option");

    fromOption.value = toOption.value = currency;
    fromOption.textContent = toOption.textContent = currency;

    fromCurrencyDropdown.appendChild(fromOption);
    toCurrencyDropdown.appendChild(toOption);
  }
  //<option value = USD>USD</option>
  /* 
  <select id="cities" name="cities">
    <option value="newyork">New York</option>
    <option value="losangeles">Los Angeles</option>
    <option value="chicago">Chicago</option>
    <option value="houston">Houston</option>
    <option value="phoenix">Phoenix</option>
  </select> 
  */
}

// Set initial flags
/* */

// Function to update flags
function updateFlags() {
  const fromCurrency = fromCurrencyDropdown.value;
  const toCurrency = toCurrencyDropdown.value;

  fromFlag.src = currencies[fromCurrency];
  toFlag.src = currencies[toCurrency];
}

// Function to fetch exchange rates and convert currencies
async function convertCurrency() {
  const from = fromCurrencyDropdown.value;
  const to = toCurrencyDropdown.value;
  const amountToConvert = amount.value;

  if (from === to) {
    alert("Please select different currencies.");
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
    );
    const data = await response.json();
    console.log(data);
    const rate = data.conversion_rates[to];
    const convertedAmount = (amountToConvert * rate).toFixed(2);
    result.innerText = convertedAmount;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert("Error fetching exchange rates. Please try again.");
  }
}

// Populate the dropdowns when the page loads
window.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  fromCurrencyDropdown.value = "USD";
  toCurrencyDropdown.value = "EUR";
  updateFlags();
});

// Add event listeners to update flags and convert currency on changes
fromCurrencyDropdown.addEventListener("change", () => {
  updateFlags();
  convertCurrency();
});

toCurrencyDropdown.addEventListener("change", () => {
  updateFlags();
  convertCurrency();
});

amount.addEventListener("input", convertCurrency);

//setting my time and date
function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  date.innerText = formattedDate;
  time.innerText = formattedTime;
}
getDateTime();
setInterval(getDateTime, 1000); // Update every second
