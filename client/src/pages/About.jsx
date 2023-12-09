import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdPeople } from "react-icons/io";
import { FaRegLightbulb, FaRegBuilding, FaRegClock, FaRegSmile } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { Icon } from "react-icons-kit";
import { ic_star } from "react-icons-kit/md/ic_star";
import { bounce, fadeIn, slideInUp, rotateIn } from "react-animations";
import { fadeInDown } from "react-animations/lib/fade-in-down";
import { tada } from "react-animations/lib/tada";

const About = () => {
  const containerAnimation = useAnimation();
  const textAnimation = useAnimation();
  const iconAnimation = useAnimation();

  const startAnimations = async () => {
    await containerAnimation.start({ opacity: 1, y: 0 });
    await textAnimation.start({ opacity: 1, y: 0 });
    await iconAnimation.start({ rotate: 360 });
  };

  useEffect(() => {
    startAnimations();
  }, []);

  const rotateIconStyle = {
    transform: `rotate(${iconAnimation.rotate}deg)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={containerAnimation}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className='py-20 px-4 max-w-6xl mx-auto text-gray-800 rounded-md shadow-lg'
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={textAnimation}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className='text-5xl font-extrabold mb-8'
      >
        Welcome to AsHim Estate
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={textAnimation}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className='mb-8'
      >
        <div className='w-16 h-1 bg-gray-800 mb-3'></div>
        <motion.p className='text-lg' variants={fadeInDown}>
          Your Journey to Exceptional Living Begins Here
        </motion.p>
      </motion.div>

      {/* ... (rest of the code) */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={textAnimation}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className='text-center mb-12'
      >
        <motion.p className='text-lg font-semibold mb-4' variants={tada}>
          Join Us on a Journey to Extraordinary Living
        </motion.p>
        <motion.p className='text-lg' variants={fadeIn}>
          AsHim Estate is not just a real estate agency; it's a lifestyle curator. Let's turn your dreams into reality and embark
          on a journey where every home tells a unique story.
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={textAnimation}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className='mb-12 text-lg'
      >
        Connect with us and experience the AsHim Estate difference. Your dream home is just a click away!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={textAnimation}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        className='flex justify-center'
      >
        <Link to='/home'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-gray-800 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-80 focus:outline-none'
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default About;
