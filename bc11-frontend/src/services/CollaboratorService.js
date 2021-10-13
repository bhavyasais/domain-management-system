import API from '../api';

const CollaboratorService = {
  getAllCollaborators: async () => {
    const { data } = await API.get('collaborators');
    return data;
  },
};

export default CollaboratorService;
