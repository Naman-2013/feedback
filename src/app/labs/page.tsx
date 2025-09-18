import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import styles from './page.module.css';

// This is a Server Component, so we can read files directly
async function getLabs() {
  const dbPath = path.join(process.cwd(), 'db.json');
  const fileData = await fs.readFile(dbPath, 'utf-8');
  const data = JSON.parse(fileData);
  return data.labs;
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