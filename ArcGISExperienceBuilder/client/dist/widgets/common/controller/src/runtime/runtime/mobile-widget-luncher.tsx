import { React } from 'jimu-core';
import { MobilePanel } from 'jimu-ui';
import { useWidgetTitle } from '../common/utils';
import { WidgetRenderer } from './widget-renderer';

export interface MobileWidgetLuncherProps {
  widgetId: string;
  containerMapId: string;
  onClose?: (id?: string) => any;
}

export const MobileWidgetLuncher = (props: MobileWidgetLuncherProps) => {
  const { widgetId, containerMapId, onClose } = props;
  const title = useWidgetTitle(widgetId);

  const handleClose = (evt?: React.MouseEvent<HTMLDivElement>) => {
    evt?.stopPropagation();
    evt?.nativeEvent.stopImmediatePropagation();
    onClose?.(widgetId);
  }

  return <MobilePanel
    mapWidgetId={containerMapId}
    title={title}
    open={!!widgetId}
    toggle={handleClose}>
    <WidgetRenderer widgetId={widgetId}></WidgetRenderer>
  </MobilePanel>
}