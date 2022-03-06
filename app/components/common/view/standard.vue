<template>
  <card-view margin="10" elevation="10" radius="0" @tap="onMoreInfo(item)">
    <StackLayout orientation="horizontal" margin="0" padding="20">
      <Image
        :src="item['Photo']"
        width="100"
        height="100"
        margin="10"
        verticalAlignment="top"
        loadMode="async"
      />
      <StackLayout orientation="vertical">
        <Label
          :text="item['Common_Name'].toUpperCase()"
          textWrap="true"
          fontSize="14"
          fontWeight="bold"
        />

        <Label textWrap="true">
          <FormattedString>
            <Span color="#aaa" :text="item['Scientific_Name']" />
          </FormattedString>
        </Label>
        <WebView :src="item['Description']" />
        <Label textWrap="true" textAlignment="right" marginRight="5">
          <FormattedString>
            <Span
              color="#f44336"
              :text="item['Price']"
              fontSize="16"
              fontWeight="bold"
            />
          </FormattedString>
        </Label>

        <!-- <Label height="20" backgroundColor="#fff"></Label> -->

        <!-- <Button class="more_info" @tap="onMoreInfo(item)">
          <FormattedString>
            <Span class="fas" text.decode="&#xf05a;" color="#25591f"> </Span>
            <Span text=" More Info" fontWeight="bold" />
          </FormattedString>
        </Button> -->
      </StackLayout>
    </StackLayout>
  </card-view>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    onMoreInfo(item) {
      this.$emit('onMoreInfo', item)
    }
  },
}
</script>

<style>
</style>