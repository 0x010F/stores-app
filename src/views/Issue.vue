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
    margin-top: 2rem;
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
        <h1 class="m-2">Store <span style="font-weight:100;color:black">Management</span></h1>
        <h5 class="m-2">Stock Replenishment</h5>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Employee Name:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Employee ID:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Issue Date:</label>
                    <input type="Date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
    </div>
    <div class="container p-4">
    <h3 class="p-0">Issue Items</h3>
        <table class="table text-center">
            <thead  class="table-dark">
                <tr>
                    <th scope="col">Material Description</th>
                    <th scope="col">Request ID</th>
                    <th scope="col">Issue Qty.</th>
                </tr>
            </thead>
            <tbody class="table-secondary">
                <tr>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                </tr>
                <tr>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                </tr>
                <tr>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                    <td><input type="text" class="form-control table-inp"/></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="container">
        <div class="row">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Remark:</label>
                    <textarea class="form-control" rows="3"></textarea>
                </div>
        </div>
    </div>
    <div class="text-center"><button class="btn btn-primary btn-lg  m-4">Submit</button></div>
</div>
</template>

<script>
export default ({
   name:'Issue'
})
</script>
