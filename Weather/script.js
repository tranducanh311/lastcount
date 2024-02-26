// Save user data to local storage
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var userData = {username: username, email: email, password: password};
  localStorage.setItem('userData', JSON.stringify(userData));
  document.getElementById('message').innerHTML = 'Registration successful!';
});

// Load user data from local storage
document.getElementById('loadButton').addEventListener('click', function() {
  var userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    document.getElementById('message').innerHTML = 'Name: ' + userData.username + '<br>Email: ' + userData.email;
  } else {
    document.getElementById('message').innerHTML = 'No data found.';
  }
});