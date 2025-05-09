import { db } from '@db/database';
import app from 'app';

const PORT = process.env.PORT || 8080;

db.getConnection()
  .then(() => {
    console.log('db connected');
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('db Connection failed :', err));
