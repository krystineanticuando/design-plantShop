<template>
  <Page>
    <FlexboxLayout
      alignItems="flex-center"
      flexDirection="column"
      height="100%"
      style="justify-content: center; align-items: center"
    >
      <StackLayout orientation="vertical" width="90%" marginTop="10">
        <Label marginBottom="20" textAlignment="center">
          <FormattedString>
            <Span text="Hi, " fontWeight="bold" fontSize="20" />
            <Span
              :text="$store.state.active + '!'"
              fontWeight="bold"
              fontSize="20"
              color="#19270d"
            />
          </FormattedString>
        </Label>
        <card-view
          margin="10"
          elevation="5"
          radius="0"
          @tap="onShowSellerInventory()"
          height="165"
        >
          <StackLayout orientation="vertical">
            <GridLayout columns="auto" rows="2*,*" class="grid">
              <Image
                height="100"
                width="100"
                src="~/assets/icons/inventory.png"
                stretch="fill"
                loadMode="async"
                col="0"
                row="0"
              />
              <Label col="0" row="1" class="label-grid" height="50"
                ><FormattedString>
                  <Span
                    text="View Inventory"
                    color="#228b22"
                    fontWeight="bold"
                    fontSize="16"
                  />
                </FormattedString>
              </Label>
            </GridLayout>
          </StackLayout>
        </card-view>
        <card-view
          margin="10"
          elevation="5"
          radius="0"
          @tap="onShowSellerTransaction()"
          height="165"
        >
          <StackLayout orientation="vertical">
            <GridLayout columns="auto" rows="2*,*" class="grid">
              <Image
                height="100"
                width="100"
                src="~/assets/icons/transaction.png"
                stretch="fill"
                loadMode="async"
                col="0"
                row="0"
              />
              <Label col="0" row="1" class="label-grid" height="50"
                ><FormattedString>
                  <Span
                    text="View Transaction"
                    color="#228b22"
                    fontWeight="bold"
                    fontSize="16"
                  />
                </FormattedString>
              </Label>
            </GridLayout>
          </StackLayout>
        </card-view>
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
  background: #dfe3ee;
}

.label-grid {
  background: #fff;
  width: 100%;
  padding: 30px 30px;
}
</style>