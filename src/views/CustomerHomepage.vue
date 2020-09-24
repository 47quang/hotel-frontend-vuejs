<template>
  <div class="cus-homepage">
    <Nav></Nav>
    <Carousel></Carousel>
    <div class="extend" style="display: inline-block">
      <h2>Khám phá thêm nhà thuê du lịch</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <img src="../assets/extend1.jpg" alt="">
            <div class="content">
              Căn hộ <div class="number-room">156.786 chỗ nghỉ</div>
            </div>
            
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content">
           <img src="../assets/extend2.jpg" alt="">
            <div class="content">
              Nhà cho thuê kỳ nghỉ <div class="number-room">517.703 chỗ nghỉ</div>
            </div>
          </div></el-col>
        <el-col :span="6"><div class="grid-content">
          
           <img src="../assets/extend3.jpg" alt="">
            <div class="content">
              Các biệt thự tư nhân <div class="number-room">181.167 chỗ nghỉ</div>
            </div></div></el-col>
        <el-col :span="6"><div class="grid-content">
           <img src="../assets/extend4.jpg" alt="">
            <div class="content">
              Nhà trệt <div class="number-room">8.801 chỗ nghỉ</div>
            </div>
          </div></el-col>
      </el-row>

    </div>
    <Footer></Footer>
  </div>
 
</template>

<script>
import Nav from '../components/CusNavbar'
import Carousel from '../components/CusCarousel'
import Footer from '../components/Footer'
  export default {
    data() {
      return {
       
      };
    },
    components: {
      Nav,
      Carousel,
      Footer
    },
    methods: {
     
    }
  }
</script>

<style scoped>

.content{
  text-align: left;
  padding: 10px;
  font-weight: 600;
}
.content .number-room{
  font-weight: 500;
  padding: 5px 0;
  font-size: 14px;
}
  .grid-content{
    border: 1px solid rgb(221, 223, 226);
    cursor: pointer
  }
  .cus-homepage {
    text-align: center;
  }
  .extend{
    padding: 50px 0;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>