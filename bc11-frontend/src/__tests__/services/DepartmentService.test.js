import API from '../../api';
import DepartmentService from '../../services/DepartmentService';
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

describe('DepartmentService getAllDepartments', () => {
  it('resolves', async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { mock: 'mock' } }));

    const getAllDepartments = await DepartmentService.getAllDepartments({});

    expect(getAllDepartments).toBeDefined();

    expect(getAllDepartments).toEqual({ mock: 'mock' });
  });

  it('rejects', async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DepartmentService.getAllDepartments({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});

describe('DepartmentService addDepartment', () => {
  it('resolves', async () => {
    API.post.mockReturnValue(Promise.resolve({ data: { add: true } }));

    const addDepartment = await DepartmentService.addDepartment({});

    expect(addDepartment).toBeDefined();

    expect(addDepartment).toEqual({ add: true });
  });

  it('rejects', async () => {
    API.post.mockReturnValue(Promise.reject(errorResponse));

    try {
      await DepartmentService.addDepartment({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});
