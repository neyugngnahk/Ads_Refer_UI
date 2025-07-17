import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Điền thông tin kết nối Postgres ở đây
const pool = new Pool({
  user: 'n8n_user',
  host: 'YOUR_HOST', 
  database: 'postgres', 
  password: 'n8n_passpass',
  port: 5432,
});

// API lấy danh sách ads
app.get('/api/ads', async (req, res) => {
  try {
    // TODO: Đổi tên bảng và các cột cho phù hợp
    const result = await pool.query('SELECT ad_id, ad_name, daily_budget, new_daily_budget FROM ads-manager');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
