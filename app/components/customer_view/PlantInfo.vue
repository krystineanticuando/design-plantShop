<template>
  <Page>
    <ActionBar title="🍀 Plant Info">
      <NavigationButton visibility="collapsed"></NavigationButton>

      <ActionItem ios.position="right">
        <Label width="70" v-if="orders > 0" @tap="onPayNow()">
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
          <two-col-grid :data="data" v-if="refresh == false" />
          <Button class="add_to_cart" @tap="onAddToCart()">
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
import TwoColGrid from '../common/grids.vue'
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
      refresh: false,
      isown: false
    };
  },
  methods: {
    onAddToCart() {
      this.refresh = true
      this.$fb.getValue(`/Plants/${this.info['Common_Name']}/Stock`)
        .then(result => {
          const stock = parseInt(result['value']) - 1
          if (stock <= 0) {
            alert('Your stock is empty. Please replenish.')
            return
          }
          this.info['Stock'] = stock
          this.$fb.update(
            `/Plants/${this.info['Common_Name']}/Stock`, this.info['Stock']
          );
          this.$store.commit('addOrder', {
            key: this.info['Common_Name'],
            item: this.info["Price"].toString().replace(/[^0-9.]/gi, '')
          })
          this.updateStock()
        })
        .catch(alert)
        .finally(() => {
          this.$nextTick(() => this.refresh = false)
        })
    },
    onPayNow() {
      if (this.orders > 0) {
        this.isown = false
        this.$navigateTo(Receipt);
      }
    },
    updateStock() {
      this.data['content'] = []
      this.data['rows'] = []
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
    }
  },
  updated() {
    if (this.isown == false) {
      this.isown = true
      const key = this.info['Common_Name']
      const index = this.$store.state.plants.findIndex((x) => x['Common_Name'] == key)
      if (index != -1) {
        this.refresh = true
        setTimeout(() => {
          this.info['Stock'] = this.$store.state.plants[index]['Stock']
          this.updateStock()
          this.refresh = false
        }, 1000)
      }
    }
  },
  mounted() {
    this.isown = true
  },
  created() {
    this.updateStock()
  },

};
</script>

<style>
.add_to_cart {
  margin: 10px 0;
}
</style>