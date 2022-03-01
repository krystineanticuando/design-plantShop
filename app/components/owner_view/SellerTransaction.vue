<template>
  <Page>
    <ActionBar title="🍁 Transactions"></ActionBar>
    <StackLayout orientation="vertical">
      <StackLayout
        orientation="horizontal"
        borderColor="#ccc"
        height="40"
        borderWidth="2px"
        borderRadius="50%"
        width="290"
        marginTop="10"
        marginBottom="10"
      >
        <TextField
          v-model="transaction"
          hint="Search transaction"
          borderWidth="0"
          width="210"
          height="40"
          style="padding: 5px 20px"
        ></TextField>
        <Button
          borderRadius="50%"
          width="30"
          class="search"
          marginRight="0"
          height="30"
          @tap="onSearchTransactions()"
          text="🔍"
        />
      </StackLayout>
      <ScrollView orientation="vertical" marginTop="0">
        <four-col-grid :data="data" />
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import FourColGrid from '../common/grids.vue'
export default {
  methods: {
    onSearchTransactions() {

    }
  },
  components: {
    FourColGrid,
  },
  data() {
    return {
      transaction: "",
      data: {
        rows: [],
        content: [],
        cols: []
      }
    };
  },
  created() {
    this.today = new Date().toString();
    this.data['cols'] = ['*', '*', '2*', '*']

    //header
    //total
    this.data['content'].push({
      col: 0,
      row: 0,
      background: '#eee',
      size: 14,
      text: 'ID',
      text_align: 'center'
    })
    this.data['content'].push({
      col: 1,
      row: 0,
      background: '#eee',
      size: 14,
      text: 'Date',
      text_align: 'center'
    })
    this.data['content'].push({
      col: 2,
      row: 0,
      background: '#eee',
      size: 14,
      text: 'Items',
      text_align: 'center'
    })
    this.data['content'].push({
      col: 3,
      row: 0,
      background: '#eee',
      size: 14,
      text: 'Total',
      text_align: 'center'
    })
    this.data['rows'].push('auto')

  },
};
</script>

<style>
.search {
  background: #eee;
}
</style>