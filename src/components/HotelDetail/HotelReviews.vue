<template>
    <el-container>
        <el-main>
            <el-row class="review-row">
                <div class="review-header">
                     <div class="review-title" style="font-size:24px, font-weight:600">Bài đánh giá Khách sạn từ du khách</div>
                     <div class="review-button">
                         <el-button @click="updateReview" type="success">Bài review của tôi</el-button>
                        <el-button @click="postReview(idHotel)" type="primary">Đăng bài review</el-button>
                     </div>
                    
                </div>
                <div v-for="review of reviews" :key="review.id" class="review-body">
                    <el-col :span="6" class="review-detail">
                        <div class="review-rating">{{review.rating}}.0</div>
                        <div class="review-customer">Khách: {{reviewForm.customerName}}</div>
                    </el-col>
                    <el-col :span="18" class="review-content">
                        <div class="review-content-tag">"{{review.tag.name}}"</div>
                        <div class="review-content-body">
                            {{review.content}}
                        </div>
                        
                    </el-col>
                </div>
            </el-row>
            
        </el-main>
    </el-container>
</template>

<script>
export default {

    props:['idHotel'],
    data() {
        return {
            reviewForm: {
                rating:2,
                customerName:'Gia Văn',
                content: 'Đẹp, phòng quyến rũ, view thoáng!!!',
                tag:'Tuyệt vời'
            }
        }
    },
    methods: {
        postReview(id) {
            const checkAccessToken = JSON.parse(localStorage.getItem('accessToken'))
            if(!checkAccessToken) {
                this.alertErr()
            }
            else(
                this.$router.push(`/review/${id}`)
            ) 
        },
        updateReview() {
             const checkAccessToken = JSON.parse(localStorage.getItem('accessToken'))
            if(!checkAccessToken){
                this.alertErr()
            }
            else(
                 this.$router.push(`/customer-review`)
            ) 
           
        },
        alertErr() {
            this.$message({
                showClose: true,
                message: 'Quý khách cần phải đăng nhập để thực hiện tác vụ này!',
                type: 'error'
            });
        },

    },
    created() {
       
        this.$store.dispatch('fetchCustomer')
        this.$store.dispatch('fetchReviews',this.idHotel);
        this.$store.dispatch('fetchTags')
        
    },
    computed: {
        reviews() {
            return this.$store.state.reviews
            .map(r => {
                r.tag = this.tags.find(t => t.id == r.tagId)
                return r
            })
        },
        tags() {
            return this.$store.state.tags
        },
        // customer() {
        //     return this.$store.state.customer
        // } 
    }
}
</script>

<style scoped>
    .review-title {
        font-weight: 600;
        font-size: 24px
    }
    .review-content-tag {
        font-weight: 600;
        font-size: 18px
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
        color: #488bf8
    }
    .review-body {
        display: flex;
        align-items: center;
        padding: 30px 10px;
    }
    .review-row {
        width: 100%;
        padding-top: 40px;
        border-top: 1px solid rgb(221,223,226);
    }
    .review-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>