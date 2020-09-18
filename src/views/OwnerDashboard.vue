<template>
  <div>
    <el-container style="height: 50px; width: 100%; background-color: #1174a6; border: 1px solid #eee; align-items:center;">
      <div class="logo">
        <img src="../assets/logo.png" alt="" > 
      </div>
      <h1 style="color: white">|</h1>
      <div class="icon">
        <i class="el-icon-mobile" style="margin-left: 20px"> Tổng quan</i>
        <i class="el-icon-house" style="margin-left: 20px"> Chỗ ở</i>
        <i class="el-icon-chat-dot-round" style="margin-left: 20px"> Tin nhắn</i>
        <i class="el-icon-user" style="margin-left: 20px"> Hồ sơ</i>
      </div>
      <select style="background-color: #1174a6; color: white; border:#1174a6; margin-left: 40%">
        <option value="0">Support</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
      </select>
      <h1 style="color: white">|</h1>
       <div>
        <img src="../assets/logo.png" alt="" > 
      </div>
      <div>
        <img src="../assets/logo.png" alt="" > 
      </div>
      <select style="background-color: #1174a6; color: white; border:#1174a6">
        <option value="0">(name)</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
      </select>
    </el-container>
    <div>
    <div  class="flexcontainer">
      <div style="font-size:20px"><b>Xin chào ..., rất vui khi thấy bạn trở lại!</b></div>
    </div>
    <div class="flexcontainer">
      <span>Hãy cùng kiếm thêm nhiều khách hàng hôm nay nào.</span>
    </div>
    <div class="flex-right" >
      <div>
        <div ><b><span style="color:#1174a6"><b>|</b></span> Hồ sơ chủ nhà</b></div>
        <br>
        <div style="border: 1px solid grey; padding: 20px">
          (icon)(name)
          <button style="color:#1174a6; background-color: white; border: 1px solid #1174a6">Sửa</button>
        </div>
        <div style="border-left: 1px solid grey; border-right: 1px solid grey;border-bottom: 1px solid grey;padding: 20px;  font-size: 10px;  text-align:center">
          <span >Tỷ lệ phản hồi </span>
          <span style="font-size: 30px; color: grey;">|</span>
          <span> Thời gian trả lời tr.bình</span>
        </div>
      </div>
    <div>
      <br><br><br><br>
        <div><b><span style="color:#1174a6"><b>|</b></span> Đánh giá/ Góp ý</b></div>
        <br>
        <div style="border: 1px solid black; padding: 20px; font-size:15px">
          <i class="el-icon-guide"></i>
          Hãy cùng Agoda cải thiện công cụ bạn đang dùng <br><br> 
          <a href= "" > Ý kiến đánh giá </a>
        </div>
    </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br>
    </div >
    <!-- footer -->
    <div class="flex-left" style="background-color:#D7D7D7">
      <div class="logo" style="margin-left:20px; position: relative">
        <img src="../assets/logo.png" style="position: absolute; top: 50%; transform: translateY(-50%)" alt="" > 
      </div>
      <div style="font-size:12px; margin-left:100px; text-align:center">
        Agoda <br>
        Mọi nội dung tại đây © 2005 – 2020 Công ty Agoda Pte. Ltd., giữ toàn quyền. <br>
        Agoda.com là thành viên của Tập đoàn Booking Holdings, nhà cung cấp dịch vụ du lịch trực tuyến & các dịch vụ có liên quan hàng đầu thế giới.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }],
        value: '',
        tableData: [{
          data: '2016-05-03',
          name: 'Tom',
        }, {
          date: '2016-05-02',
          name: 'Tom',
        }]
      }
    }
  }
</script>

<style scoped>
.icon{
  color: white;
}
.flexcontainer {
   display: flex;
   flex-direction: row;
   margin-left: 20px;
   margin-top: 20px;
}
.flex-left {
   display: flex;
   flex-direction: row;
   padding: 30px;
}

.flex-right {
   display: flex;
   flex-direction: column;
   margin-left: 60%;
   margin-right: 20%;
   justify-content: flex-end;
}

</style>