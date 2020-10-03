<template>
    <div>
        <el-container>
            <el-main class="searchBar">
                <el-row>
                    <el-col :span="8">
                         <div class="search">
                            <el-input
                                class="cus-input"
                                placeholder="Nhập điểm du lịch"
                                suffix-icon="el-icon-search"
                                v-model="country">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                         <div class="date">
                            <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator=""
                            start-placeholder="Start date"
                            end-placeholder="End date">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                         <div class="select">
                            <el-select   v-model="value" placeholder="Select" >
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <button  class="button-select" >TÌM</button>
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

                options: [{
                value: 'Phòng 1 người',
                label: 'Phòng 1 người'
                }, {
                value: 'Phòng 2 người',
                label: 'Phòng 2 người'
                }, {
                    value: 'Phòng 3 người',
                    label: 'Phòng 3 người'
                }],
                value: this.$store.state.hotel.number || ''
            };
    },

    
    // mounted() {
    //     console.log(this.hotel)
    // },
    // computed: {
    //     hotel(){
    //         console.log(this.$store.state.hotel)
    //         return this.$store.state.hotel
    //     }
    // }

}
</script>

<style scoped>
    .el-row{
        width: 80%;
        margin : 0 auto;
        padding : 10px 0;
    }
    .el-col{
        padding: 0 10px;
    }
    .searchBar {
        background-color: #20274d;
    }
</style>
