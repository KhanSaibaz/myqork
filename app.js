const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const claimBtn = document.getElementById("claim-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Better Luck Try next time"},
  { minDegree: 31, maxDegree: 90, value: "Vivo T3X" },
  { minDegree: 91, maxDegree: 150, value: "Better Luck Try next time" },
  { minDegree: 151, maxDegree: 210, value: "One Plus Z2" },
  { minDegree: 211, maxDegree: 270, value: "Better Luck Try next time" },
  { minDegree: 271, maxDegree: 330, value:"Vivo T2X"},
  { minDegree: 331, maxDegree: 360, value: "Better Luck Try next time" },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels (values which are to be displayed on chart)
    labels: ["Vivo T3X", "Better Luck ", "Vivo T2X", "Better Luck", "One Plus Z2", "Better Luck"],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
        anchor: "center",
        align: "center",
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>You Win: ${i.value}</p>`;
      spinBtn.disabled = false;
      claimBtn.style.display = 'block'; // Show claim reward button
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  claimBtn.style.display = 'none'; // Hide claim reward button while spinning
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for pie chart
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
// Function to redirect to form.html
function redirectToForm() {
  window.location.href = 'form.html';
}
