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