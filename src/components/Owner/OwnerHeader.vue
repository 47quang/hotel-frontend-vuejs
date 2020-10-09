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
              <el-form ref="form" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="form" >
                <el-form-item prop="username" class="form-item" label="Email"
                :rules="[
                  { required: true, message: 'Email is required'},
                ]">
                  <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form-item" label="Mật Khẩu"
                :rules="[
                  { required: true, message: 'Password is required'},
                ]">
                  <el-input type="password" v-model="form.password" autocomplete="off" @keyup.enter.native="signin('form')"></el-input>
                </el-form-item>
                <el-form-item>
                  <a href="/forget-password">Quên Mật Khẩu</a>
                </el-form-item>
                <el-button type="danger" class="signin-button-form" @click="signin('form')">Đăng Nhập</el-button>
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
              <el-form ref="formSignUp" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="formSignUp">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item prop="firstname" class="form-item" label="Tên"
                    :rules="[
                      { required: true, message: 'First name is required'},
                    ]">
                      <el-input v-model="formSignUp.firstname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="lastname" class="form-item" label="Họ"
                    :rules="[
                      { required: true, message: 'Last name is required'},
                    ]">
                      <el-input v-model="formSignUp.lastname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="username" class="form-item" label="Username"
                    :rules="[
                      { required: true, message: 'Username is required'},
                    ]">
                      <el-input v-model="formSignUp.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" class="form-item" label="Số Điện Thoại"
                    :rules="[
                      { required: true, message: 'Phone is required'},
                    ]">
                      <el-input v-model="formSignUp.phone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="email" class="form-item" label="Email"
                    :rules="[
                      { required: true, message: 'Email is required'},
                    ]">
                      <el-input type="email" v-model="formSignUp.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="form-item" label="Mật Khẩu"
                    :rules="[
                      { required: true, message: 'Password is required'},
                    ]">
                      <el-input type="password" v-model="formSignUp.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="address" class="form-item" label="Địa Chỉ"
                    :rules="[
                      { required: true, message: 'Address is required'},
                    ]">
                      <el-input v-model="formSignUp.address" autocomplete="off" @keyup.enter.native="signup('formSignUp')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-button type="danger" class="signin-button-form" @click="signup('formSignUp')">Tạo tài khoản</el-button>
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
        firstname: '',
        lastname: '',
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
    signup(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$store.dispatch('ownerSignUp', this.formSignUp);
            this.alertSignUpSuccess();
            this.$refs[formName].resetFields();
          }
          catch(err) {
            this.alertErr();
          }
        } else {
          this.alertErr();
        }
      });
    },
    async signin(formName){
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            await this.$store.dispatch("ownerSignIn", this.form);
            this.alertSignInSuccess();
            this.$router.push(`/dashboard/${this.curOwner.id}`);
            this.$refs[formName].resetFields();
          }
          catch(err) {
            this.alertErr();
            this.$refs[formName].resetFields();
          }
        } else {
          this.alertErr();
        }
      });
    },
    alertSignInSuccess() {
      this.$message({
        showClose: true,
        message: "Đăng nhập thành công.",
        type: "success"
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
    alertSignUpSuccess() {
      this.$message({
        showClose: true,
        message: "Đăng ký thành công.",
        type: "success"
      });
    },
  }
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
  align-items: center;
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
@media (max-width: 767px) {
  .signup-dialog {
    width: 98%;
    padding: 0 1%;
  }
  #signup-button-form {
    max-height: 40px;
  }
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
  .signup-dialog {
    width: 90%;
    padding: 0 5%;
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