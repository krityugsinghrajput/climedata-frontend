import React from "react"; // Import core React functionality
import styled from "styled-components"; // Import styled-components for custom CSS styling
import { useSpring, animated } from "react-spring"; // Import react-spring for animations

// Interface defining the props expected by the Section component
interface SectionProps {
    id: string; // Unique identifier for the section
    title: string; // Title text displayed in the section
    background: string; // Background color of the section
    colorGradient: string; // Gradient color for the section title
}

// Section component definition
const Section: React.FC<SectionProps> = ({ id, title, background, colorGradient }) => {
    const animation = useSpring({ opacity: 1, from: { opacity: 0 } }); // Animation for fade-in effect

    return (
        <SectionWrapper id={id} style={{ background }}> {/* Section wrapper with background color */}
            <animated.div style={animation}> {/* Animated div with fade-in effect */}
                <Title style={{ backgroundImage: `linear-gradient(to right, ${colorGradient})` }}> {/* Gradient text effect */}
                    {title}
                </Title>
            </animated.div>
        </SectionWrapper>
    );
};

// Styled section wrapper for layout and appearance
const SectionWrapper = styled.section`
  height: 100vh; // Full viewport height
  display: flex; // Flexbox layout
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  padding: 20px; // Inner spacing
  color: white; // Text color
`;

// Styled title with gradient text effect
const Title = styled.h1`
  font-size: 4rem; // Large font size
  background-clip: text; // Apply gradient only to text
  color: transparent; // Make text transparent so gradient shows
  font-weight: 700; // Bold text
  text-align: center; // Centered text alignment
`;

export default Section; // Export Section component