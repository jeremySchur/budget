const db = require('../db/database');

const getIncome = (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM income WHERE id = 1');
        const income = stmt.get();
        if (!income) {
            return res.status(404).json({ error: 'Income record not found' });
        }

        return res.status(200).json(income);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateIncome = (req, res) => {
    const { amount } = req.body;
    if (amount == null) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    const id = 1;

    try {
        const stmt = db.prepare('UPDATE income SET amount = ? WHERE id = ?');
        const result = stmt.run(amount, id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Income record not found' });
        }

        return res.status(200).json({ message: 'Income updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getIncome,
    updateIncome
};