<template>
  <div>
    <el-container>
      <el-main :style="{ overflow: 'visible' }">
        <el-row class="hotelOffer-row">
          <el-col
            class="hotel-suggest"
            :style="{ padding: '0 5px', position: 'sticky', top: 0 }"
            :span="7"
          >
            <h2 style="font-size: 22px;">Đề xuất cho bạn</h2>
            <div v-for="s of getHotelSuggestion" :key="s.id" class="hotelOffer-item">
              <div class="hotelOffer-image">
                <img :src="s.images[0]" alt="" />
              </div>
              <div class="hotelOffer-content">
                <div class="hotelOffer-name">{{ s.name }}</div>
                <div v-if="s.rating < 1" style="color: rgb(247, 186, 42); font-size: 12px;">Chưa xếp hạng</div>
                <div v-else>
                  <el-rate
                  v-model="s.rating"
                  disabled
                  text-color="#ff9900"
                >
                </el-rate>
                </div>
                
                <div class="minPrice">
                  Giá mỗi đêm rẻ nhất từ
                  <h3>{{ s.minPrice | formatCurrency }}</h3>
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="hotel-detail" style="padding: 0 5px" :span="17">
            <div
              v-for="hotel in hotelPagination"
              :key="hotel.id"
              class="hotelList-item"
              @click="detailHotel(hotel.id)"
            >
              <div class="hotelList-image">
                <div class="main-image">
                  <img :src="hotel.images[0]" alt="" />
                </div>
                <div class="thumbnail-image" >
                  <div class="img-wrapper" v-for="(thumbnail, index) in hotel.thumbnailImage" :key="index" :style="{'background-image': 'url('+ thumbnail +')'}">
                  </div>
                  <!-- <el-row>
                    <el-col
                      v-for="(thumbnail, index) in hotel.thumbnailImage"
                      :key="index"
                      class="thumbnail-col"
                      :span="6"
                    >
                      <img :src="thumbnail" alt="" />
                    </el-col>
                  </el-row> -->
                </div>
              </div>
              <div class="hotelList-content">
                <el-col :span="24" class="content1">
                  <div class="hotelList-name">{{ hotel.name }}</div>
                  <div v-if="hotel.rating < 1" style="color: rgb(247, 186, 42); font-weight: 600"> Chưa xếp hạng</div>
                  <div v-else>
                    <el-rate v-model="hotel.rating" disabled text-color="#ff9900"> </el-rate>
                  </div>
                  <div class="hotelList-description">
                    <strong>Mô tả: </strong>{{ hotel.description }}
                  </div>
                  <div class="hotelList-address"><strong>Địa chỉ: </strong>{{ hotel.address }}</div>
                  <div class="hotelList-district">{{ hotel.districtInfo.name }}</div>
                  <div class="hotelList-price">
                    <p style="color: sivler">Giá mỗi đêm rẻ nhất từ</p>
                    {{ hotel.minPrice | formatCurrency }}
                  </div>
                  
                </el-col>
              </div>
            </div>
            <el-row>
          <el-pagination
          background
          layout="pager"
          :total="filterHotel.length"
          @current-change="handleChangePage">
          </el-pagination>
        </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['star', 'range'],
  data() {
    return {
      currentPage: 1,
    };
  },
  async created() {
    // this.$store.dispatch('fetchProvinceById', this.$route.params.id);
    this.$store.dispatch('fetchDistrict', this.$route.params.id);
  },
  methods: {
    handleChangePage(number) {
      this.currentPage = number;
    },
    async detailHotel(id) {
      await this.$store.dispatch('fetchHotelById', id);
      this.$router.push(`/details/${id}`);
    },
    // convertViToEn(str, toUpperCase = false) {
    // str = str.toLowerCase();
    // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    // str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    // str = str.replace(/đ/g, "d");
  
    // str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    // str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    // return toUpperCase ? str.toUpperCase() : str;
    // }
    
  },
  computed: {
    searchKey() {
      return this.$store.state.searchKey.map((h) => {
        // h.nameToEn = this.convertViToEn(h.name)
        h.districtInfo = this.fetchDistrict.find((d) => d.id == h.districtId);
        h.thumbnailImage = h.images.filter(
          (i) => h.images.indexOf(i) > 0 && h.images.indexOf(i) <= 8
        );
        return h;
      });
    },
    fetchHotel() {
      return this.$store.state.hotel.map((h) => {
        // h.nameToEn = this.convertViToEn(h.name)
        h.districtInfo = this.fetchDistrict.find((d) => d.id == h.districtId);
        h.thumbnailImage = h.images.filter(
          (i) => h.images.indexOf(i) > 0 && h.images.indexOf(i) <= 8
        );
        return h;
      });
    },
    province() {
      return this.$store.state.provinceById;
    },
    filterHotel() {
      let checkSearch = (this.searchKey.length == 0) ? 
      this.fetchHotel.filter(h => h.minPrice != 0) : 
      this.searchKey.filter(s => s.minPrice != 0);
      console.log('checkSearch' ,checkSearch)
      for (let i = 1; i <= 5; i++) {
        if (this.star === i) {
          return checkSearch.filter(
            (h) =>
              h.rating >= i &&
              h.rating < i + 1 &&
              this.range[0] * 200000 <= h.minPrice &&
              h.minPrice <= this.range[1] * 200000
          );
        }
      }
      return checkSearch
        .filter((h) => this.range[0] * 200000 <= h.minPrice && h.minPrice <= this.range[1] * 200000)
        // .filter((h) => h.nameToEn.includes(this.$store.state.filterHotel));
    },

    fetchDistrict() {
      return this.$store.state.districts;
    },

    getHotelSuggestion() {
      let randomList = [];
      let fetchHotel = this.fetchHotel.filter(h => h.minPrice != 0)
      if(fetchHotel.length <= 4)
        return fetchHotel

      while(randomList.length < 4){
        let rand = Math.floor(Math.random()*fetchHotel.length);
        if(randomList.includes(rand)){
          continue;
        }
        randomList.push(rand);
      }
      
      let hotelSuggestion = [];
      randomList.forEach((idx) => hotelSuggestion
      .push(fetchHotel[idx]) );
      return hotelSuggestion
    },
    hotelPagination() {
      return _.chunk(this.filterHotel, 10)[this.currentPage-1];
    }
  },
  
    
  
};
</script>

