const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Retrieve expenses from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}: $${expense.amount}</span>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Function to add an expense
function addExpense(name, amount) {
  expenses.push({ name, amount });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  expenseForm.reset();
}

// Function to edit an expense
function editExpense(index) {
  const newName = prompt('Enter new expense name:');
  const newAmount = prompt('Enter new expense amount:');
  if (newName && newAmount) {
    expenses[index] = { name: newName, amount: parseFloat(newAmount) };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
}

// Function to delete an expense
function deleteExpense(index) {
  if (confirm('Are you sure you want to delete this expense?')) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
}

// Event listener for form submission
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const expenseName = document.getElementById('expense-name').value.trim();
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value.trim());
  if (expenseName && expenseAmount) {
    addExpense(expenseName, expenseAmount);
  } else {
    alert('Please enter both expense name and amount.');
  }
});

// Initial rendering of expenses
renderExpenses();
