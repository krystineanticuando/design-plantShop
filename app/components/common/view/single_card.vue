<template>
  <card-view margin="10" elevation="10" radius="20" @tap="onMoreInfo(item)">
    <StackLayout orientation="vertical" padding="20">
      <Image
        height="150"
        width="180"
        :src="item['Photo']"
        stretch="fill"
        loadMode="async"
        margin="0"
      />

      <Label textWrap="true" textAlignment="center" marginRight="5">
        <FormattedString>
          <Span
            color="#f44336"
            :text="item['Price']"
            fontSize="16"
            fontWeight="bold"
          />
        </FormattedString>
      </Label>

      <Label
        textWrap="true"
        fontSize="14"
        fontWeight="bold"
        textAlignment="center"
        width="100%"
      >
        <FormattedString>
          <Span
            class="plant-name"
            :text="item['Common_Name'].slice(0, 1).toUpperCase()"
          />
          <Span :text="item['Common_Name'].slice(1).toUpperCase()" />
        </FormattedString>
      </Label>

      <Label textWrap="true" textAlignment="center" width="100%">
        <FormattedString>
          <Span color="#aaa" :text="item['Scientific_Name']" />
        </FormattedString>
      </Label>
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
.cardStyle {
  background-color: #3489db;
  color: #fff;
}

.plant-name {
  font-size: 24;
  color: #8b9dc3;
}
</style>