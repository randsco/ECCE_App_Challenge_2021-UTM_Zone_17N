/** @jsx jsx */
import { React, jsx, css, classNames, lodash, BoundingBox } from 'jimu-core';
import {
  LayoutItemProps,
  StateToLayoutItemProps,
  utils,
  LayoutItem,
  LayoutItemSizeModes
} from 'jimu-layouts/layout-runtime';
import { RowLayoutItemSetting } from '../../config';
import { DEFAULT_ROW_ITEM_SETTING } from '../../default-config';

interface OwnProps {
  offset: number;
  span: number;
  gutter: number;
  isMultiRow: boolean;
  alignItems?: string;
  children?: any;
}

export default class RowItem extends React.PureComponent<LayoutItemProps &
StateToLayoutItemProps & OwnProps> {
  calHeight(itemSetting: RowLayoutItemSetting, bbox: BoundingBox) {
    if (this.props.isMultiRow) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }
    // 1. aspect ratio
    if (itemSetting.heightMode === 'ratio') {
      return { alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }
    // 2. use autoProps.height first
    if (itemSetting.autoProps?.height === LayoutItemSizeModes.Auto) {
      return { height: 'auto', alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    } else if (itemSetting.autoProps?.height === LayoutItemSizeModes.Custom) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    } else if (itemSetting.autoProps?.height === LayoutItemSizeModes.Stretch) {
      return { alignSelf: 'stretch' };
    }
    // 3. back compatible, use setting.heightMode
    if (itemSetting.heightMode === 'fit') {
      return { alignSelf: 'stretch' };
    } else if (parseFloat(bbox.height) > 0) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }

    return { alignSelf: 'stretch' };
  }

  getStyle(itemSetting: RowLayoutItemSetting) {
    const { gutter, layoutItem, isMultiRow } = this.props;
    const bbox = layoutItem.bbox;

    const mergedStyle: any = this.calHeight(itemSetting, bbox);

    if (itemSetting.offsetX || itemSetting.offsetY) {
      mergedStyle.transform = `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)`;
    }

    if (isMultiRow) {
      return css`
        padding: ${gutter / 2}px 0;
        transform: ${itemSetting.offsetX || itemSetting.offsetY ? `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)` : null};
        height: ${utils.getValueOfBBox(mergedStyle, 'height')};
        align-self: ${mergedStyle.alignSelf};
      `;
    }

    return css`
      padding-left: ${gutter / 2}px;
      padding-right: ${gutter / 2}px;
      transform: ${itemSetting.offsetX || itemSetting.offsetY ? `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)` : null};
      height: ${utils.getValueOfBBox(mergedStyle, 'height')};
      align-self: ${mergedStyle.alignSelf};
    `;
  }

  render() {
    const {
      span,
      offset,
      layoutId,
      layoutItem,
    } = this.props;
    if (!layoutItem || layoutItem.isPending) {
      return null;
    }
    const itemSetting: RowLayoutItemSetting = lodash.assign({}, DEFAULT_ROW_ITEM_SETTING, layoutItem.setting);
    const mergedClass = classNames(
      'row-layout-item',
      `col-${span}`,
      `offset-${offset}`,
    );

    const ratio = utils.parseAspectRatio(itemSetting.aspectRatio);
    const oneByOneAnimationProps = utils.handleOnebyOneAnimation(this.props);
    return (
      <LayoutItem
        css={this.getStyle(itemSetting)}
        className={mergedClass}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        forceAspectRatio={itemSetting.heightMode === 'ratio'}
        aspectRatio={ratio}
        onClick={this.props.onClick}
        {...oneByOneAnimationProps}
      />
    );
  }
}
