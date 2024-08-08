const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const prizeImage = document.getElementById("prize-image");
const prizeText = document.getElementById("prize-text");
const claimBtn = document.getElementById("claim-btn");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2, text: "Prize 2", image: "../assets/prize2.png" },
  { minDegree: 31, maxDegree: 90, value: 1, text: "Prize 1", image: "../assets/prize1.png" },
  { minDegree: 91, maxDegree: 150, value: 6, text: "Prize 6", image: "../assets/prize6.png" },
  { minDegree: 151, maxDegree: 210, value: 5, text: "Prize 5", image: "../assets/prize5.png" },
  { minDegree: 211, maxDegree: 270, value: 4, text: "Prize 4", image: "../assets/prize4.png" },
  { minDegree: 271, maxDegree: 330, value: 3, text: "Prize 3", image: "../assets/prize3.png" },
  { minDegree: 331, maxDegree: 360, value: 2, text: "Prize 2", image: "../assets/prize2.png" },
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
    // Labels(values which are to be displayed on chart)
    labels: [, 'Better Luck Try Next Time', 3, 'Better Luck Try Next Time', 5, 'Better Luck Try Next Time'],
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
        font: { size: 24 },
      },
    },
  },
});
// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      prizeImage.src = i.image;
      prizeText.textContent = i.text;
      popup.style.display = "flex";
      spinBtn.disabled = false;
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
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 for every rotation until resultValue is 1.
    1 rotation == 360 degrees. 
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value
    myChart.update();
    // If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 1;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

// Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Redirect to claim form
claimBtn.addEventListener("click", () => {
  window.location.href = "claim-form.html";
});
