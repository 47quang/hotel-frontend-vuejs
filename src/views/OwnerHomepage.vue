<template>
  <div class="owner-homepage">
    <el-header class="navbar">
      <el-menu mode="horizontal" active-text-color="transparent" class="header-menu">
        <el-menu-item class="header-menu-item" index="1">
          <el-image :src="url" />
        </el-menu-item>
        <el-menu-item class="header-menu-item" index="2">
          <el-button-group class="owner-actions">
            <el-button id="signin" type="danger">Đăng Nhập</el-button>
            <el-button id="signup" type="danger">Tạo Tài Khoản</el-button>
          </el-button-group>
        </el-menu-item>
      </el-menu>
    </el-header>
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
          >Tiếp tục</span>
        </div>
      </el-card>
    </el-container>
    <el-container class="carousel-info">
      <el-carousel :interval="4000" type="card" height="700px" style="width: 100%">
        <el-carousel-item v-for="item in info" :key="item.content">
          <el-image style="width: 420px; height: 360px; background-color: #fff" :src="item.url"></el-image>

          <div class="info">
            <h3 class="info-title">{{ item.title }}</h3>
            <h3 class="info-content">{{ item.content }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-container>
    <el-container class="instruct">
      <div style="padding: 0 20%">
        <h1 class="instruct-title">Tất cả những gì bạn cần làm là</h1>
        <el-row :gutter="20">
          <el-col :span="6" v-for="instruct in instructions" :key="instruct.content">
            <el-image
              style="width: 120px; height: 120px; background-color: #fff"
              :src="instruct.url"
            ></el-image>
            <div class="instruct-content">{{instruct.content}}</div>
          </el-col>
        </el-row>
      </div>
    </el-container>
    <el-footer>
      <el-container class="footer">
        <p>Mọi nội dung tại đây © 2005 – 2020 Công ty Agoda Pte. Ltd., giữ toàn quyền.</p>
        <p>Agoda.com là thành viên của Tập đoàn Booking Holdings, nhà cung cấp dịch vụ du lịch trực tuyến &amp; các dịch vụ có liên quan hàng đầu thế giới.</p>
        <ul class="pg-brand-list hidden-sm hidden-xs">
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-01"></i>
          </li>
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-02"></i>
          </li>
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-03"></i>
          </li>
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-04"></i>
          </li>
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-05"></i>
          </li>
          <li class="pg-brand-list-item">
            <i class="pg-brand pg-brand-06"></i>
          </li>
        </ul>
      </el-container>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "https://cdn5.agoda.net/ycs/dist/images/agoda-logo-2OYtJ.png",
      info: [
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-1-__Sw-.png",
          title:
            "Điền vào chỗ trống trong lịch đặt phòng của quý đối tác - nhanh chóng.",
          content:
            "Agoda tiếp cận 2,3 triệu du khách từ 65 quốc gia. Chúng tôi có khả năng tiếp cận mà các nền tảng khác không có, và mang lại các đặt phòng mà các nền tảng khác không thể mang lại."
        },
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-2-3Nlre.png",
          title:
            "Quý đối tác thích tiền không? Chúng tôi sẽ không lấy tiền của quý đối tác.",
          content:
            "Đăng ký miễn phí, ghi danh chỗ nghỉ miễn phí, và tất cả các công cụ để giúp bạn quản lý chỗ nghỉ của mình đều miễn phí. Đơn giản là ghi danh chỗ nghỉ của bạn, định giá hằng đêm bạn muốn thu, sau đó ngồi xuống, thư giãn và xem lượng đặt phòng chảy về!"
        },
        {
          url: "https://cdn5.agoda.net/ycs/dist/images/carousel-3-1V-vN.png",
          title:
            "Tất cả những điều tuyệt vời quý đối tác muốn có từ một nền tảng.",
          content:
            "Chúng tôi để quý đối tác liên lạc với khách, quản lý đặt phòng từ thiết bị di động, và đồng bộ hóa lịch trên các nền tảng. Cộng với hỗ trợ trực tuyến bằng nhiều ngôn ngữ."
        }
      ],
      instructions: [
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/sign-in-sign-up@2x.png",
          content: "Đăng nhập hoặc đăng ký tài khoản Agoda"
        },
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/upload-details.png",
          content: "Đăng tải hình ảnh và thông tin về nơi ở"
        },
        {
          url:
            "https://img.agoda.net/images/nha_host_marketing/set-prices@2x.png",
          content: "Cài đặt mức giá và chọn ngày có phòng trống"
        },
        {
          url: "https://img.agoda.net/images/nha_host_marketing/go-live@2x.png",
          content: "Xem căn hộ của bạn được quảng bá đến hàng triệu du khách"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scope>
.el-container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px !important;
  padding-right: 15px !important;
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
}

.navbar .header-menu .header-menu-item {
  background-color: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: transparent !important;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
}
.owner-actions {
  /* margin-left: 1200px;  */
  /* cần fix chỗ này*/
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
.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
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
  margin: 100px;
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

/* Carousel Info*/
.carousel-info {
  background: linear-gradient(90deg, #ffc7d4, #ffddd8);
  padding: 40px 0;
}

.el-carousel__item {
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin: 0 20px;
  border-radius: 3px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  white-space: normal;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 40px;
}

.info .info-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
}

.info .info-content {
  padding-top: 20px;
  font-size: 20px;
  line-height: 36px;
  font-weight: 600;
}

/* Instructions */
.instruct {
  text-align: center;
  padding: 80px 0;
}
.instruct .instruct-content {
  font-size: 16px;
  font-weight: 700;
}

.instruct .instruct-title {
  color: #2a2a2e;
  margin-top: 0;
  margin-bottom: 20px;
}
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* Footer */
.el-footer {
  padding: 0 !important;
}
.footer {
  background-color: #333;
  padding: 50px 0;
  color: #999;
  text-align: center;
  line-height: 16px;
}

.footer .pg-brand-list {
    margin: 35px auto 0;
    zoom: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.footer .pg-brand {
    background-image: url(//cdn5.agoda.net/ycs/dist/images/bg-sprite-icons_v30-3EyHO.png);
    background-repeat: no-repeat;
    background-size: 480px 1264px;
    display: inline-block;
}

p {
  margin: 0 0 10px;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>