<template>
  <div class="Home">
    <v-row>
      <v-col sm="6" md="3" cols="12">
        <v-card elevation="2">
          <v-card-title>รายได้</v-card-title>
          <v-card-text class="d-flex">
            <h2>13k</h2>
            <span class="success--text"> +38%</span>
          </v-card-text>
          <v-card-text>
            <span>
              <v-chip small outlined> Year of 2021 </v-chip>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="3" cols="12">
        <v-card elevation="2">
          <v-card-title>ค่าใช้จ่าย</v-card-title>
          <v-card-text class="d-flex">
            <h2>13k</h2>
            <span class="error--text"> +38%</span>
          </v-card-text>
          <v-card-text>
            <span>
              <v-chip small outlined> Year of 2021 </v-chip>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="6" cols="12">
        <v-card elevation="2">
          <v-card-title>สถิติ</v-card-title>
          <v-card-subtitle>
            <span class="font-weight-semibold text--primary me-1"
              >Total 48.5% growth</span
            >
            <span>😎 this month</span>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col sm="4" cols="6" class="d-flex align-center">
                <v-avatar rounded color="primary">
                  <span class="theme--dark white--text">
                    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"
                      />
                    </svg>
                  </span>
                </v-avatar>
                <div class="ms-3">
                  <p class="mb-0">Sales</p>
                  <h3 class="text-xl font-weight-bold">245k</h3>
                </div>
              </v-col>
              <v-col sm="4" cols="6" class="d-flex align-center">
                <v-avatar rounded color="warning">
                  <span class="theme--dark white--text">
                    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </svg>
                  </span>
                </v-avatar>
                <div class="ms-3">
                  <p class="mb-0">ลูกค้า</p>
                  <h3 class="text-xl font-weight-bold">12.5k</h3>
                </div>
              </v-col>
              <v-col sm="4" cols="6" class="d-flex align-center">
                <v-avatar rounded color="success">
                  <span class="theme--dark white--text">
                    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3M8.2 8V15.1L10.3 13L14.1 16.9L17 14L13.2 10.1L15.3 8H8.2Z"
                      />
                    </svg>
                  </span>
                </v-avatar>
                <div class="ms-3">
                  <p class="mb-0">สินค้า</p>
                  <h3 class="text-xl font-weight-bold">1.54k</h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card elevation="2" class="pa-2" outlined>
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
        <v-card elevation="2" class="pa-2" outlined>
          <apexchart
            type="pie"
            height="350"
            width="100%"
            :options="chartOptions2"
            :series="series2"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card elevation="2" outlined>
          <v-card-title>5 อันดับสินค้าขายดี</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <!-- <th class="text-center">#</th> -->
                    <th class="text-left">รหัสสินค้า</th>
                    <th class="text-left">สินค้า</th>
                    <th class="text-left">หน่วยนับ</th>
                    <th class="text-left">จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in topSale" :key="item.item_code">
                    <!-- <td><img src="@/assets/ranking.png" alt="" width="30px"></td> -->
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
      chartOptions2: {
        title: {
          text: "ยอดขายตามสินค้าหมวดหมู่",
          align: "left",
        },
        chart: {
          fontFamily: '"Sarabun", sans-serif',
          type: "pie",
        },
        labels: ["ขนม", "น้ำดื่ม", "เครื่องดื่ม", "อาหาร"],
      },
      series2: [44, 55, 41, 17],
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
