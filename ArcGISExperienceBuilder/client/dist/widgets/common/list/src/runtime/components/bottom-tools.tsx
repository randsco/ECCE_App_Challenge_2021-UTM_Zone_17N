import {React, polished} from 'jimu-core'
import { Pagination, Button, Icon } from 'jimu-ui';
import { DirectionType, PageStyle} from '../../config';

const arrowDown12 = require('jimu-ui/lib/icons/arrow-down-12.svg');
const arrowUp12 = require('jimu-ui/lib/icons/arrow-up-12.svg');
const arrowLeft12 = require('jimu-ui/lib/icons/arrow-left-12.svg');
const arrowRight12 = require('jimu-ui/lib/icons/arrow-right-12.svg');

interface ListBottomToolProps{
  isRTL: boolean,
  totalPage: number,
  currentPage: number,
  pageStyle: PageStyle,
  direction: DirectionType,
  scrollStatus: 'start' | 'end' | 'mid',
  isEditing: boolean,
  isScrollEnd: boolean,
  handleScrollUp: (evt: React.MouseEvent) => void,
  handleScrollDown: (evt: React.MouseEvent) => void,
  handleSwitchPage: (pageNum: number) => void,
  formatMessage: (id: string, values?: {[key: string]: any}) => string
}

export function ListBottomTools(props: ListBottomToolProps){
  const {isRTL, totalPage, pageStyle, direction, currentPage, scrollStatus, isScrollEnd, isEditing,
    handleScrollDown, handleScrollUp, handleSwitchPage, formatMessage} = props;
  return (
    <div className="bottom-tools w-100 d-flex align-items-center justify-content-center pl-2 pr-2">
      {pageStyle === PageStyle.MultiPage ?
        <Pagination
          size="sm"
          totalPage={totalPage}
          current={currentPage}
          onChangePage={handleSwitchPage}
        >
        </Pagination> :
        <div className="d-flex scroll-navigator">
          <Button title={formatMessage('previous')} disabled={scrollStatus === 'start'} type="secondary" size="sm" icon onClick={handleScrollUp} >
            <Icon autoFlip={true} icon={direction === DirectionType.Horizon ? arrowLeft12 : arrowUp12} size={12}></Icon>
          </Button>
          <Button
            title={formatMessage('next')}
            disabled={scrollStatus === 'end' || isScrollEnd} type="secondary" size="sm" style={isRTL ? {marginRight: polished.rem(10)} : {marginLeft: polished.rem(10)}}
            icon onClick={handleScrollDown}>
            <Icon autoFlip={true} icon={direction === DirectionType.Horizon ? arrowRight12 : arrowDown12} size={12}></Icon></Button>
        </div>
      }
      {window.jimuConfig.isInBuilder && isEditing &&
        <div className="editing-mask-bottom-tool" />}
    </div>
  )
}