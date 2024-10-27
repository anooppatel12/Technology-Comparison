document.getElementById('compare-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get user input
  const tech1 = document.getElementById('tech1').value.trim();
  const tech2 = document.getElementById('tech2').value.trim();

  if (tech1 && tech2) {
      // Send request to backend for comparison
      const response = await fetch('/compare', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tech1, tech2 })
      });

      // Get the response and display it
      const result = await response.json();
      displayComparison(result);
  } else {
      alert("Please enter both technologies!");
  }
});

// Function to display comparison results
function displayComparison(tech1, tech2, comparisonData) {
  const card = document.getElementById('comparisonCard');
  const loader = document.getElementById('loader');
  const comparisonDiv = document.getElementById('comparison');

  // Hide loader and show card
  loader.style.display = 'none';
  card.style.display = 'block';

  // Clear previous comparison data
  comparisonDiv.innerHTML = '';

  // Set card header
  document.getElementById('tech1').textContent = tech1;
  document.getElementById('tech2').textContent = tech2;

  // Split the fetched comparison into points if possible
  const points = comparisonData.split(/\.|\n/).filter(Boolean);

  // Add points to the comparison section
  points.forEach(point => {
      const pointItem = document.createElement('li');
      pointItem.textContent = point.trim();
      comparisonDiv.appendChild(pointItem);
  });
}

