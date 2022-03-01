<template>
  <Page>
    <ActionBar title="🍃 Plan List">
      <NavigationButton visibility="collapsed"></NavigationButton>

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

    <StackLayout orientation="vertical">
      <!-- <Label
        textAlignment="left"
        width="100%"
        marginTop="10"
        marginBottom="10"
        marginLeft="15"
      >
        <FormattedString>
          <Span
            :text="'🌾 Item in your cart [ ' + orders + ' ]'"
            fontSize="14"
            color="#666"
          />
        </FormattedString>
      </Label> -->
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
      <ScrollView orientation="vertical">
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
              <HtmlView
                marginTop="20"
                marginBottom="0"
                :html="item['Description']"
              />
              <Label textWrap="true" textAlignment="right" marginRight="5">
                <FormattedString>
                  <!-- <Span text="Price: " color="#aaa" /> -->
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
          <GridLayout rows="*" columns="*,*">
            <Button
              class="cancel"
              @tap="onCancel()"
              style="height: 100px; margin-right: 0"
              row="0"
              col="0"
            >
              <FormattedString>
                <Span class="fas" text.decode="&#xf410;"> </Span>
                <Span text=" Clear Selections" fontWeight="bold" />
              </FormattedString>
            </Button>
            <Button
              :disabled="show_no_item_in_cart"
              class="paynow"
              @tap="onPayNow()"
              style="height: 100px; margin-left=0"
              row="0"
              col="1"
            >
              <FormattedString>
                <Span class="fas" text.decode="&#xf53b;"> </Span>
                <Span text=" Pay Now!" fontWeight="bold" />
              </FormattedString>
            </Button>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import h from '../../helpers/helpers'
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
      this.$store.commit('clearOrders')
    }
  },
  data() {
    return {
      plants: [],
      selections: [],
      show_no_item_in_cart: false
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders.length
    }
  },
  mounted() {
    this.$fb.getValue('/Plant_Inventory')
      .then(result => result['value']
        .filter((x) => x != null).slice(0, 3)
      )
      .then((data) => {
        this.plants = data.map((x) => {
          // x['Photo'] = '~/assets/icons/shop-logo.png'
          x["Price"] = h.toPhp(x["Price"]);
          x["Description"] = `
                    <p style="text-align:justify;text-align-last:center;margin:0 5px 0 0;">
                    <!--<span style="color:#aaa">Description: </span>-->
                    ${x["Description"].replace(/\\/gi, "")}
                    </p>
                    `;
          return x
        })
      })
      .catch(alert)
  }
};
</script>

<style>
.plant_info {
  margin: 0 0 30px 0;
  box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.2);
}

.cancel {
  color: #fff;
  border-bottom-left-radius: 50%;
  border-top-left-radius: 50%;
  background: #232526; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #414345,
    #232526
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #414345,
    #232526
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.paynow {
  border-bottom-right-radius: 50%;
  border-top-right-radius: 50%;
  color: #fff;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #71b280,
    #134e5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #71b280,
    #134e5e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.more_info {
  border: 1px solid #aaa;
  box-shadow: none;
  height: 85px;
  width: 95%;
}
</style>