// chart js

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.querySelector(".budget-chart").getContext("2d");

  const data = {
    labels: ["Spent", "Available"],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ["#51D289", "#D2D2D2"],
        borderWidth: 0,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw} %`;
            },
          },
        },
      },
      cutout: "85%",
    },
  };

  const budgetChart = new Chart(ctx, config);
});

const newExpenseBtn = document.querySelector(".new-expense");
const newExpenseForm = document.querySelector(".new-expense-form");

newExpenseBtn.addEventListener("click", () => {
  newExpenseForm.classList.toggle("active");
});

const expenseTitle = document.querySelector(".expense-title");
const expenseAmount = document.querySelector(".expense-amount");
const submitExpenseBtn = document.getElementById("add-expense");
const expensesTypesList = document.querySelector(".expenses-types");

submitExpenseBtn.addEventListener("click", () => {
  const currentExpenses = JSON.parse(localStorage.getItem("curr-expenses"));
  const date = new Date();
  const expenseType = document.querySelector(".selected-type .type");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currDate = `${
    monthNames[date.getMonth()]
  }, ${date.getDate()}-${date.getFullYear()}`;
  // creating new expense object
  const newExpense = {
    title: expenseTitle.value,
    amount: expenseAmount.value,
    type: {
      text: expenseType.querySelector("p").innerText,
      imgPath: expenseType.querySelector("img").getAttribute("src"),
    },
    date: currDate,
    id: Date.now()
  };
  // verification
  if (!expenseAmount.value || !expenseTitle.value) {
    alert("please fill in the title and amount for the expense");
    return;
  }
  // saving to local storage
  if (currentExpenses) {
    localStorage.setItem(
      "curr-expenses",
      JSON.stringify([...currentExpenses, newExpense])
    );
  } else {
    localStorage.setItem("curr-expenses", JSON.stringify([newExpense]));
  }

  // resetting input value
  expenseAmount.value = "";
  expenseTitle.value = "";
  selectedTypeContainer.innerHTML = `<div class="type">
                  <div class="img-container">
                    <img src="./assets/creditcart.svg" alt="debit-icon" />
                  </div>
                  <p>Debit</p>
                </div>`;
  newExpenseForm.classList.remove("active");
});
const openExpensesTypesMenu = () => {
  expensesTypesList.classList.toggle("active");
};
// changing current expense's image and text to save it dynamicaly later
const typesArray = document.querySelectorAll(".expenses-types .type");
const selectedTypeContainer = document.querySelector(".selected-type");
typesArray.forEach((type) =>
  type.addEventListener("click", () => {
    selectedTypeContainer.innerHTML = `<div class="type">${type.innerHTML}</div>`;
    expensesTypesList.classList.remove("active");
  })
);

const ResetAllExpenses = () => {
  localStorage.removeItem("curr-expenses");
};
