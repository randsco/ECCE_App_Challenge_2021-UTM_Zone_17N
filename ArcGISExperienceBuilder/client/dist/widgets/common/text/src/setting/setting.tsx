import { React, Immutable, IMState, UseDataSource, ReactRedux, Expression } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components';
import { Editor } from 'jimu-ui/advanced/rich-text-editor'
import { IMConfig } from '../config';
import { Switch, defaultMessages as jimuUiMessage, hooks, richTextUtils } from 'jimu-ui';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
import { RichFormatPlugin } from './editor-plugins/rich-formats';
import { RichFormatClearPlugin } from './editor-plugins/rich-formats-clear';
import defaultMessages from './translations/default';
import { ExpressionInput, ExpressionInputType } from 'jimu-ui/advanced/expression-builder';
const { useSelector } = ReactRedux;
const { useState, useEffect } = React;

type SettingProps = AllWidgetSettingProps<IMConfig>;

const SUPPORTED_TYPES = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer]);
const defaultExpressionInputTypes = Immutable([ExpressionInputType.Static, ExpressionInputType.Attribute, ExpressionInputType.Statistics, ExpressionInputType.Expression]);
const Setting = (props: SettingProps) => {
  const {
    id,
    intl,
    config,
    useDataSources,
    useDataSourcesEnabled,
    onSettingChange
  } = props;

  const wrap = config?.style?.wrap;
  const text = config?.text;
  const placeholder = config?.placeholder;
  const tooltip = config?.tooltip;
  const appStateInBuilder = useSelector((state: IMState) => state.appStateInBuilder);
  const mutableStateVersion = appStateInBuilder?.widgetsMutableStateVersion?.[id]?.['editor'];
  const isInlineEditing = appStateInBuilder?.widgetsRuntimeInfo?.[id]?.isInlineEditing;
  const useDataSource = useDataSourcesEnabled && useDataSources?.length;
  const [editor, setEditor] = useState<Editor>(null);
  const [openTip, setOpenTip] = useState(false);

  useEffect(() => {
    const mutableStoreManager = window._appWindow._mutableStoreManager;
    const editor = mutableStoreManager?.getStateValue([id, 'editor']) ?? null;
    setEditor(editor);
  }, [mutableStateVersion, id]);

  const translateLocal = hooks.useTranslate(defaultMessages);
  const translate = hooks.useTranslate();

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return;
    }

    onSettingChange({
      id,
      useDataSources: useDataSources
    })
  }

  const onToggleUseDataEnabled = () => {
    onSettingChange({ id, useDataSourcesEnabled: !useDataSourcesEnabled });
  }

  const onToggleWrap = () => {
    onSettingChange({
      id,
      config: config.setIn(['style', 'wrap'], !wrap)
    });
  }

  const onTipExpChange = (expression: Expression) => {
    if (!expression) {
      return;
    }

    onSettingChange({
      id,
      config: config.set('tooltip', expression),
    });
    setOpenTip(false);
  }

  const handleTextChange = (value: string) => {
    const onlyPlaceholder = richTextUtils.isBlankRichText(text) && placeholder;
    const key = !isInlineEditing && onlyPlaceholder ? 'placeholder' : 'text';
    onSettingChange({
      id,
      config: config.set(key, value),
    });
  }

  const expInputFroms = useDataSource ? defaultExpressionInputTypes : Immutable([ExpressionInputType.Static]);

  return <div className="widget-setting-text jimu-widget-setting">
    <SettingSection>
      <SettingRow>
        <DataSourceSelector
          isMultiple={true}
          types={SUPPORTED_TYPES}
          useDataSources={useDataSources}
          useDataSourcesEnabled={useDataSourcesEnabled}
          onToggleUseDataEnabled={onToggleUseDataEnabled}
          onChange={onDataSourceChange}
          widgetId={id}
        />
      </SettingRow>
    </SettingSection>

    <SettingSection>

      <SettingRow flow="no-wrap" label={translateLocal('wrap')}>
        <Switch checked={wrap} onChange={onToggleWrap}></Switch>
      </SettingRow>
      <SettingRow label={translate('tooltip')} />
      <SettingRow>
        <div className="w-100">
          <ExpressionInput autoHide={true} useDataSources={useDataSources} onChange={onTipExpChange} openExpPopup={() => setOpenTip(true)}
            expression={typeof tooltip === 'object' ? tooltip : null} isExpPopupOpen={openTip} closeExpPopup={() => setOpenTip(false)}
            types={expInputFroms}
            widgetId={id}
          />
        </div>
      </SettingRow>

    </SettingSection>

    {!!editor && <SettingSection>
      <SettingRow flow="no-wrap" label={intl.formatMessage({ id: 'textFormat', defaultMessage: jimuUiMessage['textFormat'] })}>
        <RichFormatClearPlugin
          quillEnabled={isInlineEditing}
          editor={editor}
          onChange={handleTextChange}
        ></RichFormatClearPlugin>
      </SettingRow>

      <SettingRow>
        <RichFormatPlugin
          quillEnabled={isInlineEditing}
          editor={editor}
          useDataSources={useDataSources}
          widgetId={id}
          onChange={handleTextChange}
        />
      </SettingRow>
    </SettingSection>}
  </div>
}

export default Setting;