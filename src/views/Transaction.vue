<template>
  <div class="Transaction">
    <v-card>
      <v-col>
        <v-text-field
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
            <th>Trans Flag</th>
            <th>วันที่เอกสาร</th>
            <th>เลขที่เอกสาร</th>
            <th>หมายเหตุ</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="transaction in transactions" :key="transaction.doc_no">
            <td>{{ transaction.trans_flag }}</td>
            <td>{{ transaction.doc_date }}</td>
            <td>{{ transaction.doc_no }}</td>
            <td>{{ transaction.remark }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Transaction",
  data() {
    return {
      transactions: []
    };
  },
  methods: {
    async getTransaction() {
      await axios
        .get("trans")
        .then((response) => {
          console.log(response.data);
          this.transactions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getTransaction();
  }
};
</script>

<style scoped>

</style>