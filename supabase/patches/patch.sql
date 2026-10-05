CREATE TABLE IF NOT EXISTS public.publish_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    content_snapshot JSONB NOT NULL
);

ALTER TABLE public.publish_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Super admins leem historico" ON public.publish_history;
CREATE POLICY "Super admins leem historico" ON public.publish_history
    FOR SELECT
    USING (
        auth.uid() IN (
            SELECT id FROM public.profiles 
            WHERE email IN ('davidholandaferro@gmail.com', 'lucasguimaraes.app@gmail.com')
        )
    );

CREATE OR REPLACE FUNCTION public.log_site_content_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NEW.data IS DISTINCT FROM OLD.data THEN
        INSERT INTO public.publish_history (publisher_id, content_snapshot)
        VALUES (NEW.updated_by, NEW.data);
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_log_site_content ON public.site_content;
CREATE TRIGGER trg_log_site_content
    AFTER UPDATE ON public.site_content
    FOR EACH ROW
    EXECUTE FUNCTION public.log_site_content_update();

NOTIFY pgrst, 'reload schema';
