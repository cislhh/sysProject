<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '商品添加' : '商品编辑'"
      :visible.sync="addInfo.dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="seckInfo" :rules="rules" ref="seckInfo">
        <el-form-item
          label="商品名称："
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="seckInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item
          label="一级分类："
          :label-width="formLabelWidth"
          placeholder="请选择一级分类"
        >
          <el-select
            @change="cateChange"
            v-model="seckInfo.first_cateid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类："
          :label-width="formLabelWidth"
          placeholder="请选择二级分类"
        >
          <el-select
            @change="goodsList"
            v-model="seckInfo.second_cateid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item
          label="商品："
          :label-width="formLabelWidth"
          placeholder="请选择商品"
        >
          <el-select v-model="seckInfo.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
              >{{ item.goodsname }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="seckInfo.status" label="1">启用</el-radio>
          <el-radio v-model="seckInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          type="primary"
          @click="subInfo('seckInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('seckInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入商品接口
import {
  getseckAdd,
  getseckEdit,
  getseckInfo,
  getcateList,
  getgoodsInfo,
  getgoodsList
} from "../../utils/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      time: [],
      goodsArr: [],
      cateArr: [],
      secondArr: [],
      fileList: [], //文件上传列表
      dialogImageUrl: "", //显示图片
      dialogVisible: false, //开启图片的弹框
      imgUrl: "", //上传之后的图片地址
      formLabelWidth: "100px", //label宽度
      editId:0,
      seckInfo: {
        begintime: "",
        endtime: "",
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsid: "", //二级分类编号
        title: "", //商品名称
        status: "1"
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    //计算属性
    ...mapGetters(["getStateSeckList"])
  },
  mounted() {
    this.getActionSeckList();
    getcateList({ pid: 0 }).then(res => {
      if (res.data.code == 200) {
        // console.log(res.data)
        this.cateArr = res.data.list;
      }
    });
  },
  methods: {
    cateChange(e) {
      getcateList({ pid: e }).then(res => {
        if (res.data.code == 200) {
          this.secondArr = res.data.list;
        }
      });
    },
    goodsList(e) {
      getgoodsList({ fid: e - 1, sid: e }).then(res => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
        }
      });
    },
    //封装一个获取商品列表事件
    ...mapActions(["getActionSeckList"]),
    //关闭弹框事件
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    //重置输入内容
    reset() {
      (this.time = []),
        (this.seckInfo = {
          first_cateid: "", //一级分类编号
          second_cateid: "", //二级分类编号
          title: "", //商品名称
          status: "1"
        });
    },
    //点击编辑按钮出现弹框并携带数据
    update(id) {
      //给编辑id赋值
      this.editId = id;
      //调取商品查询一条数据
      getseckInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.seckInfo = res.data.list;
          this.seckInfo.status = this.seckInfo.status.toString();

          //返回时间
          this.seckInfo.begintime = new Date(parseInt(this.seckInfo.begintime));
          this.seckInfo.endtime = new Date(parseInt(this.seckInfo.endtime));
          if (this.time == []) {
            this.time.push(this.seckInfo.begintime, this.seckInfo.endtime);
          } else {
            this.time = [];
            this.time.push(this.seckInfo.begintime, this.seckInfo.endtime);
          }
          //返回二级分类名称
          this.cateChange(this.seckInfo.first_cateid);
          //返回商品名称
          this.goodsList(this.seckInfo.second_cateid)
        }
      });
    },
    //确定添加或者更新事件
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.seckInfo.begintime = this.time[0].getTime().toString();
          this.seckInfo.endtime = this.time[1].getTime().toString();
          //根据isAdd状态去判断执行接口
          if (this.addInfo.isAdd) {
            //调取添加接口
            getseckAdd(this.seckInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹框 清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionSeckList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.seckInfo;
            data.id = this.editId;
            
            //调取更新接口
            getseckEdit(data).then(res => {
              console.log(data.first_cateid)
              if (res.data.code == 200) {
                //关闭弹框 清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionSeckList();
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

<style lang="" scoped></style>
