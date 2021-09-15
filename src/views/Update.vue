<style scoped>
h1 {
  display: inline-block !important;
  font-weight: 900;
  color: blue;
}
h3 {
  padding: 0 24px;
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
input:hover,
input:focus,
select:hover,
select:focus {
  -webkit-appearance: none;
  box-shadow: none !important;
}
.main {
  background-color: #f8f8f8;
  border-radius: 8px;
}
.ack {
  float: right;
}
button {
  margin: 0 0.3rem;
}
</style>

<template>
<div class="main">
  <div class=" container">
    <div class="p-2">
      <h1 class="m-2">
        Store <span style="font-weight: 100; color: black">Replinishment</span>
      </h1>
    </div>
    <div class="row container">
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label for="exampleInputEmail1" class="form-label mb-0"
            >Select Type:</label
          >
          <select
            class="form-select"
            id="itemType"
            aria-label="Default select example"
            v-model="currentType"
          >
            <option v-for="type in itemTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label for="exampleInputEmail1" class="form-label mb-0"
            >Select item:</label
          >
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="selectedItem"
          >
            <template v-for="item in items">
              <option
                v-if="item.type === currentType"
                :value="item.itemName"
                :key="item._id"
              >
                {{ item.itemName }}
              </option>
            </template>
          </select>
        </div>
        <div class="mb-2">
          <button
            class="btn btn-sm btn-outline-dark"
            type="button"
            @click="showAddItem = !showAddItem"
          >
            Add Item
          </button>
          <div v-if="showAddItem" class="optional">
            <form @submit.prevent="CreateNewItems">
              <input
                class="form-control add-form add-form-list"
                type="text"
                v-model="newItem"
              /><button class="btn btn-sm btn-danger m-1 ml-1" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row container">
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label for="requestedQty" class="form-label mb-0">Price:</label>
          <input
            type="text"
            class="form-control"
            id="requestedQty"
            aria-describedby="emailHelp"
            v-model="selectedPrice"
          />
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label for="units" class="form-label mb-0">Available quantity:</label>
          <input
            type="text"
            class="form-control"
            id="units"
            aria-describedby="emailHelp"
            disabled
            v-model="selectedUnits"
          />
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label for="units-add" class="form-label mb-0">Quantity to add:</label>
          <input
            type="text"
            class="form-control"
            id="units-add"
            v-model="addUnits"
          />
        </div>
      </div>
    </div>
    <div class="text-center p-4">
      <button class="btn btn-danger" @click="UpdateStores">Update</button>
    </div>
  </div>
  <div class="text-center p-4">
    <button class="btn btn-danger" @click="UpdateStores">Update</button>
  </div>
</div>
</template>

<script>
import { callMQLOpen } from "@/utils/mqlCalls.js";
import MQL from "@/plugins/mql.js";
import ObjectID from "bson-objectid";

export default {
  name: "Request",
  data() {
    return {
      items: [],
      currentType: null,
      selectedItem: null,
      selectedPrice: 0,
      selectedUnits: 0,
      addUnits: 0,
      showAddItem: false,
      newItem: ''
    };
  },
  mounted() {
    this.GetAllItems();
  },
  methods: {
    handleTypeChange(e) {
      this.currentType = e.target.value;
    },

    handleItemChange(e) {
      console.log(e.target.value);
      this.selectedItem = e.target.value;
    },

    async GetAllItems() {
      let res = await callMQLOpen("ReadStoresInventory", {});
      this.items = res;
      console.log(this.items);
    },
    CreateNewItems() {
      new MQL()
        .setActivity("o.[CreateStoresInventory]")
        .setData("CreateStoresInventory", {
          itemName: this.newItem,
          _id: ObjectID().toHexString(),
          avaliableUnits: 0,
          itemName: this.newItem,
          price: 0,
          type: this.currentType,
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch()
        .then((rs) => {
          this.items.push({
            _id: rs.getActivity("CreateStoresInventory").result.objectId,
            itemName: this.newItem,
          });
        });
    },
    async UpdateStores() {
      const item = this.items.find(
        (i) => i.type === this.currentType && i.itemName === this.selectedItem
      );
      // const response = await callMQLOpen("UpdateStoresInventory", {
      //   id: item._id,
      //   avaliableUnits: this.selectedUnits,
      //   itemName: this.selectedItem,
      //   price: this.selectedPrice,
      //   type: this.currentType,
      // });
      // console.log(response)
      console.log(
        this.selectedUnits,
        this.selectedItem,
        this.selectedPrice,
        this.currentType
      );
      new MQL()
        .setActivity("o.[UpdateStoresInventory]")
        .setData({
          id: item._id,
          avaliableUnits:
            parseInt(this.selectedUnits, 10) + parseInt(this.addUnits, 10),
          itemName: this.selectedItem,
          price: parseInt(this.selectedPrice, 10),
          type: this.currentType,
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch("a11")
        .then((res) => {
          console.log(res);
          // let r = res.getRaw(true)
          console.log(res.isValid());
        });
    },
  },
  computed: {
    itemTypes: function () {
      const set = new Set(this.items.map((i) => i.type));
      return [...set];
    },
  },
  watch: {
    currentType: function () {
      const item = this.items.find(
        (i) => i.type === this.currentType && i.itemName === this.selectedItem
      );
      this.selectedPrice = item ? item.price : 0;
      this.selectedUnits = item ? item.avaliableUnits : 0;
    },
    selectedItem: function () {
      const item = this.items.find(
        (i) => i.type === this.currentType && i.itemName === this.selectedItem
      );
      this.selectedPrice = item ? item.price : 0;
      this.selectedUnits = item ? item.avaliableUnits : 0;
    },
  },
};
</script>
