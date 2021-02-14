import { React, ThemeVariables, IntlShape } from 'jimu-core';
import { IMConfig, UiMode } from '../../../config';

export enum ExpandType {
  BtnRedirect,
  ShowInPopup
}
/* share items */
export enum ShownMode {
  Btn,
  Content
}

export interface BaseItemConstraint {
  uiMode: UiMode;
  url: string;//longUrl?: string;
  isShowInModal: boolean; //for btn shadow
  shownMode: ShownMode;

  getAppTitle: (() => string);
  onItemClick: ((name: string, ref: React.RefObject<any>, type: ExpandType, isUpdateUrl?: boolean) => void);
  onBackBtnClick?: (() => void);

  //jimu-builder
  intl: IntlShape;
  theme: ThemeVariables;
  config: IMConfig;
}

//backBtn's behavior
export interface IBackable {
  onBackBtnClick: ((evt: React.MouseEvent<HTMLDivElement>) => void)
}

export default abstract class BaseItem<Props = unknown, State = unknown> extends React.PureComponent<BaseItemConstraint & Props, State>{
  abstract onClick(ref): void;

  openInNewTab(url: string): void {
    const win = window.open(url, '_blank');
    win.focus();
  }

  //Messages
  getAppTitle(): string {
    return this.props.getAppTitle();
  }
  getMsgBy(): string {
    return ' by ArcGIS Experience Builder';
  }
}