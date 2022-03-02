<template>
  <Page>
    <!-- <ActionBar title="🍁 Transactions"></ActionBar> -->
    <ActionBar title="🍁">
      <ActionItem v-show="!isBusy" ios.position="right">
        <Label @tap="onReset()" fontSize="22">
          <FormattedString>
            <Span class="fas" text.decode="&#xf021;" color="#444"></Span>
          </FormattedString>
        </Label>
      </ActionItem>
      <ActionItem ios.position="right" v-show="!isBusy">
        <StackLayout
          orientation="horizontal"
          borderColor="#ccc"
          height="40"
          borderWidth="2px"
          borderRadius="50%"
          width="290"
          marginTop="10"
          marginBottom="10"
          marginRight="50"
        >
          <TextField
            v-model="transaction"
            hint="Search Plant Name"
            borderWidth="0"
            width="210"
            height="40"
            style="padding: 5px 20px"
          ></TextField>
          <Button
            borderRadius="50%"
            width="30"
            class="search"
            marginRight="0"
            height="30"
            @tap="onSearchInventory()"
            text="🔍"
          />
        </StackLayout>
      </ActionItem>
    </ActionBar>
    <ActivityIndicator v-if="isBusy" :busy="isBusy" />
    <StackLayout v-else orientation="vertical">
      <ScrollView orientation="vertical" marginTop="0">
        <StackLayout orientation="vertical">
          <StackLayout
            orientation="vertical"
            v-for="(item, index) in formatted_data"
            :key="index"
            marginBottom="10"
          >
            <Label class="inventory">
              <FormattedString>
                <Span class="fas" text.decode="&#xf06c;"></Span>
                <Span :text="' ' + item['name']" fontWeight="bold" />
              </FormattedString>
            </Label>
            <GridLayout
              v-for="(it, idx) in item['grid']"
              :key="idx"
              columns="*"
              rows="*,*"
              width="100%"
            >
              <GridLayout col="0" row="0" columns="*,3*" rows="*">
                <Image
                  :src="item['photo']"
                  loadMode="async"
                  width="100"
                  height="100"
                  margin="10"
                  @tap="item['content']"
                />
                <StackLayout col="1" row="0" orientation="vertical">
                  <Label
                    textWrap="true"
                    width="100%"
                    style="text-align: center"
                  >
                    <FormattedString>
                      <Span
                        :text="item['content']['Scientific_Name']"
                        fontWeight="normal"
                        color="#666"
                      />
                    </FormattedString>
                  </Label>
                  <!-- <Label textWrap="true">
                    <FormattedString>
                      <Span
                        :text="item['content']['Description']"
                        fontWeight="bold"
                      />
                    </FormattedString>
                  </Label> -->
                  <WebView :src="item['content']['Description']" />
                </StackLayout>
              </GridLayout>
              <two-col-grid :data="it['data']" col="0" row="1" />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import TwoColGrid from '../common/grids.vue'
import PlantInfo from '../customer_view/PlantInfo.vue'
export default {

  components: {
    TwoColGrid,
  },
  data() {
    return {
      transaction: "",
      formatted_data: [],
      isBusy: true
    };
  },
  methods: {
    onReset() {
      this.transaction = ""
      this.getInventories()
    },
    onSearchInventory() {
      this.getInventories(this.transaction)
      this.transaction = ""
    },
    onViewPlantInfo(item) {
      this.$navigateTo(PlantInfo, {
        props: {
          info: item
        }
      });
    },
    buildGrids(remaining, price, bg, inventory) {
      const bydate = []
      const data = {
        rows: [],
        content: [],
        cols: []
      }
      data['cols'] = ['*', '*']
      data['content'].push({
        col: 0,
        row: 0,
        background: bg,
        size: 14,
        text: remaining,
        text_align: 'center'
      })

      data['content'].push({
        col: 1,
        row: 0,
        background: bg,
        size: 14,
        text: price,
        text_align: 'center'
      })
      data['rows'].push('auto')


      data['content'].push({
        col: 0,
        row: 1,
        background: '#fff',
        size: 14,
        text: inventory['Stock'],
        text_align: 'center'
      })

      data['content'].push({
        col: 1,
        row: 1,
        background: '#fff',
        size: 14,
        text: inventory['Price'],
        text_align: 'center'
      })

      data['rows'].push('auto')

      bydate.push({
        data: data
      })


      inventory["Description"] = `
                    <p style="text-align: justify;text-justify: inter-word; font-size:12px; font-weight:normal;">
                    ${inventory["Description"].replace(/\n|\t|\r|\\/gi, "")}
                    </p>
                    `

      return {
        data: bydate,
        photo: inventory['Photo']
      }
    },
    async getInventories(key = "") {
      this.isBusy = true
      this.formatted_data.length = 0
      const v = await this.$fb.getValue(`/Plants/${key}`)
      if (v['value'] != null) {
        let ids = v['value']
        if (key != "") {
          ids = {
            [key]: v['value']
          }
        }
        Object.keys(ids).forEach((x, i) => {
          const grid = this.buildGrids('Remaining Qty', 'Price', '#eee', ids[x])
          this.formatted_data.push({
            content: ids[x],
            name: x,
            photo: grid['photo'],
            grid: grid['data']
          })
        })
      }
      setTimeout(() => {
        this.isBusy = false
      }, 500);
    }
  },
  mounted() {
    this.getInventories()
  },
};
</script>

<style>
.search {
  background: #eee;
}

.inventory {
  background: #3b5998;
  color: #fff;
  width: 100%;
  padding: 20px;
  text-align: left;
  font-size: 20px;
}
</style>