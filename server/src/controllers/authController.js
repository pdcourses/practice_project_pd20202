const createHttpError = require('http-errors');
const { User } = require('./../models');
const AuthService = require('./../services/authService');

exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const userInstance = await User.findOne({
      where: { email },
    });
    if (userInstance && 
        (await userInstance.comparePassword(password))) {
        const data = await AuthService.createSession(userInstance);
      return res.send({data});
    }
    next(createHttpError(403, 'Incorrect password or email'));
  } catch (err) {
    next(err);
  }
};
exports.signUp = async (req, res, next) => {
  try {
    const {body} = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      return res.send({ data });
    }
    next(createHttpError(401);
  } catch (err) {
    next(err);
  }
};
exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (refreshTokenInstance) {
        const data = await AuthService.refreshSession(refreshTokenInstance);
      return res.send({data});
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};
