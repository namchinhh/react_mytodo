import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '../lib/supabase';

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        async function initAuth() {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                setUser(data.session?.user ?? null);
            } catch (error) {
                console.error('Failed to get session:', error);
            } finally {
                setLoading(false);
            }
        }

        initAuth();

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;