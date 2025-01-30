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
  if (isNaN(+userIncome.value) || Number(+userIncome.value) <= 0) {
    console.log(userIncome.value);
    alert("Please enter a valid and positive income value.");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(userName)) {
    alert("Please enter a valid names.");
    return false;
  }
  if (!/^[a-zA-Z0-9\s,]+$/.test(userGoal.value)) {
    alert(
      "Please enter valid targets that contain only letters, numbers, and commas."
    );
    return false;
  }

  localStorage.setItem("user-income", userIncome.value);
  localStorage.setItem("user-name", userName.value);
  localStorage.setItem("user-goal", userGoal.value);
  location.href = "/home.html";
});
