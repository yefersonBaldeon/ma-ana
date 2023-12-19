import { useEffect, useReducer } from "react";
import { UseForm } from "./hooks/useForm";
import { userReducer } from "./reducers/userReducer";
import Swal from "sweetalert2";
import { types } from "./types/types";

import validator from "validator";

const initialState = {
  users: [],
};
function App() {
  const [formValues, handleInputChange, reset] = UseForm({
    nombres: "",
    email: "",
    id: "",
  });
  const { nombres, email } = formValues;
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users"));
      users.map((user) =>
        dispatch({
          type: types.addUser,
          payload: user,
        })
      );
    }
  },[]);

  useEffect(() => {
    const a = [...state.users];
    localStorage.setItem("users", JSON.stringify(a));
    reset();
  }, [state.users]);

  const onRegisterUser = (e) => {
    e.preventDefault();
    if (validator.isEmpty(formValues.nombres)) {
      Swal.fire({
        icon: "etowrror",
        title: "Oops...",
        text: "Ingrese los Nombres",
      });
      return;
    }

    if (validator.isEmpty(formValues.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese el Correo",
      });
      return;
    }

    if (!validator.isEmail(formValues.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un correo valido",
      });
      return;
    }

    dispatch({
      type: types.addUser,
      payload: formValues,
    });
    Swal.fire(
      "Usuario Agregado",
      "Se registró al usuario correctamente",
      "success"
    );
  };

  const deleteRegisterUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        dispatch({
          type: types.deleUser,
          payload: id,
        });
      }
    });
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-6">
            <h5>CRUD USUARIOS</h5>
            <form onSubmit={onRegisterUser}>
              <div className="form-group">
                <input
                  placeholder="Nombres"
                  type="text"
                  className="form-control"
                  name="nombres"
                  value={nombres}
                  onChange={handleInputChange}
                  // {...register("nombres", { required: true })}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Correo"
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  // {...register("email", { required: true })}
                />
              </div>
              <button type="submit" className="btn btn-dark btn-block">
                REGISTRAR
              </button>
            </form>
          </div>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombres}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteRegisterUser(user.id);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
