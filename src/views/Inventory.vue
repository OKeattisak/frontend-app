<template>
  <div class="Inventory">
    <v-container>
      <v-card>
        <card-title
          button="เพิ่มสินค้า"
          subtitle="รายการสินค้า"
          title="สินค้า"
        />
        <v-card-text>
          <v-col>
            <v-text-field
              v-model="keyword"
              clearable
              dense
              label="ค้นหา"
              outlined
            ></v-text-field>
          </v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>รหัสสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>หน่วยนับ</th>
                  <th>ยอดคงเหลือ</th>
                  <th colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inventory in inventories" :key="inventory.code">
                  <td>{{ inventory.code }}</td>
                  <td>{{ inventory.name_1 }}</td>
                  <td>{{ inventory.unit_standard }}</td>
                  <td>{{ inventory.balance_qty | adjustdecimal }}</td>
                  <td>
                    <v-btn
                      color="primary"
                      outlined
                      small
                      @click="doSomething(inventory.code)"
                    >
                      <v-icon left> mdi-pencil</v-icon>
                      Edit
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      color="error"
                      outlined
                      small
                      @click="doSomething(inventory.code)"
                    >
                      <v-icon left> mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import CardTitle from "../components/CardTitle";
import _ from "lodash";

export default {
  name: "Inventory",
  components: {
    CardTitle,
  },
  data() {
    return {
      inventories: [],
      keyword: "",
    };
  },
  methods: {
    doSomething(code) {
      console.log(code);
    },
    async searchInventory() {
      await axios
        .get("inventories/search", { params: { keyword: this.keyword } })
        .then((response) => {
          console.log(response.data);
          this.inventories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getInventory() {
      await axios
        .get("inventories")
        .then((response) => {
          console.log(response.data);
          this.inventories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    keyword: {
      handler: _.debounce(function () {
        this.searchInventory();
      }, 1000),
    },
  },
  mounted() {
    this.getInventory();
  },
  filters: {
    adjustdecimal: function (value) {
      return parseFloat(value).toFixed(2);
    },
  },
};
</script>

<style scoped></style>
