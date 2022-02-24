<template>
  <Page>
    <ActionBar title="🍃 Plan List" />
    <StackLayout orientation="vertical">
      <Label
        textAlignment="left"
        width="100%"
        marginTop="10"
        marginBottom="10"
        marginLeft="15"
      >
        <FormattedString>
          <Span text="🌾 Item in your cart..." fontSize="14" color="#666" />
        </FormattedString>
      </Label>
      <ScrollView orientation="vertical" marginBottom="10">
        <StackLayout orientation="vertical">
          <StackLayout
            v-for="(item, index) in plants"
            :key="index"
            orientation="horizontal"
            class="plant_info"
            borderColor="#ddd"
            backgroundColor="#fff"
            borderWidth="1"
            marginBottom="5"
            paddingTop="20"
            paddingBottom="20"
            @tap="moreInfo(item)"
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
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import PlantInfo from "./PlantInfo";
import Receipt from "./Receipt";
export default {
  methods: {
    moreInfo(item) {
      // this.$navigateTo(PlantInfo, {
      //   props: {
      //     info: item
      //   }
      // });
      this.$navigateTo(Receipt, {
        props: {
          purchased: item
        }
      });
    }
  },
  data() {
    return {
      plants: []
    };
  },
  mounted() {
    const data = require('../../assets/db_sample.json')["Plant_Inventory"]
    this.plants = data.map((x) => {
      x['Photo'] = '~/assets/icons/shop-logo.png'
      x["Price"] = `Php ${parseFloat(x["Price"].toString().replace(/[^0-9,.]/gi, '')).toFixed(2)}`;
      x["Description"] = `
                    <p style="text-align:justify;text-align-last:center;margin:0 5px 0 0;">
                    <!--<span style="color:#aaa">Description: </span>-->
                    ${x["Description"].replace(/\\/gi, "")}
                    </p>
                    `;
      return x
    })
  }
};
</script>

<style>
.plant_info {
  border-bottom-width: 15;
  border-bottom-color: blue;
  padding: 5px;
  background-color: gray;
}
</style>