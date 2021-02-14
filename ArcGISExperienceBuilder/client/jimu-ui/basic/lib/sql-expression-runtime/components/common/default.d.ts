import { JimuFieldType, ClauseOperator, ClauseSourceType } from 'jimu-core';
export declare enum SqlExpressionSizeMode {
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = "LARGE"
}
export declare enum ClauseInputEditor {
    DoubleNumberSelector = "DOUBLE_NUMBER_SELECTOR",
    TextInput = "TEXT_BOX",
    UniquePredefinedSelector = "UNIQUE_PREDEFINED_SELECTOR",
    MultiplePredefinedSelector = "MULTIPLE_PREDEFINED_SELECTOR",
    FieldSelector = "FIELD_SELECTOR",
    SimpleSelect = "SIMPLE_SELECT",
    UniquePillWrapSelector = "UNIQUE_PILL_WRAP_SELECTOR",
    MultipleSelect = "MULTIPLE_SELECT",
    MultiplePillWrapSelector = "MULTIPLE_PILL_WRAP_SELECTOR",
    DatePicker = "DATE_PICKER",
    DateTimePicker = "DATE_TIME_PICKER",
    DateRangeSelector = "DATE_RANGE_SELECTOR",
    DoubleDatePicker = "DOUBLE_DATE_PICKER",
    DoubleDateTimePicker = "DOUBLE_DATE_TIME_PICKER",
    NumberListSelector = "NUMBER_LIST_SELECTOR",
    BlankSelector = "BLANK_SELECTOR"
}
export declare function getClauseInputEditorStyles(runtime: boolean, hasDropDown?: boolean): {
    inputEditorWidth: string;
    connectorWidth: string;
    dropDownWidth: string;
};
export declare const normalInputEditorsForValueAndDate: ClauseInputEditor[];
export declare const normalInputEditorsForValueAndDoubleDate: ClauseInputEditor[];
interface ClauseOtherOptions {
    normalInputEditors: Array<ClauseInputEditor>;
    codedValueInputEditors?: Array<ClauseInputEditor>;
    supportAskForValue?: boolean;
    supportCaseSensitive?: boolean;
}
declare type ClauseRelationshipType = {
    [operator in ClauseOperator]: {
        [sourceType in ClauseSourceType]?: ClauseOtherOptions;
    };
};
export declare const ClauseRelationship: ClauseRelationshipType;
export declare function getOperatorsByShortType(shortType: JimuFieldType, isHosted?: boolean): ClauseOperator[];
export {};
