<style scoped>
h1 {
  display: inline-block !important;
  font-weight: 900;
  color: blue;
}
.row,
.col {
  padding: 0;
  margin: 0;
}
label {
  font-weight: 500;
}
select,
input {
  background-color: #e7e7e7;
  margin-bottom: 1rem;
}
button:hover,
button:focus,
input:hover,
input:focus,
select:hover,
select:focus {
  -webkit-appearance: none;
  box-shadow: none !important;
}
.container {
  background-color: #f8f8f8;
  border-radius: 8px;
}
.ack {
  float: right;
}
td{
  border: 0.1px solid rgb(71, 71, 71);
  padding: 0.5rem;

}
</style>

<template>
  <div class="container">
    <div class="p-2">
      <h1 class="m-2">
        Store <span style="font-weight: 100; color: black">Management</span>
      </h1>
      <router-link to="/acknowledgement"><button class="ack btn btn-dark m-3">Acknowledgement</button></router-link>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="empName" class="form-label mb-0">Employee Name:</label>
            <input type="text" class="form-control" id="empName" />
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="empID" class="form-label mb-0">Employee ID:</label>
            <input type="text" class="form-control" id="empID" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="officeName" class="form-label mb-0">Office Name:</label>
              <select
            id="officeLocations"
            v-model.lazy="officeName"
            class="custom-select"
          >
            <option
              v-for="officeLocation in locations"
              :value="officeLocation.location"
              :key="officeLocation._id"
            >
              {{ officeLocation.location }}
            </option>
          </select>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="reqDate" class="form-label mb-0">Request Date:</label>
            <input type="date" class="form-control" id="reqDate" />
          </div>
        </div>
      </div>
      <div class="row text-center">
        <table class="table table-secondary text-center mt-3">
          <thead class="table-dark">
            <tr>
              <th scope="col">Type of Item</th>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
              <th scope="col">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in pickedItems" :key="idx">
              <td>{{ item.type }}</td>
              <td>{{ item.item }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unit }}</td>
            </tr>
            <tr>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="currentType"
                >
                  <option v-for="type in itemTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="currentItem"
                >
                  <template v-for="(item, idx) in items">
                    <option
                      v-if="item.type === currentType"
                      :value="item.itemName"
                      :key="idx"
                    >
                      {{ item.itemName }}
                    </option>
                  </template>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  id="requestedQty"
                  v-model="itemQuantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  id="units"
                  v-model="itemUnit"
                />
              </td>
            </tr>
            <!-- <tr class="table-light"> -->
            <!-- </tr> -->
          </tbody>
        </table>
        <button class="btn btn-outline-dark btn-sm mb-4 " @click="addItem" style="width:20%">Add item</button>

      </div>
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="specifications" class="form-label mb-0"
              >Material specification if any:</label
            >
            <input type="text" class="form-control" id="specifications" />
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label for="remarks" class="form-label mb-0">Remark if any:</label>
            <input type="text" class="form-control" id="remarks" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary btn-lg mb-5 m-4">Submit</button>
    </div>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'
import { callMQLOpen } from "@/utils/mqlCalls.js";
import ObjectID from "bson-objectid";

export default {
  name: "Home",
  data() {
    return {
      items: [],
      locations: [],
      pickedItems: [],
      types: [],
      currentType: null,
      currentItem: null,
      itemQuantity: 0,
      itemUnit: "",
      id: "",
      empName: "",
      empId: "",
      officeName: "",
      requestDate: "",
      specs: "",
      remark: "",
    };
  },
  mounted() {
    this.GetAllItems();
    this.GetAllLocations()
  },
  methods: {
    async GetAllItems() {
      let res = await callMQLOpen("ReadStoresInventory", {});
      this.items = res;
    },
    SubmitRequest() {
      callMQLOpen("CreateStoresRequests", {
        _id: ObjectID().toHexString(),
        empName: this.empName,
        officeName: this.officeName,
        remarks: this.remark,
        requestDate: this.requestDate,
        specifications: this.specs,
        status: "pending",
        items: this.items,
        acknowledged: false,
      });
    },
    GetAllLocations() {
        new MQL()
        .setActivity("o.[ReadOfficeLocations]")
        .enablePageLoader(false)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("ReadOfficeLocations", true);
          console.log("Printing locations");
          console.log("Location details", res);
          this.locations = res.result;
        });
    },
    addItem() {
      console.log(this.currentItem)
      this.pickedItems.push({
        type: this.currentType,
        item: this.currentItem,
        quantity: this.itemQuantity,
        unit: this.itemUnit,
      });
    },
  },
  computed: {
    itemTypes: function () {
      const set = new Set(this.items.map((i) => i.type));
      return [...set];
    },
  },
};
</script>
