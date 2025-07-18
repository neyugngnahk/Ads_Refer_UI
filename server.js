import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'n8n_user',
  host: '100.116.141.43',
  database: 'postgres',
  password: 'n8n_passpass',
  port: 5432,
});

// API lấy danh sách ads
app.get('/api/ads', async (req, res) => {
  try {
    const result = await pool.query('SELECT ad_id, ad_name, daily_budget, new_daily_budget FROM ads_manager');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API xóa ad_id khỏi bảng ads_manager
app.post('/api/remove-ad', async (req, res) => {
  const { ad_id } = req.body;
  if (!ad_id) return res.status(400).json({ error: 'Thiếu ad_id' });
  try {
    const result = await pool.query('DELETE FROM ads_manager WHERE ad_id = $1', [ad_id]);
    res.json({ success: true, deleted: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
