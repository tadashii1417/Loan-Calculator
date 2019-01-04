document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e) {
  // UI Varibale UIamout, UIinterest
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
    document.getElementById('loading').style.display = 'block';
    setTimeout(loadingResult, 500);
  } else {
    showError('Please check your numbers');
  }
  e.preventDefault();
}

function loadingResult() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';

  // get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(message));
  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}