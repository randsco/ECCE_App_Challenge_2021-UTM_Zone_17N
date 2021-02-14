import {ThemeVariables, css, SerializedStyles, polished} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{

  return css`
    .widget-setting-link {
      overflow-y: auto;
      font-size: 13px;
      font-weight: lighter;
      .collapse-label{
        color: ${theme.colors.palette.dark[400]};
      }
      .font-size-container{
        width: ${polished.rem(82)};
      }
    }

  `
}