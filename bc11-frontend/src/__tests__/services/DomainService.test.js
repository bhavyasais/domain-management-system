import API from '../../api';
import DomainService from '../../services/DomainService';
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

describe('DomainService getAllDomainsForDepartment', () => {
  it('resolves', async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { Test: 'tests' } }));

    const getAllDomainsForDepartmentResponse = await DomainService.getAllDomainsForDepartment({});

    expect(getAllDomainsForDepartmentResponse).toBeDefined();

    expect(getAllDomainsForDepartmentResponse).toEqual({ Test: 'tests' });
  });

  it('rejects', async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DomainService.getAllDomainsForDepartment({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('DomainService addNewDomain', () => {
  it('resolves', async () => {
    API.post.mockReturnValue(Promise.resolve({ data: { add: true } }));

    const addNewDomain = await DomainService.addNewDomain({});

    expect(addNewDomain).toBeDefined();

    expect(addNewDomain).toEqual({ add: true });
  });

  it('rejects', async () => {
    API.post.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DomainService.addNewDomain({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('DomainService UpdateDomainTrustGroup', () => {
  it('resolves', async () => {
    API.put.mockReturnValue(Promise.resolve({ data: { update: true } }));

    const UpdateDomainTrustGroup = await DomainService.UpdateDomainTrustGroup({});

    expect(UpdateDomainTrustGroup).toBeDefined();

    expect(UpdateDomainTrustGroup).toEqual({ update: true });
  });

  it('rejects', async () => {
    API.put.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DomainService.UpdateDomainTrustGroup({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('DomainService updateDomain', () => {
  it('resolves', async () => {
    API.put.mockReturnValue(Promise.resolve({ data: { domain: true } }));

    const updateDomain = await DomainService.updateDomain({});

    expect(updateDomain).toBeDefined();

    expect(updateDomain).toEqual({ domain: true });
  });

  it('rejects', async () => {
    API.put.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DomainService.updateDomain({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});
