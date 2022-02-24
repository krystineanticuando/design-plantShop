<template>
  <Page>
    <ActionBar title="🍀 Plan Info" />
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
          <RadDataForm :source="subinfo" isReadOnly="true" />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import RadDataForm from "nativescript-ui-dataform/vue";
Vue.use(RadDataForm);

export default {
  props: ["info"],
  data() {
    return {
      subinfo: {}
    };
  },
  mounted() {
    this.subinfo = {
      lightExposure: this.info["Light_Exposure"],
      careNeeds: this.info["Care_Needs"],
      waterUse: this.info["Water_Use"],
      stockItem: "" + this.info["Stock"],
      price: this.info["Price"]
    };
  }
};
</script>

<style>
</style>