const db = require('../db/database');

const getExpenses = (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM expenses');
        const expenses = stmt.all();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addExpense = (req, res) => {
    const { description, amount, date, category, recurring } = req.body;
    if (!description || amount == null || !date || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const stmt = db.prepare('INSERT INTO expenses (description, amount, date, category, recurring) VALUES (?, ?, ?, ?, ?)');
        stmt.run(description, amount, date, category, recurring);
        return res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error('Error adding expense:', error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteExpense = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Expense ID is required' });
    }

    try {
        const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense
};