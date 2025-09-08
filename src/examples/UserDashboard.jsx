import { useState } from 'react';
import { useUser, useAuthGuard } from '../contexts/UserContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useTheme } from '../contexts/ThemeContext';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, isLoading, error } = useUser();
  const { isDark } = useTheme();

  const handleChange = (field) => (e) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await login(credentials);
    } catch (err) {
      console.log('Login failed:', err.message);
    }
  };

  return (
    <Card
      title="User Authentication"
      subtitle="Demonstrates context providers and custom hooks"
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          value={credentials.username}
          onChange={handleChange('username')}
          placeholder="Enter username (try 'demo')"
          error={errors.username}
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={credentials.password}
          onChange={handleChange('password')}
          placeholder="Enter password (try 'password')"
          error={errors.password}
          required
        />
        
        {error && (
          <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className={`text-xs p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          💡 Try username: <code>demo</code>, password: <code>password</code>
        </div>
      </form>
    </Card>
  );
};

const UserProfile = () => {
  const { user, updateUser, updatePreferences, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUser(editForm);
    setIsEditing(false);
  };

  const handlePreferenceChange = (key) => (e) => {
    updatePreferences({
      [key]: e.target.checked
    });
  };

  return (
    <Card
      title="User Dashboard"
      subtitle={`Welcome back, ${user?.name}!`}
      className="w-full max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{user?.avatar}</div>
          <div>
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-gray-500">ID: {user?.id}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <Input
              label="Name"
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              size="sm"
            />
            <Input
              label="Email"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              size="sm"
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm">Save</Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">Preferences</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={user?.preferences?.notifications}
                    onChange={handlePreferenceChange('notifications')}
                    className="rounded"
                  />
                  <span>Email notifications</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={logout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const UserDashboard = () => {
  const { isAuthenticated, isLoading } = useUser();
  
  useAuthGuard('/login');

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  return isAuthenticated ? <UserProfile /> : <LoginForm />;
};