'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// --- THIS DATA HAS BEEN UPDATED ---
const labs = [
  { labId: 'a', labName: 'LAB 308-A' },
  { labId: 'c', labName: 'LAB 308-C' },
  { labId: 'd', labName: 'LAB 308-D' },
];

export default function LabsPage() {
  const router = useRouter();

  const handleLabClick = (labId: string) => {
    const clickSound = new Audio('/sounds/labs.mp3');
    clickSound.play();

    setTimeout(() => {
      router.push(`/labs/${labId}`);
    }, 200);
  };

  return (
    <main>
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Choose a Lab</h1>
        <p style={{ color: '#a0a0a0' }}>Select a lab to view its products and give feedback.</p>
      </div>

      <div className={styles.labListContainer}>
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

