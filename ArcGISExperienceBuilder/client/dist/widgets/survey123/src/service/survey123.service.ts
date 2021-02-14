/**
 * survey123 common params
 */
export interface Survey123CommonParams {
  username?: string;
  token?: string;
  f?: string;
  portalUrl?: string;
}

/**
 * survey123 iframe message
 */
export interface Survey123Message {
  event: string;
  data: any;
}

/**
 * survey123 service
 */
export class Survey123Service {

  private queryObj: any;
  public setQueryObject(obj) {
    const objStr = obj ? obj.survey123 : '';
    const urlString = objStr ? decodeURIComponent(objStr + '') : '';
    const val = this._urlParamToJson(urlString);
    this.queryObj = val;
  }

  /**
   * get survey123 host url
   */
  public getSurvey123HostUrl(): string {
    /**
     * Beijing-R-D-Center/ExperienceBuilder/issues/88
     * we need to check url host to see which survey123 host url we will use
     * wabbuild.esri.com > survey123dec.arcgis.com
     * experiencedev.arcgis.com > survey123dev.arcgis.com
     * experienceqa.arcgis.com > survey123qa.arcgis.com
     * experience.arcgis.com > survey123.arcgis.com
     * default > survey123.arcgis.com
     *
     */
    let url = 'https://survey123.arcgis.com';
    let env = window.jimuConfig.hostEnv as any;
    if (this.queryObj && this.queryObj.env && ['dev', 'prod', 'qa', 'beta'].indexOf(this.queryObj.env) >= 0) {
      env = this.queryObj.env;
    }
    // dev
    if (env === 'dev') {
      url = 'https://survey123dev.arcgis.com';
    }

    // qa
    if (env === 'qa') {
      url = 'https://survey123qa.arcgis.com';
    }

    // beta
    if (env === 'beta') {
      url = 'https://survey123beta.arcgis.com';
    }

    return url;
  }

  /**
  * get the api url
  */
  public getSurvey123HostAPIUrl() {
    const url = this.getSurvey123HostUrl() + '/api/jsapi/3.11'; //  '/share/survey123webform-jsapi.js';

    // only for debugger locally
    // const isDebug: boolean = false;
    // if (isDebug) {
    //   url = `https://nanzhang.arcgis.com:8443/webclient/survey123webform-jsapi.js`;
    // }

    return url;
  }


