import {AllWidgetProps, WidgetProps, React, WidgetContext, WidgetManifest, UseDataSource
  , ImmutableArray, DataSource, i18n, ImmutableObject, UrlParameters, ThemeVariables} from 'jimu-core';
import { IntlShape, createIntl } from 'react-intl';
import mockTheme from './theme-mock';

interface Props{
  id?: string;
  icon?: string;
  label?: string;
  visible?: boolean;
  index?: number;
  uri?: string;
  itemId?: string;
  context?: WidgetContext;
  manifest?: WidgetManifest;
  version?: string;
  useDataSources?: ImmutableArray<UseDataSource>;
  dataSources?: {[dsId: string]: DataSource};
  outputDataSource?: string[];
  outputDataSources?: string[];

  dispatch?: any;
  config?: any;
  messages?: i18n.I18nMessages;
  intl?: IntlShape;

  isClassLoaded?: boolean;
  state?: 'opened' | 'active' | 'closed';
  windowState?: 'normal' | 'minimized' | 'maximized';
  queryObject?: ImmutableObject<UrlParameters>;
  theme?: Partial<ThemeVariables>
}

type FuncWidget = (props: WidgetProps) => JSX.Element;
type ClassWidget = React.ComponentClass<WidgetProps>;
type Widget = FuncWidget | ClassWidget;

export function wrapWidget(WidgetClass: Widget, props?: Props): React.ComponentClass<WidgetProps & Partial<AllWidgetProps<unknown>>>{
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intl = createIntl({locale: 'en', messages: props && props.messages || {}});

  if(props){
    props.theme = props.theme || mockTheme as any;
  }

  class WidgetWrapper extends React.PureComponent<AllWidgetProps<unknown>, any> {
    static displayName = 'WidgetWrapper()';

    render() {
      return (<WidgetClass intl={intl} {...this.props} {...props}/>);
    }
  }

  return WidgetWrapper;
}