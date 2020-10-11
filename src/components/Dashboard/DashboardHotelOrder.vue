<template>
  <div class="manage-order">
    <el-row class="order-search" :gutter="24">
      <el-col :span="6">
        <el-input
          placeholder="Tìm Theo Tên Khách Hàng"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </el-col>
      <el-col :span="6"/>
      <el-col :span="12" class="order-filter">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Trạng Thái Đơn<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="new">New</el-dropdown-item>
            <el-dropdown-item command="done" divided>Done</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-divider class="order-title"><h2 >Danh Sách Đơn Hàng</h2></el-divider>
    <div class="order-list" v-for="order in filteredOrders" :key="order.id">
      <el-card class="order-card">
        <div slot="header" class="clearfix">
          <span class="order-card__title">[{{order.id}}] {{order.fullname}}</span>
        </div>
        <div class="order-card__body">
          <div>
            <span class="order-card__content">Email:</span>
            <span>{{order.email}}</span>
          </div>
          <div class="order-card__content-description">
            <span class="order-card__content">Phone:</span>
            <span>{{order.phone}}</span>
          </div>
          <div class="order-card__content-description">
            <span class="order-card__content">Đơn tạo:</span>
            <span>{{order.createdAt | formatTime}},</span>
            <span> {{order.createdAt | formatDate}}</span>
          </div>
          <div class="order-card__content-description">
            <span class="order-card__content">Lần cập nhật mới nhất:</span>
            <span>{{order.updatedAt | formatTime}},</span>
            <span> {{order.updatedAt | formatDate}}</span>
          </div>
          <div class="order-card__content-description">
            <span class="order-card__content">Trạng Thái:</span>
            <el-tag v-if="order.status === 'new'" class="hotel-card__tag" :type="'success'" effect="dark"><span class="order-card__content-title">Mới</span></el-tag>
            <el-tag v-else class="hotel-card__tag" :type="'warning'" effect="dark"><span class="order-card__content-title">Done</span></el-tag>
          </div>
          <el-button class="order-detail" type="text" @click="fetchOrder(order.id)">Chi Tiết Đơn Hàng</el-button>

          <el-dialog
            title="Chi Tiết Đơn Hàng"
            class="order-card__content-title"
            :visible.sync="dialogVisible"
          >
            <div class="order__modal">
              <div class="order-card__content-description">
                <el-tag class="hotel-card__tag" :type="'warning'" effect="dark"><span class="order-card__content-title">Đơn tạo</span></el-tag>
                <span> {{orderById.createdAt | formatTime}},</span>
                <span> {{orderById.createdAt | formatDate}}</span>
              </div>
              <div class="order-card__content-description">
                <el-tag class="hotel-card__tag" :type="'success'" effect="dark"><span class="order-card__content-title">Cập nhật mới nhất</span></el-tag>
                <span> {{orderById.updatedAt | formatTime}},</span>
                <span> {{orderById.updatedAt | formatDate}}</span>
              </div>
              <div class="order-card__content-description">
                <el-tag class="hotel-card__tag" effect="dark"><span class="order-card__content-title">Email</span></el-tag>
                <span> {{order.email}}</span>
              </div>
              <div class="order-card__content-description">
                <el-tag class="hotel-card__tag" :type="'danger'" effect="dark"><span class="order-card__content-title">Phone</span></el-tag>
                <span> {{order.phone}}</span>
              </div>
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                class="order-card__content-description">
                <el-table-column
                  prop="date"
                  label="Date"
                  width="180">
                   <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Name"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Address">
                </el-table-column>
              </el-table>
            </div>
            
            <span v-if="checkOrderDone(orderById.status)" slot="footer" class="dialog-footer">
              <el-button class="order-detail__btn--cancel order-detail__btn" @click="cancelOrder(orderById)">Huỷ Đơn</el-button>
              <el-button class="order-detail__btn--confirm order-detail__btn" type="primary" @click="confirmOrder(orderById)">Xác Nhận Đơn Hàng</el-button>
            </span>
            <span v-else slot="footer" class="dialog-footer">
              <el-button class="order-detail order-detail__btn--dialog" type="text" @click="dialogVisible = false">Đơn Hàng Đã Xác Nhận</el-button>
            </span>
          </el-dialog>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      dialogVisible: false,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  computed: {
    orders() {
      return this.$store.state.roomOrdersByHotelId;
    },
    orderById() {
      return this.$store.state.orderById;
    },
    filteredOrders() {
      return (Array.from(this.orders) || []).filter(order => {
        return order.fullname.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    async fetchOrder(orderId) {
      await this.$store.dispatch('fetchOrderById', orderId);
      this.dialogVisible = true;
    },
    async confirmOrder(order){
      try {
        if (order.status == "done") {
          this.alertCheckOrderDone();
        }
        else {
          await this.$store.dispatch('cancelOrder', order.id);
          this.dialogVisible = false;
          this.alertSuccess();
        }
      }
      catch(err) {
        this.alertErr();
        this.dialogVisible = false;
      }
    },
    cancelOrder(order) {
      if (order.status == "done") {
        this.alertCheckOrderDone();
      }
      else {
        this.$confirm('Hủy đơn hàng. Tiếp tục?', 'Cảnh Báo', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning',
        })
        .then(() => {
          this.$store.dispatch('cancelOrder', order.id);
          this.dialogVisible = false;
        })
        .catch(() => {
          return;
        });
      }
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error',
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xác nhận đơn hàng thành công.',
        type: 'success',
      });
    },
    checkOrderDone(orderStatus) {
      return orderStatus !== 'done';
    },
    handleCommand(command) {
      if (command == 'new') {
        console.log('command', command)
      }
      else {
        console.log('command', command)
      }
    }
  },
  async mounted() {
    this.$store.dispatch('fetchRoomOrdersByHotelId', this.$route.params.id);
  }
}
</script>
<style scoped>
.manage-order {
  padding: 0 10%;
}
.order-title {
  margin: 30px 0;
}
.order-search {
  padding-top: 30px;
  display: flex;
  align-items: center;
}
.order-card {
  padding-bottom: 30px;
}
.order-card__body {
  padding: 20px 20px 0;
}
.order-card__title {
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  word-break: break-all;
  margin-top: 0;
  font-size: 20px;
}
.order-card__content-title {
  font-weight: 700;
}
.order-card__tag {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
.order-card__content {
  font-size: 16px;
  text-align: justify;
  line-height: 1.2;
  margin: 10px 10px 0;
  font-weight: 700;
}
.order-card__content-description {
  padding-top: 20px;
}
.order-list {
  padding: 20px 0;
}
.order-detail {
  color: #1174a6;
  font-weight: 600;
  position: relative;
  margin: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0 12px;
  text-decoration: none;
  font-size: 16px;
  float: right;
}
.order-detail__btn {
  margin-left: 5px;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.order-detail__btn--confirm {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.order-detail__btn--confirm:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.order-detail__btn--cancel {
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.order__modal {
  padding: 0 10%;
}
.order-detail__btn--dialog {
  float: none;
}
.order-filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
