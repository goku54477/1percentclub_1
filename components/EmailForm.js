function EmailForm() {
  try {
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      setIsLoading(true);
      try {
        // Add email to database
        await trickleCreateObject('waitlist', {
          Email: email,
          JoinedAt: new Date().toISOString()
        });
        setIsSubmitted(true);
        setShowModal(false);
      } catch (error) {
        console.error('Error saving email:', error);
        alert('There was an error saving your email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isSubmitted) {
      return (
        <div className="text-center px-4" data-name="success-message" data-file="components/EmailForm.js">
          <p className="text-white text-xl mb-4" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Thank you! You're on the waitlist.</p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="text-[var(--accent-color)] underline"
            style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}
          >
            Add another email
          </button>
        </div>
      );
    }

    return (
      <div className="text-center px-4" data-name="email-form" data-file="components/EmailForm.js">
        <button 
          onClick={() => setShowModal(true)}
          className="join-waitlist-button"
        >
          JOIN WAITLIST
        </button>
        
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white text-xl mb-4 text-center" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>JOIN THE WAITLIST</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="email-input w-full mb-4"
                  disabled={isLoading}
                  required
                />
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-transparent border-2 border-white text-white py-2 px-4 uppercase"
                    style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}
                  >
                    CANCEL
                  </button>
                  <button type="submit" className="join-button flex-1" disabled={isLoading}>
                    {isLoading ? 'JOINING...' : 'JOIN'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('EmailForm component error:', error);
    return null;
  }
}
