<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class=button>
        <router-link class="owner" to="/owner" > Đăng ký cho thuê nhà</router-link>
        <div style="display: inline-block" v-if="!myCustomer.fullname">
          <Login class=login-component></Login>
          <Register class=register-component></Register>
        </div>
        <div style="display: inline-block; font-weight:600" v-else>
            <el-dropdown style="cursor: pointer" trigger="click">
              <span class="el-dropdown-link">
                {{myCustomer.lastname}} {{myCustomer.firstname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="customerUpdate" icon="el-icon-user">Hồ sơ của {{myCustomer.firstname}}</el-dropdown-item>
                <el-dropdown-item icon="el-icon-time">Lịch sử đặt phòng</el-dropdown-item>
                <el-dropdown-item @click.native="signOut" icon="el-icon-switch-button">Đăng xuất</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </div>
</template>

<script>
  import Register from '../components/CusRegister'
  import Login from '../components/CusLogin'
  export default {
    components: {
      Register, Login
    },
    computed:{
      myCustomer(){
        return this.$store.state.myCustomer
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('customerSignOut');
        this.$router.push('/')
      },
      customerUpdate() {
        this.$router.push('/customer-update')
      }
    }
    
  };
</script>

<style scoped>
  .register-component{
    display:inline-block;
  }
  .login-component{
    display:inline-block;
  }
  h2{
    text-align: left;
    margin:20px 40px;
  }
  .nav{
    display: flex;
    justify-content: space-between;
    padding: 20px !important;
  }
  .owner{
    color: #ff567d;
    text-decoration: none;
    border: 1px solid #ff567d;
    line-height: 40px;
    padding: 12px;
    font-weight: 600;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 10px;
  }
  .owner:hover{
    color: white;
    background-color: #ff567d;
    
  }
 
  .nav{
        padding: 20px 0;
  }
 
</style>

<style>
  
</style>

