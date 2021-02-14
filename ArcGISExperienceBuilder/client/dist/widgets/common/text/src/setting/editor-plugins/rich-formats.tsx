/** @jsx jsx */
import { React, jsx, css, lodash, ReactRedux, IMState } from 'jimu-core';
import { RichFormatsPanel, RichFormatsPanelPorps } from './components/formats'
import { RichTextFormatKeys, Editor, FormatType, Sources, richTextEditorUtils, useEditorSelectionFormats } from 'jimu-ui/advanced/rich-text-editor';

export interface RichFormatPluginProps extends RichFormatsPanelPorps {
  editor: Editor;
  quillEnabled: boolean;
  onChange:(text: string) => void;
}

const style = css`
  > * {
    user-select: none;
  }
`;

export const RichFormatPlugin = (props: RichFormatPluginProps) => {
  const { quillEnabled, editor, onChange, ...others } = props;
  const [_formats, selection] = useEditorSelectionFormats(editor, true);
  const appTheme = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.theme);

  const formats = React.useMemo(() => {
    let formats = richTextEditorUtils.mixinThemeTextFormats(appTheme, _formats);
    if (formats?.link?.link) {
      formats = lodash.assign({}, formats, { link: formats.link.link });
    }
    return formats;
  }, [_formats, appTheme]);


  const disableLink = !selection?.length || !quillEnabled;

  const handleChange = (key: RichTextFormatKeys, value: any, type: FormatType) => {
    const source = quillEnabled ? 'user' : 'api' as Sources;
    const formatParams = {
      type,
      key,
      value,
      selection,
      enabled: quillEnabled,
      source
    }

    richTextEditorUtils.formatText(editor, formatParams);
    onChange?.(editor?.root.innerHTML);
  }

  return <RichFormatsPanel
    css={style}
    disableIndent={!quillEnabled}
    disableLink={disableLink}
    formats={formats}
    {...others}
    onChange={handleChange} />
}