const { LOGGED_IN } = require("../../redux/constants");
const { userReducer } = require("../../redux/reducers/userReducer");
const action = {
    type: LOGGED_IN,
    data:{userName:"Bhavya"},
  };
describe('userReducer log in', () => {
    it('userReducer 1', () => {
      const result = userReducer({isLoggedIn:true},action);
      expect(result.isLoggedIn).toBe(true);
      expect(action.type).toBe("LOGGED_IN");
    });
    it('userReducer log out', () => {
      const result = userReducer({isLoggedIn:false},{...action,type:"LOGGED_OUT"});
      expect(result.isLoggedIn).toBe(false);
      expect(action.type).toBe("LOGGED_IN");
    });
});  