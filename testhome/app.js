const searchButton = document.getElementById('search');
const foodInput = document.getElementById('food');
const resultsDiv = document.getElementById('results');

const apiKey = 'your-api-key-here'; // replace with your own API key
const apiHost = 'https://edamam-food-and-grocery-database.p.rapidapi.com';

searchButton.addEventListener('click', async () => {
  const foodName = foodInput.value.trim();
  if (!foodName) {
    alert('Please enter a food name.');
    return;
  }

  try {
    const response = await fetch(`${apiHost}/parser?nutrition-type=logging&ingr=${foodName}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data.hints[0]);
  } catch (error) {
    console.error('Error fetching ', error);
    alert('An error occurred while fetching data. Please try again later.');
  }
});

function displayResults(hint) {
  resultsDiv.innerHTML = `
    <h2>${hint.food.label}</h2>
    <img src="${hint.food.image}" alt="${hint.food.label}" width="200">
    <ul>
      <li>Calories: ${hint.food.nutrients.ENERC_KCAL}</li>
      <li>Protein: ${hint.food.nutrients.PROCNT}</li>
      <li>Fat: ${hint.food.nutrients.FAT}</li>
      <li>Carbohydrates: ${hint.food.nutrients.CHOCDF}</li>
      <li>Fiber: ${hint.food.nutrients.FIBTG}</li>
    </ul>
  `;
}