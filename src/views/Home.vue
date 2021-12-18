<template>
  <div class="Home">
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="pa-2" outlined tile>
          <apexchart
            type="area"
            height="350"
            width="100%"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="pa-2" outlined tile>
          <apexchart
            type="bar"
            height="350"
            width="100%"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card outlined tile>
          <v-card-title>5 อันดับสินค้าขายดี</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">รหัสสินค้า</th>
                    <th class="text-left">สินค้า</th>
                    <th class="text-left">หน่วยนับ</th>
                    <th class="text-left">จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in topSale" :key="item.item_code">
                    <td>{{ item.item_code }}</td>
                    <td>{{ item.item_name }}</td>
                    <td>{{ item.unit_code }}</td>
                    <td>{{ item.qty }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <br /> -->
    <!-- <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in totalSale" :key="item.name">
            <td>{{ item.doc_date }}</td>
            <td>{{ item.total_amount }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Grand Total</td>
            <td>{{ grandTotal | adjustdecimal }}</td>
          </tr>
        </tfoot>
      </template>
    </v-simple-table> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      totalSale: [],
      topSale: [],
      chartOptions: {
        title: {
          text: "ยอดขายสินค้า",
          align: "left",
        },
        chart: {
          fontFamily: '"Sarabun", sans-serif',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "ยอดขาย",
          data: [],
        },
      ],
    };
  },
  filters: {
    adjustdecimal: function (value) {
      return parseFloat(value).toFixed(2);
    },
  },
  computed: {
    grandTotal: function () {
      return this.totalSale.reduce((acc, ele) => {
        return acc + parseFloat(ele.total_amount);
      }, 0);
    },
    totalamount: function () {
      return;
    },
  },
  methods: {
    async getTopSale() {
      await axios
        .get("trans/topsale")
        .then((response) => {
          console.log(response.data);
          this.topSale = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTotalSale() {
      await axios
        .get("trans/totalsale")
        .then((response) => {
          console.log(response.data);
          this.totalSale = response.data;
          this.series = [
            { data: this.totalSale.map(({ total_amount }) => total_amount) },
          ];
          console.log(this.series);
          this.chartOptions = {
            ...this.chartOptions,
            ...{
              xaxis: {
                categories: this.totalSale.map(({ doc_date }) => doc_date),
              },
            },
          };
          console.log(this.chartOptions.xaxis);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getTotalSale();
    this.getTopSale();
  },
};
</script>
