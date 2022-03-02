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
        <StackLayout
          v-for="(item, index) in plants"
          :key="index"
          orientation="horizontal"
          class="plant_info"
          paddingTop="20"
          paddingBottom="20"
          @tap="onMoreInfo(item)"
        >
          <Image
            :src="item['Photo']"
            width="100"
            height="100"
            margin="10"
            verticalAlignment="top"
            loadMode="async"
          />
          <StackLayout orientation="vertical">
            <Label
              :text="item['Common_Name'].toUpperCase()"
              textWrap="true"
              fontSize="14"
              fontWeight="bold"
            />

            <Label textWrap="true">
              <FormattedString>
                <Span color="#aaa" :text="item['Scientific_Name']" />
              </FormattedString>
            </Label>
            <!-- <HtmlView
                marginTop="20"
                marginBottom="0"
                :html="item['Description']"
              /> -->
            <WebView :src="item['Description']" />
            <Label textWrap="true" textAlignment="right" marginRight="5">
              <FormattedString>
                <Span
                  color="#f44336"
                  :text="item['Price']"
                  fontSize="16"
                  fontWeight="bold"
                />
              </FormattedString>
            </Label>

            <Label height="20" backgroundColor="#fff"></Label>

            <Button class="more_info" @tap="onMoreInfo(item)">
              <FormattedString>
                <Span class="fas" text.decode="&#xf05a;"> </Span>
                <Span text=" More Info" fontWeight="bold" />
              </FormattedString>
            </Button>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>

import PlantInfo from "./PlantInfo";
import Receipt from "./Receipt";
export default {
  methods: {
    onMoreInfo(item) {
      this.$navigateTo(PlantInfo, {
        props: {
          info: item
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
      isBusy: true
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
.plant_info {
  margin: 0 0 30px 0;
  box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.2);
}
.more_info {
  border: 1px solid #aaa;
  box-shadow: none;
  height: 85px;
  width: 95%;
}
</style>