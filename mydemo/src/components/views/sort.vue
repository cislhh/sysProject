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
      :data="getStateCateList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
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
      :title="isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="cateInfo" :rules="rules" ref="cateInfo">
        <el-form-item
          label="上级分类："
          :label-width="formLabelWidth"
          prop="pid"
          placeholder="请选择分类"
        >
          <el-select v-model="cateInfo.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in getStateCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
            <!-- <el-option label="商城管理" :value="2">商城管理</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称："
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="cateInfo.catename"></el-input>
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
          <el-radio v-model="cateInfo.status" label="1">启用</el-radio>
          <el-radio v-model="cateInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('cateInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('cateInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入分类接口
import {
  getcateAdd,
  getcateInfo,
  getcateEdit,
  getcateDelete
} from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "../common/breadCrumb";
export default {
  data() {
    return {
      dialogImageUrl: "", //显示图片用地址
      dialogVisible: false, //是否开启图片的弹框
      fileList: [], //文件上传列表
      imgUrl: "", //上传之后的图片地址
      cateInfo: {
        pid: 0,
        catename: "",
        img: "",
        status: "1"
      },
      isAdd: true, //添加状态
      formLabelWidth: "100px", //label宽度
      dialogIsShow: false, //是否出现弹框
      editId: 0, //修改时候的id
      rules: {
        catename: [
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
    ...mapGetters(["getStateCateList"])
  },
  mounted() {
    //组件一加载就调取分类接口
    //触发才调取vuex中的分类列表
    this.getActionCateList();
  },
  methods: {
    //图片移除
    handleRemove(file, fileList) {
      this.fileList = fileList;
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
    ...mapActions(["getActionCateList"]),
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
      //   .get("/api/api/cateinfo", {
      //     params: { id }
      //   })
      getcateInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.cateInfo = res.data.list;
          //对获取的图片进行格式转化
          this.fileList = this.cateInfo.img
            ? [{ url: `http://localhost:3000${this.cateInfo.img}` }]
            : [];
          this.cateInfo.status = this.cateInfo.status.toString();
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
          // this.$http.post("/api/api/catedelete", { id })
          getcateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getActionCateList();
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
      this.imgUrl = "",
      this.fileList = []; //清空上传文件列表
      this.cateInfo = {
        pid: 0,
        catename: "",
        img: "",
        status: "1"
      };
    },
    //提交
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.cateInfo;
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
            getcateAdd(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionCateList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            file.append("id", this.editId);
            //如果删除图片进行判断
            if (this.imgUrl == "" && this.fileList.length == 0) {
              this.imgUrl = "";
            } else {
              //如果图片未修改 沿用上次图片地址 如果图片被修改使用新图片地址
              this.imgUrl = this.imgUrl ? this.imgUrl : this.goodsInfo.img;
              file.append("img", this.imgUrl);
            }
            //调取更新接口
            // this.$http.post("/api/api/cateedit", data)
            getcateEdit(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹窗
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功后，重新查询列表
                this.getActionCateList();
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
