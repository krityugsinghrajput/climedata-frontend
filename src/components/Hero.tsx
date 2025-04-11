import React from "react"; // Import React core library
import styled from "styled-components"; // Import styled-components for custom styling
import { useSpring, animated } from "react-spring"; // Import react-spring for animations

// Hero component definition
const Hero = () => {
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 }); // Fade-in animation with delay

    return (
        <HeroWrapper> {/* Container for the hero section */}
            <animated.div style={fadeIn}> {/* Animated div for fade-in effect */}
                <HeroTitle>Welcome to Our Platform</HeroTitle> {/* Heading text */}
            </animated.div>
        </HeroWrapper>
    );
};

// Styled container for the hero section
const HeroWrapper = styled.section`
  height: 100vh; // Full viewport height
  background-color: #2e3b4e; // Background color
  display: flex; // Flexbox layout
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
`;

// Styled heading text
const HeroTitle = styled.h1`
  font-size: 4rem; // Large font size
  color: #fff; // White text color
`;

export default Hero; // Export Hero component
