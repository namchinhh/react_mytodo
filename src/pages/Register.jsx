import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                setSubmitting(false);
                return;
            }
            const data = await signUp(email.trim(), password);
            if (data.session) {
                navigate('/');
            } else {
                navigate('/login', {
                    state: { message: 'Please check your email to confirm your account before logging in.' }
                });
            }
        } catch (error) {
            setError(error.message || 'Failed to register. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />


            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? 'Registering...' : 'Register'}
            </button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}

export default Register;