<style scoped>
h1{
    display: inline-block !important;
    font-weight: 900;
    color: blue;
}
h4{
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
    <h4>Acknowledgment</h4>
    <div class="container p-4">
      <table class="table text-center">
        <thead class="table-dark">
          <tr>
            <th scope="col">
              ID
            </th>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Date
            </th>
            <th scope="col">
              Requested item
            </th>
            <th scope="col">
              Unit
            </th>
            <th scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="table-secondary">
          <tr>
            <th scope="row">
              1
            </th>
            <td>Mark</td>
            <td>12/02/2021</td>
            <td>Pen</td>
            <td>5</td>
            <td>
              <button class="btn btn-success">
                Acknowledge
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'Acknowledgment'
})
</script>
