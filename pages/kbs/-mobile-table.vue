<template>
  <div class="ranking-table">
    <table class="table">
      <thead class="header">
        <tr class="row">
          <th
            v-for="(column, i) in tableColumns"
            :key="'head_' + i"
            class="cell"
            :class="column.variant"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(ranking, index) in hotData" :key="ranking.id" class="row">
          <td
            v-for="(column, i) in tableColumns"
            :key="'cell_' + i"
            class="cell"
            :class="column.variant"
          >
            <a v-if="column.mappingField === 'index'" class="link">
              {{ index + 1 }}
            </a>
            <template v-else-if="column.mappingField === 'img'">
              <img :src="ranking[column.mappingField]" />
            </template>
            <template v-else-if="['number', 'integer'].includes(column.format)">
              {{
                formatValue(
                  ranking[column.mappingField],
                  column.unit,
                  column.format
                )
              }}
            </template>
            <template v-else>
              {{ ranking[column.mappingField] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { pathified } from '@azoom/util'
import iconSort from '@/assets/icons/icon-sort.svg'
import iconSortAsc from '@/assets/icons/icon-arrow-up.svg'
import iconSortDesc from '@/assets/icons/icon-arrow-down.svg'

import { TABLE_COLUMNS } from '@/utils/constants'
const ranking = pathified('ranking')
export default {
  name: 'RankingTable',
  props: {
    hotData: {
      type: Array,
      default: () => [],
    },
    monthRange: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      iconSort,
      iconSortAsc,
      iconSortDesc,
      tableColumns: TABLE_COLUMNS,
      sort: {
        sortField: '',
        type: 'desc',
        order: '',
      },
    }
  },
  methods: {
    formatValue(value, unit = '', format = 'number') {
      if (format === 'integer') {
        return Number(value) + unit
      }
      return Number(value).toFixed(1) + unit
    },
    goToUserDetailPage(id) {
      const query = this.generateQuery(id)
      this.openDetailPage(query, '/user')
    },
    openDetailPage(query, path) {
      const routeData = this.$router.resolve({
        query,
        path,
      })
      window.open(routeData.href, '_blank')
    },
    generateQuery(id) {
      const userId = id

      const { start, end } = this.monthRange
      return {
        userId,
        from: start,
        to: end,
      }
    },
    sortData(sortField, fieldIndex) {
      this.sort.sortField = sortField
      if (this.sort.type === 'asc') {
        this.sort.type = ''
        this.tableColumns.forEach(column => {
          column.icon = iconSort
        })
        this.sort.order = 'not'
      } else if (this.sort.type === 'desc') {
        this.sort.type = 'asc'
        this.tableColumns.forEach((column, idx) => {
          if (fieldIndex === idx) {
            column.icon = iconSortAsc
          } else column.icon = iconSort
        })
        this.sort.order = 'desc'
      } else if (this.sort.type === '') {
        this.sort.type = 'desc'
        this.tableColumns.forEach((column, idx) => {
          if (fieldIndex === idx) {
            column.icon = iconSortDesc
          } else column.icon = iconSort
        })
        this.sort.order = 'asc'
      }
      ranking.$commit('SET_SORT', {
        field: this.sort.sortField,
        order: this.sort.order,
      })
    },
    tooltip(column) {
      if (column.mappingField === 'achievementRate') {
        return '（手数料達成率+直営賃料達成率）÷2'
      }
      if (column.mappingField === 'subleaseAchievementRate') {
        return '（直営賃料達成率+直営台数達成率）÷2'
      }

      return {
        disabled: true,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ranking-table {
  height: calc(100vh - 205px);
  overflow-y: auto;
}

.ranking-table > .table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  font-size: 0.8rem;

  > .header {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  > .header > .row > .cell {
    border-width: 1px;
    border-color: $color-white-1;
    background: $rs-theme-primary;
    padding: 12px;
    text-align: center;
    white-space: nowrap;
    color: $color-white-1;
    font-weight: normal;
    // &.-index {
    //   width: 5%;
    //   text-align: left;
    // }
    // &.-name {
    //   width: 10%;
    //   text-align: center;
    // }
    // &.-branch-name {
    //   width: 18%;
    //   text-align: left;
    // }
    // &.-position-name {
    //   width: 10%;
    //   text-align: left;
    // }
    // &.-achievement-rate {
    //   width: 9%;
    //   text-align: right;
    // }
    // &.-sublease-achievement-rate {
    //   width: 10%;
    //   text-align: right;
    // }
    // &.-rate-fee {
    //   width: 10%;
    //   text-align: right;
    // }
    // &.-rate-sublease-rent {
    //   width: 10%;
    //   text-align: right;
    // }
    // &.-rate-sublease-contract-car-count {
    //   width: 11%;
    //   text-align: right;
    // }
    // &.-sublease-contract-car-count {
    //   width: 7%;
    //   text-align: right;
    // }
  }

  > .body > .row {
    background: $color-white-1;
    &:nth-child(even) {
      background: $color-white-2;
    }
    &:hover {
      transition: 0.2s;
      background: $color-gray-4;
      cursor: pointer;
    }
    &.-selected {
      background-color: rgba(135, 187, 235, 0.1);
    }
  }

  > .body > .row > .cell {
    padding: 10px;
    overflow: hidden;
    text-align: center;

    > .link {
      cursor: pointer;
      color: $color-blue-1;
    }

    > .link:hover {
      text-decoration: underline;
    }
    &.-image {
      height: 100px;
    }
    > img {
      max-width: 100%;
      max-height: 100%;
    }

    // &.-achievement-rate {
    //   width: 5%;
    //   text-align: right;
    // }
    // &.-sublease-achievement-rate {
    //   width: 5%;
    //   text-align: right;
    // }
    // &.-rate-fee {
    //   width: 5%;
    //   text-align: right;
    // }
    // &.-rate-sublease-rent {
    //   width: 5%;
    //   text-align: right;
    // }
    // &.-rate-sublease-contract-car-count {
    //   width: 5%;
    //   text-align: right;
    // }
    // &.-sublease-contract-car-count {
    //   width: 5%;
    //   text-align: right;
    // }
  }
}
</style>
