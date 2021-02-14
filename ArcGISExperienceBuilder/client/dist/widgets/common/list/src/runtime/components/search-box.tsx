/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles, css, jsx, polished, esri } from 'jimu-core';
import { TextInput, Button, Icon, InputProps, Popper } from 'jimu-ui';
import { Suggestion } from '../../config'
const Sanitizer = esri.Sanitizer;
const sanitizer = new Sanitizer();

interface Props {
  theme: ThemeVariables;
  placeholder?: string;
  searchText?: string;
  onSearchTextChange?: (searchText: string) => void;
  formatMessage?: (id: string) => string;
  onSubmit?: (searchText: string, isEnter: boolean) => void;
  showClear?: boolean;
  hideSearchIcon?: boolean;
  inputRef?: (ref: HTMLInputElement) => void;
  searchSuggestion: Array<Suggestion>;
  suggestionWidth: number;
  showLoading: boolean;
  isShowBackButton?: boolean;
  toggleSearchBoxVisible?: (isVisible: boolean) => void;
}

interface Stats {
  searchText: string;
  isShowSuggestion: boolean;
}

export default class SearchBox extends React.PureComponent<Props & InputProps, Stats> {
  reference: HTMLDivElement;
  suggestionRequestTimeout: any
  constructor(props){
    super(props);
    this.state = {
      searchText: props.searchText || '',
      isShowSuggestion: false
    }
  }

  componentDidUpdate(preProps){
    if(this.props.searchText !== preProps.searchText && this.props.searchText !== this.state.searchText){
      const {searchText} = this.props;
      this.setState({
        searchText: searchText
      })
    }

  }

  handleChange = searchText => {
    this.setState({
      searchText: searchText,
      isShowSuggestion: true,
    }, () => {
      const {onSearchTextChange} = this.props;
      if(onSearchTextChange){
        onSearchTextChange(searchText)
      }
    })

  }

  handleSubmit = (value, isEnter = false) => {
    const {onSubmit} = this.props;
    if(onSubmit){
      onSubmit(value, isEnter)
    }
  }

  onKeyUp = (evt) => {
    if(!evt || !evt.target) return;
    if (evt.keyCode === 13) {
      this.setState({
        isShowSuggestion: false
      });
      this.handleSubmit(evt.target.value, true);
    }
  }

  onSuggestionConfirm = (suggestion) => {
    this.setState({
      searchText: suggestion,
      isShowSuggestion: false,
    }, () => {
      this.handleSubmit(suggestion);
      this.props?.toggleSearchBoxVisible(true)
    })
  }

  handleClear = evt => {
    this.setState({
      searchText: ''
    })
    evt.stopPropagation();
  }

  getStyle = (): SerializedStyles => {
    const {theme} = this.props;

    return css`
      position: relative;
      .search-input {
        cursor: pointer;
        padding-left: 3px;
        border: 0;
        // border-bottom-width: 1px;
        // border-bottom-style: solid;
        // border-color: ${theme.colors.primary};
        background: transparent;
        height: ${polished.rem(26)};
        min-width: 0;
      }
      .search-input:focus {
        background: transparent;
      }
      .search-loading-con {
        @keyframes loading {
          0% {transform: rotate(0deg); };
          100% {transform: rotate(360deg)};
        }
        width: ${polished.rem(13)};
        height: ${polished.rem(13)};
        min-width: ${polished.rem(13)};
        border: 2px solid ${theme?.colors?.palette?.secondary?.[300]};
        border-radius: 50%;
        border-top: 2px solid ${theme?.colors?.palette?.primary?.[500]};
        box-sizing: border-box;
        animation:loading 2s infinite linear;
        margin-right: ${polished.rem(4)};
      }
      .clear-search, .search-back {
        cursor: pointer;
        padding: ${polished.rem(6)};
        background: none;
        border: none;
        color: ${theme?.colors?.palette?.dark?.[800]}
      }
      .search-back {
        margin-left: ${polished.rem(-6)};
      }
      .clear-search:hover {
        background: none;
      }
    `
  }

  getSuggestionListStyle = (): SerializedStyles => {
    const {suggestionWidth} = this.props;
    return css`
      & {
        max-height: ${polished.rem(300)};
        min-width: ${polished.rem(suggestionWidth)};
        overflow: auto;
      }
      button {
        display: block;
        width: 100%;
        text-align: left;
        border: none;
        border-radius: 0;
      }
      button:hover {
        border: none;
      }
    `
  }

  clearSearchText = () => {
    const {searchText} = this.state;
    if(searchText){
      this.handleChange('')
      this.props?.toggleSearchBoxVisible(true)
    }
  }

  render() {
    const { placeholder, className, showClear, hideSearchIcon,
      inputRef, onFocus, onBlur, theme, searchSuggestion, showLoading, formatMessage, isShowBackButton } = this.props;
    const {searchText, isShowSuggestion} = this.state;

    return (
      <div>
        <div css={this.getStyle()} className={`d-flex align-items-center ${className}`}>
          {isShowBackButton && <Button color="tertiary" className="search-back"  icon size="sm" onClick={evt => {this.props?.toggleSearchBoxVisible(false)}}  title={formatMessage('topToolBack')}>
            <Icon size={20} icon={require('jimu-ui/lib/icons/direction-left.svg')} color={theme.colors.palette.dark[800]}/>
          </Button>}
          {(!hideSearchIcon && !isShowBackButton) &&
            <Button type="tertiary" icon size="sm"
              onClick={evt => this.handleSubmit(this.state.searchText)} >
              <Icon size={16} icon={require('jimu-ui/lib/icons/search-16.svg')} color={theme.colors.palette.light[800]} />
            </Button>
          }
          <TextInput className="search-input"
            ref={inputRef}
            placeholder={placeholder}
            onChange={e => this.handleChange(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            value={searchText || ''}
            onKeyDown ={ (e) => this.onKeyUp(e)}>
          </TextInput>
          {showLoading && <div className="search-loading-con"></div>}
          {searchText && <Button color="tertiary" className="clear-search"  icon size="sm" onClick={this.clearSearchText} title={formatMessage('clearSearch')}>
            <Icon size={14} icon={require('jimu-ui/lib/icons/close-12.svg')} color={theme.colors.palette.dark[800]}/>
          </Button>}
          {showClear &&
            <Button color="tertiary"  icon size="sm"
              onClick={this.handleSubmit} >
              <Icon size={12} icon={require('jimu-ui/lib/icons/close-12.svg')}/>
            </Button>
          }
        </div>
        <div ref={ref => this.reference = ref}>
          <Popper
            css={this.getSuggestionListStyle()}
            placement="bottom-start"
            reference={this.reference}
            offset={[0, 8]}
            open={isShowSuggestion}
            toggle={e => {this.setState({isShowSuggestion: !isShowSuggestion})}}>
            {searchSuggestion.map((suggestion, index) => {
              const suggestionHtml = sanitizer.sanitize(suggestion.suggestionHtml);
              return (<Button key={index} type="secondary" size="sm" onClick={() => {this.onSuggestionConfirm(suggestion.suggestion)}} dangerouslySetInnerHTML={{ __html: suggestionHtml }}></Button>)
            })}
          </Popper>
        </div>
      </div>
    )
  }
}
