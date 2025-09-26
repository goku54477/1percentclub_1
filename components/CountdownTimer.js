function CountdownTimer() {
  try {
    const [timeLeft, setTimeLeft] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    React.useEffect(() => {
      // Set target date to 7 days from now
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);

      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance > 0) {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="countdown-timer" data-name="countdown-timer" data-file="components/CountdownTimer.js">
        {String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
      </div>
    );
  } catch (error) {
    console.error('CountdownTimer component error:', error);
    return null;
  }
}