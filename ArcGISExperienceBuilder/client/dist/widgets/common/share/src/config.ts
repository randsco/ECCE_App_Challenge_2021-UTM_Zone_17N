//import { ImageParam } from 'jimu-ui';
import { ImmutableObject, IMIconResult, Immutable } from 'jimu-core';

export enum UiMode {
  Popup = 'POPUP',
  Inline = 'INLINE',
  //Slide = 'SLIDE'
}

export enum InlineDirection {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL'
}

//popup mode
export enum BtnIconSize{
  Small = 'sm',
  Medium = 'default',
  Large = 'lg',
}

//inline mode
export enum IconColorMode{
  Default = 'default',
  White = 'white',
  Black = 'black'
}
export enum IconSize{
  Small = 16, //'sm',
  Medium = 24, //'default',
  Large = 32//'lg',
}
export enum IconRadius {
  Rad00 = 0,
  Rad20 = '5px',
  Rad50 = '50%',
}

//items
export enum ItemsName {
  Embed = 'embed',
  QRcode = 'qrcode',
  Sharelink = 'sharelink',
  Email = 'email',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Pinterest = 'pinterest',
  Linkedin = 'linkedin'
}

/* widget config */
export interface ShareConfig {
  uiMode: UiMode;
  //imgSrc: string;
  //imageParam?: ImmutableObject<ImageParam>;
  popup: {
    icon: IMIconResult | '';
    items: (ItemsName)[];
    tooltip: string;
  };
  inline: {
    items: (ItemsName)[];
    design: {
      direction: InlineDirection;
      btnRad: IconRadius;
      hideLabel: boolean;
      btnColor: string;
      iconColor: IconColorMode;
      size: IconSize;
      //numOfDisplay: number
    }
  };
  // slide: {
  //   items: string[];
  // }
}
export type IMConfig = ImmutableObject<ShareConfig>;


/* default config */
const shareIconImage = require('./assets/icons/default-main-icon.svg');
export const DefaultIconConfig = Immutable({
  svg: shareIconImage,
  properties: {
    color: '#c5c5c5',
    size: IconSize.Small,
    inlineSvg: true
  }
});
