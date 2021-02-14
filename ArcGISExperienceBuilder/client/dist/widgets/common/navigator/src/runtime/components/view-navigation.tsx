/** @jsx jsx */
import { React, jsx, css, ThemeSliderVariant, ImmutableObject, lodash, ImmutableArray } from 'jimu-core';
import {
  NavButtonGroup, PageNumber, Navigation, Slider, NavigationItem, NavButtonGroupProps, NavigationProps,
  SliderProps, PageNumberProps, PaginationProps, NavigationVariant, NavIconButtonGroupVariant
} from 'jimu-ui';
import { getViewId } from '../utils';
import { useAdvanceStyle } from '../utils';

/**
 * This is a composite component, which consists of four other components:
 * Navigation for `nav` type
 * Slider for `slider` type
 * NavButtonGroup for `NavButtonGroup` type
 * Pagination for `pagination` type
 */

// Define the magnification of slider type nav
const MAGNIFICATION = 100;

//In the view-navigation, four types are supported:
export type ViewNavigationType = 'nav' | 'pagination' | 'slider' | 'navButtonGroup';

//The component supports the standard props of four sub components
export type ViewNavigationStandard = Partial<NavigationProps>
  & Partial<PaginationProps> & Partial<SliderProps> & Partial<NavigationButtonGroupPropsProps> & NavInfoStandard;

type NavInfoStandard = {
  step?: number;
}

//For the `navButtonGroup` type nav, its type consists of `NavButtonGroupProps` and `PageNumberProps`
export type NavigationButtonGroupPropsProps = NavButtonGroupProps & PageNumberProps & {
  showPageNumber?: boolean;
}

//Component supports 4 groups of variables for advanced style
export type ViewNavigationVariant = NavigationVariant | ThemeSliderVariant | NavIconButtonGroupVariant;
export type IMViewNavigationVariant = ImmutableObject<ViewNavigationVariant>;

export type IMViewNavigationDisplay = ImmutableObject<ViewNavigationDisplay>;

export type ViewNavigationDisplay = {
  /**
   * Directions of navigation
   */
  vertical?: boolean;
  /**
   * Type of navigation, optional values:  'nav' | 'pagination'(Not yet supported) | 'slider' | 'navButtonGroup'
   */
  type: ViewNavigationType;
  /**
   * Subtypes of each type
   * nav: 'default', 'underline', 'pills'
   * pagination: Not yet supported
   * slider: 'default'
   * navButtonGroup: 'primary' | 'tertiary'
   */
  navStyle: string;
  /**
   * Configurable parameters for each type: PaginationProps | SliderProps | NavigationButtonGroupPropsProps
   */
  standard?: ViewNavigationStandard;
  /**
   * Whether to enable advanced style (override the style provided by the component in the widget)
   */
  advanced?: boolean;
  /**
   * Configurable variables in advanced style
   *
   */
  variant?: ViewNavigationVariant;
}

interface ViewNavigationProps extends ViewNavigationDisplay {
  /**
   * The selected view in the current section
   */
  activeView?: string;
  /**
   * Data of Navigation component
   */
  data?: ImmutableArray<NavigationItem>;
  /**
   * View switching progress
   */
  progress?: number;
  /**
   * Callback for switching views
   */
  onChange?: (type: ViewNavigationType, value: boolean | number) => void;
}

const style = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ViewNavigation = (props: ViewNavigationProps) => {
  const {
    data,
    progress = 0,
    type,
    navStyle,
    vertical,
    advanced,
    variant,
    onChange,
    activeView,
    standard,
    ...others
  } = props;

  const {
    current,
    totalPage,
    showPageNumber,
    scrollable,
    disablePrevious,
    disableNext,
    previousText,
    previousIcon,
    nextText,
    nextIcon,
    showIcon,
    gap,
    alternateIcon,
    activedIcon,
    showText,
    showTitle,
    iconPosition,
    textAlign,
    hideThumb
  } = standard || {} as ViewNavigationStandard;

  const handleArrowChange = (previous: boolean) => {
    onChange?.('navButtonGroup', previous);
  }

  const handleSliderChangeRef = React.useRef<any>(() => void 0);

  React.useEffect(() => {
    handleSliderChangeRef.current = lodash.throttle((evt) => {
      let value = +evt.target.value;
      value = Number((value / MAGNIFICATION).toFixed(2));
      onChange?.('slider', value);
    }, 100);

    return () => {
      handleSliderChangeRef.current.cancel();
    }
  }, [onChange]);

  const handleSliderChange = (evt) => {
    evt.persist?.();
    handleSliderChangeRef.current(evt);
  }

  const isActive = React.useCallback((item: NavigationItem) => {
    return activeView === getViewId(item);
  }, [activeView])

  //Generate component styles to override the default
  const advanceStyle = useAdvanceStyle(type, navStyle, advanced, variant, vertical, hideThumb);

  return <div className="navigation" css={[style, advanceStyle]} {...others}>
    {type === 'nav' && <Navigation
      vertical={vertical}
      isActive={isActive}
      scrollable={scrollable}
      data={data}
      gap={gap}
      type={navStyle as any}
      showIcon={showIcon}
      alternateIcon={alternateIcon}
      activedIcon={activedIcon}
      showText={showText}
      showTitle={showTitle}
      iconPosition={iconPosition}
      textAlign={textAlign} />}
    {type === 'slider' && <Slider className="h-100" size="sm" value={progress * MAGNIFICATION} hideThumb={hideThumb} onChange={handleSliderChange}></Slider>}
    {type === 'navButtonGroup' &&
      <NavButtonGroup
        type={navStyle as any}
        previousText={previousText}
        previousIcon={previousIcon}
        nextText={nextText}
        nextIcon={nextIcon}
        vertical={vertical}
        disablePrevious={disablePrevious}
        disableNext={disableNext}
        onChange={handleArrowChange}>
        {showPageNumber && <PageNumber current={current} totalPage={totalPage}></PageNumber>}
      </NavButtonGroup>}
  </div>
}