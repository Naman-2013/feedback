'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import styles from './XpBar.module.css';

const TOTAL_PRODUCTS = 28;
const TOTAL_SEGMENTS = 20;

export default function XpBar() {
  const { user } = useUser();
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    if (user) {
      const updateCount = () => {
        const userStorageKey = `submittedFeedback_${user.email}`;
        const storedSubmissions = JSON.parse(localStorage.getItem(userStorageKey) || '[]');
        setFeedbackCount(storedSubmissions.length);
      };

      // Update on initial load
      updateCount();

      // --- THIS IS THE FIX ---
      // Listen for our custom event to force an update
      window.addEventListener('feedbackSubmitted', updateCount);

      // Clean up the event listener
      return () => {
        window.removeEventListener('feedbackSubmitted', updateCount);
      };
    }
  }, [user]);

  const filledSegments = Math.round((feedbackCount / TOTAL_PRODUCTS) * TOTAL_SEGMENTS);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.xpContainer}>
      <div className={styles.xpBar}>
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
          <div
            key={index}
            className={`${styles.xpSegment} ${index < filledSegments ? styles.filled : ''}`}
          />
        ))}
      </div>
      <div className={styles.progressText}>
        Progress: {feedbackCount} / {TOTAL_PRODUCTS}
      </div>
    </div>
  );
}