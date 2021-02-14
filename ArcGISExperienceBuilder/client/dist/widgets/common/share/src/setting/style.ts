import {ThemeVariables, css, SerializedStyles/*, polished*/} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{
  var bgColor = theme.colors.palette.light[200];
  return css`
      font-size: 13px;
      font-weight: lighter;

      .jimu-widget-setting--section {
        padding: 18px 16px;
      }

      .ui-mode-setting {
        display: flex;
      }

      /* ui-mode */
      .ui-mode-card-chooser{
        display: flex;
        align-items: start;

        .ui-mode-card-wapper {
          width: 49%
        }
        .ui-mode-card-separator {
          width: 2%
        }
        .ui-mode-card {
          flex: 1;
          width: 100%;
          background: ${bgColor};
          border: 2px solid ${bgColor};
          margin: 0 0 0.5rem 0;
        }
        .ui-mode-card.active {
          border: 2px solid #00D8ED;
        }
        .ui-mode-label {
          overflow: hidden;
          text-align: center;
        }
      }

      .icon-tip {
        margin: 0;
        color: #c5c5c5;
        font-weight: 400;
      }
  `
}