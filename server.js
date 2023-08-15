const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err))


app.use(express.json());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
