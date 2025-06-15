
-- Create premium waitlist table to store user signup information
CREATE TABLE public.premium_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  payment_attempted BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.premium_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own waitlist entry
CREATE POLICY "Users can view their own waitlist entry" 
  ON public.premium_waitlist 
  FOR SELECT 
  USING (auth.uid() = user_id OR email = auth.email());

-- Create policy for users to insert their own waitlist entry
CREATE POLICY "Users can create their own waitlist entry" 
  ON public.premium_waitlist 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own waitlist entry
CREATE POLICY "Users can update their own waitlist entry" 
  ON public.premium_waitlist 
  FOR UPDATE 
  USING (auth.uid() = user_id OR email = auth.email());

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_premium_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_premium_waitlist_updated_at
  BEFORE UPDATE ON public.premium_waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_premium_waitlist_updated_at();
