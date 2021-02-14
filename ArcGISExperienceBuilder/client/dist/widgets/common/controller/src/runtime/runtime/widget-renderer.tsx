/** @jsx jsx */
import { React, css, jsx, ReactRedux, IMState, WidgetManager, ErrorBoundary, WidgetState, classNames } from 'jimu-core';
import { Loading, hooks } from 'jimu-ui';
import { dispatchActiveWidget } from '../common/utils';
const { useEffect } = React;

export interface WidgetRendererProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  widgetId?: string;
  canCrossLayoutBoundary?: boolean;
}

const useStyle = (canCrossLayoutBoundary?: boolean) => {

  return React.useMemo(() => {
    return css`
      overflow: ${canCrossLayoutBoundary ? 'visible' : 'hidden'};
      position: relative;
      .widget-content {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 0;
      }
  `;
  }, [canCrossLayoutBoundary])
}

export function WidgetRenderer  (props: WidgetRendererProps)  {
  const { widgetId, canCrossLayoutBoundary, className, ...others } = props;
  const isClassLoaded = ReactRedux.useSelector((state: IMState) => state.widgetsRuntimeInfo?.[widgetId]?.isClassLoaded);
  const isActive = ReactRedux.useSelector((state: IMState) => state.widgetsRuntimeInfo?.[widgetId]?.state === WidgetState.Active);

  useEffect(() => {
    if (widgetId && !isClassLoaded) {
      WidgetManager.getInstance().loadWidgetClass(widgetId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId]);

  let WidgetClass;
  if (widgetId) {
    WidgetClass = WidgetManager.getInstance().getWidgetClass(widgetId);
  }

  const onMouseDown = hooks.useEventCallback(() => {
    if (window.jimuConfig.isBuilder) {
      return;
    }
    if (isActive) {
      return;
    }
    dispatchActiveWidget(widgetId);
  });

  const classes = classNames('widget-renderer  w-100 h-100', className)
  const style = useStyle(canCrossLayoutBoundary);

  return <div
    css={style}
    className={classes}
    onMouseDownCapture={onMouseDown}
    {...others}>
    <div className="widget-content p-1">
      {WidgetClass &&
        <ErrorBoundary>
          <WidgetClass widgetId={widgetId} />
        </ErrorBoundary>}
      {!WidgetClass && <Loading />}
    </div>

  </div>
}