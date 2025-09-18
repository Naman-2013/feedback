import Link from 'next/link';
import connectDB from '../../../lib/mongodb';
import Lab from '../../../models/Lab';
import styles from './page.module.css';

// This is a Server Component, so we can connect to MongoDB directly
async function getLabs() {
  await connectDB();
  const labs = await Lab.find({});
  return labs;
}

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <main>
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Choose a Lab</h1>
        <p style={{ color: '#a0a0a0' }}>Select a lab to view its products and give feedback.</p>
      </div>

      <div className={styles.labListContainer}>
        {labs.map((lab: { labId: string; labName: string }) => (
          <Link key={lab.labId} href={`/labs/${lab.labId}`} className={styles.labLink}>
            {lab.labName}
          </Link>
        ))}
      </div>
    </main>
  );
}