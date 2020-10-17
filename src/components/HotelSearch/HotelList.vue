<template>
    <div>
        <el-container>
            <el-main>
                <el-row class="hotelOffer-row">
                    <el-col class="hotel-suggest"  style="padding: 0 5px" :span="6">
                        <div class="tileMapWrapper">
                            <img class="static-map-paper" src="../../assets/bkg-map-entry.svg" alt="">
                            <img class="static-map-pin" src="../../assets/img-map-pin-red.svg" alt="">
                            <a href="">XEM VỊ TRÍ</a>
                        </div>
                        <h4>Đề xuất cho bạn ở Lâm Đồng</h4>
                        <div v-for="s of hotelSuggestion" :key="s.id" class="hotelOffer-item">
                            <div class="hotelOffer-image">
                                <img :src="s.images[0]" alt="">
                            </div>
                            <div class= "hotelOffer-content">
                                <div class=hotelOffer-name>{{s.name}}</div>
                                <el-rate
                                    v-model="s.rating"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value} stars">
                                </el-rate>
                                <div class="minPrice">
                                    Giá mỗi đêm rẻ nhất từ
                                    <h3>{{s.minPrice | formatCurrency}}</h3>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="hotel-detail" style="padding: 0 5px" :span="18">
                        <div v-for="hotel in filterHotel" :key="hotel.id" class="hotelList-item" @click="detailHotel(hotel.id)">
                            <div class="hotelList-image">
                               
                                <div class="main-image">
                                     <img :src="hotel.images[0]" alt="">
                                </div>
                                <div class="thumbnail-image">
                                    <el-row>
                                        <el-col v-for="(thumbnail,index) in hotel.thumbnailImage" :key="index" class="thumbnail-col" :span="6">
                                            <img :src="thumbnail" alt="">
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div class="hotelList-content">
                                    <el-col :span="16" class="content1" >
                                        <div class="hotelList-name">{{hotel.name}}</div>
                                        <el-rate
                                            v-model="hotel.rating"
                                            disabled
                                            text-color="#ff9900"
                                            >
                                        </el-rate>
                                        <div class="hotelList-address">{{hotel.address}}</div>
                                        <div class="hotelList-district">{{hotel.districtInfo.name}}</div>
                                        
                                    </el-col>
                                    <el-col :span="8" class="content2" >
                                        <div class="hotelList-rating">
                                            {{hotel.rating}}
                                        </div>
                                        <div style="font-weight:600" class="hotelList-review">
                                            {{hotel.review}}
                                        </div>
                                        
                                        <div class="hotelList-price">
                                            <p style="color: sivler">Giá mỗi đêm rẻ nhất từ </p>{{hotel.minPrice | formatCurrency}}</div>
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
    props:['star', 'range'],
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
            ],
            hotelList:this.fetchHotel,


        }
    },

    created() {
        this.$store.dispatch('fetchDistrict',this.fetchHotel[0].provinceId)
        // this.$store.dispatch('fetchWardsByProvinceId', this.fetchHotel[0].provinceId)
    },
    methods: {
        async detailHotel(id) {
            await this.$store.dispatch('fetchHotelById', id);
            this.$router.push(`/details/${id}`)
        }
    },
    computed: {    
        fetchHotel() { 
            return this.$store.state.hotel
            .map(h => {
                h.districtInfo = this.fetchDistrict.find(d => d.id == h.districtId)
                h.thumbnailImage = h.images.filter(i => h.images.indexOf(i) > 0 && h.images.indexOf(i) <= 8)
                return h
            }) 
        },

        
        filterHotel() {
            for ( let i=1 ; i<=5 ; i++) {
                if(this.star === i) {
                return this.fetchHotel.filter(h => h.rating >=i && this.range[0]*200000  <= h.minPrice && h.minPrice <= this.range[1]*200000)
                }
            }
            return this.fetchHotel.filter(h => this.range[0]*200000  <= h.minPrice && h.minPrice <= this.range[1]*200000)
        },
      
        fetchDistrict() {
            return this.$store.state.districts
        },

        hotelSuggestion() {
            return this.filterHotel.filter(s => this.filterHotel.indexOf(s) > 0 && this.filterHotel.indexOf(s) <=4 )
        }
        
    },
    // mounted() {
    //    console.log(this.hotelSuggestion)
    // }
    
}
</script>

<style scoped>
    @media(max-width: 768px){
        .hotel-suggest {
            display: none
        }
        .hotel-detail {
            width: 100%
        }
        .content1 {
            border-right: none !important;
        }
        .hotelList-rating {
            width: 40% !important;
        }
        .hotelList-image {
            width: 80% !important ;
        }
    }
   
    .thumbnail-col {
        height: 60px;
        padding: 1px;
    }
    .thumbnail-col img{
        width: 100%;
        height: 60px;
        object-fit: cover;
        
    }
    .main-image {
        height: 180px;
    }
    .hotelList-address {
        padding: 10px 0;
        font-size: 14px;
        font-weight: 600;
    }
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
        width: 30%;
        border: 1px solid cadetblue;
        background-color: cadetblue;
        color: white;
        border-radius: 5px;
        padding: 10px 0;
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
        width: 100px;
        background-position: 50%;
        background-size: cover;
        height: 140px;
        
    }
    .hotelOffer-image img {
        width: 100%;
        height: 140px;
        object-fit: cover;
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
        font-size: 12px;
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
    .main-image img{
        width: 100%;
        height: 180px;
        object-fit: cover;
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
        padding: 5px 0;
    }
    .hotelList-name {
        font-weight: 600;
        letter-spacing: 1px;

    }
   
</style>

<style >
    .filter-main {
        padding: 5px !important;
    }
    .content1 .el-rate {
        padding: 5px 0
    }
    .hotelContent .el-rate__icon {
        margin-right: 0 !important;
    }
    .hotelList-content .el-rate__text {
        font-weight: 600;
    }
    
</style>