import { React, Immutable, getAppStore } from 'jimu-core';
import { createIntl } from 'react-intl';
import { defaultMessages } from 'jimu-ui';
import { fireEvent, waitFor } from '@testing-library/react';
import { withStoreThemeIntlRender, mockTheme } from 'jimu-for-test';
import { ShownMode } from '../src/runtime/components/items/base-item';
import { ShareLink } from '../src/runtime/components/items/sharelink';
import { UiMode } from '../src/config';

describe('<ShareLink />', () => {
  const TAR_URL = 'test-url';

  let config;
  let render = null, intl = null;
  beforeAll(() => {
    intl = createIntl({
      locale: 'en',
      defaultLocale: 'en',
      messages: defaultMessages
    });

    render = withStoreThemeIntlRender(getAppStore(), mockTheme as any);
  });
  afterAll(() => {
    render = null;
  })
  beforeEach(() => {
    config = Immutable({
      uiMode: 'POPUP',
      popup: {
        icon: '',
        items: ['embed', 'qrcode', 'email', 'facebook', 'twitter', 'pinterest', 'linkedin'],
        tooltip: ''
      },
      inline: {
        items: ['facebook', 'twitter', 'pinterest', 'linkedin', 'embed', 'qrcode', 'email', 'sharelink'],
        design: {
          direction: 'HORIZONTAL',
          hideLabel: false,
          btnRad: 0,
          btnColor: '',
          iconColor: '',
          size: 'default'
        }
      }
    })
  });

  it('click copy btn', async () => {
    const _onCopyFn = jest.fn().mockImplementation((text, result) => {
      expect(text).toBe(TAR_URL);
    });

    const props = {
      uiMode: config.uiMode as UiMode,
      url: TAR_URL,
      isShowInModal: false,
      shownMode: ShownMode.Content,

      getAppTitle: jest.fn(),//(() => string);
      onItemClick: jest.fn(),//((name: string, ref: React.RefObject<any>, type: ExpandType, isUpdateUrl?: boolean) => void);
      onBackBtnClick: jest.fn(),//(() => void);

      theme: mockTheme as any,
      intl: intl,
      config: config,

      longUrl: 'test-long-url',
      onShortUrlChange: jest.fn(),//((shortUrl: string) => void);
      onLongUrlChange: jest.fn(),//((longUrl: string) => void);
      updateUrl: jest.fn(),//(() => string) | (() => void);

      onCopy: _onCopyFn
    };

    const widgetRef = { current: null };

    const { queryByTestId } = render(<ShareLink {...props} ref={widgetRef} />);
    //widgetRef.current.onCopy = _onCopyFn;
    //let _onCopyFnSpy = jest.spyOn(widgetRef.current, 'onCopy');
    const btn = queryByTestId('copy-btn');
    fireEvent.click(btn);

    await waitFor(() => {
      expect(_onCopyFn).toHaveBeenCalledTimes(1);
    }, { timeout: 200 });
  });
});
