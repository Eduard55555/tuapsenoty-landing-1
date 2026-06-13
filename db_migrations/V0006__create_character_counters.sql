CREATE TABLE IF NOT EXISTS character_counters (
    slug TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO character_counters (slug, count) VALUES ('enofya', 0)
ON CONFLICT (slug) DO NOTHING;