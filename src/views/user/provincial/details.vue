/* eslint-disable space-before-blocks */
<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">省级代理商详情</div>
      <div class="dashboard-management-search">
        <div class="dashboard-management-search-input">
          <svg-icon icon-class="fdj" />
          <input type="text" placeholder="搜索">
        </div>
        <div class="dashboard-management-search-buttom">搜索</div>
      </div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName" @tab-click="addIns">
        <el-tab-pane label="基本信息" name="basic">
          <div class="basic-information">
            <ul class="basic-information-project">
              <li>
                <p>手机号</p>
                <el-input v-model="phone" class="w700" />
              </li>
              <li>
                <p>负责人姓名</p>
                <el-input v-model="realname" class="w700" />
              </li>
              <li>
                <p>公司名称</p>
                <el-input v-model="name" class="w700" />
              </li>
              <li>
                <p>所在地区</p>
                <v-distpicker :province="placeholders.province" :city="placeholders.city" :area="placeholders.area"
                  @selected="getArea" />
              </li>
              <li>
                <p>详细地址</p>
                <el-input v-model="address" class="w700" />
              </li>
              <li>
                <p>代理地区</p>
                <v-distpicker :province="region.dprovince" only-province @selected="getRegion" />
              </li>

              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p>营业执照</p>
                  <el-input v-model="licenseImgS.length==0?'':licenseImgS[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload :action="uploadUrl" list-type="picture-card" :on-remove="RemoveLicense"
                  :on-success="successLicense" :limit="1" :on-exceed="prompt" :file-list="licenseImgS"
                  style="margin-left:7em">
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p>法人身份证</p>
                  <el-input v-model="IDcardFrontG.length==0?'':IDcardFrontG[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload :action="uploadUrl" list-type="picture-card" :on-remove="RemoveIDcardFront"
                  :on-success="successIDcardFront" :limit="1" :on-exceed="prompt" :file-list="IDcardFrontG"
                  style="margin-left:7em">
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p />
                  <el-input v-model="IDcardBackG.length==0?'':IDcardBackG[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload :action="uploadUrl" list-type="picture-card" :on-remove="RemoveIDcardBack"
                  :on-success="successIDcardBack" :limit="1" :on-exceed="prompt" :file-list="IDcardBackG"
                  style="margin-left:7em">
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
            </ul>
            <div class="save-modify" @click="basicT = true">保存修改</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分账管理" name="dividend">
          <div class="module" style="border:0">
            <div class="module-title">现金消费分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账比例</div>
                  <el-input v-model="input1" class="module-w120" maxlength="10" />
                  <el-select v-model="value1" class="module-w70">
                    <el-option v-for="item in money" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input2" class="module-w120" maxlength="10" />
                  <el-select v-model="value2" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input3" class="module-w400" maxlength="10" />
                <el-select v-model="value3" class="module-w70">
                  <el-option v-for="item in money" :key="item.value" :value="item.value" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input4" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input5" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">通用会员卡分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">
                    <div>分账比例</div>
                    <p>(500张会员卡前)</p>
                  </div>
                  <el-input v-model="input6" class="module-w120" maxlength="10" />
                  <el-select v-model="value4" class="module-w70">
                    <el-option v-for="item in money" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input7" class="module-w120" maxlength="10" />
                  <el-select v-model="value5" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">
                    <div>分账比例</div>
                    <p>(500张会员卡后)</p>
                  </div>
                  <el-input v-model="input8" class="module-w120" maxlength="10" />
                  <el-select v-model="value6" class="module-w70">
                    <el-option v-for="item in money" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input9" class="module-w120" maxlength="10" />
                  <el-select v-model="value7" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input10" class="module-w400" maxlength="10" />
                <el-select v-model="value8" class="module-w70">
                  <el-option v-for="item in money" :key="item.value" :value="item.value" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input11" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input12" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">专属会员卡分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账比例</div>
                  <el-input v-model="input13" class="module-w120" maxlength="10" />
                  <el-select v-model="value9" class="module-w70">
                    <el-option v-for="item in money" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input14" class="module-w120" maxlength="10" />
                  <el-select v-model="value10" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input15" class="module-w400" maxlength="10" />
                <el-select v-model="value11" class="module-w70">
                  <el-option v-for="item in money" :key="item.value" :value="item.value" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input16" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input17" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">分账账户</div>
            <div class="module-flex">
              <div class="module-p6">商户账号</div>
              <el-input v-model="input18" class="module-w400" maxlength="10" />
            </div>
          </div>
          <div class="save" @click="dividendT=true">确认保存</div>
        </el-tab-pane>
        <el-tab-pane label="下属设备" name="device">
          <div style="text-align:right;margin:20px 0">设备数量：{{count}}</div>
          <el-row class="top">
            <el-col :span="4">设备名称</el-col>
            <el-col :span="4">编号</el-col>
            <el-col :span="4">使用情况</el-col>
            <el-col :span="4">所属市代</el-col>
            <el-col :span="4">所属网点</el-col>
            <el-col :span="4">二维码</el-col>
          </el-row>
          <el-row v-for="(item,index) in command" :key="index" type="flex" align="middle">
            <el-col :span="4">{{ item.terminal_code }}</el-col>
            <el-col :span="4">{{ item.number }}</el-col>
            <el-col :span="4">
              <div v-if="item.status==1" style="color:#00BC3F;font-weight:700">空闲中</div>
              <div v-else-if="item.status==2" style="color:#d80000;font-weight:700">机器故障</div>
              <div v-else-if="item.status==3" style="color:#FF9900;font-weight:700">使用中</div>
              <div v-else-if="item.status==4" style="color:#7e7e7e;font-weight:700">设备离线</div>
            </el-col>
            <el-col :span="4">{{ item.aname }}</el-col>
            <el-col :span="4">{{ item.bname }}</el-col>
            <el-col :span="4" class="QRCode">
              <img :src="item.picture"><i class="el-icon-download" style="cursor: pointer"
                @click="download(item.picture,item.bname)" />
            </el-col>
          </el-row>
           <el-pagination
            :current-page.sync="commandPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="commandTotal"
            background
            @current-change="getProvincialEquipmentList"
            />
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="consumption">
          <div class="module-condition">
            <el-select v-model="consumptionV" @change="getProvincialConsumption(1)">
              <el-option v-for="item in consumption" :key="item.value" :value="item.value" />
            </el-select>
            <el-select v-model="searchTimeV" style="margin:0 20px;" @change="getProvincialConsumption(1)">
              <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
            </el-select>
            <el-date-picker v-model="consumptionTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"
              @change="getProvincialConsumption(1)" />
          </div>
          <el-row class="top">
            <el-col :span="2">消费顾客</el-col>
            <el-col :span="3">所属市代</el-col>
            <el-col :span="2">消费网点</el-col>
            <el-col :span="3">消费时间</el-col>
            <el-col :span="2">消费金额</el-col>
            <el-col :span="4">订单号</el-col>
            <el-col :span="3">消费项目</el-col>
            <el-col :span="3">会员卡号</el-col>
            <el-col :span="2">消费情况</el-col>
          </el-row>
          <el-row v-for="(item,index) in consumptionList" :key="index">
            <el-col :span="2">{{ item.realname?item.realname:'无' }}</el-col>
            <el-col :span="3">{{ item.aname?item.aname:'无' }}</el-col>
            <el-col :span="2">{{ item.bname?item.bname:'无' }}</el-col>
            <el-col :span="3">{{ item.created_at?item.created_at:'无' }}</el-col>
            <el-col :span="2">{{ item.money?item.money:'无' }}</el-col>
            <el-col :span="4">{{ item.order_number?item.order_number:'无' }}</el-col>
            <el-col :span="3">{{ item.content?item.content:'无' }}</el-col>
            <el-col :span="3">{{ item.card_number?item.card_number:'无' }}</el-col>
            <el-col :span="2">
              <div v-show="item.status=='1'">已完成</div>
              <div v-show="item.status=='0'">支付失败</div>
            </el-col>
          </el-row>
          <el-pagination :current-page.sync="consumptionPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="consumptionTotal" background @current-change="getProvincialConsumption" />
        </el-tab-pane>
        <el-tab-pane label="会员记录" name="member">
          <div class="module-condition">
            <el-select v-model="memberSearchTimeV" style="margin:0 20px 0 0;" @change="getMembershipRecord(1)">
              <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
            </el-select>
            <el-date-picker v-model="memberTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd" :clearable="false" @change="getMembershipRecord(1)" />
          </div>
          <el-row class="top">
            <el-col :span="2">会员姓名</el-col>
            <el-col :span="3">所属市代</el-col>
            <el-col :span="2">开卡网点</el-col>
            <el-col :span="3">开通时间</el-col>
            <el-col :span="3">消费金额</el-col>
            <el-col :span="3">卡号</el-col>
            <el-col :span="3">会员类型</el-col>
            <el-col :span="3">消费情况</el-col>
          </el-row>
          <el-row v-for="(item,index) in memberList" :key="index">
            <el-col :span="2">{{ item.nickname?item.nickname:'无' }}</el-col>
            <el-col :span="3">{{item.aname?item.aname:'无'}}</el-col>
            <el-col :span="2">{{ item.bname?item.bname:'无'}}</el-col>
            <el-col :span="3">{{ item.start_time?item.start_time:'无'}}</el-col>
            <el-col :span="3">{{ item.money?item.money:'无' }}</el-col>
            <el-col :span="3">{{ item.card_number?item.card_number:'无'}}</el-col>
            <el-col :span="3">
              <div v-if="item.type=='1'">全国通用会员卡</div>
              <div v-else-if="item.type=='2'">网点专属卡 </div>
              <div v-else>地区通用卡</div>
            </el-col>
            <el-col :span="3">
              <div>剩{{ item.surplus_number }}次</div></br>
              <div>有效日期：{{ item.end_time}}</div>
            </el-col>
          </el-row>
          <el-pagination :current-page.sync="memberPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="memberTotal" background @current-change="getMembershipRecord" />
        </el-tab-pane>
        <el-tab-pane label="下属市代" name="account">
          <el-row class="top">
            <el-col :span="3">市代公司</el-col>
            <el-col :span="3">公司地址</el-col>
            <el-col :span="4">下属网点</el-col>
            <el-col :span="3">设备数（台）</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="4">入驻时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in agentShidai" :key="index" type="flex" align="middle">
            <el-col :span="3">{{ item.name }}</el-col>
            <el-col :span="3">{{item.province }}{{item.city}}{{item.area}}{{item.address}}</el-col>
            <el-col :span="4">{{ item.bcount!==''?item.bcount:'无' }}</el-col>
            <el-col :span="3">{{ item.cmdcount!==''?item.cmdcount:'无' }}</el-col>
            <el-col :span="3">
              <div v-if="item.enable=='0'">营业中</div>
              <div v-if="item.enable=='1'">暂停营业</div>
            </el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="3" class="module-F25">
              <svg-icon icon-class="ljt" @click="deleteOutletsS(item.id)" />

            </el-col>
          </el-row>
          <el-pagination :current-page.sync="shidaiPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="shidaiTotal" background @current-change="getMarketGenerationList" />
        </el-tab-pane>
        <el-tab-pane label="下属网点" name="Outlets">
          <el-row class="top">
            <el-col :span="3">网点名称</el-col>
            <el-col :span="4">网点地址</el-col>
            <el-col :span="4">所属市代</el-col>
            <el-col :span="3">设备数（台）</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="4">入住时间</el-col>
            <el-col :span="3">操作</el-col>
            <!-- <el-col :span="3">操作</el-col> -->
          </el-row>
          <el-row v-for="(item,index) in agentWanghdian" :key="index" type="flex" align="middle">
            <el-col :span="3">{{item.name}}</el-col>
            <el-col :span="4">{{item.province }}{{item.city}}{{item.area}}{{item.address}}</el-col>
            <el-col :span="4">{{item.aname}}</el-col>
            <el-col :span="3">{{item.cmdcount}}</el-col>
            <el-col :span="3">
              <div v-if="item.enable=='0'">启用</div>
              <div v-if="item.enable=='1'">禁用</div>
            </el-col>
            <el-col :span="4">{{item.created_at}}</el-col>
            <el-col :span="3" class="module-F25">
              <svg-icon icon-class="ljt" @click="RemoveOutlets(item.id)" />
            </el-col>
          </el-row>
          <el-pagination :current-page.sync="agentWanghPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="wangdainTotal" background @current-change="getSubordinateOutletsList" />
        </el-tab-pane>
        <el-tab-pane label="结算记录" name="settlement">
          <div class="module-flex" style="justify-content: space-between;">
            <div class="module-condition">
              <el-select v-model="settlementV.name" @change="getSettlementRecord(1)">
                <el-option v-for="item in settlements" :key="item.value" :value="item.label" />
              </el-select>
              <el-select v-model="settlementSearchTimeV" style="margin:0 20px;" @change="getSettlementRecord(1)">
                <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
              </el-select>
              <el-date-picker v-model="settlementTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"
                @change="getSettlementRecord(1)" />
            </div>
            <div class="module-flex">
              <div style="margin: 1.1em 20px 0;">总收入：{{sum}}</div>
              <div>
                <div>已结算：{{settled}}</div>
                <div>待结算：{{settlement}}</div>
              </div>
            </div>
          </div>
          <el-row class="top">
            <el-col :span="4">结算类型</el-col>
            <el-col :span="3">佣金</el-col>
            <el-col :span="4">消费时间</el-col>
            <el-col :span="4">结算时间</el-col>
            <el-col :span="4">操作人</el-col>
            <el-col :span="4">状态</el-col>
          </el-row>
          <el-row v-for="(item,index) in settlementList" :key="index">
            <el-col :span="4">
              <div v-show="item.type=='1'">现金洗车</div>
              <div v-show="item.type=='2'">会员卡月结</div>
              <div>空</div>
            </el-col>
            <el-col :span="3">{{ item.money }}</el-col>
            <el-col :span="4">{{ item.consumer_at }}</el-col>
            <el-col :span="4">{{ item.created_at }}</el-col>
            <el-col :span="4">{{ item.aid }}</el-col>
            <el-col :span="4">
              <div v-show="item.status=='0'">支付失败</div>
              <div v-show="item.status=='1'">待结算</div>
              <div v-show="item.status=='2'">已结算</div>
            </el-col>
          </el-row>
          <el-pagination :current-page.sync="settlementPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="settlementTotal" background @current-change="getSettlementRecord" />
        </el-tab-pane>
        <el-tab-pane label="代理商账号" name="AgentAccount">
          <el-row class="top">
            <el-col :span="3">管理员姓名</el-col>
            <el-col :span="4">手机号</el-col>
            <el-col :span="4">账号</el-col>
            <el-col :span="4">添加时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in accountList" :key="index" type="flex" align="middle">
            <el-col :span="3">{{item.realname}}</el-col>
            <el-col :span="4">{{item.phone}}</el-col>
            <el-col :span="4">{{item.username}}</el-col>
            <el-col :span="4">{{item.created_at}}</el-col>
            <el-col :span="3" class="module-F25">
              <svg-icon icon-class="hb" @click="goModify(item.uid)" />
              <svg-icon icon-class="ljt" @click="deleteOutletsG(item.uid)" />
            </el-col>
          </el-row>
          <el-pagination
            :current-page.sync="accountPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="accountTotal"
            background
            @current-change="getAgentAccount"
            />
        </el-tab-pane>

      </el-tabs>
    </div>
    <!-- 基本信息修改确认 -->
    <el-dialog title="提示" :visible.sync="basicT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicT = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 确认保存分账  -->
    <el-dialog title="提示" :visible.sync="dividendT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dividendT = false">取 消</el-button>
        <el-button type="primary" @click="setOutletsS">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 代理商账号删除  -->
    <el-dialog title="提示" :visible.sync="deleteOutlets" width="30%">
      <span style="font-size:20px;">是否确定删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteOutlets = false">取 消</el-button>
        <el-button type="primary" @click="AgentAccountDel">确 定</el-button>
      </span>
    </el-dialog>
    <div v-show="addIn===1" class="addbtn" @click="goAdd">新增代理商管理员</div>
  </div>
