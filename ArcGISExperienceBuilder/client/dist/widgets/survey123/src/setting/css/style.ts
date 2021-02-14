import { ThemeVariables, css, SerializedStyles } from 'jimu-core';

export function getStyle(theme?: ThemeVariables): SerializedStyles {
  return css`
    &.survey123{
        .survey123__section {

            input + span {
              // margin-left:5px; 
            }
            .jimu-widget-setting--section-header.row >h6 {
              font-size: 0.875rem;
              color: ${theme.colors.palette.dark[600]};
            }

            .survey-list-msg {
              padding: 0 5px;
            }
            .survey-list-loading-outter {
              position: relative;
              top: -18px;
            }
            .survey123__section-createSurvey, .select-survey-section {
              .error-message {
                color: ${theme.colors.danger};
              }
            }
            .select-survey-section {
              hr.split-line {
                display: none;
              }
            }
            .create-survey-container {
              .jimu-widget-setting--row.items {
                margin-top: 1.2rem;
                display: block;
                h6 {
                  color: ${theme.colors.palette.dark[500]};
                }
                div.w-100 {
                  font-size: 0.8125rem;
                  line-height: 1.1875rem;
                  margin-top: 0.3125rem;

                }
              }
              .jimu-widget-setting--row >label {
                font-size: 0.875rem;
                font-weight: 400;
                +p.w-100 {
                  font-size: 0.8125rem;
                  line-height: 1.1875rem;
                  margin-top: 0.3125rem;
                }
              }
            }
        
            .appearance, .section-title {
              display: flex;
              justify-content: space-between;
              width:100%;
              h6 {
                margin-bottom: 0;
              }
            }

            .select{
              select {
                width: 100%;
              }
            }

            .mapping-container {
              padding: 0.615em;
              background: ${theme.colors.secondary};
              border-radius: 2px;
              margin: 0.6em 0;
              position: relative;
              button:disabled, button[disabled] {
                background:  #555555;
              }
              >select {
                height: 26px;
                vertical-align: middle;
                font-size: 1em;
                line-height: 26px;
                padding: 0 22px 0 6px;
                &:first-of-type {
                  margin-bottom: 8px;
                }
              }
              .btn-group {
                width: 100%;
                overflow: hidden;
                .icon-remove-mapping {
                  padding: 0 0.25em;
                  margin-left: 0;
                  margin-right: 0;
                  svg.left-icon {
                    margin-right: 0;
                    margin-left: 0;
                  }
                }
                button {
                  margin: 8px 0 8px 8px;
                  height: 26px;
                  line-height: 26px;
                  padding: 0;
                  padding: 0px 14px;
                }
              }
              >.link-info {
                > p {
                  margin-bottom: 0;
                  line-height: 2em;
                }
                > div.center-line {
                  width: 96%;
                  height: 1px;
                  background: ${theme.colors.palette.secondary[800]};
                  text-align: center;
                  margin: 0.5em 2% 0.5em 2%;
                  >.connect {
                    display: inline-block;
                    width: 26px;
                    height: 20px;
                    background: ${theme.colors.secondary};
                    position: relative;
                    top: -10px;
                  }
                }
                > div.delete-connect {
                  display: none;
                  position: absolute;
                  right: 0;
                  top: 0;
                  cursor: pointer;
                  background: ${theme.colors.palette.secondary[400]};
                  text-align: center;
                  width: 24px;
                  height: 24px;
                }
                &:hover > div.delete-connect {
                  display: block;
                }
              }
              
            }

            .setting-row {
              margin: 0.5rem 0 0 0;
              display: flex;
              flex-flow: row wrap;
              align-items: center;
            }
        
            .section-title h5{
              display: inline-block;
              font-weight: 500;
            }
            
            .section-title h6{
              word-break: break-word;
            }

            .fea-layer-outter {
              flex-wrap:wrap;
            }

            .use-feature-layer-setting {
              width: 100%;
              margin-top: 0.92em;
            }
            .feature-layer-dropdown {
              width: 100%;
              margin: 0.5rem 0 0 0;
            }
            &-resetSurvey {
              position:relative;
              // top: -8px;
              height: 26px;
              float:right;
              line-height: 8px;

              svg {
                margin:0px !important;
              }
            }

            .cursor-pointer{
              &:hover{
                cursor:pointer;
              }
            }
              
            &-surveyMenu {}
        
            &-selectExistingSurvey {}
        
            &-createSurvey {
              overflow-y: hidden;
              
              span.isRequired{
                position:relative;
                /* left:-180px; */
                color: ${theme.colors.danger};
                top: 4px;
                left: 4px;
              }
              input {
                margin-top: 0.5em;
              }
            }
        
            &-surveySettings {
              
            }
          }
    }
  `;
}