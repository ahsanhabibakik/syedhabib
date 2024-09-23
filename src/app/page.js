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
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // Softer gradient
    fontFamily: '"Dancing Script", cursive',
  },
  text: {
    fontSize: '36px', // Larger for better visibility
    fontFamily: '"Lobster", cursive',
    color: '#ff4d88', // Improved contrast for readability
    marginBottom: '30px',
    textAlign: 'center',
    textShadow: '1px 1px 3px rgba(0,0,0,0.2)', // Added subtle shadow for depth
  },
  animationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '400px', // Increased size for prominence
    height: '250px',
    marginBottom: '40px',
  },
  boy: {
    position: 'absolute',
    left: '5%',
    width: '120px',
    height: '160px',
  },
  girl: {
    position: 'absolute',
    right: '5%',
    width: '120px',
    height: '160px',
    transformOrigin: 'bottom left',
  },
  button: {
    padding: '16px 40px',
    background: 'linear-gradient(45deg, #ff6f91, #ff9671)', // Gradient for modern look
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '20px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Adds depth
    marginTop: '20px',
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

  // Animation for the girl moving in to kiss
  const girlSpring = useSpring({
    transform: kiss ? 'translateX(-50px) rotate(-10deg)' : 'translateX(0) rotate(0)',
    config: { tension: 200, friction: 12 },
  });

  // Kiss sound effect
  const playKissSound = () => {
    const kissAudio = new Audio('/kiss-sound.wav'); // Add the kiss sound file to your public folder
    kissAudio.play();
  };

  // Handle the kiss action
  const handleKiss = () => {
    setKiss(!kiss);
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

  return (
    <div style={styles.container}>
      <h1 style={styles.text}>You Make My Heart Skip a Beat</h1>
      <div style={styles.animationContainer}>
        <img src="/boy.png" alt="Boy" style={styles.boy} />
        <animated.img src="/girl.png" alt="Girl" style={{ ...styles.girl, ...girlSpring }} />
      </div>
      <button onClick={handleKiss} style={styles.button}>
        Send a Kiss <FaHeart style={{ marginLeft: '10px' }} />
      </button>
      {kiss && (
        <p style={styles.text}>
          Smooch! <FaHeart /> <br /> True Love Always Wins! 💕
        </p>
      )}

      {/* Floating hearts */}
      {heartsVisible && (
        <div style={styles.hearts}>
          {heartSprings.map((spring, i) => (
            <animated.div key={i} style={{ ...spring }}>
              <FaHeart style={{ color: '#ff4d88', fontSize: '28px' }} /> {/* Larger hearts */}
            </animated.div>
          ))}
        </div>
      )}

      {/* Audio element for kiss sound */}
      <audio id="kiss-sound" src="/kiss-sound.wav" preload="auto" />
    </div>
  );
}
