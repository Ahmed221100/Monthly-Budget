const incomeAmountField = document.querySelector(".income-amount");
const availableAmountField = document.querySelector(".available-amount");
const spentAmountField = document.querySelector(".spent-amount");
const spentPercentageField = document.querySelector(".spent-percentage");
let income = localStorage.getItem("user-income");
let spent = 0;
let budgetChart;
const calculateExpenses = () => {
  income = localStorage.getItem("user-income");
  spent = getExpensesFromLocalStorage();
  getExpensesFromLocalStorage();
  incomeAmountField.innerHTML = `&pound;${income}`;
  spentAmountField.innerHTML = `&pound;${spent}`;
  availableAmountField.innerHTML = `&pound;${income - spent}`;
  crateChart();
};
const getExpensesFromLocalStorage = () => {
  let expenses = JSON.parse(localStorage.getItem("curr-expenses"));
  let total = 0;
  expenses?.map((e) => {
    total += +e.amount;
  });
  return total;
};
// chart js
const crateChart = () => {
  const ctx = document.querySelector(".budget-chart").getContext("2d");

  if (budgetChart) {
    budgetChart.destroy();
  }

  let spentPercentage = (spent / income) * 100;
  spentPercentageField.innerText = `${spentPercentage.toFixed(2)}%`;

  const data = {
    labels: ["Spent", "Available"],
    datasets: [
      {
        data: [spentPercentage, 100 - spentPercentage],
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
              return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} %`;
            },
          },
        },
      },
      cutout: "85%",
    },
  };

  // Assign the new chart instance to budgetChart
  budgetChart = new Chart(ctx, config);
};

// document.addEventListener("DOMContentLoaded", );

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
    id: Date.now(),
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
  // recalculating the buget
  calculateExpenses();
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
  calculateExpenses();
};
window.addEventListener("load", calculateExpenses);
