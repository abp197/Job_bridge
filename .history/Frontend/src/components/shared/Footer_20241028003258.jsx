/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography, Box, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 bg-gray-800 text-white">
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start">
          {/* About Section */}
          <Box mb={{ xs: 4, md: 0 }} width={{ xs: '100%', md: '30%' }}>
            <Typography variant="h5" className="font-bold">
              Job Bridge
            </Typography>
            <Typography variant="body2" mt={1}>
              Job Bridge is a platform dedicated to connecting job seekers with career opportunities.
            </Typography>
            <Typography variant="body2" mt={1}>© 2024 Patil Group. All rights reserved.</Typography>
            <Typography variant="body2">Shubham Patil</Typography>
          </Box>

          {/* Navigation Links */}
          <Box display="flex" flexDirection="column" mb={{ xs: 4, md: 0 }} width={{ xs: '100%', md: '20%' }}>
            <Typography variant="h6" gutterBottom className="font-semibold">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" variant="body2" underline="hover" mt={1}>
              Home
            </Link>
            <Link href="/jobs" color="inherit" variant="body2" underline="hover" mt={1}>
              Jobs
            </Link>
            <Link href="/contact" color="inherit" variant="body2" underline="hover" mt={1}>
              Contact Us
            </Link>
            <Link href="/about" color="inherit" variant="body2" underline="hover" mt={1}>
              About Us
            </Link>
          </Box>

          {/* Contact Information */}
          <Box display="flex" flexDirection="column" mb={{ xs: 4, md: 0 }} width={{ xs: '100%', md: '20%' }}>
            <Typography variant="h6" gutterBottom className="font-semibold">
              Contact Us
            </Typography>
            <Typography variant="body2" mt={1}>
              Email: aspa.dg4580@gmail.com
            </Typography>
            <Typography variant="body2" mt={1}>
              Phone: +123-456-7890
            </Typography>
            <Typography variant="body2" mt={1}>
              Address: 123 Main St, Sangli, India
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Box display="flex" justifyContent="center" mt={{ xs: 4, md: 0 }} width={{ xs: '100%', md: '20%' }}>
            <IconButton href="https://facebook.com" aria-label="Facebook" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" aria-label="Twitter" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="http://www.linkedin.com/in/shubham-patil-810736266" aria-label="LinkedIn" color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
