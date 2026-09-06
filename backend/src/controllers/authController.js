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

  
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      
      const result = await AuthService.login(email, password);

      
      logger.info('User login successful', {
        userId: result.user.id,
        email: result.user.email,
        role: result.user.role
      });//

      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token: result.token,
          user: result.user
        }

      });//

    }//TRY ENDS

     catch (error) 
     {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });

      }//IF ENDS

      
      next(error);

    }//CATCH ENDS


  }//LOGIN ENDS







}//class ends