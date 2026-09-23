ALTER TABLE t_p52304247_tuapsenoty_landing_1.orders ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

UPDATE t_p52304247_tuapsenoty_landing_1.orders SET is_test = true WHERE id BETWEEN 28 AND 35;