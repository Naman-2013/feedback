'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Since this is now a Client Component, we hardcode the lab data.
const labs = [
  { labId: 'a', labName: 'Lab A - Robotics & AI' },
  { labId: 'b', labName: 'Lab B - VR/AR Experiences' },
  { labId: 'c', labName: 'Lab C - IoT & Smart Devices' },
  { labId: 'd', labName: 'Lab D - Web & Blockchain' },
];

export default function LabsPage() {
  const router = useRouter();

  const handleLabClick = (labId: string) => {
    // Create a new audio object and play the sound
    const clickSound = new Audio('/sounds/labs.mp3');
    clickSound.play();

    // Navigate to the lab page after a short delay for the sound to start
    setTimeout(() => {
      router.push(`/labs/${labId}`);
    }, 200); // 200ms delay
  };

  return (
    <main>
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Choose a Lab</h1>
        <p style={{ color: '#a0a0a0' }}>Select a lab to view its products and give feedback.</p>
      </div>

      <div className={styles.labListContainer}>
        {/* The Link component is replaced with a button to handle the click event */}
        {labs.map((lab) => (
          <button
            key={lab.labId}
            onClick={() => handleLabClick(lab.labId)}
            className={styles.labLink}
          >
            {lab.labName}
          </button>
        ))}
      </div>
    </main>
  );
}

