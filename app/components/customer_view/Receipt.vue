<template>
  <Page>
    <ActionBar title="🍂 Purchased List" />
    <StackLayout orientation="vertical">
      <StackLayout
        orientation="vertical"
        padding="30"
        margin="10 0 10 0"
        backgroundColor="#eee"
      >
        <Label text="Customer ID" textAlignment="center" />
        <Label text="Your Purchase" textAlignment="center" fontSize="26" />
        <Label
          :text="today"
          textAlignment="center"
          color="#888"
          marginTop="20"
        />
      </StackLayout>
      <ScrollView orientation="vertical">
        <StackLayout height="30">
          <GridLayout columns="2*, *">
            <label col="0" backgroundColor="#ddd">
              <FormattedString>
                <Span
                  text="0,0"
                  fontSize="16"
                  fontWeight="bold"
                  style="text-align: right"
                />
              </FormattedString>
            </label>
            <label col="1" backgroundColor="#eee" style="text-align: right">
              <FormattedString>
                <Span text="0,1" fontSize="16" fontWeight="bold" />
              </FormattedString>
            </label>
          </GridLayout>
        </StackLayout>

        <!-- <RadDataForm :source="album" isReadOnly="true" /> -->
      </ScrollView>
      <Button
        borderRadius="50%"
        backgroundColor="#3b5998"
        width="350px"
        marginTop="20"
        @tap="onGenerate()"
      >
        <FormattedString>
          <Span text=" Submit Now!" fontWeight="bold" color="#fff" />
        </FormattedString>
      </Button>
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import RadDataForm from "nativescript-ui-dataform/vue";
Vue.use(RadDataForm);

export default {
  methods: {
    onGenerate() {
      console.log("Button was pressed");
    }
  },

  props: ["purchased"],
  data() {
    return {
      album: {
        bandName: "Ed Sheeran",
        albumName: "X",
        year: "2017",
        owned: true,
        myRating: "9.5"
      },
      today: ""
    };
  },
  mounted() {
    this.today = new Date().toString();
  }
};
</script>

<style>
</style>