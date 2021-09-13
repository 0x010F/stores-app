<style scoped>
h1{
    display: inline-block !important;
    font-weight: 900;
    color: blue;
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

</style>

<template>
<div class="main container">
    <div class="p-2">
        <h1 class="m-2">Store <span style="font-weight:100;color:black">Management</span></h1>
        <router-link to="/acknowledgment"><button class="ack btn btn-dark m-3 ">Acknowledgement</button></router-link>
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
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Office Name:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Request Date:</label>
                    <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Select Material:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Quantity:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Unit:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Material specification if any:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Want to add Material:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label mb-0">Remark if any:</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
    </div>
    <div class="text-center"><button class="btn btn-primary btn-lg mb-5 m-4">Submit</button></div>
</div>
</template>

<script>
export default ({
   name:'Home'
})
</script>
