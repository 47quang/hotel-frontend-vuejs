<template>
  <div>
    <dash-board-header />
    <!-- <div> -->
      <!-- <el-row :gutter="24"> -->
        <!-- <el-col :span="6" class="step"> -->
          <!-- <div style="height: 300px;">
            <el-steps direction="vertical" :active="1">
              <el-step title="Thông tin cơ bản"></el-step>
              <el-step title="Vị trí"></el-step>
              <el-step title="Chi tiết phòng ở"></el-step>
              <el-step title="Tiện nghi (đánh attributes)"></el-step> 
              <el-step title="Định giá"></el-step> 
              <el-step title="Hình ảnh"></el-step> 
              <el-step title="Hồ sơ chủ nhà"></el-step> 
              <el-step title="Đăng bài"></el-step> 
            </el-steps>
          </div> -->
        <!-- </el-col> -->
        <!-- <el-col :span="18" style="padding: 0 10% 0 0 !important;"> -->
          <router-view />
        <!-- </el-col> -->
      <!-- </el-row> -->
    <!-- </div> -->
    <dashboard-footer />
  </div>
</template>
<script>
import DashBoardHeader from '../Dashboard/DashBoardHeader'
import DashboardFooter from '../Dashboard/DashboardFooter'
export default {
  components: {
    DashBoardHeader,
    DashboardFooter
  }
}
</script>
<style scoped>
.step {
  padding: 50px 0 50px 10% !important;
}
</style>