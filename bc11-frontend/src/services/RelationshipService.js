import API from "../api";

const RelationshipService = {
  getAllRelations: async () => {
    const { data } = await API.get("domains");
    return data;
  },
};

export default RelationshipService;