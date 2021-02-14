import { ThemeVariables, css, SerializedStyles } from 'jimu-core';
import { StyleType, StyleConfig, FontSizeType} from '../../config';

export function getStyle(theme: ThemeVariables, styleType: StyleType, styleConfig: StyleConfig): SerializedStyles {

  let color;
  const backgroundColor = 'transparent';
  const containerColor = styleConfig.backgroundColor ? styleConfig.backgroundColor : theme.surfaces[1].bg;
  let fontSizeObj;

  const noFountSize = '';
  let fontSizeUnit;
  let baseFontSize;
  let fontSize = noFountSize;
  let fontSizeH1 = noFountSize;
  let fontSizeH2 = noFountSize;
  let fontSizeLtH2 = noFountSize;
  let fontSizeBody = noFountSize;
  let fontSizeSmall = noFountSize;
  //let font_size__header_text;

  if(styleType === 'custom') {
    color = styleConfig.textColor ? styleConfig.textColor : theme.colors.black;
    fontSizeObj = styleConfig.fontSize;

    if(fontSizeObj && fontSizeObj.distance !== 0 && styleConfig.fontSizeType !== FontSizeType.auto) {
      fontSizeUnit = fontSizeObj.unit;
      baseFontSize = fontSizeObj.distance;
      fontSize = baseFontSize + fontSizeUnit;
      fontSizeH1 = Math.round(baseFontSize * 1.428) + fontSizeUnit; //1.428em
      fontSizeH2 = Math.round(baseFontSize * 1.142) + fontSizeUnit; //1.142em
      fontSizeLtH2 = baseFontSize;
      fontSizeBody = Math.round(baseFontSize * 0.857) + fontSizeUnit; //0.857em
      fontSizeSmall = Math.round(baseFontSize * 0.857) + fontSizeUnit;
      //font_size__header_text = Math.round(baseFontSize * 1.143) + fontSizeUnit; //1.142em
    }

  } else if (styleType === 'syncWithTheme') {
    baseFontSize = noFountSize
    color = theme.colors.black;
  } else {
    baseFontSize = noFountSize
    color = '';
  }

  //if(fontSizeObj && fontSizeObj.distance !== 0) {
  //  fontSizeUnit = fontSizeObj.unit;
  //  baseFontSize = fontSizeObj.distance;
  //  fontSize = baseFontSize + fontSizeUnit;
  //  fontSizeH1 = Math.round(baseFontSize * 1.428) + fontSizeUnit; //1.428em
  //  fontSizeH2 = Math.round(baseFontSize * 1.142) + fontSizeUnit; //1.142em
  //  fontSizeLtH2 = baseFontSize;
  //  fontSizeBody = Math.round(baseFontSize * 0.857) + fontSizeUnit; //0.857em
  //  fontSizeSmall = Math.round(baseFontSize * 0.857) + fontSizeUnit;
  //  //font_size__header_text = Math.round(baseFontSize * 1.143) + fontSizeUnit; //1.142em
  //} else {
  //  baseFontSize = noFountSize;
  //  fontSize = noFountSize;
  //  fontSizeH1 = noFountSize;
  //  fontSizeH2 = noFountSize;
  //  fontSizeLtH2 = noFountSize;
  //  fontSizeBody = noFountSize;
  //  fontSizeSmall = noFountSize;
  //  //font_size__header_text = 'unset';
  //}


  return css`
    overflow: auto;
    .widget-featureInfo{
      width: 100%;
      height: 100%;
      background-color: ${containerColor};
      color: ${color};
      font-size: ${fontSize};
      .nav-section{
        height: 40px;
        border-bottom: 1px solid #a8a8a8;
        background-color: ${containerColor};
        .nav-btn{
          color: ${theme.colors.palette.primary[500]};
        }
        .nav-btn: hover{
          color: ${theme.colors.palette.primary[600]};
        }
        .nav-btn:focus{
          box-shadow: none;
        }
      }
      .feature-info-component{
        background-color: ${backgroundColor};
        padding: 0;
        .esri-feature__size-container{
          background-color: ${containerColor};
          color: ${color};
        }
        .esri-widget * {
          font-size: ${fontSize};
          color: ${color};
        }
        .esri-widget {
          background-color: transparent !important;
        }
        .esri-feature__title{
          padding: 10px 15px 0 15px;
          margin: auto;
        }
        .esri-feature__content-element{
        }
        .esri-widget__table tr td, .esri-widget__table tr th {
          font-size: ${fontSizeSmall};
        }
        .esri-feature__main-container{
        }
        .esri-feature__media-previous:focus{
          outline: none;
        }
        .esri-feature__media-next:focus{
          outline: none;
        }
        .esri-feature__title {
          font-size: ${fontSize};
        }
        .esri-feature h1 {
          font-size: ${fontSizeH1};
        }
        .esri-feature h2 {
          font-size: ${fontSizeH2};
        }
        .esri-feature h3,
        .esri-feature h4,
        .esri-feature h5,
        .esri-feature h6 {
          font-size: ${fontSizeLtH2};
        }
        .esri-feature p {
          font-size: ${fontSize};
        }

        .esri-feature figcaption {
          font-size: ${fontSizeSmall};
        }

        .esri-feature__media-item-title {
          font-size: ${fontSizeH2};
        }
        .esri-feature__media-item-caption {
          font-size: ${fontSizeBody};
        }
        .esri-feature__last-edited-info {
          font-size: ${fontSizeSmall};
        }

      }
    }
  `;
}
