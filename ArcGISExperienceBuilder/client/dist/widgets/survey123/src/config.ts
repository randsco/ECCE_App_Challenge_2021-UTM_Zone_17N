import {ImmutableObject} from 'jimu-core';
import {IMJimuLayerViewInfo} from 'jimu-arcgis';

export interface Config{
  surveyItemId: string;
  portalUrl: string;
  defaultValue: {
    [key: string]: any
  };
  open: string;
  layerViewInfo?: IMJimuLayerViewInfo;
  // isEmbed: boolean;
  // isHideNavbar?: boolean;
  // isFullScreen?: boolean;
  hides?: string[];
  embeds?: string[];
  activeLinkData: boolean;
  selectedSurvey: any;
  selectedSurveyQuestionFields?: string[];
  fieldQuestionMapping: any[];
  useDataSources?: any;
  triggerEventType: string;

  dsType?: string;
  timestamp?: number;
}

export type IMConfig = ImmutableObject<Config>;