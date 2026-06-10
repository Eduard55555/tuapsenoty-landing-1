ALTER TABLE t_p52304247_tuapsenoty_landing_1.finder_counter
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();