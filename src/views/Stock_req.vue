<style scoped>
h1{
    display: inline-block !important;
    font-weight: 900;
    color: blue;
}
h3{
    padding: 0 24px;
}
.row,.col{
    padding: 0;
    margin: 0;
}
label{
    font-weight: 500;
}
select,input,textarea{
    background-color: #e7e7e7;
    margin-bottom: 1rem;
}
input:hover,input:focus,select:hover,select:focus,textarea:hover,textarea:focus{
    -webkit-appearance:none;
    box-shadow: none !important;
}
.main{
    background-color: #f8f8f8;
    border-radius: 8px;
}
.ack{
    float: right;
}
button{
    margin: 0 0.3rem;
}
.table-inp{
    margin: 0;
}
td{
    border: 1px solid rgb(48, 48, 48);
}
</style>

<template>
  <div class="main container">
    <div class="p-2">
      <h1 class="m-2">
        Store <span style="font-weight:100;color:black">Management</span>
      </h1>
      <h5 class="m-2">
        Stock Replenishment
      </h5>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label
              class="form-label mb-0"
            >Vendor Name:</label>
            <input
              type="text"
              class="form-control"
              v-model="vendorName"
            >
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <label
              class="form-label mb-0"
            >Replinishment Date:</label>
            <input
              type="date"
              class="form-control"
              v-model.lazy="replinishmentDate"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <select
              class="form-select"
              @change="handleTypeChange"
              v-model="currentType"
            >
              <option
                v-for="type in itemTypes"
                :key="type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div class="mb-2">
            <select
              class="form-select"
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
        </div>
      </div>
      <div class="container p-4">
        <h3 class="p-0">
          Acknowledgment
        </h3>
        <table class="table table-secondary text-center mt-3">
          <thead class="table-dark">
            <tr>
              <th scope="col">
                Item Description
              </th>
              <th scope="col">
                Qty
              </th>
              <th scope="col">
                Units
              </th>
              <th scope="col">
                Specification, if any
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="itemDescription"
                >
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="quantity"
                >
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="units"
                >
              </td>
              <td>
                <input
                  type="text"
                  class="form-control table-inp"
                  v-model="specification"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center">
        <button
          class="btn btn-success btn-lg  m-4"
          @click="CreateBills"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { callMQLOpen } from '@/utils/mqlCalls.js'
import ObjectID from 'bson-objectid'
import MQL from '@/plugins/mql.js'

export default ({
  name: 'StockReq',
  data () {
    return {
      items: [],
      types: ['Stationary', 'Pantry'],
      currentType: 'Pantry',
      billID: '',
      billURL: '',
      itemDescription: '',
      quantity: null,
      replinishmentDate: '',
      specification: '',
      units: '',
      vendorName: '',
      type: '',
      itemName: '',
      selectedItem: null

    }
  },
  mounted () {
    this.GetAllItems()
  },
  methods: {
    handleTypeChange (e) {
      this.currentType = e.target.value
    },
    handleItemChange (e) {
      console.log(e.target.value)
      this.selectedItem = e.target.value
    },
    async GetAllItems () {
      let res = await callMQLOpen('ReadStoresInventory', {})
      this.items = res
    },
    CreateBills () {
      // const item = this.items.find(
      //   (i) => i.type === this.currentType && i.itemName === this.selectedItem
      // )
      new MQL()
        .setActivity('o.[CreateStoresBills]')
        .setData({
          '_id': ObjectID().toHexString,
          'itemDescription': this.itemDescription,
          'quantity': parseInt(this.quantity, 10),
          'replinishmentDate': this.replinishmentDate,
          'specification': this.specification,
          'units': this.units,
          'vendorName': this.vendorName,
          'type': this.currentType,
          'itemName': this.selectedItem
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch('a11')
        .then((res) => {
          console.log(res)
          if (res.isValid()) {
            console.log(res.isValid())
            this.$toasted.success('Bill Saved.', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          } else {
            res.showErrorToast()
          }
        })
    }
  },
  computed: {
    itemTypes: function () {
      const set = new Set(this.items.map((i) => i.type))
      return [...set]
    }
  }
})
</script>
