<template>
    <div>
        <CusNavbar></CusNavbar>
        <el-container>
            <el-main>
                <el-row class="myreview">
                   <el-divider>My Reviews</el-divider>
                  
                </el-row>

                <div>
                     <el-row v-for="review of reviews" :key="review.id" class="myreview-wrapper">
                         <el-col :span="24">
                             <el-col :span="6" class="review-detail">
                                <div class="review-hotel">{{review.hotel.name}}</div>
                                <div class="review-rating">{{review.rating}}.0</div>
                            </el-col>
                            <el-col :span="18" class="review-content">
                                <div class="review-content-tag">"{{review.tag.name}}"</div>
                                <div class="review-content-body">
                                    {{review.content}}
                                </div>
                            </el-col>
                         </el-col>
                         <el-col :span="24">
                             <el-button type="warning">Cập Nhật</el-button>
                             <el-button type="danger">Xóa</el-button>
                         </el-col>
                        
                        
                   </el-row>
                   
                </div>
                
            </el-main>
        </el-container>
    </div>
</template>

<script>
import CusNavbar from '../components/CusNavbar'
export default {
    data() {
        return {

        }
    },
    components: {
        CusNavbar
    },
    created() {
        this.$store.dispatch('fetchReviewsByCustomer', this.$store.state.myCustomer.id)
        this.$store.dispatch('fetchTags');
        this.$store.dispatch('fetchAllHotels')
        
    },
    computed: {
        reviews() {
            return this.$store.state.reviewsByCustomer
            .map(r => {
                r.tag = this.tags.find(t => t.id == r.tagId)
                r.hotel = this.hotels.find(h => h.id == r.hotelId)
                return r
            })
        },
        tags() {
            return this.$store.state.tags
        },
        hotels() {
            return this.$store.state.allHotels
        }
    }
}
</script>

<style scope>
    .myreview {
        margin: 0 auto;
        width: 80%;
        padding: 10px;
    }
    .myreview .el-divider__text {
        font-size: 24px;
        font-weight: 600
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
    .review-hotel {
        font-size: 14px;
        font-weight: 600;
        padding: 10px 0;
    }
    .review-rating {
        font-size: 36px;
        color: #488bf8
    }
    .myreview-wrapper {
        display: flex;
        align-items: center;
        padding: 30px 10px;
    }
    .review-row {
        width: 80%;
        margin: 0 auto;
        padding-top: 40px;
        border-top: 1px solid rgb(221,223,226);
    }
    .review-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
</style>

<style>
    .myreview-header .el-divider__text {
        font-size: 24px;
    }
</style>