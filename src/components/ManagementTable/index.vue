<script setup lang="tsx">
import { computed, defineAsyncComponent, onBeforeMount, toRef, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCancelToken, useDateOptions } from '@/uses';
import { debouncedWatch } from '@vueuse/core';
import { parseTime, uppercaseFirst } from '@libs/utils';
import { Delete, Edit } from '@element-plus/icons';
import { ElMessageBox } from 'element-plus/es';
import { PERMISSION } from '@/constants';
import camelCase from 'lodash/camelCase';

const Pagination = defineAsyncComponent(() => import('@/components/Pagination/index.vue'));
const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
});
const slots = useSlots();
const { t } = useI18n();
const tableRef = toRef(props.table, 'ref');
const { shortcuts } = useDateOptions();
const cancelToken = useCancelToken();
const table = computed(() => props.table);
const tableName = table.value.name;

table.value.total = 0;
table.value.actions.templates = table.value.actions.templates || [{ template: 'edit' }, { template: 'delete' }];
table.value.actions.router = table.value.actions.router || `${uppercaseFirst(camelCase(props.table.name))}Edit`;
table.value.filters = table.value?.filters === undefined ? {} : table.value.filters;
table.value.filters.templates = table.value.filters.templates || [{ template: 'search' }, { template: 'date' }];
table.value.query = table.value.query === undefined ? {} : table.value.query;
table.value.query.search = table.value.query.search ?? '';
table.value.query.limit = table.value.query.limit || 25;
table.value.query.page = table.value.query.page || 1;
table.value.query.between_date = table.value.query.between_date ?? [];
const getList =
  props.table.actions?.getList ||
  (async () => {
    try {
      table.value.loading = true;
      const {
        data: { data },
      } = await props.table.actions.list(table.value.query, { cancelToken });
      table.value.data = data.items;
      table.value.total = data.total;
      table.value.loading = false;
    } catch (e) {
      table.value.loading = false;
    }
  });
const onFilter =
  props.table.filters?.onFilter ||
  (() => {
    table.value.query.page = 1;
    getList();
  });
const changeSort =
  props.table.actions?.changeSort ||
  (sort => {
    const { prop, order } = sort;
    table.value.query.orderBy = prop;
    table.value.query.direction = order;
    getList();
  });
const onDelete =
  props.table.actions?.onDelete ||
  ((id, index) => {
    ElMessageBox.confirm(t('common.popup.delete'), {
      confirmButtonText: t('button.delete'),
      cancelButtonText: t('button.cancel'),
      type: 'warning',
      center: true,
    }).then(async () => {
      try {
        table.value.loading = true;
        await props.table.actions.destroy(id);
        table.value.list.splice(index, 1);
        table.value.total -= 1;
        table.value.loading = false;
      } catch (e) {
        table.value.loading = false;
      }
    });
  });
debouncedWatch(() => table.value.query.search, onFilter, { debounce: 500 });
onBeforeMount(() => {
  getList();
});

const EditComponent = row => (
  <router-link to={{ name: table.value.actions.router, params: { id: row.id } }} custom>
    {{
      default: ({ href, navigate }) => (
        <el-link
          v-permission={[[PERMISSION.EDIT]]}
          type='primary'
          title={t('button.edit')}
          href={href}
          underline={false}
          onClick={navigate}
        >
          <el-icon>
            <Edit />
          </el-icon>
        </el-link>
      ),
    }}
  </router-link>
);

const DeleteComponent = (row, $index) => (
  <el-link
    v-permission={[[PERMISSION.DELETE]]}
    title={t('button.delete')}
    type='danger'
    underline={false}
    onClick={() => onDelete(row.id, $index)}
  >
    <el-icon>
      <Delete />
    </el-icon>
  </el-link>
);

defineExpose({
  onFilter,
  onDelete,
  EditComponent,
  DeleteComponent,
});

const ManagementTableComponent = () => (
  <>
    {slots.filter?.()}
    {(table.value.filters.templates || []).length > 0 && (
      <el-row gutter={20} type={'flex'} justify={'space-between'} class={'tw-mb-6 tw-flex-wrap'}>
        {(table.value.filters.templates || []).map(filter => {
          switch (filter.template) {
            case 'search':
              return (
                <el-col xs={24} span={12} class={'xs:tw-mb-6'} {...filter.col}>
                  <el-input
                    v-model={table.value.query.search}
                    class={'tw-w-full'}
                    placeholder={t('table.texts.filterPlaceholder')}
                  />
                </el-col>
              );
            case 'date':
              return (
                <el-col xs={24} span={12} {...filter.col}>
                  <el-date-picker
                    v-model={table.value.query.between_date}
                    class={'tw-w-full'}
                    type='daterange'
                    start-placeholder={t('date.start_date')}
                    end-placeholder={t('date.end_date')}
                    value-format='YYYY-MM-DD'
                    shortcuts={shortcuts.value}
                    onChange={onFilter}
                  />
                </el-col>
              );
            default:
              return typeof filter.template === 'function' && filter.template();
          }
        })}
      </el-row>
    )}
    <el-row gutter={20}>
      <el-col span={24}>
        <el-table
          ref={tableRef}
          v-loading={table.value.loading}
          data={table.value.data}
          default-sort={{ prop: table.value.query.orderBy, order: table.value.query.direction }}
          max-height='calc(100vh - 40rem)'
          border
          highlight-current-row
          onSortChange={changeSort}
          {...(table.value.props || {})}
        >
          {table.value.columns.filter(Boolean).map(item => {
            return (
              <el-table-column
                key={item.field}
                prop={item.field}
                label={item.label ?? t(`table.${tableName}.${item.field}`)}
                header-align={item.headerAlign || 'center'}
                {...item}
              >
                {{
                  default: ({ row, column, $index }) =>
                    typeof item.template === 'function'
                      ? item.template({ row, column, $index })
                      : item.template === 'date'
                      ? parseTime(row[item.field], item.format || '{y}-{m}-{d} {h}:{i}') || '-'
                      : row[item.field] ?? '-',
                }}
              </el-table-column>
            );
          })}
          <el-table-column label={t('table.actions')} align='center'>
            {{
              default: ({ row, column, $index }) => (
                <div className='action__button'>
                  {(table.value.actions.templates || []).map(button => {
                    switch (button.template) {
                      case 'edit':
                        return EditComponent(row);
                      case 'delete':
                        return DeleteComponent(row, $index);
                      default:
                        return button.template({ row, column, $index });
                    }
                  })}
                </div>
              ),
            }}
          </el-table-column>
        </el-table>
        {table.value.total > 0 && (
          <Pagination
            v-model:page={table.value.query.page}
            v-model:limit={table.value.query.limit}
            total={table.value.total}
            onPagination={getList}
          />
        )}
      </el-col>
    </el-row>
  </>
);
</script>

<template>
  <ManagementTableComponent />
</template>