<style scoped>
@media (max-width: 768px) {
  .hotel-suggest {
    display: none;
  }
  .hotel-detail {
    width: 100%;
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
  margin: 1px 0;;
}
.thumbnail-col img {
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
  position: relative;
}
.hotelList-price {
  color: #e12d2d;
  font-weight: 600;
  font-size: 18px;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  text-align: end;
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
.thumbnail-image {
  display: grid;
  flex: 1;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
}
.thumbnail-image .img-wrapper {
  background-size: cover;
  height: 100%;
}

.content1 {
  padding: 10px 15px;
  height: 300px;
  position: relative;
  border-left: 1px solid #dddfe2;
  border-right: 1px solid #dddfe2;
}
.hotelOffer-image {
  display: table-cell;
  width: 100%;
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
.static-map-pin {
  width: 30px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -90%);
}
a {
  text-decoration: none;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 30%);
}
.hotelOffer-item {
  display: flex;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #d7d7db;
  margin: 10px 0;
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
  width: 100%;
  position: relative;
}
.hotelList-item {
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.hotelList-image {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.main-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.hotelList-item {
  display: flex;
  margin: 50px 0;
  border: 1px solid #dddfe2;
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

.hotelList-description {
  /* height: 140px; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<style>
.hotelOffer-content .el-rate__icon {
  margin-right: 0;
}
.filter-main {
  padding: 5px !important;
}
.content1 .el-rate {
  padding: 5px 0;
}
.hotelContent .el-rate__icon {
  margin-right: 0 !important;
}
.hotelList-content .el-rate__text {
  font-weight: 600;
}
</style>
