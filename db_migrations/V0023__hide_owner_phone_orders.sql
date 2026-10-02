UPDATE t_p52304247_tuapsenoty_landing_1.orders
SET is_test = true
WHERE regexp_replace(phone, '\D', '', 'g') LIKE '%9185051617';