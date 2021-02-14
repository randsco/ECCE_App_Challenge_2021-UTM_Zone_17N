/** @jsx jsx */
import {
  RepeatedDataSourceProvider, jsx, AppMode, React,
  ExpressionResolverComponent, DataRecord, ImmutableArray,
  UseDataSource, ExpressionResolverErrorCode, LinkTo, LinkResult,
  LinkType, ImmutableObject, UrlParameters, utils, classNames
} from 'jimu-core';
import { ListGroupItem, styleUtils, _Link as Link, LinkTarget } from 'jimu-ui';
import { FixedLayoutViewer } from 'jimu-layouts/layout-runtime';
import { Status } from '../../config';
import ListCard, { ListCardProps, ListCardStates } from './list-card-base';
import { IMLinkParam } from 'jimu-ui/advanced/setting-components';
import { Fragment } from 'react';

interface ListCardViewerProps extends ListCardProps {
  useDataSources: ImmutableArray<UseDataSource>;
  widgetId: string;
  /**
   * one or more expressions
   */
  linkParam: IMLinkParam;
  queryObject: ImmutableObject<UrlParameters>
}

interface ListCardViewerStates extends ListCardStates {
  url: string
}

export default class ListCardViewer extends ListCard<ListCardViewerProps, ListCardViewerStates>{

  layoutRef: any;
  linkRef: React.RefObject<HTMLButtonElement>;
  expressionRecords: { [key: string]: DataRecord }
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    }

    this.providerData = this.getNewProviderData();
    this.updateExpressionRecords();
    this.layoutRef = React.createRef();
    this.linkRef = React.createRef<HTMLButtonElement>();
  }

  private updateExpressionRecords = () => {
    this.expressionRecords = {};
    if (this.providerData?.dataSourceId && this.providerData?.record) {
      this.expressionRecords[this.providerData.dataSourceId] = this.providerData.record;
    }
  }

  onUrlExpResolveChange = result => {
    if (result.isSuccessful) {
      this.setState({ url: result.value });
    } else {
      const res: string = '';
      const errorCode = result.value;
      if (errorCode === ExpressionResolverErrorCode.Failed) {

      }

      this.setState({ url: res });
    }
  }

  shouldComponentUpdate(nextProps, nextStats){
    let shouldUpdate = this.shouldComponentUpdateExcept(nextProps, nextStats, ['listStyle'])
    shouldUpdate = shouldUpdate || !utils.isDeepEqual(this.props['listStyle'], nextProps['listStyle'])
    return shouldUpdate
  }

  // componentDidUpdate(preProps, preState){
  //   Object.keys(this.props).forEach(key => {
  //     if(this.props[key] !== preProps[key])
  //       console.log(`props has changed: ${key}`)
  //   })
  // }

  handleItemClick = (evt) => {
    const { onChange, active } = this.props;
    const { providerData, linkRef } = this;

    const tagName = (evt.target && evt.target.tagName) || '';
    if (!(tagName.toLowerCase() === 'a' || tagName.toLowerCase() === 'button' || evt.exbEventType === 'linkClick') && !active) {
      if (linkRef.current) {
        //Must stopPropagation from link click, or this method will be called twice.
        linkRef.current.click();
      }
    }

    // if click sub widget event, don't un select
    if (active) {
      const tagName = (evt.target && evt.target.tagName) || '';
      if (!(tagName.toLowerCase() === 'a' || tagName.toLowerCase() === 'button' || evt.exbEventType === 'linkClick')) {
        onChange(providerData && providerData.record);
      }
    } else {
      onChange(providerData && providerData.record);
    }
    if (evt.exbEventType === 'linkClick') {
      delete evt.exbEventType
    }
  }

  handleLinkClick = evt => {
    evt.stopPropagation();
  }

  render() {
    const { selectable, active, cardConfigs, widgetId, listStyle,
      layouts, hoverLayoutOpen, appMode, isHover, linkParam,
      useDataSources } = this.props;
    let { queryObject } = this.props;
    const { url } = this.state;
    const isInBuilder = window.jimuConfig.isInBuilder;
    let layout = undefined;
    let bgStyle = undefined;
    let target: LinkTarget;
    let linkTo: LinkTo;
    if (isInBuilder && appMode !== AppMode.Run) {
      bgStyle = cardConfigs[Status.Regular].backgroundStyle;
      layout = layouts[Status.Regular];
    } else {
      layout = layouts[Status.Regular]
      bgStyle = cardConfigs[Status.Regular].backgroundStyle;
      if (linkParam && linkParam.linkType) {
        target = linkParam.openType;
        linkTo = {
          linkType: linkParam.linkType
        } as LinkResult;

        if (linkParam.linkType === LinkType.WebAddress) {
          linkTo.value = url;
          queryObject = undefined;
        } else {
          linkTo.value = linkParam.value;
        }
      }
      if (hoverLayoutOpen && isHover && layouts[Status.Hover]) {
        layout = layouts[Status.Hover]
        bgStyle = cardConfigs[Status.Hover].backgroundStyle;
      }
      if (selectable && active && layouts[Status.Selected]) {
        layout = layouts[Status.Selected]
        bgStyle = cardConfigs[Status.Selected].backgroundStyle;
        queryObject = undefined;
        linkTo = undefined;
        target = undefined;
      }
    }

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(bgStyle || {} as any),
    };

    const cardContentStyle: any = {
      ...styleUtils.toCSSStyle({
        borderRadius: bgStyle?.borderRadius || 0,
      } || {} as any),
    };

    const newProviderData = this.getNewProviderData();
    if (!this.isProviderEqual(newProviderData, this.providerData)) {
      this.providerData = newProviderData;
      this.updateExpressionRecords();
    }

    return (
      <RepeatedDataSourceProvider
        data={this.providerData}
      >

        <ListGroupItem
          active={selectable && active}
          css={this.getStyle()}
          style={{...listStyle, ...cardContentStyle}}
          className={classNames('surface-1',`list-card-${widgetId}`)}
          onClick={this.handleItemClick}
        >
          <div className="list-card-content d-flex"
            style={mergedStyle}
          >
            <div className="position-relative h-100 w-100">
              <Fragment>
                <Link
                  className="p-0 w-100 h-100 position-absolute border-0 list-clear-background"
                  ref={this.linkRef}
                  to={linkTo}
                  onClick={this.handleLinkClick}
                  target={target}
                  queryObject={queryObject} ></Link>
                <div className="d-flex w-100 h-100" ref={this.layoutRef}>
                  <FixedLayoutViewer layouts={layout}></FixedLayoutViewer>
                </div>
              </Fragment>
            </div>

          </div>
          <ExpressionResolverComponent useDataSources={useDataSources} expression={linkParam?.expression}
            /* records={this.expressionRecords}  */onChange={this.onUrlExpResolveChange} widgetId={this.props.widgetId}
          />
        </ListGroupItem>

      </RepeatedDataSourceProvider>
    )
  }
}