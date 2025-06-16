const db = require('../db/database');

const getGoals = (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM goals');
        const goals = stmt.all();
        return res.status(200).json(goals);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addGoal = (req, res) => {
    const { name, target_amount, current_amount } = req.body;
    if (!name || target_amount == null || current_amount == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const stmt = db.prepare('INSERT INTO goals (name, target_amount, current_amount) VALUES (?, ?, ?)');
        stmt.run(name, target_amount, current_amount);
        return res.status(201).json({ message: 'Goal added successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateGoal = (req, res) => {
    const { id, name, target_amount, current_amount } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    if (name === undefined && target_amount === undefined && current_amount === undefined) {
        return res.status(400).json({ error: 'At least one field (name, target_amount, or current_amount) must be provided' });
    }

    try {
        const updates = [];
        const values = [];
        
        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (target_amount !== undefined) {
            updates.push('target_amount = ?');
            values.push(target_amount);
        }
        if (current_amount !== undefined) {
            updates.push('current_amount = ?');
            values.push(current_amount);
        }
        
        values.push(id);
        
        const stmt = db.prepare(`UPDATE goals SET ${updates.join(', ')} WHERE id = ?`);
        const result = stmt.run(...values);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        return res.status(200).json({ message: 'Goal updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteGoal = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const stmt = db.prepare('DELETE FROM goals WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        return res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
};