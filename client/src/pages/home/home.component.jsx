import React from 'react';
import { Container, Typography } from '@material-ui/core';
import MobileImage from '../../assets/mobile-frame.png';
import GoogleStoreImage from '../../assets/google-store.png';
import AppleStoreImage from '../../assets/apple-store.png';

const Home = () => {
  return (
    <Container
      style={{
        marginTop: 100,
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <div style={{ margin: 'auto 0' }}>
        <Typography variant="h1" style={{ color: 'white' }}>
          Careers Network
        </Typography>
        <Typography
          variant="h5"
          style={{ color: 'white', marginTop: 20, marginLeft: 10 }}
        >
          Find your perfect employe /r/e
        </Typography>
        <Typography
          variant="body1"
          style={{ color: 'white', marginTop: 10, marginLeft: 10 }}
        >
          Use Careers Network mobile app now to find your awesome employer /
          employee
        </Typography>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 50
          }}
        >
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ width: 250, height: 73 }}
              src={GoogleStoreImage}
              alt="Get it on Google Play Store"
            />
          </a>
          <a
            href="https://www.apple.com/ios/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ width: 250, height: 73 }}
              src={AppleStoreImage}
              alt="Get it on App Store"
            />
          </a>
        </div>
      </div>
      <img
        style={{ height: '70vh' }}
        src={MobileImage}
        alt="Careers Network App"
      />
    </Container>
  );
};

export default Home;
