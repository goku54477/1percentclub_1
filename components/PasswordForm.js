function PasswordForm({ onStartTransition, onShowLoading }) {
  try {
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!password) {
        alert('Please enter the password');
        return;
      }
      
      setIsLoading(true);
      
      if (password.toUpperCase() === 'KJO1') {
        // Start logo fade transition
        if (onStartTransition) {
          onStartTransition();
        }
        
        // Wait for fade then show loading screen
        setTimeout(() => {
          if (onShowLoading) {
            onShowLoading();
          }
        }, 800);
        
        // Wait for loading animation then redirect
        setTimeout(() => {
          window.location.href = 'store.html';
        }, 3000);
      } else {
        alert('Incorrect password. Try again.');
        setPassword('');
        setIsLoading(false);
      }
    };

    return (
      <div className="flex items-center justify-center w-full px-4" data-name="password-form" data-file="components/PasswordForm.js">
        <form onSubmit={handleSubmit} className="flex items-center max-w-lg w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="password-input"
            disabled={isLoading}
            required
          />
          <button type="submit" className="enter-button" disabled={isLoading}>
            {isLoading ? 'ENTERING...' : 'ENTER'}
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('PasswordForm component error:', error);
    return null;
  }
}