const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const modalContainer = document.querySelector('.modal-container');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');


searchButton.addEventListener('click', async () => {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        const meals = await searchMealsByIngredient(ingredient);
        displayMeals(meals);
    }
});

mealList.addEventListener('click', async (e) => {
    const card = e.target.closest('.meal-item');
    if (card) {
        const mealId = card.dataset.id;
        const meal = await getMealDetails(mealId);
        if (meal) {
            showMealDetailsPopup(meal);
        }
    }
});

// Chức năng xem cách làm theo thành phần
async function searchMealsByIngredient(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
       // Hiển thị lỗi in console
        console.error('Error fetching data:', error);
    }
}

// Chức năng lấy chi tiết bữa ăn theo ID
async function getMealDetails(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}

// Chức năng hiển thị bữa ăn trong danh sách
function displayMeals(meals) {
    mealList.innerHTML = '';
    if (meals) {
        meals.forEach((meal) => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');
            mealItem.dataset.id = meal.idMeal;
            mealItem.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
            mealList.appendChild(mealItem);
        });
    } else {
        mealList.innerHTML = '<p>No meals found. Try another ingredient.</p>';
    }
}

// Chức năng tạo và hiển thị chi tiết bữa ăn trên cửa sổ 
function showMealDetailsPopup(meal) {
    mealDetailsContent.innerHTML = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipe-video">
            <a href="${meal.strYoutube}" target="_blank">Video Tutorial</a>
        </div>
    `;
    modalContainer.style.display = 'block';
}

// Trình xử lý sự kiện cho nút đóng cửa sổ bật lên
recipeCloseBtn.addEventListener('click', closeRecipeModal);

function closeRecipeModal() {
    modalContainer.style.display = 'none';
}

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        const meals = await searchMealsByIngredient(ingredient);
        displayMeals(meals);
    }
}

// Thực hiện tìm kiếm gà khi tải trang
window.addEventListener('load', () => {
    searchInput.value = 'chicken';
    performSearch();
});