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
select,input{
    background-color: #e7e7e7;
    margin-bottom: 1rem;
}
input:hover,input:focus,select:hover,select:focus{
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
</style>

<template>
  <div class="main container">
    <div class="p-2">
      <h1 class="m-2">
        Store <span style="font-weight:100;color:black">Management</span>
      </h1>
    </div>
    <div class="row container">
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label
            for="exampleInputEmail1"
            class="form-label mb-0"
          >Select Type:</label>
          <select
            class="form-select"
            id="itemType"
            aria-label="Default select example"
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
          <label
            for="exampleInputEmail1"
            class="form-label mb-0"
          >Select item:</label>
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
      </div>
    </div>
    <div class="row container">
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label
            for="requestedQty"
            class="form-label mb-0"
          >Price:</label>
          <input
            type="text"
            class="form-control"
            id="requestedQty"
            disabled
            aria-describedby="emailHelp"
            v-model="selectedPrice"
          >
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <div class="mb-2">
          <label
            class="form-label mb-0"
          >Available quantity:</label>
          <input
            type="text"
            class="form-control"
            id="units"
            disabled
            v-model="selectedUnits"
          >
        </div>
      </div>
    </div>
    <div class="container p-3">
      <h4>Pending Request</h4>
      <b-table
        dark
        striped
        hover
        :items="requests"
        bordered
        :fields="fields"
      />
      <button class="btn btn-success">
        Approve
      </button>
    </div>
  </div>
</template>

<script>
import { callMQLOpen } from '@/utils/mqlCalls.js'
import MQL from '@/plugins/mql.js'

export default ({
  name: 'Request',
  data () {
    return {
      items: [],
      requests: [],
      currentType: null,
      selectedItem: null,
      selectedPrice: 0,
      selectedUnits: 0,
      addUnits: 0,
      fields: ['empName', 'items', 'remarks', 'requestedQty', 'units', 'specifications']
    }
  },
  mounted () {
    this.GetAllItems()
    this.GetAllRequests()
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
    GetAllRequests () {
      new MQL()
        .setActivity('o.[ReadStoresRequests]')
        .enablePageLoader(true)
        .fetch()
        .then((rs) => {
          console.log(rs)
          let res = rs.getActivity('ReadStoresRequests', true)
          console.log(res)
          this.requests = res.result
          // console.log(formData)
        })
    }
  },
  computed: {
    itemTypes: function () {
      const set = new Set(this.items.map((i) => i.type))
      return [...set]
    }
  },
  watch: {
    currentType: function () {
      const item = this.items.find(
        (i) => i.type === this.currentType && i.itemName === this.selectedItem
      )
      this.selectedPrice = item ? item.price : 0
      this.selectedUnits = item ? item.avaliableUnits : 0
    },
    selectedItem: function () {
      const item = this.items.find(
        (i) => i.type === this.currentType && i.itemName === this.selectedItem
      )
      this.selectedPrice = item ? item.price : 0
      this.selectedUnits = item ? item.avaliableUnits : 0
    }
  }
})

</script>
