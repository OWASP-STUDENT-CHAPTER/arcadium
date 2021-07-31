import React from 'react';
import '../assets/css/Closing.css';

const ClosingPage = () => {
  return (
    <div className='closing-page'>
      <h2 className='closing-heading'>
        Thank You For Playing And Participating!
      </h2>
      <p className='closing-para'>
        Connect To Our Social Media, Results Will Be Announced Soon!
      </p>
      <ul className='social-media'>
        <li>
          <a href='https://www.instagram.com/owasp_tiet/'>
            <i class='fab fa-instagram fa-2x' />
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/company/owasp-tiet/mycompany/'>
            <i class='fab fa-linkedin-in fa-2x' />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ClosingPage;
