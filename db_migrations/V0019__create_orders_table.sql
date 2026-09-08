CREATE TABLE IF NOT EXISTS t_p52304247_tuapsenoty_landing_1.orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT DEFAULT '',
    delivery TEXT DEFAULT '',
    address TEXT DEFAULT '',
    items JSONB NOT NULL,
    total INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON t_p52304247_tuapsenoty_landing_1.orders (created_at DESC);