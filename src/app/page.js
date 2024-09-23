"use client"; // To make this a Client Component

import React, { useState } from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';
import { FaHeart } from 'react-icons/fa';
import '@fontsource/lobster';
import '@fontsource/dancing-script';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full screen height
    width: '100vw',  // Full screen width
    overflow: 'hidden', // No scrolling
    background: 'linear-gradient(135deg, #3a3a3a 0%, #4e4e4e 100%)',
    fontFamily: '"Dancing Script", cursive',
    padding: '0',
    margin: '0',
    position: 'relative',
  },
  text: {
    fontSize: '32px',
    fontFamily: '"Lobster", cursive',
    color: '#ffffff',
    textAlign: 'center',
    textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
    minHeight: '40px',  // Keep text height fixed to prevent shifting
  },
  animationContainer: {
    display: 'flex',
    justifyContent: 'space-between',  // Space out the boy and girl
    alignItems: 'flex-end',  // Align images bottom for consistency
    width: '100%',
    maxWidth: '600px',  // Ensure the container is not too wide
    position: 'relative',
    padding: '20px', // Adjusted for better spacing
  },
  boy: {
    width: '120px',
    height: '160px',
    marginLeft: '10px',
    marginBottom: '20px',  // Create spacing from the bottom
  },
  boyName: {
    fontSize: '18px',
    fontFamily: '"Lobster", cursive',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: '10px',
  },
  girl: {
    width: '120px',
    height: '160px',
    marginRight: '10px',
    marginBottom: '20px',  // Create spacing from the bottom
    transformOrigin: 'bottom left',
  },
  girlName: {
    fontSize: '18px',
    fontFamily: '"Lobster", cursive',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '16px 40px',
    background: 'linear-gradient(45deg, #348f50, #56b4d3)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '20px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    marginTop: '20px',
    position: 'relative', // Fix button position, won't shift
  },
  hearts: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
  },
};

export default function InteractiveLovePage() {
  const [kiss, setKiss] = useState(false);
  const [heartsVisible, setHeartsVisible] = useState(false);
  const [kissCount, setKissCount] = useState(0); // Kiss counter

  // Animation for the girl moving in to kiss and return
  const girlSpring = useSpring({
    transform: kiss
      ? 'translateX(-50px) rotate(-10deg)' // Lean towards the boy
      : 'translateX(0) rotate(0)', // Return to original position
    config: { tension: 200, friction: 12 },
    onRest: () => setKiss(false), // Reset kiss state after animation completes
  });

  // Kiss sound effect
  const playKissSound = () => {
    const kissAudio = new Audio('/kiss-sound.wav'); // Add kiss sound file to public folder
    kissAudio.play();
  };

  // Handle the kiss action
  const handleKiss = () => {
    setKiss(true);
    setKissCount(kissCount + 1); // Increment kiss count
    setHeartsVisible(true);
    playKissSound();
    setTimeout(() => setHeartsVisible(false), 2000); // Hide hearts after 2 seconds
  };

  // Floating hearts animation
  const heartSprings = useSprings(
    5,
    new Array(5).fill().map(() => ({
      from: { transform: 'translateY(100px)', opacity: 1 },
      to: { transform: 'translateY(-180px)', opacity: 0 },
      config: { duration: 2000 },
      reset: heartsVisible,
    }))
  );

  // Personalized message for each kiss count
  const getKissMessage = () => {
    if (kissCount === 0) return 'Send a Kiss to Habib!';
    if (kissCount === 1) return 'One Kiss to Habib 💕';
    if (kissCount === 2) return 'Two Kisses to Habib 💖';
    if (kissCount === 3) return 'Three Kisses to Habib 💘';
    if (kissCount >= 4) return `${kissCount} Kisses to Habib 💞`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.text}>{getKissMessage()}</h1>
      <div style={styles.animationContainer}>
        <div>
          <img src="/boy.png" alt="Boy" style={styles.boy} />
          <p style={styles.boyName}>Habib</p> {/* Boy's Name */}
        </div>
        <div>
          <animated.img src="/girl.png" alt="Girl" style={{ ...styles.girl, ...girlSpring }} />
          <p style={styles.girlName}>Habiba</p> {/* Girl's Name */}
        </div>
      </div>
      <button onClick={handleKiss} style={styles.button}>
        Send a Kiss <FaHeart style={{ marginLeft: '10px' }} />
      </button>
      {kiss && (
        <p style={styles.text}>
          True Love is in the Air! 💕 <FaHeart />
        </p>
      )}

      {/* Floating hearts */}
      {heartsVisible && (
        <div style={styles.hearts}>
          {heartSprings.map((spring, i) => (
            <animated.div key={i} style={{ ...spring }}>
              <FaHeart style={{ color: '#ff4d88', fontSize: '28px' }} />
            </animated.div>
          ))}
        </div>
      )}

      {/* Audio element for kiss sound */}
      <audio id="kiss-sound" src="/kiss-sound.wav" preload="auto" />
    </div>
  );
}
