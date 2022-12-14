import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const currentUserId = useParams();
  const [data, setData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    profession: "Svyaz",
    sex: "male",
    qualities: [],
    licence: false,
  });

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.users
      .getById(currentUserId.userId)
      .then((data) => setCurrentUser(data));
  }, []);
  const userProfId = currentUser?.profession?._id;
  const qualitiesCurrentUser = currentUser.qualities;
  let optionsArray;

  if (qualitiesCurrentUser) {
    optionsArray = qualitiesCurrentUser.map((optionName) => ({
      label: optionName.name,
      value: optionName._id,
    }));
  }
  console.log(currentUser.name);

  const handleChange = (target) => {
    console.log(target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const isCurrentUser = Object.keys(currentUser).length;

  if (isCurrentUser > 0) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              name="profession"
              options={professions}
              onChange={handleChange}
              value={userProfId}
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
              defaultValue={optionsArray}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              onClick={api.users.update(currentUserId.userId, data)}
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
};

export default EditUser;
