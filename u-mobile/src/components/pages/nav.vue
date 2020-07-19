<template>
  <div class="myNav">
    <nav class="nav">
      <div class="wrap">
        <ul>
          <li class="first">
            <a>推荐</a>
          </li>
          <li @click="goSort(item.id,item.name)" v-for="(item,index) in comNav" :key="item.id">
            <a>{{item.name}}</a>
          </li>
        </ul>
        <span class="arrow">
          <img :src="imgArrow" />
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArrow: require("../../assets/images/index_images/arrow.jpg"),
      comNav:[{
          id:1,
          name:"女装"
      },
      {
          id:2,
          name:"鞋包"
      },
      {
          id:3,
          name:"居家"
      },
      {
          id:4,
          name:"母婴童装"
      },
      {
          id:5,
          name:"鞋包"
      },
      {
          id:6,
          name:"居家"
      },
      {
          id:7,
          name:"鞋包"
      },
      {
          id:8,
          name:"居家"
      }]
    };
  },
  methods: {
      goSort(id,name){
        //   this.$router.push("/sort")
          this.$router.push({
              path:"/sort",
              query:{
                  id,
                  name
              }
          })
      }
  },
};
</script>

<style scoped>
@import "../../assets/css/index.css";
</style>
