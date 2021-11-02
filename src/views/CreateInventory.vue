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
                <v-text-field
                  dense
                  label="รหัสสินค้า"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
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
                  :items="unit"
                  dense
                  label="หน่วยต้นทุน"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  :items="unit"
                  dense
                  label="หน่วยยอดคงเหลือ"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete
                  :items="vatType"
                  item-text="name"
                  item-value="id"
                  dense
                  label="ประเภทภาษี"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-btn
              v-shortkey="['f12']"
              block
              color="teal"
              dark
              @shortkey="doSomething()"
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
        name: "หน่วยนับเดียว"
      },
      {
        id: 1,
        name: "หลายหน่วยนับ"
      }
    ],
    vatType: [
      {
        id: 0,
        name: "ภาษ๊มูลค่าเพิ่ม"
      },
      {
        id: 1,
        name: "สินค้ายกเว้นภาษี"
      }
    ],
    unit: [],
    valid: true
  }),
  methods: {
    doSomething() {
      console.log(this.unit);
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
    }
  },
  mounted() {
    this.getUnit();
  }
};
</script>

<style scoped></style>
