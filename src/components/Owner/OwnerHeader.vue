<template>
  <div>
    <!-- Header -->
    <el-header class="navbar">
      <el-menu mode="horizontal" active-text-color="transparent" class="header-menu">
        <el-menu-item class="header-menu-item" index="1">
          <el-image class="navbar-brand" :src="url" />
        </el-menu-item>
        <el-button-group class="navbar__action">
          <owner-sign-in/>
          <owner-sign-up/>
        </el-button-group>
      </el-menu>
    </el-header>
    <!-- End of Header -->
    <el-container class="register-hotel">
      <el-card class="box-card">
        <div class="text-section-title">Ghi danh khách sạn của bạn trên Agoda</div>
        <div
          class="text-section-description"
        >Độc giả toàn cầu, trọng điểm châu Á. Nhận các đặt phòng bạn đã bỏ lỡ bằng cách ghi danh miễn phí trên Agoda, ngay hôm nay!</div>
        <!-- Register Hotel -->
        <owner-register-hotel/>
        <div class="sign-in-caption hidden-xs hidden-sm">
          <span class="m-r-1">Bạn đã bắt đầu thủ tục đăng ký rồi à?</span>
          <!-- Continue to Sign In -->
          <owner-continue-sign-in/>
        </div>
      </el-card>
    </el-container>
   </div> 
</template>

<script>
import OwnerSignIn from '@/components/Owner/OwnerSignIn'
import OwnerSignUp from '@/components/Owner/OwnerSignUp'
import OwnerContinueSignIn from '@/components/Owner/OwnerContinueSignIn'
import OwnerRegisterHotel from '@/components/Owner/OwnerRegisterHotel'
export default {
  data() {
    return {
      url: "https://cdn5.agoda.net/ycs/dist/images/agoda-logo-2OYtJ.png",
    }
  },
  components: {
    OwnerSignIn,
    OwnerSignUp,
    OwnerContinueSignIn,
    OwnerRegisterHotel
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
}
</script>
<style scoped>
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  background-color: hsla(0, 0%, 100%, 0.1) !important;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.54),
    rgba(0, 0, 0, 0.3)
  );
  
}
.navbar .header-menu {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  padding: 0 20%;
}

.navbar .header-menu::before {
  content: none;
}
.navbar .header-menu::after {
  content: none;
}
.navbar .header-menu .header-menu-item {
  background-color: transparent;
  padding: 0px;
}
.el-menu.el-menu--horizontal {
  border-bottom: transparent !important;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
}

/* Register Hotel */
.register-hotel {
  padding: 0 20%;
}
.m-r-1 {
  margin-right: 4px !important;
}

.register-hotel {
  background-image: linear-gradient(
      270deg,
      rgba(51, 51, 51, 0),
      rgba(0, 0, 0, 0.6)
    ),
    url(//img.agoda.net/images/agoda-homes/aquisition/agoda_homes_marketing_image.jpg);
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: cover;
  background-position-y: 30%;
  height: 534px;
}

.box-card {
  width: max-content;
  padding: 40px;
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  margin: 100px 0;
}

.box-card .text-section-title {
  font-size: 40px;
  margin: 0 0 10px;
  font-weight: 700;
}

.box-card .text-section-description {
  width: 520px;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 20px;
}



.box-card .sign-in-caption {
  font-size: 16px;
  font-weight: 700;
}
.navbar__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive */
@media (max-width: 767px) {
  /* .signup-dialog {
    width: 98%;
    padding: 0 1%;
  }
  #signup-button-form {
    max-height: 40px;
  } */
}
@media (min-width: 992px){
  .register-hotel{
    height: 534px;
  }
}
@media (min-width: 1200px) {
  .navbar-brand {
    padding-top: 8px;
  }
}
@media (min-width: 768px) and (max-width: 991px){
  .navbar-brand {
    width: 60%;
    height: 40%;
    vertical-align: middle;
  }
  /* #signin, #signup {
    padding: 4px;
    min-height: 26px!important;
    min-width: 80px;
    font-size: 10px;
  } */
  .box-card {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 20px;
    border-radius: 3px;
    background-color: hsla(0,0%,100%,.9);
    
  }
  .box-card .text-section-title {
    font-size: 28px;
  }
  .box-card .text-section-description {
    font-size: 18px;
    width: 90%;
  }
  .signup-dialog {
    width: 90%;
    padding: 0 5%;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .navbar-brand {
    width: 80%;
    height: 60%;
    vertical-align: middle;
  }
  /* #signin, #signup {
    padding: 4px;
    min-height: 30px!important;
    min-width: 100px;
    font-size: 10px;
  } */

  .box-card {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    padding: 20px;
    border-radius: 3px;
    background-color: hsla(0,0%,100%,.9);
  }

  .box-card .text-section-title {
    font-size: 35px;
    margin: 0 0 10px;
  }
  .box-card .text-section-description {
    width: 520px;
    font-size: 18px;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  /* .signup-dialog {
    width: 90%;
    padding: 0 5%;
  } */
}

@media (min-width: 1200px) and (max-width: 1319px) {
  .box-card .text-section-title {
    font-size: 32px;
  }
  .box-card .text-section-description {
    font-size: 20px;
  }
}

@media (min-width: 1320px) and (max-width: 1480px) {
  .box-card .text-section-title {
    font-size: 35px;
  }
}
</style>