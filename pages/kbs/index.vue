<template>
  <div class="kbs-page">
    <h1>Vui lòng điền các thông tin để được tư vấn chính xác nhất</h1>
    <div class="filter-search">
      <div class="filter">
        <div class="item">
          <app-autocomplete
            :options="optionSex"
            value=""
            label="Giới tính"
            option-filter-prop="label"
            @selected="
              value => {
                sex = value
              }
            "
            @input="() => {}"
          />
        </div>
        <div class="item">
          <app-autocomplete
            :options="optionJob"
            value=""
            option-filter-prop="label"
            label="Nghề nghiệp"
            @selected="
              value => {
                job = value
              }
            "
            @input="() => {}"
          />
        </div>
        <div class="item">
          <app-autocomplete
            :options="optionInterests"
            value=""
            label="Sở thích"
            option-filter-prop="label"
            @selected="
              value => {
                interest = value
              }
            "
            @input="() => {}"
          />
        </div>
      </div>
      <div class="action">
        <button class="button" @click="onGetKbs">Tư vấn</button>
      </div>
    </div>
    <mobile-table :hot-data="hotData"></mobile-table>
  </div>
</template>

<script>
import MobileTable from '@/pages/kbs/-mobile-table'
import { getInterests, getJob, getKbs } from '@/models/kbs'
export default {
  name: 'KbsPage',
  components: { MobileTable },
  data() {
    return {
      optionSex: [
        { label: 'Nam', value: 'G2' },
        { label: 'Nữ', value: 'G1' },
      ],
      optionInterests: [],
      optionJob: [],
      sex: null,
      job: null,
      interest: null,
      hotData: [
        // {
        //   id: 'DT25',
        //   name: 'Samsung Galaxy A32',
        //   price: 6490000,
        //   img: 'https://cdn.tgdd.vn/Products/Images/42/234315/samsung-galaxy-a32-4g-thumb-xanh-600x600-600x600.jpg',
        //   os: 'Android',
        //   color: 'Xanh',
        //   ram: 6,
        //   rom: 128,
        //   camera: '64',
        //   description: null,
        // },
      ],
    }
  },

  computed: {},
  watch: {},
  async created() {
    await this.initDate()
  },

  mounted() {},
  methods: {
    async initDate() {
      const [{ value: interests }, { value: jobs }] = await Promise.allSettled([
        getInterests(),
        getJob(),
      ])
      this.optionInterests = interests.map(e => {
        return {
          label: e.description,
          value: e.id,
        }
      })
      this.optionJob = jobs.map(e => {
        return {
          label: e.description,
          value: e.id,
        }
      })
    },
    handleChangeFilterOperator() {},
    async onGetKbs() {
      const arr = []
      if (this.sex) arr.push(this.sex)
      if (this.job) arr.push(this.job)
      if (this.interest) arr.push(this.interest)

      const data = await getKbs({ gt: arr.join(',') })
      this.hotData = data
    },
  },
}
</script>

<style lang="scss" scoped>
.kbs-page {
  margin: 10px 0;
  font-family: $material-icons-font-path;
  > .filter-search {
    margin-bottom: 20px;
    border: 1px solid $rs-theme-primary;
    border-radius: 5px;
    padding-bottom: 20px;
  }

  > .filter-search > .filter {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: max-content;
  }

  > .filter-search > .filter > .item {
    margin: 20px;
    width: 300px;
  }
  .item {
    display: flex;
    align-content: center;
    justify-items: center;
    width: 100%;
    text-align: center;
    > .label {
      margin-right: 10px;
    }
  }
  > .filter-search > .action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .filter-search > .action > .button {
    user-select: none;
    margin-right: 6px;
    border-radius: 4px;
    background: #580ce6;
    cursor: pointer;
    padding: 0 20px;
    height: 30px;
    line-height: 25px;
    color: #fff;
    font-size: 15px;
  }
}
</style>
