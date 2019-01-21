import React from 'react';
import {
  Carousel,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
  Container
} from "mdbreact";

const MainCarousel = () => (
  <Container>
    <Carousel
      activeItem={1}
      length={4}
      showControls={true}
      showIndicators={false}
      className="z-depth-1"
    >
      <CarouselInner>
        <CarouselItem itemId="1">
          <View>
            <img
              className="d-block w-100"
              src={require('../../assets/dashboard/carousel/carousel1.jpg') }
              alt="Rugby"
            />
            <Mask overlay="black-light" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive"><b>VIP Bets only for hard men!</b></h3>
            <p><b>Bet today and receive a bonus!</b></p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem itemId="2">
          <View>
            <img
              className="d-block w-100"
              src={require('../../assets/dashboard/carousel/carousel2.jpg') }
              alt="Cyclists"
            />
            <Mask overlay="black-strong" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive"><b>Don't be a pedal!</b></h3>
            <p><b>Special offer only to 12 PM</b></p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem itemId="3">
          <View>
            <img
              className="d-block w-100"
              src={require('../../assets/dashboard/carousel/carousel3.jpg') }
              alt="Third slide"
            />
            <Mask overlay="black-strong" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive"><b>Get 500 $ bonus for registration</b></h3>
            <p><b>Hurry up! The action lasts to 31 Dec 2030</b></p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem itemId="4">
          <View>
            <img
              className="d-block w-100"
              src={require('../../assets/dashboard/carousel/carousel4.jpg') }
              alt="Mattonit's item"
            />
            <Mask overlay="black-strong" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive"><b>Woman's football? Really?</b></h3>
            <p><b>Dude, watch Champions League today in JP TV!</b></p>
          </CarouselCaption>
        </CarouselItem>
      </CarouselInner>
    </Carousel>
  </Container>
);

export default MainCarousel;