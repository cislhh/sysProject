<template>
  <div v-cloak>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button @click="add" type="primary" size="small">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table
      :data="getStateBannerList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img
            class="imgInfo"
            :src="'http://localhost:3000' + item.row.img"
            alt=""
          />
        </template>
      </el-table-column>
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
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="bannerInfo" :rules="rules" ref="bannerInfo">
        
        <el-form-item
          label="分类名称："
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="bannerInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="changeInfo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="bannerInfo.status" label="1">启用</el-radio>
          <el-radio v-model="bannerInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('bannerInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('bannerInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入分类接口
import {
  getbannerAdd,
  getbannerInfo,
  getbannerEdit,
  getbannerDelete
} from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "../../components/common/breadCrumb";
export default {
  data() {
    return {
      dialogImageUrl: "", //显示图片用地址
      dialogVisible: false, //是否开启图片的弹框
      fileList: [], //文件上传列表
      imgUrl: "", //上传之后的图片地址
      bannerInfo: {
        title: "",
        img: "",
        status: "1"
      },
      isAdd: true, //添加状态
      formLabelWidth: "100px", //label宽度
      dialogIsShow: false, //是否出现弹框
      editId: 0, //修改时候的id
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择分类", trigger: "blur" }]
      }
    };
  },
  components: {
    breadCrumb
  },
  computed: {
    ...mapGetters(["getStateBannerList"])
  },
  mounted() {
    //组件一加载就调取分类接口
    //触发才调取vuex中的分类列表
    this.getActionBannerList();
  },
  methods: {
    //图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

      // console.log(file)
    },
    changeInfo(file) {
      this.imgUrl = file.raw; //这个raw里面储存了图片的各种信息
      console.log(file);
    },
    //获取分类列表事件
    ...mapActions(["getActionBannerList"]),
    //添加
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    //  编辑
    update(id) {
      this.dialogIsShow = true;
      this.isAdd = false;
      //给id赋值
      this.editId = id;
      //调取分类查询一条数据
      // this.$http
      //   .get("/api/api/Bannerinfo", {
      //     params: { id }
      //   })
      getbannerInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.bannerInfo = res.data.list;
          //对获取的图片进行格式转化
          this.fileList = this.bannerInfo.img
            ? [{ url: `http://localhost:3000${this.bannerInfo.img}` }]
            : [];
          this.bannerInfo.status = this.bannerInfo.status.toString();
        }
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
          // this.$http.post("/api/api/bannerdelete", { id })
          getbannerDelete({ id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getActionBannerList();
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
    },
    // 关闭弹窗事件
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    //重置输入内容
    reset() {
      this.fileList = []; //清空上传文件列表
      this.bannerInfo = {
        title: "",
        img: "",
        status: "1"
      };
    },
    //提交
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.bannerInfo;
          // 根据后台传值的时候都是json格式，如果有上传图片或者文件，那我们不能直接传值，需要利用FormData转化
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //对图片地址进行操作
          file.append("img", this.imgUrl);
          //根据isAdd状态判断执行接口
          if (this.isAdd) {
            //调取添加接口
            getbannerAdd(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionBannerList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            file.append("id", this.editId);
            //调取更新接口
            // this.$http.post("/api/api/banneredit", data)
            getbannerEdit(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionBannerList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
[v-clock]{
    dispaly:none
}

.el-button {
    margin-bottom: 10px;
}

.el-input {
    width: 85%;
}
.imgInfo{
  width:160px;
}
</style>
