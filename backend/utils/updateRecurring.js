const db = require('../db/database');

function updateRecurringExpenses() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const stmt = db.prepare(`
    SELECT * FROM expenses
    WHERE recurring = 1
  `);

    const updateStmt = db.prepare(`
    UPDATE expenses SET date = ? WHERE id = ?
  `);

    const expenses = stmt.all();

    for (const exp of expenses) {
        const expDate = new Date(exp.date);
        const expMonth = expDate.getMonth();
        const expYear = expDate.getFullYear();

        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            const newDate = new Date(expDate);
            newDate.setFullYear(currentYear);
            newDate.setMonth(currentMonth);

            const newDateStr = newDate.toISOString().split('T')[0];
            updateStmt.run(newDateStr, exp.id);
        }
    }
};

module.exports = { updateRecurringExpenses };