const form = document.getElementById('formId');
const detailsDiv = document.getElementById('details');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  // Get form input values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('number').value;

    console.log('Uname:', username);
    console.log('email:', email);
    console.log('phNum:', phoneNumber);
  // Create an object with the form data
  const formData = {
    name: username,
    email: email,
    phone: phoneNumber,
  };

  // Store the object in local storage with the email as the key
  localStorage.setItem("key",email);
  localStorage.setItem(email, JSON.stringify(formData));

  // Create a new paragraph element and set its content to the form data
  const paragraph = document.createElement('p');
  paragraph.textContent = `${username} - ${email} - ${phoneNumber}`;

  // Append the paragraph element to the "details" div
  detailsDiv.appendChild(paragraph);

  // Clear input fields after submission
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('number').value = '';
}
