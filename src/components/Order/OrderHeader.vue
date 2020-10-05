<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <el-menu-item index="1">
        <img
          src="https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page.png"
          srcset="https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page.png 1x, https://cdn6.agoda.net/images/MVC/default/agoda-logo-booking-page@2x.png 2x"
          data-element-name="desktop-agoda-header-nolink"
          class="Imagestyled__ImageStyled-nh0bpz-0 kYUYnb HeaderLogostyled__LogoImage-sc-1aet91z-0 cXVDqe"
        />
      </el-menu-item>
      <el-menu-item class="navbar__steps" index="2">
        <!-- <el-steps :space="300" :active="0" finish-status="success" align-center>
          <el-step title="Thông Tin Khách Hàng"></el-step>
          <el-step title="Chi tiết Thanh Toán"></el-step>
          <el-step title="Xác Nhận Đặt Phòng"></el-step>
        </el-steps> -->
      </el-menu-item>
      <el-menu-item index="3">
        <cus-login />
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import CusLogin from '../CusLogin'
export default {
  components: {
    CusLogin
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
.navbar__steps {
  width: 100%;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
    color: transparent;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: transparent;
}

@media (min-width: 992px) {
  .navbar__steps {
    flex-basis: 66.6667%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 66.6667%;
  }
}
@media (min-width: 768px) {
  .navbar__steps {
    flex-basis: 50%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 50%;
  }
}


</style>