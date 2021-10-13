import axios from 'axios';

const GoogleSuiteService = {
  changePermission: async (params) => {
    const { data } = await axios.post('http://localhost:8080/api/v1/changePermissions', params);
    return data;
  },
  updateToken: async (params) => {
    const { data } = await axios.put('http://localhost:8080/api/v1/updateToken', params);
    console.log('datain return ', data);
    return data;
  },
};

export default GoogleSuiteService;
