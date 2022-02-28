<template>
  <Page>
    <FlexboxLayout
      alignItems="flex-center"
      flexDirection="column"
      height="100%"
      style="justify-content: center; align-items: center"
    >
      <image
        height="100"
        width="100"
        src="~/assets/icons/customer.png"
        stretch="fill"
        loadMode="async"
        borderRadius="100%"
      />
      <Label textAlignment="center" width="100%">
        <FormattedString>
          <Span text="Welcome Customer!" fontWeight="bold" fontSize="22" />
        </FormattedString>
      </Label>
      <DockLayout stretchLastChild="true" marginTop="50">
        <StackLayout
          orientation="horizontal"
          dock="top"
          borderColor="#ccc"
          height="50"
          borderWidth="2px"
          borderRadius="50%"
          width="290"
        >
          <TextField
            v-model="pin"
            hint="Enter generated pin"
            borderWidth="0"
            width="210"
            height="50"
            style="padding: 5px 20px"
          ></TextField>
          <Button
            borderRadius="50%"
            width="40"
            class="go"
            marginLeft="0"
            height="40"
            color="#fff"
            @tap="showPlantList()"
            text="➜"
            selectedBackgroundColor="#444"
          />
        </StackLayout>
      </DockLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import PlantList from "./PlantList";
export default {
  data() {
    return {
      pin: ""
    };
  },
  methods: {
    showPlantList() {
      this.$navigateTo(PlantList);
    }
  }
};
</script>

<style>
.go {
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
</style>