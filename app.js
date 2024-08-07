let currentImageIndex = 0; // To keep track of the current image
const prizes = [
    { name: "OnePlus 9RT", image: "./assets/image1.png" },
    { name: "Vivo T3", image: "./assets/image2.png" },
    { name: "Vivo T2", image: "./assets/image3.png" },
];

function spin() {
    const box = document.getElementById('box');
    const randomDegree = Math.floor(Math.random() * 360 + 3600); // Spin at least 10 full rotations
    const spinWheel = document.querySelector('.spin-wheel'); // Select the spin wheel image
    spinWheel.style.transition = 'transform 4s ease-out'; // Set the transition for smooth rotation
    spinWheel.style.transform = `rotate(${randomDegree}deg)`; // Rotate the wheel

    // Update the current image index for the next spin
    currentImageIndex = Math.floor(Math.random() * prizes.length); // Randomly select a prize

    // Show the popup after the spin
    setTimeout(() => {
        showPopup(prizes[currentImageIndex]);
    }, 4000); // Match the timeout with the spin duration
}

function showPopup(prize) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
            <h2>Congratulations! You win a ${prize.name}!</h2>
            ${prize.image ? `<img src="${prize.image}" alt="${prize.name}" style="width: 200px; height: auto; margin: 10px 0;">` : ''}
            <button onclick="window.location.href='form.html'" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Claim Your Prize</button>
        </div>
    `;
    document.body.appendChild(popup);
}