const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

let yearsText = document.getElementById("years");
let monthText = document.getElementById("months");
let dayText = document.getElementById("days");
let errorText = document.getElementsByClassName("error");
let labelText = document.getElementsByClassName("label");
let inputField = document.getElementsByClassName("input-field");

function validateDate(day, month, year) {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  return day <= lastDayOfMonth;
}

function animateNumber(element, finalValue) {
  let startValue = 0;
  const duration = 1000; // Dauer der Animation in Millisekunden
  const interval = 10; // Intervall für jeden Schritt der Animation in Millisekunden

  const stepValue = (finalValue - startValue) / (duration / interval);

  function updateNumber(currentValue) {
    element.innerText = Math.round(currentValue);
  }

  function animate(currentValue) {
    updateNumber(currentValue);

    if (currentValue < finalValue) {
      requestAnimationFrame(() => animate(currentValue + stepValue));
    } else {
      updateNumber(finalValue);
      element.classList.add("animated"); // Füge die Klasse für die Animation hinzu
    }
  }

  animate(startValue);
}

function calculate() {
  const isValidDate = validateDate(day.value, month.value, year.value);

  if (day.value === "" || month.value === "" || year.value === "") {
    for (let i = 0; i < errorText.length; i++) {
      errorText[i].style.opacity = "1";
      errorText[i].innerText = "This field is required";
    }
    for (let i = 0; i < labelText.length; i++) {
      labelText[i].style.color = "var(--light-red)";
    }
    for (let i = 0; i < inputField.length; i++) {
      inputField[i].style.borderColor = "var(--light-red)";
    }
  } else if (
    day.value > 31 ||
    day.value < 1 ||
    month.value > 12 ||
    month.value < 1 ||
    year.value > 2024 ||
    year.value < 1
  ) {
    for (let i = 0; i < errorText.length; i++) {
      errorText[i].style.opacity = "1";
      errorText[0].innerText = "Must be a valid day";
      errorText[1].innerText = "Must be a valid month";
      errorText[2].innerText = "Must be a valid year";
    }
    for (let i = 0; i < labelText.length; i++) {
      labelText[i].style.color = "var(--light-red)";
    }
    for (let i = 0; i < inputField.length; i++) {
      inputField[i].style.borderColor = "var(--light-red)";
    }
  } else if (!isValidDate) {
    for (let i = 0; i < errorText.length; i++) {
      errorText[0].style.opacity = "1";
      errorText[0].innerText = "Must be a valid date";
    }
    for (let i = 0; i < labelText.length; i++) {
      labelText[i].style.color = "var(--light-red)";
    }
    for (let i = 0; i < inputField.length; i++) {
      inputField[i].style.borderColor = "var(--light-red)";
    }
  } else {
    const currentDate = new Date();
    const birthDate = new Date(
      parseInt(year.value),
      parseInt(month.value) - 1,
      parseInt(day.value)
    );

    let calcYears = currentDate.getFullYear() - birthDate.getFullYear();
    let calcMonths = currentDate.getMonth() - birthDate.getMonth();
    let calcDays = currentDate.getDate() - birthDate.getDate();

    // Check if birthday already happened
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      calcYears--;
      calcMonths = 12 - birthDate.getMonth() + currentDate.getMonth() - 1;
      calcDays = currentDate.getDate() - birthDate.getDate();
      if (calcDays < 0) {
        // Korrektur, wenn der Geburtstag bereits stattgefunden hat
        const lastDayOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        calcDays += lastDayOfLastMonth;
      }
    }

    for (let i = 0; i < errorText.length; i++) {
      errorText[i].style.opacity = "0";
      errorText[i].innerText = "Error";
    }
    for (let i = 0; i < labelText.length; i++) {
      labelText[i].style.color = "var(--smokey-grey)";
    }
    for (let i = 0; i < inputField.length; i++) {
      inputField[i].style.borderColor = "var(--smokey-grey)";
    }

    yearsText.innerHTML = calcYears;
    monthText.innerHTML = calcMonths;
    dayText.innerHTML = calcDays;
    animateNumber(yearsText, calcYears);
    animateNumber(monthText, calcMonths);
    animateNumber(dayText, calcDays);
  }
}
