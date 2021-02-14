import { ThemeVariables, css, SerializedStyles/*, getAppStore*/ } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {
  const surface = theme.surfaces[1];
  const playBtnSize = 48,
    commonBtnSize = 32,
    progressSize = 54;
  const speedBtnW = 40,
    speedBtnH = 16;
  const totalW = (commonBtnSize + 16) * 2 + playBtnSize;
  const totalH = commonBtnSize + 12 + playBtnSize;
  //const isRTL = getAppStore().getState().appContext.isRTL;
  const front = 'left';//isRTL ? "right" : "left";
  const back = 'right';//isRTL ? "left" : "right";

  return css`
    /*height: 100%;*/

    .palette-wapper {
      position: relative;
      width: ${totalW}px;
      height: ${totalH}px;
      /*background-color: #AAA;*/

      .hide{
        display: none;
      }

      .btns,
      .dropdowns{
        position: absolute;
        width: ${commonBtnSize}px;
        height: ${commonBtnSize}px;
        border-radius: 50%;
      }
      .btns:not(.active){
        background-color: ${surface.bg};
        border: ${surface.border.width} solid ${surface.border.color};
      }

      .play-btn{
        width: ${playBtnSize}px;
        height: ${playBtnSize}px;
        bottom: 0;
        ${front}: ${totalW / 2 - playBtnSize / 2}px;
      }
      .draw-btn{
        ${front}: 16px;
        top: 16px;
      }
      .pick-btn{
        top: 0;
        ${front}: ${totalW / 2 - commonBtnSize / 2}px;
      }
      .clear-btn{
        ${back}: 16px;
        top: 16px;
      }

      .flystyle-btn{
        ${front}: 0;
        bottom: ${playBtnSize / 2 - commonBtnSize / 2}px;
      }
      .liveview-btn{
        ${back}: 0;
        bottom: ${playBtnSize / 2 - commonBtnSize / 2}px;
      }

      .progress-bar-wapper{
        position: absolute;
        width: ${progressSize}px;
        height: ${progressSize}px;
        ${front}: ${totalW / 2 - progressSize / 2}px;
        bottom: 20px;
      }

      .speedcontroller-btn{
        position: absolute;
        width: ${speedBtnW}px;
        height: ${speedBtnH}px;
        bottom: 0;
        ${front}: 78px;
        border: ${surface.border.width} solid ${surface.border.color};
        border-radius: 10px;
        background-color: ${surface.bg};
      }

      .speedcontroller-text{
        font-size: 10px;
        padding: 0;

        .icon-btn-sizer{
          min-height: 0;
        }
      }
    }`;
}

export function getPaletteDropdownStyle(theme: ThemeVariables): SerializedStyles {
  return css`
    min-width: 60px;
    padding: 0;

    .speed-popup-wapper{
      font-size: 12px;

      .dropdown-item{
        padding-left: 0;
        padding-right: 0;
      }
    }`;
}


//Toggle speedController
export function getPlayPanelWapperClass(isPlaying) {
  var klass = 'hide';
  if (isPlaying) {
    klass = ''
  }
  return klass;
}
export function getFunctionalBtnsClass(isPlaying) {
  var klass = '';
  if (isPlaying) {
    klass = 'hide'
  }
  return klass;
}