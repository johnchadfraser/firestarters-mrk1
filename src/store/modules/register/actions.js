export default {
    async registerUser(context, data) {
      //const userId = context.rootGetters.userId;
      const userData = {
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_email: data.user_email,
        i_id: data.i_id
      };
  
      const response = await fetch(
        `https://localhost:3000/api/v1/user`,
        {
          method: 'POST',
          body: JSON.stringify(userData)
        }
      );
  
      // const responseData = await response.json();
  
      if (!response.ok) {
        // error ...
      }
  
      context.commit('registerUser', {
        ...userData
      });
    }
  };
  