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
    const { data, error } = await supabase
        .from('tasks')
        .insert(task)
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
        .eq('id', id);

    if (error) {
        throw error;
    }   
}