const AuthService = require('../services/authService');
const logger = require('../utils/logger');


class AuthController {
  
    //register

  static async register(req, res, next) {
    try {

      const { name, email, password } = req.body;
      
      // Register user
      const user = await AuthService.register({
        name,
        email,
        password
      });

      
      logger.info('User registration successful', {
        userId: user.id,
        email: user.email,
        role: user.role
      });

      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user
      });

    } 
    catch (error) 
    
    {
     
      if (error.message === 'Email already registered') {
        return res.status(409).json({
          success: false,
          message: 'Email already registered. Please login or use a different email.'
        });

      }
      
      
      next(error);
    }

    
  }//REGISTER ENDS

  






}//class ends