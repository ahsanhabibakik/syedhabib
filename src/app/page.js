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
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    fontFamily: '"Dancing Script", cursive',
  },
  text: {
    fontSize: '32px',
    fontFamily: '"Lobster", cursive',
    color: '#ff69b4',
    marginBottom: '20px',
    textAlign: 'center',
  },
  animationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '300px',
    height: '200px',
    marginBottom: '20px',
  },
  boy: {
    position: 'absolute',
    left: '10px',
    width: '100px',
    height: '150px',
  },
  girl: {
    position: 'absolute',
    right: '10px',
    width: '100px',
    height: '150px',
    transformOrigin: 'bottom left',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#f08080',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
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
    const kissAudio = new Audio('/kiss-sound.mp3'); // Add the kiss sound file to your public folder
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
      to: { transform: 'translateY(-150px)', opacity: 0 },
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
              <FaHeart style={{ color: '#ff69b4', fontSize: '24px' }} />
            </animated.div>
          ))}
        </div>
      )}

      {/* Audio element for kiss sound */}
      <audio id="kiss-sound" src="/kiss-sound.mp3" preload="auto" />
    </div>
  );
}
