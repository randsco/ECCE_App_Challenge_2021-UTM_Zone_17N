import {getWidgetHeight} from '../src/layout/layout-transform';
import { LayoutItemType } from 'jimu-core';

describe('get widget height', () => {
  it('should add column widget to the end', () => {
    /* eslint-disable camelcase */
    const appConfig = {
      layouts: {
        layout_0: {
          content: {
            0: {
              type: LayoutItemType.Widget,
              widgetId: 'widget_0'
            }
          },
          order: ['0']
        }
      },
      widgets: {
        widget_0: {
          config: {
            style: {
              padding: {
                number: [10],
                unit: 'px'
              }
            }
          }
        }
      }
    };
    const widgetsState = {
      widget_0: {height: 200}
    }
    const height = getWidgetHeight(
      appConfig as any,
      widgetsState,
      'widget_0'
    );
    expect(height).toBe(180);
  });
});