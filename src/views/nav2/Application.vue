<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getRecodeList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="recodeData"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column align='center' type="selection" width="55"></el-table-column>
      <el-table-column prop="name" align='center' label="姓名" width="120" ></el-table-column>
      <el-table-column prop="sex" align='center' label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
      <el-table-column prop="class" align='center' label="班级" width="100" sortable></el-table-column>
      <el-table-column prop="chinese" align='center' label="语文" min-width="100" sortable></el-table-column>
      <el-table-column prop="math" align='center' label="数学" min-width="100" sortable></el-table-column>
      <el-table-column prop="english" align='center' label="英语" min-width="100" sortable></el-table-column>
      <el-table-column prop="history" align='center' label="历史" min-width="100" sortable></el-table-column>
      <el-table-column prop="geography" align='center' label="地理" min-width="100" sortable></el-table-column>
      <el-table-column prop="biology" align='center' label="政治" min-width="100" sortable></el-table-column>
      <el-table-column prop="politics" align='center' label="生物" min-width="100" sortable></el-table-column>
      <el-table-column  label="总分" align='center' min-width="100" :formatter="formatTotalPoints" ></el-table-column>
      <el-table-column label="操作" width="150" align='center'>
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
    <!--编辑、新增界面-->
    <el-dialog :title="formVisibleTitle" :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="submitForm" label-width="80px" :rules="formRules" ref="submitForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="submitForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="submitForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input-number :min="1" :max="20" v-model="submitForm.class"></el-input-number>
        </el-form-item>
        <el-form-item label="数学" prop="math">
          <el-input-number :min="0" :max="100" v-model="submitForm.math"></el-input-number>
        </el-form-item>
        <el-form-item label="英语" prop="english">
          <el-input-number :min="0" :max="100" v-model="submitForm.english"></el-input-number>
        </el-form-item>
        <el-form-item label="历史" prop="history">
          <el-input-number :min="0" :max="100" v-model="submitForm.history"></el-input-number>
        </el-form-item>
        <el-form-item label="地理" prop="geography">
          <el-input-number :min="0" :max="100" v-model="submitForm.geography"></el-input-number>
        </el-form-item>
        <el-form-item label="政治" prop="biology">
          <el-input-number :min="0" :max="100" v-model="submitForm.biology"></el-input-number>
        </el-form-item>
        <el-form-item label="生物" prop="politics">
          <el-input-number :min="0" :max="100" v-model="submitForm.politics"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="submit" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      recodeData: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      formVisibleTitle: "编辑",
      formVisible: false, //编辑新增界面是否显示
      submitLoading: false,
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      submitForm: {
        name: "",
        sex: -1,
        class: 0,
        chinese: "",
        math: "",
        english: "",
        history: "",
        geography: "",
        biology: "",
        politics: ""
      }
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
	},
	formatTotalPoints(row){
		return row.chinese+row.math+row.english+row.history+row.geography+row.biology+row.politics
	},
    handleCurrentChange(val) {
      this.page = val;
      this.getRecodeList();
    },
    //获取成绩列表
    getRecodeList() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      getUserListPage(para).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.recodeData = res.data.recodelist;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getRecodeList();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.formVisibleTitle = "编辑";
      this.formVisible = true;
      this.submitForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.formVisible = true;
      this.formVisibleTitle = "新增";
      this.submitForm = {
        name: "",
        sex: -1,
        class: 0,
        chinese: "",
        math: "",
        english: "",
        history: "",
        geography: "",
        biology: "",
        politics: ""
      };
    },
    //提交
    submit() {
      if (this.formVisibleTitle == "编辑") {
        this.editSubmit();
      } else {
        this.addSubmit();
      }
    },
    editSubmit: function() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.submitLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.submitForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.submitLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["submitForm"].resetFields();
              this.formVisible = false;
              this.getRecodeList();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.submitLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.submitForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.submitLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["submitForm"].resetFields();
              this.formVisible = false;
              this.getRecodeList();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getRecodeList();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getRecodeList();
  }
};
</script>

<style scoped>
</style>