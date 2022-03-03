<template>
  <Page>
    <ActionBar
      :title="'🍃 [ ' + (isBusy ? '...' : plants.length) + ' ] Plan List'"
    >
      <NavigationButton visibility="collapsed"></NavigationButton>
      <ActionItem ios.position="right">
        <Label
          width="40"
          @tap="onCancel()"
          :disabled="show_no_item_in_cart"
          v-if="orders > 0"
          color="#f44336"
        >
          <FormattedString>
            <Span
              class="fas"
              fontSize="22"
              height="50"
              width="40"
              text.decode="&#xf12d;"
            >
            </Span>
          </FormattedString>
        </Label>
      </ActionItem>
      <ActionItem ios.position="right">
        <Label
          width="70"
          @tap="onPayNow()"
          :disabled="show_no_item_in_cart"
          v-if="orders > 0"
        >
          <FormattedString>
            <Span
              class="fas"
              fontSize="22"
              height="50"
              width="50"
              text.decode="&#xf217;"
              color="#25591f"
            >
            </Span>
            <Span text="  "></Span>
            <Span
              v-if="orders > 0"
              :text="orders"
              color="#f44336"
              fontWeight="bold"
              fontSize="18"
            />
          </FormattedString>
        </Label>
      </ActionItem>
    </ActionBar>

    <Label
      v-if="show_no_item_in_cart"
      style="
        text-align: center;
        background: #ddd;
        color: #242424;
        padding: 20px;
      "
    >
      <FormattedString>
        <Span
          text=" Opps, No items in your cart!"
          fontSize="16"
          fontWeight="bold"
        />
      </FormattedString>
    </Label>
    <ActivityIndicator :busy="isBusy" v-if="isBusy" />
    <ScrollView orientation="vertical" v-else>
      <StackLayout orientation="vertical">
        <StackLayout v-if="view == 0" orientation="vertical">
          <choices
            v-for="(item, index) in plants"
            :key="index"
            :item="item"
            @onMoreInfo="onMoreInfo"
          />
        </StackLayout>
        <StackLayout v-else-if="view == 1" orientation="vertical">
          <standard
            v-for="(item, index) in plants"
            :key="index"
            :item="item"
            @onMoreInfo="onMoreInfo"
          />
        </StackLayout>
        <StackLayout v-else-if="view == 2" orientation="vertical">
          <two-cards :item="plants" @onMoreInfo="onMoreInfo" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import PlantInfo from "./PlantInfo";
import Receipt from "./Receipt";

import Choices from '../common/view/single_card'
import Standard from '../common/view/standard'
import TwoCards from '../common/view/two_cards.vue'
export default {
  components: {
    Choices,
    Standard,
    TwoCards
  },
  methods: {
    onMoreInfo(item) {
      this.$navigateTo(PlantInfo, {
        props: {
          info: item,
          show_add_to_cart: true
        }
      });
    },
    onPayNow() {
      if (this.orders > 0) {
        this.$navigateTo(Receipt);
      } else {
        this.show_no_item_in_cart = true
        setTimeout(() => {
          this.show_no_item_in_cart = false
        }, 1500);
      }
    },
    onCancel() {
      confirm({
        title: "Clear Order",
        message: `Do you want to clear your order list?`,
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(async (result) => {
        if (result) {
          this.$store.commit('clearOrders')
          const affected = this.$store.state.cleared_affected
          const keys = Object.keys(affected)
          for (const key of keys) {
            const v = await this.$fb.getValue(`/Plants/${key}/Stock`)
            await this.$fb.update(
              `/Plants/${key}/Stock`, parseInt(v['value']) + parseInt(affected[key])
            )
          }
        }
      })

    },
  },
  data() {
    return {
      selections: [],
      show_no_item_in_cart: false,
      plants: [],
      isBusy: true,
      view: 2
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders.length
    },
  },
  created() {
    this.isBusy = true
  },
  mounted() {
    setTimeout(() => {
      this.plants = this.$store.state.plants;
      this.isBusy = false
    }, 500);
  },
};
</script>

<style>
.more_info {
  border: 1px solid #aaa;
  box-shadow: none;
  height: 85px;
  width: 95%;
}
</style>