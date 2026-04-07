import React from 'react';
import { motion } from 'framer-motion';

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const SplitHeading = ({ children, className = '', as: Tag = 'h2' }) => {
  const words = children.split(' ');
  const MotionTag = motion(Tag);

  return (
    <MotionTag
      className={className} 
      aria-label={children} 
      style={{ overflow: 'visible' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ 
            display: 'inline-block', 
            overflow: 'hidden', 
            marginRight: '0.3em', 
            verticalAlign: 'bottom',
            paddingBottom: '0.2em',
            marginBottom: '-0.2em'
          }}
        >
          <motion.span
            style={{ display: 'inline-block', transformOrigin: 'bottom' }}
            variants={wordVariants}
            custom={i}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default SplitHeading;
