import API from '../api';

const DepartmentService = {
  getAllDepartments: async () => {
    const { data } = await API.get('departments');
    return data;
  },
  addDepartment: async (params) => {
    const { data } = await API.post('departments', params);
    return data;
  },
};

export default DepartmentService;
