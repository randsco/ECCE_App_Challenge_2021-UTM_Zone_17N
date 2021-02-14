/** @jsx jsx */
import {
  UseDataSource, React, jsx, css, /*Immutable,*/ ImmutableArray, SerializedStyles, polished,
  ThemeVariables, IntlShape
} from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { RouteItem/*, RecordType*/ } from './route-item';
import { Button, /*TextInput,*/ Icon } from 'jimu-ui';
import { IMConfig, Routes, RecordStyleConstraint, /*RotateRecord, PathRecord,*/ FlyStyle, } from '../../config';
import { Fragment } from 'react';
import { SettingSection } from 'jimu-ui/advanced/setting-components';
//import { PageMode } from '../setting';

interface Props {
  widgetId?: string;
  theme: ThemeVariables;
  // buttonLabel?: string;
  title?: string;
  intl: IntlShape;
  config?: IMConfig;
  useMapWidgetIds?: ImmutableArray<string>;
  useDataSources?: ImmutableArray<UseDataSource>;
  jimuMapView: JimuMapView;

  flyModeIdx: number;
  recoordModeConfig: RecordStyleConstraint;
  //onRouteChange: ((records, idx) => void);
  //onShowDialogChange: ((isShow: boolean) => void);
  //onSettingPageModeChange: ((mode: PageMode) => void);
  onRouteSelect: ((flyModeIdx: number, recordIdx: number) => void);
  getRoutesLen: ((flyModeIdx: number) => number);
  onRouteAdd: ((routeInfo:RecordStyleConstraint, flyModeIdx: number, routeIdx: number) => void);
  onRouteDelete: ((routeInfo:RecordStyleConstraint, flyModeIdx: number, routeIdx: number) => void);
}
interface States {
  //isShowDialog: boolean;
  //recoordModeConfig: RecordStyleConstraint;
  //activedRouteIdx: number;
  //activedParentsIdx: number;
}


export class RouteList extends React.PureComponent<Props, States>{

  constructor(props) {
    super(props);

    this.state = {
      //isShowDialog: false,
      //activedRouteIdx: null,
      //activedParentsIdx: null,
      //recoordModeConfig: null,
      //isShowDialog: false,
    }
  }
  // componentDidMount() {
  //   if (true === this.props.recoordModeConfig.isInUse) {
  //     this.setState({ recoordModeConfig: this.props.recoordModeConfig });
  //   }
  // }

  onSelect = (routeIdx: number) => {
    this.props.onRouteSelect(this.props.flyModeIdx, routeIdx);
  }
  onNameTextChange = (id: number | string, newText: string, key: string) => {
    // const { config } = this.props;
    // const oriBookmarks = config.bookmarks;
    // const fixIndex = oriBookmarks.findIndex(x => x.id === id);
    // const newBookmark = oriBookmarks.map((item,index)=>{
    //   if(fixIndex === index){
    //     return item.set(key, newText);
    //   }
    //   return item;
    // })
    //this.onPropertyChange('bookmarks', newBookmark);
  }
  handleKeydown = (e: any, ref) => {
    if (e.keyCode === 13) {
      ref.current.blur();
    } else {
      return
    }
  }

  onAddRoute = () => {
    let recoordModeConfig = Object.assign({}, this.props.recoordModeConfig);
    let routesLen = this.props.getRoutesLen(this.props.flyModeIdx);
    if (!recoordModeConfig) {
      recoordModeConfig = {
        id: 0,//first one
        name: FlyStyle.Record,
        isInUse: true,
        direction: null,
        routes: [],
      } as RecordStyleConstraint;

      routesLen = 0;
    }

    const newRoute = {
      idx: routesLen,
      isInUse: true,
      type: null,
      records: [],
      displayName: 'route_ ' + routesLen,
    } as Routes;
    recoordModeConfig.routes.push(newRoute);

    this.props.onRouteAdd(recoordModeConfig, this.props.flyModeIdx, routesLen);
  }
  onRouteDelete = (idx: number) => {
    const recoordModeConfig = Object.assign({}, this.props.recoordModeConfig);
    this.props.onRouteDelete(recoordModeConfig, this.props.flyModeIdx, idx);
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      .records-list {
        border: 1px solid #888;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: ${polished.rem(4)};
        .record-name-input {
          padding: 3px 0;
          width: 110px;
        }
      }
      .records-list:hover {
        cursor: pointer;
        background: ${theme.colors.secondary};
        border-left: 2px solid ${theme.colors.primary};
      }
      `
  }

  render() {
    //const { widgetId, theme, title, useDataSources, useMapWidgetIds, jimuMapView, intl, config } = this.props;
    const { theme, intl} = this.props;
    //const { /*isShowDialog, activedRouteIdx*/ } = this.state;

    return <SettingSection>
      11111: routeList in setting page
      <div className="">
        Add new route
        <Button className="mr-1" onClick={this.onAddRoute}> + </Button>
      </div>

      <div className={'w-100'} css={this.getStyle(this.props.theme)}>
        {
          this.props.recoordModeConfig?.routes?.map((route, index) => {
            //routes
            return <div key={index}>
              <Fragment>
                <div className={/*`${activedRouteIdx === route.idx ? 'active-mark' : ''  records-list`*/'d-flex'}>
                  <div>{route.displayName || ''}</div>

                  <span className="">
                    <Button title={''} type="tertiary" onClick={() => this.onSelect(route.idx)}>{'edit'}</Button>

                    <Button title={''} type="tertiary" icon onClick={() => this.onRouteDelete(route.idx)}>
                      <Icon icon={require('jimu-ui/lib/icons/delete.svg')} size={12} />
                    </Button>

                    <Button title={''} type="tertiary">{'isUse'}</Button>
                  </span>
                </div>
              </Fragment>
              {/*mode: RecordType*/}
              {route.records && route.records.map((subItems, index) => {
                return <Fragment key={index}>
                  <RouteItem
                    item={subItems}
                    theme={theme}
                    intl={intl}
                  ></RouteItem>
                </Fragment>
              })}
            </div>
          })
        }
      </div>
    </SettingSection>
  }
}