  /**
   * create survey by survey123 rest api
   * @param title
   * @param tags
   * @param options
   */
  public createSurvey(title: string, tags: string[], commonParams: Survey123CommonParams, options?: {
    snippet?: string;
    thumbnailUrl?: string;
  }): Promise<any> {
    // options
    options = Object.assign({
      snippet: ''
    }, options || {});

    return Promise.resolve(true)
      .then(() => {
        if (!title || !tags || !commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing title, tags, username or token');
        }
      })
      .then(() => {
        const url = `${this.getSurvey123HostUrl()}/api/survey/create`;
        const params: any = {
          title: title,
          tags: tags.join(','),
          snippet: options.snippet,
          thumbnailUrl: options.thumbnailUrl,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        };

        return fetch(url, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(params)
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          });
      });
  }

  /**
   * isPortal is to check if the current portalUrl (from config or from url params) is arcgis online portals or not
   */
  public isPortal(portalUrl: string): boolean {
    const arcgisOnlinePortalUrls = ['www.arcgis.com', 'devext.arcgis.com', 'qaext.arcgis.com'];

    // check if the portalUrl is arcgis online url
    const isArcgisOnline = arcgisOnlinePortalUrls.find((url, i) => {
      return portalUrl.indexOf(url) !== -1;
    });
    return isArcgisOnline ? false : true;
  }

  /**
   * query survey
   * @param commonParams
   * @param options
   */
  public querySurvey(commonParams: Survey123CommonParams, options?: {
    isShared?: boolean;
    isPublished?: boolean;
    isSearchAll?: boolean;
    queryFromClient?: boolean;
    surveyClientAPI?: any;
  }): Promise<any> {
    // options
    options = Object.assign({
      isShared: false,
      isPublished: true,
      isSearchAll: true,
      queryFromClient: false,
      surveyClientAPI: null
    }, options || {});

    return Promise.resolve(true)
      .then(() => {
        if (!commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing token or username');
        }
      })
      .then(() => {
        const params: any = {
          isShared: options.isShared,
          isPublished: options.isPublished,
          isSearchAll: options.isSearchAll,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        };
        /**
         * for portal
         */
        if (options.queryFromClient) {
          if (!options.surveyClientAPI) {
            console.log('Survey client api is not provided.');
            return null;
          }
          return options.surveyClientAPI.survey123.searchSurvey(params)
            .then((res) => {
              if (res && res.results) {
                return res.results;
              }
              throw res;
            });
        } else {
          /**
           * for AGS Online
           */
          let url = `${this.getSurvey123HostUrl()}/api/survey/search`;
          url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`;

          return fetch(url, {
            mode: 'cors',
            method: 'GET'
          })
            .then((res: any) => {
              if (res.ok) {
                return res.json();
              }
              throw res;
            })
            .then((res) => {
              if (res && res.results) {
                return res.results;
              }
              if (res && Array.isArray(res)) {
                return res;
              }
              throw res;
            });
        }
      });
  }

  /**
   * get survey123 designer url
   */
  public getSurvey123DesignerUrl(surveyItemId: string, options?: {
    portalUrl?: string
  }): string {
    // options
    options = Object.assign({

    }, options || {});

    let url = `${this.getSurvey123HostUrl()}/surveys/${surveyItemId}/design?embed=exb`;
    if (options.portalUrl && options.portalUrl !== 'https://www.arcgis.com') {
      url += `&portalUrl=${options.portalUrl}`
    }
    if (this.getSurvey123HostUrl() === 'https://survey123dev.arcgis.com' && !options.portalUrl || (options.portalUrl === 'https://www.arcgis.com')) {
      url += `&portalUrl=${options.portalUrl}`
    }

    return url;
  }

  /**
   *
   * @param surveyItemId
   * @param options
   */
  public getSurvey123WebformUrl(surveyItemId: string, options?: {
    queryParams?: string[];
  }): string {
    // options
    options = Object.assign({
      queryParams: []
    }, options || {});

    const isDebug: boolean = false;

    let url = `${this.getSurvey123HostUrl()}/share/${surveyItemId}`;

    /**
     * debugg only
     */
    if (isDebug) {
      url = `https://nanzhang.arcgis.com:8443/webclient/?appid=${surveyItemId}`;
    }


    if (options.queryParams.length > 0) {
      url += `${(isDebug) ? '&' : '?'}${options.queryParams.join('&')}`;
    }

    return url;
  }

  /**
   * flat questions, move the questions out if they are in the group.
   * ignore repeat questions until we plan to support it.
   */
  public flatQuestions(questions) {
    let result = [];
    questions.forEach((ques) => {
      // single question
      if (!ques.questions) {
        result.push(ques);
      } else if (ques.type !== 'esriQuestionTypeRepeat') {
        result = result.concat(this.flatQuestions(ques.questions));
      }
    });
    return result;
  }

  /**
   * get survey question fields
   * @param surveyItemId
   * @param commonParams
   */
  public getSurveyQuestionFields(surveyItemId: string, commonParams: Survey123CommonParams): Promise<Array<{
    name?: string;
    label?: string;
  }>> {
    return Promise.resolve(true)
      .then(() => {
        if (!surveyItemId || !commonParams || !commonParams.token) {
          throw new Error('missing surveyItemId or token');
        }
      })
      .then(() => {
        let url = `${this.getSurvey123HostUrl()}/api/survey/${surveyItemId}/form`;
        const params: any = {
          token: commonParams.token
        };

        url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`;

        return fetch(url, {
          mode: 'cors',
          method: 'GET'
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          });
      })
      .then((res: any) => {
        const results = [];

        if (res && res.questions && res.questions.length > 0) {
          // flat the questions tree, move the questions out if they are in the group.
          const questions = this.flatQuestions(res.questions);

          questions.forEach((q: any) => {
            const shortType = (q.type + '').replace('esriQuestionType', '');
            if (q.fieldName || ['geopoint', 'polyline', 'polygon'].indexOf(shortType.toLowerCase()) >= 0) {
              results.push({
                name: q.fieldName || q.name,
                label: q.label
              });
            }
          });
        }

        return results;
      });
  }

  /**
   * parse a url parameter to json, if the parameter string is simple, keep it as string
   * @param str  eg: 0.q2:pie;1.q3:{"type":"map","basemapItemId":"{itemId}"};2.q11:{"type":"wordCloud","show":"response"}
   * @param urlKey
   */
  private _urlParamToJson(str: string): any {
    if (!str) {
      return null;
    }
    str = str + '';
    const subObjs = str.split(';');
    if (subObjs.length < 2 && str.split(':').length < 2) {
      // this url parameter has no sub parameters
      if (str.split(',').length > 1) {
        // consider it as an array
        return str.split(',');
      } else {
        return str;
      }
    } else {
      const obj = {};
      subObjs.forEach((subStr) => {
        const keyVals = (subStr + '').split(':');
        if (keyVals.length > 1) {
          const key = keyVals[0];
          let val = (Array.isArray(keyVals.slice(1)) ? keyVals.slice(1) : []).join(':') as any;
          if (val.length && val[0] === '{') {
            // try to parse it to a json
            val = this._stringToJson(val);
          }
          if (typeof val === 'string') {
            if (val.split(',').length > 1) {
              // consider it as an array
              val = val.split(',');
            }
          }
          obj[key] = val;
        }
      });
      return obj;
    }
  }

  private _stringToJson(str: string): any {
    let result = str;
    try {
      result = JSON.parse(str);
    } catch (e) {
      result = str;
    }
    return result;
  }

}

export const survey123Service = new Survey123Service();