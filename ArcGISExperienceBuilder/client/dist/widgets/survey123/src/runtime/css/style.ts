import { ThemeVariables, css, SerializedStyles } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {
  return css`
    &.survey123{
        width: 100%;
        height: 100%;
        overflow: auto;
        
        .title{
            font-weight: bold;
        }
    
        .survey123__noSurvey{
            width:100%;
            height:100%;
            text-align:center;
        }
    
        .survey123__webform{
            width:100%; 
            height:100%;

            .embed-container {
                position: relative; 
                height: 100%;
                // padding-bottom:80%; 
                width: 100%;
            } 
            
            .embed-container iframe, 
            .embed-container object, 
            .embed-container iframe{
                position: absolute; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%;
                border: 0px; 
            } 
            small{
                position: absolute; 
                z-index: 40; 
                bottom: 0; 
                margin-bottom: -15px;
            }
        }    
    }
  `;
}