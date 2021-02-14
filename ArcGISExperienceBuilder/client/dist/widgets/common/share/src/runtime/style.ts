import {ThemeVariables, css, SerializedStyles} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{
  //let theme = this.props.theme;
  return css`
    width: 100%;
    height: 100%;
    overflow: auto;

    .items {
      display: flex;
    }
    `;
}

export function getPopupStyle(theme: ThemeVariables): SerializedStyles{
  //let theme = this.props.theme;
  return css`
    padding: 1rem;
    /*margin: 0.5rem;*/
    min-width: 480px;

    .popup-header .title{
      font-weight: bolder;
      font-size: 1rem;
    }

    .popup-header .jimu-icon{
      margin: 0;
    }

    .popup-items-wapper {
      margin: 1rem -0.5rem 0 -0.5rem;
    }
    `;
}