<template>
  <div>
    <!-- Header -->
    <el-header class="navbar">
      <el-menu mode="horizontal" active-text-color="transparent" class="header-menu">
        <el-menu-item class="header-menu-item" index="1">
          <el-image class="navbar-brand" :src="url" />
        </el-menu-item>
        <el-menu-item class="header-menu-item" index="2">
          <el-button-group>
            <el-button id="signin" type="danger" @click="dialogSignInVisible = true">Đăng Nhập</el-button>
            <!-- Popup Sign In -->
            <el-dialog class="signin-dialog" title="Đăng Nhập" :visible.sync="dialogSignInVisible">
              <el-form class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="form" >
                <el-form-item class="form-item" label="Email">
                  <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="Mật Khẩu">
                  <el-input type="password" v-model="form.password" autocomplete="off"  @keyup.enter.native="signin"></el-input>
                </el-form-item>
                <el-form-item>
                  <a href="/forget-password">Quên Mật Khẩu</a>
                </el-form-item>
                <el-button type="danger" class="signin-button-form" @click="signin">Đăng Nhập</el-button>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <strong style="color: #2A2A2E">Bạn chưa có tài khoản?</strong>
                <el-button type="danger" id="signup-button-form" @click="dialogSignInVisible = false; dialogSignUpVisible = true">Tạo tài khoản</el-button>
              </div>
            </el-dialog>
            <!-- End of Pop Up -->
            <el-button id="signup" type="danger" @click="dialogSignUpVisible = true">Tạo Tài Khoản</el-button>
            <!-- Popup Sign Up -->
            <el-dialog class="signin-dialog signup-dialog" title="Tạo Tài Khoản" :visible.sync="dialogSignUpVisible">
              <el-form class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="form">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item  class="form-item" label="Họ Tên">
                      <el-input v-model="formSignUp.fullname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" label="Username">
                      <el-input v-model="formSignUp.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" label="Số Điện Thoại">
                      <el-input v-model="formSignUp.phone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="form-item" label="Email">
                      <el-input type="email" v-model="formSignUp.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" label="Mật Khẩu">
                      <el-input type="password" v-model="formSignUp.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="form-item" label="Địa Chỉ">
                      <el-input v-model="formSignUp.address" autocomplete="off" @keyup.enter.native="signup"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-button type="danger" class="signin-button-form" @click="signup">Tạo tài khoản</el-button>
              </el-form>
              <div slot="footer" class="dialog-footer signup-footer">
                <strong style="color: #2A2A2E">Bạn đã có tài khoản?</strong>
                <el-button type="danger" id="signup-button-form" @click="dialogSignInVisible = true; dialogSignUpVisible = false">Đăng Nhập</el-button>
              </div>
            </el-dialog>
            <!-- End of Pop Up -->
          </el-button-group>
        </el-menu-item>
      </el-menu>
    </el-header>
    <!-- End of Header -->
    <el-container class="register-hotel">
      <el-card class="box-card">
        <div class="text-section-title">Ghi danh khách sạn của bạn trên Agoda</div>
        <div
          class="text-section-description"
        >Độc giả toàn cầu, trọng điểm châu Á. Nhận các đặt phòng bạn đã bỏ lỡ bằng cách ghi danh miễn phí trên Agoda, ngay hôm nay!</div>
        <el-button
          id="startHostingBtn"
          type="danger"
          class="start-hosting-btn btn btn-lg btn-info"
        >Đăng nhà ngay</el-button>
        <div class="sign-in-caption hidden-xs hidden-sm">
          <span class="m-r-1">Bạn đã bắt đầu thủ tục đăng ký rồi à?</span>
          <span
            class="continue-here-text"
            data-element-name="agoda-homes-continue-here-button"
            @click="dialogSignInVisible = true;"
          >Tiếp tục</span>
        </div>
      </el-card>
    </el-container>
   </div> 
</template>

<script>
export default {
  data() {
    return {
      url: "https://cdn5.agoda.net/ycs/dist/images/agoda-logo-2OYtJ.png",
      dialogSignInVisible: false,
      dialogSignUpVisible: false,
      labelPosition: 'top',
      form: {
        username: '',
        password: ''
      },
      formSignUp: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        address: '',
        phone: '', 
        role: 'owner'
      }
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  methods: {
    onChange(event) {
      console.log(event)
    },
    signup(){
      console.log("Sign Up:",this.formSignUp);
      this.$store.dispatch('ownerSignUp', this.formSignUp);
      this.formSignUp.fullname = '';
      this.formSignUp.username = '';
      this.formSignUp.email = '';
      this.formSignUp.password = '';
      this.formSignUp.address = '';
      this.formSignUp.phone = '';
    },
    async signin(){
      try {
        await this.$store.dispatch("ownerSignIn", this.form);
        this.$router.push(`/dashboard/${this.curOwner.id}`);
        this.form.username = '';
        this.form.password = '';
      }
      catch (err){
        console.log(err);
      }
    }
  },
}
</script>


<style scoped>
a {
  color: #1174a6 !important;
  text-decoration: none;
}

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

#signin {
  min-height: 40px !important;
  min-width: 120px;
  padding: 10px;
  font-size: 14px;
  color: #ff567d !important;
  background-color: #fff !important;
  border-color: #ff567d !important;
  margin-top: -5px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 3px;
}

#signup {
  margin-top: -5px;
  min-height: 40px !important;
  min-width: 160px;
  padding: 10px;
  font-size: 14px;
  border-radius: 3px;
}

.signup-dialog {
  width: 70%;
  padding: 0 15%;
}

.signup-footer{
  display: flex;
  justify-content: space-between;
}

/* Register Hotel */
.register-hotel {
  padding: 0 20%;
}

.box-card .sign-in-caption .continue-here-text {
  cursor: pointer;
  border-bottom: 2px solid gray;
}

.m-r-1 {
  margin-right: 4px !important;
}

#startHostingBtn {
  margin: 0 0 20px;
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

.box-card .startHostingBtn {
  padding: 13px 58px;
  margin: 0 0 20px;
  font-size: 24px;
}

.box-card .sign-in-caption {
  font-size: 16px;
  font-weight: 700;
}

/* Responsive */
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
  #signin, #signup {
    padding: 4px;
    min-height: 26px!important;
    min-width: 80px;
    font-size: 10px;
  }
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
}

@media (min-width: 992px) and (max-width: 1199px) {
  .navbar-brand {
    width: 80%;
    height: 60%;
    vertical-align: middle;
  }
  #signin, #signup {
    padding: 4px;
    min-height: 30px!important;
    min-width: 100px;
    font-size: 10px;
  }

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
}

@media (min-width: 1200px) and (max-width: 1319px) {
  #signin, #signup {
    padding: 4px;
    min-height: 32px!important;
    min-width: 120px;
    font-size: 12px;
  }
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