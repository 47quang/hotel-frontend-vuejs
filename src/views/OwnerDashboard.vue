<template>
  <div>
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
              srcset="//img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png 1x, //img.agoda.net/images/agoda-homes/logo/ah-logo-white-2@2x.png 2x"
              src="//img.agoda.net/images/agoda-homes/logo/ah-logo-white-2.png"
              width="97"
              height="32"
              alt="Agoda"
            />
          </div>
        </el-menu-item>
        <el-menu-item index="2"><i class="el-icon-odometer"> Tổng quan</i></el-menu-item>
        <el-menu-item index="3"><i class="el-icon-s-home"> Chỗ ở</i></el-menu-item>
        <el-menu-item index="4"><i class="el-icon-s-promotion"> Tin nhắn</i></el-menu-item>
        <el-menu-item index="5">
          <router-link  :to="'/dashboard/'+curOwner.id"><i class="el-icon-s-custom"> Hồ sơ</i></router-link>
        </el-menu-item>
        <el-menu-item class="user-info">
          <div>
            <el-avatar icon="el-icon-user-solid" style="line-height: 35px;"></el-avatar>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{curOwner.fullName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-container>

    <!-- Profile of The Owner -->
    <div class="profile">
      <div class="flexcontainer">
        <span style="font-size: 20px;"><b>Xin chào {{curOwner.fullname}}, rất vui khi thấy bạn trở lại!</b></span>
      </div>
      <div class="flexcontainer">
        <span style="font-size: 15px;"><b>Hãy cùng kiếm thêm nhiều khách hàng hôm nay nào.</b></span>
      </div>

      <!-- <el-container class="profile"> -->
      <div>
        <b>
          <span class="profile-title">
            <b>|</b>
          </span> 
          <span class="profile-title-content">Hồ sơ chủ nhà</span>
        </b>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="owner-profile">
              <div>
                <el-avatar icon="el-icon-user-solid" style="line-height: 1.5; width: 80px; height: 80px; font-size: 50px;"></el-avatar>
              </div>
              <span style="font-weight: 700; font-size: 20px;">{{curOwner.fullname}}</span>
              <el-button
                style="color:#1174a6; background-color: white; border: 1px solid #1174a6; min-height: 42px;"
              >Sửa</el-button>
            </div>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'List item ' + o }}
          </div>
        </el-card>
      </div>
        
      <!-- </el-container> -->
    </div>
    


    <div>
      <!-- <div class="flexcontainer">
        <div style="font-size:20px">
          <b>Xin chào {{curOwner.fullname}}, rất vui khi thấy bạn trở lại!</b>
        </div>
      </div>
      <div class="flexcontainer">
        <span>Hãy cùng kiếm thêm nhiều khách hàng hôm nay nào.</span>
      </div>
      <div class="flex-right">
        <div>
          <div>
            <b>
              <span class="profile-title">
                <b>|</b>
              </span> 
              <span class="profile-title-content">Hồ sơ chủ nhà</span>
            </b>
          </div>
          <br />
          <div class="owner-profile">
            <div>
              <el-avatar icon="el-icon-user-solid" style="line-height: 1.5; width: 80px; height: 80px; font-size: 50px;"></el-avatar>
            </div>
            <span style="font-weight: 700; font-size: 20px;">{{curOwner.fullname}}</span>
            <el-button
              style="color:#1174a6; background-color: white; border: 1px solid #1174a6; min-height: 42px;"
            >Sửa</el-button>
          </div>
          <div
            style="border-left: 1px solid grey; border-right: 1px solid grey;border-bottom: 1px solid grey;padding: 20px; text-align:center"
          >
            <span><i class="el-icon-chat-dot-round"></i>Tỷ lệ phản hồi</span>
            <span style="font-size: 30px; color: grey;">|</span>
            <span><i class="el-icon-time"></i>Thời gian trả lời tr.bình</span>
          </div>
        </div>
        <br /> -->

        <!-- <div>
          <div>
            <b>
              <span class="profile-title">
                <b>|</b>
              </span> 
              <span class="profile-title-content">Đánh giá/ Góp ý</span>
            </b>
          </div>
          <br />
          <div style="border: 1px solid black; padding: 20px; font-size:15px">
            <i class="el-icon-guide"></i>
            Hãy cùng Agoda cải thiện công cụ bạn đang dùng
            <br />
            <br />
            <a href>Ý kiến đánh giá</a>
          </div>
        </div> -->
      <!-- </div> -->
    </div>
    <!-- footer -->
    <div class="flex-left footer">
      <div class="logo" style="margin-left:20px; position: relative">
        <img
          src="../assets/logo.png"
          style="position: absolute; top: 50%; transform: translateY(-50%)"
          alt
        />
      </div>
      <div style="font-size:12px; margin-left:100px;">
        Agoda
        <br />Mọi nội dung tại đây © 2005 – 2020 Công ty Agoda Pte. Ltd., giữ toàn quyền.
        <br />Agoda.com là thành viên của Tập đoàn Booking Holdings, nhà cung cấp dịch vụ du lịch trực tuyến &amp; các dịch vụ có liên quan hàng đầu thế giới.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    };
  },
 
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    // idOwner(){
    //   return this.$store.state.curOwner.id;
    // }
  }
};
</script>

<style scoped>
.router-link-active {
  background-color: indianred;
  cursor: pointer;
}
.dashboard {
  /* height: 50px; */
  width: 100%;
  background-color: #1174a6;
  /* border: 1px solid #eee; */
  /* align-items: center; */
  padding: 0 10%;
}
.el-menu-item i {
  color: #fff !important;
  width: max-content;
}
.el-dropdown-link {
  cursor: pointer;
  color: #FFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.profile {
  justify-content: flex-end;
  padding: 0 10%;
  margin-left: 20px;
  margin-top: 20px;
}
.user-info {
  display: flex;
}
.owner-profile {
  border: 1px solid grey; 
  padding: 20px;
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.profile-title {
  color:#1174a6; 
  font-size: 20px;
}
.profile-title-content {
  font-size: 20px; padding-left: 5px;
}
.icon {
  color: white;
}
.flexcontainer {
  margin-left: 20px;
  margin-top: 20px;
  /* padding: 0 10%; */
}
.flex-left {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  padding-bottom: 20px;
  font-size: 10px;
  font-weight: 700;
  border-top: 1px solid #dddfe2;
  background: #fff;
}

.flex-right {
  display: flex;
  flex-direction: column;
  margin-left: 60%;
  margin-right: 20%;
  justify-content: flex-end;
}

.footer {
  padding: 0 10%;
}
</style>