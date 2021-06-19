import { FooterComponent, FooterText } from '../styled_components/footerStyles';
import FooterLinks from './FooterLinks';
import React from 'react';

export default function Footer() {
  return (
    <FooterComponent>
      <FooterLinks />
      <FooterText>
        Created by Alex Younger as part of{' '}
        <a href="https://www.theodinproject.com">The Odin Project</a> Javascript
        curriculum track.
      </FooterText>
    </FooterComponent>
  );
}
