<template>
  <div class="CreateInventory">
    <v-form v-model="valid">
      <v-container>
        <v-card>
          <v-card-title>
            <div class="">สินค้า</div>
          </v-card-title>
          <v-card-subtitle> เพิ่มรายการสินค้า</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <div class="d-flex">
                  <v-combobox
                    v-model="formData.code"
                    dense
                    label="รหัสสินค้า"
                    outlined
                    required
                  ></v-combobox>
                </div>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="formData.name_1"
                  dense
                  label="ชื่อสินค้า"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="formData.unit_type"
                  :items="unitType"
                  dense
                  item-text="name"
                  item-value="id"
                  label="ประเภทหน่วยนับ"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="formData.unit_cost"
                  :items="unit"
                  dense
                  label="หน่วยต้นทุน"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="formData.unit_standard"
                  :items="unit"
                  dense
                  label="หน่วยยอดคงเหลือ"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="formData.tax_type"
                  :items="vatType"
                  dense
                  item-text="name"
                  item-value="id"
                  label="ประเภทภาษี"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XX</td>
                    <td>XX</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-btn
              v-shortkey="['f12']"
              block
              color="teal"
              dark
              @click="submit()"
              @shortkey="submit()"
            >
              เพิ่มสินค้า (F12)
            </v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateInventory",
  data: () => ({
    unitType: [
      {
        id: 0,
        name: "หน่วยนับเดียว",
      },
      {
        id: 1,
        name: "หลายหน่วยนับ",
      },
    ],
    vatType: [
      {
        id: 0,
        name: "ภาษีมูลค่าเพิ่ม",
      },
      {
        id: 1,
        name: "สินค้ายกเว้นภาษี",
      },
    ],
    unit: [],
    productCodeFormat: [],
    valid: true,
    formData: {
      code: "",
      name_1: "",
      tax_type: "",
      unit_type: "",
      unit_cost: "",
      unit_standard: "",
    },
  }),
  methods: {
    getProductCode() {
      this.formData.code = "IX-0008";
    },
    doSomething() {
      console.log(this.unit);
    },
    submit() {
      console.log("Submit");
      this.valid = true;
      if (this.valid) {
        axios
          .post("inventories", this.formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async getUnit() {
      await axios
        .get("units")
        .then((response) => {
          console.log(response.data);
          this.unit = Object.keys(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getProductCodeFormat() {
      await axios
        .get("inventories/productcodeformat")
        .then((response) => {
          console.log(response.data);
          this.productCodeFormat = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getProductCodeFormat();
    this.getUnit();
  },
};
</script>

<style scoped></style>
