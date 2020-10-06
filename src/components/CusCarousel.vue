<template>
  <div>
    <div class="carousel">
      <h2>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</h2>
      <p>Nhận giá tốt nhất cho >2.000.000 chỗ nghỉ, trên toàn cầu</p>
      <div class="table">
        <div class="search">
          <!-- <el-input
                        class="cus-input"
                        placeholder="Nhập điểm du lịch"
                        suffix-icon="el-icon-search"
                        v-model="country">
                    </el-input> -->
          <el-select
            class="add-hotel__select-info"
            v-model="form.provinceId"
            clearable 
            filterable
            placeholder="Vui Lòng Chọn Tỉnh Thành"
          >
            <el-option
              v-for="province in provinces"
              :key="province.id"
              :label="province.name"
              :value="province.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="date">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator=""
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
        <div class="select">
          <el-select v-model="form.value" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <button class="button-select" @click="searchHotel()">TÌM</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        provinceId: '',
        date: '',
        value: '',
      },
      options: [
        {
          value: 'Phòng 1 người',
          label: 'Phòng 1 người',
        },
        {
          value: 'Phòng 2 người',
          label: 'Phòng 2 người',
        },
        {
          value: 'Phòng 3 người',
          label: 'Phòng 3 người',
        },
      ],
    };
  },
  created() {
    this.$store.dispatch('fetchProvince');
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    },
  },
  methods: {
    searchHotel() {
      this.$store.dispatch('searchHotel', this.form);
      this.$router.push('/search');
    },
  },
};
</script>

<style scoped>
.carousel {
  background-image: url(../assets/carousel.png);
  background-position: bottom center;
  background-size: contain;
  background-color: darkcyan;
  padding-bottom: 45%;
  background-repeat: no-repeat;
  position: relative;
}
h2 {
  color: white;
  margin: 0;
  padding-top: 30px;
}
p {
  font-size: 16px;
  margin: 0;
  color: white;
  font-weight: 600;
  padding: 10px;
}
.table {
  width: 50%;
  margin: 0 auto;
  background-color: rgba(221, 210, 210, 0.5);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border-radius: 5px;
  max-width: 750px;
}
.search {
  margin: 30px auto 10px auto;
  width: 80%;
  cursor: pointer;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}

.search .el-select {
  width: 100%
}


.date {
  margin: 10px auto;
  width: 80%;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.select {
  display: flex;
  margin: 10px auto 30px;
  width: 80%;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.button-select {
  color: white;
  background-color: #5392f9;
  text-decoration: none;
  width: 35%;
  cursor: pointer;
  font-size: 18px;
  line-height: 75px;
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}
.button-select:hover {
  color: white;
  background-color: rgb(83, 146, 249, 0.7);
}
</style>

<style>
.search .el-select input {
  height: 80px;
}
.el-range-separator {
  position: relative !important;
}
.el-range-separator::before {
  content: '';
  background-color: #aaa2a2;
  height: 60px;
  width: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.search .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 18px;
  letter-spacing: 1px;
}
.search .el-input__inner {
  font-size: 18px;
  letter-spacing: 1px;
}
.search .el-icon-search {
  color: black;
  font-size: 25px;
  padding: 0 20px;
}

.date .el-range-input::-webkit-input-placeholder {
  color: #898484 !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date .el-range-input {
  color: black !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date .el-icon-date {
  font-size: 25px !important;
  padding: 0 20px !important;
  color: black !important;
}
.select .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 16px;
  letter-spacing: 1px;
}
.select .el-input__inner {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
}
.select .el-select input {
  height: 80px;
}
.select .el-select {
  width: 65%;
}
.date .el-date-editor {
  width: 100% !important;
  height: 80px;
}
.date .el-date-editor .el-range-separator {
  line-height: 70px;
}
.search .cus-input input {
  height: 80px !important;
}
</style>
