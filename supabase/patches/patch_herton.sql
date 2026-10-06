DROP POLICY IF EXISTS "Super admins leem historico" ON public.publish_history;
CREATE POLICY "Super admins leem historico" ON public.publish_history
    FOR SELECT
    USING (
        auth.uid() IN (
            SELECT id FROM public.profiles 
            WHERE email IN ('davidholandaferro@gmail.com', 'lucasguimaraes.app@gmail.com', 'hertonfilho2000@gmail.com')
        )
    );
NOTIFY pgrst, 'reload schema';
