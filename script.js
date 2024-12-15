// Load lens data (replace with the actual path to your JSON or CSV file)
const lensData = [
    { fullFrame: "Nikon 50mm f/1.8", apsc: "Fujifilm 35mm f/1.4", cropFactor: 1.5 },
    { fullFrame: "Nikon 24mm f/2.8", apsc: "Fujifilm 16mm f/2.0", cropFactor: 1.5 },
    // Add more entries from your data
  ];
  
  // Populate the dropdown menu with full-frame lenses
  const lensSelect = document.getElementById("lensSelect");
  lensData.forEach((lens, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = lens.fullFrame;
    lensSelect.appendChild(option);
  });
  
  // Event listener for finding equivalent
  document.getElementById("findEquivalent").addEventListener("click", () => {
    const selectedIndex = lensSelect.value;
    if (selectedIndex === "") {
      alert("Please select a lens.");
      return;
    }
    const selectedLens = lensData[selectedIndex];
    const { apsc, cropFactor } = selectedLens;
  
    // Display the result
    document.getElementById("result").innerHTML = `
      <p><strong>APS-C Equivalent:</strong> ${apsc}</p>
      <p><strong>Crop Factor:</strong> ${cropFactor}x</p>
    `;
  });
  