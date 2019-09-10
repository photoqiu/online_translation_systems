<el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="人员类型：">
                    <el-select v-model="values" filterable placeholder="请选择人员类型">
                        <el-option
                            v-for="(items, $indexes) in addTypes"
                            :key="$indexes"
                            :label="items.name"
                            :value="items.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加人员配置：">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUsers" circle></el-button>
                </el-form-item>
                <div class="containor-rows">
                    <div class="row" v-for="(item, $index) in order" :key="$index">
                        <div class="col-lg-6 col-6 col-sm-12 rowset" >
                            <el-form-item label="起止时间：">
                                <el-date-picker
                                    v-model="sTime[$index]"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="col-lg-6 col-6 col-sm-12 rowset" >
                            <el-input-number size="medium" v-model="num[$index]" :step="1"></el-input-number>
                        </div>
                        <div class="col-lg-6 col-6 col-sm-12 rowset" >
                            <el-select v-model="values[$index]" filterable placeholder="请选择初译员">
                                <el-option
                                  v-for="(items, $indexes) in options"
                                  :key="$indexes"
                                  :label="items.name"
                                  :value="items.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="valuex[$index]" filterable placeholder="请选择审校员">
                                <el-option
                                  v-for="(items, $indexsx) in sxoptions"
                                  :key="$indexsx"
                                  :label="items.name"
                                  :value="items.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="col-lg-6 col-6 col-sm-12 rowset" >
                            <el-button type="warning" :data-index="$index" icon="el-icon-video-play" @click="applydatas" circle></el-button>
                            <el-button type="danger" :data-index="$index" icon="el-icon-delete" @click="delUserControllers" circle></el-button>
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="applyAverageDatas">均分确认</el-button>
                    <el-button type="primary" @click="onSubmit">创建区块</el-button>
                </el-form-item>
            </el-form>