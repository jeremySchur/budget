const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const expensesController = require('../controllers/expensesController');
const goalsController = require('../controllers/goalsController');

router.route('/income')
  .get(incomeController.getIncome)
  .patch(incomeController.updateIncome);

router.route('/expenses')
  .get(expensesController.getExpenses)
  .post(expensesController.addExpense)
  .delete(expensesController.deleteExpense);

router.route('/goals')
  .get(goalsController.getGoals)
  .post(goalsController.addGoal)
  .patch(goalsController.updateGoal)
  .delete(goalsController.deleteGoal);

module.exports = router;