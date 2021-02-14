import { React, Immutable, JimuFieldType, ImmutableArray, UseDataSource, IMFieldSchema } from 'jimu-core';
import { FieldSelector as JimuFieldSelector } from 'jimu-ui/advanced/data-source-selector';

export type FiledSelectorType = 'numeric' | 'data' | 'category';

const getFieldSelectorType = (type: FiledSelectorType) => {
  switch(type) {
    case 'numeric':
      return Immutable([JimuFieldType.Number]);
      break;
    case 'data':
      return Immutable([JimuFieldType.Date]);
      break;
    case 'category':
      return Immutable([JimuFieldType.String, JimuFieldType.Number]);
      break;
    default:
      return;
  }
}

export interface FieldSelectorProps {
  type: FiledSelectorType
  useDataSources: ImmutableArray<UseDataSource>;
  fields?: ImmutableArray<string>;
  isMultiple: boolean;
  onChange: (fields: ImmutableArray<string>) => void;
}

export const FieldSelector = (props: FieldSelectorProps) => {
  const { type, useDataSources, isMultiple, fields, onChange } = props;
  const suportedType = React.useMemo(() => getFieldSelectorType(type), [type]);

  const handleChange = (FieldSchemas: IMFieldSchema[] ) => {
    const fields = FieldSchemas.map(e => e.jimuName);
    onChange?.(Immutable(fields));
  }

  return <JimuFieldSelector
    types={suportedType}
    isMultiple={isMultiple}
    isDataSourceDropDownHidden={true}
    isSearchInputHidden={true}
    useDropdown={true}
    useDataSources={useDataSources}
    selectedFields={fields}
    onChange={handleChange} />
}