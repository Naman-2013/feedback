'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import PortalAnimation from '@/components/PortalAnimation';

export default function WelcomePage() {
  // ... (all your existing state and styles are the same)
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { login } = useUser();
  const [isEnteringPortal, setIsEnteringPortal] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }
    login({ name, department, email });
    setIsEnteringPortal(true);

    setTimeout(() => {
      // Change this line to redirect to the new labs page
      router.push('/labs'); 
    }, 2500);
  };

  // ... (the rest of your component's JSX and styles are the same)
  // Basic inline styles for simplicity
  const formStyle: React.CSSProperties = { maxWidth: '500px', margin: '10vh auto', padding: '2rem', backgroundColor: '#c6c6c6', border: '4px solid', borderColor: '#e0e0e0 #585858 #585858 #e0e0e0', color: '#333' };
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#373737', border: '2px inset #585858', color: 'white', boxSizing: 'border-box', fontFamily: 'var(--font-minecraft)' };
  const buttonStyle: React.CSSProperties = { width: '100%', padding: '1rem', backgroundColor: '#5E8D4A', color: 'white', border: '4px outset #a0a0a0', fontSize: '1.25rem', fontFamily: 'var(--font-minecraft)' };

  return (
    <>
      {isEnteringPortal && <PortalAnimation />}

      <main style={{ padding: '2rem' }}>
        <div style={formStyle}>
          <h1 style={{ textAlign: 'center' }}>Welcome to TechX Feedback</h1>
          <p style={{ textAlign: 'center', color: '#555', marginBottom: '2rem' }}>Please enter your details to continue</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Department..." value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle} />
            <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
            <button type="submit" style={buttonStyle}>
              Enter Portal
            </button>
          </form>
        </div>
      </main>
    </>
  );
}