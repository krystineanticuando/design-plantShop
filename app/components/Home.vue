<template>
  <Page>
    <FlexboxLayout
      alignItems="flex-center"
      flexDirection="column"
      height="100%"
      style="justify-content: center; align-items: center"
    >
      <Image
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
import h from '../helpers/helpers'
import PinGeneration from "@/components/customer_view/PinGeneration"
import SellerLogin from '@/components/owner_view/SellerLogin.vue'
export default {
  methods: {
    onCustomer() {
      this.$navigateTo(PinGeneration);
    },
    onStoreOwner() {
      this.$navigateTo(SellerLogin);
    },
    loadPlantList(data) {
      const obj = Object.keys(data)//.slice(0, 3)
      this.$store.commit('plantsData', obj.map((d) => {
        const x = data[d]
         x['Photo'] = `~/assets/images/${x['Common_Name']}.png`
        // x['Photo'] = '~/assets/images/plant0.png'
        x["Price"] = h.toPhp(x["Price"]);
        x["Description"] = `
                    <p style="text-align: justify;text-justify: inter-word; font-size:12px; font-weight:normal;">
                    ${x["Description"].replace(/\n|\t|\r|\\/gi, "")}
                    </p>
                    `;
        return x
      }))
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$fb.getValue('/Plants')
      .then(result => result['value'])
      .then(this.loadPlantList)
      .catch(alert)
  }
};
</script>

<style scoped>
.customer {
  color: #fff;
  /* background: #134e5e;
  background: -webkit-linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); 
  background: linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  );  */
  background: #25591f;
}

.owner {
  color: #fff;
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
  background: #228b22;
}
</style>