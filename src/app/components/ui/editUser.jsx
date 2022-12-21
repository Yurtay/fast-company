import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState({});
  // const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentProf, setCurrentProf] = useState({});
  const currentUserId = useParams();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.users
      .getById(currentUserId.userId)
      .then((data) => setCurrentUser(data));
    setCurrentProf(currentUser.profession);
  }, []);
  useEffect(() => {
    setCurrentProf(currentUser.profession);
  }, [currentUser]);
  console.log(currentProf);

  const [data, setData] = useState({
    email: "",
    name: currentUser.name,
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  // const professionUser = Object.keys(professions).map((prof) =>
  // const validatorConfig = {
  //   name: {
  //     isRequired: {
  //       message: "Поле обязательно для заполнения",
  //     },
  //     isName: {
  //       message: "Имя введено некорректно",
  //     },
  //   },
  //   email: {
  //     isRequired: {
  //       message: "Электронная почта обязательна для заполнения",
  //     },
  //     isEmail: {
  //       message: "Email введен некорректно",
  //     },
  //   },
  //   password: {
  //     isRequired: {
  //       message: "Пароль обязателен для заполнения",
  //     },
  //     isCapitalSymbol: {
  //       message: "Пароль должен содержать хотя бы одну заглавную букву",
  //     },
  //     isContainDigit: {
  //       message: "Пароль должен содержать хотя бы одно число",
  //     },
  //     min: {
  //       message: "Пароль должен состоять минимум из 8 символов",
  //       value: 8,
  //     },
  //   },
  //   profession: {
  //     isRequired: {
  //       message: "Обязательно выберите вашу профессию",
  //     },
  //   },
  //   licence: {
  //     isRequired: {
  //       message:
  //         "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
  //     },
  //   },
  // };
  // useEffect(() => {
  //   validate();
  // }, [data]);
  // const validate = () => {
  //   const errors = validator(data, validatorConfig);
  //   setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };
  // const isValid = Object.keys(errors).length === 0;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const isValid = validate();
  //   if (!isValid) return;
  //   console.log(data);
  // };
  const isCurrentUser = Object.keys(currentUser).length;

  if (isCurrentUser > 0) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <TextField
              label="Имя"
              name="name"
              value={currentUser.name}
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={currentUser.email}
              onChange={handleChange}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              name="profession"
              options={professions}
              onChange={handleChange}
              value=""
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "other", value: "other" },
              ]}
              value={currentUser.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваши пол"
            />
            <MultiSelectField
              options={qualities}
              onChange={handleChange}
              defaultValue={currentUser.qualities}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled="true"
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5 shadow p-3">
        <h2>loading...</h2>
      </div>
    );
  }

  // if (currentUser) {

  // } else {
  //   return <h1>Loading...</h1>;
  // }
};

export default EditUser;
