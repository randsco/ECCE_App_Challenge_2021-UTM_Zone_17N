import { css, polished, SerializedStyles, AppMode, utils, IMThemeVariables} from 'jimu-core';
import { ListProps } from '../widget';
import { DirectionType, LIST_CARD_PADDING, PageStyle,
  DS_TOOL_BOTTOM_PADDING, DS_TOOL_H, BOTTOM_TOOL_TOP_PADDING, BOTTOM_TOOL_H, COMMON_PADDING, CardSize } from '../../config';

interface LisStyleOption {
  pageStyle: PageStyle,
  scrollBarOpen: boolean,
  direction: DirectionType,
  appMode: AppMode,
  theme: IMThemeVariables,
  isHeightAuto: boolean,
  isWidthAuto: boolean,
  currentCardSize: CardSize,
  showTopTools: boolean,
  bottomToolH: number,
  topRightToolW: number,
  hasRecords: boolean
}

export const listStyle = utils.memoize(function(options: LisStyleOption): SerializedStyles{
  const {showTopTools, bottomToolH, topRightToolW, hasRecords, currentCardSize, direction, pageStyle, scrollBarOpen, appMode, theme, isHeightAuto, isWidthAuto} = options;
  const topToolsH = showTopTools ? DS_TOOL_H : 0;
  const isHorizon = direction === DirectionType.Horizon;
  const flexDirection = direction === DirectionType.Horizon ? 'column' : 'row'
  return css`
    &.list-container {
      /* position: ${isHeightAuto ? 'absolute' : 'relative'}; */
      position: relative;
      z-index: 0;
      overflow: hidden;
      .bottom-boundary {
        height: 2px;
        width: 2px;
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0;
      }
      ${direction === DirectionType.Horizon ?
    `
          margin-left: ${LIST_CARD_PADDING + 'px'};
          height: ${isHeightAuto ? 'auto' : '100%'};
          width: ${isWidthAuto ? 'auto' : `calc(100% - ${LIST_CARD_PADDING + 'px'})`};
        ` :
    `
          margin-top: ${LIST_CARD_PADDING + 'px'};
          width: ${isWidthAuto ? 'auto' : '100%'};
          height: ${isHeightAuto ? 'auto' : `calc(100% - ${LIST_CARD_PADDING + 'px'})`};
        `}


      .editing-mask-list {
        position: absolute;
        top: ${(direction === DirectionType.Vertical && hasRecords) ? currentCardSize.height + topToolsH : topToolsH}px;
        left: ${(direction === DirectionType.Horizon && hasRecords) ? currentCardSize.width : 0}px;
        bottom: ${polished.rem(bottomToolH)};
        right: 0;
        z-index: 10;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .editing-mask-ds-tool {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .editing-mask-bottom-tool {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .tip-mask-list {
        position: absolute;
        top: ${topToolsH}px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        padding-top: 20%;
      }

      .datasource-tools {
        position: relative;
        height: ${polished.rem(topToolsH)};
        padding-bottom: ${polished.rem(DS_TOOL_BOTTOM_PADDING)};
        .sort-fields-input {
          width: 200px;
          margin-left: 8px;
          margin-right: 16px;
        }

        .tool-row {
          height: ${DS_TOOL_H - DS_TOOL_BOTTOM_PADDING}px;
        }
        .ds-tools-line {
          width: 100%;
          height: 1px;
          margin-top: ${polished.rem(6)};
          background-color: ${theme.colors.palette.light[500]};
        }
        .ds-tools-line-blue {
          background-color: ${theme.colors.palette.info[500]};
        }
        .list-search-div {
          width: calc(100% - ${topRightToolW}px);
          .list-search {
            margin-bottom: ${polished.rem(-4)};
            width: 100%;
          }
        }

      }
      .tools-menu {
        color: ${theme.colors.palette.light[800]};
        margin-top: ${polished.rem(4)};
      }
      .tools-menu:hover {
        color: ${theme.colors.palette.info[500]};
      }
      .bottom-tools {
        position: relative;
        padding-top: ${polished.rem(BOTTOM_TOOL_TOP_PADDING)};
        min-height: ${polished.rem(BOTTOM_TOOL_H)};
        .scroll-navigator {
          .btn {
            border-radius: ${theme.borderRadiuses.circle};
          }
        }
      }

      .widget-list-list:focus {
        outline: none;
      }
      .widget-list-list {
        &>div {
          position: relative;
          flex: 1;
          box-sizing: content-box;
          ${isHorizon && `padding-right: ${polished.rem(15)}`};
          ${!isHorizon && `padding-bottom: ${polished.rem(15)}`};
        }
        padding: 0;
        position: relative;
        /* box-sizing: border-box; */
        ${(!window.jimuConfig.isInBuilder || appMode === AppMode.Run) ? `overflow-${isHorizon ? 'y' : 'x'}: hidden !important;` : 'overflow: hidden !important;'}
        height: ${isHeightAuto ? 'auto' : `calc(100% - ${topToolsH}px - ${ bottomToolH }px)`} !important;
        width: ${isWidthAuto ? 'auto' : '100%'} !important;
        display: flex;
        ${`flex-direction: ${flexDirection}`};
        ${isHeightAuto && `min-height: ${currentCardSize.height}px;`};
        ${isWidthAuto && `min-width: ${currentCardSize.width}px;`};
        ${isHorizon ?
    `
              ${`max-width: ${document.body.scrollWidth}px`};
            ` :
    `
              ${`max-height: ${document.body.scrollHeight}px`};
            `
}
      }
      ${pageStyle === PageStyle.Scroll && !scrollBarOpen ?
    `
          .widget-list-list::-webkit-scrollbar {
            display: none; //Safari and Chrome
          }
          .widget-list-list {
              -ms-overflow-style: none; //IE 10+
              overflow: -moz-scrollbars-none; //Firefox
          }
        ` : ''}
    }
  `
})

