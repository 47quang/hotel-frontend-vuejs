<template>
  <div>
    <el-container>
      <el-main class="searchBar">
        <el-row>
          <el-col :span="8">
            <div class="search-sticky">
              <el-input
                class="cus-input"
                placeholder="Nhập điểm du lịch"
                suffix-icon="el-icon-search"
                v-model="country"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="date-sticky">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator=""
                start-placeholder="Start date"
                end-placeholder="End date"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="select-sticky">
              <el-select v-model="value" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <button class="button-select">TÌM</button>
              <el-badge :value="orderLines.length" class="item">
                <i
                  class="el-icon-shopping-cart-full"
                  :style="{ color: 'white', fontSize: '30px' }"
                  @click="jumpBooking"
                ></i>
              </el-badge>
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
      country: this.$store.state.hotel.country || '',
      date: this.$store.state.hotel.date || '',

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
      value: this.$store.state.hotel.number || '',
    };
  },
  computed: {
    orderLines(){
      return this.$store.state.orderLines;
    }
  },
  methods:{
    jumpBooking(){
      this.$router.push(`/booking`);
    }
  }
};
</script>

<style scoped>
.searchBar {
  padding: 0;
}
.el-row {
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
}
.el-col {
  padding: 0 10px;
}
.searchBar {
  background-color: #20274d;
}
.search-sticky {
  cursor: pointer;
}
.select-sticky {
  display: flex;
}
.button-select {
  color: white;
  background-color: #5392f9;
  text-decoration: none;
  width: 35%;
  cursor: pointer;
  font-size: 18px;
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
.date-sticky .el-range-separator {
  position: relative !important;
}
.date-sticky .el-range-separator::before {
  content: '';
  background-color: #aaa2a2;
  height: 30px;
  width: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.search-sticky .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 18px;
  letter-spacing: 1px;
}
.search-sticky .el-input__inner {
  font-size: 18px;
  letter-spacing: 1px;
  height: 46px;
}
.search-sticky .el-icon-search {
  color: black;
  font-size: 25px;
  padding: 0 20px;
}

.date-sticky .el-range-input::-webkit-input-placeholder {
  color: #898484 !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date-sticky .el-range-input {
  color: black !important;
  font-size: 16px !important;
  letter-spacing: 1px !important;
}
.date-stick .el-icon-date {
  font-size: 25px !important;
  padding: 0 20px !important;
  color: black !important;
}
.select-sticky .el-input__inner::-webkit-input-placeholder {
  color: #898484;
  font-size: 16px;
  letter-spacing: 1px;
}
.select-sticky .el-input__inner {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
  height: 46px;
}

.select-sticky .el-select {
  width: 65%;
}
.date-sticky .el-date-editor {
  width: 100% !important;
  height: 46px;
}
.date-sticky .el-date-editor .el-range-separator {
  line-height: 70px;
}
</style>
