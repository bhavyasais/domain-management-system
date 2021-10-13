const { onLoggedIn, onLoggedOut, updateUser } = require("../../redux/actions/userActions");
describe('redux actions Functions', () => {
    it('onLoggedIn', () => {
      const result = onLoggedIn();
      expect(result.type).toBe('LOGGED_IN');
    });
    it('onLoggedOut', () => {
        const result = onLoggedOut();
        expect(result.type).toBe('LOGGED_OUT');
      });
      it('updateUser', () => {
        const result = updateUser("Bhavya");
        expect(result.type).toBe('USER_UPDATE');
      });
});  