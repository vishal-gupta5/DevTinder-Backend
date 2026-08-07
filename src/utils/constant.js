const validateEditProfit = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
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
