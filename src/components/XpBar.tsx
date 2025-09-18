'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import styles from './XpBar.module.css';

const TOTAL_PRODUCTS = 28; // 4 labs * 7 products
const TOTAL_SEGMENTS = 20; // The number of "chunks" in the XP bar

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

      updateCount();
      window.addEventListener('feedbackSubmitted', updateCount);
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

      {/* This text will only appear if the feedback is NOT complete */}
      {feedbackCount < TOTAL_PRODUCTS && (
        <p className={styles.magicText}>
          Complete all the feedbacks to see the magic ! ! !
        </p>
      )}
    </div>
  );
}