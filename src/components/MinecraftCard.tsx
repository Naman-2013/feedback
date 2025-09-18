import Link from 'next/link';
import styles from './MinecraftCard.module.css';

interface MinecraftCardProps {
  id: string;
  name: string;
  icon: string;
  isSubmitted?: boolean; // New prop
}

export default function MinecraftCard({ id, name, icon, isSubmitted }: MinecraftCardProps) {
  const cardContent = (
    <>
      <span className={styles.icon}>{icon}</span>
      <h2 className={styles.name}>{name}</h2>
      {isSubmitted && (
        <div className={styles.submittedOverlay}>
          <span className={styles.submittedText}>SUBMITTED</span>
        </div>
      )}
    </>
  );

  // If submitted, render a non-clickable div. Otherwise, render a Link.
  if (isSubmitted) {
    return (
      <div className={`${styles.card} ${styles.submitted}`} style={{ position: 'relative' }}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/feedback/${id}`} className={styles.card} style={{ position: 'relative' }}>
      {cardContent}
    </Link>
  );
}