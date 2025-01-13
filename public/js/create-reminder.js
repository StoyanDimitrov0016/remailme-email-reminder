const frequencySelect = document.getElementById("frequency");
const form = document.getElementById("create-reminder-form");

const optionsContainer = document.getElementById("options-container");
console.log(optionsContainer);

const weeklyOptions = optionsContainer.querySelector("#weekly-options");
const oneTimeOptions = optionsContainer.querySelector("#one-time-options");

optionsContainer.removeChild(weeklyOptions);

function clearOptions() {
  if (optionsContainer.contains(weeklyOptions)) {
    optionsContainer.removeChild(weeklyOptions);
  }
  if (optionsContainer.contains(oneTimeOptions)) {
    optionsContainer.removeChild(oneTimeOptions);
  }
}

frequencySelect.addEventListener("change", () => {
  clearOptions();
  if (frequencySelect.value === "weekly") {
    optionsContainer.append(weeklyOptions);
  } else if (frequencySelect.value === "one-time") {
    optionsContainer.append(oneTimeOptions);
  }
});
