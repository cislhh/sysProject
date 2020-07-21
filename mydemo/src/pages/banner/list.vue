<template>
  <div>
    <!-- 表格信息 -->
    <el-table
      :data="getStateMenuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
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
          <el-button @click="del(item.row.id)" size="small" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMenuDelete } from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getStateMenuList"])
  },
  mounted() {
    //组件一加载就调取菜单接口
    //触发才调取vuex中的菜单列表
    this.getActionMenuList();
  },
  methods: {
    //获取菜单列表事件
    ...mapActions(["getActionMenuList"]),
    //点击添加按钮修改父组件数据
    update(id) {
      this.$emit("edit", {
        isAdd: false,
        dialogIsShow: true,
        id
      });
    },
    // 删除
    del(id) {
      this.$confirm("确定删除这条数据吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除逻辑
          // this.$http.post("/api/api/menudelete", { id })
          getMenuDelete({ id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getActionMenuList();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="" scoped></style>
