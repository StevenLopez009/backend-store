import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('¡Hola desde mi backend!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

