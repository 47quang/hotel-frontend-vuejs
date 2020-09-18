<template>
    <div>
        <el-button class="register" type="text" @click="dialogFormVisible = true">Tạo tài khoản</el-button>

        <el-dialog class="dialog-register"  :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <h2 >Tạo tài khoản</h2>
            <el-form-item label="Họ và tên"  :label-width="formLabelWidth">
              <el-input  v-model="form.fullname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Username" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Mật khẩu" :label-width="formLabelWidth">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Email" :label-width="formLabelWidth">
              <el-input  v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
              <el-input type="phone" v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
              <el-input type="address" v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="modal-register" type="primary" @click="submit()">Tạo tài khoản</el-button>
            <div class="da-co-tai-khoan">
              <p>Bạn đã có tài khoản</p>
              <el-button class="modal-login" type="primary">Đăng nhập</el-button>
            </div>
          </el-form>
          <div class="bg-form">
            <img src="../assets/form.svg" alt="">
          </div>
        </el-dialog>

    </div>
</template>


<script>
export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          fullname: '',
          email: '',
          username: '',
          phone: '',
          address:'',
          password: ''
        },
        formLabelWidth: '120px'
      };
    },
     methods: {
      submit(){
        this.$store.dispatch('register', this.form)
      }
    }
}
</script>
<style scoped >
    h2{
    text-align: left;
    margin:20px 40px;
  }
  .register{
    color: #5392f9;
    background-color:transparent;
    padding: 12px;
    border:1px solid #5392f9;
    font-size: 14px;
    font-weight: 600;
    border-radius: 5px;
    margin: 0 10px;
  }
  .register:hover{
    border:1px solid #5392f9;
  }
  .bg-form{
    background-color: #ecf6ff;
    width: 50%;
    position: relative;
  }
  .bg-form img{
    position: absolute;
    left: 37px;
    top: 50%;
    transform: translateY(-50%)
  }
  .modal-register{
    width: 80%;
    margin: 20px auto 20px;
    
  }
  .da-co-tai-khoan{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
  }
 
</style>

<style>
    .dialog-register .el-dialog__header{
    display:none;
  }
    .dialog-register .el-dialog__footer{
    display:none;
  }
  .dialog-register .el-dialog__body{
    display:flex;
    padding:0;
    height:100%
  }
  .dialog-register .el-dialog{
    height: 100% 
  }
  .dialog-register .el-dialog__body .el-form{
    width: 50% !important;
  }
  .dialog-register .el-dialog__body .el-form .el-form-item__content{
    margin: 0 40px !important
    
  }
  .dialog-register .el-dialog__body .el-form .el-form-item{
    margin: 0 !important;
  }
  .dialog-register .el-dialog__body .el-form .el-form-item .el-form-item__label{
    text-align: left;
    margin: 0 40px;
  }
</style>