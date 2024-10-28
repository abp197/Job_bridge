import React from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" className="py-12">
      {/* Introduction Section */}
      <Box mb={8} textAlign="center">
        <Typography variant="h3" gutterBottom className="font-bold">
          About Job Bridge
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Job Bridge is a platform dedicated to connecting job seekers with career opportunities and helping businesses find the right talent.
          Our mission is to bridge the gap between talent and opportunity through a seamless and innovative platform.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box mb={8} textAlign="center">
        <Typography variant="h4" gutterBottom className="font-semibold">
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We strive to empower individuals and organizations by simplifying the job search and recruitment process.
          Our mission is to create meaningful career connections and foster professional growth.
        </Typography>
      </Box>

      {/* Values Section */}
      <Box mb={8} textAlign="center">
        <Typography variant="h4" gutterBottom className="font-semibold">
          Our Values
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Integrity
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We uphold honesty and integrity in everything we do.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Innovation
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We constantly innovate to provide the best solutions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Collaboration
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We believe in the power of teamwork to drive success.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Excellence
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We strive for excellence in all our endeavors.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom className="font-semibold">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Example team member */}
          <Grid item xs={12} sm={6} md={3}>
            <Avatar alt="Shubham Patil" src="https://via.placeholder.com/150" sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
            <Typography variant="h6">Shubham Patil</Typography>
            <Typography variant="body2" color="textSecondary">
              Founder & CEO
            </Typography>
          </Grid>
          {/* Add more team members similarly */}
        </Grid>
      </Box>
    </Container>
  );
}

export default About;
