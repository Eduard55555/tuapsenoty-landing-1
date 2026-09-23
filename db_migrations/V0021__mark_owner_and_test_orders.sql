UPDATE t_p52304247_tuapsenoty_landing_1.orders
SET is_test = true
WHERE replace(replace(replace(replace(replace(phone, ' ', ''), '(', ''), ')', ''), '-', ''), '+7', '8') LIKE '%9185051617%'
   OR id IN (1, 2, 3, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39);