import React from 'react'
import { getOptionsList } from '../../utils'
import { Input, Select, Form, Button, DatePicker, Checkbox, Cascader, InputNumber } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const InputGroup = Input.Group;

const BaseForm = (props) => {
  const [form] = Form.useForm()

  const formitemStyle = {marginBottom: 8}
  const creatFormList = () => {
    const data = props.data;
    let list = [];
    data.forEach(item => {
      const { type, field, label, rules, width, placeholder, disabled, initialValue, min, max,
        minRules, maxRules, startTime, endTime, options, changeOnSelect, 
      } = item
      switch (type) {
        case 'input':
          const inputItem = <FormItem style={formitemStyle} key={field} name={field} label={label} rules={rules} initialValue={initialValue} >
            <Input style={{ width }} type="text" placeholder={placeholder} disabled={disabled} />
          </FormItem>
          list.push(inputItem);
          break;
        case 'inputnumber':
          const inputNumberItem = <FormItem style={formitemStyle} key={field} label={label} name={field} rules={rules} initialValue={initialValue} >
            <InputNumber style={{ width }} type="text" placeholder={placeholder} disabled={disabled} />
          </FormItem>
          list.push(inputNumberItem);
          break;
        case 'inputnumbergroup':
          const inputNumberGroupItem = <FormItem style={formitemStyle} key={field} label={label}>
            <InputGroup compact>
              <FormItem initialValue={initialValue} rules={minRules} >
                <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />
              </FormItem>
              <Input
                style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                placeholder="~"
                disabled
              />
              <FormItem initialValue={initialValue} rules={maxRules} >
                <InputNumber style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大值" />
              </FormItem>
            </InputGroup>
          </FormItem>
          list.push(inputNumberGroupItem);
          break;
        case 'inputgroup':
          const inputGroupItem = <FormItem style={formitemStyle} key={field} label={label}>
            <InputGroup compact>
              <FormItem name={min || 'min'} rules={minRules} >
                <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />
              </FormItem>
              <Input
                style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                placeholder="~" disabled />
              <FormItem name={max || 'max'} rules={maxRules} >
                <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大值" />
              </FormItem>
            </InputGroup>
          </FormItem>
          list.push(inputGroupItem);
          break;
        case 'select':
          const selectItem = <FormItem style={formitemStyle} key={field} label={label}  name={field} initialValue={initialValue} >
            <Select style={{ width }} disabled={disabled} placeholder={placeholder}>
              {getOptionsList(item.list)}
            </Select>
          </FormItem>
          list.push(selectItem);
          break;
        case 'cascader':
          const cascaderItem = <FormItem style={formitemStyle} key={field} label={label} name={field} initialValue={initialValue}>
            <Cascader style={{ width }} options={options} changeOnSelect={changeOnSelect || false} disabled={disabled} placeholder={placeholder}></Cascader>
          </FormItem>
          list.push(cascaderItem);
          break;
        case 'checkbox':
          const checkboxItem = <FormItem style={formitemStyle} key={field} label={label} name={field}>
            <Checkbox style={{ width }} disabled={disabled}></Checkbox>
          </FormItem>
          list.push(checkboxItem);
          break;
        case 'choosetime':
          const startTimeItem = <FormItem style={formitemStyle} key={startTime || 'startTime'} label={label}>
            <FormItem name={startTime || 'startTime'}  >
              <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" disabled={disabled} />
            </FormItem>
          </FormItem>
          list.push(startTimeItem);
          const endTimeItem = <FormItem style={formitemStyle} key={endTime || 'endTime'} label="~" colon={false} >
            <FormItem name={endTime || 'endTime'} >
              <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" disabled={disabled} />
            </FormItem>
          </FormItem>
          list.push(endTimeItem)
          break;
        default:
      }
    })
    return list
  }
  const reset = () => {
    form.resetFields()
  }
  const onFinish = values => {
    const startTime = values.startTime, endTime = values.endTime
    if(startTime) values.startTime = startTime && moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    if(endTime) values.endTime = endTime && moment(endTime).format('YYYY-MM-DD HH:mm:ss')
    props.handleSearch(values);
  };
  return <Form layout='inline'
    form={form} name="control-hooks" onFinish={onFinish} >
    {creatFormList()}
    <FormItem style={formitemStyle}>
      <Button style={{ margin: '0 20px' }} type="primary" htmlType="submit">搜索</Button>
      <Button onClick={reset}>重置</Button>
    </FormItem>
  </Form>
}

export default BaseForm