export function getStyle(props: ListProps, isEditing: boolean, showBottomTool: boolean): SerializedStyles{
  const {config, id, appMode, isHeightAuto, isWidthAuto, theme} = props;
  return css`
    ${'&.list-widget-' + id} {
      overflow: visible;
      background-color: transparent;
      border: ${polished.rem(COMMON_PADDING)} solid ${polished.rgba(theme.colors.black, window.jimuConfig.isInBuilder && isEditing ? 0.2 : 0)};
      height: ${isHeightAuto ? 'auto' : '100%'};
      width: ${isWidthAuto ? 'auto' : '100%'};
      .list-with-mask {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: ${polished.rgba(theme.colors.black, 0)};
        z-index: 1;
      }
      .refresh-loading-con {
        right: 0;
        bottom:${showBottomTool ? polished.rem(BOTTOM_TOOL_H) : 0};
        align-items: center;
        height: ${polished.rem(24)};
        .auto-refresh-loading {
          background: ${polished.rgba(theme.colors?.palette?.dark?.[100], 0.2)};
          color: ${theme.colors?.black};
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(24)};
          padding: 0 ${polished.rem(7)};
        }
        &.horizon-loading {
          bottom:${showBottomTool ? polished.rem(BOTTOM_TOOL_H+6) : polished.rem(6)};
        }
        &.vertical-loading {
          right: ${polished.rem(6)};
        }
      }
      .loading-con {
        @keyframes loading {
          0% {transform: rotate(0deg); };
          100% {transform: rotate(360deg)};
        }
        width: ${polished.rem(16)};
        height: ${polished.rem(16)};
        border: 1px solid ${theme?.colors?.palette?.dark?.[100]};
        border-radius: 50%;
        border-top: 1px solid ${theme?.colors?.palette?.dark?.[800]};
        box-sizing: border-box;
        animation:loading 2s infinite linear;
        margin-right: ${polished.rem(4)};
      }
      .widget-list {
        overflow: ${(window.jimuConfig.isInBuilder && appMode !== AppMode.Run) ? 'hidden' : 'auto'};
        height: ${isHeightAuto ? 'auto' : '100%'};
        width: ${isWidthAuto ? 'auto' : '100%'};
        /* align-items: ${config.alignType};
        justify-content: ${config.alignType}; */
        ${
  config.direction === DirectionType.Horizon ?
    `
            overflow-y: hidden;
          ` :
    `
            overflow-x: hidden;
          `
}
      }
    }

  `
}

export function getToolsPopperStyle(props: ListProps): SerializedStyles{
  const { theme } = props;
  return css `
    &{
      padding: ${polished.rem(6)} ${polished.rem(11)};
      height: ${polished.rem(40)};
      width: ${polished.rem(246)};
    }
    .ds-tools-line {
      width: 100%;
      height: 1px;
      background-color: ${theme.colors.palette.light[500]};
    }
    .ds-tools-line-blue {
      background-color: ${theme.colors.palette.info[500]};
    }
    .close-search {
      margin-top: ${polished.rem(-6)};
    }
  `
}

export function getSearchToolStyle(props: ListProps): SerializedStyles{
  const { theme } = props;
  return css `
    .close-search {
      border: 1px solid ${theme.colors.palette.light[500]};
      box-sizing: border-box;
      background-color: ${theme.colors.white};
    }
    .search-box-content {
      flex-direction: column;
      align-items: flex-start;
    }
  `
}