import API from '../../api';
import GoogleSuiteService from '../../services/GoogleSuiteService';

jest.mock('../../api');

describe('GoogleSuiteService', () => {
    it('resolves', async () => {
      API.post.mockReturnValue(Promise.resolve({ data: { is_active: true } }));
      const googleObj = {
        departmentName: "Sales",
        type: 'domain',
        permissionType: "reader",
      };
      GoogleSuiteService.changePermission(googleObj);
    });
  
});