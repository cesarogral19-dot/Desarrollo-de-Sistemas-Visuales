export const validateRegister = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = "El nombre es obligatorio";
  if (!values.lastName) errors.lastName = "El apellido es obligatorio";
  
  if (!values.email) {
    errors.email = "Email obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "Mínimo 8 caracteres";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};
export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña obligatoria";
  }

  return errors;
};
export const validateRequestForm = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "El título es obligatorio";
  }

  if (!values.description) {
    errors.description = "La descripción es obligatoria";
  }

  if (!values.priority) {
    errors.priority = "Selecciona una prioridad";
  }

  return errors;
};
