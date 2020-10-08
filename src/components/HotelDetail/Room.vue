<template>
    <div class="Room">
        <el-container>
            <el-main>
                <el-row class="Room-row">
                    <div class="Room-title">
                        <h2>Chọn Phòng</h2>
                        <el-button icon="el-icon-price-tag" type="primary" plain>SO SÁNH MỨC GIÁ</el-button>
                    </div>
                </el-row>
                <el-row class="RoomGrid-content">
                        <el-col class="RoomWrap" :span="24">
                            <div class="MasterRoom_Header">
                                <h3>Giường Đôi (Double)</h3>
                                <div class="Room_review">Tuyệt vời 8.2</div>
                            </div>
                             <el-col :span="5" class="MasterRoom-info">
                                 <div class="MasterRoom-infoHeader">Loại phòng</div>
                                 <div class="MasterRoom-infoPhoto">
                                      <img src="../../assets/e6.jpg" alt="">
                                      <div class="MasterRoom-infoPhotoHover">
                                        <img src="../../assets/e6.jpg" alt="">
                                      </div>
                                 </div>
                                
                                 <div class="MasterRoom-infoPhotoThumbnail">
                                     <div class="infoPhotoThumbnail1">
                                         <img src="../../assets/thumbnail1.jpg" alt="">
                                     </div>
                                     <div class="infoPhotoThumbnail2">
                                         <img src="../../assets/thumbnail2.jpg" alt="">
                                     </div>
                                 </div>

                             </el-col>
                            <el-col :span="19" class="MasterRoom-roomList">
                                <el-row class="roomList_wrapper">
                                    <el-col :span="8" class="ChildRoom-include">
                                        <div class="include-header">Giá này đã gồm</div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-capacity">
                                        <div class="capacity-header">Sức chứa</div>
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-price">
                                        <div class="price-header">Giá phòng/ đêm</div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-room">
                                        <div class="room-header">SL</div>
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-book">
                                        <div class="book-header">Đặt nhiều nhất</div>
                                    </el-col>
                                    
                                </el-row>
                                <el-row class="ChildRoomsList-room-contents">
                                    <el-col :span="8" class="ChildRoom-include-content">
                                        <div class="include-content-badge">Giá thấp nhất!</div>
                                        <div class="include-content-bucket">
                                            <div style="font-weight: 600; padding: 10px 0">Lợi ích</div>
                                            <div style="padding: 10px 0"><i style="margin-right: 5px" class="el-icon-check"></i>Wifi miễn phí</div>
                                            <div><i style="margin-right: 5px" class="el-icon-check"></i>MIỄN PHÍ hủy phòng trước 10 Tháng</div>
                                        </div>
                                        
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-capacity-content">
                                        <div style="padding: 15px 10px; text-align:center"> <i class="el-icon-user-solid"></i>
                                        <i class="el-icon-user-solid"></i></div>
                                       
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-price-content">
                                        <div class="finalPrice">
                                            50 $
                                        </div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-room-content">
                                        <div class="room-dropdown">1</div>
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-book-content">
                                        <el-button type="primary" class="reverseNow">Đặt trước</el-button>
                                        
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-col>
                       
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .ChildRoomsList-room-contents {
        display: flex;
    }
    .ChildRoom-include-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-capacity-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-price-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-room-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .reverseNow {
       width: 85%;
       margin: 10px 0;
    }
    .ChildRoom-book-content {
        text-align: center
    }
    .room-dropdown {
        padding: 10px;
        text-align: center;
    }
    .finalPrice {
        padding: 10px;
        text-align: center;
        color: #ed5c59;
        font-size: 24px;
    }
    .include-content-badge {
        background-color: #f79911;
        color: white;
        font-size: 13px;
        padding: 5px 10px;
    }
    .include-content-bucket {
        font-size: 12px;
        font-weight: 500;
        padding: 10px;
        
    }
    .ChildRoomsList-room-contents{
        border: 1px solid #f79911;
        background-color: white;
    }
    .MasterRoom-infoPhoto {
        position: relative;
        cursor: pointer
    }
    .MasterRoom-infoPhoto:hover .MasterRoom-infoPhotoHover {
        display: block;
        z-index:10
    }
    .MasterRoom-infoPhotoHover{
        display: none;
        position: absolute;
        top: 31px;
        right: -255px;
        width: 100%;
        transform: scale(1.4);
    }
    .MasterRoom-infoPhotoThumbnail{
        display: flex;
    }
    .infoPhotoThumbnail1 img {
        width: 100%;
    }
    .infoPhotoThumbnail2 img {
        width: 100%;
    }
    .infoPhotoThumbnail1 {
        width: 50%;
        padding-right: 3px;
    }
     .infoPhotoThumbnail2 {
        width: 50%;
    }
    .MasterRoom-infoHeader {
        margin-bottom: 10px;
    }
    .MasterRoom-infoPhoto img{
        width: 100%
    }
    .roomList_wrapper {
        margin-bottom: 10px
    }
    .MasterRoom_Header {
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 10px;
    }
    .Room_review {
       font-weight: 600;
       color: blueviolet
    }
    .MasterRoom_Header h3  {
        font-weight: 600;
        font-size: 16px;
    }
    .RoomWrap {
        border: 1px solid rgb(221,223,226);
        background-color: #f7f7f7;
    }
    .Room .Room-row {
        width: 80%;
        margin: 0 auto;
    }
    .Room .RoomGrid-content {
        width: 80%;
        margin: 0 auto;
        padding: 10px
    }
    .Room-title {
        display : flex;
        align-items: center;
        padding: 10px;
        justify-content: space-between;
    }
    .MasterRoom-info {
        padding: 10px 0 10px 10px;
        font-size: 14px;
        font-weight: 600;
    }
    .MasterRoom-roomList {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
    }
  
</style>