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
            @tap="onPinGeneration()"
            text="➜"
            selectedBackgroundColor="#444"
          />
        </StackLayout>
      </DockLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import h from '../../helpers/helpers'
import PlantList from "./PlantList";
export default {
  data() {
    return {
      pin: "12345"
    };
  },
  methods: {
    onPinGeneration() {
      this.$fb.getValue(`/Pins/${this.pin}`)
        .then(result => {
          const v = result['value']
          if (typeof v !== 'object') {
            // this.$fb.remove(`/Pins/${this.pin}`)
            this.$store.commit('generatedOrders')
            this.$store.commit('storeActive', this.pin)
            this.$navigateTo(PlantList);
            this.pin = ""
          } else {
            alert({
              title: "Pin Login",
              message: "Incorrect pin. Try again.",
              okButtonText: "Ok"
            })
          }
        })
        .catch(alert)
    }
  }
};
</script>

<style scoped>
.go {
  /* background: #134e5e; 
  background: -webkit-linear-gradient(
    to top,
    #71b280,
    #134e5e
  ); 
  background: linear-gradient(
    to top,
    #71b280,
    #134e5e
  );  */
  background: #25591f;
}
</style>