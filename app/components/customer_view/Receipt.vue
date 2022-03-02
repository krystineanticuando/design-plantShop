<template>
  <Page>
    <ActionBar title="🍂 Purchased List">
      <NavigationButton visibility="collapsed"></NavigationButton>
      <ActionItem ios.position="right">
        <Label width="50" @tap="onPlantList()">
          <FormattedString>
            <Span
              class="fas"
              fontSize="22"
              height="50"
              width="50"
              text.decode="&#xf5bb;"
            >
            </Span>
          </FormattedString>
        </Label>
      </ActionItem>
    </ActionBar>
    <StackLayout orientation="vertical">
      <StackLayout
        orientation="vertical"
        padding="30"
        margin="10 0 10 0"
        backgroundColor="#eee"
        marginBottom="0"
      >
        <Label
          :text="'Customer ' + $store.state.my_pin"
          textAlignment="center"
          fontWeight="bold"
          fontSize="16"
        />
        <Label
          text="Your Purchase"
          textAlignment="center"
          fontWeight="bold"
          fontSize="26"
        />
        <Label
          :text="today"
          textAlignment="center"
          color="#888"
          marginTop="20"
        />
      </StackLayout>
      <ScrollView orientation="vertical" marginTop="10">
        <four-col-grid
          :data="data"
          @onDelete="onDelete"
          @onChangeQty="onChangeQty"
          v-if="refresh == false"
        />
      </ScrollView>
      <Button
        borderRadius="50%"
        backgroundColor="#3b5998"
        width="360"
        marginTop="20"
        @tap="onGenerate()"
        height="40"
        v-if="!show_receipt"
      >
        <FormattedString>
          <Span text=" Generate Receipt!" fontWeight="bold" color="#fff" />
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
          <Span text="Receipt Generated" fontSize="18" />
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
          <Span text="Pay at the counter" fontSize="14" color="#666" />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>

<script>
import h from '../../helpers/helpers'
import PlantList from "@/components/customer_view/PlantList";
import FourColGrid from '../common/grids.vue'
import ChangeQty from '../common/changeqty.vue'
export default {
  computed: {
    orders() {
      return this.$store.state.orders
    }
  },
  methods: {
    onGenerate() {
      if (this.orders.length) {
        confirm({
          title: "Generate Receipt",
          message: `Do you want to proceed with the order?`,
          okButtonText: "Ok",
          cancelButtonText: "Cancel"
        }).then(async (result) => {
          if (result) {
            const v = await this.$fb.getValue(`/Transactions/${this.$store.state.my_pin}`)
            let myorder = this.orders
            const timestamp = new Date()
            const today = h.formatDate(timestamp, false, '_')
            if (v['value'] && v['value'] != null) {
              myorder = this.orders.concat(
                v['value']
                [today]
                ['orders']
              )
            }
            const value = {
              [this.$store.state.my_pin]: {
                [today]: {
                  timestamp: h.formatDate(timestamp, true, '/'),
                  orders: myorder
                }
              }
            }
            this.$fb.update(
              `/Transactions`,
              value
            );
            this.refresh = true
            this.show_receipt = true

            this.$store.commit('generatedOrders')
            this.loadSelected()
            this.$nextTick(() => this.refresh = false)

            setTimeout(() => {
              this.show_receipt = false
              setTimeout(() => {
                this.onPlantList()
              }, 500);
            }, 1500);
          }
        })
      }
    },
    onPlantList() {
      this.$navigateTo(PlantList);
    },
    onDelete(index) {
      const plantname = this.data['content'][index + 2]['text']
      confirm({
        title: "Remove Order",
        message: `Do you want to delete  [ ${plantname} ] from the list?`,
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result) {
          this.$store.commit('removeSimilarOrder', plantname)
          this.$fb.getValue(`/Plants/${plantname}/Stock`)
            .then(result => {
              const v = parseInt(result['value']) +
                parseInt(this.data['content'][index + 1]['text'])
              this.$fb.update(
                `/Plants/${plantname}/Stock`, v
              );

              this.$store.commit('updatePlantData',
                {
                  key: plantname,
                  code: 'Stock',
                  value: v
                })

              this.refresh = true
              this.loadSelected()
              this.$nextTick(() => this.refresh = false)
            })
            .catch(alert)
        }
      })
    },
    onChangeQty(index) {
      const plantname = this.data['content'][index + 1]['text']
      const qty = this.data['content'][index]['text']
      this.$showModal(ChangeQty, {
        props: {
          qty: qty,
          name: plantname
        },
        fullscreen: false,
        animated: true,
        stretched: false,
        dimAmount: 0.5
      });
    },
    loadSelected() {
      this.data['content'] = []
      this.data['rows'] = []
      this.data['cols'] = ['50', '50', '2*', '*']
      let amount = 0
      let total_qty = 0
      const grp = {}

      //header
      //total
      this.data['content'].push({
        col: 0,
        row: 0,
        background: '#ddd',
        size: 14,
        text: 'Del',
        text_align: 'center'
      })
      this.data['content'].push({
        col: 1,
        row: 0,
        background: '#ddd',
        size: 14,
        text: 'Qty',
        text_align: 'center'
      })
      this.data['content'].push({
        col: 2,
        row: 0,
        background: '#ddd',
        size: 14,
        text: 'Items',
        text_align: 'center'
      })
      this.data['content'].push({
        col: 3,
        row: 0,
        background: '#eee',
        size: 14,
        text: `Amount`,
        text_align: 'center'
      })
      this.data['rows'].push('auto')

      this.$store.state.orders.forEach((item) => {
        const items = Object.keys(item)
        const key = items[0]//.replace(/-/gi, ' ')
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
          text: '⊖',
          text_align: 'center'
        })

        this.data['content'].push({
          col: 1,
          row: i + 1,
          background: '#ddd',
          size: 14,
          text: items['qty'],
          text_align: 'center'
        })

        this.data['content'].push({
          col: 2,
          row: i + 1,
          background: '#ddd',
          size: 14,
          text: items['code'],
          text_align: 'center'
        })
        this.data['content'].push({
          col: 3,
          row: i + 1,
          background: '#fff',
          size: 14,
          text: h.toPhp(items['amount']),
          text_align: 'center'
        })
        this.data['rows'].push('auto')

        total_qty += parseInt(items['qty'])
      })

      //total
      this.data['content'].push({
        col: 0,
        row: keys.length + 1,
        background: '#ddd',
        size: 14,
        text: '',
        text_align: 'center'
      })
      this.data['content'].push({
        col: 1,
        row: keys.length + 1,
        background: '#ddd',
        size: 14,
        text: total_qty,
        text_align: 'center'
      })
      this.data['content'].push({
        col: 2,
        row: keys.length + 1,
        background: '#ccc',
        size: 14,
        text: 'Total',
        text_align: 'right'
      })
      this.data['content'].push({
        col: 3,
        row: keys.length + 1,
        background: '#eee',
        size: 14,
        text: h.toPhp(amount),
        text_align: 'right'
      })
      this.data['rows'].push('auto')
    }
  },
  components: {
    FourColGrid
  },
  data() {
    return {
      today: "",
      data: {
        rows: [],
        content: [],
        cols: []
      },
      show_receipt: false,
      refresh: false
    };
  },
  created() {
    this.today = h.formatDate(new Date(), true, '/')
    this.loadSelected()
  },
};
</script>

<style>
</style>