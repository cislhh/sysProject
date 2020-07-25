<template>
  <div class="myNav">
    <nav class="nav">
      <div class="wrap">
        <ul>
          <li class="first">
            <a>推荐</a>
          </li>
          <li
            
            v-for="(item, index) in getStateCateList"
            :key="item.id"
            @click="goSort(item.id, item.catename,index)"
          >
            <a>{{ item.catename }}</a>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      imgArrow: require("../../assets/images/index_images/arrow.jpg"),
    };
  },
  computed: {
    ...mapGetters(["getStateCateList"]),
  },
  mounted() {
    this.getActionCateList()
  },

  methods: {
    ...mapActions(["getActionCateList"]),
    goSort(id, catename,index) {
      //   this.$router.push("/sort")
      this.$router.push({
        path: "/sort",
        query: {
          fid:id,
          catename,
          index
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/index.css";
</style>
