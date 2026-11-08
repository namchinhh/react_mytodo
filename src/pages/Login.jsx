import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await signIn(email.trim(), password);
            navigate('/');
        } catch (error) {
            setError(error.message || 'Failed to login. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

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

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Login'}
            </button>

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
}

export default Login;