<template>
  <Page>
    <!-- <ActionBar title="Welcome Seller"> </ActionBar> -->
    <FlexboxLayout
      alignItems="flex-center"
      flexDirection="column"
      height="100%"
      style="justify-content: center; align-items: center"
    >
      <StackLayout orientation="vertical" width="290" marginTop="10">
        <Label marginBottom="20" textAlignment="center">
          <FormattedString>
            <Span text="Welcome Seller" fontWeight="bold" fontSize="20" />
          </FormattedString>
        </Label>
        <GridLayout columns="auto" rows="2*,*" class="grid">
          <image
            height="100"
            width="100"
            src="~/assets/icons/inventory.png"
            stretch="fill"
            loadMode="async"
            col="0"
            row="0"
          />
          <Label
            col="0"
            row="1"
            class="label-grid"
            @tap="onShowSellerInventory()"
            ><FormattedString>
              <Span
                text="View Inventory"
                color="#666"
                fontWeight="bold"
                fontSize="16"
              />
            </FormattedString>
          </Label>
        </GridLayout>
        <GridLayout columns="auto" rows="2*,*" class="grid">
          <image
            height="100"
            width="100"
            src="~/assets/icons/transaction.png"
            stretch="fill"
            loadMode="async"
            col="0"
            row="0"
          />
          <Label
            col="0"
            row="1"
            class="label-grid"
            @tap="onShowSellerTransaction()"
            ><FormattedString>
              <Span
                text="View Transaction"
                color="#666"
                fontWeight="bold"
                fontSize="16"
              />
            </FormattedString>
          </Label>
        </GridLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import SellerInventory from './SellerInventory.vue'
import SellerTransaction from './SellerTransaction.vue'
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onShowSellerInventory() {
      this.$navigateTo(SellerInventory);
    },
    onShowSellerTransaction() {
      this.$navigateTo(SellerTransaction);
    }
  }
};
</script>

<style>
.grid {
  border-color: #aaa;
  border-width: 2;
  background: #ddd;
  height: 30%;
  border-radius: 20px;
  margin-bottom: 20px;
}

.label-grid {
  background: #fff;
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 50px 20px;
}
</style>