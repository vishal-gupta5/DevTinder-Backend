const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email", 
    "age",
    "about",
    "skills",
    "gender",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields),
  );

  return isEditAllowed;
};

module.exports = { validateEditProfile };
