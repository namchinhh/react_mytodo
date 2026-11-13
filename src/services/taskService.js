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

export async function createTask(task) {
    const { data: { user }, error: userError } =
        await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }
    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('tasks')
        .insert({ ...task, user_id: user.id })
        .select()
        .single();
        
    if (error) {
        throw error;
    }

    return data;
}

export async function updateTask(id, completed) {
    const { data, error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function deleteTask(id) {
    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Task not found or access denied.');

    return data;
}