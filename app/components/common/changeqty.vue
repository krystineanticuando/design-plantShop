<template>
  <ModalStack dismissEnabled="true" class="modal-container">
    <GridLayout
      columns="*"
      rows="*,*"
      width="230"
      height="230"
      class="modal"
      style="horizontal-align: center"
    >
      <Label text="Label 1" row="0" col="0">
        <FormattedString>
          <Span :text="qty" fontSize="14" color="#666" />
        </FormattedString>
      </Label>
      <Label text="Label 1" row="1" col="0">
        <FormattedString>
          <Span :text="name" fontSize="14" color="#666" />
        </FormattedString>
      </Label>
    </GridLayout>
  </ModalStack>
</template>
<script>
export default {
  props: ['qty', 'name']
}
</script>

<style>
.modal {
  margin: 20;
  margin-top: 35;
  border-radius: 8;
  vertical-align: middle;
  background-color: white;
}

.modal-container {
  padding: 25;
  padding-bottom: 10;
}
</style>