<template>
  <Page>
    <!-- <ActionBar title="🍁 Transactions"></ActionBar> -->
    <ActionBar title="🍁">
      <ActionItem v-show="!isBusy" ios.position="right">
        <Label @tap="onReset()" fontSize="22">
          <FormattedString>
            <Span class="fas" text.decode="&#xf021;" color="#444"></Span>
          </FormattedString>
        </Label>
      </ActionItem>
      <ActionItem ios.position="right" v-show="!isBusy">
        <StackLayout
          orientation="horizontal"
          borderColor="#ccc"
          height="40"
          borderWidth="2px"
          borderRadius="50%"
          width="290"
          marginTop="10"
          marginBottom="10"
          marginRight="50"
        >
          <TextField
            v-model="transaction"
            hint="Search Generated Pin"
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
      </ActionItem>
    </ActionBar>
    <ActivityIndicator v-if="isBusy" :busy="isBusy" />
    <StackLayout v-else orientation="vertical">
      <ScrollView orientation="vertical" marginTop="0">
        <StackLayout orientation="vertical">
          <StackLayout
            orientation="vertical"
            v-for="(item, index) in formatted_data"
            :key="index"
            marginBottom="10"
          >
            <Label class="transactions">
              <FormattedString>
                <Span class="fas" text.decode="&#xf21d;"></Span>
                <Span :text="item['user']" fontWeight="bold" />
              </FormattedString>
            </Label>
            <GridLayout
              v-for="(it, idx) in item['grid']"
              :key="idx"
              columns="*"
              rows="*,*"
              width="100%"
            >
              <GridLayout col="0" row="0" columns="*,*" rows="50">
                <Label
                  style="text-align: center; padding: 40px 0"
                  fontSize="14"
                  backgroundColor="#dfe3ee"
                  col="0"
                  row="0"
                >
                  <FormattedString>
                    <Span class="fas" text.decode="&#xf017;"></Span>
                    <Span
                      :text="' ' + it['date'].replace(/\_/gi, '/')"
                      fontWeight="bold"
                    />
                  </FormattedString>
                </Label>
                <Button
                  style="padding: 20px"
                  fontSize="14"
                  col="1"
                  row="0"
                  width="100%"
                  @tap="onViewReceipt(item['user'], it['data']['ordered'])"
                >
                  <FormattedString>
                    <Span class="fas" text.decode="&#xf543;"></Span>
                    <Span text=" View Receipt" fontWeight="bold" />
                  </FormattedString>
                </Button>
              </GridLayout>
              <two-col-grid :data="it['data']" col="0" row="1" />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import h from '../../helpers/helpers'
import TwoColGrid from '../common/grids.vue'
import Receipt from './Receipt.vue'
export default {

  components: {
    TwoColGrid,
  },
  data() {
    return {
      transaction: "",
      formatted_data: [],
      isBusy: true
    };
  },
  methods: {
    onReset() {
      this.transaction = ""
      this.getTransactions()
    },
    onSearchTransactions() {
      this.getTransactions(this.transaction)
      this.transaction = ""
    },
    onViewReceipt(user, item) {
      this.$navigateTo(Receipt, {
        props: {
          info: {
            user: user,
            item: item
          }
        }
      });
    },
    buildGrids(items, total, bg, transaction) {
      let payable = 0
      const bydate = []
      const data = {
        rows: [],
        content: [],
        cols: [],
        ordered: []
      }
      data['cols'] = ['50', '2*', '*']
      const keys = Object.keys(transaction)
      keys.forEach((x) => {

        data['content'].push({
          col: 0,
          row: 0,
          background: bg,
          size: 14,
          text: 'Qty',
          text_align: 'center'
        })

        data['content'].push({
          col: 1,
          row: 0,
          background: bg,
          size: 14,
          text: items,
          text_align: 'center'
        })
        data['content'].push({
          col: 2,
          row: 0,
          background: bg,
          size: 14,
          text: total,
          text_align: 'center'
        })
        data['rows'].push('auto')
        const qty = {}
        transaction[x]['orders'].forEach((z) => {
          const plant = Object.keys(z)[0]
          if (!(plant in qty)) {
            qty[plant] = {
              qty: 0,
              price: 0
            }
          }
          qty[plant]['qty'] += 1
          qty[plant]['price'] += parseFloat(z[plant])
          payable += parseFloat(z[plant])
        })
        const qtys = Object.keys(qty)
        let row = 2
        let total_qty = 0
        qtys.forEach((z, i) => {
          row++
          data['ordered'].push({
            [z]: {
              price: qty[z]['price'],
              qty: qty[z]['qty']
            }
          })
          total_qty += parseInt(qty[z]['qty'])
          data['content'].push({
            col: 0,
            row: i + 1,
            background: '#fff',
            size: 14,
            text: qty[z]['qty'],
            text_align: 'center'
          })
          data['content'].push({
            col: 1,
            row: i + 1,
            background: '#fff',
            size: 14,
            text: z,
            text_align: 'center'
          })
          data['content'].push({
            col: 2,
            row: i + 1,
            background: '#fff',
            size: 14,
            text: h.toPhp(qty[z]['price']),
            text_align: 'center'
          })
          data['rows'].push('auto')
        })

        data['content'].push({
          col: 0,
          row: row,
          background: '#ddd',
          size: 14,
          text: total_qty,
          text_align: 'center'
        })

        data['content'].push({
          col: 1,
          row: row,
          background: '#ddd',
          size: 14,
          text: 'Payable',
          text_align: 'center'
        })
        data['content'].push({
          col: 2,
          row: row,
          background: '#ccc',
          size: 14,
          text: h.toPhp(payable),
          text_align: 'center'
        })
        data['rows'].push('auto')

        bydate.push({
          date: x,
          data: data
        })
      })
      return bydate

    },
    async getTransactions(key = "") {
      this.isBusy = true
      this.formatted_data.length = 0
      const v = await this.$fb.getValue(`/Transactions/${key}`)
      if (v['value'] != null) {
        let ids = v['value']
        if (key != "") {
          ids = {
            [key]: v['value']
          }
        }
        Object.keys(ids).forEach((x, i) => {
          this.formatted_data.push({
            user: x,
            grid: this.buildGrids('Plant Name', 'Amount', '#eee', ids[x])
          })
        })
      }
      setTimeout(() => {
        this.isBusy = false
      }, 500);
    }
  },
  mounted() {
    this.getTransactions()
  },
};
</script>

<style>
.search {
  background: #eee;
}

.transactions {
  background: #3b5998;
  color: #fff;
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 20px;
}
</style>