import './App.css';
import Container from './Container';
import { getAllStudents } from './client';
import { Component } from 'react';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './Notification';

import {
  Table,
  Avatar,
  Spin,
  Modal,
  Empty
} from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const getAntIcon = () => <LoadingOutlined style={{ fontSize: 24 }} />;

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true })

  closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false })


  fetchStudents = () => {
    this.setState({
      isFetching: true
    });

    getAllStudents()
      .then(res => res.json()
        .then(students => {
          console.log(students);
          this.setState({
            students,
            isFetching: false
          });
        }))
      .catch(error => {
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      })
  }

  render() {

    const { students, isFetching, isAddStudentModalVisible } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new student'
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}>
          <AddStudentForm
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudents()
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.error;
              errorNotification(message, description);
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={this.openAddStudentModal} />
      </div>
    )

    if (isFetching) {
      return <Container>
        <Spin indicator={getAntIcon()} />
      </Container>
    }

    if (students && students.length) {

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {student.firstName.charAt(0).toUpperCase()}{student.lastName.charAt(0).toUpperCase()}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];

      return (
        <Container>
          <Table
            style={{ paddingBottom: '75px' }}
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey='studentId' />
          {commonElements()}
        </Container>
      );

    }
    return (<Container>
      <Empty style={{ marginTop: '30px' }}
        description={
          <h1>No students found</h1>
        } />
      {commonElements()}
    </Container>
    )
  }
}

export default App;
