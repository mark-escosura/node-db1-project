const Account = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    errorMessage.message = "name and budget are required";
  } else if (typeof name !== "string") {
    errorMessage.message = "name of account must be a string";
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorMessage.message = "name of account must be between 3 and 100";
  } else if (typeof budget !== "number" || isNaN(budget)) {
    errorMessage.message = "/must be a number/i";
  } else if (budget < 0 || budget > 1000000) {
    errorMessage.message = "budget of account is too large or too small";
  }
  if (errorMessage.message) {
    next(errorMessage);
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const takenId = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (takenId) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    next(error);
  }
};
