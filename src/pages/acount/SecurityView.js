import React, { Component,Fragment } from 'react';
import { List , Modal , Form , Input , message } from 'antd';

const FormItem = Form.Item;

class Security extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  getData = () => [
    {
      title: '账号密码',
      description: (
        <p>账号：hdedu@uanla.com 当前密码强度：弱</p>
      ),
      actions: [
        <a style={{marginRight:'60px'}} onClick={this.showModal}>
          修改
        </a>,
      ],
    },
    // {
    //   title: '登录密码',
    //   description: '已设置',
    //   actions: [
    //     <a>
    //       修改
    //     </a>,
    //   ],
    // },
  ];

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    message.success('操作成功');
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const modalObject = {
      width:'340px',
      height:'340px'
    }
    const inputObject = {
      width:'300px',
      height:'32px'
    }
    const buttonObject = {
      width:'54px',
      height:'32px'
    }
    return (
      <Fragment>
        <div className='setting-title'>
          <div className='setting-main-title'>
            安全设置
          </div>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{height:'380px'}}
          bodyStyle={modalObject}
          // centered={true}
          closable={false}
          width='340px'
          // getContainer={() => document.getElementsByClassName('security-view')}
        > 
          <Form layout='vertical'>
            <FormItem>重置密码</FormItem>
            <FormItem label={<span>原密码<span style={{color:'#D9D9D9',marginLeft:10}}>(请先验证原密码)</span></span>}>
              {getFieldDecorator('originalPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请输入',
                  },
                ],
              })(
                <Input placeholder='请输入' style={{...inputObject}} />
              )}
            </FormItem>
            <FormItem label={<span>新密码<span style={{color:'#D9D9D9',marginLeft:10}}>(最小长度为6个字符)</span></span>}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请输入',
                  },
                ],
              })(
                <Input placeholder='请输入'  />
              )}
            </FormItem>
            <FormItem label={<span>新密码<span style={{color:'#D9D9D9',marginLeft:10}}>(最小长度为6个字符)</span></span>}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    // required: true,
                    message: '请再次输入',
                  },
                ],
              })(
                <Input placeholder='请输入'  />
                )}
            </FormItem>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const SecurityView =  Form.create()(Security)

export default SecurityView;