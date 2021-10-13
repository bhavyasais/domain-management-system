import API from '../../api';
import TrustGroupService from '../../services/TrustGroupService';
import { STATUS } from '../../utils/Strings';

jest.mock('../../api');

const errorResponse = {
  status: STATUS.FAILURE,
};

const handleAndAssertErrorResponse = (error) => {
  expect(error).toBeDefined();

  const { status } = error;

  expect(status).toEqual(STATUS.FAILURE);
};

describe('TrustGroupService getAllTrustGroups', () => {
  it('resolves', async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { Test: 'tests' } }));

    const getAllTrustGroups = await TrustGroupService.getAllTrustGroups({});

    expect(getAllTrustGroups).toBeDefined();

    expect(getAllTrustGroups).toEqual({ Test: 'tests' });
  });

  it('rejects', async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await TrustGroupService.getAllTrustGroups({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('TrustGroupService getAllTrustGroupsWithPermissions', () => {
  it('resolves', async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { Test: 'abc' } }));

    const getAllTrustGroupsWithPermissions = await TrustGroupService.getAllTrustGroupsWithPermissions(
      {},
    );

    expect(getAllTrustGroupsWithPermissions).toBeDefined();

    expect(getAllTrustGroupsWithPermissions).toEqual({ Test: 'abc' });
  });

  it('rejects', async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await TrustGroupService.getAllTrustGroupsWithPermissions({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('TrustGroupService addNewTrustGroup', () => {
  it('resolves', async () => {
    API.post.mockReturnValue(Promise.resolve({ data: { add: true } }));

    const addNewTrustGroup = await TrustGroupService.addNewTrustGroup({});

    expect(addNewTrustGroup).toBeDefined();

    expect(addNewTrustGroup).toEqual({ add: true });
  });

  it('rejects', async () => {
    API.post.mockReturnValue(Promise.reject(errorResponse));

    try {
      await TrustGroupService.addNewTrustGroup({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('TrustGroupService updateTrustGroupAccess', () => {
  it('resolves', async () => {
    API.put.mockReturnValue(Promise.resolve({ data: { update: true } }));

    const updateTrustGroupAccess = await TrustGroupService.updateTrustGroupAccess({});

    expect(updateTrustGroupAccess).toBeDefined();

    expect(updateTrustGroupAccess).toEqual({ update: true });
  });

  it('rejects', async () => {
    API.put.mockReturnValue(Promise.reject(errorResponse));

    try {
      await TrustGroupService.updateTrustGroupAccess({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });

  describe('TrustGroupService updateTrustGroup', () => {
    it('resolves', async () => {
      API.put.mockReturnValue(Promise.resolve({ data: { update: true } }));
  
      const updateTrustGroup = await TrustGroupService.updateTrustGroup({});
  
      expect(updateTrustGroup).toBeDefined();
  
      expect(updateTrustGroup).toEqual({ update: true });
    });
  
    it('rejects', async () => {
      API.put.mockReturnValue(Promise.reject(errorResponse));
  
      try {
        await TrustGroupService.updateTrustGroup({});
      } catch (error) {
        handleAndAssertErrorResponse(error);
      }
    });
  });
});
