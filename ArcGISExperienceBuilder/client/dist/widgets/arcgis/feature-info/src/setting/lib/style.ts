import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {
  return css`
    .widget-setting-featureInfo{
      font-weight: lighter;
      font-size: 13px;

      .second-header {
        color: ${theme.colors.palette.dark[600]};	
      }

      .webmap-thumbnail{
        cursor: auto;
        width: 100%;
        height: 120px;
        overflow: hidden;
        padding: 1px;
        border: ${polished.rem(2)} solid initial;
        img, div{
          width: 100%;
          height: 100%;
        }
      }

      .featureInfo-options-part{
        background-color: ${theme.colors.palette.light[200]};
        padding: 0.5rem;
      }

      .featureInfo-options{
        .featureInfo-options-item{
          display: flex;
          justify-content: space-between;
          /* margin-bottom: 8px; */
        }
      }
    }
  `;
}
