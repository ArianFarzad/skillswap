import { Link } from 'react-router-dom';
import '../style/welcom.css';

export const Welcome = () => {
  return (
    <>
      <div className="main-container">
        <h1 id="welcome-headline">Welcome to SkillSwap</h1>
        <p id="welcome-text">Connect, Learn, and Grow</p>
        <Link to="/login" className="link">
          log in
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
      </div>
    </>
  );
};
