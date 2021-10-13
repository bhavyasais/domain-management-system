import API from '../api';

const DomainService = {
  getAllDomainsForDepartment: async (params) => {
    const { data } = await API.get('domains', { params });
    return data;
  },
  addNewDomain: async (params) => {
    const { data } = await API.post('domains', params);
    return data;
  },
  UpdateDomainTrustGroup: async (params) => {
    const { data } = await API.put('domainTrustGroup', params);
    return data;
  },
  updateDomain: async (params) => {
    const { data } = await API.put('domains', params);
    return data;
  },
};

export default DomainService;
