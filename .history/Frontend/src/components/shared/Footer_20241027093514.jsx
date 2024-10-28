import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 bg-gray-800 text-white">
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Box mb={{ xs: 2, md: 0 }}>
            <Typography variant="h5" className="font-bold">
              Job Bridge
            </Typography>
            <Typography variant="body2">© 2024 Patil Group. All rights reserved.</Typography>
            <Typography variant="body2">Shubham Patil</Typography>
          </Box>
          
          <Box display="flex" justifyContent="center" mt={{ xs: 2, md: 0 }}>
            <IconButton href="https://facebook.com" aria-label="Facebook" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" aria-label="Twitter" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="" aria-label="LinkedIn" color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
