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
