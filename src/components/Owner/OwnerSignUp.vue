<template>
  <div>
    <el-button id="signup" type="danger" @click="openSignUp()">Tạo Tài Khoản</el-button>
    <!-- Popup Sign Up -->
    <el-dialog :modal="false" class="signin-dialog signup-dialog hidden-xs-only" title="Tạo Tài Khoản" :visible.sync="dialogSignUpVisible">
      <el-form ref="formSignUp" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="formSignUp" @submit.native.prevent>
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
        <strong class="footer__content">Bạn đã có tài khoản?</strong>
        <el-button type="danger" id="signin" @click="closeSignUpOpenSignIn()">Đăng Nhập</el-button>
      </div>
    </el-dialog>
    <!-- End of Pop Up -->

    <!-- For small screen -->
    <el-dialog :modal="false" class="signin-dialog signup-dialog hidden-sm-and-up" title="Tạo Tài Khoản" :visible.sync="dialogSignUpVisible">
      <el-form ref="formSignUp" class="signin-dialog-content" :label-position="labelPosition" label-width="100px" :model="formSignUp" @submit.native.prevent>
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
        <el-button type="danger" class="signin-button-form" @click="signup('formSignUp')">Tạo tài khoản</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer signup-footer">
        <strong class="footer__content">Bạn đã có tài khoản?</strong>
        <el-button type="danger" id="signin" @click="closeSignUpOpenSignIn()">Đăng Nhập</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'top',
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
    dialogSignUpVisible: {
      get() {
        return this.$store.state.dialogSignUpVisible;
      },
      set(value) {
        this.$store.commit('CHANGE_DIALOG_SIGN_UP', value);
      }
    },
  },
  methods: {
    openSignUp() {
      this.$store.commit('CHANGE_DIALOG_SIGN_UP', true);
    },
    closeSignUpOpenSignIn() {
      this.$store.commit('CHANGE_DIALOG_SIGN_UP', false);
      this.$store.commit('CHANGE_DIALOG_SIGN_IN', true);
    },
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
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}

a {
  color: #1174a6 !important;
  text-decoration: none;
}
#signin {
  min-height: 40px;
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
  min-height: 40px;
  min-width: 160px;
  padding: 10px;
  font-size: 14px;
  border-radius: 3px;
}
.signup-dialog {
  width: 70%;
  padding: 0 15%;
}
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}
.signin-dialog-content {
  padding: 0 30px;
}
.signin-button-form {
  width: 100%;
}
</style>