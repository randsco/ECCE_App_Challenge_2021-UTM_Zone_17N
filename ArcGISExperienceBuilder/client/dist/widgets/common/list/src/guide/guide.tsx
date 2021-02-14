
import { React, utils, i18n, getAppStore, appActions} from 'jimu-core';
import { Guide, Steps, EVENTS, GuideProps } from 'jimu-ui/basic/guide';
import defaultMessages from '../runtime/translations/default';
const {useState, useEffect, useMemo} = React;

const WidgetGuide = (props: GuideProps) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(props.stepIndex ?? 0);

  const stepsJson = useMemo(() => {
    const stepsSrc = require('./steps.json');
    if(props.widgetJson?.manifest?.name === 'list') {
      return utils.replaceI18nPlaceholdersInObject(stepsSrc, i18n.getIntl(props.widgetJson.id), defaultMessages);
    }
    return stepsSrc;
  }, [props.widgetJson]);

  const onStepClick = (e, step, index) => {
    if(index === 1) { // template step
      if(e?.target.classList.contains('btn-primary')) {
        setStepIndex(index + 1);
      }
    } else { // other steps
      setStepIndex(index + 1);
    }
  };

  const onStepChange = (data) => {
    const {nextIndex, step , event } = data;
    if(nextIndex === 1) {
      getAppStore().dispatch(
        appActions.widgetStatePropChange('right-sidebar', 'collapse', true)
      );
    } else if([5,6,7].indexOf(nextIndex) > -1 && event === EVENTS.STEP_BEFORE) {
      const settingContainerElm = document.querySelector('.jimu-widget-list-setting');
      const targetElm = document.querySelector(step?.target);
      if(settingContainerElm && targetElm) {
        const scrollTop = targetElm.getBoundingClientRect().top - settingContainerElm.getBoundingClientRect().top;
        settingContainerElm?.scrollTo({top: scrollTop > 0 ? scrollTop : 0});
      }
    }
    props?.onStepChange(data);
  }

  useEffect(() => {
    setRun(props.run);
  }, [props.run]);

  useEffect(() => {
    setStepIndex(props.stepIndex);
  }, [props.stepIndex]);

  return <Guide
    {...props}
    run={run}
    stepIndex={stepIndex}
    steps={stepsJson.steps as Steps}
    onStepChange={onStepChange}
    onActionClick={onStepClick}
  />
}

export default WidgetGuide;