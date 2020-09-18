<template>
    <div>
        <div class="carousel">
            <h2>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</h2>
            <p>Nhận giá tốt nhất cho >2.000.000 chỗ nghỉ, trên toàn cầu</p>
            <div class="table">
                <div class="search">
                    <el-input
                        class="cus-input"
                        placeholder="Search"
                        suffix-icon="el-icon-search"
                        v-model="search">
                    </el-input>
                </div>
                 <div class="date">
                    <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="TO"
                    start-placeholder="Start date"
                    end-placeholder="End date">
                    </el-date-picker>
                </div>
                <div class="select">
                    <el-select v-model="value" placeholder="Select">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                     <router-link class="button-select" to="/search" >TÌM</router-link>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
  export default {
        data() {
            return {
                search:'',
                date: '',

                options: [{
                value: 'Phòng 1 người',
                label: 'Phòng 1 người'
                }, {
                value: 'Phòng 2 người',
                label: 'Phòng 2 người'
                }, {
                    value: 'Phòng 3 người',
                    label: 'Phòng 3 người'
                }],
                value: ''
            };
        },
        methods:{
            hihi(){
                console.log(this.number)
            }
        }
       
  };
</script>

<style scoped>
    .carousel{
        background-image: url(../assets/carousel.png);
        background-position: bottom center;
        background-size: contain;
        background-color: darkcyan;
        padding-bottom: 45%;
        background-repeat: no-repeat;
        position: relative;
    }
    h2{
        color: white;
        margin: 0;
        padding-top: 30px;
    }
    p{
        font-size: 16px;
        margin: 0;
        color:  white;
        font-weight: 600;
        padding: 10px;
    }
    .table{
        width: 50%;
        margin: 0 auto;
        background-color: rgba(221, 210, 210, 0.5);
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,-50%);
    }
    .search{
        margin: 30px auto 10px auto;
        width: 80%;
        cursor: pointer;
    }
    .date{
        margin: 10px auto;
        width: 80%;
        
    }
    .select{
        display: flex;
        margin: 10px auto;
        width: 80%;
        
    }
    .button-select{
        color: white;
        background-color: #5392f9;
        text-decoration: none;
        width: 30%;
        cursor: pointer;
        font-size: 18px;
        line-height: 75px;
        margin-left: 10px;
        border-radius: 5px;
    }
    .button-select:hover{
        color: white;
        background-color: rgb(83, 146, 249, 0.7);
    }
  
   
    
</style>

<style >
    .select .el-select input{
        height: 80px;
    }
    .select .el-select {
        width: 70%;
    }
    .date .el-date-editor{
        width: 100% !important;
        height: 80px;
    }
     .date .el-date-editor .el-range-separator{
        line-height:70px;
    }
     .cus-input input{
        height: 80px !important;
        
    }
</style>