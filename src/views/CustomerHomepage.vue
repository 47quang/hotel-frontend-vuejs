<template>
  <div>
    <Nav></Nav>
    <Carousel></Carousel>
    <div class="extend">
      <h2>Khám phá thêm nhà thuê du lịch</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <img src="../assets/extend1.jpg" alt="">
            <div class="content">
              Căn hộ
            </div>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content">
           <img src="../assets/extend2.jpg" alt="">
            <div class="content">
              Nhà cho thuê kỳ nghỉ
            </div>
          </div></el-col>
        <el-col :span="6"><div class="grid-content">
          
           <img src="../assets/extend3.jpg" alt="">
            <div class="content">
              Các biệt thự tư nhân
            </div></div></el-col>
        <el-col :span="6"><div class="grid-content">
           <img src="../assets/extend4.jpg" alt="">
            <div class="content">
              Nhà trệt
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