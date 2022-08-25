import yup from "./config";

export const signUpSchema = yup.object().shape({
  name: yup.string().trim().required().max(50),
  username: yup.string().trim().required().max(50),
  email: yup.string().trim().email().required().max(50),
  password: yup.string().trim().required(),
});

export const loginSchema = yup.object().shape({
  username: yup.string().trim().required().max(50),
  password: yup.string().trim().required(),
});
