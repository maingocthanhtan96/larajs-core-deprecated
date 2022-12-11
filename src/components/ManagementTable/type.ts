import type { TableProps } from 'element-plus/lib/components/table/src/table/defaults';
import type { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults';
import type { ColProps } from 'element-plus/lib/components/col/src/col';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type JSXElementFunction = () => JSX.Element;
export interface TemplateFilter {
  template: 'search' | 'date' | JSXElementFunction;
  col?: ColProps;
}

export interface TemplateAction {
  template: JSX.Element | 'edit' | 'delete';
}

export interface Filter {
  templates?: TemplateFilter[];
  changeFilter?: () => void;
}

export interface Action {
  router?: string;
  templates?: TemplateAction[];
  changeSort?: (sort: any) => void;
  onDelete?: (id: string, index: number) => void;
  destroy?: (id: string) => Promise<AxiosResponse>;
  getList?: () => Promise<AxiosResponse>;
  list?: (query?: any, props?: AxiosRequestConfig) => Promise<AxiosResponse>;
}

export interface Column extends Partial<TableColumnCtx<any>> {
  field: string;
  template?: (({ row, column, $index }) => void) | 'date';
  format?: string;
}

export interface QueryTable {
  search?: string;
  limit?: number;
  page?: number;
  direction?: 'descending' | 'ascending';
  orderBy?: string;
  between_date?: string[];
  [key: string]: any;
}

export interface RowTable<T> {
  row: T;
  column: TableColumnCtx<T>;
  $index: number;
}

export interface ManagementTableType<T> {
  name: string;
  ref: null | string;
  data: T[];
  total?: number;
  loading?: boolean;
  query?: QueryTable;
  filters?: Filter;
  actions: Action;
  props?: Partial<TableProps<T>>;
  columns: Column[];
}

export interface ExposeTable {
  onFilter: () => void;
  onDelete: (id, index) => void;
  EditComponent: (row) => JSX.Element;
  DeleteComponent: (row, index) => JSX.Element;
}
