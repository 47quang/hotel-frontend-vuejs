<template>
  <el-container class="dashboard">
    <el-menu
      mode="horizontal"
      background-color="#1174a6"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">
        <div class="logo">
          <img
            class="agoda-logo"
            srcset="
              //img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png    1x,
              //img.agoda.net/images/agoda-homes/logo/ah-logo-white-2@2x.png 2x
            "
            src="//img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png"
            width="97"
            height="32"
            alt="Agoda"
          />
        </div>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="`/dashboard/${curOwner.id}`"
          ><i class="el-icon-odometer"></i> Tổng quan</router-link
        >
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="`/dashboard/${curOwner.id}/listing`"
          ><i class="el-icon-s-home"></i> Chỗ ở</router-link
        >
      </el-menu-item>
      <el-menu-item index="4"><i class="el-icon-s-promotion"></i> Đơn Hàng Mới</el-menu-item>
      <el-menu-item index="5">
        <router-link :to="`/dashboard/${curOwner.id}/profile`"
          ><i class="el-icon-s-custom"></i> Hồ sơ</router-link
        >
      </el-menu-item>
      <el-menu-item index="6" @click="telegram.dialogVisible = true">
        Telegram
      </el-menu-item>
      <el-menu-item class="user-info">
        <el-avatar
          icon="el-icon-user-solid"
          class="hidden-sm-and-down"
          style="line-height: 32px;"
        ></el-avatar>
        <el-dropdown trigger="click" class="owner-name">
          <span class="el-dropdown-link">
            {{ `${curOwner.lastname} ${curOwner.firstname}`
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="signout">Đăng Xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <el-dialog title="Liên kết Telegram bot" :visible.sync="telegram.dialogVisible" width="15%">
      <div :style="{ width: '60%', margin: '30px auto' }">
        <el-radio-group v-model="telegram.type">
          <el-radio :label="1">Cá nhân</el-radio>
          <el-radio :label="2">Nhóm</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="telegram.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleTelegram">Confirm</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { encrypt } from '../../utils/crypto';

export default {
  data() {
    return {
      telegram: {
        dialogVisible: false,
        type: 1,
      },
    };
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
  },
  methods: {
    signout() {
      this.$store.dispatch('ownerSignOut');
      this.$router.push('/owner');
    },
    handleTelegram() {
      const { iv, content } = encrypt(`${this.curOwner.id}`);
      window.open(`https://t.me/booking_hotel_bot?${this.telegram.type == 1 ? 'start' : 'startgroup'}=${iv}-${content}`, '_blank');
      this.telegram.type = 1;
      this.telegram.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.dashboard {
  width: 100%;
  background-color: #1174a6;
  padding: 0 10%;
}
.el-menu-item i {
  color: #fff !important;
  width: max-content;
}
.menu-item {
  font-size: 16px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.owner-name {
  color: #fff;
  font-size: 16px;
}
.el-menu-item .el-avatar .el-avatar--icon .el-avatar--circle i {
  color: #fff;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
