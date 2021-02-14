import {React, Immutable, appActions, lodash} from 'jimu-core';
import TableWidget from '../src/runtime/widget';
import { mockTheme, wrapWidget, widgetRender, getInitState } from 'jimu-for-test';
import { getAppStore } from 'jimu-core';
import { fireEvent } from '@testing-library/react';
import { TableArrangeType } from '../src/config';

jest.mock('jimu-arcgis', () => {
  return {
    loadArcGISJSAPIModules: () => {
      return Promise.resolve([
        {fromJSON: () => {}},
        function() {
          return { fromJSON: () => {} };
        },
      ]);
    }
  };
})

jest.mock('jimu-ui', () => {
  return {
    ...jest.requireActual('jimu-ui'),
    AdvancedSelect: jest.fn(() => <div data-testid="tableSelectTest"></div>)
  };
})


const initState = getInitState().merge({
  appContext: { isRTL: false },
  appConfig: {
    widgets: [] as any,
    dataSources: {
      dataSourceId: 'dataSource_1-Hydrants_8477',
      mainDataSourceId: 'dataSource_1-Hydrants_8477',
      rootDataSourceId: 'dataSource_1'
    },
    dialogs: {}
  }
});

getAppStore().dispatch(appActions.updateStoreState(initState));

describe('table test', function() {
  let render = null;
  beforeAll(() => {
    render = widgetRender(getAppStore(), mockTheme as any)
  });

  afterAll(() => {
    render = null;
  })

  const layerConfig = {
    id: 'test-1',
    name: 'test-table-1',
    useDataSource: {
      dataSourceId: 'dataSource_1-Hydrants_8477',
      mainDataSourceId: 'dataSource_1-Hydrants_8477',
      rootDataSourceId: 'dataSource_1'
    },
    allFields: [{
      jimuName: 'OBJECTID',
      name: 'OBJECTID',
      type: 'NUMBER',
      esriType: 'esriFieldTypeOID',
      alias: 'OBJECTID'
    }],
    tableFields: [{
      jimuName: 'OBJECTID',
      name: 'OBJECTID',
      type: 'NUMBER',
      esriType: 'esriFieldTypeOID',
      alias: 'OBJECTID'
    }],
    enableAttachements: false,
    enableSearch: false,
    searchFields: 'FACILITYID',
    enableEdit: false,
    enableRefresh: true,
    enableSelect: true,
    allowCsv: false,
  }

  const config = Immutable({
    layersConfig: [layerConfig],
    arrangeType: TableArrangeType.Tabs,
  });

  const props = {
    config,
  };

  it.only('show selection/all change test', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(TableWidget, { theme : mockTheme, ref } as any);
    const { getByTitle } = render(<Widget widgetId={'tableTest1'} {...props}/>);
    (ref.current as any).table = {
      grid: {
        selectedItems: {
          items: [{
            objectId: 3,
            feature: {
              attributes: {
                OBJECTID: 3,
              }
            }
          }]
        }
      },
      layer: { definitionExpression: '' }
    };
    fireEvent.click(getByTitle('Show selection'));
    expect(ref.current.state.selectQueryFalg).toBe(true);
    expect(getByTitle('Show all records')).toBeInTheDocument();
    expect(getByTitle('Show all records')).toHaveClass('active');
  });

  it.only('different table tab with same ds should call createTable', () => {
    const newLayerConfig = lodash.assign({}, layerConfig, { id: 'test-2', name: 'test-table-2' });
    const mutConfig = config.asMutable({deep:true});
    mutConfig.layersConfig.push(newLayerConfig);
    const newProps = { config: Immutable(mutConfig), dispatch: jest.fn() };
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(TableWidget, { theme : mockTheme, ref } as any);
    const { getByTitle } = render(<Widget widgetId={'tableTest2'} {...newProps}/>);
    (ref.current as any).destoryTable =  jest.fn(() => Promise.resolve())
    fireEvent.click(getByTitle('test-table-2').children[0]);
    expect((ref.current as any).destoryTable).toHaveBeenCalled();
  });
});