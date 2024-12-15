// PapaParse loading script
document.getElementById("loadCSV").addEventListener("click", () => {
    Papa.parse("lens_data.csv", {
      download: true, // This tells PapaParse to fetch the file from the server
      header: true,   // This treats the first row as headers
      complete: function(results) {
        const lensData = results.data;
        console.log(lensData); // Check if the data loads correctly in the console
        populateDropdown(lensData); // Pass data to populate the dropdown
      },
      error: function(error) {
        console.error("Error parsing the CSV file:", error);
      }
    });
  });
  
  // Function to populate dropdown
  function populateDropdown(lensData) {
    const lensSelect = document.getElementById("lensSelect");
    lensData.forEach((lens, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${lens["Lens Mount"]} - ${lens["Lens Focal length in mm"]}mm f/${lens["Aperture in f-stop"]}`;
      lensSelect.appendChild(option);
    });
  }

// Lens data from CSV (you'll later load this dynamically)
const lensData = [
    {
      mount: "Fujifilm X",
      cropFactor: 1.5,
      focalLength: 16,
      fullFrameFocal: 24,
      aperture: 1.4,
      fullFrameAperture: 2.1,
      weight: 375,
      length: 73,
      weatherSealing: "Yes"
    },
    {
      mount: "Nikon Z",
      cropFactor: 1,
      focalLength: 24,
      fullFrameFocal: 24,
      aperture: 1.8,
      fullFrameAperture: 1.8,
      weight: 450,
      length: 97,
      weatherSealing: "Yes"
    }
  ];
  
  // Populate the dropdown menu with full-frame lenses
  const lensSelect = document.getElementById("lensSelect");
  lensData.forEach((lens, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${lens.mount} - ${lens.focalLength}mm f/${lens.aperture}`;
    lensSelect.appendChild(option);
  });
  
  // Event listener for comparison
  document.getElementById("compareLens").addEventListener("click", () => {
    const selectedIndex = lensSelect.value;
    if (selectedIndex === "") {
      alert("Please select a lens.");
      return;
    }
    
    const selectedLens = lensData[selectedIndex];
    const cropFactor = selectedLens.cropFactor;
  
    // Calculate the APS-C equivalent
    const apscFocalLength = (selectedLens.focalLength / cropFactor).toFixed(1);
    const apscAperture = (selectedLens.aperture * cropFactor).toFixed(1);
  
    // Build the comparison table
    const comparisonTable = `
      <table>
        <tr>
          <th>Property</th>
          <th>Full Frame</th>
          <th>APS-C Equivalent</th>
        </tr>
        <tr>
          <td>Focal Length</td>
          <td>${selectedLens.focalLength}mm</td>
          <td class="${apscFocalLength != selectedLens.fullFrameFocal ? 'highlight-difference' : 'highlight-match'}">
            ${apscFocalLength}mm
          </td>
        </tr>
        <tr>
          <td>Aperture</td>
          <td>f/${selectedLens.aperture}</td>
          <td class="${apscAperture != selectedLens.fullFrameAperture ? 'highlight-difference' : 'highlight-match'}">
            f/${apscAperture}
          </td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>${selectedLens.weight}g</td>
          <td>${selectedLens.weight}g</td>
        </tr>
        <tr>
          <td>Length</td>
          <td>${selectedLens.length}mm</td>
          <td>${selectedLens.length}mm</td>
        </tr>
        <tr>
          <td>Weather Sealing</td>
          <td>${selectedLens.weatherSealing}</td>
          <td>${selectedLens.weatherSealing}</td>
        </tr>
      </table>
    `;
  
    document.getElementById("comparisonTable").innerHTML = comparisonTable;
  });
  