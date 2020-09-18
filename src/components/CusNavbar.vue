<<<<<<< HEAD
<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class=button>
        <router-link class="owner" to="/owner" > Đăng ký cho thuê nhà</router-link>
        <div style="display: inline-block" v-if="!fullName">
          <Login class=login-component></Login>
          <Register class=register-component></Register>
        </div>
        <div style="display: inline-block" v-else>
          {{fullName}}
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
      fullName(){
        console.log('alo', this.$store.state.myCustomer.fullname)
        return this.$store.state.myCustomer.fullname
      }
    },
    
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

=======
<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class=button>
        <router-link class="owner" to="/owner" > Đăng ký cho thuê nhà</router-link>
        <button class="login">Đăng nhập</button>
        <button class="register">Tạo tài khoản</button>
      </div>
    </div>
</template>

<style scoped>
     .nav{
    display: flex;
    justify-content: space-between;
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
  .login{
    color: #5392f9;
    background-color:transparent;
    padding: 12px;
    border:none;
    font-size: 14px;
    font-weight: 600;
    margin: 0 10px;
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
    .nav{
        padding: 20px 0;
    }
</style>
>>>>>>> 4ae9ce7... feat: Dashboard of Owners
