import {Component, OnInit} from '@angular/core';

import {
    NgdsDataGridOption,NgdsPanelOption,
    NgdsDataSource,
    NgdsDsModel,
    NgdsDsDataGridModel,
    DatagridDeepPropertyPipe
} from '../../../../../src/index';
import {DatagridPropertyPipe, DatagridPropertyBadgePipe} from '../../shared/pipe/index';

// pageSize: number; //每页个数
// pageCount: number; //页面总数
// pageIndex: number;//当前页数

class DemoDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDsDataGridModel> {
        return new Promise<NgdsDsDataGridModel>((resolve, reject) => {
            let date = new Date();
            setTimeout(()=>{
                resolve({
                    page: {
                        pageSize: 10,
                        pageCount: 10,
                        pageIndex: 10,
                    },
                    data: [
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, org: {name: 1}},
                        {username: "13999", name: "胡立波", mobile: "13333333331", authStatus: 0},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 0},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                        {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                    ]
                });
            },1000)
            
        });
    }
}
class AuthStatusDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDsModel> {
        return new Promise<NgdsDsModel>((resolve, reject) => {
            resolve([
                {label: "全部", value: 0},
                {label: "已认证", value: 1},
                {label: "未认证", value: 2}
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'datagrid.component.html',
    styleUrls: ['datagrid.component.css'],
})
export class DataGridComponent implements OnInit {

    constructor(private datagridPropertyPipe: DatagridPropertyPipe,
                private datagridPropertyBadgePipe: DatagridPropertyBadgePipe,
                private datagridDeepPropertyPipe: DatagridDeepPropertyPipe) {
    }

    panelOption: NgdsPanelOption = {
        crumbs: [
            {
                text: "专题资讯"
            },
            {
                text: "新增资讯"
            }
        ],
        buttons: [
            {
                text: '多选功能',
                action: (item) => {
                    this.option.table.showCheck = !this.option.table.showCheck;
                }
            },
            {
                text: '显示排序',
                action: (item) => {
                    this.option.table.columns[0].showSort = !this.option.table.columns[0].showSort;
                }
            }
        ]
    }

    option: NgdsDataGridOption = {
        dataSource: new DemoDataSource(),
        table: {
            showCheck:false,
            columns: [
                {text: '用户名', property: "username", width: "60px"},
                {text: '姓名', property: "name", width: "80px"},
                {text: '手机号', property: "mobile", width: "80px"},
                {
                    text: '认证状态',
                    property: "authStatus",
                    propertyPipe: this.datagridPropertyPipe,
                    propertyClassPipe: this.datagridPropertyBadgePipe,
                    width: "130px"
                },
                {
                    text: '企业名称',
                    property: "org.name",
                    propertyPipe: [this.datagridDeepPropertyPipe, this.datagridPropertyPipe],
                    title: true,
                    overflow: true
                },
            ],
            op: {
                width: "130px",
                buttons: [
                    {
                        text: '选择框可用',
                        action: function (item) {
                            item.disabled = !item.disabled;
                        }
                    },
                    {
                        text: '删除',
                        hidden:(data)=>{
                            if(data.mobile=="13333333331"){
                                return true;
                            }
                            return false;
                        },
                        action: function (item) {
                            alert(item);
                        }
                    }
                ],
                groupButtons: [
                    {
                        text: '用户管理',
                        hidden:(data)=>{
                            if(data.mobile=="13333333331"){
                                return true;
                            }
                            return false;
                        },
                        buttons: [
                            {
                                text: "老师管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "学生管理",
                                hidden:(data)=>{
                                    if(data.mobile=="13333333331"){
                                        return true;
                                    }
                                    return false;
                                },
                                action: function (item) {
                                }
                            },
                            {
                                text: "家长管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "园务管理",
                                action: function (item) {
                                }
                            }
                        ]
                    }
                ]
            }

        }
    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
