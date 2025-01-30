const userIncome = document.querySelector(".user-income");
const userName = document.querySelector(".user-name");
const userGoal = document.querySelector(".user-goals");
const userInputSubmitBtn = document.querySelector(".submit-user-input");
userInputSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   validation
  if (!userName.value || !userGoal.value || !userIncome.value) {
    alert("please fill in all the inputs");
    return;
  }
  localStorage.setItem("user-income", userIncome.value);
  localStorage.setItem("user-name", userName.value);
  localStorage.setItem("user-goal", userGoal.value);
  location.href = "/home.html";
});
