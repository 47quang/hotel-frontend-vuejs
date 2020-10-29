<template>
  <el-container>
    <el-main>
      <el-row class="review-row">
        <div class="review-header">
          <div class="review-title" style="font-size:24px, font-weight:600">
            Bài đánh giá Khách sạn từ du khách
          </div>
          <div class="review-button">
            <el-button @click="updateReview" type="success">Bài review của tôi</el-button>
            <el-button @click="postReview(idHotel)" type="primary">Đăng bài review</el-button>
          </div>
        </div>
        <div v-for="review of reviewPagination" :key="review.id" class="review-body">
          <el-col :span="6" class="review-detail">
            <div class="review-rating">{{ review.rating }}.0</div>
            <div class="review-customer">
              Khách: {{ (review.customer && review.customer.fullname) || 'Người dùng vô danh' }}
            </div>
          </el-col>
          <el-col :span="13" class="review-content">
            <div class="review-content-tag">"{{ review.tag.name }}"</div>
            <div class="review-content-body">
              {{ review.content }}
            </div>
          </el-col>
          <el-col :span="5" style="text-align:center; " class="image-content">
            <div style="font-size: 14px" v-if="!review.images.length">
              Chưa có hình ảnh
            </div>
            <div v-else>
              <el-image
              style="width: 110px; height: 110px"
              :src="review.images[0]" 
              :preview-src-list="review.images">
            </el-image>
            <!-- <div style="    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    font-weight: 600;
    font-size: 12px;">Xem chi tiết</div> -->
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-pagination
          background
          layout="pager"
          :total="reviews.length"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash';
export default {
  props: ['idHotel'],
  data() {
    return {
      reviews: [],
      tags: [],
      currentPage: 1,
    };
  },
  computed: {
    reviewPagination(){
      return _.chunk(this.reviews, 10)[this.currentPage-1];
    }
  },
  methods: {
    postReview(id) {
      if (!this.checkPermission()) {
        return this.alertErr();
      }
      return this.$router.push(`/review/${id}`);
    },
    updateReview() {
      if (!this.checkPermission()) {
        return this.alertErr();
      }
      return this.$router.push(`/customer-review`);
    },
    handleChangePage(number) {
      this.currentPage = number;
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Quý khách cần phải đăng nhập để thực hiện tác vụ này!',
        type: 'error',
      });
    },
    checkPermission() {
      const check =
        JSON.parse(localStorage.getItem('accessToken')) &&
        JSON.parse(localStorage.getItem('customer'));
      if (check) {
        return true;
      }
      return false;
    },
  },
  async created() {
    await this.$store.dispatch('fetchReviews', this.idHotel);
    await this.$store.dispatch('fetchTags');
    this.tags = this.$store.state.tags;
    this.reviews = this.$store.state.reviews.map((r) => {
      r.tag = this.tags.find((t) => t.id == r.tagId);
      return r;
    });
  },
};
</script>

<style scoped>
.review-title {
  font-weight: 600;
  font-size: 24px;
}
.review-content-tag {
  font-weight: 600;
  font-size: 18px;
}
.review-content-body {
  font-size: 14px;
  padding-top: 20px;
  color: #4e4e4e;
}
.review-content {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 15px;
}
.review-customer {
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0;
}
.review-rating {
  font-size: 36px;
  color: #488bf8;
}
.review-body {
  display: flex;
  align-items: center;
  padding: 30px 10px;
}
.review-row {
  width: 100%;
  padding-top: 40px;
  border-top: 1px solid rgb(221, 223, 226);
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
