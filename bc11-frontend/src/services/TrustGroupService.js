import API from '../api';

const TrustGroupService = {
  getAllTrustGroups: async () => {
    const { data } = await API.get('trust-groups');
    return data;
  },
  getAllTrustGroupsWithPermissions: async (params) => {
    const { data } = await API.get('permission-grant', { params });
    return data;
  },
  addNewTrustGroup: async (params) => {
    const { data } = await API.post('trust-groups', params);
    return data;
  },
  updateTrustGroupAccess: async (params) => {
    const { data } = await API.put('permission-grant', params);
    return data;
  },
  updateTrustGroup: async (params) => {
    const { data } = await API.put('trust-groups', params);
    return data;
  },
};

export default TrustGroupService;
