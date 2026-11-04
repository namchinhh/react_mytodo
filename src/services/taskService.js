import { supabase } from '../lib/supabase';

export async function getTasks() {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}