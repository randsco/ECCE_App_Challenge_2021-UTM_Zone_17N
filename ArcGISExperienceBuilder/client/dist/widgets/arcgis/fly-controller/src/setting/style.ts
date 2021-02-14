import { ThemeVariables, css, SerializedStyles } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {
  var bgColor = theme.colors.palette.light[200];
  return css`
    .widget-setting-fly-controller{
      font-weight: lighter;
      font-size: 13px;

      .select-map-descript {
        color: ${theme.colors.palette.dark[600]}
      }

      .flystyle-label {
        color: ${theme.colors.palette.dark[400]}
      }

      .hide {
        display: none;
      }

      .radio-wapper > span.jimu-radio {
        flex-shrink: 0;
      }

      .map-selector-section .component-map-selector .form-control{
        width: 100%;
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
    }
  `;
}

export function getSettingSectionStyles(items, idx) {
  var needHiden = false;
  if (false === items[idx].isInUse) {
    needHiden = true;
  }

  var klass = '';
  if (needHiden) {
    klass = 'hide'
  }

  return klass;
}