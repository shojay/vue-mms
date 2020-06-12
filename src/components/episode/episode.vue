<template>
  <div class="container">
    <div class="index-container">
      <span class="plain">No.</span>
      <span class="index">{{ index | formatIndex }}</span>
      <div class="line"></div>
    </div>
    <div class="date-container">
      <span class="month">{{ month }}</span>
      <span class="year">{{ year }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "episode",
  props: {
      index: {
          type: Number
      }
  },
  data() {
    return {
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      year: 0,
      month: '',
      _index: ''
    }
  },
  filters: {
    formatIndex(index) {
      return index < 10 ? '0' + index : index
    }
  },
  created() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()

      this.year = year
      this.month = this.months[month]
  }
};
</script>

<style lang="scss" scoped>
.container{
    height: 30px;
    display: inline-flex;
    .index-container{
        display: flex;
        align-items: baseline;
        .plain{
            font-size: 16px;
        }
        .index{
            font-size: 30px;
            line-height: 30px;
            font-weight: 800;
            margin-right: 7px;
        }
        .line{
            height: 22px;
            margin-right: 7px;
            border-left: 1px solid #000000;
        }
    }
    .date-container{
        display: flex;
        flex-direction: column;
        .month{
            font-size: 12px;
            line-height: 12px;
        }
        .year{
            font-size: 12px;
        }
    }
}
</style>
