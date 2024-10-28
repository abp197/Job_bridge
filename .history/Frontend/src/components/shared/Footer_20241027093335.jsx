import React from 'react';
import { Container, Typography, Box, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 py-6 bg-gray-900 text-gray-300">
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          mb={3}
        >
          <Box mb={{ xs: 2, md: 0 }}>
            <Typography variant="h5" className="font-bold" gutterBottom color="primary">
              Job Hunt
            </Typography>
            <Typography variant="body2" color="textSecondary">
              © 2024 Patil Group. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Shubham Patil
            </Typography>
          </Box>
          
          <Box display="flex" gap={1} mt={{ xs: 2, md: 0 }}>
            <IconButton
              href="https://facebook.com"
              aria-label="Facebook"
              color="inherit"
              sx={{ '&:hover': { color: '#4267B2' } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              aria-label="Twitter"
              color="inherit"
              sx={{ '&:hover': { color: '#1DA1F2' } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              aria-label="LinkedIn"
              color="inherit"
              sx={{ '&:hover': { color: '#0A66C2' } }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Designed and developed by Patil Group
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
