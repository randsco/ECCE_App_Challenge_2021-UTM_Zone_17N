import {DataSource, DataSourceConstructorOptions, DataRecord, DataSourceFactory, QueryResult, ImmutableObject} from 'jimu-core';
import {SimpleDataRecordImpl, AbstractQueriableDataSource, QueryParams, QueryOptions} from 'jimu-core/data-source';

export enum DataSourceTypes{
  GitHubRepository = 'GITHUB_REPOSITORY',
}
export default class DataSourceFactoryExtension implements DataSourceFactory{
  createDataSource(options: DataSourceConstructorOptions): DataSource{
    const dsJson = options.dataSourceJson;
    if(dsJson.type === DataSourceTypes.GitHubRepository){
      return new GithubRepositoryDataSource(options);
    }else{
      console.error('Unimplemented data source type.', dsJson.type);
    }
  }
}

export interface SearchQueryParam extends QueryParams{
  q: string;
}

export type IMSearchQueryParam = ImmutableObject<SearchQueryParam>;

export class GithubRepositoryDataSource extends AbstractQueriableDataSource{
  load(query: SearchQueryParam, options: QueryOptions): Promise<DataRecord[]>{
    return super.load(query, options);
  }

  doQuery(query: IMSearchQueryParam): Promise<QueryResult>{
    return window.fetch(`${this.url}?q=${query.q}`).then(res => res.json()).then(result => {
      return {
        queryParams: query,
        records: result.items.map(item => new SimpleDataRecordImpl(item, this))
      };
    });
  }

  getConfigQueryParams(){
    return null;
  }

  getRemoteQueryParams(){
    return null;
  }

  doQueryCount(query: IMSearchQueryParam): Promise<QueryResult>{
    return Promise.resolve({queryParams: query, count: 0});
  }

  doQueryById(id: string): Promise<DataRecord>{
    return Promise.reject('todo: query by id')
  }

  mergeQueryParams(baseQuery, newQuery){
    return null;
  }

  setJsonData(data: any[]){
    this.records = data.map(d => new SimpleDataRecordImpl(d, this));
  }

  doAdd(record: DataRecord): Promise<DataRecord>{
    //we will not create repository here acturally
    return Promise.resolve(record);
  }
}