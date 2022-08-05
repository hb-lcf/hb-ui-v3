<template>
  <div class="hb-table" :style="{ height }">
    <table class="hb-table-table" border="0" cellspacing="0" cellpadding="0" :width="width">
      <thead class="hb-thead">
        <tr class="hb-thead-th" :height="trHeight">
          <th v-if="num" :class="isTdThClass('thead')" :align="align || 'left'" />
          <th v-for="(item, i) in columns" :class="isTdThClass('thead')" :width="item.width" :key="i" :align="align || 'left'">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody class="hb-tbody">
        <tr v-for="(dataItem, ind) in data" :class="[
            'hb-tbody-tr',
            {
              'hb-tbody-tr-zebra': zebra
            }
          ]" :height="trHeight" :style="importantStyle(ind)" :key="ind">
          <td v-if="num" :class="isTdThClass('tbody')" :align="align || 'left'">
            {{ ind + 1 }}
          </td>
          <td v-for="(colItem, index) in columns" :class="isTdThClass('tbody')" :key="index" :align="align || 'left'">
            {{ dataItem[colItem.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'HbTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    trHeight: {
      type: String,
      default: '40px'
    },
    align: {
      type: String,
      default: 'left',
      validator: (v) => {
        return ['left', 'right', 'center', ''].includes(v)
      }
    },
    zebra: Boolean,
    border: Boolean,
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    num: Boolean,
    important: {
      type: Array,
      default: () => []
    },
    importantColor: {
      type: String,
      default: '#fdf5e6'
    }
  },
  setup (props) {
    const importantStyle = (i) => {
      const importants = props.important
      for (const key of importants) {
        if (key === i + 1) {
          return { background: props.importantColor }
        }
      }
      return {}
    }
    const isTdThClass = (key) => {
      return [`hb-${key}-td`, { 'hb-table-border': props.border }]
    }

    return {
      importantStyle,
      isTdThClass
    }
  },

}
</script>
<style lang="scss" scoped>
.hb-table {
  background: #fff;
  overflow: auto;
  display: inline-block;
  width: 100%;

  .hb-table-table {
    border-collapse: collapse;

    .hb-thead-td,
    .hb-tbody-td {
      padding: 10px;
      box-sizing: border-box;
    }

    .hb-thead {
      border-bottom: 1px solid #dcdfe6;
      color: rgb(110, 110, 110);
    }

    .hb-tbody {
      .hb-tbody-tr {
        border-bottom: 1px solid #dcdfe6;
        color: rgb(128, 128, 128);

        &:hover {
          background: rgb(245, 247, 250);
        }
      }

      .hb-tbody-tr-zebra:nth-child(odd) {
        background: #fafafa;
      }
    }

    .hb-table-border {
      border: 1px solid #dcdfe6;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background: #dddddd;
    border-radius: 6px;
  }
}
</style>