</template>

<script>
import {
    getProvincialAgentDetails, // 获取代理资料详情基本信息
    getMarketgeneration, // 省代理商下属市代
    getMarketgenerationDel,  // 省代理商下属市代删除
    getSplitAccount, // 省代理商分账详情
    getInformationModification, // 修改省代资料
    setSplitAccount,  // 修改分账详情
    getProvincialConsumption,  // 获取省代消费记录
    getMembershipRecord, // 获取省代会员记录
    getSubordinateOutlets, // 下属网点
    getMunicipalSubBranchDel, // 下属网点的删除
    getSettlementRecord, // 结算记录
    getAgentAccount, // 代理商账号
    getAgentAccountDelete,// 代理商账号删除
    getProvincialEquipment,  // 下属设备
} from '@/api/user.js'
import FileSaver from 'file-saver/src/FileSaver.js'
export default {
    data() {
        return {
            activeName: 'basic', // 第一个标签页
            total: 0, // 省代理记录总条数
            // radio: '1',
            phone: '', // 手机
            realname: '', // 负责人名字
            name: '', // 公司名字
            address: '', // 公司地址
            dprovince: '', // 代理地区
            address: '',
            province: '',
            DetailedAddress: [],  // 公司的详细地址
            basicT: false, // 修改询问弹窗
            dividendT: false, // 修改询问弹窗
            agentShidai: [],// 省代理商下属市代
            shidaiPage:1, // 下属市代 当前页
            shidaiTotal:0,  //下属市代 总条数
            agentWanghdian: [], // 下属网点
            agentWanghPage:1, //网点的当前页
            wangdainTotal:0, // 网点的总条数
            proSettlement: [], // 结算记录
            accountList: [], // 代理商列表
            door: false,
            doorImgS: [],
            license: false,
            licenseImgG: '',   //营业执照
            licenseImgS: [],
            id: '',
            form: {
                latitude: '', // 纬度
                longitude: '' // 经度
            },
            mapDisplay: true, // 地图弹窗的显示
            markers: [],	// 检索信息
            IDcard: [],
            IDcardFront: false,
            IDcardFrontS: '',
            IDcardFrontG: [],
            IDcardBack: false,
            IDcardBackG: [],
            IDcardBackS: '',
            placeholders: {
                province: '浙江省', // 选择省
                city: '杭州市', // 选择市
                area: '余杭区' // 选择区
            },
            region: {   // 代理省份
                dprovince: ''
            },
            money: [{ value: '元' }, { value: '%' }],
            searchTime: [{ value: '不按时间' }, { value: '消费时间' }],
            time: [{ value: '天' }, { value: '月' }],
            consumption: [{ value: '消费类型' }, { value: '普通洗车' }, { value: '会员洗车' }, { value: '开通会员' }],
            consumptionTime: [], // 消费记录时间数组
            consumptionTimeS: '', // 消费记录开始时间
            consumptionTimeE: '', // 消费记录结束时间
            consumptionV: '消费类型', // 消费记录
            consumptionPage: 1, // 消费记录当前页码
            consumptionTotal: 0, // 消费记录总条数
            consumptionList: [], // 消费记录列表
            searchTimeV: '不按时间', // 消费记录
            memberTime: [], // 会员记录时间数组
            memberTimeS: '', // 会员记录开始时间
            memberTimeE: '', // 会员记录结束时间
            memberPage: 1, // 会员记录当前页码
            memberTotal: 0, // 会员记录总条数
            memberList: [], // 会员记录列表
            memberSearchTimeV: '不按时间', // 会员记录
            settlements: [{ value: '1', label: '现金洗车' }, { value: '2', label: '会员卡月结' }],
            settlementTime: [], // 结算记录时间数组
            settlementTimeS: '', // 结算记录开始时间
            settlementTimeE: '', // 结算记录结束时间
            settlementV: {
                id: '',
                name: ''
            }, // 结算记录
            sum: '', // 结算记录 总收入
            settlement: '', // 结算记录 待结算收入
            settled: '', // 结算记录 已结算收入
            settlementPage: 1, // 结算记录当前页码
            settlementTotal: 0, // 结算记录总条数
            settlementList: [], // 结算记录列表
            settlementSearchTimeV: '不按时间', // 结算记录
            accountPage: 1, // 管理账号当前页码
            accountTotal: 0, // 管理账号总条数
            accountList: [], // 管理账号列表
            value1: '元', // 现金分账比例单位
            value2: '天', // 现金分账时间单位
            value3: '%', // 现金手续费单位
            value4: '%', // 通用会员卡分账比例单位(500前)
            value5: '月', // 通用会员卡分账时间单位(500前)
            value6: '%', // 通用会员卡分账比例单位(500后)
            value7: '月', // 通用会员卡分账时间单位(500后)
            value8: '%', // 通用会员卡手续费单位
            value9: '%', // 专属会员卡分账比例单位
            value10: '月', // 专属会员卡分账时间单位
            value11: '%', // 专属会员卡手续费单位
            input1: '', // 现金分账比例
            input2: '', // 现金分账时间
            input3: '', // 现金手续费
            input4: '', // 现金免手续费开始
            input5: '', // 现金免手续费结束
            input6: '', // 通用会员卡分账比例(500前)
            input7: '', // 通用会员卡分账时间(500前)
            input8: '', // 通用会员卡分账比例(500后)
            input9: '', // 通用会员卡分账时间(500后)
            input10: '', // 通用会员卡手续费
            input11: '', // 通用会员卡免手续费开始
            input12: '', // 通用会员卡免手续费结束
            input13: '', // 专属会员卡分账比例
            input14: '', // 专属会员卡分账时间
            input15: '', // 专属会员卡手续费
            input16: '', // 专属会员卡免手续费开始
            input17: '', // 专属会员卡免手续费结束
            input18: '', // 商户账号
            addIn: 0,
            deleteOutlets: false,
            D_id: '',
            dialogVisible2: false, //省代删除对话框删除
            dialogVisible3: false, //省代  下属市代 删除对话框删除
            area: '',
            city: '',
            cash: [],
            uid: '',   //  当前管理员的id
            command: [],  // 下属设备列表
            commandPage:1,  // 下属设备当前页
            commandTotal:0, // 下属设备的总条数
            count: '', //总设备数
        }
    },
    mounted() {
        this.mapDisplay = false
    },
    created() {
        this.id = this.$route.query.id
        this.getBasic(this.id)
        this.getProvincialConsumption(1)
        this.getMembershipRecord(1) // 会员记录
        this.getSubordinateOutletsList(1) // 下属网点
        this.getMarketGenerationList(1) // 下属市代
        this.getSplitAccountList(this.id) // 分账管理
        this.getSettlementRecord(1) // 结算记录
        this.getAgentAccount(1) // 代理商账号
        this.getProvincialEquipmentList() // 下属设备
    },
    methods: {
    // 所属地区
        getArea(data) {
            this.placeholders.province = data.province.value
            this.placeholders.city = data.city.value
            this.placeholders.area = data.area.value
        },
        // 获取代理地区
        getRegion(data) {
            this.region.dprovince = data.province.value
        },
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 营业执照
        successLicense(response) {
            this.licenseImgS = [{
                url: response.result.data
            }]
        },
        RemoveLicense(file, fileList) {
            this.licenseImgs = []
        },
        // 身份证正面
        successIDcardFront(response) {
            this.IDcardFrontG = [{
                url: response.result.data
            }]
        },
        RemoveIDcardFront(file, fileList) {
            this.IDcardFrontG = []
        },
        // 身份证反面
        successIDcardBack(response) {
            this.IDcardBackG = [{ url: response.result.data }]
        },
        RemoveIDcardBack(file, fileList) {
            this.IDcardBackG = []
        },
        // 获取代理商基本资料
        getBasic(id) {
            getProvincialAgentDetails({ 'id': id }).then(res => {
                this.phone = res.result.phone
                this.realname = res.result.realname
                this.name = res.result.name
                this.address = res.result.address
                // this.DetailedAddress=[res.result.province,res.result.city,res.result.area]
                this.region.dprovince = res.result.dprovince
                this.province = res.result.province
                if (res.result.business_license !== '') {
                    this.licenseImgS.push({ url: res.result.business_license })
                }
                if (res.result.legal_person[0] !== '' && res.result.legal_person !== false) {
                    this.IDcardFrontG.push({ url: res.result.legal_person[0] })
                }
                if (res.result.legal_person[1] !== '' && res.result.legal_person !== false) {
                    this.IDcardBackG.push({ url: res.result.legal_person[1] })
                }
                this.placeholders.province = res.result.province
                this.placeholders.city = res.result.city
                this.placeholders.area = res.result.area

            })
        },
        // 基本资料保存
        saveData(id) {
            getInformationModification({
                // 'aid': this.id,
                'id': this.id,
                'realname': this.realname,
                'province': this.placeholders.province,
                'city': this.placeholders.city,
                'area': this.placeholders.area,
                'address': this.address,
                'name': this.name,
                'phone': this.phone,
                'dprovince': this.region.dprovince,
                'business_license': this.licenseImgS[0].url,
                'legal_person': [this.IDcardFrontG[0].url, this.IDcardBackG[0].url]
            }).then(res => {
                this.$message({
                    message: '修改省代基本资料成功',
                    type: 'success'
                })
            })
            this.basicT = false
        },
        // 省代理详情分账记录
        getSplitAccountList(id) {
            getSplitAccount({ 'id': id }).then(res => {
                if (res.result.cash != null) {
                    this.input1 = res.result.cash.cash_scale
                    this.input2 = res.result.cash.cash_date
                    this.input3 = res.result.cash.cash_service_fee
                    this.input4 = res.result.cash.cash_start_money
                    this.input5 = res.result.cash.cash_end_money
                    this.value1 = res.result.cash.cash_scale_type === '0' ? '%' : '元'
                    this.value2 = res.result.cash.cash_date_type === '0' ? '天' : '月'
                    this.value3 = res.result.cash.cash_service_fee_type === '0' ? '%' : '元'
                }
                if (res.result.common !== null) {
                    this.input6 = res.result.common.common_card_scale
                    this.input7 = res.result.common.common_date
                    this.input8 = res.result.common.common_card_scale500
                    this.input9 = res.result.common.common_date500
                    this.input10 = res.result.common.common_service_fee
                    this.input11 = res.result.common.common_start_money
                    this.input12 = res.result.common.common_end_money
                    this.value4 = res.result.common.common_card_scale_type === '0' ? '%' : '元'
                    this.value5 = res.result.common.common_date_type === '0' ? '天' : '月'
                    this.value6 = res.result.common.common_card_scale500_type === '0' ? '%' : '元'
                    this.value7 = res.result.common.common_date500_type === '0' ? '天' : '月'
                    this.value8 = res.result.common.common_service_fee_type === '0' ? '%' : '元'
                }
                if (res.result.exclusive !== null) {
                    this.input13 = res.result.exclusive.exclusive_card_scale
                    this.input14 = res.result.exclusive.exclusive_date
                    this.input15 = res.result.exclusive.exclusive_service_fee
                    this.input16 = res.result.exclusive.exclusive_start_money
                    this.input17 = res.result.exclusive.exclusive_end_money
                    this.value9 = res.result.exclusive.exclusive_card_scale_type === '0' ? '%' : '元'
                    this.value10 = res.result.exclusive.exclusive_date_type === '0' ? '天' : '月'
                    this.value11 = res.result.exclusive.exclusive_service_fee_type === '0' ? '%' : '元'
                }
                if (res.result.account !== null) {
                    this.input18 = res.result.account
                }
            })
        },
        setOutletsS(id) {
            if (this.input1 === '' || this.input2 === '' || this.input3 === '' || this.input4 === '' || this.input5 === '' || this.input6 === '' || this.input7 === '' || this.input8 === '' || this.input9 === '' || this.input10 === '' || this.input11 === '' || this.input12 === '' || this.input13 === '' || this.input14 === '' || this.input15 === '' || this.input16 === '' || this.input17 === '' || this.input18 === '') {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            // 修改分账详情
            setSplitAccount({
                'id': this.id,
                'aid': this.$route.query.id,
                'cash_scale': this.input1,
                'cash_scale_type': this.value1 === '元' ? '1' : '0',
                'cash_date': this.input2,
                'cash_date_type': this.value2 === '月' ? '1' : '0',
                'cash_service_fee': this.input3,
                'cash_service_fee_type': this.value3 === '元' ? '1' : '0',
                'cash_start_money': this.input4,
                'cash_end_money': this.input5,
                'common_card_scale': this.input6,
                'common_card_scale_type': this.value4 === '元' ? '1' : '0',
                'common_date': this.input7,
                'common_date_type': this.value5 === '月' ? '1' : '0',
                'common_card_scale500': this.input8,
                'common_card_scale500_type': this.value6 === '元' ? '1' : '0',
                'common_date500': this.input9,
                'common_date500_type': this.value7 === '月' ? '1' : '0',
                'common_service_fee': this.input10,
                'common_service_fee_type': this.value8 === '元' ? '1' : '0',
                'common_start_money': this.input11,
                'common_end_money': this.input12,
                'exclusive_card_scale': this.input13,
                'exclusive_card_scale_type': this.value9 === '元' ? '1' : '0',
                'exclusive_date': this.input14,
                'exclusive_date_type': this.value10 === '月' ? '1' : '0',
                'exclusive_service_fee': this.input15,
                'exclusive_service_fee_type': this.value11 === '元' ? '1' : '0',
                'exclusive_start_money': this.input16,
                'exclusive_end_money': this.input17,
                'account': this.input18
            }).then(res => {
                this.$message({
                    message: '修改省代成功',
                    type: 'success'
                })
            })
            this.dividendT = false
        },
        //省代 下属设备
        getProvincialEquipmentList(id) {
            getProvincialEquipment({ 'id': this.id }).then(res => {
                this.command = res.result.list
                this.commandTotal = res.result.count - 0
            })
        },
        // 下载二维码
        download(img, name) {
            FileSaver.saveAs(img, name)
        },
        // 省代理商下属市代
        getMarketGenerationList(agid) {
            getMarketgeneration({ 'id': this.id, 'agid': agid }).then(res => {
                this.agentShidai = res.result.list
                this.shidaiTotal = res.result.count - 0
            })
        },
        // 下属市代删除 
        deleteOutletsS(id) {
            this.$confirm('是否删除该下属网点', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getMarketgenerationDel({id }).then(res => {
                    this.$message({
                        message: '删除网点成功',
                        type: 'success'
                    })
                    this.getMarketGenerationList(1)
                })
            })
        },
        // MarketgenerationDel() {
        //     getMarketgenerationDel({ 'id': this.id }).then(res => {
        //         this.$message({
        //             message: '删除市代成功',
        //             type: 'success'
        //         })
        //     })
        //     this.dialogVisible3 = false
        // },
        // // 删除询问框的显示
        // deleteOutletsS(id) {
        //     this.dialogVisible3 = true
        //     this.id = id
        // },

        // 获取省代消费记录
        getProvincialConsumption(pages) {
            this.consumptionTimeS = this.consumptionTime[0]
            this.consumptionTimeE = this.consumptionTime[1]
            getProvincialConsumption({
                'id': this.id,
                'pages': pages,
                'content': this.consumptionV === '消费类型' ? '' : this.consumptionV,
                'time': this.searchTimeV === '不按时间' ? 1 : 2,
                'start_time': this.consumptionTimeS,
                'end_time': this.consumptionTimeE
            }).then(res => {
                this.consumptionList = res.result.model
                this.consumptionTotal = res.result.count - 0
            })
        },
        // 省代理会员记录
        getMembershipRecord(pages) {
            this.memberTimeS = this.memberTime[0]
            this.memberTimeE = this.memberTime[1]
            getMembershipRecord({
                'id': this.id,
                'pages': pages,
                'start_time': this.memberTimeS,
                'end_time': this.memberTimeE,
                'time': this.memberSearchTimeV === '不按时间' ? 1 : 2
            }).then(res => {
                this.memberList = res.result.model
                this.memberTotal = res.result.count - 0
            })
        },
        // // 获取结算记录
        getSettlementRecord(agid) {
            this.settlementTimeS = this.settlementTime[0]
            this.settlementTimeE = this.settlementTime[1]
            this.settlements.forEach(val => {
                if (val.label == this.settlementV.name) {
                    this.settlementV.id = val.value
                }
            })
            getSettlementRecord({
                'id': this.id,
                'agid': agid,
                'type': this.settlementV.id,
                // 'type': this.settlementV === '消费类型' ? '' : this.settlementV,
                'time': this.settlementSearchTimeV === '不按时间' ? 1 : 2,
                'start_time': this.settlementTimeS,
                'end_time': this.settlementTimeE
            }).then(res => {
                this.settlementList = res.result.model
                this.sum = res.result.sum
                this.settlement = res.result.settlement
                this.settled = res.result.settled
                this.settlementTotal = res.result.count - 0
            })
        },
        // 省代理商 下属网点
        getSubordinateOutletsList() {
            getSubordinateOutlets({ 'agid': this.agid, 'id': this.id }).then(res => {
                this.agentWanghdian = res.result.list
                this.wangdainTotal = res.result.count - 0

            })
        },
        // 省代理商  代理商账号
        getAgentAccount(agid) {
            getAgentAccount({ 'id': this.id, 'agid': agid }).then(res => {
                this.accountList = res.result.list
                this.accountTotal = res.result.count - 0
            })
        },
        addIns(tab) {
            if (tab.name === 'AgentAccount') {
                this.addIn = 1
            } else {
                this.addIn = 0
            }
        },
        goAdd() {
            this.$router.push({ path: '/user/provincial/addAccount', query: { id: this.id } })
        },
        goModify(uid) {
            this.$router.push({ path: '/user/provincial/modifyAccount', query: { uid: uid } })
        },
        // 代理商账号的删除
        AgentAccountDel(uid) {
            getAgentAccountDelete({
                uid: this.uid
            }).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getAgentAccount(1)
                this.deleteOutlets = false
            })
        },
        deleteOutletsG(uid) {
            this.uid = uid
            this.deleteOutlets = true
        },
        // 下属网点删除
        RemoveOutlets(id) {
            this.$confirm('是否删除该下属网点', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getMunicipalSubBranchDel({id }).then(res => {
                    this.$message({
                        message: '删除网点成功',
                        type: 'success'
                    })
                    this.getSubordinateOutletsList(1)
                })
            })
        },

    }
}
</script>
<style lang="scss">
.el-tabs__content {
  overflow: unset;
}
.el-tabs__item {
  color: #222222;
  font-size: 20px;
  font-weight: bold;
}
.el-tabs__item.is-active {
  color: #222222;
}
.el-tabs__active-bar {
  background-color: #2ca9fc;
}
.el-tabs__item:hover {
  color: #2ca9fc;
}
</style>
<style lang="scss" scoped>
.module {
  border-top: 1px solid #cfcdcd;
  margin-bottom: 20px;
  &-condition {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-title {
    font-weight: bold;
    margin: 20px 0;
  }
  &-flex {
    display: flex;
    align-items: center;
  }
  &-p6 {
    width: 6em;
    text-align: right;
    p {
      font-size: 12px;
      color: #5a5a5a;
    }
  }
  &-p10 {
    width: 10em;
    text-align: right;
  }
  &-w120 {
    width: 120px;
    margin: 0 0.5em 0 1em;
  }
  &-w300 {
    width: 300px;
    margin: 0 0.5em 0 1em;
  }
  &-w400 {
    width: 400px;
    margin: 0 0.5em 0 1em;
  }
  &-w70 {
    width: 70px;
  }
  &-description5 {
    margin: 10px 0 30px 7em;
    color: #979797;
  }
  &-description10 {
    margin: 10px 0 30px 12em;
    color: #979797;
  }
  &-F25 {
    font-size: 25px;
    color: #333333;
    svg {
      cursor: pointer;
    }
  }
}
.addbtn {
  color: white;
  background-color: #2ca9fc;
  padding: 12px 12px;
  width: 160px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.save {
  width: 140px;
  background-color: #2ca9fc;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 8px 12px;
  margin: 50px auto 0;
  cursor: pointer;
}
.imageAndInput {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  &-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.address-search {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.buttn {
  background-color: #2ca9fc;
  padding: 8px 13px;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 15px;
}
.w200 {
  width: 200px;
}
.w130 {
  width: 130px;
}
.w700 {
  width: 700px;
}
.el-col {
  text-align: center;
}
.el-row {
  padding: 15px 0;
  border: 1px solid #cbcbcb;
  border-top: 1px solid white;
  color: #757575;
}
.el-row:hover {
  border: 1px solid #2ca9fc;
}
.save-modify {
  border-radius: 5px;
  background-color: #2ca9fc;
  padding: 8px 30px;
  font-size: 20px;
  color: white;
  width: 180px;
  text-align: center;
  margin: 40px auto 20px;
  cursor: pointer;
}
.title {
  margin: 30px;
  font-size: 20px;
  font-weight: bold;
}
.el-pagination {
  right: 0;
  position: absolute;
  top: calc(100vh - 265px);
}
.photoDistance {
  margin-top: 100px;
}
.half {
  width: 50%;
}
.top {
  border-top: 1px solid #cbcbcb;
  font-size: 20px;
  color: #23262f;
}
.top:hover {
  border: 1px solid #2ca9fc;
}
li {
  list-style-type: none;
}
.dashboard {
  &-container {
    margin: 15px 20px;
    min-height: calc(100vh - 90px);
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
  }
  &-management {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &-search {
      display: flex;
      align-items: center;
      &-input {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        background-color: white;
        border-radius: 25px;
        font-size: 35px;
        color: #b1b1b1;
        input {
          width: 200px;
          border: 0;
          outline: none;
          font-size: 16px;
          margin-left: 5px;
        }
      }
      &-buttom {
        background-color: #2ca9fc;
        color: white;
        padding: 8px 15px;
        border-radius: 2px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 200px);
}
.basic {
  &-information {
    position: relative;
    font-size: 20px;
    line-height: 23px;
    &-project {
      text-align: right;
      margin: 50px 50px 0 50px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 6em;
          margin-right: 1em;
        }
      }
    }
  }
}
.QRCode {
  width: 200px;
  height: 60px;
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
