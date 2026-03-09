function setResultState(element, message, level) {
  element.textContent = message;
  element.classList.remove('result-low', 'result-medium', 'result-high');
  if (level) {
    element.classList.add(level);
  }
}

function assessRisk() {
  var name = document.getElementById('customerName').value || 'Customer';
  var income = Number(document.getElementById('monthlyIncome').value || 0);
  var debt = Number(document.getElementById('debtObligations').value || 0);
  var creditScore = Number(document.getElementById('creditScore').value || 0);
  var kycStatus = document.getElementById('kycStatus').value;
  var sanctionFlag = document.getElementById('sanctionFlag').value;

  var dti = income > 0 ? (debt / income) * 100 : 100;
  var riskPoints = 0;

  if (creditScore < 600) riskPoints += 3;
  else if (creditScore < 700) riskPoints += 1;

  if (dti > 45) riskPoints += 3;
  else if (dti > 30) riskPoints += 1;

  if (kycStatus === 'pending') riskPoints += 2;
  if (kycStatus === 'failed') riskPoints += 4;
  if (sanctionFlag === 'yes') riskPoints += 5;

  var riskLabel = 'LOW';
  var riskClass = 'result-low';
  if (riskPoints >= 8) {
    riskLabel = 'HIGH';
    riskClass = 'result-high';
  } else if (riskPoints >= 4) {
    riskLabel = 'MEDIUM';
    riskClass = 'result-medium';
  }

  var message =
    name +
    ' risk level: ' +
    riskLabel +
    ' | DTI: ' +
    dti.toFixed(1) +
    '% | Credit Score: ' +
    creditScore;
  setResultState(document.getElementById('riskResult'), message, riskClass);
}

function runTransactionCheck() {
  var amount = Number(document.getElementById('txnAmount').value || 0);
  var countryRisk = document.getElementById('txnCountry').value;
  var velocity = Number(document.getElementById('txnVelocity').value || 0);

  var riskPoints = 0;
  if (amount > 10000) riskPoints += 3;
  else if (amount > 5000) riskPoints += 1;

  if (countryRisk === 'medium') riskPoints += 2;
  if (countryRisk === 'high') riskPoints += 4;

  if (velocity >= 5) riskPoints += 3;
  else if (velocity >= 3) riskPoints += 1;

  var alertLevel = 'Routine transaction.';
  var alertClass = 'result-low';

  if (riskPoints >= 8) {
    alertLevel = 'ALERT: Escalate to compliance review immediately.';
    alertClass = 'result-high';
  } else if (riskPoints >= 4) {
    alertLevel = 'Review recommended: requires analyst validation.';
    alertClass = 'result-medium';
  }

  var message =
    alertLevel +
    ' (Amount: $' +
    amount.toLocaleString() +
    ', Risk Score: ' +
    riskPoints +
    ')';
  setResultState(document.getElementById('txnResult'), message, alertClass);
}

function calculateLoan() {
  var principal = Number(document.getElementById('loanAmount').value || 0);
  var annualRate = Number(document.getElementById('annualRate').value || 0) / 100;
  var years = Number(document.getElementById('termYears').value || 0);
  var monthlyIncome = Number(document.getElementById('borrowerIncome').value || 0);

  var months = years * 12;
  var monthlyRate = annualRate / 12;

  if (!principal || !months || monthlyRate < 0) {
    setResultState(
      document.getElementById('loanResult'),
      'Please enter valid loan details.',
      'result-medium'
    );
    return;
  }

  var monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  var paymentToIncome = monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 100;

  var affordability = 'Affordable';
  var affordabilityClass = 'result-low';
  if (paymentToIncome > 45) {
    affordability = 'High repayment burden';
    affordabilityClass = 'result-high';
  } else if (paymentToIncome > 30) {
    affordability = 'Borderline affordability';
    affordabilityClass = 'result-medium';
  }

  var message =
    'Estimated monthly payment: $' +
    monthlyPayment.toFixed(2) +
    ' | Payment-to-income: ' +
    paymentToIncome.toFixed(1) +
    '% | ' +
    affordability;
  setResultState(document.getElementById('loanResult'), message, affordabilityClass);
}

document.getElementById('riskBtn').addEventListener('click', assessRisk);
document.getElementById('txnBtn').addEventListener('click', runTransactionCheck);
document.getElementById('loanBtn').addEventListener('click', calculateLoan);
