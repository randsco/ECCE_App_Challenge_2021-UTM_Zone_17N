import { ThemeVariables, css, SerializedStyles, polished, getAppStore } from 'jimu-core';

export function getStyles(theme: ThemeVariables): SerializedStyles {
  const isRTL = getAppStore().getState().appContext.isRTL;
  const inputMixWidth = '200px';
  const doubleInputMixWidth = '300px';
  const doubleDateInputMixWidth = '350px';
  return css`
    overflow: auto;

    .filter-item {
      padding-bottom: 0.5rem;

      &.filter-item-popper{
        margin: 0.5rem;
        min-width: ${doubleInputMixWidth};
        max-width: ${doubleDateInputMixWidth};
      }

      .filter-item-inline {
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;

        .filter-item-arrow{
          transform: rotate(${isRTL ? 90 : 270}deg);
        }
        .filter-item-icon{
          margin-right: 0.5rem;

          &.no-arrow{
            margin-left: 0.5rem;
          }
        }
        .filter-item-name{
          font-size: ${polished.rem(13)};
          color: ${theme.colors.black};
          word-break: break-all;
          &.no-icons{
            margin-left: 0.5rem;
          }
          &.toggle-name{
            white-space: nowrap;
            margin-right: 0.5rem;
          }
        }

        /* sql-expression-styles - start */
        .sql-expression-inline{
          align-items: center;

          &.sql-expression-wrap{
            display: block !important;

            .sql-expression-builder{
              overflow-x: hidden;
              .sql-expression-container{
                flex-wrap: wrap;
                align-content: flex-start;

                .sql-expression-set{
                  flex-wrap: wrap;
                }
              }
            }

          }

          .sql-expression-builder{
            overflow-x: auto;
            .sql-expression-container{
              display: flex;
              .sql-expression-single{
                margin-right: 0.5rem;
                &:last-of-type{
                  margin-right: 0;
                }
                /* .clause-inline{
                  min-width: ${inputMixWidth};
                }
                .clause-block{
                  .sql-expression-input{
                    min-width: ${inputMixWidth};
                  }
                }
                .sql-expression-displaylabel{
                  min-width: ${inputMixWidth};
                } */
              }
              .sql-expression-set{
                display: flex;
              }
            }
          }

        }
        /* sql-expression-styles - end */

      }
    }

    .filter-item:last-child{
      padding-bottom: 0 !important;
    }

    &.filter-items-inline{
      display: flex;
      .sql-expression-builder .sql-expression-container .sql-expression-single .sql-expression-input .pill-btn-container{
        flex-wrap: nowrap;
        .pill-btn{
          overflow: visible;
        }
      }

      &.filter-items-wrap{
        flex-wrap: wrap;
        align-content: flex-start;

        .sql-expression-builder .sql-expression-container .sql-expression-single .sql-expression-input .pill-btn-container{
          flex-wrap: wrap;
        }
      }
      .filter-item{
        /* padding: 0; */
        &.filter-item-popper{
          min-width: 300px;
          padding-bottom: 0.5rem;
          .filter-item-inline {
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
          }
        }
        .filter-item-inline{
          padding: 0;
          /* height: 100%; */
          overflow-y: auto;
          background-color: unset !important;
          border: none !important;

          .filter-expanded-container{
            width: ${doubleInputMixWidth};
            padding-top: 0.5rem;
          }

          /* .filter-item-clause-pill{
            margin: 10px 5px;
            white-space: nowrap;
          } */

          /* .filter-popper-container{ */
            .filter-item-pill{
              margin: 10px 4px;
              white-space: nowrap;

              .sql-expression-single{
                margin: 0;
              }

              &.filter-item-toggle-pill{
                /* &:hover{
                  background-color: ${theme.colors.palette.light[100]};
                } */
                display: flex;
                flex-direction: row;
                height: 32px;
                align-items: center;
                padding: 0 0.5rem;
              }
            /* } */
            /* .pill-display-label{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            } */
          }

          /*input editor width*/
          .sql-expression-builder{
            .sql-expression-container{
              .sql-expression-single{
                .clause-inline{
                  .sql-expression-label{
                    margin-right: 0.5rem;
                    width: auto;
                    overflow: visible;
                  }
                  .sql-expression-input{
                    width: auto;
                  }

                }
                /* .clause-block{ */
                  .sql-expression-input{
                    min-width: ${inputMixWidth};
                    .double-number-picker{
                      min-width: ${doubleInputMixWidth};
                    }
                    .double-datetime-picker{
                      min-width: ${doubleDateInputMixWidth};
                    }
                  }
                /* } */
                .sql-expression-displaylabel{
                  white-space: nowrap;
                  padding-right: 0.5rem;
                  font-size: 13px;
                }
              }
            }
          }

        }
      }
    }

    &.filter-items-popup{
      min-width: ${doubleInputMixWidth};
      max-width: ${doubleDateInputMixWidth};
    }

    .apply-cancel-group{
      white-space: nowrap;
      overflow: visible;
    }
  `
}