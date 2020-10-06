<template>
    <div>
        <el-container>
            <el-main>
                <el-row class="hotelOffer-row">
                    <el-col  style="padding: 0 5px" :span="6">
                        <div class="tileMapWrapper">
                            <img class="static-map-paper" src="../../assets/bkg-map-entry.svg" alt="">
                            <img class="static-map-pin" src="../../assets/img-map-pin-red.svg" alt="">
                            <a href="">XEM VỊ TRÍ</a>
                        </div>
                        <h4>Đề xuất cho bạn ở Đà Lạt</h4>
                        <div v-for="item of hotel" :key="item.name" class="hotelOffer-item">
                            <div class="hotelOffer-image"></div>
                            <div class= "hotelOffer-content">
                                <div class=hotelOffer-name>{{item.name}}</div>
                                <el-rate
                                    v-model="item.star"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value} stars">
                                </el-rate>
                                <div class="minPrice">
                                    Giá mỗi đêm rẻ nhất từ
                                    <h3>{{item.minPrice}}</h3>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col style="padding: 0 5px" :span="18">
                        <div v-for="item in hotel" :key="item.name" class="hotelList-item" @click="detailHotel(item.idHotel)">
                            <div class="hotelList-image">
                                <img src="../../assets/hotel2.jpg" alt="">
                            </div>
                            <div class="hotelList-content">
                                    <el-col :span="16" class="content1" >
                                        <div class="hotelList-name">{{item.name}}</div>
                                        <el-rate
                                            v-model="item.star"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="{value} stars">
                                        </el-rate>
                                        <div class="hotelList-district">{{item.district}}</div>
                                    </el-col>
                                    <el-col :span="8" class="content2" >
                                        <div class="hotelList-rating">
                                            {{item.rating}}
                                        </div>
                                        <div style="font-weight:600" class="hotelList-review">
                                            {{item.review}}
                                        </div>
                                        
                                        <div class="hotelList-price">
                                            <p style="color: sivler">Giá mỗi đêm rẻ nhất từ</p>{{item.minPrice}}</div>
                                    </el-col>
                            </div>
                            
                            
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>


<script>
export default {
    data() {
        return {
            hotel : [
            {
                idHotel:1, 
                name: 'Khách sạn Golf Valley (Golf Valley Hotel)',
                star: 3.7,
                minPrice: 30 +'.00 $ ',
                district:'Quận 1',
                rating: 8.4,
                review: 'Tuyệt vời'
            },
            {
                idHotel: 2,
                name: 'Tulip Hotel',
                star: 4.5,
                minPrice: 25 + '.00 $ ',
                district:'Quận 5',
                rating: 6.7,
                review:'Tốt'
            },
            {
                idHotel: 3,
                name: 'Nam Xuân premium Hotel',
                star: 3.1,
                minPrice: 20 +'.00 $ ',
                district:'Quận 3',
                rating: 7.6,
                review: 'Rất tốt'
            }
            ]
        }
    },
    methods: {
        detailHotel(id) {
            this.$router.push(`/details/${id}`)
        }
    }
}
</script>

<style scoped>
    .hotelList-review {
        padding: 10px 0;
    }
    .content2 {
        height: 100%;
        text-align: -webkit-right;
        padding: 10px;
        position: relative
    }
    .hotelList-price {
        color: #e12d2d;
        font-weight: 600;
        font-size: 18px;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px;
    }
    .hotelList-price p {
        color: gray;
        font-size: 10px;
    }
    .hotelList-rating {
        text-align: center;
        width: 20%;
        border: 1px solid cadetblue;
        background-color: cadetblue;
        color: white;
        border-radius: 5px;
        padding: 5px 0;
        font-weight: 600;
    }
    .content1{
        padding: 10px 15px;
        height: 300px;
        border-left: 1px solid #dddfe2;
        border-right: 1px solid #dddfe2;
    }
    .hotelOffer-image {
        display: table-cell;
        background-image: url(../../assets/hotel1.jpg);
        width: 100px;
        background-position: 50%;
        background-size: cover;
        height: 140px;
        
    }
    .hotelOffer-row {
        width: 80%;
        margin: 0 auto;
    }
    .tileMapWrapper {
        border: 1px solid #d7d7db;
        position: relative;
    }
    .static-map-pin{
        width: 30px;
        height: 50px;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,-90%);
    }
    a{
        text-decoration: none;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,30%);
    }
    .hotelOffer-item {
        display: flex;
        font-weight: 600;
        font-size: 14px;
        border: 1px solid #d7d7db;
        margin:  10px 0;
    }
    .hotelOffer-name {
        letter-spacing: 1px;
    }
    .hotelOffer-item h3 {
        font-size: 14px;
        margin: 0;
        color: red;
        padding-top: 5px;
        text-align: right;
    }
    .hotelOffer-content {
        position: relative;
        width: 100%;
        padding: 10px;
    }
    .minPrice {
        font-size: 10px;
        position: absolute;
        bottom: 10px;
        right: 15px;
       
    }
    /* hotelLIst */
    .hotelList-content {
        /* display: flex;
        justify-content: space-between; */
        width: 100%;
    }
    .hotelList-item {
        box-shadow: 2px 2px 4px 0 rgba(0,0,0,.15);
        cursor: pointer;
    }
    .hotelList-image{
        width: 50%;
    }
    .hotelList-image img{
        width: 100%;
    }
    .hotelList-item {
        display: flex;
        margin: 10px 0;
        border:1px solid #dddfe2;
    }
    .hotelList-district {
        color: blueviolet;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 14px;
    }
    .hotelList-name {
        font-weight: 600;
        letter-spacing: 1px;

    }
   
</style>

<style >
    .hotelContent .el-rate__icon {
        margin-right: 0 !important;
    }
    .hotelList-content .el-rate__text {
        font-weight: 600;
    }
    
</style>