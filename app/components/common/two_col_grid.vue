<template>
  <GridLayout :columns="cols" :rows="rows">
    <label
      v-for="(item, index) in grid"
      :key="index"
      :col="item['col']"
      :row="item['row']"
      :backgroundColor="item['background']"
      borderColor="#ccc"
      borderWidth="1"
      padding="5 10"
      :textAlignment="item['text_align']"
      marginBottom="2"
    >
      <FormattedString>
        <Span :text="item['text']" :fontSize="item['size'] || 14" />
      </FormattedString>
    </label>
  </GridLayout>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      grid: [],
      rows: '',
      cols: ''
    }
  },
  methods: {
    buildgrid() {
      this.rows = this.data['rows'].join(',')
      this.cols = this.data['cols'].join(',')
      this.grid = this.data['content']
    }
  },
  mounted() {
    this.buildgrid();
  },
}
</script>

<style>
</style>