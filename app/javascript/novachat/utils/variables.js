//Fonts
const MainFontFamily = 'Avenir Next';
const MainFontSize = '13px';

// Colors
const BrandMainColor = '#2A1688';
const BrandSecondaryColor = '#B941A7';
const MainFontColor = '#0F0F0F';
const SecondaryFontColor = '#828285';
const ActiveColor = '#65A322';

//Sizes
const BorderRadius = '8px';
const HeaderSmall = 76;
const AvatarBigSize = '54px';
const AvatarSmallSize = '33px';
const ChatWidth = 378;
const ChatHeight = '630px';
const ChatInputHeight = '50px';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export default {
  MainFontFamily,
  MainFontSize,
  BrandMainColor,
  BrandSecondaryColor,
  BorderRadius,
  MainFontColor,
  SecondaryFontColor,
  HeaderSmall,
  AvatarBigSize,
  AvatarSmallSize,
  ActiveColor,
  ChatWidth,
  ChatHeight,
  ChatInputHeight,
  media: size,
  device,
};
