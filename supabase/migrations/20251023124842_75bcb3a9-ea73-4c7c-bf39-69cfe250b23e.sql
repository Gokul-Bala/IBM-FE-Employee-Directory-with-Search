-- Force schema cache refresh by updating table comment
COMMENT ON TABLE public.employees IS 'Employee directory table';

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';