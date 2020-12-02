import React, { useEffect, useState, useImperativeHandle, useCallback } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { searchStrToSearchObj, searchObjToSearchStr } from '../../utils/location'
import request from '../../utils/request'
import './index.less'
import { Table, Input, InputNumber, Form, Card } from 'antd';
import BaseForm from '../BaseForm'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

const BaseTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.tableData); //列表数据源
  const [pagination, setPagination] = useState({}) //分页配置
  const [filters, setFilters] = useState({}) //头部筛选
  const [sorter, setSorter] = useState({}) //排序字段
  const [pages, setPages] = useState({ pageSize: 10, pageNumber: 1 }) //列表分页
  const [query, setQuery] = useState(null) //组件本身的请求数据

  const [oneMountDidShow, setOneMountDidShow] = useState(props.initMountDidShow)

  const [parentParams, setParentParams] = useState({})

  // 处理请求参数
  const processingRequestParameters = () => {
    let options = {}

    const { urls, location, parentquery } = props

    const { list, listMethod } = urls
    options.url = list
    options.method = listMethod || 'GET'

    let propsQuery = parentquery || {} //props 携带的参数

    // propsQuery 父组件通过props传递的参数   query:本身state参数  filters列表头部筛选  parentParams =通过函数参数传递的参数
    let data = { ...propsQuery, ...query, ...filters, ...parentParams }
    if (pages) {
      const locationSearch = location.search
      let pageNumber = 1, pageSize = 10
      if (locationSearch) {
        const searchObj = searchStrToSearchObj(location.search)
        pageNumber = Number(searchObj.pageNumber) || 1
        pageSize = Number(searchObj.pageSize) || 10
      }
      data.pageSize = pageSize
      data.pageNumber = pageNumber
    }

    if (sorter) {
      data.orderField = sorter.sorterKey
      data.orderDirection = sorter.sorterValue === "ascend" ? 0 : 1
    }

    if (listMethod === 'get' || listMethod === 'GET') {
      // data.md5Str = localStorage.getItem('authed')
      options.params = data
    } else {
      // options.params = { md5Str: localStorage.getItem('authed') }
      options.data = data
    }

    options.loading = true
    getList(options)
  }

  const usecallbackProcessingRequestParameters = useCallback(processingRequestParameters, [pages, query, filters, sorter, parentParams])


  useEffect(() => {
    if (oneMountDidShow) {
      usecallbackProcessingRequestParameters()
    }
    
  }, [oneMountDidShow, usecallbackProcessingRequestParameters])

  useImperativeHandle(props.cRef, () => {
    const { urls } = props
    return ({
      // 通过父元素调用，获取列表
      parentGetList: (parentParams) => {
        locationConduct({ pageNumber: 1 })
        setPages({
          pageNumber: 1,
        })
        setParentParams(parentParams)
      },
      //父组件传递过来的搜索方法
      parentSearch: (data) => {},
      // 查看详情
      checkDetiai: (id) => { },
      // 添加
      add: () => { },
      // 编辑
      edit: (id) => {},
      // 删除
      delete: (id) => {
        console.log(urls)
      },
    })
  })

  // 获取数据信息
  const getList = (options) => {
    request(options).then(res => {
      if (res && res.data) {
        const resdata = res.data
        let datas = resdata.dataList ? resdata.dataList : resdata
        setData(datas)
        setPagination(getPaginationInfo(resdata))
      }
    })
  }

  // 处理地址栏参数
  const locationConduct = (locaData = null) => {
    const { location } = props
    const searchObj = { ...searchStrToSearchObj(location.search), ...locaData }
    const serarchStr = searchObjToSearchStr(searchObj)
    const pathname = location.pathname
    props.history.push(`${pathname}?${serarchStr}`)
  }

  //获取分页关键内容
  const getPaginationInfo = (obj) => {
    const locationSearch = props.location.search
    const searchObj = searchStrToSearchObj(locationSearch)
    return {
      current: obj.pageNumber,
      pageSize: obj.pageSize || Number(searchObj.pageSize) || 10,
      total: obj.totalSize,
      size: 'small',
      pageSizeOptions: ['10', '30', '50', '100'],
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: () => {
        return `共${obj.length || 1}条`
      }
    }
  }
  /*
    * pagination 分页信息
    * filters 头部筛选信息
    * sorter 头部排序信息
    */
  const handleChange = (pagination, filters, sorter) => {
    if (pagination.current || pagination.pageSize) {
      setPages({
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      })
      locationConduct({ pageSize: pagination.pageSize, pageNumber: pagination.current })
    }
    setOneMountDidShow(true)
    setFilters(filters)
    setSorter({
      sorterKey: sorter.columnKey,
      sorterValue: sorter.order,
    })
  }
  const search = (e) => {
    locationConduct({ pageNumber: 1 })
    setQuery(e)
  }

  const { columns, searchData = [], } = props

  const tablecolumns = columns && columns()
  return (
    <div>
      {
        searchData && searchData.length > 0 && (
          <Card>
            <BaseForm data={searchData} handleSearch={search} />
          </Card>
        )
      }

      <Form form={form} component={false}>
        <Table
          {...props}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={tablecolumns}
          rowClassName="editable-row"
          onChange={handleChange}
          pagination={pagination}
        />
      </Form>
    </div>

  );
};

BaseTable.propTypes = {
  columns: PropTypes.func,
  tableData: PropTypes.array,
  urls: PropTypes.object, //请求路径{list: 获取列表， delete:删除, upload:导出}
  parentquery: PropTypes.object, //通过父组件携带的参数
  rowKey: PropTypes.func, //选择默认的rowkey
  initMountDidShow: PropTypes.bool, // 进入初始化的时候是否执行获取数据函数
  tablecolumns: PropTypes.array, //搜索数据
  bordered: PropTypes.bool,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  size: PropTypes.string,
  expandable: PropTypes.object,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  footer: PropTypes.func,
  rowSelection: PropTypes.object,
  scroll: PropTypes.string,
  hasData: PropTypes.bool,
  top: PropTypes.string,
  bottom: PropTypes.string,
}

BaseTable.defaultProps = {
  initMountDidShow: true,
  rowKey: record => record.id,
}

export default withRouter(BaseTable)