const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { updateRecurringExpenses } = require('./utils/updateRecurring');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

updateRecurringExpenses();

app.use('/', require('./routes/budget'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});