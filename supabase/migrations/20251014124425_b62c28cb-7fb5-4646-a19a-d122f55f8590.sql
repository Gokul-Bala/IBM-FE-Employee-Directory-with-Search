-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  job_title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT,
  avatar_url TEXT,
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (employee directory is public)
CREATE POLICY "Employees are viewable by everyone" 
ON public.employees 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample employee data
INSERT INTO public.employees (first_name, last_name, email, phone, job_title, department, location, start_date) VALUES
('Sarah', 'Johnson', 'sarah.johnson@company.com', '+1 (555) 123-4567', 'Chief Technology Officer', 'Engineering', 'San Francisco, CA', '2020-01-15'),
('Michael', 'Chen', 'michael.chen@company.com', '+1 (555) 234-5678', 'Senior Software Engineer', 'Engineering', 'San Francisco, CA', '2021-03-20'),
('Emily', 'Rodriguez', 'emily.rodriguez@company.com', '+1 (555) 345-6789', 'Product Manager', 'Product', 'New York, NY', '2019-07-10'),
('David', 'Kim', 'david.kim@company.com', '+1 (555) 456-7890', 'UX Designer', 'Design', 'Remote', '2022-02-14'),
('Jessica', 'Taylor', 'jessica.taylor@company.com', '+1 (555) 567-8901', 'Marketing Director', 'Marketing', 'New York, NY', '2020-06-01'),
('James', 'Anderson', 'james.anderson@company.com', '+1 (555) 678-9012', 'HR Manager', 'Human Resources', 'San Francisco, CA', '2021-09-15'),
('Lisa', 'Martinez', 'lisa.martinez@company.com', '+1 (555) 789-0123', 'Data Scientist', 'Engineering', 'Austin, TX', '2022-01-10'),
('Robert', 'Wilson', 'robert.wilson@company.com', '+1 (555) 890-1234', 'Sales Manager', 'Sales', 'Chicago, IL', '2020-11-05');