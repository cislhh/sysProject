<template>
  <div>
    <!-- 表格信息 -->
    <el-table
      :data="getStateMemberList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button @click="update(item.row.id)" size="small" type="primary"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getStateMemberList"])
  },
  mounted() {
    //组件一加载就调取菜单接口
    //触发才调取vuex中的菜单列表
    this.getActionMemberList();
  },
  methods: {
    //获取菜单列表事件
    ...mapActions(["getActionMemberList"]),
    //点击添加按钮修改父组件数据
    update(id) {
      this.$emit("edit", {
        isAdd: false,
        dialogIsShow: true,
        id
      });
    },
    
  }
};
</script>

<style lang="" scoped></style>
