import { ThemeVariables, css, SerializedStyles } from 'jimu-core';
export function getStyle(theme: ThemeVariables): SerializedStyles {
  const surface = theme.surfaces[1];
  return css`
    /*.fly-wapper {*/
    position: relative;
    /*padding: 1px;*/
    border: ${surface.border.width} solid ${surface.border.color};
    /*}*/

    .bar {
      display:flex;

      .btns, dropdowns{
        width: 32px;
        height: 32px;
        border: none;
      }
      .btns {
        margin: 5px;
      }

      .speed-controller{
        margin: 0 8px;
      }

      .progress-bar-wapper {
        /*display: flex;*/
        position: absolute;
        width: 100%;
        bottom: 0px;
      }
      .items {
        display: flex;
        position: relative;
      }
      .items .item {
        display: flex;
        background: ${surface.bg};
      }
      .items .btn .jimu-icon{
        margin: 0;
      }
      .separator-line{
        width: 2px;
        margin: 4px 1px;
        border-right: ${surface.border.width} solid ${surface.border.color};
      }
      .speed-wapper{
        width: 214px;
      }
    }
    .bar .hide,
    .bar .items.hide {
      display: none;
    }
    `;
}

//Toggle speedController
export function getPlayPanelWapperClass(isPlaying) {
  var klass = 'hide';
  if (isPlaying) {
    klass = ''
  }
  return klass;
}
export function getSettingBtnsClass(isPlaying) {
  var klass = '';
  if (isPlaying) {
    klass = 'hide'
  }
  return klass;
}