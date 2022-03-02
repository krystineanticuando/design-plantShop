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
          <Span text="Welcome Seller!" fontWeight="bold" fontSize="22" />
        </FormattedString>
      </Label>
      <StackLayout orientation="vertical" width="290" marginTop="10">
        <TextField
          v-model="username"
          hint="Enter seller account"
          class="input-field"
        ></TextField>
        <TextField
          v-model="password"
          hint="Password"
          type="password"
          class="input-field"
          secure="true"
        ></TextField>

        <Button
          borderRadius="50%"
          width="150"
          class="go"
          marginLeft="0"
          height="40"
          color="#fff"
          @tap="onSellerLogin()"
        >
          <FormattedString>
            <Span class="fas" text.decode="&#xf084;"></Span>
            <Span text=" Login" fontWeight="bold" />
          </FormattedString>
        </Button>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import SellerView from "@/components/owner_view/SellerView.vue";
export default {
  data() {
    return {
      username: "username",
      password: "password"
    };
  },
  methods: {
    async onSellerLogin() {
      const v = await this.$fb.getValue(`/Seller`)
      if (v['value'] != null) {
        const username = v['value']['Username']
        const password = v['value']['Password']
        if (username.toLowerCase() == this.username.toLowerCase() && this.password.toLowerCase() == password.toLowerCase()) {
          this.$store.commit('storeActive', username.toUpperCase())
          this.$navigateTo(SellerView);
        } else {
          alert({
            title: "Seller Login",
            message: "Invalid login credential. Try again.",
            okButtonText: "Ok"
          })
        }
      }

    }
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  border-color: #aaa;
  border-width: 2;
  border-radius: 50%;
  box-shadow: none;
  padding: 30px 20px;
}
.go {
  background: #228b22;
}
</style>