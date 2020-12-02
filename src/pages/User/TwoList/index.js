import React, { useState, useRef } from "react";
// import { useTranslation } from 'react-i18next';
import { Button, Divider } from "antd";
import BaseTable from '../../../common/BaseTable'
import connect from '../../../utils/connect'
const UserTwoList = () => {

  const [list] = useState([])
  const childRef = useRef();

  const [urls] = useState({
    list: '/product/v1/search',
    listMethod: 'POST',
    delete: 'product/v1/delete',
    deleteMethod: 'POST',
  })

  const [type] = useState('edit')

  const getList = () => {
    childRef.current.parentGetList();
  }

  const checkDetiai = (item) => {
    childRef.current.checkDetiai(item.productId);
  }

  const editGoods = (item) => {
    childRef.current.edit(item.productId);
  }

  const handleDelete = (item) => {
    childRef.current.delete(item.productId);
  }

  const _columns = (that) => {
    return [
      {
        title: '商品信息',
        key: 'productName',
        render(item) {
          return (
            <div>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>{item.productName}</div>
            </div>
          )
        }
      },
      {
        title: '类目',
        key: 'categoryOneName',
        render(item) {
          return <span>{item.categoryOneName}/{item.categoryTwoName}</span>
        }
      },
      {
        title: '所属商铺',
        key: 'shopName',
        render(item) {
          let shopName = item.shopDTO && item.shopDTO.shopName
          return <span>{shopName}</span>
        }
      },
      {
        title: '现价',
        key: 'salePrice',
        dataIndex: 'salePrice',
        sorter: (a, b) => a.salePrice - b.salePrice,
      },
      {
        title: '原价',
        key: 'originalPrice',
        dataIndex: 'originalPrice',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render(status) {
          let str = ''
          switch (status) {
            case 0:
              str = '待上架'
              break;
            case 1:
              str = '已上架'
              break;
            case 2:
              str = '已下架'
              break;
            default:
              str = '删除'
          }
          return <span>{str}</span>
        }
      },
      {
        title: '创建时间',
        key: 'createTimeStr',
        dataIndex: 'createTimeStr',
        render(createTimeStr) {
          return <div style={{width: 150}}>{createTimeStr}</div>
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (item) => {
          const spanStyle = { color: '#1890ff', cursor: 'pointer' }
          return (
            <div style={{width: 220}}>
              <span style={spanStyle} onClick={() => { checkDetiai(item) }}>查看详情</span>
              {
                item.status !== 3 && <>
                  <Divider type="vertical" />
                  <span style={spanStyle} onClick={() => editGoods(item)}>编辑商品</span>
                </>
              }
              {item.status === 0 && <>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>发布</span>
              </>}
              {item.status === 2 && <>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>上架</span>
              </>}

              {item.status === 1 && <>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'off')}>下架</span>
              </>}
              {item.status !== 3 && <>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={() => handleDelete(item)}>删除</span>
              </>}
            </div>
          )
        }
      }
    ]
  }
  const searchData = [
    { type: 'input', field: 'keyword', label: '商品名称', placeholder: '请输入商品名称' },
    { type: 'input', field: 'childCateId', label: '商品标签', placeholder: '请输入商品标签' },
    { type: 'inputnumbergroup', field: 'price', label: '销售价格', min: 'minPrice', max: 'maxPrice' },
    { type: 'inputnumbergroup', field: 'stock', label: '库存', min: 'minStock', max: 'maxStock' },
    { type: 'inputnumbergroup', field: 'salesVolume', label: '销量', min: 'minSalesVolume', max: 'maxSalesVolume' },
  ]
  return <div>
    <Button onClick={getList}>获取数据列表</Button>
    <BaseTable
      initMountDidShow={true}
      cRef={childRef}
      query={{ type: type, pageSize: 30 }}
      tableData={list}
      searchData={searchData}
      urls={urls}
      columns={_columns}
      rowKey={record => record.productId}
    />
  </div>
}
export default connect(UserTwoList)