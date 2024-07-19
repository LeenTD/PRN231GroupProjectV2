import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Carousel = ({ carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <Container  style={{ position: 'relative', marginTop: '10px', width:"full" }}>
      <Card style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="400"
          image={carouselItems[currentIndex].imageUrl}
          alt={carouselItems[currentIndex].title}
        />
        <CardContent
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {carouselItems[currentIndex].title}
          </Typography>
          <Typography variant="body2">
            {carouselItems[currentIndex].description}
          </Typography>
        </CardContent>
      </Card>
      <IconButton
        onClick={handlePrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          color: 'white',
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '16px',
          transform: 'translateY(-50%)',
          color: 'white',
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Container>
  );
};

export default Carousel;
