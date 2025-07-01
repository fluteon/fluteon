// import React from 'react'
// import { Grid, Link, Typography } from '@mui/material';

// const Footer = () => {
//   return (
//     <Grid className='bg-black text-white mt-10 text-center' container color={'white' } sx={{ bgcolor: 'black', color: 'white', py: 3 }}>
//       <Grid  item xs={12} sm={6} md={3}>
//         <Typography className='pb-5' variant="h6" gutterBottom>
//           Company
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           About
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Blog
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Jobs
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Press
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Partners
//         </Typography>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Typography className='pb-5' variant="h6" gutterBottom>
//           Solutions
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Marketing
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Analytics
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Commerce
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Insights
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Support
//         </Typography>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Typography className='pb-5' variant="h6" gutterBottom>
//           Documentation
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Guides
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           API Status
//         </Typography>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Typography className='pb-5' variant="h6" gutterBottom>
//           Legal
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Claim
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Privacy
//         </Typography>
//         <Typography variant="body2" component="p" gutterBottom>
//           Terms
//         </Typography>
//       </Grid>
//       <Grid className='pt-20' item xs={12} >
//         <Typography variant="body2" component="p" align="center">
//           &copy; 2023 My Company. All rights reserved.
//         </Typography>
//         <Typography variant="body2" component="p" align="center">
//           Made with love by Me.
//         </Typography>
//         <Typography variant="body2" component="p" align="center">
//           Icons made by{' '}
//           <Link href="https://www.freepik.com" color="inherit" underline="always">
//             Freepik
//           </Link>{' '}
//           from{' '}
//           <Link href="https://www.flaticon.com/" color="inherit" underline="always">
//             www.flaticon.com
//           </Link>
//         </Typography>
//       </Grid>
//     </Grid>
//   );
// };

// export default Footer;



import React, { useEffect } from 'react';
import { Instagram, Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const socialContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // stagger delay between icons
    },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

const Footer = () => {
  const navigate =  useNavigate()
  const controlsFooter = useAnimation();
  const controlsSocial = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controlsFooter.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
      controlsSocial.start('visible');  // trigger social icons animation
    }
  }, [inView, controlsFooter, controlsSocial]);

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controlsFooter}
      className="bg-[#EAEFEF] text-[#333446] relative overflow-hidden "
    >
      {/* Top wave background */}
      <div className="absolute top-0 left-0 w-full h-[160px] ">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-auto ">
          <path fill="white" d="M0,64 C480,0 960,128 1440,64 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

<div className="relative z-10 max-w-7xl mx-auto px-6 pt-[100px] pb-20 grid md:grid-cols-5 gap-12">
        {/* Column Links */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* <div>
            <h4 className="font-bold mb-4 text-[#333446]">SHOP</h4>
            <ul className="space-y-2 text-[#333446]/90 text-sm">
              <li><a href="#">Drinks</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Refer a Friend</a></li>
            </ul>
          </div> */}


          <div>
            {/* <h4 className="font-bold mb-4 text-[#333446]">HELP</h4> */}
            <ul className="space-y-2 text-[#333446]/90 text-sm">
            <li><Button onClick={()=>navigate("/about-us")}>About</Button></li>
              <li> <Button onClick={()=>navigate("/contact-us")}> Contact</Button> </li>
              <li><Button onClick={()=>navigate("/terms-condition")}>Term's & Condition's</Button></li>
              <li><Button onClick={()=>navigate("privaciy-policy")}>Privacy & Policy</Button></li>
              
              {/* <li><a href="#">FAQ</a></li>
              <li><a href="#">Accessibility</a></li> */}
            </ul>
          </div>


          {/* <div>
            <Button onClick={()=>navigate("/about-us")}>
              <h4 className="font-bold mb-4 text-[#333446]">ABOUT</h4>
            </Button>
            <ul className="space-y-2 text-[#333446]/90 text-sm">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">OLIPOP Digest</a></li>
              <li><a href="#">Ingredients</a></li>
              <li><a href="#">Digestive Health</a></li>
              <li><a href="#">Wholesale</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div> */}

          
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <p className="text-right text-[#333446] mt-5 mb-4 text-sm">Sign up to get 10% off your first order</p>
          <div className="flex gap-3 justify-end">
            <input
              type="email"
              placeholder="Your Email Address"
              className="rounded-full px-6 py-3 text-black w-full sm:w-auto flex-1"
            />
            <button className="bg-[#F4C33F] text-black font-semibold px-6 py-3 rounded-full hover:brightness-110 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* Social icons with stagger animation */}
          <motion.div
            className="flex justify-end gap-5 mt-6 text-[#333446]"
            variants={socialContainerVariants}
            initial="hidden"
            animate={controlsSocial}
          >
            {[Instagram, Facebook, Twitter, LinkedIn].map((Icon, index) => (
              <motion.div
                key={index}
                variants={socialIconVariants}
                className="cursor-pointer hover:text-[#F4C33F]"
              >
                <Icon />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-6 px-6 text-sm flex flex-col md:flex-row justify-between items-center text-[#333446]/80">
        <p>© 2022 Olipop, Inc. All Rights Reserved</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Do Not Sell My Information</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;