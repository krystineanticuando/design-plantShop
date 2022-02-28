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
        width="180"
        src="~/assets/icons/shop-logo.png"
        stretch="fill"
        loadMode="async"
      />

      <Label textAlignment="center" width="100%">
        <FormattedString>
          <Span text="Welcome!" fontWeight="bold" fontSize="22" />
        </FormattedString>
      </Label>

      <Button
        marginTop="50"
        borderRadius="50%"
        width="80%"
        @tap="onCustomer()"
        class="customer"
      >
        <FormattedString>
          <Span class="fas" text.decode="&#xf0c0;"></Span>
          <Span text=" Customer" fontWeight="bold" />
        </FormattedString>
      </Button>
      <Button
        borderRadius="50%"
        width="80%"
        @tap="onStoreOwner()"
        class="owner"
      >
        <FormattedString>
          <Span class="fas" text.decode="&#xf007;"></Span>
          <Span text=" Store Owner" fontWeight="bold" />
        </FormattedString>
      </Button>
    </FlexboxLayout>
  </Page>
</template>
<script>
import PinGeneration from "@/components/customer_view/PinGeneration";
import PlantList from "@/components/customer_view/PlantList";
export default {
  methods: {
    onCustomer() {
      this.$navigateTo(PlantList);
      // this.$navigateTo(PinGeneration);
    },
    onStoreOwner() {

    }
  },

  data() {
    return {};
  },
  mounted() {

  }
};
</script>

<style scoped>
.customer {
  color: #fff;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.owner {
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
</style>