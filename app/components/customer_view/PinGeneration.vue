<template>
  <Page>
    <FlexboxLayout
      alignItems="flex-center"
      flexDirection="column"
      height="100%"
      style="justify-content: center; align-items: center"
    >
      <image
        height="150"
        width="150"
        src="~/assets/icons/customer.png"
        stretch="fill"
        loadMode="async"
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
            backgroundColor="#555"
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
</style>