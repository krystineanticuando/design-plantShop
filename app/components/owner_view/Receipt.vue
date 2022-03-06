<template>
  <Page>
    <ActionBar title="🍂 Purchased List">
      <NavigationButton visibility="collapsed"></NavigationButton>
      <ActionItem ios.position="right">
        <Label width="50" @tap="onSellerView()">
          <FormattedString>
            <Span
              class="fas"
              fontSize="22"
              height="50"
              width="50"
              text.decode="&#xf5bb;"
              color="#25591f"
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
          :text="'Customer [ ' + user + ' ]'"
          textAlignment="center"
          fontWeight="bold"
          fontSize="16"
        />
        <Label
          text="Receipt"
          textAlignment="center"
          fontSize="26"
          fontWeight="bold"
        />
        <Label
          :text="today"
          textAlignment="center"
          color="#888"
          marginTop="20"
        />
      </StackLayout>
      <ScrollView orientation="vertical" marginTop="10">
        <two-col-grid :data="data" />
      </ScrollView>
      <Button
        borderRadius="50%"
        backgroundColor="#228b22"
        width="360"
        marginTop="20"
        @tap="onAccept()"
        height="40"
        :disabled="show_receipt"
      >
        <FormattedString>
          <Span
            text=" Generate Payment Receipt"
            fontWeight="bold"
            color="#fff"
          />
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
          <Span
            :text="'Customer [ ' + user + ' ]'"
            fontSize="14"
            color="#666"
          />
        </FormattedString>
      </Label>
    </StackLayout>
  </Page>
</template>
<script>
import h from '../../helpers/helpers'
import SellerView from "./SellerView.vue";
import TwoColGrid from '../common/grids.vue'
export default {
  props: ['info'],
  methods: {
    onAccept() {
      this.show_receipt = true
      setTimeout(() => {
        this.show_receipt = false
      }, 1500);
    },
    onSellerView() {
      this.$navigateTo(SellerView)
    }
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
      show_receipt: false,
      user: ""
    };
  },
  created() {
    this.today = h.formatDate(new Date(), true, '/')
    this.data['cols'] = ['50', '2*', '*']
    let amount = 0
    let total_qty = 0
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

    this.user = this.info['user']
    this.info['item'].forEach((info, i) => {
      const keys = Object.keys(info)
      keys.forEach((item) => {
        const items = info[item]
        this.data['content'].push({
          col: 0,
          row: i + 1,
          background: '#fff',
          size: 14,
          text: items['qty'],
          text_align: 'center'
        })

        this.data['content'].push({
          col: 1,
          row: i + 1,
          background: '#fff',
          size: 14,
          text: item,
          text_align: 'center'
        })

        this.data['content'].push({
          col: 2,
          row: i + 1,
          background: '#fff',
          size: 14,
          text: h.toPhp(items['price']),
          text_align: 'center'
        })
        this.data['rows'].push('auto')

        amount += parseFloat(items['price'])

        total_qty += parseInt(items['qty'])
      })
    })

    //total
    this.data['content'].push({
      col: 0,
      row: this.info['item'].length + 1,
      background: '#ddd',
      size: 14,
      text: total_qty,
      text_align: 'center'
    })
    this.data['content'].push({
      col: 1,
      row: this.info['item'].length + 1,
      background: '#ddd',
      size: 14,
      text: 'Total',
      text_align: 'right'
    })
    this.data['content'].push({
      col: 2,
      row: this.info['item'].length + 1,
      background: '#ccc',
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