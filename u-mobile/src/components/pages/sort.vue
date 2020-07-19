<template>
  <div class="container">
    <my-header :titleName="title"></my-header>
    <section class="com">
            <div class="lists">
                <ul>
                    <li>施华蔻</li>
                    <!-- <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li>
                    <li>施华蔻</li> -->
                </ul>
            </div>
            <div class="coms">
                <div class="top">
                    <h5>{{$route.query.name}}</h5>
                    <a href="#">更多</a>
                </div>
                <div class="body">
                    <div class="com_list">
                        <img src="../../assets/images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="../../assets/images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="../../assets/images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div>
                    <!-- <div class="com_list">
                        <img src="images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_1.jpg" alt="">
                        <p>护亮泽洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_2.jpg" alt="">
                        <p>滋养洗发水</p>
                    </div>
                    <div class="com_list">
                        <img src="images/index_images/com_3.jpg" alt="">
                        <p>柔顺洗发露</p>
                    </div> -->
                </div>
            </div>
        </section>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
export default {
  data() {
    return {
      title:"商品分类",
    };
  },
  components: {
    myHeader
  }
  
};
</script>

<style lang="" scoped>
@import "../../assets/css/sort.css";
</style>
