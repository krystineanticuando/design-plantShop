<template>
  <Page>
    <StackLayout orientation="vertical">
      <StackLayout
        orientation="vertical"
        padding="30"
        margin="10 0 10 0"
        backgroundColor="#eee"
        marginBottom="0"
      >
        <Label text="Customer ID" textAlignment="center" />
        <Label text="Receipt" textAlignment="center" fontSize="26" />
        <Label
          :text="today"
          textAlignment="center"
          color="#888"
          marginTop="20"
        />
      </StackLayout>
      <ScrollView orientation="vertical" marginTop="0">
        <two-col-grid :data="data" />
      </ScrollView>
      <Button
        borderRadius="50%"
        backgroundColor="#3b5998"
        width="360"
        marginTop="20"
        @tap="onAccept()"
        height="40"
        :disabled="show_receipt"
      >
        <FormattedString>
          <Span text=" Generate Receipt" fontWeight="bold" color="#fff" />
        </FormattedString>
      </Button>

      <Label
        v-if="show_receipt"
        style="
          text-align: center;
          background: #ddd;
          color: #242424;
          padding-top: 50px;
        "
      >
        <FormattedString>
          <Span class="fas" text.decode="&#xf058;" fontSize="26" />
        </FormattedString>
      </Label>
      <Label
        v-if="show_receipt"
        style="
          text-align: center;
          background: #ddd;
          color: #242424;
          padding: 20px;
        "
      >
        <FormattedString>
          <Span text="Collect Payment" fontSize="18" />
        </FormattedString>
      </Label>
      <Label
        v-if="show_receipt"
        style="
          text-align: center;
          background: #ddd;
          color: #444;
          padding-bottom: 50px;
        "
      >
        <FormattedString>
          <Span text="Customer ID" fontSize="14" color="#666" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>
<script>
import h from '../../helpers/helpers'
import PlantList from "@/components/customer_view/PlantList";
import TwoColGrid from '../common/grids.vue'
export default {
  methods: {
    onAccept() {
      this.show_receipt = true
      setTimeout(() => {
        this.show_receipt = false
      }, 1500);
    },
  },
  components: {
    TwoColGrid,
  },
  data() {
    return {
      today: "",
      data: {
        rows: [],
        content: [],
        cols: []
      },
      show_receipt: false
    };
  },
  created() {
    this.today = new Date().toString();
    this.data['cols'] = ['50', '2*', '*']
    let amount = 0
    const grp = {}

    //header
    //total
    this.data['content'].push({
      col: 0,
      row: 0,
      background: '#ddd',
      size: 14,
      text: 'Qty',
      text_align: 'center'
    })
    this.data['content'].push({
      col: 1,
      row: 0,
      background: '#ddd',
      size: 14,
      text: 'Items',
      text_align: 'center'
    })
    this.data['content'].push({
      col: 2,
      row: 0,
      background: '#eee',
      size: 14,
      text: `Amount`,
      text_align: 'center'
    })
    this.data['rows'].push('auto')

    this.$store.state.orders.forEach((item) => {
      const items = Object.keys(item)
      const key = items[0].replace(/-/gi, ' ')
      if (!(key in grp)) {
        grp[key] = {
          qty: 1,
          code: key,
          amount: parseFloat(item[items[0]])
        }
      } else {
        grp[key] = {
          qty: parseInt(grp[key]['qty']) + 1,
          code: key,
          amount: parseFloat(grp[key]['amount']) + parseFloat(item[items[0]])
        }
      }
      amount += parseFloat(item[items[0]])
    })
    const keys = Object.keys(grp)
    keys.forEach((item, i) => {
      const items = grp[item]
      this.data['content'].push({
        col: 0,
        row: i + 1,
        background: '#ddd',
        size: 14,
        text: items['qty'],
        text_align: 'right'
      })

      this.data['content'].push({
        col: 1,
        row: i + 1,
        background: '#ddd',
        size: 14,
        text: items['code'],
        text_align: 'right'
      })
      this.data['content'].push({
        col: 2,
        row: i + 1,
        background: '#fff',
        size: 14,
        text: h.toPhp(items['amount']),
        text_align: 'right'
      })
      this.data['rows'].push('auto')
    })

    //total
    this.data['content'].push({
      col: 0,
      row: keys.length + 1,
      background: '#ddd',
      size: 14,
      text: this.$store.state.orders.length,
      text_align: 'right'
    })
    this.data['content'].push({
      col: 1,
      row: keys.length + 1,
      background: '#ddd',
      size: 14,
      text: 'Total',
      text_align: 'right'
    })
    this.data['content'].push({
      col: 2,
      row: keys.length + 1,
      background: '#eee',
      size: 14,
      text: h.toPhp(amount),
      text_align: 'right'
    })
    this.data['rows'].push('auto')

  },
};
</script>

<style>
</style>