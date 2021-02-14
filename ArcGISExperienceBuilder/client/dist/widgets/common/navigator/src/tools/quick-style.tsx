import { extensionSpec, React, appActions, getAppStore, LayoutContextToolProps, Immutable, i18n } from 'jimu-core';
import { IMWidgetState } from '../config';
import { defaultMessages } from 'jimu-ui';

export default class TextTool implements extensionSpec.ContextTool {
  index = 0;
  id = 'navigator-quick-style';
  widgetId: string;

  visible(props: LayoutContextToolProps) {
    return true;
  }

  getGroupId() {
    return null;
  }

  getTitle() {
    const intl = i18n.getIntl('_jimu');
    return intl ? intl.formatMessage({ id: 'quickStyle', defaultMessage: defaultMessages['quickStyle'] }) : 'Quick style';
  }

  checked(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    return !!getAppStore().getState().widgetsState?.[widgetId]?.showQuickStyle;
  }

  getIcon() {
    return require('jimu-ui/lib/icons/design.svg');
  }

  onClick(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    const widgetState: IMWidgetState = getAppStore().getState().widgetsState[widgetId] || Immutable({});

    const showQuickStyle = !widgetState.showQuickStyle;

    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showQuickStyle', showQuickStyle));
  }

  getSettingPanel(): React.ComponentClass<unknown> {
    return null;
  }
}




