<template>
  <Page>
    <ActionBar title="🍀 Plant Info">
      <NavigationButton visibility="collapsed"></NavigationButton>

      <ActionItem ios.position="right">
        <Label width="70" v-if="orders > 0" @tap="paynow()">
          <FormattedString>
            <Span
              class="fas"
              fontSize="22"
              height="50"
              width="50"
              text.decode="&#xf217;"
            >
            </Span>
            <Span text="  "></Span>
            <Span
              v-if="orders > 0"
              :text="orders"
              fontSize="18"
              color="#f44336"
              fontWeight="bold"
            />
          </FormattedString>
        </Label>
      </ActionItem>
    </ActionBar>
    <StackLayout orientation="vertical">
      <Image
        :src="info['Photo']"
        loadMode="async"
        width="300"
        height="200"
        margin="10"
        verticalAlignment="top"
        @tap="moreInfo(info)"
      />
      <ScrollView orientation="vertical" marginBottom="10">
        <StackLayout orientation="vertical" padding="10">
          <Label
            :text="info['Common_Name'].toUpperCase()"
            textAlignment="center"
            fontSize="18"
            fontWeight="bold"
          />
          <Label textWrap="true" textAlignment="center">
            <FormattedString>
              <Span
                textAlignment="center"
                :text="info['Scientific_Name']"
                color="#aaa"
              />
            </FormattedString>
          </Label>
          <HtmlView marginTop="20" :html="info['Description']" />
          <two-col-grid :data="data" />
          <Button class="add_to_cart" @tap="addtocart()">
            <FormattedString>
              <Span class="fas" text.decode="&#xf217;"> </Span>
              <Span text=" Add to Cart" fontWeight="bold" />
            </FormattedString>
          </Button>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import h from '../../helpers/helpers'
import Receipt from "./Receipt";
import TwoColGrid from '../common/two_col_grid.vue'
export default {
  computed: {
    orders() {
      return this.$store.state.orders.length
    }
  },
  components: {
    TwoColGrid,
  },
  props: ["info"],
  data() {
    return {
      data: {
        rows: [],
        content: [],
        cols: []
      },
    };
  },
  methods: {
    addtocart() {
      this.info['Stock']--
      this.$store.commit('addOrder', {
        key: this.info['Common_Name'],
        item: this.info["Price"].toString().replace(/[^0-9,.]/gi, '')
      })
    },
    paynow() {
      if (this.orders > 0) {
        this.$navigateTo(Receipt);
      }
    },
  },
  created() {
    this.data['cols'] = ['2*', '*']
    const items = {
      'Light_Exposure': this.info['Light_Exposure'],
      'Care_Needs': this.info['Care_Needs'],
      'Water_Use': this.info['Water_Use'],
      'Stock': this.info['Stock'],
      'Price': h.toPhp(this.info['Price'])
    }
    const keys = Object.keys(items)
    keys.forEach((item, i) => {
      this.data['content'].push({
        col: 0,
        row: i,
        background: '#ddd',
        size: 14,
        text: item.replace(/_/gi, ' '),
        text_align: 'right'
      })
      this.data['content'].push({
        col: 1,
        row: i,
        background: '#eee',
        size: 14,
        text: items[item],
        text_align: 'right'
      })
      this.data['rows'].push('auto')
    })
  },

};
</script>

<style>
.add_to_cart {
  margin: 10px 0;
}
</style>