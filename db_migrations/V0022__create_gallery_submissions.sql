CREATE TABLE IF NOT EXISTS t_p52304247_tuapsenoty_landing_1.gallery_submissions (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    comment TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gallery_submissions_status_idx ON t_p52304247_tuapsenoty_landing_1.gallery_submissions (status, created_at DESC);