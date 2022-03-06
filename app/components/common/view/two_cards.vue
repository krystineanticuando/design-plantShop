<template>
  <StackLayout orientation="vertical">
    <GridLayout columns="*,*" :rows="'*,'.repeat(data.length)">
      <single-card
        v-for="(it, id) in data"
        :key="id"
        :item="it['data']"
        :row="it['row']"
        :col="it['col']"
        @onMoreInfo="onMoreInfo"
      />
    </GridLayout>
  </StackLayout>
</template>

<script>
import SingleCard from './single_card.vue'
export default {
  components: {
    SingleCard,
  },
  props: ['item'],
  methods: {
    onMoreInfo(item) {
      this.$emit('onMoreInfo', item)
    }
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    let row = 0
    let col = 0
    for (let i = 0; i < this.item.length; i++) {
      this.data.push({
        row: row,
        col: col,
        data: this.item[i]
      })
      col++
      if (col == 2) {
        col = 0
        row++
      }
    }
  },
}
</script>

<style>
</style>