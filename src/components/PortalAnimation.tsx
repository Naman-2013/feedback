'use client';

import styles from './PortalAnimation.module.css';

export default function PortalAnimation() {
  return (
    <div className={styles.overlay}>
      {/* This audio element will play the portal sound automatically */}
      <audio autoPlay>
        <source src="https://www.myinstants.com/media/sounds/portal-sound-effect.mp3" type="audio/mpeg" />
      </audio>
         
      {/* Add the loading text here */}
      <span className={styles.loadingText}>Loading Terrain...</span>
    
    </div>
  );
}